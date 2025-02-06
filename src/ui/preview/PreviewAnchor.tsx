import { defineComponent, type PropType } from 'vue'

export interface AnchorItem {
  /**
   * 锚点的 ID
   */
  id: string
  /**
   * 锚点的标题
   */
  title: string
  /**
   * 锚点的级别,从 1 开始
   */
  level: number
  /**
   * 锚点的子项
   */
  children?: AnchorItem[]
}

export interface PreviewAnchorProps {
  /**
   * 锚点数据
   */
  anchors: AnchorItem[]
  /**
   * 当前高亮的锚点
   */
  activeAnchor?: AnchorItem
  /**
   * 点击锚点时触发的事件
   */
  onAnchorClick?: (anchor: AnchorItem) => void
}

export default defineComponent({
  name: 'PreviewAnchor',
  props: {
    anchors: {
      type: Array as PropType<AnchorItem[]>,
      default: () => [],
    },
    activeAnchor: {
      type: Object as PropType<AnchorItem>,
      default: null,
    },
    onAnchorClick: {
      type: Function as PropType<(anchor: AnchorItem) => void>,
      default: () => {},
    },
  },
  setup(props) {
    // 渲染锚点项
    const renderAnchorItem = (item: AnchorItem) => {
      const isActive = props.activeAnchor === item
      const handleClick = () => {
        props.onAnchorClick(item)
      }

      return (
        <div
          class={['anchor-item', `anchor-level-${item.level}`, { active: isActive }]}
          onClick={handleClick}
        >
          <a href={`#${item.id}`} title={item.title}>
            {item.title}
          </a>
          {item.children && item.children.length > 0 && (
            <div class="anchor-children">{item.children.map(renderAnchorItem)}</div>
          )}
        </div>
      )
    }

    return () => (
      <div class="preview-anchor">
        <div class="anchor-list">{props.anchors.map(renderAnchorItem)}</div>
      </div>
    )
  },
})
