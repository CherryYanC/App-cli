import {
  type AbortablePromise,
  createRequestHeaders,
  getRequestConfig,
  handleUnauthorized,
  isBusinessSuccessCode,
  isUnauthorizedCode,
  readBusinessMessage,
  RequestError,
  resolveRequestUrl,
  showRequestError,
} from './request'

type NativeUploadOptions = Omit<
  UniApp.UploadFileOption,
  'url' | 'filePath' | 'name' | 'header' | 'success' | 'fail' | 'complete'
>

export type UploadOptions = NativeUploadOptions & {
  url: string
  filePath: string
  name?: string
  baseURL?: string
  headers?: Record<string, string>
  withToken?: boolean
  showErrorToast?: boolean
}

/** uni.uploadFile 的响应是字符串；能解析为 JSON 时返回对象。 */
const parseUploadResponse = <T>(data: string): T => {
  try {
    return JSON.parse(data) as T
  } catch {
    return data as T
  }
}

const readResponseCode = (data: unknown) => {
  if (typeof data !== 'object' || data === null || !('code' in data)) return undefined
  return (data as { code: number | string }).code
}

/**
 * 上传本地文件，并复用请求层的 URL、鉴权、错误提示和业务码配置。
 * 返回解析后的完整响应；Promise 附带 abort() 以便取消上传。
 */
export const upload = <TResponse = unknown>(
  options: UploadOptions,
): AbortablePromise<TResponse> => {
  const config = getRequestConfig()
  const {
    url,
    filePath,
    name = 'file',
    baseURL,
    headers,
    withToken = true,
    showErrorToast = config.showErrorToast,
    ...nativeOptions
  } = options

  let task: UniApp.UploadTask | undefined
  const promise = new Promise<TResponse>((resolve, reject) => {
    let requestUrl: string
    try {
      requestUrl = resolveRequestUrl(url, baseURL)
    } catch (error) {
      reject(error)
      return
    }

    task = uni.uploadFile({
      ...nativeOptions,
      url: requestUrl,
      filePath,
      name,
      header: createRequestHeaders(headers, withToken),
      success(response) {
        const data = parseUploadResponse<TResponse>(response.data)
        const businessCode = readResponseCode(data)

        if (response.statusCode === 401 || (businessCode && isUnauthorizedCode(businessCode))) {
          void handleUnauthorized()
        }

        const isHttpSuccess = response.statusCode >= 200 && response.statusCode < 300
        const isBusinessSuccess = businessCode === undefined || isBusinessSuccessCode(businessCode)
        if (isHttpSuccess && isBusinessSuccess) {
          resolve(data)
          return
        }

        const message = readBusinessMessage(
          data,
          `上传失败（${businessCode || response.statusCode}）`,
        )
        showRequestError(message, showErrorToast)
        reject(new RequestError(message, { statusCode: response.statusCode }))
      },
      fail(error) {
        const message = /abort/i.test(error.errMsg) ? '上传已取消' : error.errMsg || '文件上传失败'
        if (!/abort/i.test(error.errMsg)) showRequestError(message, showErrorToast)
        reject(new RequestError(message, { cause: error }))
      },
    })
  }) as AbortablePromise<TResponse>

  promise.abort = () => task?.abort()
  return promise
}

export default upload
