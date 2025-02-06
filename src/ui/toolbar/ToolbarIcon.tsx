import { defineComponent, type PropType } from 'vue'

export interface ToolbarIconProps {
  icon: string
  tooltip?: string
  onClick?: (event: MouseEvent) => void
}

export default defineComponent({
  name: 'ToolbarIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    tooltip: {
      type: String,
      default: '',
    },
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      default: () => {},
    },
  },
  setup(props) {
    const handleClick = (event: MouseEvent) => {
      props.onClick(event)
    }

    return () => (
      <i class={`toolbar-icon ${props.icon}`} title={props.tooltip} onClick={handleClick}></i>
    )
  },
})
