import { defineComponent, type PropType } from 'vue'
import ToolbarButton from './ToolbarButton'

export interface ToolbarButtonGroupItem {
  text?: string
  icon?: string
  tooltip?: string
  active?: boolean
  disabled?: boolean
  onClick?: (event: MouseEvent) => void
}

export interface ToolbarButtonGroupProps {
  buttons?: ToolbarButtonGroupItem[]
}

export default defineComponent({
  name: 'ToolbarButtonGroup',
  props: {
    buttons: {
      type: Array as PropType<ToolbarButtonGroupItem[]>,
      default: () => [],
    },
  },
  setup(props) {
    return () => (
      <div class="toolbar-button-group">
        {props.buttons.map((button) => (
          <ToolbarButton
            text={button.text}
            icon={button.icon}
            tooltip={button.tooltip}
            active={button.active}
            disabled={button.disabled}
            onClick={button.onClick}
          />
        ))}
      </div>
    )
  },
})
