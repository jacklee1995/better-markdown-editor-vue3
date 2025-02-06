import { defineComponent, ref } from 'vue'
import { copyToClipboard } from './CodeBlockUtils'

/**
 * 代码块复制按钮的属性接口
 */
interface CodeBlockCopyButtonProps {
  /**
   * 要复制的代码内容
   */
  code: string
}

/**
 * 代码块复制按钮组件
 * 点击按钮可以将代码块的内容复制到剪贴板
 */
export default defineComponent({
  name: 'CodeBlockCopyButton',
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  setup(props: CodeBlockCopyButtonProps) {
    /**
     * 是否已复制的响应式状态
     */
    const copied = ref(false)

    /**
     * 处理点击复制按钮的事件
     */
    const handleClick = () => {
      // 将代码内容复制到剪贴板
      copyToClipboard(props.code)
      // 设置复制状态为已复制
      copied.value = true
      // 2秒后恢复复制状态
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }

    return () => (
      <button class="code-block-copy-button" onClick={handleClick}>
        {copied.value ? 'Copied!' : 'Copy'}
      </button>
    )
  },
})
