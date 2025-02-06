import { defineComponent, type PropType } from 'vue'
import type { SidebarNavItem } from './SidebarNav'

export interface SidebarNavGroupProps {
  /**
   * 导航分组的标题
   */
  title: string
  /**
   * 导航分组的图标类名
   */
  icon?: string
  /**
   * 导航分组包含的导航项列表
   */
  items?: SidebarNavItem[]
  /**
   * 导航分组是否可以折叠
   */
  collapsible?: boolean
  /**
   * 导航分组是否默认展开
   */
  defaultOpen?: boolean
}

export default defineComponent({
  name: 'SidebarNavGroup',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    items: {
      type: Array as PropType<SidebarNavItem[]>,
      default: () => [],
    },
    collapsible: {
      type: Boolean,
      default: false,
    },
    defaultOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // 根据 defaultOpen 的值设置初始的折叠状态
    const isOpen = ref(props.defaultOpen)

    // 切换分组的折叠状态
    const toggleCollapse = () => {
      if (props.collapsible) {
        isOpen.value = !isOpen.value
      }
    }

    return () => (
      <div class={['sidebar-nav-group', { 'is-collapsible': props.collapsible }]}>
        <div class="sidebar-nav-group-title" onClick={toggleCollapse}>
          {props.icon && <i class={`icon ${props.icon}`} />}
          <span>{props.title}</span>
          {props.collapsible && (
            <i class={['icon', 'collapse-icon', { 'is-open': isOpen.value }]} />
          )}
        </div>
        {/* 使用 v-show 指令控制分组内容的显示和隐藏 */}
        <div v-show={isOpen.value} class="sidebar-nav-group-items">
          {/* 渲染分组内的导航项 */}
          {props.items.map((item) => (
            <SidebarNavItem {...item} />
          ))}
        </div>
      </div>
    )
  },
})
