# Spirit Fox App

基于 Vue 3、TypeScript、Vite 和 uni-app 的多端应用基座，目标平台为：

- H5
- Android
- iOS
- HarmonyOS

## 技术栈

| 技术                        | 用途               |
| --------------------------- | ------------------ |
| uni-app                     | 多端应用框架       |
| Vue 3                       | 页面与组件开发     |
| TypeScript                  | 类型检查           |
| Vite                        | 开发与构建工具     |
| uni-ui                      | 官方跨端 UI 组件库 |
| ECharts + lime-echart       | H5 与 App 跨端图表 |
| Pinia                       | 全局状态管理       |
| pinia-plugin-persistedstate | Pinia 状态持久化   |
| Sass                        | 样式预处理         |
| ESLint                      | 代码质量检查       |
| Prettier                    | 代码格式化         |
| Husky + lint-staged         | Git 提交前检查     |

## 环境准备

基础环境：

- Node.js 18 或更高版本，建议使用当前维护中的 LTS 版本
- npm

原生平台还需要：

- Android、iOS：安装 HBuilderX 及对应平台的开发环境
- iOS：需要 macOS 和 Xcode
- HarmonyOS：安装 DevEco Studio，并准备 HarmonyOS 工程及签名配置

检查本地环境：

```bash
node -v
npm -v
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

项目统一使用 npm。请提交并维护 `package-lock.json`，不要新增 pnpm 或 Yarn 锁文件。复制 `.env.example` 并按环境确认 `VITE_API_BASE_URL`；仓库已提供开发与生产环境模板。

### 2. 启动 H5

```bash
npm run dev:h5
```

根据终端输出访问本地开发地址。修改源码后页面会自动更新。

### 3. 启用 Git 提交检查

项目已经存在 Git 仓库时，执行：

```bash
npx husky install
```

提交代码时，Husky 会调用 lint-staged，对暂存区中的代码执行 ESLint 修复和 Prettier 格式化。

如果当前目录还不是 Git 仓库，需要先执行：

```bash
git init
npx husky install
```

## 开发与构建命令

`package.json` 仅保留四个平台的开发和构建脚本。

| 平台      | 开发模式                  | 生产构建                    |
| --------- | ------------------------- | --------------------------- |
| H5        | `npm run dev:h5`          | `npm run build:h5`          |
| Android   | `npm run dev:app-android` | `npm run build:app-android` |
| iOS       | `npm run dev:app-ios`     | `npm run build:app-ios`     |
| HarmonyOS | `npm run dev:app-harmony` | `npm run build:app-harmony` |

### H5

```bash
npm run dev:h5
npm run build:h5
```

生产文件输出到 `dist/build/h5`。

### Android

```bash
npm run dev:app-android
npm run build:app-android
```

开发资源输出到 `dist/dev/app`，生产资源输出到 `dist/build/app`。需要使用 HBuilderX 导入对应目录并选择 Android 设备或模拟器运行；APK/AAB 的签名与发行操作也需在 HBuilderX 中完成。

### iOS

```bash
npm run dev:app-ios
npm run build:app-ios
```

开发资源输出到 `dist/dev/app`，生产资源输出到 `dist/build/app`。需要在 macOS 上使用 HBuilderX，并配合 Xcode、模拟器或真机运行。证书、描述文件和 App Store 发布信息需在发布前配置。

### HarmonyOS

```bash
npm run dev:app-harmony
npm run build:app-harmony
```

开发资源输出到 `dist/dev/app-harmony`，生产资源输出到 `dist/build/app-harmony`。正式联调前，需要在 `src/manifest.json` 的 `app-harmony` 配置中补充 DevEco Studio 工程信息。

## 代码检查

类型检查：

```bash
npx vue-tsc --noEmit --skipLibCheck
```

ESLint 检查与修复：

```bash
npx eslint . --ext .vue,.js,.cjs,.mjs,.ts,.tsx --ignore-path .gitignore
npx eslint . --ext .vue,.js,.cjs,.mjs,.ts,.tsx --fix --ignore-path .gitignore
```

Prettier 检查与格式化：

```bash
npx prettier --check .
npx prettier --write .
```

手动检查暂存区文件：

```bash
npx lint-staged
```

## 图表组件

`src/components/BaseChart/index.vue` 封装了 ECharts，底层使用 `src/uni_modules/lime-echart` 处理 uni-app 画布。页面按需导入即可，首页仍保持 Hello World。

```vue
<script setup lang="ts">
import BaseChart from '@/components/BaseChart/index.vue'
import type { EChartsOption } from 'echarts'

const chartOptions: EChartsOption = {
  xAxis: { type: 'category', data: ['周一', '周二', '周三'] },
  yAxis: { type: 'value' },
  series: [{ type: 'line', data: [12, 20, 16] }],
}
</script>

<template>
  <BaseChart :options="chartOptions" height="400rpx" />
</template>
```

常用属性有 `width`、`height`、`loading`、`group`、`theme`、`disableScroll`、`showAxisPointer` 和 `emptyMode`（`placeholder` 或 `chart`）。组件会发出 `chartReady` / `ready`、`error`、`chartClick`、`showTip`、`hideTip` 和 `dataZoom` 事件。通过模板 ref 可调用 `getChart()`、`resizeChart()`、`initChart()`、`getImg()`；其中 `getImg()` 是异步方法，返回当前平台可用的图片临时路径。图表容器必须有非零高度。

## 项目结构

```text
spirit-fox-app/
├── .hbuilderx/              # HBuilderX 运行配置
├── .husky/                  # Git Hooks
├── .vscode/                 # VS Code 推荐扩展与工作区配置
├── src/
│   ├── components/BaseChart/ # 跨端 ECharts 组件
│   ├── composables/         # Vue Composition API 复用逻辑
│   ├── pages/
│   │   └── index.vue        # 当前唯一页面
│   ├── router/              # 路由常量、导航封装和守卫
│   ├── services/
│   │   ├── index.ts         # 网络层统一导出
│   │   ├── request.ts       # HTTP 请求与业务响应封装
│   │   └── upload.ts        # 文件上传封装
│   ├── uni_modules/         # lime-echart 跨端画布适配
│   ├── stores/
│   │   ├── modules/app.ts   # 持久化示例 Store
│   │   ├── storage.ts       # 基于 uni.storage 的跨端适配
│   │   └── index.ts         # Pinia 与持久化插件入口
│   ├── App.vue              # 应用根组件与全局样式入口
│   ├── env.d.ts             # Vite/Vue 类型声明
│   ├── main.ts              # 应用创建与插件注册入口
│   ├── manifest.json        # 应用及各平台发行配置
│   ├── pages.json           # 页面路由和全局导航配置
│   └── uni.scss             # uni-app 全局 Sass 变量
├── .env.example             # 环境变量示例
├── .env.development         # 开发环境配置
├── .env.production          # 生产环境配置模板
├── unpackage/res/icons/     # Android/iOS 应用图标
├── index.html               # H5 HTML 入口
├── package.json             # 依赖与平台脚本
├── package-lock.json        # npm 依赖锁文件
├── tsconfig.json            # TypeScript 与路径别名配置
└── vite.config.ts           # Vite/uni-app 构建配置
```

## 应用启动流程

```text
src/main.ts
  ├── 创建 Vue 应用
  ├── 注册 Pinia 与跨端持久化
  ├── 安装路由守卫拦截器
  └── 加载 App.vue
       └── 根据 pages.json 加载 pages/index.vue
```

`@/` 已映射到 `src/`，推荐使用别名导入：

```ts
import example from '@/services/example'
```

## 开发约定

### 新增页面

1. 在 `src/pages` 下创建页面文件。
2. 在 `src/pages.json` 的 `pages` 数组中注册页面。
3. 在 `src/router/routes.ts` 中增加对应的路由常量。
4. 通过 `@/router` 导出的类型化导航函数跳转。

页面注册示例：

```json
{
  "path": "pages/profile/index",
  "style": {
    "navigationBarTitleText": "个人中心"
  }
}
```

页面跳转示例：

```ts
// 先在 routes.ts 的 ROUTES 中增加 PROFILE: '/pages/profile/index'
import { buildRoute, navigateTo, ROUTES } from '@/router'

navigateTo(buildRoute(ROUTES.PROFILE, { source: 'home' }))
```

### 新增组件

跨页面复用的组件放在 `src/components`。页面私有组件可以放在对应页面目录下，避免全局组件目录不断膨胀。

uni-ui 已通过 `pages.json` 的 easycom 规则配置，无需手动 import 即可在模板中使用：

```vue
<template>
  <uni-card title="标题">内容</uni-card>
</template>
```

### 新增组合式逻辑

可复用的 Composition API 逻辑放在 `src/composables`，文件建议使用 `useXxx.ts` 命名，例如 `src/composables/useLocation.ts`。

### 新增状态模块

Pinia 已在 `src/main.ts` 注册，并通过 `src/stores/storage.ts` 使用 `uni.getStorageSync/setStorageSync` 统一四端持久化。建议在 `src/stores/modules` 中按业务域创建 Store。

```ts
// src/stores/modules/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
  }),
  persist: true,
})
```

持久化插件已全局注册。需要持久化的 Store 设置 `persist: true`；临时页面状态不要持久化。

### 新增请求接口

网络层统一从 `@/services` 导入。默认 API 地址读取 `VITE_API_BASE_URL`，Token 从本地存储的 `token` 字段读取，并以 `Bearer` 方式写入 `Authorization` 请求头。

```env
VITE_API_BASE_URL=https://api.example.com
```

```ts
import { configureRequest, request, requestData, upload } from '@/services'

// 返回完整响应体
const profileRequest = request<UserProfile>({ url: '/user/profile' })
const profile = await profileRequest
// 页面销毁时可调用 profileRequest.abort()

// 解包 { code, data, msg } 格式的业务响应
const users = await requestData<User[]>({
  url: '/users',
  data: { pageNum: 1 },
})

// 文件上传
await upload({ url: '/files', filePath, name: 'file' })

// 可选：统一调整超时和登录失效处理
configureRequest({
  timeout: 20000,
  onUnauthorized: () => uni.removeStorageSync('token'),
})
```

API 请求、响应类型和数据转换逻辑统一放在 `src/services`。页面只负责调用服务并处理页面状态，不在页面中散落请求地址和鉴权逻辑。

### 平台差异代码

使用 uni-app 条件编译处理平台差异：

```ts
// #ifdef H5
console.log('H5 only')
// #endif

// #ifdef APP-ANDROID
console.log('Android only')
// #endif

// #ifdef APP-IOS
console.log('iOS only')
// #endif

// #ifdef APP-HARMONY
console.log('HarmonyOS only')
// #endif
```

通用逻辑应优先保持跨端，只有平台 API 或交互确实不同时才使用条件编译。

## 关键配置

### `src/pages.json`

管理页面注册、导航栏、TabBar 和全局页面样式。新页面创建后必须在这里注册，否则无法通过路由访问。

### `src/manifest.json`

管理应用名称、App ID、版本号、平台模块、权限、图标和发行配置。当前仍是初始化配置，正式开发或发布前至少需要确认：

- `name`、`appid`、`description`
- `versionName`、`versionCode`
- Android 包名、权限与签名
- iOS Bundle ID、证书与描述文件
- HarmonyOS 工程和签名信息
- `unpackage/res/icons` 中的应用图标

敏感的证书、私钥、密码和生产密钥不得提交到仓库。

### `src/uni.scss`

存放品牌色、功能色、中性色、字号、间距、圆角、阴影、动效、层级、安全区 mixin，以及 uni-app/uni-ui 兼容变量。这里只放变量和 mixin，不输出具体业务 CSS。

### `vite.config.ts`

注册 uni-app 的 Vite 插件并管理构建配置。新增 Vite 插件前应先确认其对四个目标平台均兼容。

## 构建产物

所有构建产物位于 `dist/`，该目录已加入 `.gitignore`，不应提交到代码仓库。

常见输出目录：

```text
dist/dev/h5
dist/dev/app
dist/dev/app-harmony
dist/build/h5
dist/build/app
dist/build/app-harmony
```
