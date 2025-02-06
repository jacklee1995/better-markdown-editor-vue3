import { defineComponent, type PropType } from 'vue'
import type { SidebarItem } from './Sidebar'

export interface SidebarGroupProps {
  /**
   * 分组标题
   */
  title?: string
  /**
   * 分组图标类名
   */
  icon?: string
  /**
   * 分组包含的侧边栏项
   */
  items?: SidebarItem[]
  /**
   * 分组是否可以折叠
   */
  collapsible?: boolean
  /**
   * 分组是否默认展开
   */
  defaultOpen?: boolean
}

export default defineComponent({
  name: 'SidebarGroup',
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    items: {
      type: Array as PropType<SidebarItem[]>,
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
      <div class={['sidebar-group', { 'is-collapsible': props.collapsible }]}>
        <div class="sidebar-group-title" onClick={toggleCollapse}>
          {props.icon && <i class={`icon ${props.icon}`} />}
          <span>{props.title}</span>
          {props.collapsible && (
            <i class={['icon', 'collapse-icon', { 'is-open': isOpen.value }]} />
          )}
        </div>
        {/* 使用 v-show 指令控制分组内容的显示和隐藏 */}
        <div v-show={isOpen.value} class="sidebar-group-content">
          {/* 递归渲染分组内的侧边栏项 */}
          {props.items.map((item) => {
            switch (item.type) {
              case 'item':
                return <SidebarItem {...item} />
              case 'group':
                return <SidebarGroup {...item} />
              case 'divider':
                return <SidebarDivider {...item} />
              default:
                return null
            }
          })}
        </div>
      </div>
    )
  },
})
