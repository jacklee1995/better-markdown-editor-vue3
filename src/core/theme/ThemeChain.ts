// 主题链
// src/core/theme/ThemeChain.ts

import type { BaseTheme, ThemeOptions } from './BaseTheme'
import { LightTheme } from './LightTheme'
import { DarkTheme } from './DarkTheme'

export class ThemeChain {
  private themes: BaseTheme[]
  private currentTheme: BaseTheme | null

  constructor() {
    this.themes = []
    this.currentTheme = null
  }

  public use(theme: BaseTheme): this {
    this.themes.push(theme)
    if (!this.currentTheme) {
      this.currentTheme = theme
    }
    return this
  }

  public unuse(name: string): this {
    const index = this.themes.findIndex((theme) => theme.name === name)
    if (index !== -1) {
      this.themes.splice(index, 1)
      if (this.currentTheme?.name === name) {
        this.currentTheme = this.themes[0] || null
      }
    }
    return this
  }

  public get(name: string): BaseTheme | undefined {
    return this.themes.find((theme) => theme.name === name)
  }

  public getAll(): BaseTheme[] {
    return this.themes
  }

  public getCurrent(): BaseTheme | null {
    return this.currentTheme
  }

  public setCurrent(name: string): this {
    const theme = this.get(name)
    if (theme) {
      this.currentTheme = theme
    }
    return this
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
    this.use(theme)
    return theme
  }

  public apply(): void {
    if (this.currentTheme) {
      this.currentTheme.apply()
    }
  }
}
