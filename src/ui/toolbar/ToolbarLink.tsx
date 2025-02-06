import { defineComponent, type PropType } from 'vue'

export interface ToolbarLinkProps {
  text?: string
  href: string
  target?: string
  tooltip?: string
  onClick?: (event: MouseEvent) => void
}

export default defineComponent({
  name: 'ToolbarLink',
  props: {
    text: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: '_blank',
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
      <a
        class="toolbar-link"
        href={props.href}
        target={props.target}
        title={props.tooltip}
        onClick={handleClick}
      >
        {props.text}
      </a>
    )
  },
})
