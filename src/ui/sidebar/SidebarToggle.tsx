import { defineComponent, type PropType } from 'vue'

export interface SidebarToggleProps {
  /**
   * 侧边栏是否折叠
   */
  collapsed?: boolean
  /**
   * 切换侧边栏折叠状态的事件处理函数
   */
  onToggle?: (collapsed: boolean) => void
}

export default defineComponent({
  name: 'SidebarToggle',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    onToggle: {
      type: Function as PropType<(collapsed: boolean) => void>,
      default: () => {},
    },
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const handleClick = () => {
      const newCollapsed = !props.collapsed
      emit('toggle', newCollapsed)
      props.onToggle(newCollapsed)
    }

    return () => (
      <div class="sidebar-toggle" onClick={handleClick}>
        <i class={['icon', 'toggle-icon', { collapsed: props.collapsed }]} />
      </div>
    )
  },
})
