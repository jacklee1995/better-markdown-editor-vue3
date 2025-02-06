// 基础主题
// src/core/theme/BaseTheme.ts

import type { MarkdownParserOptions } from '../markdown/interface'

export interface ThemeOptions {
  /**
   * 主题名称
   */
  name: string

  /**
   * 主题样式
   */
  style: Partial<CSSStyleDeclaration>

  /**
   * Markdown解析器选项
   */
  markdown?: MarkdownParserOptions
}

export abstract class BaseTheme {
  public name: string
  public style: Partial<CSSStyleDeclaration>
  public markdown: MarkdownParserOptions

  constructor(options: ThemeOptions) {
    this.name = options.name
    this.style = options.style
    this.markdown = options.markdown ?? {}
  }

  public abstract apply(): void

  public getStyle(): Partial<CSSStyleDeclaration> {
    return this.style
  }

  public setStyle(style: Partial<CSSStyleDeclaration>): void {
    Object.assign(this.style, style)
  }

  public getMarkdownOptions(): MarkdownParserOptions {
    return this.markdown
  }

  public setMarkdownOptions(options: MarkdownParserOptions): void {
    Object.assign(this.markdown, options)
  }
}

export function isTheme(theme: unknown): theme is BaseTheme {
  return theme instanceof BaseTheme
}

export function getThemeName(theme: BaseTheme): string {
  return theme.name
}

export function getThemeStyle(theme: BaseTheme): Partial<CSSStyleDeclaration> {
  return theme.getStyle()
}

export function setThemeStyle(theme: BaseTheme, style: Partial<CSSStyleDeclaration>): void {
  theme.setStyle(style)
}

export function getThemeMarkdownOptions(theme: BaseTheme): MarkdownParserOptions {
  return theme.getMarkdownOptions()
}

export function setThemeMarkdownOptions(theme: BaseTheme, options: MarkdownParserOptions): void {
  theme.setMarkdownOptions(options)
}
