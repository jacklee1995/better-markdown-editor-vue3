/* eslint-disable @typescript-eslint/no-unused-vars */
// 插件基类
// src/core/plugin/BasePlugin.ts

import type { MarkdownExtension, MarkdownTransformer } from '../markdown/MarkdownTransformer'
import type { MarkdownParserOptions, Token, Renderer } from '../markdown/interface'
import type { PluginAPI } from './PluginAPI'

/**
 * 事件处理函数类型
 */
export type EventHandler = (...args: unknown[]) => void

/**
 * 插件基类
 * 所有的 Markdown 插件都应该继承此基类
 */
export abstract class BasePlugin implements MarkdownExtension {
  /**
   * 插件名称
   */
  public abstract name: string

  /**
   * 插件级别
   * 可选值: 'block' | 'inline' | 'core'
   * - 'block': 块级插件,用于处理块级元素
   * - 'inline': 行内插件,用于处理行内元素
   * - 'core': 核心插件,用于处理核心功能
   */
  public abstract level: 'block' | 'inline' | 'core'

  /**
   * 插件启动方法
   * 在解析 Markdown 内容之前调用
   * @param src 源 Markdown 内容
   * @returns 处理后的 Markdown 内容
   */
  public start(src: string): string {
    return src
  }

  /**
   * 插件 Token 化方法
   * 将 Markdown 内容转换为 Token 列表
   * @param src 源 Markdown 内容
   * @returns Token 列表
   */
  public tokenizer?(src: string): Token[] {
    return []
  }

  /**
   * 插件渲染方法
   * 将 Token 列表渲染为 HTML 内容
   * @param tokens Token 列表
   * @param idx 当前 Token 索引
   * @param options Markdown 解析选项
   * @param env 环境变量
   * @param self 渲染器实例
   * @returns 渲染后的 HTML 内容
   */
  public renderer?(
    tokens: Token[],
    idx: number,
    options: MarkdownParserOptions,
    env: Record<string, unknown>,
    self: Renderer,
  ): string {
    return ''
  }

  /**
   * 插件扩展方法
   * 用于扩展插件功能
   * @param api 插件 API 实例
   */
  public extend(api: PluginAPI): void {}
}

/**
 * 插件选项接口
 */
export interface PluginOptions {
  [key: string]: unknown
}

/**
 * 插件构造函数类型
 */
export type PluginConstructor = new (options?: PluginOptions) => BasePlugin

/**
 * 判断一个对象是否为插件实例
 * @param extension 要判断的对象
 * @returns 如果是插件实例则返回 true,否则返回 false
 */
export function isPlugin(extension: unknown): extension is BasePlugin {
  return extension instanceof BasePlugin
}

/**
 * 获取插件名称
 * @param plugin 插件实例
 * @returns 插件名称
 */
export function getPluginName(plugin: BasePlugin): string {
  return plugin.name
}

/**
 * 获取插件级别
 * @param plugin 插件实例
 * @returns 插件级别
 */
export function getPluginLevel(plugin: BasePlugin): 'block' | 'inline' | 'core' {
  return plugin.level
}

/**
 * 应用插件
 * @param md Markdown 转换器实例
 * @param plugin 插件实例
 */
export function applyPlugin(md: MarkdownTransformer, plugin: BasePlugin): void {
  md.use(plugin)
}
