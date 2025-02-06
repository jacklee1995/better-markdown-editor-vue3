import { defineComponent } from 'vue'

// 侧边栏分隔线组件
export default defineComponent({
  name: 'SidebarDivider',
  setup() {
    return () => <div class="sidebar-divider"></div>
  },
})
