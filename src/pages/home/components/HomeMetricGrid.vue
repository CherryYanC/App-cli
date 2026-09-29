<template>
  <view class="metric-grid">
    <view v-for="metric in metrics" :key="metric.label" class="metric-card">
      <view class="metric-card__header">
        <view class="metric-card__icon" :style="{ backgroundColor: metric.iconBackground }">
          <uni-icons :type="metric.icon" size="19" :color="metric.color" />
        </view>
        <view class="trend-chip" :class="{ 'trend-chip--down': metric.trend < 0 }">
          <uni-icons
            :type="metric.trend < 0 ? 'arrow-down' : 'arrow-up'"
            size="11"
            :color="metric.trend < 0 ? '#e11d48' : '#059669'"
          />
          <text>{{ Math.abs(metric.trend) }}%</text>
        </view>
      </view>
      <text class="metric-card__value">{{ metric.value }}</text>
      <text class="metric-card__label">{{ metric.label }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { DashboardMetric } from '../dashboard'

defineProps<{
  metrics: DashboardMetric[]
}>()
</script>

<style scoped lang="scss">
.metric-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20rpx;
  margin-bottom: 24rpx;
}

.metric-card {
  box-sizing: border-box;
  min-width: 0;
  padding: 26rpx;
  background: #ffffff;
  border: 1rpx solid #e8edf4;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 30rpx rgba(15, 23, 42, 0.04);
}

.metric-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.metric-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 66rpx;
  height: 66rpx;
  border-radius: 18rpx;
}

.trend-chip {
  display: flex;
  align-items: center;
  gap: 3rpx;
  padding: 7rpx 11rpx;
  color: #059669;
  font-size: 19rpx;
  font-weight: 600;
  background: #ecfdf5;
  border-radius: 999rpx;
}

.trend-chip--down {
  color: #e11d48;
  background: #fff1f2;
}

.metric-card__value,
.metric-card__label {
  display: block;
}

.metric-card__value {
  margin-top: 24rpx;
  overflow: hidden;
  color: #172033;
  font-size: 36rpx;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.metric-card__label {
  margin-top: 8rpx;
  color: #7c879e;
  font-size: 22rpx;
}

@media screen and (min-width: 768px) {
  .metric-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media screen and (max-width: 370px) {
  .metric-card__value {
    font-size: 32rpx;
  }
}
</style>
