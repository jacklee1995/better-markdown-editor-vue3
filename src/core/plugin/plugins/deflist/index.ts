/*! *****************************************************************************
Copyright (c) jcLee95. All rights reserved.
Licensed under the MIT License. See License.txt in the project root for license information.

Author: jcLee95
Email: 291148484@163.com
***************************************************************************** */

/**
 * src/plugins/deflist/index.ts
 * 定义列表插件模块
 *
 * 这个模块提供了定义列表插件的主要类、组件和工具函数。
 * 通过这个模块,我们可以方便地在 Markdown 解析器中注册和使用定义列表插件,
 * 实现定义列表的语法解析、渲染和交互功能。
 *
 * 模块中导出的主要内容包括:
 * - DefListPlugin: 定义列表插件类,实现定义列表的语法解析和渲染
 * - DefListRenderer: 定义列表渲染器组件,负责将定义列表的数据渲染为 HTML
 * - DefListTerm: 定义列表术语组件,用于渲染定义列表中的术语部分
 * - DefListDefinition: 定义列表定义组件,用于渲染定义列表中的定义部分
 * - DefListUtils: 定义列表工具函数模块,提供了一些常用的工具函数,如判断术语行、提取术语等
 *
 * 通过这个模块,我们可以方便地在 Markdown 解析器中集成定义列表插件,
 * 为 Markdown 文本添加定义列表的支持,提升文档的表达能力和可读性。
 *
 * @module
 */

/**
 * 定义列表插件类
 * 实现定义列表的语法解析和渲染
 */
export { DefListPlugin } from './DefListPlugin'

/**
 * 定义列表渲染器组件
 * 负责将定义列表的数据渲染为 HTML
 */
export { default as DefListRenderer } from './DefListRenderer'

/**
 * 定义列表术语组件
 * 用于渲染定义列表中的术语部分
 */
export { default as DefListTerm } from './DefListTerm'

/**
 * 定义列表定义组件
 * 用于渲染定义列表中的定义部分
 */
export { default as DefListDefinition } from './DefListDefinition'

/**
 * 定义列表工具函数模块
 * 提供了一些常用的工具函数,如判断术语行、提取术语等
 */
export * from './DefListUtils'
