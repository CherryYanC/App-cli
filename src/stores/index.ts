import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import uniStorage from './storage'

const pinia = createPinia()

pinia.use(
  createPersistedState({
    storage: uniStorage,
    key: (storeKey) => `spirit-fox:${storeKey}`,
  }),
)

export { useAppStore } from './modules/app'
export default pinia
