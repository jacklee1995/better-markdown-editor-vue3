import { defineComponent, type PropType } from 'vue'
import SidebarItem from './SidebarItem'
import SidebarGroup from './SidebarGroup'
import SidebarDivider from './SidebarDivider'
import SidebarToggle from './SidebarToggle'
import SidebarHeader from './SidebarHeader'
import SidebarFooter from './SidebarFooter'
import SidebarBrand from './SidebarBrand'
import SidebarNav from './SidebarNav'

export type SidebarItemType =
  | 'item'
  | 'group'
  | 'divider'
  | 'toggle'
  | 'header'
  | 'footer'
  | 'brand'
  | 'nav'

export interface SidebarItem {
  type: SidebarItemType
  [key: string]: unknown
}

export default defineComponent({
  name: 'Sidebar',
  props: {
    items: {
      type: Array as PropType<SidebarItem[]>,
      default: () => [],
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '300px',
    },
    collapsedWidth: {
      type: String,
      default: '80px',
    },
  },
  setup(props) {
    const renderItem = (item: SidebarItem) => {
      switch (item.type) {
        case 'item':
          return <SidebarItem {...item} />
        case 'group':
          return <SidebarGroup {...item} />
        case 'divider':
          return <SidebarDivider {...item} />
        case 'toggle':
          return <SidebarToggle {...item} />
        case 'header':
          return <SidebarHeader {...item} />
        case 'footer':
          return <SidebarFooter {...item} />
        case 'brand':
          return <SidebarBrand {...item} />
        case 'nav':
          return <SidebarNav {...item} />
        default:
          return null
      }
    }

    return () => (
      <aside
        class={['sidebar', { collapsed: props.collapsed }]}
        style={{
          width: props.collapsed ? props.collapsedWidth : props.width,
        }}
      >
        {props.items.map(renderItem)}
      </aside>
    )
  },
})
