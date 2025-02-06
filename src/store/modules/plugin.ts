import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { BasePlugin, PluginConstructor, PluginOptions } from '@/core/plugin'
import { PluginProxy } from '@/core/plugin'
import type { MarkdownTransformer } from '@/core/markdown'

/**
 * 插件状态接口
 */
export interface PluginState {
  /**
   * 插件代理实例
   */
  proxy: PluginProxy

  /**
   * 已注册的插件列表
   */
  plugins: BasePlugin[]
}

/**
 * 使用 Pinia 定义插件状态存储
 */
export const usePluginStore = defineStore('plugin', () => {
  // Markdown 转换器实例
  const md = ref<MarkdownTransformer>()

  // 插件代理实例
  const proxy = ref(new PluginProxy(md.value!))

  // 已注册的插件列表
  const plugins = ref<BasePlugin[]>([])

  /**
   * 设置 Markdown 转换器实例
   * @param transformer Markdown 转换器实例
   */
  function setMarkdownTransformer(transformer: MarkdownTransformer) {
    md.value = transformer
    proxy.value = new PluginProxy(md.value)
  }

  /**
   * 注册插件
   * @param plugin 插件构造函数
   * @param options 插件选项
   */
  function registerPlugin<T extends BasePlugin>(
    plugin: PluginConstructor,
    options?: PluginOptions,
  ) {
    proxy.value.use<T>(plugin, options)
    plugins.value = proxy.value.getPlugins()
  }

  /**
   * 批量注册插件
   * @param pluginList 插件构造函数列表
   * @param options 插件选项
   */
  function registerPlugins(pluginList: PluginConstructor[], options?: PluginOptions) {
    pluginList.forEach((plugin) => registerPlugin(plugin, options))
  }

  /**
   * 注销插件
   * @param name 插件名称
   */
  function unregisterPlugin(name: string) {
    proxy.value.unuse(name)
    plugins.value = proxy.value.getPlugins()
  }

  /**
   * 获取插件实例
   * @param name 插件名称
   * @returns 插件实例,如果未找到则返回 undefined
   */
  function getPlugin<T extends BasePlugin>(name: string): T | undefined {
    return proxy.value.get<T>(name)
  }

  /**
   * 检查插件是否已注册
   * @param name 插件名称
   * @returns 如果插件已注册则返回 true,否则返回 false
   */
  function hasPlugin(name: string): boolean {
    return proxy.value.has(name)
  }

  /**
   * 获取所有已注册的插件名称
   */
  const pluginNames = computed(() => plugins.value.map((plugin) => plugin.name))

  /**
   * 解析 Markdown 文本并返回 Token 列表
   * @param text Markdown 文本
   * @returns Token 列表
   */
  function parse(text: string) {
    return proxy.value.parse(text)
  }

  /**
   * 将 Markdown 文本渲染为 HTML
   * @param text Markdown 文本
   * @param env 环境变量
   * @returns 渲染后的 HTML 字符串
   */
  function render(text: string, env?: Record<string, unknown>) {
    return proxy.value.render(text, env)
  }

  /**
   * 使用插件处理 Markdown 文本
   * @param text Markdown 文本
   * @returns 处理后的文本
   */
  function process(text: string) {
    return proxy.value.process(text)
  }

  return {
    setMarkdownTransformer,
    registerPlugin,
    registerPlugins,
    unregisterPlugin,
    getPlugin,
    hasPlugin,
    pluginNames,
    parse,
    render,
    process,
    plugins,
  }
})
