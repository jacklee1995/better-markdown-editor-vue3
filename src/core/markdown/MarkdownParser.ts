// Markdown语法分析器
// src/core/markdown/MarkdownParser.ts

import type { MarkdownParserOptions, Token, TokenRender } from './interface'
import { MarkdownLexer } from './MarkdownLexer'
import { MarkdownHtmlWriter } from './MarkdownHtmlWriter'

/**
 * Markdown 语法分析器类
 * 负责解析 Markdown 源码并生成 HTML
 */
export class MarkdownParser {
  /**
   * Markdown 解析选项
   * 用于配置解析器的行为，例如是否启用 GFM、表格支持等
   */
  private options: MarkdownParserOptions

  /**
   * 词法分析器
   * 负责将 Markdown 源码分解为 Token
   */
  private lexer: MarkdownLexer

  /**
   * HTML 写入器
   * 负责将 Token 数组渲染为 HTML 字符串
   */
  private writer: MarkdownHtmlWriter

  /**
   * 环境变量
   * 用于在解析过程中存储和传递上下文信息
   */
  private env: Record<string, unknown>

  /**
   * 构造函数
   * @param options Markdown 解析选项
   */
  constructor(options: MarkdownParserOptions = {}) {
    this.options = {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      smartypants: false,
      emoji: true,
      ...options,
    }
    this.lexer = new MarkdownLexer(this.options)
    this.writer = new MarkdownHtmlWriter(this.options)
    this.env = {}
  }

  /**
   * 解析 Markdown 源码为 HTML 字符串
   * @param src 源码
   * @returns 渲染后的 HTML 字符串
   */
  public parse(src: string): string {
    this.lexer.input(src)
    const tokens = this.lexer.tokenize()
    const html = this.writer.render(tokens, this.options, this.env)
    return html
  }

  /**
   * 解析内联 Markdown 源码为 HTML 字符串
   * @param src 源码
   * @returns 渲染后的 HTML 字符串
   */
  public parseInline(src: string): string {
    this.lexer.input(src)
    const tokens = this.lexer.tokenizeInline()
    const html = this.writer.renderInline(tokens, this.options, this.env)
    return html
  }

  /**
   * 使用 Markdown 扩展
   * @param extension Markdown 扩展
   * @returns 当前 Markdown 解析器实例
   */
  public use(extension: MarkdownExtension): MarkdownParser {
    if (extension.start) {
      extension.start(this.lexer.getSrc())
    }
    if (extension.tokenizer) {
      this.lexer.use({
        name: extension.name,
        level: extension.level,
        tokenizer: extension.tokenizer,
      })
    }
    if (extension.renderer) {
      this.writer.use(extension.renderer)
    }
    return this
  }
}

/**
 * Markdown 扩展接口
 */
interface MarkdownExtension {
  name: string
  level: 'block' | 'inline' | 'core'
  start?: (src: string) => void
  tokenizer?: (src: string) => Token[]
  renderer?: TokenRender
}
