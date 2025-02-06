import { defineComponent, onMounted, ref } from 'vue'
import type { PropType, VNode } from 'vue'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
    inline: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const elRef = ref<HTMLElement | null>(null)

    onMounted(() => {
      if (!elRef.value) return

      katex.render(props.code, elRef.value, {
        throwOnError: false,
        displayMode: !props.inline,
      })
    })

    return (): VNode => (props.inline ? <span ref={elRef}></span> : <div ref={elRef}></div>)
  },
})
