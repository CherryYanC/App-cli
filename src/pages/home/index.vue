<template>
  <view class="page">
    <view class="page-header">
      <text class="page-header__eyebrow">SPIRIT FOX</text>
      <text class="page-header__title">首页</text>
      <text class="page-header__description">欢迎回来，开始处理今天的工作。</text>
    </view>

    <TabPagePlaceholder
      icon="home-filled"
      title="首页内容待完善"
      description="这里可以继续接入工作台、快捷入口和数据概览。"
    />
  </view>
</template>

<script setup lang="ts">
import TabPagePlaceholder from '@/components/TabPagePlaceholder/index.vue'
</script>

<style scoped lang="scss">
.page {
  box-sizing: border-box;
  padding: 40rpx 32rpx;
}

.page-header {
  display: flex;
  flex-direction: column;
  padding: 24rpx 8rpx 40rpx;
}

.page-header__eyebrow {
  margin-bottom: 12rpx;
  font-size: 20rpx;
  font-weight: 700;
  color: #2563eb;
  letter-spacing: 3rpx;
}

.page-header__title {
  margin-bottom: 12rpx;
  font-size: 48rpx;
  font-weight: 700;
  color: #172033;
}

.page-header__description {
  font-size: 26rpx;
  line-height: 1.65;
  color: #7c879e;
}
</style>
