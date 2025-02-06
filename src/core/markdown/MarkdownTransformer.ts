/* eslint-disable @typescript-eslint/no-unused-vars */
// Markdown转换器
// src/core/markdown/MarkdownTransformer.ts

import type { MarkdownParserOptions, Token, TokenRender } from './interface'
import { MarkdownTokenizer } from './MarkdownTokenizer'
import { MarkdownHtmlWriter } from './MarkdownHtmlWriter'
import { MarkdownTextWriter } from './MarkdownTextWriter'
import { MarkdownSerializer } from './MarkdownSerializer'
import { EventEmitter } from '../../utils/events'

/**
 * Markdown 转换器类
 * 负责将 Markdown 文本转换为 HTML 或其他格式
 */
export class MarkdownTransformer {
  /**
   * Markdown 解析选项
   * 用于配置解析器的行为，例如是否启用 GFM、表格支持等
   */
  private options: MarkdownParserOptions

  /**
   * 词法分析器
   * 负责将 Markdown 源码分解为 Token
   */
  private tokenizer: MarkdownTokenizer

  /**
   * HTML 写入器
   * 负责将 Token 数组渲染为 HTML 字符串
   */
  private htmlWriter: MarkdownHtmlWriter

  /**
   * 文本写入器
   * 负责将 Token 数组渲染为纯文本字符串
   */
  private textWriter: MarkdownTextWriter

  /**
   * 序列化器
   * 负责将 Token 数组序列化为 Markdown 字符串
   */
  private serializer: MarkdownSerializer

  /**
   * 事件发射器
   * 用于在解析过程中发射和监听事件
   */
  public eventEmitter: EventEmitter

  /**
   * 构造函数
   * @param options Markdown 解析选项
   */
  constructor(options: MarkdownParserOptions) {
    this.options = options
    this.tokenizer = new MarkdownTokenizer(options)
    this.htmlWriter = new MarkdownHtmlWriter(options)
    this.textWriter = new MarkdownTextWriter(options)
    this.serializer = new MarkdownSerializer(options)
    this.eventEmitter = new EventEmitter()
    this.initTextarea()
  }

  /**
   * 初始化 textarea 元素
   * 用于在页面上显示 Markdown 编辑器
   */
  private initTextarea(): void {
    const textarea = document.createElement('textarea')
    textarea.classList.add('markdown-editor')
    document.body.appendChild(textarea)
  }

  /**
   * 解析 Markdown 文本,生成 Token 列表
   * @param src 要解析的 Markdown 文本
   * @returns 解析后的 Token 列表
   */
  public parse(src: string): Token[] {
    return this.tokenizer.tokenize(src)
  }

  /**
   * 将 Token 列表渲染为 HTML
   * @param tokens 要渲染的 Token 列表
   * @returns 渲染后的 HTML 字符串
   */
  public renderToHtml(tokens: Token[]): string {
    return this.htmlWriter.render(tokens, this.options, {})
  }

  /**
   * 将 Token 列表渲染为纯文本
   * @param tokens 要渲染的 Token 列表
   * @returns 渲染后的纯文本字符串
   */
  public renderToText(tokens: Token[]): string {
    return this.textWriter.render(tokens, this.options, {})
  }

  /**
   * 将 Token 列表序列化为 Markdown 文本
   * @param tokens 要序列化的 Token 列表
   * @returns 序列化后的 Markdown 文本
   */
  public serialize(tokens: Token[]): string {
    return this.serializer.serialize(tokens)
  }

  /**
   * 将 Markdown 文本转换为 HTML
   * @param src 要转换的 Markdown 文本
   * @returns 转换后的 HTML 字符串
   */
  public transform(src: string): string {
    const tokens = this.parse(src)
    return this.renderToHtml(tokens)
  }

  /**
   * 将 Markdown 文本转换为纯文本
   * @param src 要转换的 Markdown 文本
   * @returns 转换后的纯文本字符串
   */
  public transformToText(src: string): string {
    const tokens = this.parse(src)
    return this.renderToText(tokens)
  }

  /**
   * 使用插件扩展 Markdown 转换器功能
   * @param extension 要使用的插件
   */
  public use(extension: MarkdownExtension): void {
    if (extension.renderer) {
      this.options.renderer = this.options.renderer || {}
      Object.assign(this.options.renderer, extension.renderer)
    }
    if (extension.tokenizer) {
      this.tokenizer.use(extension)
    }
  }

  /**
   * 获取 Markdown 解析选项
   * @returns Markdown 解析选项
   */
  public getOptions(): MarkdownParserOptions {
    return this.options
  }

  /**
   * 获取 HTML 写入器实例
   * @returns HTML 写入器实例
   */
  public getHtmlWriter(): MarkdownHtmlWriter {
    return this.htmlWriter
  }

  /**
   * 渲染 Markdown 文本为 HTML
   * @param src 要渲染的 Markdown 文本
   * @param env 渲染环境变量
   * @returns 渲染后的 HTML 字符串
   */
  public render(src: string, env?: Record<string, unknown>): string {
    const tokens = this.parse(src)
    return this.renderToHtml(tokens)
  }

  /**
   * 注册事件监听器
   * @param event 要监听的事件类型
   * @param listener 事件监听器函数
   */
  public on<K extends keyof HTMLElementEventMap>(
    event: K,
    listener: (this: HTMLTextAreaElement, ev: HTMLElementEventMap[K]) => void,
  ): void {
    const textarea = document.querySelector<HTMLTextAreaElement>('.markdown-editor')
    if (textarea) {
      textarea.addEventListener(event, listener)
    }
  }
}

/**
 * Markdown 扩展接口
 * 用于扩展 Markdown 转换器的功能
 */
export interface MarkdownExtension {
  /**
   * 扩展名称
   */
  name: string

  /**
   * 扩展级别
   * 可选值: 'block' | 'inline' | 'core'
   */
  level: 'block' | 'inline' | 'core'

  /**
   * 扩展启动方法
   * 在解析 Markdown 文本之前调用
   * @param src 要处理的 Markdown 文本
   * @returns 处理后的 Markdown 文本
   */
  start: (src: string) => string

  /**
   * 扩展 Token 化方法
   * 将 Markdown 文本转换为 Token 列表
   * @param src 要处理的 Markdown 文本
   * @returns 处理后的 Token 列表
   */
  tokenizer?: (src: string) => Token[]

  /**
   * 扩展渲染方法
   * 将 Token 列表渲染为 HTML 或其他格式
   */
  renderer?: TokenRender
}
