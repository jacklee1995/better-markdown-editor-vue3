import { defineComponent, type PropType } from 'vue'
import PreviewMath from './PreviewMath'
import PreviewMermaid from './PreviewMermaid'
import PreviewEcharts from './PreviewEcharts'
import PreviewSlot from './PreviewSlot'

export interface PreviewBodyProps {
  /**
   * 预览区的 HTML 内容
   */
  html: string
  /**
   * 是否启用数学公式渲染
   */
  math?: boolean
  /**
   * 是否启用 Mermaid 图表渲染
   */
  mermaid?: boolean
  /**
   * 是否启用 Echarts 图表渲染
   */
  echarts?: boolean
  /**
   * 自定义渲染函数
   */
  render?: (html: string) => JSX.Element
}

export default defineComponent({
  name: 'PreviewBody',
  props: {
    html: {
      type: String,
      required: true,
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
    render: {
      type: Function as PropType<(html: string) => JSX.Element>,
      default: null,
    },
  },
  setup(props) {
    // 渲染预览区内容
    const renderPreview = () => {
      if (props.render) {
        // 如果提供了自定义渲染函数,则使用自定义渲染函数
        return props.render(props.html)
      } else {
        // 否则使用默认的渲染方式
        return (
          <div class="preview-body">
            {/* 渲染解析后的 HTML */}
            <div class="preview-content" innerHTML={props.html}></div>
            {/* 渲染数学公式 */}
            {props.math && <PreviewMath />}
            {/* 渲染 Mermaid 图表 */}
            {props.mermaid && <PreviewMermaid />}
            {/* 渲染 Echarts 图表 */}
            {props.echarts && <PreviewEcharts />}
            {/* 渲染插槽内容 */}
            <PreviewSlot />
          </div>
        )
      }
    }

    return () => renderPreview()
  },
})
