<template>
  <view class="page">
    <TabPagePlaceholder
      icon="chat-filled"
      title="暂时没有新消息"
      description="这里将汇总系统通知、审批提醒和业务消息。"
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
