import { defineComponent } from 'vue'

/**
 * 定义列表术语组件的属性接口
 */
interface DefListTermProps {
  /**
   * 术语文本
   */
  term: string
}

/**
 * 定义列表术语组件
 * 用于渲染定义列表中的术语部分
 */
export default defineComponent({
  name: 'DefListTerm',
  props: {
    term: {
      type: String,
      required: true,
    },
  },
  setup(props: DefListTermProps) {
    return () => <dt>{props.term}</dt>
  },
})
