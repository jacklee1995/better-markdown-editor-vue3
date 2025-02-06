// 主题管理器
// src/core/theme/ThemeManager.ts

import { reactive } from 'vue'
import type { BaseTheme, ThemeOptions } from './BaseTheme'
import { ThemeLoader } from './ThemeLoader'
import { ThemeEvents, type ThemeEventType, type ThemeEventHandler } from './ThemeEvents'
import { createThemeContext } from './ThemeContext'
import { LightTheme } from './LightTheme'

export class ThemeManager {
  private loader: ThemeLoader
  private events: ThemeEvents
  private currentTheme: BaseTheme
  private themeContext: ReturnType<typeof createThemeContext>

  constructor() {
    this.loader = new ThemeLoader()
    this.events = new ThemeEvents()
    this.currentTheme = this.loader.loadTheme('light') ?? new LightTheme()
    this.themeContext = reactive(createThemeContext(this, this.currentTheme))
  }

  public loadTheme(name: string): BaseTheme | undefined {
    const theme = this.loader.loadTheme(name)
    if (theme) {
      this.setCurrentTheme(theme)
    }
    return theme
  }

  public loadThemes(): BaseTheme[] {
    return this.loader.loadThemes()
  }

  public registerTheme(theme: BaseTheme): void {
    this.loader.registerTheme(theme)
  }

  public unregisterTheme(name: string): void {
    this.loader.unregisterTheme(name)
  }

  public createTheme(options: ThemeOptions): BaseTheme {
    const theme = this.loader.createTheme(options)
    this.registerTheme(theme)
    return theme
  }

  public getCurrentTheme(): BaseTheme {
    return this.currentTheme
  }

  public setCurrentTheme(theme: BaseTheme): void {
    if (theme !== this.currentTheme) {
      this.currentTheme = theme
      this.themeContext.theme = theme
      this.events.emit('change', theme)
      this.applyTheme()
    }
  }

  public applyTheme(): void {
    this.currentTheme.apply()
    this.events.emit('apply', this.currentTheme)
  }

  public onThemeEvent(type: ThemeEventType, handler: ThemeEventHandler): void {
    this.events.on(type, handler)
  }

  public offThemeEvent(type: ThemeEventType, handler: ThemeEventHandler): void {
    this.events.off(type, handler)
  }
}
