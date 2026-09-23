import type { AppRoute } from './routes'

export type NavigationMethod = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab'
export type NavigationGuard = (to: string, method: NavigationMethod) => boolean

const guards = new Set<NavigationGuard>()
let installed = false

/** 注册全局导航守卫；返回注销函数，适合在页面/模块卸载时清理。 */
export const addNavigationGuard = (guard: NavigationGuard) => {
  guards.add(guard)
  return () => guards.delete(guard)
}

/**
 * 创建登录校验守卫：白名单页直接放行，其余页面无 token 时重启到登录页。
 * getToken 由调用方提供，避免路由层直接依赖具体的用户 Store。
 */
export const createAuthGuard = (options: {
  getToken: () => unknown
  loginRoute: AppRoute
  whiteList?: AppRoute[]
}): NavigationGuard => {
  const whiteList = new Set([options.loginRoute, ...(options.whiteList || [])])

  return (to) => {
    const path = to.split('?')[0] as AppRoute
    if (whiteList.has(path) || options.getToken()) return true

    uni.reLaunch({ url: options.loginRoute })
    return false
  }
}

/**
 * 通过 uni.addInterceptor 安装导航拦截器；重复调用不会重复注册。
 * 只拦截这四种主动导航 API，不处理应用冷启动时直接进入的页面。
 */
export const installRouterGuards = () => {
  if (installed) return
  installed = true

  const methods: NavigationMethod[] = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
  methods.forEach((method) => {
    uni.addInterceptor(method, {
      invoke(args: { url?: string }) {
        return Array.from(guards).every((guard) => guard(args.url || '', method))
      },
    })
  })
}
