import { defineComponent, onMounted } from 'vue'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export default defineComponent({
  name: 'PreviewMath',
  setup() {
    onMounted(() => {
      // 在组件挂载后查找并渲染所有的数学公式
      renderMathElements()
    })

    // 渲染数学公式元素
    const renderMathElements = () => {
      const elements = document.querySelectorAll('.language-math')
      elements.forEach((element) => {
        renderMathElement(element as HTMLElement)
      })
    }

    // 渲染单个数学公式元素
    const renderMathElement = (element: HTMLElement) => {
      const text = element.textContent || ''
      const isInline = element.tagName.toLowerCase() === 'span'

      // 使用 katex 渲染数学公式
      const html = katex.renderToString(text, {
        throwOnError: false,
        displayMode: !isInline,
      })

      // 将渲染后的 HTML 设置为元素的内容
      element.innerHTML = html
    }

    return () => null
  },
})
