import { defineComponent, ref, type PropType } from 'vue'

export interface ToolbarDropdownItem {
  text: string
  onClick: () => void
}

export interface ToolbarDropdownProps {
  text?: string
  icon?: string
  tooltip?: string
  items?: ToolbarDropdownItem[]
}

export default defineComponent({
  name: 'ToolbarDropdown',
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
    items: {
      type: Array as PropType<ToolbarDropdownItem[]>,
      default: () => [],
    },
  },
  setup(props) {
    const isOpen = ref(false)

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const handleItemClick = (item: ToolbarDropdownItem) => {
      item.onClick()
      isOpen.value = false
    }

    return () => (
      <div class="toolbar-dropdown">
        <button class="toolbar-dropdown-toggle" title={props.tooltip} onClick={toggleDropdown}>
          {props.icon && <i class={`icon ${props.icon}`} />}
          {props.text && <span>{props.text}</span>}
          <i class="icon dropdown-icon" />
        </button>
        {isOpen.value && (
          <ul class="toolbar-dropdown-menu">
            {props.items.map((item) => (
              <li class="toolbar-dropdown-item" onClick={() => handleItemClick(item)}>
                {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  },
})
