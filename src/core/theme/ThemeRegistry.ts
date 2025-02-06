// 主题注册表
// src/core/theme/ThemeRegistry.ts

import type { BaseTheme } from './BaseTheme'

export class ThemeRegistry {
  private themes: Map<string, BaseTheme>

  constructor() {
    this.themes = new Map()
  }

  public register(theme: BaseTheme): void {
    if (this.themes.has(theme.name)) {
      console.warn(`Theme "${theme.name}" already exists, it will be overwritten.`)
    }
    this.themes.set(theme.name, theme)
  }

  public unregister(name: string): void {
    if (!this.themes.has(name)) {
      console.warn(`Theme "${name}" does not exist, cannot unregister.`)
      return
    }
    this.themes.delete(name)
  }

  public get(name: string): BaseTheme | undefined {
    return this.themes.get(name)
  }

  public has(name: string): boolean {
    return this.themes.has(name)
  }

  public getAll(): BaseTheme[] {
    return Array.from(this.themes.values())
  }

  public clear(): void {
    this.themes.clear()
  }
}
