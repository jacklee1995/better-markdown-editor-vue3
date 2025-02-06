import { defineComponent, type PropType } from 'vue'

export interface TocItem {
  /**
   * 目录项的标题
   */
  title: string
  /**
   * 目录项的级别,从 1 开始
   */
  level: number
  /**
   * 目录项的子项
   */
  children?: TocItem[]
}

export interface PreviewTocProps {
  /**
   * 目录数据
   */
  toc: TocItem[]
  /**
   * 当前高亮的目录项
   */
  activeItem?: TocItem
  /**
   * 点击目录项时触发的事件
   */
  onItemClick?: (item: TocItem) => void
}

export default defineComponent({
  name: 'PreviewToc',
  props: {
    toc: {
      type: Array as PropType<TocItem[]>,
      default: () => [],
    },
    activeItem: {
      type: Object as PropType<TocItem>,
      default: null,
    },
    onItemClick: {
      type: Function as PropType<(item: TocItem) => void>,
      default: () => {},
    },
  },
  setup(props) {
    // 渲染目录项
    const renderTocItem = (item: TocItem) => {
      const isActive = props.activeItem === item
      const handleClick = () => {
        props.onItemClick(item)
      }

      return (
        <div
          class={['toc-item', `toc-level-${item.level}`, { active: isActive }]}
          onClick={handleClick}
        >
          <a href={`#${item.title}`} title={item.title}>
            {item.title}
          </a>
          {item.children && item.children.length > 0 && (
            <div class="toc-children">{item.children.map(renderTocItem)}</div>
          )}
        </div>
      )
    }

    return () => (
      <div class="preview-toc">
        <div class="toc-list">{props.toc.map(renderTocItem)}</div>
      </div>
    )
  },
})
