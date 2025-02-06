// 插件加载器
// src/core/plugin/PluginLoader.ts

import type { MarkdownTransformer } from '../markdown/MarkdownTransformer'
import type { BasePlugin, PluginConstructor, PluginOptions } from './BasePlugin'
import { PluginFactory } from './PluginFactory'
import {
  ContainerPlugin,
  DefListPlugin,
  EChartsPlugin,
  EmojiPlugin,
  FlowchartPlugin,
  FootnotePlugin,
  HighlightPlugin,
  ImagePlugin,
  InsPlugin,
  KatexPlugin,
  LinkPlugin,
  MarkPlugin,
  MermaidPlugin,
  SequenceDiagramPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  TablePlugin,
  TaskListPlugin,
  TocPlugin,
  TodoListPlugin,
} from './plugins'
import { PluginAPI } from './PluginAPI'

/**
 * 插件加载器
 * 负责加载和管理插件
 */
export class PluginLoader {
  private md: MarkdownTransformer
  private factory: PluginFactory

  /**
   * 构造函数
   * @param md Markdown 转换器实例
   */
  constructor(md: MarkdownTransformer) {
    this.md = md
    this.factory = new PluginFactory(md)
  }

  /**
   * 加载内置插件
   */
  public loadBuiltInPlugins(): void {
    this.loadPlugin(ContainerPlugin)
    this.loadPlugin(DefListPlugin)
    this.loadPlugin(EChartsPlugin)
    this.loadPlugin(EmojiPlugin)
    this.loadPlugin(FlowchartPlugin)
    this.loadPlugin(FootnotePlugin)
    this.loadPlugin(HighlightPlugin)
    this.loadPlugin(ImagePlugin)
    this.loadPlugin(InsPlugin)
    this.loadPlugin(KatexPlugin)
    this.loadPlugin(LinkPlugin)
    this.loadPlugin(MarkPlugin)
    this.loadPlugin(MermaidPlugin)
    this.loadPlugin(SequenceDiagramPlugin)
    this.loadPlugin(SubscriptPlugin)
    this.loadPlugin(SuperscriptPlugin)
    this.loadPlugin(TablePlugin)
    this.loadPlugin(TaskListPlugin)
    this.loadPlugin(TocPlugin)
    this.loadPlugin(TodoListPlugin)
  }

  /**
   * 加载插件
   * @param plugin 插件构造函数
   * @param options 插件选项
   */
  public loadPlugin(plugin: PluginConstructor, options?: PluginOptions): void {
    this.factory.use(plugin, options)
  }

  /**
   * 获取所有已加载的插件实例
   * @returns 插件实例数组
   */
  public getPlugins(): BasePlugin[] {
    return this.factory.getPlugins()
  }

  /**
   * 根据插件名获取插件实例
   * @param name 插件名
   * @returns 插件实例,如果未找到则返回 undefined
   */
  public getPlugin<T extends BasePlugin>(name: string): T | undefined {
    return this.factory.getPlugin<T>(name)
  }

  /**
   * 移除指定名称的插件
   * @param name 插件名
   */
  public removePlugin(name: string): void {
    this.factory.removePlugin(name)
  }

  /**
   * 处理 Markdown 源码
   * @param src Markdown 源码
   * @returns 处理后的 HTML 字符串
   */
  public process(src: string): string {
    return this.factory.process(src)
  }

  /**
   * 加载插件,并为每个插件提供 API 接口
   * @param plugins 插件实例数组
   */
  public load(plugins: BasePlugin[]): void {
    for (const plugin of plugins) {
      const api = new PluginAPI(this.md)
      plugin.extend(api)
    }
  }
}
