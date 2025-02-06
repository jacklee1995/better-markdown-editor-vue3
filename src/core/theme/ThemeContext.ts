// 主题上下文
// src/core/theme/ThemeContext.ts

import { inject, provide, reactive } from 'vue'
import type { InjectionKey } from 'vue'
import { BaseTheme } from './BaseTheme'
import { ThemeAPI } from './ThemeAPI'

export interface ThemeContextProps {
  api: Partial<ThemeAPI>
  theme: BaseTheme
}

const themeContextKey: InjectionKey<ThemeContextProps> = Symbol('themeContext')

export function provideThemeContext(context: ThemeContextProps): void {
  provide(themeContextKey, context)
}

export function injectThemeContext(): ThemeContextProps {
  const context = inject(themeContextKey)
  if (!context) {
    throw new Error('ThemeContext not provided')
  }
  return context
}

export function useThemeContext(): ThemeContextProps {
  return injectThemeContext()
}

export function createThemeContext(api: Partial<ThemeAPI>, theme: BaseTheme): ThemeContextProps {
  const context: ThemeContextProps = reactive({
    api,
    theme,
  })
  provideThemeContext(context)
  return context
}
