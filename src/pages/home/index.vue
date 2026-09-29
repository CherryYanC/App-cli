<template>
  <view class="dashboard-page">
    <HomeHero :health="overviewHealth" :active-devices="activeDevices" />

    <HomeSectionTabs :active="activeTab" :tabs="DASHBOARD_TABS" @change="selectTab" />

    <HomeDateFilter
      :ranges="QUICK_RANGES"
      :selected-range="selectedRange"
      :start-date="startDate"
      :end-date="endDate"
      :today="today"
      @refresh="refreshMockData"
      @range-change="setQuickRange"
      @start-change="handleStartDateChange"
      @end-change="handleEndDateChange"
    />

    <HomeMetricGrid :metrics="currentMetrics" />

    <view class="dashboard-grid">
      <HomeTrendPanel
        :title="currentContent.chartTitle"
        :date-range="displayDateRange"
        :legend="currentContent.legend"
        :options="trendChartOptions"
        @chart-click="handleChartClick"
      />
      <HomeSourcePanel
        :sources="currentSources"
        :total="sourceTotal"
        :options="sourceChartOptions"
      />
    </view>

    <HomeActivityPanel :activities="DASHBOARD_ACTIVITIES" />

    <view class="compatibility-note">
      <uni-icons type="info" size="16" color="#64748b" />
      <text>页面使用响应式网格与跨端组件，可用于 iOS、Android 及 HarmonyOS 兼容性测试。</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { createSourceChartOptions, createTrendChartOptions } from './chart-options'
import HomeActivityPanel from './components/HomeActivityPanel.vue'
import HomeDateFilter from './components/HomeDateFilter.vue'
import HomeHero from './components/HomeHero.vue'
import HomeMetricGrid from './components/HomeMetricGrid.vue'
import HomeSectionTabs from './components/HomeSectionTabs.vue'
import HomeSourcePanel from './components/HomeSourcePanel.vue'
import HomeTrendPanel from './components/HomeTrendPanel.vue'
import {
  DASHBOARD_ACTIVITIES,
  DASHBOARD_CONTENT,
  DASHBOARD_TABS,
  QUICK_RANGES,
  type DashboardTabKey,
} from './dashboard'
import { formatDate, formatDisplayDate, offsetDate, parseDate } from './date'

const today = formatDate(new Date())
const activeTab = ref<DashboardTabKey>('overview')
const selectedRange = ref(7)
const startDate = ref(offsetDate(today, -6))
const endDate = ref(today)
const mockVersion = ref(0)

const currentContent = computed(() => DASHBOARD_CONTENT[activeTab.value])
const overviewHealth = computed(() => 76 + ((mockVersion.value + selectedRange.value) % 13))
const activeDevices = computed(() => (2380 + mockVersion.value * 17).toLocaleString())
const currentMetrics = computed(() =>
  currentContent.value.metrics.map((metric, index) => {
    const factor = mockVersion.value ? 1 + (((mockVersion.value + index) % 5) - 2) * 0.012 : 1
    const numeric = Number(metric.value.replace(/[^\d.]/g, ''))
    if (!numeric || factor === 1) return metric

    let value = metric.value
    if (metric.value.includes('¥')) value = `¥ ${(numeric * factor).toFixed(1)}`
    else if (metric.value.includes('%')) value = `${(numeric * factor).toFixed(2)}%`
    else if (!metric.value.includes(':')) value = Math.round(numeric * factor).toLocaleString()
    return { ...metric, value }
  }),
)
const currentSources = computed(() => currentContent.value.sources)
const sourceTotal = computed(() =>
  currentSources.value.reduce((total, item) => total + item.value, 0).toLocaleString(),
)
const displayDateRange = computed(
  () => `${formatDisplayDate(startDate.value)} - ${formatDisplayDate(endDate.value)}`,
)

const chartLabels = computed(() => {
  const start = parseDate(startDate.value)
  const end = parseDate(endDate.value)
  const totalDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1)
  const points = Math.min(7, totalDays)

  return Array.from({ length: points }, (_, index) => {
    const ratio = points === 1 ? 0 : index / (points - 1)
    const date = new Date(start.getTime() + ratio * (end.getTime() - start.getTime()))
    return `${date.getMonth() + 1}/${date.getDate()}`
  })
})

const trendValues = computed(() => {
  const base = currentContent.value.trendBase
  return chartLabels.value.map((_, index) => {
    const baseIndex =
      chartLabels.value.length === 1
        ? base.length - 1
        : Math.round((index / (chartLabels.value.length - 1)) * (base.length - 1))
    const variation = ((mockVersion.value * 37 + index * 19) % 91) - 30
    return Math.max(0, base[baseIndex] + variation)
  })
})

const trendChartOptions = computed(() =>
  createTrendChartOptions(chartLabels.value, trendValues.value, currentContent.value.legend),
)
const sourceChartOptions = computed(() => createSourceChartOptions(currentSources.value))

function selectTab(key: DashboardTabKey): void {
  activeTab.value = key
}

function setQuickRange(days: number): void {
  selectedRange.value = days
  endDate.value = today
  startDate.value = offsetDate(today, -(days - 1))
}

function handleStartDateChange(value: string): void {
  startDate.value = value
  selectedRange.value = 0
}

function handleEndDateChange(value: string): void {
  endDate.value = value
  selectedRange.value = 0
}

function refreshMockData(): void {
  mockVersion.value += 1
  uni.showToast({ title: 'Mock 数据已刷新', icon: 'none' })
}

function handleChartClick(): void {
  uni.showToast({ title: '图表点击事件正常', icon: 'none' })
}
</script>

<style scoped lang="scss">
.dashboard-page {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 32rpx;
  color: #172033;
  background: #f5f7fb;
}

.dashboard-grid {
  display: grid;
  gap: 24rpx;
}

.compatibility-note {
  display: flex;
  align-items: flex-start;
  gap: 12rpx;
  padding: 22rpx 24rpx;
  color: #64748b;
  font-size: 21rpx;
  line-height: 1.6;
  background: #eef2f7;
  border-radius: 18rpx;
}

@media screen and (min-width: 768px) {
  .dashboard-page {
    max-width: 1280px;
    padding: 28px;
    margin: 0 auto;
  }

  .dashboard-grid {
    grid-template-columns: minmax(0, 1.65fr) minmax(320px, 1fr);
  }
}

@media screen and (max-width: 370px) {
  .dashboard-page {
    padding: 24rpx;
  }
}
</style>
