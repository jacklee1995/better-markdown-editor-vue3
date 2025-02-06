import { defineComponent } from 'vue'

export interface ToolbarTextProps {
  text?: string
}

export default defineComponent({
  name: 'ToolbarText',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => <span class="toolbar-text">{props.text}</span>
  },
})
