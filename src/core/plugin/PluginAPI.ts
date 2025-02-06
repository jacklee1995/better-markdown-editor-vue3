/* eslint-disable @typescript-eslint/no-unused-vars */
// 插件API
// src/core/plugin/PluginAPI.ts

import type { MarkdownTransformer } from '../markdown/MarkdownTransformer'
import type { BasePlugin, PluginOptions } from './BasePlugin'

/**
 * 插件 API 类
 * 提供了一组方法用于管理和操作插件
 */
export class PluginAPI {
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
   * @param plugin 要使用的插件实例
   * @param options 插件选项
   * @returns 返回当前 PluginAPI 实例,以支持链式调用
   */
  public use<T extends BasePlugin>(plugin: T, options?: PluginOptions): this {
    this.plugins.push(plugin)
    return this
  }

  /**
   * 获取指定名称的插件实例
   * @param name 插件名称
   * @returns 如果找到则返回插件实例,否则返回 undefined
   */
  public getPlugin<T extends BasePlugin>(name: string): T | undefined {
    return this.plugins.find((plugin) => plugin.name === name) as T
  }

  /**
   * 移除指定名称的插件
   * @param name 要移除的插件名称
   * @returns 返回当前 PluginAPI 实例,以支持链式调用
   */
  public removePlugin(name: string): this {
    const index = this.plugins.findIndex((plugin) => plugin.name === name)
    if (index !== -1) {
      this.plugins.splice(index, 1)
    }
    return this
  }

  /**
   * 判断是否存在指定名称的插件
   * @param name 插件名称
   * @returns 如果存在则返回 true,否则返回 false
   */
  public hasPlugin(name: string): boolean {
    return this.plugins.some((plugin) => plugin.name === name)
  }

  /**
   * 获取所有插件实例
   * @returns 返回所有插件实例的数组
   */
  public getPlugins(): BasePlugin[] {
    return this.plugins
  }

  /**
   * 获取所有块级插件实例
   * @returns 返回所有块级插件实例的数组
   */
  public getBlockPlugins(): BasePlugin[] {
    return this.plugins.filter((plugin) => plugin.level === 'block')
  }

  /**
   * 获取所有行内插件实例
   * @returns 返回所有行内插件实例的数组
   */
  public getInlinePlugins(): BasePlugin[] {
    return this.plugins.filter((plugin) => plugin.level === 'inline')
  }

  /**
   * 获取所有核心插件实例
   * @returns 返回所有核心插件实例的数组
   */
  public getCorePlugins(): BasePlugin[] {
    return this.plugins.filter((plugin) => plugin.level === 'core')
  }

  /**
   * 应用所有块级插件
   * @param src 要处理的 Markdown 源码
   * @returns 返回处理后的 Markdown 源码
   */
  public applyBlockPlugins(src: string): string {
    let result = src
    for (const plugin of this.getBlockPlugins()) {
      result = plugin.start(result)
    }
    return result
  }

  /**
   * 应用所有行内插件
   * @param src 要处理的 Markdown 源码
   * @returns 返回处理后的 Markdown 源码
   */
  public applyInlinePlugins(src: string): string {
    let result = src
    for (const plugin of this.getInlinePlugins()) {
      result = plugin.start(result)
    }
    return result
  }

  /**
   * 应用所有核心插件
   * @param src 要处理的 Markdown 源码
   * @returns 返回处理后的 Markdown 源码
   */
  public applyCorePlugins(src: string): string {
    let result = src
    for (const plugin of this.getCorePlugins()) {
      result = plugin.start(result)
    }
    return result
  }

  /**
   * 处理 Markdown 源码
   * 依次应用核心插件、块级插件和行内插件
   * @param src 要处理的 Markdown 源码
   * @returns 返回处理后的 Markdown 源码
   */
  public process(src: string): string {
    let result = src
    result = this.applyCorePlugins(result)
    result = this.applyBlockPlugins(result)
    result = this.applyInlinePlugins(result)
    return result
  }

  /**
   * 获取 Markdown 转换器实例
   * @returns 返回 Markdown 转换器实例
   */
  public getMarkdownTransformer(): MarkdownTransformer {
    return this.md
  }
}
