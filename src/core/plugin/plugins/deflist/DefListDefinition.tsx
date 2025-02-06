import { defineComponent } from 'vue'

/**
 * 定义列表定义组件的属性接口
 */
interface DefListDefinitionProps {
  /**
   * 定义文本
   */
  definition: string
}

/**
 * 定义列表定义组件
 * 用于渲染定义列表中的定义部分
 */
export default defineComponent({
  name: 'DefListDefinition',
  props: {
    definition: {
      type: String,
      required: true,
    },
  },
  setup(props: DefListDefinitionProps) {
    /**
     * 渲染定义列表的定义部分
     * @returns 渲染后的虚拟 DOM
     */
    const renderDefinition = () => {
      return (
        <dd>
          <p>{props.definition}</p>
        </dd>
      )
    }

    return () => renderDefinition()
  },
})
