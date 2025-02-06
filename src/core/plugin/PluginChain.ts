/* eslint-disable @typescript-eslint/no-unused-vars */
// 插件链
// src/core/plugin/PluginChain.ts

import type { MarkdownTransformer } from '../markdown/MarkdownTransformer'
import type { BasePlugin, PluginOptions } from './BasePlugin'
import { PluginAPI } from './PluginAPI'

export class PluginChain {
  private md: MarkdownTransformer
  private plugins: BasePlugin[]

  constructor(md: MarkdownTransformer) {
    this.md = md
    this.plugins = []
  }

  public use<T extends BasePlugin>(plugin: T, options?: PluginOptions): this {
    const api = new PluginAPI(this.md)
    plugin.extend(api)
    this.plugins.push(plugin)
    return this
  }

  public getPlugin<T extends BasePlugin>(name: string): T | undefined {
    return this.plugins.find((plugin) => plugin.name === name) as T
  }

  public removePlugin(name: string): this {
    const index = this.plugins.findIndex((plugin) => plugin.name === name)
    if (index !== -1) {
      this.plugins.splice(index, 1)
    }
    return this
  }

  public hasPlugin(name: string): boolean {
    return this.plugins.some((plugin) => plugin.name === name)
  }

  public getPlugins(): BasePlugin[] {
    return this.plugins
  }

  public getBlockPlugins(): BasePlugin[] {
    return this.plugins.filter((plugin) => plugin.level === 'block')
  }

  public getInlinePlugins(): BasePlugin[] {
    return this.plugins.filter((plugin) => plugin.level === 'inline')
  }

  public getCorePlugins(): BasePlugin[] {
    return this.plugins.filter((plugin) => plugin.level === 'core')
  }

  public applyPlugins(src: string): string {
    let text = src
    for (const plugin of this.plugins) {
      if (plugin.level === 'core') {
        text = plugin.start(text)
      }
    }
    for (const plugin of this.plugins) {
      if (plugin.level === 'block') {
        text = plugin.start(text)
      }
    }
    for (const plugin of this.plugins) {
      if (plugin.level === 'inline') {
        text = plugin.start(text)
      }
    }
    return text
  }

  public process(src: string): string {
    return this.applyPlugins(src)
  }
}
