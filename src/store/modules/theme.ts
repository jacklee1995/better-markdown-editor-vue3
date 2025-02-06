import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  ThemeProxy,
  BaseTheme,
  ThemeManager,
  type ThemeOptions,
  type ThemeEventType,
  type ThemeEventHandler,
} from '@/core/theme'

export interface ThemeState {
  proxy: ThemeProxy
  manager: ThemeManager
  currentTheme: BaseTheme
  themes: BaseTheme[]
}

export const useThemeStore = defineStore('theme', () => {
  // 创建主题代理实例
  const proxy = new ThemeProxy()

  // 定义响应式状态
  const currentTheme = ref(proxy.getCurrentTheme())
  const themes = ref(proxy.loadThemes())

  // 计算属性:当前主题名称
  const currentThemeName = computed(() => currentTheme.value.name)

  // 计算属性:是否为暗黑主题
  const isDarkTheme = computed(() => currentThemeName.value === 'dark')

  // 切换主题
  function setTheme(name: string) {
    const theme = proxy.loadTheme(name)
    if (theme) {
      proxy.setCurrentTheme(theme)
      currentTheme.value = theme
    }
  }

  // 切换到下一个主题
  function toggleTheme() {
    const names = themes.value.map((theme) => theme.name)
    const index = names.indexOf(currentThemeName.value)
    const nextIndex = (index + 1) % names.length
    setTheme(names[nextIndex])
  }

  // 注册主题
  function registerTheme(theme: BaseTheme) {
    proxy.registerTheme(theme)
    themes.value = proxy.loadThemes()
  }

  // 注销主题
  function unregisterTheme(name: string) {
    proxy.unregisterTheme(name)
    themes.value = proxy.loadThemes()
  }

  // 创建主题
  function createTheme(options: ThemeOptions) {
    const theme = proxy.createTheme(options)
    registerTheme(theme)
    return theme
  }

  // 监听主题事件
  function onThemeEvent(type: ThemeEventType, handler: ThemeEventHandler) {
    proxy.onThemeEvent(type, handler)
  }

  // 取消监听主题事件
  function offThemeEvent(type: ThemeEventType, handler: ThemeEventHandler) {
    proxy.offThemeEvent(type, handler)
  }

  return {
    currentTheme,
    currentThemeName,
    isDarkTheme,
    themes,
    setTheme,
    toggleTheme,
    registerTheme,
    unregisterTheme,
    createTheme,
    onThemeEvent,
    offThemeEvent,
  }
})
