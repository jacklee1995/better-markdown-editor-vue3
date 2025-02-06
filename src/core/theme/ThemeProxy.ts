// 主题代理
// src/core/theme/ThemeProxy.ts

import type { BaseTheme, ThemeOptions } from './BaseTheme'
import type { ThemeEventType, ThemeEventHandler } from './ThemeEvents'
import { ThemeManager } from './ThemeManager'

export class ThemeProxy {
  private manager: ThemeManager

  constructor() {
    this.manager = new ThemeManager()
  }

  public loadTheme(name: string): BaseTheme | undefined {
    return this.manager.loadTheme(name)
  }

  public loadThemes(): BaseTheme[] {
    return this.manager.loadThemes()
  }

  public registerTheme(theme: BaseTheme): void {
    this.manager.registerTheme(theme)
  }

  public unregisterTheme(name: string): void {
    this.manager.unregisterTheme(name)
  }

  public createTheme(options: ThemeOptions): BaseTheme {
    return this.manager.createTheme(options)
  }

  public getCurrentTheme(): BaseTheme {
    return this.manager.getCurrentTheme()
  }

  public setCurrentTheme(theme: BaseTheme): void {
    this.manager.setCurrentTheme(theme)
  }

  public applyTheme(): void {
    this.manager.applyTheme()
  }

  public onThemeEvent(type: ThemeEventType, handler: ThemeEventHandler): void {
    this.manager.onThemeEvent(type, handler)
  }

  public offThemeEvent(type: ThemeEventType, handler: ThemeEventHandler): void {
    this.manager.offThemeEvent(type, handler)
  }
}
