import { defineComponent, ref, type PropType } from 'vue'

export interface ToolbarSelectOption {
  value: string
  text: string
}

export interface ToolbarSelectProps {
  value?: string
  options?: ToolbarSelectOption[]
  onChange?: (value: string) => void
}

export default defineComponent({
  name: 'ToolbarSelect',
  props: {
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array as PropType<ToolbarSelectOption[]>,
      default: () => [],
    },
    onChange: {
      type: Function as PropType<(value: string) => void>,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const selectedValue = ref(props.value)

    const handleChange = (event: Event) => {
      const value = (event.target as HTMLSelectElement).value
      selectedValue.value = value
      emit('update:value', value)
      props.onChange(value)
    }

    return () => (
      <select class="toolbar-select" value={selectedValue.value} onChange={handleChange}>
        {props.options.map((option) => (
          <option value={option.value}>{option.text}</option>
        ))}
      </select>
    )
  },
})
