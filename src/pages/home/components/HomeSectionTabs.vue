<template>
  <scroll-view class="section-tabs" scroll-x :show-scrollbar="false">
    <view class="section-tabs__inner">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        class="section-tab"
        :class="{ 'section-tab--active': active === tab.key }"
        @click="emit('change', tab.key)"
      >
        <text>{{ tab.label }}</text>
        <view v-if="active === tab.key" class="section-tab__indicator" />
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import type { DashboardTabKey } from '../dashboard'

defineProps<{
  active: DashboardTabKey
  tabs: Array<{ key: DashboardTabKey; label: string }>
}>()

const emit = defineEmits<{
  change: [key: DashboardTabKey]
}>()
</script>

<style scoped lang="scss">
.section-tabs {
  width: 100%;
  margin: 28rpx 0;
  white-space: nowrap;
  background: #ffffff;
  border: 1rpx solid #e8edf4;
  border-radius: 22rpx;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.035);
}

.section-tabs__inner {
  display: flex;
  min-width: 100%;
}

.section-tab {
  position: relative;
  flex: 1;
  min-width: 190rpx;
  padding: 29rpx 20rpx;
  text-align: center;
  color: #7c879e;
  font-size: 27rpx;
  font-weight: 500;
  transition: color 180ms ease;
}

.section-tab--active {
  color: #2563eb;
  font-weight: 700;
}

.section-tab__indicator {
  position: absolute;
  right: 32%;
  bottom: 0;
  left: 32%;
  height: 5rpx;
  background: #2563eb;
  border-radius: 999rpx 999rpx 0 0;
}
</style>
