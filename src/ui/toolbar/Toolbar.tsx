import { defineComponent, type PropType } from 'vue'
import ToolbarButton from './ToolbarButton'
import type { ToolbarButtonProps } from './ToolbarButton'
import ToolbarButtonGroup from './ToolbarButtonGroup'
import type { ToolbarButtonGroupProps } from './ToolbarButtonGroup'
import ToolbarDivider from './ToolbarDivider'
import ToolbarDropdown from './ToolbarDropdown'
import type { ToolbarDropdownProps } from './ToolbarDropdown'
import ToolbarInput from './ToolbarInput'
import type { ToolbarInputProps } from './ToolbarInput'
import ToolbarSelect from './ToolbarSelect'
import type { ToolbarSelectProps } from './ToolbarSelect'
import ToolbarIcon from './ToolbarIcon'
import type { ToolbarIconProps } from './ToolbarIcon'
import ToolbarSlot from './ToolbarSlot'
import ToolbarLink from './ToolbarLink'
import type { ToolbarLinkProps } from './ToolbarLink'
import ToolbarSeparator from './ToolbarSeparator'
import ToolbarText from './ToolbarText'
import type { ToolbarTextProps } from './ToolbarText'

export type ToolbarItem = {
  type:
    | 'button'
    | 'button-group'
    | 'divider'
    | 'dropdown'
    | 'input'
    | 'select'
    | 'icon'
    | 'link'
    | 'separator'
    | 'text'
    | 'slot'
} & (
  | ToolbarButtonProps
  | ToolbarButtonGroupProps
  | object
  | ToolbarDropdownProps
  | ToolbarInputProps
  | ToolbarSelectProps
  | ToolbarIconProps
  | ToolbarLinkProps
  | object
  | ToolbarTextProps
  | object
)

export default defineComponent({
  name: 'MarkdownToolbar',
  props: {
    items: {
      type: Array as PropType<ToolbarItem[]>,
      default: () => [],
    },
  },
  setup(props) {
    const renderItem = (item: ToolbarItem) => {
      switch (item.type) {
        case 'button':
          return <ToolbarButton {...(item as ToolbarButtonProps)} />
        case 'button-group':
          return <ToolbarButtonGroup {...(item as ToolbarButtonGroupProps)} />
        case 'divider':
          return <ToolbarDivider />
        case 'dropdown':
          return <ToolbarDropdown {...(item as ToolbarDropdownProps)} />
        case 'input':
          return <ToolbarInput {...(item as ToolbarInputProps)} />
        case 'select':
          return <ToolbarSelect {...(item as ToolbarSelectProps)} />
        case 'icon':
          return <ToolbarIcon {...(item as ToolbarIconProps)} />
        case 'link':
          return <ToolbarLink {...(item as ToolbarLinkProps)} />
        case 'separator':
          return <ToolbarSeparator />
        case 'text':
          return <ToolbarText {...(item as ToolbarTextProps)} />
        case 'slot':
          return <ToolbarSlot />
        default:
          return null
      }
    }

    return () => <div class="toolbar">{props.items.map(renderItem)}</div>
  },
})
