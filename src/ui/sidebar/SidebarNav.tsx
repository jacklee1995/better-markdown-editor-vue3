import { defineComponent, type PropType } from 'vue'
import SidebarNavItem from './SidebarNavItem'

export interface SidebarNavItem {
  /**
   * 导航项的标题
   */
  title: string
  /**
   * 导航项的图标类名
   */
  icon?: string
  /**
   * 导航项的链接地址
   */
  to?: string
  /**
   * 导航项的点击事件处理函数
   */
  onClick?: () => void
}

export interface SidebarNavProps {
  /**
   * 导航项列表
   */
  items?: SidebarNavItem[]
}

export default defineComponent({
  name: 'SidebarNav',
  props: {
    items: {
      type: Array as PropType<SidebarNavItem[]>,
      default: () => [],
    },
  },
  setup(props) {
    return () => (
      <nav class="sidebar-nav">
        {props.items.map((item) => (
          <SidebarNavItem {...item} />
        ))}
      </nav>
    )
  },
})
