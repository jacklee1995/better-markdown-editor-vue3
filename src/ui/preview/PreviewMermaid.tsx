import { defineComponent, onMounted } from 'vue'
import mermaid from 'mermaid'

export default defineComponent({
  name: 'PreviewMermaid',
  setup() {
    onMounted(() => {
      // 在组件挂载后查找并渲染所有的 Mermaid 图表
      renderMermaidDiagrams()
    })

    // 渲染 Mermaid 图表
    const renderMermaidDiagrams = () => {
      const elements = document.querySelectorAll('.language-mermaid')
      elements.forEach((element) => {
        renderMermaidDiagram(element as HTMLElement)
      })
    }

    // 渲染单个 Mermaid 图表
    const renderMermaidDiagram = (element: HTMLElement) => {
      const text = element.textContent || ''

      // 使用 mermaid 渲染图表
      mermaid.render(
        element.id,
        text,
        (svgCode) => {
          element.innerHTML = svgCode
        },
        element,
      )
    }

    return () => null
  },
})
