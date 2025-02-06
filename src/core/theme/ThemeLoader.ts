// 主题加载器
// src/core/theme/ThemeLoader.ts

import type { BaseTheme, ThemeOptions } from './BaseTheme'
import { ThemeFactory } from './ThemeFactory'

export class ThemeLoader {
  private factory: ThemeFactory

  constructor() {
    this.factory = new ThemeFactory()
  }

  public loadTheme(name: string): BaseTheme | undefined {
    return this.factory.get(name)
  }

  public loadThemes(): BaseTheme[] {
    return this.factory.getAll()
  }

  public registerTheme(theme: BaseTheme): void {
    this.factory.register(theme)
  }

  public unregisterTheme(name: string): void {
    this.factory.unregister(name)
  }

  public createTheme(options: ThemeOptions): BaseTheme {
    return this.factory.create(options)
  }

  public applyTheme(name: string): void {
    const theme = this.loadTheme(name)
    if (theme) {
      theme.apply()
    }
  }
}
