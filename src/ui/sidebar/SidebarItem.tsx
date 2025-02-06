import { defineComponent, type PropType } from 'vue'

export interface SidebarItemProps {
  /**
   * 项的标题
   */
  title?: string
  /**
   * 项的图标类名
   */
  icon?: string
  /**
   * 项的链接地址
   */
  to?: string
  /**
   * 项的点击事件处理函数
   */
  onClick?: () => void
}

export default defineComponent({
  name: 'SidebarItem',
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
    onClick: {
      type: Function as PropType<() => void>,
      default: () => {},
    },
  },
  setup(props) {
    const handleClick = () => {
      if (props.to) {
        // 如果提供了 to 属性,则执行路由跳转
        // 这里假设你使用了 Vue Router
        // 你需要根据实际情况调整这部分代码
        // router.push(props.to)
      } else {
        // 否则触发 onClick 事件
        props.onClick()
      }
    }

    return () => (
      <div class="sidebar-item" onClick={handleClick}>
        {props.icon && <i class={`icon ${props.icon}`} />}
        {props.title && <span>{props.title}</span>}
      </div>
    )
  },
})
