<template>
  <view class="panel">
    <view class="panel__header">
      <view>
        <text class="section-title">渠道构成</text>
        <text class="section-description">各渠道贡献占比</text>
      </view>
      <text class="panel__more">实时</text>
    </view>

    <view class="source-layout">
      <view class="donut-wrap">
        <BaseChart
          :options="options"
          width="260rpx"
          height="260rpx"
          empty-mode="chart"
          :show-axis-pointer="false"
        />
        <view class="donut-center">
          <text class="donut-center__value">{{ total }}</text>
          <text class="donut-center__label">总量</text>
        </view>
      </view>

      <view class="source-list">
        <view v-for="source in sources" :key="source.name" class="source-item">
          <view class="source-item__name">
            <view class="source-item__dot" :style="{ backgroundColor: source.color }" />
            <text>{{ source.name }}</text>
          </view>
          <view class="source-item__data">
            <text class="source-item__value">{{ source.value }}</text>
            <text class="source-item__percent">{{ source.percent }}%</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import BaseChart from '@/components/BaseChart/index.vue'
import type { DashboardSource } from '../dashboard'

defineProps<{
  sources: DashboardSource[]
  total: string
  options: EChartsOption
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

.panel__header,
.source-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel__header {
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

.panel__more {
  padding: 8rpx 14rpx;
  color: #64748b;
  font-size: 20rpx;
  background: #f1f5f9;
  border-radius: 999rpx;
}

.source-layout {
  display: flex;
  align-items: center;
  gap: 28rpx;
}

.donut-wrap {
  position: relative;
  flex-shrink: 0;
  width: 260rpx;
  height: 260rpx;
}

.donut-center {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.donut-center__value {
  color: #172033;
  font-size: 30rpx;
  font-weight: 700;
}

.donut-center__label {
  margin-top: 3rpx;
  color: #94a3b8;
  font-size: 19rpx;
}

.source-list {
  flex: 1;
  min-width: 0;
}

.source-item {
  padding: 13rpx 0;
}

.source-item__name,
.source-item__data {
  display: flex;
  align-items: center;
}

.source-item__name {
  gap: 12rpx;
  color: #64748b;
  font-size: 22rpx;
}

.source-item__dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
}

.source-item__data {
  gap: 14rpx;
}

.source-item__value {
  color: #334155;
  font-size: 22rpx;
  font-weight: 600;
}

.source-item__percent {
  min-width: 54rpx;
  color: #94a3b8;
  font-size: 20rpx;
  text-align: right;
}

@media screen and (max-width: 370px) {
  .source-layout {
    flex-direction: column;
  }

  .source-list {
    width: 100%;
  }
}
</style>
