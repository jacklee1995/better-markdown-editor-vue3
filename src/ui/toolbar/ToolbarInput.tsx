import { defineComponent, type PropType } from 'vue'

export interface ToolbarInputProps {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  onBlur?: (event: FocusEvent) => void
  onFocus?: (event: FocusEvent) => void
}

// 工具栏输入框组件
export default defineComponent({
  name: 'ToolbarInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    onChange: {
      type: Function as PropType<(value: string) => void>,
      default: () => {},
    },
    onBlur: {
      type: Function as PropType<(event: FocusEvent) => void>,
      default: () => {},
    },
    onFocus: {
      type: Function as PropType<(event: FocusEvent) => void>,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const handleInput = (event: Event) => {
      const value = (event.target as HTMLInputElement).value
      emit('update:value', value)
      props.onChange(value)
    }

    const handleBlur = (event: FocusEvent) => {
      props.onBlur(event)
    }

    const handleFocus = (event: FocusEvent) => {
      props.onFocus(event)
    }

    return () => (
      <input
        class="toolbar-input"
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onInput={handleInput}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    )
  },
})
