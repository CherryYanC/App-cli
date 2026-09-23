import { defineStore } from 'pinia'

/** 应用级状态；hasLaunched 会通过 Pinia 持久化到 uni.storage。 */
export const useAppStore = defineStore('app', {
  state: () => ({
    hasLaunched: false,
  }),
  actions: {
    /** 记录应用已启动，供需要识别首次启动的页面读取。 */
    markAsLaunched() {
      this.hasLaunched = true
    },
  },
  persist: {
    paths: ['hasLaunched'],
  },
})
