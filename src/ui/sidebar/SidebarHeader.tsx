import { defineComponent, type PropType } from 'vue'

export interface SidebarHeaderProps {
  /**
   * 侧边栏头部的标题
   */
  title?: string
  /**
   * 侧边栏头部的额外内容,可以是一个渲染函数或插槽
   */
  extra?: () => JSX.Element | JSX.Element[]
}

export default defineComponent({
  name: 'SidebarHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
    extra: {
      type: Function as PropType<() => JSX.Element | JSX.Element[]>,
      default: () => null,
    },
  },
  setup(props, { slots }) {
    return () => (
      <div class="sidebar-header">
        <div class="sidebar-header-title">{props.title}</div>
        <div class="sidebar-header-extra">
          {/* 优先使用 extra 属性,如果没有提供,则使用插槽 */}
          {props.extra ? props.extra() : slots.extra?.()}
        </div>
      </div>
    )
  },
})
