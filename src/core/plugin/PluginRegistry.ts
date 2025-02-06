/* eslint-disable @typescript-eslint/no-unused-vars */
// 插件注册表
// src/core/plugin/PluginRegistry.ts

import type { MarkdownTransformer } from '../markdown/MarkdownTransformer'
import type { BasePlugin, PluginConstructor, PluginOptions } from './BasePlugin'
import { PluginAPI } from './PluginAPI'

/**
 * 插件注册表类
 * 管理插件的注册和注销
 */
export class PluginRegistry {
  private md: MarkdownTransformer
  private plugins: Map<string, BasePlugin>

  /**
   * 构造函数
   * @param md Markdown 转换器实例
   */
  constructor(md: MarkdownTransformer) {
    this.md = md
    this.plugins = new Map()
  }

  /**
   * 注册插件
   * @param name 插件名称
   * @param plugin 插件构造函数
   * @param options 插件选项
   * @returns 当前插件注册表实例
   * @throws 如果插件已注册则抛出错误
   */
  public register<T extends BasePlugin>(
    name: string,
    plugin: PluginConstructor,
    options?: PluginOptions,
  ): this {
    if (this.plugins.has(name)) {
      throw new Error(`Plugin "${name}" has already been registered.`)
    }
    const instance = new plugin(options)
    this.plugins.set(name, instance)
    const api = new PluginAPI(this.md)
    instance.extend(api)
    return this
  }

  /**
   * 注销插件
   * @param name 插件名称
   * @returns 当前插件注册表实例
   * @throws 如果插件未注册则抛出错误
   */
  public unregister(name: string): this {
    if (!this.plugins.has(name)) {
      throw new Error(`Plugin "${name}" has not been registered.`)
    }
    this.plugins.delete(name)
    return this
  }

  /**
   * 检查是否存在指定名称的插件
   * @param name 插件名称
   * @returns 是否存在
   */
  public has(name: string): boolean {
    return this.plugins.has(name)
  }

  /**
   * 获取插件实例
   * @param name 插件名称
   * @returns 插件实例或 undefined
   */
  public get<T extends BasePlugin>(name: string): T | undefined {
    return this.plugins.get(name) as T
  }

  /**
   * 获取所有已注册的插件
   * @returns 插件数组
   */
  public getAll(): BasePlugin[] {
    return Array.from(this.plugins.values())
  }

  /**
   * 处理 Markdown 源码
   * @param src 源码
   * @returns 处理后的字符串
   */
  public process(src: string): string {
    let text = src
    for (const plugin of this.getAll()) {
      text = plugin.start(text)
    }
    return text
  }
}
