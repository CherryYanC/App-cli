<template>
  <view class="page">
    <TabPagePlaceholder
      icon="person-filled"
      title="个人中心待完善"
      description="后续可扩展个人资料、偏好设置和账户安全。"
    />
  </view>
</template>

<script setup lang="ts">
import TabPagePlaceholder from '@/components/TabPagePlaceholder/index.vue'
</script>

<style scoped lang="scss">
.page {
  box-sizing: border-box;
  padding: 48rpx 32rpx;
}
</style>
