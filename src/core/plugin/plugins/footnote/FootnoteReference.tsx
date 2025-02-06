import { defineComponent } from 'vue'

/**
 * 脚注引用组件的属性接口
 */
interface FootnoteReferenceProps {
  /**
   * 脚注名称
   */
  name: string
}

/**
 * 脚注引用组件
 * 用于渲染脚注的引用部分
 */
export default defineComponent({
  name: 'FootnoteReference',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props: FootnoteReferenceProps) {
    /**
     * 渲染脚注引用
     * @returns 渲染后的虚拟 DOM
     */
    const renderFootnoteReference = () => {
      return (
        <sup class="footnote-reference">
          <a href={`#footnote-definition-${props.name}`}>[{props.name}]</a>
        </sup>
      )
    }

    return () => renderFootnoteReference()
  },
})
