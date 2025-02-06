// 主题API
// src/core/theme/ThemeAPI.ts

import type { BaseTheme, ThemeOptions } from './BaseTheme'
import { LightTheme } from './LightTheme'
import { DarkTheme } from './DarkTheme'

export class ThemeAPI {
  private themes: BaseTheme[]
  private currentTheme: BaseTheme

  constructor() {
    this.themes = []
    this.currentTheme = new LightTheme()
    this.addTheme(this.currentTheme)
  }

  public addTheme(theme: BaseTheme): void {
    this.themes.push(theme)
  }

  public removeTheme(name: string): void {
    const index = this.themes.findIndex((theme) => theme.name === name)
    if (index !== -1) {
      this.themes.splice(index, 1)
    }
  }

  public getTheme(name: string): BaseTheme | undefined {
    return this.themes.find((theme) => theme.name === name)
  }

  public getThemes(): BaseTheme[] {
    return this.themes
  }

  public setTheme(name: string): void {
    const theme = this.getTheme(name)
    if (theme) {
      this.currentTheme = theme
      this.applyTheme()
    }
  }

  public getCurrentTheme(): BaseTheme {
    return this.currentTheme
  }

  public createTheme(options: ThemeOptions): BaseTheme {
    let theme: BaseTheme
    switch (options.name) {
      case 'light':
        theme = new LightTheme()
        break
      case 'dark':
        theme = new DarkTheme()
        break
      default:
        throw new Error(`Unsupported theme name: ${options.name}`)
    }
    theme.setStyle(options.style)
    theme.setMarkdownOptions(options.markdown ?? {})
    this.addTheme(theme)
    return theme
  }

  public applyTheme(): void {
    this.currentTheme.apply()
  }

  public initThemes(): void {
    this.addTheme(new DarkTheme())
  }
}
