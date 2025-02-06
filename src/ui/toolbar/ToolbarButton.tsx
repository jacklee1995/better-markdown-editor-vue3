import { defineComponent, type PropType } from 'vue'

export interface ToolbarButtonProps {
  text?: string
  icon?: string
  tooltip?: string
  active?: boolean
  disabled?: boolean
  onClick?: (event: MouseEvent) => void
}

export default defineComponent({
  name: 'ToolbarButton',
  props: {
    text: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    tooltip: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      default: () => {},
    },
  },
  setup(props) {
    const handleClick = (event: MouseEvent) => {
      if (!props.disabled) {
        props.onClick(event)
      }
    }

    return () => (
      <button
        class={['toolbar-button', { active: props.active, disabled: props.disabled }]}
        title={props.tooltip}
        onClick={handleClick}
      >
        {props.icon && <i class={`icon ${props.icon}`} />}
        {props.text && <span>{props.text}</span>}
      </button>
    )
  },
})
