export interface RequestRuntimeConfig {
  baseURL: string
  timeout: number
  tokenKey: string
  tokenScheme: string
  showErrorToast: boolean
  headers: Record<string, string>
  successCodes: Array<number | string>
  unauthorizedCodes: Array<number | string>
  onUnauthorized?: () => void | Promise<void>
}

export interface ApiResponse<T> {
  code: number | string
  data: T
  msg?: string
  message?: string
}

export interface AbortablePromise<T> extends Promise<T> {
  abort: () => void
}

type NativeRequestOptions = Omit<
  UniApp.RequestOptions,
  'url' | 'data' | 'header' | 'timeout' | 'success' | 'fail' | 'complete'
>

export type RequestOptions<TData = unknown> = NativeRequestOptions & {
  url: string
  data?: TData
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
  withToken?: boolean
  showErrorToast?: boolean
}

interface RequestErrorOptions {
  statusCode?: number
  response?: UniApp.RequestSuccessCallbackResult
  cause?: unknown
}

const runtimeConfig: RequestRuntimeConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 15000,
  tokenKey: 'token',
  tokenScheme: 'Bearer',
  showErrorToast: true,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  successCodes: [0, 200, '0', '200'],
  unauthorizedCodes: [401, '401'],
}

let unauthorizedTask: Promise<void> | undefined

/** 统一的请求异常，保留 HTTP 状态、原始响应或底层错误以便排查。 */
export class RequestError extends Error {
  statusCode?: number
  response?: UniApp.RequestSuccessCallbackResult
  cause?: unknown

  constructor(message: string, options: RequestErrorOptions = {}) {
    super(message)
    this.name = 'RequestError'
    Object.assign(this, options)
  }
}

/** 更新后续请求使用的全局配置；headers 与现有默认请求头合并。 */
export const configureRequest = (config: Partial<RequestRuntimeConfig>) => {
  const headers = config.headers
    ? { ...runtimeConfig.headers, ...config.headers }
    : runtimeConfig.headers
  Object.assign(runtimeConfig, config, { headers })
}

/** 获取当前运行时配置（原对象）；主要供上传等同一网络层模块复用。 */
export const getRequestConfig = () => runtimeConfig
/** 根据可配置的 successCodes 判断后端业务码是否成功。 */
export const isBusinessSuccessCode = (code: number | string) =>
  runtimeConfig.successCodes.includes(code)
/** 根据可配置的 unauthorizedCodes 判断后端业务码是否表示未登录。 */
export const isUnauthorizedCode = (code: number | string) =>
  runtimeConfig.unauthorizedCodes.includes(code)

/** 触发统一未授权回调，并合并短时间内的重复触发。 */
export const handleUnauthorized = () => {
  if (!runtimeConfig.onUnauthorized || unauthorizedTask) return unauthorizedTask

  unauthorizedTask = Promise.resolve(runtimeConfig.onUnauthorized())
    .catch(() => undefined)
    .finally(() => {
      setTimeout(() => {
        unauthorizedTask = undefined
      }, 300)
    })

  return unauthorizedTask
}

/** 绝对 URL 原样使用；相对路径与 baseURL 拼接，未配置 baseURL 时抛错。 */
export const resolveRequestUrl = (url: string, baseURL = runtimeConfig.baseURL) => {
  if (/^https?:\/\//i.test(url)) return url
  if (!baseURL) throw new RequestError('未配置 VITE_API_BASE_URL')
  return `${baseURL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`
}

/** 合并默认头、存储中的 token 和本次自定义头；自定义头优先级最高。 */
export const createRequestHeaders = (headers: Record<string, string> = {}, withToken = true) => {
  const token = withToken ? uni.getStorageSync<string>(runtimeConfig.tokenKey) : ''
  const authorization = token ? `${runtimeConfig.tokenScheme} ${String(token)}`.trim() : undefined

  return {
    ...runtimeConfig.headers,
    ...(authorization ? { Authorization: authorization } : {}),
    ...headers,
  }
}

/** 按全局或本次请求的开关显示统一错误 Toast。 */
export const showRequestError = (message: string, enabled = runtimeConfig.showErrorToast) => {
  if (enabled) uni.showToast({ title: message, icon: 'none', duration: 2500 })
}

/** 从响应体提取 msg/message，缺失时使用兜底文案。 */
export const readBusinessMessage = (data: unknown, fallback: string) => {
  if (typeof data !== 'object' || data === null) return fallback
  const body = data as Record<string, unknown>
  return String(body.msg || body.message || fallback)
}

const normalizeNetworkError = (error: UniApp.GeneralCallbackResult) => {
  if (/abort/i.test(error.errMsg)) return '请求已取消'
  if (/timeout/i.test(error.errMsg)) return '接口请求超时'
  if (/network|request:fail/i.test(error.errMsg)) return '网络连接异常'
  return error.errMsg || '请求失败，请稍后重试'
}

/**
 * 发起 uni.request，校验 HTTP 状态后返回原始响应体，不解析业务 code。
 * 返回的 Promise 附带 abort()，可在页面卸载等场景取消请求。
 */
export const request = <TResponse = unknown, TData = unknown>(
  options: RequestOptions<TData>,
): AbortablePromise<TResponse> => {
  const {
    url,
    data,
    baseURL,
    timeout = runtimeConfig.timeout,
    headers,
    withToken = true,
    showErrorToast = runtimeConfig.showErrorToast,
    ...nativeOptions
  } = options

  let task: UniApp.RequestTask | undefined
  const promise = new Promise<TResponse>((resolve, reject) => {
    let requestUrl: string
    try {
      requestUrl = resolveRequestUrl(url, baseURL)
    } catch (error) {
      reject(error)
      return
    }

    task = uni.request({
      ...nativeOptions,
      url: requestUrl,
      data: data as UniApp.RequestOptions['data'],
      timeout,
      header: createRequestHeaders(headers, withToken),
      success(response) {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(response.data as TResponse)
          return
        }

        if (response.statusCode === 401) void handleUnauthorized()
        const message = readBusinessMessage(response.data, `请求失败（${response.statusCode}）`)
        showRequestError(message, showErrorToast)
        reject(new RequestError(message, { statusCode: response.statusCode, response }))
      },
      fail(error) {
        const message = normalizeNetworkError(error)
        if (!/abort/i.test(error.errMsg)) showRequestError(message, showErrorToast)
        reject(new RequestError(message, { cause: error }))
      },
    })
  }) as AbortablePromise<TResponse>

  promise.abort = () => task?.abort()
  return promise
}

/**
 * 用于 { code, data, msg } 格式的业务接口：校验业务码并只返回 data。
 * 沿用 request 的 HTTP 错误处理与 abort() 取消能力。
 */
export const requestData = <TResponse, TData = unknown>(
  options: RequestOptions<TData>,
): AbortablePromise<TResponse> => {
  const task = request<ApiResponse<TResponse>, TData>(options)
  const promise = task.then((response) => {
    if (isUnauthorizedCode(response.code)) void handleUnauthorized()

    if (!isBusinessSuccessCode(response.code)) {
      const message = response.msg || response.message || `业务请求失败（${response.code}）`
      showRequestError(message, options.showErrorToast)
      throw new RequestError(message)
    }

    return response.data
  }) as AbortablePromise<TResponse>

  promise.abort = task.abort
  return promise
}

export default request
