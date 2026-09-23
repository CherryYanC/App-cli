import type { AppRoute, RouteTarget } from './routes'

/** 保留当前页面并打开新页面；url 可由 buildRoute 生成。 */
export const navigateTo = (url: RouteTarget, options: Omit<UniApp.NavigateToOptions, 'url'> = {}) =>
  uni.navigateTo({ ...options, url })

/** 关闭当前页面并跳转到目标页面，不增加页面栈层级。 */
export const redirectTo = (url: RouteTarget, options: Omit<UniApp.RedirectToOptions, 'url'> = {}) =>
  uni.redirectTo({ ...options, url })

/** 清空页面栈后打开目标页面，常用于退出登录后的重置跳转。 */
export const reLaunch = (url: RouteTarget, options: Omit<UniApp.ReLaunchOptions, 'url'> = {}) =>
  uni.reLaunch({ ...options, url })

/** 切换到 tabBar 页面；目标必须是 pages.json 中配置的 tabBar 路径。 */
export const switchTab = (url: AppRoute, options: Omit<UniApp.SwitchTabOptions, 'url'> = {}) =>
  uni.switchTab({ ...options, url })

/** 返回上一页；可通过 options.delta 指定返回的层数。 */
export const navigateBack = (options: UniApp.NavigateBackOptions = {}) => uni.navigateBack(options)
