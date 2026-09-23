<template>
  <view class="base-chart" :style="{ width, height }">
    <view v-if="isEmpty" class="base-chart__empty">
      <text>暂无数据</text>
    </view>
    <l-echart
      v-else
      ref="canvasRef"
      :is-disable-scroll="disableScroll"
      @finished="handleCanvasReady"
    />
  </view>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue'

type ChartEvent = Record<string, unknown>
type EmptyMode = 'placeholder' | 'chart'

interface ChartCanvas {
  init: (library: typeof echarts, theme?: string) => Promise<ECharts | null>
  resize: () => void
  canvasToTempFilePath: (options?: Record<string, unknown>) => Promise<{ tempFilePath: string }>
}

interface Props {
  options?: EChartsOption
  width?: string
  height?: string
  loading?: boolean
  group?: string
  theme?: string
  emptyMode?: EmptyMode
  showAxisPointer?: boolean
  disableScroll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({}),
  width: '100%',
  height: '400rpx',
  loading: false,
  group: '',
  theme: '',
  emptyMode: 'placeholder',
  showAxisPointer: true,
  disableScroll: true,
})

const emit = defineEmits<{
  chartReady: [chart: ECharts]
  ready: [chart: ECharts]
  error: [error: unknown]
  chartClick: [event: ChartEvent]
  showTip: [event: ChartEvent]
  hideTip: [event: ChartEvent]
  dataZoom: [event: ChartEvent]
}>()

const canvasRef = ref<ChartCanvas | null>(null)
let chart: ECharts | null = null
let initializing: Promise<ECharts | null> | null = null
let lifecycle = 0

/** 有数据集或非空 series 时显示图表；loading 和 chart 模式始终保留画布。 */
const isEmpty = computed(() => {
  if (props.loading || props.emptyMode === 'chart') return false

  const option = props.options as EChartsOption & {
    series?: Array<{ data?: unknown }> | { data?: unknown }
    dataset?: { source?: unknown } | Array<{ source?: unknown }>
  }
  const series = Array.isArray(option.series) ? option.series : option.series ? [option.series] : []
  if (series.some((item) => Array.isArray(item.data) && item.data.length > 0)) return false

  const datasets = Array.isArray(option.dataset)
    ? option.dataset
    : option.dataset
    ? [option.dataset]
    : []
  return !datasets.some((item) => {
    const source = item.source
    return Array.isArray(source) ? source.length > 0 : !!source && Object.keys(source).length > 0
  })
})

/** 仅为适合坐标轴指示器的图表补默认 tooltip，不修改调用方传入的 options。 */
function getOption(): EChartsOption {
  const option = props.options
  if (!props.showAxisPointer) return option

  const series = Array.isArray(option.series) ? option.series : option.series ? [option.series] : []
  if (!series.some((item) => ['line', 'bar', 'candlestick', 'scatter'].includes(item.type || ''))) {
    return option
  }

  const tooltip = Array.isArray(option.tooltip) ? option.tooltip[0] : option.tooltip
  if (tooltip?.axisPointer !== undefined) return option
  return {
    ...option,
    tooltip: {
      ...(tooltip || {}),
      trigger: tooltip?.trigger || 'axis',
      axisPointer: { type: 'cross' },
    },
  }
}

function applyOptions(): void {
  if (!chart) return
  chart.setOption(getOption(), { notMerge: true, lazyUpdate: false })
}

function applyLoading(): void {
  if (!chart) return
  if (props.loading) chart.showLoading()
  else chart.hideLoading()
}

function applyGroup(): void {
  if (!chart) return
  chart.group = props.group
  if (props.group) echarts.connect(props.group)
}

function disposeChart(): void {
  lifecycle += 1
  initializing = null
  if (chart && !chart.isDisposed()) chart.dispose()
  chart = null
}

/** 等待跨端画布就绪并创建 ECharts 实例；并发调用复用同一次初始化。 */
function initChart(): Promise<ECharts | null> {
  if (chart && !chart.isDisposed()) return Promise.resolve(chart)
  if (initializing) return initializing
  if (isEmpty.value) return Promise.resolve(null)

  const currentLifecycle = lifecycle
  initializing = (async () => {
    try {
      await nextTick()
      const canvas = canvasRef.value
      if (!canvas || currentLifecycle !== lifecycle) return null

      const instance = await canvas.init(echarts, props.theme || undefined)
      if (!instance) throw new Error('ECharts 初始化失败')
      if (currentLifecycle !== lifecycle) {
        instance.dispose()
        return null
      }

      chart = instance
      instance.on('click', (event) => emit('chartClick', event as ChartEvent))
      instance.on('showTip', (event) => emit('showTip', event as ChartEvent))
      instance.on('hideTip', (event) => emit('hideTip', event as ChartEvent))
      instance.on('dataZoom', (event) => emit('dataZoom', event as ChartEvent))
      applyOptions()
      applyLoading()
      applyGroup()
      emit('chartReady', instance)
      emit('ready', instance)
      return instance
    } catch (error) {
      emit('error', error)
      return null
    } finally {
      if (currentLifecycle === lifecycle) initializing = null
    }
  })()

  return initializing
}

function handleCanvasReady(): void {
  void initChart()
}

/** 容器尺寸变化后同步重算画布和图表尺寸。 */
function resizeChart(): void {
  if (chart && !chart.isDisposed()) canvasRef.value?.resize()
}

/** 返回当前平台可用的图表图片临时路径。 */
async function getImg(): Promise<string> {
  if (!chart || !canvasRef.value) throw new Error('图表尚未初始化')
  const result = await canvasRef.value.canvasToTempFilePath({ fileType: 'png' })
  return result.tempFilePath
}

watch(
  () => props.options,
  () => {
    if (chart) applyOptions()
  },
  { deep: true, flush: 'post' },
)

watch(() => props.showAxisPointer, applyOptions)
watch(() => props.loading, applyLoading)
watch(() => props.group, applyGroup)
watch(
  () => [props.width, props.height],
  async () => {
    await nextTick()
    resizeChart()
  },
)
watch(
  () => props.theme,
  async () => {
    const previous = initializing
    disposeChart()
    if (previous) await previous
    await initChart()
  },
)
watch(isEmpty, (empty) => {
  if (empty) disposeChart()
  // 从占位切回图表时，由新画布的 finished 事件初始化。
})

onMounted(() => uni.onWindowResize(resizeChart))
onBeforeUnmount(() => {
  uni.offWindowResize(resizeChart)
  disposeChart()
})

/** 页面可通过组件 ref 调用这些方法；getChart 返回当前实例或 null。 */
defineExpose({ initChart, resizeChart, getImg, getChart: () => chart })
</script>

<style scoped lang="scss">
.base-chart {
  position: relative;
}

.base-chart__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: $app-color-text-placeholder;
  font-size: $app-font-size-sm;
}
</style>
