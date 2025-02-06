import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToolbarSlot',
  setup(_, { slots }) {
    return () => <div class="toolbar-slot">{slots.default?.()}</div>
  },
})
