/*! *****************************************************************************
Copyright (c) jcLee95. All rights reserved.
Licensed under the MIT License. See License.txt in the project root for license information.

Author: jcLee95
Email: 291148484@163.com
***************************************************************************** */

/**
 * src/plugins/codeblock/index.ts
 * 代码块插件模块
 *
 * 这个模块提供了代码块插件的主要类、组件和工具函数。
 * 通过这个模块,我们可以方便地在 Markdown 解析器中注册和使用代码块插件,
 * 实现代码块的语法解析、渲染和交互功能。
 *
 * 模块中导出的主要内容包括:
 * - CodeBlockPlugin: 代码块插件类,实现代码块的语法解析和渲染
 * - CodeBlockRenderer: 代码块渲染器组件,负责将代码块渲染为带有行号、语言选择和复制按钮的代码块
 * - CodeBlockCopyButton: 代码块复制按钮组件,点击按钮可以将代码块的内容复制到剪贴板
 * - CodeBlockLangSelect: 代码块语言选择器组件,用于选择代码块的语言,从而实现语法高亮
 * - CodeBlockLineNumber: 代码块行号组件,根据代码内容生成行号,并显示在代码块的左侧
 * - CodeBlockUtils: 代码块工具函数模块,提供了一些常用的工具函数,如提取代码语言、提取代码内容、复制到剪贴板等
 *
 * 通过这个模块,我们可以方便地在 Markdown 解析器中集成代码块插件,
 * 为代码块添加语法高亮、行号显示、语言选择、复制等功能,提升代码块的展示和交互效果。
 *
 * @module
 */

/**
 * 代码块插件类
 * 实现代码块的语法解析和渲染
 */
export { CodeBlockPlugin } from './CodeBlockPlugin'

/**
 * 代码块渲染器组件
 * 负责将代码块渲染为带有行号、语言选择和复制按钮的代码块
 */
export { default as CodeBlockRenderer } from './CodeBlockRenderer'

/**
 * 代码块复制按钮组件
 * 点击按钮可以将代码块的内容复制到剪贴板
 */
export { default as CodeBlockCopyButton } from './CodeBlockCopyButton'

/**
 * 代码块语言选择器组件
 * 用于选择代码块的语言,从而实现语法高亮
 */
export { default as CodeBlockLangSelect } from './CodeBlockLangSelect'

/**
 * 代码块行号组件
 * 根据代码内容生成行号,并显示在代码块的左侧
 */
export { default as CodeBlockLineNumber } from './CodeBlockLineNumber'

/**
 * 代码块工具函数模块
 * 提供了一些常用的工具函数,如提取代码语言、提取代码内容、复制到剪贴板等
 */
export * from './CodeBlockUtils'
