import { defineComponent } from 'vue'

/**
 * 脚注定义组件的属性接口
 */
interface FootnoteDefinitionProps {
  /**
   * 脚注名称
   */
  name: string
  /**
   * 脚注内容
   */
  content: string
}

/**
 * 脚注定义组件
 * 用于渲染脚注的定义部分
 */
export default defineComponent({
  name: 'FootnoteDefinition',
  props: {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  setup(props: FootnoteDefinitionProps) {
    /**
     * 渲染脚注定义
     * @returns 渲染后的虚拟 DOM
     */
    const renderFootnoteDefinition = () => {
      return (
        <div class="footnote-definition" id={`footnote-definition-${props.name}`}>
          <sup>{props.name}</sup>
          <p>{props.content}</p>
        </div>
      )
    }

    return () => renderFootnoteDefinition()
  },
})
