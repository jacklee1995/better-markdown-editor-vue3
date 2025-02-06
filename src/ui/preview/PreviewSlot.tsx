import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PreviewSlot',
  setup(_, { slots }) {
    return () => (
      <div class="preview-slot">
        {/* 渲染默认插槽的内容 */}
        {slots.default?.()}
      </div>
    )
  },
})
