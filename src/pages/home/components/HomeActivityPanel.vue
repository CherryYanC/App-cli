<template>
  <view class="activity-panel">
    <view class="panel__header">
      <view>
        <text class="section-title">近期动态</text>
        <text class="section-description">基于 Mock 数据生成</text>
      </view>
      <view class="activity-panel__count">{{ activities.length }} 条</view>
    </view>

    <view class="activity-list">
      <view v-for="(activity, index) in activities" :key="activity.title" class="activity-item">
        <view class="activity-item__icon" :style="{ backgroundColor: activity.background }">
          <uni-icons :type="activity.icon" size="18" :color="activity.color" />
        </view>
        <view class="activity-item__body">
          <view class="activity-item__content">
            <text class="activity-item__title">{{ activity.title }}</text>
            <text class="activity-item__description">{{ activity.description }}</text>
          </view>
          <text class="activity-item__time">{{ activity.time }}</text>
        </view>
        <view v-if="index < activities.length - 1" class="activity-item__line" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { DashboardActivity } from '../dashboard'

defineProps<{
  activities: DashboardActivity[]
}>()
</script>

<style scoped lang="scss">
.activity-panel {
  box-sizing: border-box;
  padding: 30rpx;
  margin: 24rpx 0;
  background: #ffffff;
  border: 1rpx solid #e8edf4;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 30rpx rgba(15, 23, 42, 0.04);
}

.panel__header,
.activity-item__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel__header {
  margin-bottom: 20rpx;
}

.section-title,
.section-description,
.activity-item__title,
.activity-item__description {
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

.activity-panel__count {
  padding: 8rpx 14rpx;
  color: #64748b;
  font-size: 20rpx;
  background: #f1f5f9;
  border-radius: 999rpx;
}

.activity-list {
  margin-top: 4rpx;
}

.activity-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 20rpx;
  padding: 21rpx 0;
}

.activity-item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 64rpx;
  height: 64rpx;
  border-radius: 18rpx;
}

.activity-item__body {
  flex: 1;
  min-width: 0;
  gap: 16rpx;
}

.activity-item__content {
  min-width: 0;
}

.activity-item__title {
  overflow: hidden;
  color: #334155;
  font-size: 24rpx;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.activity-item__description {
  margin-top: 7rpx;
  overflow: hidden;
  color: #94a3b8;
  font-size: 21rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.activity-item__time {
  flex-shrink: 0;
  color: #94a3b8;
  font-size: 20rpx;
}

.activity-item__line {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 84rpx;
  height: 1rpx;
  background: #edf1f5;
}
</style>
