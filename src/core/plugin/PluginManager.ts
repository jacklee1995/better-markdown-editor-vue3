/* eslint-disable @typescript-eslint/no-unused-vars */
// 插件管理器
// src/core/plugin/PluginManager.ts

import type { Token } from 'monaco-editor'
import type { MarkdownTransformer } from '../markdown/MarkdownTransformer'
import type { BasePlugin, PluginConstructor, PluginOptions } from './BasePlugin'
import { PluginLoader } from './PluginLoader'
import type { Token as MarkdownToken } from '../markdown/interface'

/**
 * 插件管理器类
 * 管理插件的加载、卸载和使用
 */
export class PluginManager {
  private md: MarkdownTransformer
  private loader: PluginLoader

  /**
   * 构造函数
   * @param md Markdown 转换器实例
   */
  constructor(md: MarkdownTransformer) {
    this.md = md
    this.loader = new PluginLoader(md)
  }

  /**
   * 使用插件
   * @param plugin 插件构造函数
   * @param options 插件选项
   * @returns 当前插件管理器实例
   */
  public use<T extends BasePlugin>(plugin: PluginConstructor, options?: PluginOptions): this {
    this.loader.loadPlugin(plugin, options)
    return this
  }

  /**
   * 卸载插件
   * @param name 插件名称
   * @returns 当前插件管理器实例
   */
  public unuse(name: string): this {
    this.loader.removePlugin(name)
    return this
  }

  /**
   * 加载所有内置插件
   * @returns 当前插件管理器实例
   */
  public loadAll(): this {
    this.loader.loadBuiltInPlugins()
    return this
  }

  /**
   * 获取插件实例
   * @param name 插件名称
   * @returns 插件实例或 undefined
   */
  public get<T extends BasePlugin>(name: string): T | undefined {
    return this.loader.getPlugin<T>(name)
  }

  /**
   * 检查是否存在指定名称的插件
   * @param name 插件名称
   * @returns 是否存在
   */
  public has(name: string): boolean {
    return !!this.get(name)
  }

  /**
   * 解析 Markdown 源码为 Token 数组
   * @param src 源码
   * @returns Token 数组
   */
  public parse(src: string): MarkdownToken[] {
    return this.md.parse(src)
  }

  /**
   * 渲染 Markdown 源码为 HTML
   * @param src 源码
   * @param env 环境变量
   * @returns 渲染后的 HTML 字符串
   */
  public render(src: string, env?: Record<string, unknown>): string {
    return this.md.render(src, env)
  }

  /**
   * 处理 Markdown 源码
   * @param src 源码
   * @returns 处理后的字符串
   */
  public process(src: string): string {
    return this.loader.process(src)
  }
}
