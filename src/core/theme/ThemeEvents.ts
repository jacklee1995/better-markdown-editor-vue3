// 主题事件
// src/core/theme/ThemeEvents.ts

import type { BaseTheme } from './BaseTheme'

export type ThemeEventType = 'change' | 'apply'

export interface ThemeEventHandler {
  (theme: BaseTheme): void
}

export class ThemeEvents {
  private handlers: Record<ThemeEventType, ThemeEventHandler[]>

  constructor() {
    this.handlers = {
      change: [],
      apply: [],
    }
  }

  public on(type: ThemeEventType, handler: ThemeEventHandler): void {
    this.handlers[type].push(handler)
  }

  public off(type: ThemeEventType, handler: ThemeEventHandler): void {
    const index = this.handlers[type].indexOf(handler)
    if (index !== -1) {
      this.handlers[type].splice(index, 1)
    }
  }

  public emit(type: ThemeEventType, theme: BaseTheme): void {
    this.handlers[type].forEach((handler) => handler(theme))
  }
}
