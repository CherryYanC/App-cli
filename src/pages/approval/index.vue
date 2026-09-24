<template>
  <view class="page">
    <TabPagePlaceholder
      icon="compose"
      title="暂无待审批事项"
      description="后续可在这里接入待办、已办、我发起的流程。"
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
