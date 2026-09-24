<template>
  <view class="app-tab-page">
    <view class="app-tab-page__content">
      <slot />
    </view>

    <AppTabBar
      :active="active"
      :message-count="messageCount"
      @change="emit('update:active', $event)"
    />
  </view>
</template>

<script setup lang="ts">
import AppTabBar from '@/components/AppTabBar/index.vue'
import type { TabKey } from '@/components/AppTabBar/tabs'

withDefaults(
  defineProps<{
    active: TabKey
    messageCount?: number
  }>(),
  {
    messageCount: 0,
  },
)

const emit = defineEmits<{
  'update:active': [key: TabKey]
}>()
</script>

<style scoped lang="scss">
.app-tab-page {
  --app-tab-bar-height: 112rpx;

  box-sizing: border-box;
  min-height: 100vh;
  padding-bottom: calc(var(--app-tab-bar-height) + constant(safe-area-inset-bottom));
  padding-bottom: calc(var(--app-tab-bar-height) + env(safe-area-inset-bottom));
  background: #f5f7fb;
}

.app-tab-page__content {
  box-sizing: border-box;
  min-height: calc(100vh - var(--app-tab-bar-height) - constant(safe-area-inset-bottom));
  min-height: calc(100vh - var(--app-tab-bar-height) - env(safe-area-inset-bottom));
}
</style>
