<template>
  <AppTabPage v-model:active="activeTab">
    <view v-if="visitedTabs.home" v-show="activeTab === 'home'" class="tab-panel">
      <HomeTab />
    </view>
    <view v-if="visitedTabs.approval" v-show="activeTab === 'approval'" class="tab-panel">
      <ApprovalTab />
    </view>
    <view v-if="visitedTabs.message" v-show="activeTab === 'message'" class="tab-panel">
      <MessageTab />
    </view>
    <view v-if="visitedTabs.profile" v-show="activeTab === 'profile'" class="tab-panel">
      <ProfileTab />
    </view>
  </AppTabPage>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import AppTabPage from '@/components/AppTabPage/index.vue'
import { APP_TAB_ITEMS, type TabKey } from '@/components/AppTabBar/tabs'
import ApprovalTab from '@/pages/approval/index.vue'
import HomeTab from '@/pages/home/index.vue'
import MessageTab from '@/pages/message/index.vue'
import ProfileTab from '@/pages/mine/index.vue'

const activeTab = ref<TabKey>('home')
const visitedTabs = reactive<Record<TabKey, boolean>>({
  home: true,
  approval: false,
  message: false,
  profile: false,
})

watch(activeTab, (key) => {
  // 首次访问时挂载组件；之后仅切换显隐，保留组件状态且不重复执行初始化请求。
  visitedTabs[key] = true

  const title = APP_TAB_ITEMS.find((item) => item.key === key)?.label
  if (title) uni.setNavigationBarTitle({ title })
})
</script>

<style scoped lang="scss">
.tab-panel {
  min-height: 100%;
}
</style>
