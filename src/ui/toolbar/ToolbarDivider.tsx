import { defineComponent } from 'vue'

// 工具栏分隔线组件
export default defineComponent({
  name: 'ToolbarDivider',
  setup() {
    return () => <div class="toolbar-divider"></div>
  },
})
