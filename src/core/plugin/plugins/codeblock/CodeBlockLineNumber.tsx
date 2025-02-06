import { defineComponent, onMounted, ref } from 'vue'
import { countCodeLines } from './CodeBlockUtils'

/**
 * 代码块行号的属性接口
 */
interface CodeBlockLineNumberProps {
  /**
   * 代码内容
   */
  code: string
}

/**
 * 代码块行号组件
 * 根据代码内容生成行号,并显示在代码块的左侧
 */
export default defineComponent({
  name: 'CodeBlockLineNumber',
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  setup(props: CodeBlockLineNumberProps) {
    /**
     * 代码行数的响应式状态
     */
    const lineCount = ref(0)

    // 在组件挂载后计算代码行数
    onMounted(() => {
      lineCount.value = countCodeLines(props.code)
    })

    return () => (
      <div class="code-block-line-number">
        {Array.from({ length: lineCount.value }, (_, index) => (
          <span key={index + 1}>{index + 1}</span>
        ))}
      </div>
    )
  },
})
