<template>
  <view class="placeholder">
    <view class="placeholder__icon">
      <uni-icons :type="icon" :size="36" color="#2563eb" />
    </view>
    <text class="placeholder__title">{{ title }}</text>
    <text class="placeholder__description">{{ description }}</text>
  </view>
</template>

<script setup lang="ts">
import type { UniIconsType } from '@uni-helper/uni-ui-types'

defineProps<{
  icon: UniIconsType
  title: string
  description: string
}>()
</script>

<style scoped lang="scss">
.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 40rpx;
  text-align: center;
  background: #fff;
  border: 1rpx solid #e8ecf4;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(23, 32, 51, 0.05);
}

.placeholder__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 104rpx;
  height: 104rpx;
  margin-bottom: 28rpx;
  background: #eff6ff;
  border-radius: 30rpx;
}

.placeholder__title {
  margin-bottom: 14rpx;
  font-size: 32rpx;
  font-weight: 700;
  color: #172033;
}

.placeholder__description {
  font-size: 26rpx;
  line-height: 1.65;
  color: #7c879e;
}
</style>
