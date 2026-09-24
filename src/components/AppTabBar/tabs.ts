import type { UniIconsType } from '@uni-helper/uni-ui-types'

export type TabKey = 'home' | 'approval' | 'message' | 'profile'

export type AppTabItem = {
  key: TabKey
  label: string
  icon: UniIconsType
  activeIcon: UniIconsType
}

/** 底部导航的唯一配置源。新增或调整菜单时只需要维护这里。 */
export const APP_TAB_ITEMS: readonly AppTabItem[] = [
  { key: 'home', label: '首页', icon: 'home', activeIcon: 'home-filled' },
  {
    key: 'approval',
    label: '审批',
    icon: 'compose',
    activeIcon: 'compose',
  },
  {
    key: 'message',
    label: '消息',
    icon: 'chat',
    activeIcon: 'chat-filled',
  },
  {
    key: 'profile',
    label: '我的',
    icon: 'person',
    activeIcon: 'person-filled',
  },
]
