import type { StorageLike } from 'pinia-plugin-persistedstate'

/** 将 uni.storage 的值转换为持久化插件要求的字符串或 null。 */
const normalizeStoredValue = (value: unknown): string | null => {
  if (value === undefined || value === null || value === '') return null
  return typeof value === 'string' ? value : JSON.stringify(value)
}

/** Pinia 持久化的跨端存储适配器，底层读写 uni.storage。 */
export const uniStorage: StorageLike = {
  getItem(key) {
    return normalizeStoredValue(uni.getStorageSync(key))
  },
  setItem(key, value) {
    uni.setStorageSync(key, value)
  },
}

export default uniStorage
