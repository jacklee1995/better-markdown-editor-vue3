import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import DefListTerm from './DefListTerm'
import DefListDefinition from './DefListDefinition'

/**
 * 定义列表渲染器的属性接口
 */
interface DefListRendererProps {
  /**
   * 定义列表的数据
   */
  data: Array<{
    term: string
    definition: string
  }>
}

/**
 * 定义列表渲染器组件
 * 用于将定义列表的数据渲染为 HTML
 */
export default defineComponent({
  name: 'DefListRenderer',
  props: {
    data: {
      type: Array as PropType<DefListRendererProps['data']>,
      required: true,
    },
  },
  setup(props: DefListRendererProps) {
    /**
     * 渲染定义列表
     * @returns 渲染后的虚拟 DOM
     */
    const renderDefList = () => {
      return h(
        'dl',
        props.data.map(({ term, definition }) => [
          h(DefListTerm, { term }),
          h(DefListDefinition, { definition }),
        ]),
      )
    }

    return () => renderDefList()
  },
})
