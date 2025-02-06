// 主题工厂
// src/core/theme/ThemeFactory.ts

import type { BaseTheme, ThemeOptions } from './BaseTheme'
import { LightTheme } from './LightTheme'
import { DarkTheme } from './DarkTheme'

export class ThemeFactory {
  private themes: BaseTheme[]

  constructor() {
    this.themes = []
    this.initThemes()
  }

  private initThemes(): void {
    this.register(new LightTheme())
    this.register(new DarkTheme())
  }

  public register(theme: BaseTheme): void {
    this.themes.push(theme)
  }

  public unregister(name: string): void {
    const index = this.themes.findIndex((theme) => theme.name === name)
    if (index !== -1) {
      this.themes.splice(index, 1)
    }
  }

  public get(name: string): BaseTheme | undefined {
    return this.themes.find((theme) => theme.name === name)
  }

  public getAll(): BaseTheme[] {
    return this.themes
  }

  public create(options: ThemeOptions): BaseTheme {
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
    this.register(theme)
    return theme
  }
}
