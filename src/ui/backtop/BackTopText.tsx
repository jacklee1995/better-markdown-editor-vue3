import { defineComponent } from 'vue'

export interface BackTopTextProps {
  /**
   * 回到顶部的文本内容
   */
  text?: string
}

export default defineComponent({
  name: 'BackTopText',
  props: {
    text: {
      type: String,
      default: 'Back to top',
    },
  },
  setup(props) {
    return () => <span class="backtop-text">{props.text}</span>
  },
})
