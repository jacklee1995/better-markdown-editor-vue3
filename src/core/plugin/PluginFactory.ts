/* eslint-disable @typescript-eslint/no-unused-vars */
// 插件工厂
// src/core/plugin/PluginFactory.ts

import type { MarkdownParserOptions, Token } from '../markdown/interface'
import type { MarkdownTransformer } from '../markdown/MarkdownTransformer'
import type { BasePlugin, PluginConstructor, PluginOptions } from './BasePlugin'
import { PluginAPI } from './PluginAPI'
import { PluginChain } from './PluginChain'
import { PluginContext } from './PluginContext'
import { PluginEvents } from './PluginEvents'

/**
 * 插件工厂类
 * 管理插件的创建和使用
 */
export class PluginFactory {
  private md: MarkdownTransformer
  private api: PluginAPI
  private chain: PluginChain
  private context: PluginContext
  private events: PluginEvents

  /**
   * 构造函数
   * @param md Markdown 转换器实例
   */
  constructor(md: MarkdownTransformer) {
    this.md = md
    this.api = new PluginAPI(md)
    this.chain = new PluginChain(md)
    this.context = new PluginContext(md)
    this.events = new PluginEvents(md)
  }

  /**
   * 使用插件
   * @param plugin 插件构造函数
   * @param options 插件选项
   * @returns 当前插件工厂实例
   */
  public use<T extends BasePlugin>(plugin: PluginConstructor, options?: PluginOptions): this {
    const instance = new plugin(options)
    this.api.use(instance)
    this.chain.use(instance)
    this.context.use(instance)
    this.events.use(instance)
    return this
  }

  /**
   * 解析 Markdown 源码为 Token 数组
   * @param src 源码
   * @param env 环境变量
   * @returns Token 数组
   */
  public parse(src: string, env?: Record<string, unknown>): Token[] {
    return this.context.parse(src, env)
  }

  /**
   * 渲染 Markdown 源码为 HTML
   * @param src 源码
   * @param env 环境变量
   * @returns 渲染后的 HTML 字符串
   */
  public render(src: string, env?: Record<string, unknown>): string {
    return this.context.render(src, env)
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
    return this.api.getPlugins()
  }

  /**
   * 根据插件名称获取插件
   * @param name 插件名称
   * @returns 插件实例或 undefined
   */
  public getPlugin<T extends BasePlugin>(name: string): T | undefined {
    return this.api.getPlugin<T>(name)
  }

  /**
   * 检查是否存在指定名称的插件
   * @param name 插件名称
   * @returns 是否存在
   */
  public hasPlugin(name: string): boolean {
    return this.api.hasPlugin(name)
  }

  /**
   * 移除插件
   * @param name 插件名称
   * @returns 当前插件工厂实例
   */
  public removePlugin(name: string): this {
    this.api.removePlugin(name)
    this.chain.removePlugin(name)
    return this
  }

  /**
   * 处理 Markdown 源码
   * @param src 源码
   * @returns 处理后的字符串
   */
  public process(src: string): string {
    return this.chain.process(src)
  }

  /**
   * 注册插件事件处理器
   * @param event 事件名称
   * @param handler 事件处理器
   * @returns 当前插件工厂实例
   */
  public on<K extends keyof BasePlugin>(event: K, handler: BasePlugin[K]): this {
    this.events.on(event, handler)
    return this
  }

  /**
   * 移除插件事件处理器
   * @param event 事件名称
   * @returns 当前插件工厂实例
   */
  public off<K extends keyof BasePlugin>(event: K): this {
    this.events.off(event)
    return this
  }

  /**
   * 触发插件事件
   * @param event 事件名称
   * @param args 事件参数
   */
  public emit<K extends keyof BasePlugin>(event: K, ...args: unknown[]): void {
    this.events.emit(event, ...args)
  }
}
