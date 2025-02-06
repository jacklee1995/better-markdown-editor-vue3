import { defineComponent, type PropType } from 'vue'

interface TocItem {
  level: number
  text: string
  anchor: string
}

export default defineComponent({
  props: {
    toc: {
      type: Array as PropType<TocItem[]>,
      required: true,
    },
  },
  setup(props) {
    const renderTocItem = (item: TocItem) => {
      const { level, text, anchor } = item
      const paddingLeft = `${(level - 1) * 20}px`

      return (
        <li style={{ paddingLeft }}>
          <a href={`#${anchor}`}>{text}</a>
        </li>
      )
    }

    return () => (
      <div class="toc">
        <h2>Table of Contents</h2>
        <ul>{props.toc.map(renderTocItem)}</ul>
      </div>
    )
  },
})
