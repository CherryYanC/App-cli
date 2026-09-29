<template>
  <view class="hero-card">
    <view class="hero-card__glow hero-card__glow--one" />
    <view class="hero-card__glow hero-card__glow--two" />

    <view class="hero-card__top">
      <view>
        <text class="hero-card__eyebrow">DATA WORKSPACE</text>
        <text class="hero-card__title">早上好，欢迎回来</text>
        <text class="hero-card__subtitle">这里是你的业务数据概览</text>
      </view>
      <view class="mock-badge">
        <view class="mock-badge__dot" />
        <text>MOCK DATA</text>
      </view>
    </view>

    <view class="hero-card__bottom">
      <view class="hero-card__status">
        <text class="hero-card__status-value">{{ health }}%</text>
        <text class="hero-card__status-label">本期目标完成度</text>
      </view>
      <view class="hero-card__divider" />
      <view class="hero-card__status">
        <text class="hero-card__status-value">{{ activeDevices }}</text>
        <text class="hero-card__status-label">活跃设备</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  health: number
  activeDevices: string
}>()
</script>

<style scoped lang="scss">
.hero-card {
  position: relative;
  box-sizing: border-box;
  min-height: 350rpx;
  padding: 40rpx;
  overflow: hidden;
  color: #ffffff;
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 55%, #4f46e5 100%);
  border-radius: 32rpx;
  box-shadow: 0 24rpx 64rpx rgba(37, 99, 235, 0.22);
}

.hero-card__glow {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.hero-card__glow--one {
  top: -130rpx;
  right: -60rpx;
  width: 360rpx;
  height: 360rpx;
}

.hero-card__glow--two {
  right: 210rpx;
  bottom: -180rpx;
  width: 300rpx;
  height: 300rpx;
}

.hero-card__top,
.hero-card__bottom {
  position: relative;
  display: flex;
  align-items: center;
}

.hero-card__top {
  align-items: flex-start;
  justify-content: space-between;
}

.hero-card__eyebrow,
.hero-card__title,
.hero-card__subtitle,
.hero-card__status-value,
.hero-card__status-label {
  display: block;
}

.hero-card__eyebrow {
  margin-bottom: 14rpx;
  font-size: 20rpx;
  font-weight: 700;
  letter-spacing: 4rpx;
  opacity: 0.72;
}

.hero-card__title {
  margin-bottom: 12rpx;
  font-size: 44rpx;
  font-weight: 700;
  line-height: 1.25;
}

.hero-card__subtitle {
  font-size: 25rpx;
  opacity: 0.78;
}

.mock-badge {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 10rpx;
  padding: 12rpx 18rpx;
  margin-left: 24rpx;
  font-size: 19rpx;
  font-weight: 700;
  letter-spacing: 1rpx;
  background: rgba(255, 255, 255, 0.15);
  border: 1rpx solid rgba(255, 255, 255, 0.22);
  border-radius: 999rpx;
}

.mock-badge__dot {
  width: 12rpx;
  height: 12rpx;
  background: #86efac;
  border-radius: 50%;
  box-shadow: 0 0 0 6rpx rgba(134, 239, 172, 0.14);
}

.hero-card__bottom {
  margin-top: 52rpx;
}

.hero-card__status {
  min-width: 200rpx;
}

.hero-card__status-value {
  margin-bottom: 6rpx;
  font-size: 36rpx;
  font-weight: 700;
}

.hero-card__status-label {
  font-size: 21rpx;
  opacity: 0.7;
}

.hero-card__divider {
  width: 1rpx;
  height: 58rpx;
  margin: 0 38rpx;
  background: rgba(255, 255, 255, 0.22);
}

@media screen and (min-width: 768px) {
  .hero-card {
    min-height: 250px;
    padding: 36px 42px;
    border-radius: 24px;
  }

  .hero-card__title {
    font-size: 30px;
  }

  .hero-card__bottom {
    margin-top: 44px;
  }
}

@media screen and (max-width: 370px) {
  .hero-card {
    padding: 32rpx;
  }

  .mock-badge {
    display: none;
  }
}
</style>
