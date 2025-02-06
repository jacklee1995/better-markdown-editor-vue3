import { defineComponent, ref, watch, type PropType } from 'vue'
import { useMarkdownStore } from '@/store/modules/markdown'
import { usePluginStore } from '@/store/modules/plugin'
import PreviewHeader from './PreviewHeader'
import PreviewBody from './PreviewBody'
import PreviewFooter from './PreviewFooter'
import PreviewAnchor from './PreviewAnchor'
import PreviewToc from './PreviewToc'
import type { AnchorItem } from './PreviewAnchor'
import type { TocItem } from './PreviewToc'
import type { JSX } from 'vue/jsx-runtime'

export interface PreviewProps {
  /**
   * Markdown 文本
   */
  text: string
  /**
   * 是否启用代码高亮
   */
  highlight?: boolean
  /**
   * 是否启用 LaTeX 数学公式
   */
  math?: boolean
  /**
   * 是否启用 Mermaid 图表
   */
  mermaid?: boolean
  /**
   * 是否启用 Echarts 图表
   */
  echarts?: boolean
  /**
   * 是否显示锚点导航
   */
  anchor?: boolean
  /**
   * 是否显示目录
   */
  toc?: boolean
  /**
   * 自定义渲染函数
   */
  render?: (html: string) => JSX.Element
}

export default defineComponent({
  name: 'Preview',
  props: {
    text: {
      type: String,
      required: true,
    },
    highlight: {
      type: Boolean,
      default: true,
    },
    math: {
      type: Boolean,
      default: true,
    },
    mermaid: {
      type: Boolean,
      default: true,
    },
    echarts: {
      type: Boolean,
      default: true,
    },
    anchor: {
      type: Boolean,
      default: true,
    },
    toc: {
      type: Boolean,
      default: true,
    },
    render: {
      type: Function as PropType<(html: string) => JSX.Element>,
      default: null,
    },
  },
  setup(props) {
    const markdownStore = useMarkdownStore()
    const pluginStore = usePluginStore()

    // 渲染后的 HTML
    const html = ref('')

    // 锚点数据
    const anchors = ref<AnchorItem[]>([])

    // 目录数据
    const toc = ref<TocItem[]>([])

    // 当前高亮的锚点
    const activeAnchor = ref<AnchorItem>()

    // 当前高亮的目录项
    const activeTocItem = ref<TocItem>()

    // 监听 Markdown 文本变化,触发渲染
    watch(
      () => props.text,
      (text) => {
        render(text)
      },
      { immediate: true },
    )

    // 渲染 Markdown 为 HTML
    const render = (text: string) => {
      // 使用 Markdown 模块解析 Markdown 文本
      const tokens = markdownStore.parse(text)
      html.value = markdownStore.render(tokens)

      // 提取锚点数据
      anchors.value = markdownStore.extractAnchors(tokens).map((token) => ({
        id: token.attrGet('id') ?? '',
        title: token.text,
        level: token.depth,
      }))

      // 提取目录数据
      toc.value = markdownStore.extractToc(tokens).map((token) => ({
        title: token.text,
        level: token.depth,
      }))
    }

    // 滚动到指定锚点
    const scrollToAnchor = (anchor: AnchorItem) => {
      const el = document.getElementById(anchor.id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }

    // 滚动到指定目录项
    const scrollToTocItem = (item: TocItem) => {
      const el = document.getElementById(item.title)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }

    // 处理锚点点击事件
    const handleAnchorClick = (anchor: AnchorItem) => {
      activeAnchor.value = anchor
      scrollToAnchor(anchor)
    }

    // 处理目录项点击事件
    const handleTocItemClick = (item: TocItem) => {
      activeTocItem.value = item
      scrollToTocItem(item)
    }

    return () => (
      <div class="preview">
        {/* 预览区头部 */}
        <PreviewHeader />

        <div class="preview-wrapper">
          {/* 预览区主体 */}
          <PreviewBody
            html={html.value}
            math={props.math}
            mermaid={props.mermaid}
            echarts={props.echarts}
            render={props.render}
          />

          {/* 锚点导航 */}
          {props.anchor && (
            <PreviewAnchor
              anchors={anchors.value}
              activeAnchor={activeAnchor.value}
              onAnchorClick={handleAnchorClick}
            />
          )}

          {/* 目录 */}
          {props.toc && (
            <PreviewToc
              toc={toc.value}
              activeItem={activeTocItem.value}
              onItemClick={handleTocItemClick}
            />
          )}
        </div>

        {/* 预览区底部 */}
        <PreviewFooter />
      </div>
    )
  },
})
