/*! *****************************************************************************
Copyright (c) jcLee95. All rights reserved.
Licensed under the MIT License. See License.txt in the project root for license information.

Author: jcLee95
Email: 291148484@163.com
***************************************************************************** */

/**
 * src/core/plugin/index.ts
 * 插件模块
 *
 * 这个模块提供了一组类和接口,用于管理和扩展 Markdown 解析器的功能。
 * 通过插件机制,我们可以方便地为 Markdown 解析器添加新的语法支持和渲染功能,
 * 而无需修改核心代码。
 *
 * 插件可以通过继承 `BasePlugin` 基类来实现,根据插件的功能不同,可以选择实现
 * 不同的方法,例如 `start`、`tokenizer`、`renderer` 等。
 *
 * 插件的注册和管理通过 `PluginManager` 类来实现,它提供了一组方法用于加载、卸载和查询插件。
 *
 * 插件的执行顺序通过 `PluginChain` 类来管理,它维护了一个插件链,按照注册顺序依次执行插件。
 *
 * 插件的上下文信息通过 `PluginContext` 类来传递,它包含了当前解析的 Markdown 文本、解析选项等信息。
 *
 * 插件的事件通过 `PluginEvents` 类来管理,它提供了一组方法用于注册和触发事件。
 *
 * 插件的创建和实例化通过 `PluginFactory` 类来管理,它提供了一组方法用于创建和获取插件实例。
 *
 * 插件的加载和初始化通过 `PluginLoader` 类来实现,它负责加载内置插件和外部插件,并进行必要的初始化操作。
 *
 * 插件的代理接口通过 `PluginProxy` 类来提供,它简化了插件的使用,通过代理模式封装了插件的注册、执行和查询等操作。
 *
 * 插件的注册和注销通过 `PluginRegistry` 类来管理,它维护了一个插件注册表,提供了一组方法用于注册和注销插件。
 *
 * 总之,通过这些类和接口的配合,我们可以方便地扩展 Markdown 解析器的功能,实现自定义的语法支持和渲染效果。
 *
 * @module
 */

/**
 * 插件基类
 * 所有的 Markdown 插件都应该继承此基类
 */
export { BasePlugin } from './BasePlugin'

/**
 * 插件 API 类
 * 提供了一组方法用于管理和操作插件
 */
export { PluginAPI } from './PluginAPI'

/**
 * 插件链类
 * 管理插件的注册和执行顺序
 */
export { PluginChain } from './PluginChain'

/**
 * 插件上下文类
 * 管理和应用插件
 */
export { PluginContext } from './PluginContext'

/**
 * 插件事件类
 * 管理插件的事件注册和触发
 */
export { PluginEvents } from './PluginEvents'

/**
 * 插件工厂类
 * 管理插件的创建和使用
 */
export { PluginFactory } from './PluginFactory'

/**
 * 插件加载器类
 * 负责加载和管理插件
 */
export { PluginLoader } from './PluginLoader'

/**
 * 插件管理器类
 * 管理插件的加载、卸载和使用
 */
export { PluginManager } from './PluginManager'

/**
 * 插件代理类
 * 提供插件的代理接口,简化插件的使用
 */
export { PluginProxy } from './PluginProxy'

/**
 * 插件注册表类
 * 管理插件的注册和注销
 */
export { PluginRegistry } from './PluginRegistry'

/**
 * 内置插件
 */
export * from './plugins'

/**
 * 导出插件选项接口
 */
export type { PluginOptions } from './BasePlugin'

/**
 * 导出插件构造函数类型
 */
export type { PluginConstructor } from './BasePlugin'

/**
 * 导出事件处理函数类型
 */
export type { EventHandler } from './BasePlugin'

/**
 * 导出插件工具函数
 */
export { loadPlugins } from './PluginUtils'
