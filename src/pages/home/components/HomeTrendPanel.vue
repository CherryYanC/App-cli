<template>
  <view class="panel">
    <view class="panel__header">
      <view>
        <text class="section-title">{{ title }}</text>
        <text class="section-description">{{ dateRange }}</text>
      </view>
      <view class="legend">
        <view class="legend__dot" />
        <text>{{ legend }}</text>
      </view>
    </view>
    <BaseChart
      :options="options"
      height="430rpx"
      empty-mode="chart"
      @chart-click="emit('chartClick')"
    />
  </view>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import BaseChart from '@/components/BaseChart/index.vue'

defineProps<{
  title: string
  dateRange: string
  legend: string
  options: EChartsOption
}>()

const emit = defineEmits<{
  chartClick: []
}>()
</script>

<style scoped lang="scss">
.panel {
  box-sizing: border-box;
  min-width: 0;
  padding: 30rpx;
  background: #ffffff;
  border: 1rpx solid #e8edf4;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 30rpx rgba(15, 23, 42, 0.04);
}

.panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.section-title,
.section-description {
  display: block;
}

.section-title {
  color: #172033;
  font-size: 30rpx;
  font-weight: 700;
}

.section-description {
  margin-top: 8rpx;
  color: #94a3b8;
  font-size: 22rpx;
}

.legend {
  display: flex;
  align-items: center;
  gap: 10rpx;
  color: #64748b;
  font-size: 21rpx;
}

.legend__dot {
  width: 14rpx;
  height: 14rpx;
  background: #2563eb;
  border-radius: 50%;
}
</style>
