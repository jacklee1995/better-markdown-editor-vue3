import { defineComponent, onMounted, ref, onUnmounted } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const chartRef = ref<HTMLDivElement | null>(null)
    let chart: echarts.ECharts | null = null

    onMounted(() => {
      if (!chartRef.value) return

      try {
        const option = JSON.parse(decodeURIComponent(props.code))
        chart = echarts.init(chartRef.value)
        chart.setOption(option)

        const handleResize = () => {
          chart?.resize()
        }

        window.addEventListener('resize', handleResize)

        onUnmounted(() => {
          window.removeEventListener('resize', handleResize)
          chart?.dispose()
          chart = null
        })
      } catch (error) {
        console.error('Failed to render ECharts:', error)
      }
    })

    return () => <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
  },
})
