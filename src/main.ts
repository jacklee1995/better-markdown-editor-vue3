// src/main.ts

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import { useEditorStore, useThemeStore, usePluginStore } from '@/store'
import { loadPlugins } from './core/plugin'
import { setTheme } from './core/theme'
import './styles/index.scss'

async function bootstrap() {
  // 创建 Vue 应用实例
  const app = createApp(App)

  // 创建 Pinia 状态管理实例
  const pinia = createPinia()
  app.use(pinia)

  // 创建路由实例
  const appRouter = createRouter({
    history: createWebHistory(),
    routes,
  })
  app.use(appRouter)

  // 加载插件
  const pluginStore = usePluginStore()
  await loadPlugins(pluginStore.plugins, {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    smartypants: false,
    emoji: true,
  })

  // 设置主题
  const { currentTheme } = useThemeStore()
  setTheme(currentTheme)

  // 初始化编辑器状态
  const editorStore = useEditorStore()
  await editorStore.init()

  // 挂载应用
  app.mount('#app')
}

bootstrap()
