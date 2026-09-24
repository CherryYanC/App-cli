<template>
  <view class="tab-bar-safe-area">
    <view class="tab-bar">
      <view
        v-for="item in tabItems"
        :key="item.key"
        class="tab-bar__item"
        :class="{ 'tab-bar__item--active': active === item.key }"
        @tap="handleSelect(item)"
      >
        <view class="tab-bar__icon">
          <uni-icons
            :type="active === item.key ? item.activeIcon : item.icon"
            :size="24"
            :color="active === item.key ? activeColor : inactiveColor"
          />
          <text v-if="item.key === 'message' && messageCount > 0" class="tab-bar__badge">
            {{ badgeText }}
          </text>
        </view>
        <text class="tab-bar__label">{{ item.label }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { APP_TAB_ITEMS, type AppTabItem, type TabKey } from './tabs'

const props = withDefaults(
  defineProps<{
    active: TabKey
    messageCount?: number
    activeColor?: string
    inactiveColor?: string
  }>(),
  {
    messageCount: 0,
    activeColor: '#2563eb',
    inactiveColor: '#8a94a6',
  },
)

const emit = defineEmits<{
  change: [key: TabKey]
}>()

const tabItems = APP_TAB_ITEMS

const badgeText = computed(() => (props.messageCount > 99 ? '99+' : String(props.messageCount)))

const handleSelect = (item: AppTabItem) => {
  if (item.key === props.active) return
  emit('change', item.key)
}
</script>

<style scoped lang="scss">
.tab-bar-safe-area {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  // 页面内容最高使用 sticky(100)，弹窗遮罩从 overlay(1000) 开始。
  z-index: $app-z-index-tab-bar;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background: rgba(255, 255, 255, 0.96);
  border-top: 1rpx solid #e9edf4;
  box-shadow: 0 -8rpx 28rpx rgba(23, 32, 51, 0.06);
}

.tab-bar {
  display: flex;
  height: var(--app-tab-bar-height, 112rpx);
}

.tab-bar__item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #8a94a6;
}

.tab-bar__icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 50rpx;
  margin-bottom: 2rpx;
  border-radius: 24rpx;
}

.tab-bar__item--active .tab-bar__icon {
  background: #eff6ff;
}

.tab-bar__label {
  font-size: 22rpx;
  font-weight: 500;
  line-height: 30rpx;
}

.tab-bar__item--active .tab-bar__label {
  font-weight: 600;
  color: #2563eb;
}

.tab-bar__badge {
  position: absolute;
  top: -8rpx;
  right: -16rpx;
  box-sizing: border-box;
  min-width: 30rpx;
  height: 30rpx;
  padding: 0 6rpx;
  font-size: 18rpx;
  font-weight: 600;
  line-height: 26rpx;
  color: #fff;
  text-align: center;
  background: #ef4444;
  border: 2rpx solid #fff;
  border-radius: 18rpx;
}
</style>
