/*! *****************************************************************************
Copyright (c) jcLee95. All rights reserved.
Licensed under the MIT License. See License.txt in the project root for license information.

Author: jcLee95
Email: 291148484@163.com
***************************************************************************** */

/**
 * src/plugins/footnote/index.ts
 * 脚注插件模块
 *
 * 这个模块提供了脚注插件的主要类、组件和工具函数。
 * 通过这个模块,我们可以方便地在 Markdown 解析器中注册和使用脚注插件,
 * 实现脚注的语法解析、渲染和交互功能。
 *
 * 模块中导出的主要内容包括:
 * - FootnotePlugin: 脚注插件类,实现脚注的语法解析和渲染
 * - FootnoteRenderer: 脚注渲染器组件,负责将脚注的数据渲染为 HTML
 * - FootnoteDefinition: 脚注定义组件,用于渲染脚注的定义部分
 * - FootnoteReference: 脚注引用组件,用于渲染脚注的引用部分
 * - FootnoteUtils: 脚注工具函数模块,提供了一些常用的工具函数,如判断脚注定义行、提取脚注名称等
 *
 * 通过这个模块,我们可以方便地在 Markdown 解析器中集成脚注插件,
 * 为 Markdown 文本添加脚注的支持,提升文档的表达能力和可读性。
 *
 * @module
 */

/**
 * 脚注插件类
 * 实现脚注的语法解析和渲染
 */
export { FootnotePlugin } from './FootnotePlugin'

/**
 * 脚注渲染器组件
 * 负责将脚注的数据渲染为 HTML
 */
export { default as FootnoteRenderer } from './FootnoteRenderer'

/**
 * 脚注定义组件
 * 用于渲染脚注的定义部分
 */
export { default as FootnoteDefinition } from './FootnoteDefinition'

/**
 * 脚注引用组件
 * 用于渲染脚注的引用部分
 */
export { default as FootnoteReference } from './FootnoteReference'

/**
 * 脚注工具函数模块
 * 提供了一些常用的工具函数,如判断脚注定义行、提取脚注名称等
 */
export * from './FootnoteUtils'
