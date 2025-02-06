import { defineComponent, onMounted, ref } from 'vue'
import type { PropType, VNode } from 'vue'
import mermaid from 'mermaid'

export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    const chartRef = ref<HTMLDivElement | null>(null)

    onMounted(() => {
      if (!chartRef.value) return

      mermaid.render('mermaid-svg', props.code, ((svgCode: string) => {
        chartRef.value!.innerHTML = svgCode
      }) as unknown as Element)
    })

    return (): VNode => <div ref={chartRef}></div>
  },
})
