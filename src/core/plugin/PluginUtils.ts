// src/core/plugin/PluginUtils.ts

import { MarkdownTransformer, type MarkdownParserOptions } from '../markdown'
import type { BasePlugin } from './BasePlugin'
import { PluginLoader } from './PluginLoader'

/**
 * 加载插件的辅助函数
 * @param plugins 要加载的插件数组
 * @param options Markdown 解析器选项
 */
export async function loadPlugins(
  plugins: BasePlugin[],
  options: MarkdownParserOptions = {},
): Promise<void> {
  const loader = new PluginLoader(new MarkdownTransformer(options))
  loader.load(plugins)
}
