import type { UniIconsType } from '@uni-helper/uni-ui-types'

export type DashboardTabKey = 'overview' | 'traffic' | 'conversion'

export interface DashboardMetric {
  label: string
  value: string
  trend: number
  icon: UniIconsType
  color: string
  iconBackground: string
}

export interface DashboardSource {
  name: string
  value: number
  percent: number
  color: string
}

export interface DashboardActivity {
  title: string
  description: string
  time: string
  icon: UniIconsType
  color: string
  background: string
}

export interface DashboardContent {
  chartTitle: string
  legend: string
  metrics: DashboardMetric[]
  sources: DashboardSource[]
  trendBase: number[]
}

export const DASHBOARD_TABS: Array<{ key: DashboardTabKey; label: string }> = [
  { key: 'overview', label: '业务概览' },
  { key: 'traffic', label: '流量分析' },
  { key: 'conversion', label: '转化表现' },
]

export const QUICK_RANGES = [
  { label: '近 7 天', days: 7 },
  { label: '近 30 天', days: 30 },
  { label: '近 90 天', days: 90 },
]

export const DASHBOARD_CONTENT: Record<DashboardTabKey, DashboardContent> = {
  overview: {
    chartTitle: '业务趋势',
    legend: '访问量',
    metrics: [
      {
        label: '总访问量',
        value: '128,460',
        trend: 12.8,
        icon: 'eye-filled',
        color: '#2563eb',
        iconBackground: '#eff6ff',
      },
      {
        label: '新增用户',
        value: '8,924',
        trend: 8.4,
        icon: 'personadd-filled',
        color: '#7c3aed',
        iconBackground: '#f5f3ff',
      },
      {
        label: '转化订单',
        value: '3,286',
        trend: 5.7,
        icon: 'cart-filled',
        color: '#ea580c',
        iconBackground: '#fff7ed',
      },
      {
        label: '客单价',
        value: '¥ 268.4',
        trend: -1.6,
        icon: 'wallet-filled',
        color: '#059669',
        iconBackground: '#ecfdf5',
      },
    ],
    sources: [
      { name: '自然访问', value: 4628, percent: 42, color: '#2563eb' },
      { name: '活动推广', value: 3184, percent: 29, color: '#7c3aed' },
      { name: '内容推荐', value: 2092, percent: 19, color: '#14b8a6' },
      { name: '其他渠道', value: 1102, percent: 10, color: '#cbd5e1' },
    ],
    trendBase: [820, 932, 901, 1134, 1290, 1330, 1520],
  },
  traffic: {
    chartTitle: '访问趋势',
    legend: '独立访客',
    metrics: [
      {
        label: '页面浏览',
        value: '286,310',
        trend: 16.2,
        icon: 'eye-filled',
        color: '#2563eb',
        iconBackground: '#eff6ff',
      },
      {
        label: '独立访客',
        value: '96,742',
        trend: 9.3,
        icon: 'staff-filled',
        color: '#7c3aed',
        iconBackground: '#f5f3ff',
      },
      {
        label: '平均停留',
        value: '04:26',
        trend: 3.8,
        icon: 'calendar-filled',
        color: '#ea580c',
        iconBackground: '#fff7ed',
      },
      {
        label: '跳出率',
        value: '28.6%',
        trend: -4.2,
        icon: 'flag-filled',
        color: '#059669',
        iconBackground: '#ecfdf5',
      },
    ],
    sources: [
      { name: '搜索引擎', value: 5870, percent: 46, color: '#2563eb' },
      { name: '直接访问', value: 3579, percent: 28, color: '#7c3aed' },
      { name: '社交媒体', value: 2170, percent: 17, color: '#14b8a6' },
      { name: '外部链接', value: 1148, percent: 9, color: '#cbd5e1' },
    ],
    trendBase: [1080, 1260, 1215, 1480, 1630, 1760, 1920],
  },
  conversion: {
    chartTitle: '转化趋势',
    legend: '转化次数',
    metrics: [
      {
        label: '有效线索',
        value: '12,680',
        trend: 11.4,
        icon: 'chatboxes-filled',
        color: '#2563eb',
        iconBackground: '#eff6ff',
      },
      {
        label: '下单用户',
        value: '4,268',
        trend: 7.6,
        icon: 'person-filled',
        color: '#7c3aed',
        iconBackground: '#f5f3ff',
      },
      {
        label: '支付订单',
        value: '3,286',
        trend: 5.7,
        icon: 'cart-filled',
        color: '#ea580c',
        iconBackground: '#fff7ed',
      },
      {
        label: '转化率',
        value: '7.84%',
        trend: 2.3,
        icon: 'fire-filled',
        color: '#059669',
        iconBackground: '#ecfdf5',
      },
    ],
    sources: [
      { name: '商品详情', value: 1380, percent: 42, color: '#2563eb' },
      { name: '营销活动', value: 986, percent: 30, color: '#7c3aed' },
      { name: '直播入口', value: 591, percent: 18, color: '#14b8a6' },
      { name: '其他页面', value: 329, percent: 10, color: '#cbd5e1' },
    ],
    trendBase: [286, 352, 326, 418, 486, 521, 574],
  },
}

export const DASHBOARD_ACTIVITIES: DashboardActivity[] = [
  {
    title: '移动端访问量达到新高',
    description: '较上一统计周期提升 18.6%',
    time: '10 分钟前',
    icon: 'fire-filled',
    color: '#ea580c',
    background: '#fff7ed',
  },
  {
    title: '营销活动完成阶段目标',
    description: '秋季增长计划完成率已达 82%',
    time: '1 小时前',
    icon: 'checkbox-filled',
    color: '#059669',
    background: '#ecfdf5',
  },
  {
    title: '数据日报已生成',
    description: '多端业务数据同步完成',
    time: '今天 08:30',
    icon: 'paperclip',
    color: '#7c3aed',
    background: '#f5f3ff',
  },
]
