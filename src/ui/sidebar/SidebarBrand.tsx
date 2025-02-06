import { defineComponent, type PropType } from 'vue'

export interface SidebarBrandProps {
  /**
   * 品牌图标的 URL 或类名
   */
  icon?: string
  /**
   * 品牌标题
   */
  title?: string
  /**
   * 品牌的链接地址
   */
  href?: string
  /**
   * 品牌的点击事件处理函数
   */
  onClick?: () => void
}

export default defineComponent({
  name: 'SidebarBrand',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
    onClick: {
      type: Function as PropType<() => void>,
      default: () => {},
    },
  },
  setup(props) {
    const handleClick = (event: MouseEvent) => {
      if (props.href) {
        // 如果提供了 href 属性,则执行默认的链接跳转行为
        return
      }
      // 阻止默认行为,防止触发链接跳转
      event.preventDefault()
      // 触发 onClick 事件
      props.onClick()
    }

    return () => (
      <div class="sidebar-brand">
        <a href={props.href} onClick={handleClick}>
          {props.icon && <img class="sidebar-brand-icon" src={props.icon} alt="brand icon" />}
          {props.title && <span class="sidebar-brand-title">{props.title}</span>}
        </a>
      </div>
    )
  },
})
