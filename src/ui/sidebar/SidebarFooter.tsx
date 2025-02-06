import { defineComponent, type PropType } from 'vue'

export interface SidebarFooterProps {
  /**
   * 侧边栏底部的内容,可以是一个渲染函数或插槽
   */
  content?: () => JSX.Element | JSX.Element[]
}

export default defineComponent({
  name: 'SidebarFooter',
  props: {
    content: {
      type: Function as PropType<() => JSX.Element | JSX.Element[]>,
      default: () => null,
    },
  },
  setup(props, { slots }) {
    return () => (
      <div class="sidebar-footer">
        {/* 优先使用 content 属性,如果没有提供,则使用插槽 */}
        {props.content ? props.content() : slots.default?.()}
      </div>
    )
  },
})
