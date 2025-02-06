import { defineComponent } from 'vue'
import type { PropType } from 'vue'

/**
 * 代码块语言选择器的属性接口
 */
interface CodeBlockLangSelectProps {
  /**
   * 当前选中的语言
   */
  language: string
  /**
   * 可选的语言列表
   */
  languages: string[]
  /**
   * 语言选择变化时的回调函数
   */
  onChange: (language: string) => void
}

/**
 * 代码块语言选择器组件
 * 用于选择代码块的语言,从而实现语法高亮
 */
export default defineComponent({
  name: 'CodeBlockLangSelect',
  props: {
    language: {
      type: String,
      required: true,
    },
    languages: {
      type: Array as PropType<string[]>,
      required: true,
    },
    onChange: {
      type: Function as PropType<(language: string) => void>,
      required: true,
    },
  },
  setup(props: CodeBlockLangSelectProps, { emit }) {
    /**
     * 处理语言选择变化的事件
     * @param event 选择事件对象
     */
    const handleChange = (event: Event) => {
      const target = event.target as HTMLSelectElement
      const value = target.value
      // 触发语言变化事件
      emit('change', value)
    }

    return () => (
      <select class="code-block-lang-select" value={props.language} onChange={handleChange}>
        {props.languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    )
  },
})
