/** pages.json 中已注册页面的路径常量，避免在业务代码中散落字符串。 */
export const ROUTES = {
  HOME: '/pages/home/index',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
export type RouteQuery = Record<string, string | number | boolean | null | undefined>
export type RouteTarget = AppRoute | `${AppRoute}?${string}`

/**
 * 为页面路径拼接查询参数，供 navigateTo / redirectTo 等导航函数使用。
 * null、undefined 会被忽略；其余值转为字符串并进行 URL 编码。
 * 例如 buildRoute(ROUTES.HOME, { from: '通知中心' }) 返回带编码参数的页面地址。
 */
export const buildRoute = (route: AppRoute, query: RouteQuery = {}): RouteTarget => {
  const search = Object.entries(query)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&')

  return search ? `${route}?${search}` : route
}
