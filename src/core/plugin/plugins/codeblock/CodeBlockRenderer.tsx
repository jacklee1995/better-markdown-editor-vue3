import { defineComponent, onMounted, ref } from 'vue'
import hljs from 'highlight.js'
import CodeBlockLangSelect from './CodeBlockLangSelect'
import CodeBlockCopyButton from './CodeBlockCopyButton'
import CodeBlockLineNumber from './CodeBlockLineNumber'

/**
 * 代码块渲染器的属性接口
 */
interface CodeBlockRendererProps {
  /**
   * 代码内容
   */
  code: string
  /**
   * 代码语言
   */
  language: string
}

/**
 * 代码块渲染器组件
 * 负责将代码块渲染为带有行号、语言选择和复制按钮的代码块
 */
export default defineComponent({
  name: 'CodeBlockRenderer',
  props: {
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  setup(props: CodeBlockRendererProps) {
    /**
     * 代码块的 pre 元素的引用
     */
    const preRef = ref<HTMLPreElement | null>(null)

    // 在组件挂载后进行代码高亮
    onMounted(() => {
      if (preRef.value) {
        hljs.highlightBlock(preRef.value)
      }
    })

    return () => (
      <div class="code-block">
        <CodeBlockLangSelect
          language={props.language}
          languages={['javascript', 'typescript', 'java', 'python']}
          onChange={(lang) => console.log(`changed to ${lang}`)}
        />
        <pre ref={preRef}>
          <code class={`language-${props.language}`}>{props.code}</code>
        </pre>
        <CodeBlockCopyButton code={props.code} />
        <CodeBlockLineNumber code={props.code} />
      </div>
    )
  },
})
