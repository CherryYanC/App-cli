<template>
  <view class="filter-card">
    <view class="filter-card__heading">
      <view>
        <text class="section-title">数据周期</text>
        <text class="section-description">选择日期后自动更新当前视图</text>
      </view>
      <view class="refresh-button" @click="emit('refresh')">
        <uni-icons type="refresh" size="16" color="#2563eb" />
        <text>刷新 Mock</text>
      </view>
    </view>

    <view class="quick-ranges">
      <view
        v-for="range in ranges"
        :key="range.days"
        class="quick-range"
        :class="{ 'quick-range--active': selectedRange === range.days }"
        @click="emit('rangeChange', range.days)"
      >
        {{ range.label }}
      </view>
    </view>

    <view class="date-range">
      <picker mode="date" :value="startDate" :end="endDate" @change="handleStartChange">
        <view class="date-picker">
          <uni-icons type="calendar" size="18" color="#64748b" />
          <view class="date-picker__content">
            <text class="date-picker__label">开始日期</text>
            <text class="date-picker__value">{{ formatDisplayDate(startDate) }}</text>
          </view>
          <uni-icons type="right" size="14" color="#94a3b8" />
        </view>
      </picker>

      <text class="date-range__separator">至</text>

      <picker
        mode="date"
        :value="endDate"
        :start="startDate"
        :end="today"
        @change="handleEndChange"
      >
        <view class="date-picker">
          <uni-icons type="calendar" size="18" color="#64748b" />
          <view class="date-picker__content">
            <text class="date-picker__label">结束日期</text>
            <text class="date-picker__value">{{ formatDisplayDate(endDate) }}</text>
          </view>
          <uni-icons type="right" size="14" color="#94a3b8" />
        </view>
      </picker>
    </view>
  </view>
</template>

<script setup lang="ts">
import { formatDisplayDate } from '../date'

interface PickerChangeEvent {
  detail: { value: string }
}

defineProps<{
  ranges: Array<{ label: string; days: number }>
  selectedRange: number
  startDate: string
  endDate: string
  today: string
}>()

const emit = defineEmits<{
  refresh: []
  rangeChange: [days: number]
  startChange: [value: string]
  endChange: [value: string]
}>()

function handleStartChange(event: PickerChangeEvent): void {
  emit('startChange', event.detail.value)
}

function handleEndChange(event: PickerChangeEvent): void {
  emit('endChange', event.detail.value)
}
</script>

<style scoped lang="scss">
.filter-card {
  box-sizing: border-box;
  padding: 30rpx;
  margin-bottom: 24rpx;
  background: #ffffff;
  border: 1rpx solid #e8edf4;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 30rpx rgba(15, 23, 42, 0.04);
}

.filter-card__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title,
.section-description {
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

.refresh-button {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 13rpx 18rpx;
  color: #2563eb;
  font-size: 23rpx;
  font-weight: 600;
  background: #eff6ff;
  border-radius: 12rpx;
}

.quick-ranges {
  display: flex;
  gap: 14rpx;
  margin-top: 28rpx;
}

.quick-range {
  padding: 14rpx 24rpx;
  color: #64748b;
  font-size: 23rpx;
  background: #f8fafc;
  border: 1rpx solid #e2e8f0;
  border-radius: 999rpx;
}

.quick-range--active {
  color: #2563eb;
  font-weight: 600;
  background: #eff6ff;
  border-color: #bfdbfe;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 18rpx;
  margin-top: 24rpx;
}

.date-range picker {
  flex: 1;
}

.date-picker {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: 92rpx;
  padding: 15rpx 20rpx;
  background: #f8fafc;
  border: 1rpx solid #e2e8f0;
  border-radius: 16rpx;
}

.date-picker__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 14rpx;
}

.date-picker__label {
  margin-bottom: 5rpx;
  color: #94a3b8;
  font-size: 19rpx;
}

.date-picker__value {
  color: #334155;
  font-size: 24rpx;
  font-weight: 600;
}

.date-range__separator {
  flex-shrink: 0;
  color: #94a3b8;
  font-size: 22rpx;
}

@media screen and (max-width: 370px) {
  .date-range {
    align-items: stretch;
    flex-direction: column;
  }

  .date-range__separator {
    display: none;
  }
}
</style>
