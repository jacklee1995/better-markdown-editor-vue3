// 插件上下文
// src/core/plugin/PluginContext.ts

import type { MarkdownTransformer } from '../markdown/MarkdownTransformer'
import type { MarkdownParserOptions, Token } from '../markdown/interface'
import type { BasePlugin } from './BasePlugin'
import { PluginAPI } from './PluginAPI'

/**
 * 插件上下文类
 * 管理和应用插件
 */
export class PluginContext {
  private md: MarkdownTransformer
  private plugins: BasePlugin[]

  /**
   * 构造函数
   * @param md Markdown 转换器实例
   */
  constructor(md: MarkdownTransformer) {
    this.md = md
    this.plugins = []
  }

  /**
   * 使用插件
   * @param plugin 插件实例
   * @returns 当前插件上下文实例
   */
  public use<T extends BasePlugin>(plugin: T): this {
    const api = new PluginAPI(this.md)
    plugin.extend(api)
    this.plugins.push(plugin)
    return this
  }

  /**
   * 渲染 Markdown 源码为 HTML
   * @param src 源码
   * @param env 环境变量
   * @returns 渲染后的 HTML 字符串
   */
  public render(src: string, env?: Record<string, unknown>): string {
    const tokens = this.parse(src, env)
    return this.md.renderToHtml(tokens)
  }

  /**
   * 解析 Markdown 源码为 Token 数组
   * @param src 源码
   * @param env 环境变量
   * @returns Token 数组
   */
  public parse(src: string, env?: Record<string, unknown>): Token[] {
    const tokens = this.md.parse(src)
    return this.applyPlugins(tokens, env)
  }

  /**
   * 获取 Markdown 解析选项
   * @returns 解析选项
   */
  public getOptions(): MarkdownParserOptions {
    return this.md.getOptions()
  }

  /**
   * 获取所有已注册的插件
   * @returns 插件数组
   */
  public getPlugins(): BasePlugin[] {
    return this.plugins
  }

  /**
   * 根据插件名称获取插件
   * @param name 插件名称
   * @returns 插件实例或 undefined
   */
  public getPlugin<T extends BasePlugin>(name: string): T | undefined {
    return this.plugins.find((plugin) => plugin.name === name) as T
  }

  /**
   * 检查是否存在指定名称的插件
   * @param name 插件名称
   * @returns 是否存在
   */
  public hasPlugin(name: string): boolean {
    return this.plugins.some((plugin) => plugin.name === name)
  }

  /**
   * 应用插件到 Token 数组
   * @param tokens Token 数组
   * @param env 环境变量
   * @returns 处理后的 Token 数组
   */
  private applyPlugins(tokens: Token[], env?: Record<string, unknown>): Token[] {
    let result = tokens
    for (const plugin of this.plugins) {
      if (plugin.tokenizer) {
        result = plugin.tokenizer(this.md.serialize(result))
      }
    }
    for (const plugin of this.plugins) {
      if (plugin.renderer) {
        const { renderer } = plugin
        for (let i = 0; i < result.length; i++) {
          const token = result[i]
          if (token.type === plugin.name) {
            const text = renderer.call(
              plugin,
              result,
              i,
              this.getOptions(),
              env ?? {},
              this.md.getHtmlWriter(),
            )
            result[i] = {
              ...token,
              text,
            }
          }
        }
      }
    }
    return result
  }
}
