import { defineComponent, onMounted } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'PreviewEcharts',
  setup() {
    onMounted(() => {
      // 在组件挂载后查找并渲染所有的 Echarts 图表
      renderEchartsDiagrams()
    })

    // 渲染 Echarts 图表
    const renderEchartsDiagrams = () => {
      const elements = document.querySelectorAll('.language-echarts')
      elements.forEach((element) => {
        renderEchartsDiagram(element as HTMLElement)
      })
    }

    // 渲染单个 Echarts 图表
    const renderEchartsDiagram = (element: HTMLElement) => {
      const code = element.textContent || ''

      try {
        // 解析 Echarts 配置
        const option = JSON.parse(code)

        // 创建 Echarts 实例并设置配置
        const chart = echarts.init(element)
        chart.setOption(option)

        // 监听窗口大小变化事件,自动调整图表大小
        window.addEventListener('resize', () => {
          chart.resize()
        })
      } catch (error) {
        console.error('Failed to render Echarts diagram:', error)
        element.innerHTML = 'Failed to render Echarts diagram'
      }
    }

    return () => null
  },
})
