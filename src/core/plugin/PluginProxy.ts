/* eslint-disable @typescript-eslint/no-unused-vars */
// 插件代理
// src/core/plugin/PluginProxy.ts

import type { Token } from '../markdown/interface'
import type { MarkdownTransformer } from '../markdown/MarkdownTransformer'
import type { BasePlugin, PluginConstructor, PluginOptions } from './BasePlugin'
import { PluginManager } from './PluginManager'

export class PluginProxy {
  private md: MarkdownTransformer
  private manager: PluginManager

  constructor(md: MarkdownTransformer) {
    this.md = md
    this.manager = new PluginManager(md)
  }

  public use<T extends BasePlugin>(plugin: PluginConstructor, options?: PluginOptions): this {
    this.manager.use(plugin, options)
    return this
  }

  public unuse(name: string): this {
    this.manager.unuse(name)
    return this
  }

  public get<T extends BasePlugin>(name: string): T | undefined {
    return this.manager.get<T>(name)
  }

  public has(name: string): boolean {
    return this.manager.has(name)
  }

  public parse(src: string): Token[] {
    return this.manager.parse(src)
  }

  public render(src: string, env?: Record<string, unknown>): string {
    return this.manager.render(src, env)
  }

  public process(src: string): string {
    return this.manager.process(src)
  }
}
