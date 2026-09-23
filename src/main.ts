import { createSSRApp } from 'vue'
import App from './App.vue'
import { installRouterGuards } from './router'
import pinia from './stores'

/** uni-app 入口：创建 Vue 应用，安装 Pinia 与路由导航拦截器。 */
export function createApp() {
  const app = createSSRApp(App)

  app.use(pinia)
  installRouterGuards()

  return {
    app,
  }
}
