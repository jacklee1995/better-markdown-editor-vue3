import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import FootnoteReference from './FootnoteReference'
import FootnoteDefinition from './FootnoteDefinition'

/**
 * 脚注渲染器的属性接口
 */
interface FootnoteRendererProps {
  /**
   * 脚注的数据
   */
  footnotes: Array<{
    name: string
    content: string
  }>
}

/**
 * 脚注渲染器组件
 * 用于将脚注的数据渲染为 HTML
 */
export default defineComponent({
  name: 'FootnoteRenderer',
  props: {
    footnotes: {
      type: Array as PropType<FootnoteRendererProps['footnotes']>,
      required: true,
    },
  },
  setup(props: FootnoteRendererProps) {
    /**
     * 渲染脚注的引用部分
     * @param name 脚注名称
     * @returns 渲染后的虚拟 DOM
     */
    const renderFootnoteReference = (name: string) => {
      return h(FootnoteReference, { name })
    }

    /**
     * 渲染脚注的定义部分
     * @param name 脚注名称
     * @param content 脚注内容
     * @returns 渲染后的虚拟 DOM
     */
    const renderFootnoteDefinition = (name: string, content: string) => {
      return h(FootnoteDefinition, { name, content })
    }

    /**
     * 渲染脚注
     * @returns 渲染后的虚拟 DOM
     */
    const renderFootnotes = () => {
      const footnoteReferences = props.footnotes.map(({ name }) => renderFootnoteReference(name))
      const footnoteDefinitions = props.footnotes.map(({ name, content }) =>
        renderFootnoteDefinition(name, content),
      )

      return [
        // 渲染脚注的引用部分
        ...footnoteReferences,
        // 渲染脚注的定义部分
        h('div', { class: 'footnote-definitions' }, footnoteDefinitions),
      ]
    }

    return () => renderFootnotes()
  },
})
