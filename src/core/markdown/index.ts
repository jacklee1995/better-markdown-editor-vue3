/*! *****************************************************************************
Copyright (c) jcLee95. All rights reserved.
Licensed under the MIT License. See License in the project root for license information.

Author: jcLee95
Email: 291148484@163.com
***************************************************************************** */

/**
 * src/core/markdown/index.ts
 * Markdown 模块
 *
 * 这个模块提供了一组类和接口,用于解析和渲染 Markdown 文本。
 * 通过这个模块,我们可以方便地将 Markdown 文本转换为 HTML 或其他格式,
 * 并且可以通过插件机制扩展 Markdown 的语法和功能。
 *
 * 模块中的主要类包括:
 * - MarkdownParser: 负责解析 Markdown 文本,生成 Token 列表
 * - MarkdownRenderer: 负责将 Token 列表渲染为 HTML
 * - MarkdownLexer: 负责将 Markdown 文本分解为 Token
 * - MarkdownTokenizer: 负责将 Markdown 文本转换为 Token 列表
 * - MarkdownTransformer: 负责将 Markdown 文本转换为 HTML 或其他格式
 * - MarkdownHtmlWriter: 负责将 Token 列表渲染为 HTML 字符串
 * - MarkdownTextWriter: 负责将 Token 列表渲染为纯文本格式的 Markdown
 * - MarkdownSerializer: 负责将 Token 列表序列化为 Markdown 字符串
 * - MarkdownUtils: 提供常用的字符串处理和 Token 操作方法
 * - MarkdownWalker: 负责遍历 Markdown 解析生成的抽象语法树
 *
 * 模块中还导出了一些重要的接口和类型:
 * - MarkdownParserOptions: Markdown 解析器选项接口
 * - MarkdownRenderer: Markdown 渲染器接口
 * - MarkdownExtension: Markdown 扩展接口
 * - Token: Markdown Token 接口
 * - TokenRender: Token 渲染函数类型
 * - Renderer: 渲染器接口
 *
 * 通过这些类和接口,我们可以方便地解析、渲染和扩展 Markdown 文本,
 * 实现自定义的 Markdown 语法和渲染效果。
 *
 * @module
 */

/**
 * Markdown 语法解析器
 * 将 Markdown 文本解析为 Token 列表,并生成 HTML
 */
export { MarkdownParser } from './MarkdownParser'

/**
 * Markdown 渲染器组件
 * 将 Markdown 文本渲染为 HTML,并显示在页面上
 */
import MarkdownRenderer from './MarkdownRenderer'
export { MarkdownRenderer }

/**
 * Markdown 词法分析器
 * 将 Markdown 文本分解为 Token 列表
 */
export { MarkdownLexer } from './MarkdownLexer'

/**
 * Markdown 符号化器
 * 将 Markdown 文本转换为 Token 列表
 */
export { MarkdownTokenizer } from './MarkdownTokenizer'

/**
 * Markdown 转换器
 * 将 Markdown 文本转换为 HTML 或其他格式
 */
export { MarkdownTransformer } from './MarkdownTransformer'

/**
 * Markdown HTML 写入器
 * 将 Token 列表渲染为 HTML 字符串
 */
export { MarkdownHtmlWriter } from './MarkdownHtmlWriter'

/**
 * Markdown 文本写入器
 * 将 Token 列表渲染为纯文本格式的 Markdown
 */
export { MarkdownTextWriter } from './MarkdownTextWriter'

/**
 * Markdown 序列化器
 * 将 Token 列表序列化为 Markdown 字符串
 */
export { MarkdownSerializer } from './MarkdownSerializer'

/**
 * Markdown 工具类
 * 提供常用的字符串处理和 Token 操作方法
 */
export { MarkdownUtils } from './MarkdownUtils'

/**
 * Markdown AST 遍历器
 * 遍历 Markdown 解析生成的抽象语法树
 */
export { MarkdownWalker } from './MarkdownWalker'

/**
 * 导出 Markdown 解析器选项接口
 */
export type { MarkdownParserOptions } from './interface'

/**
 * 导出 Markdown 渲染器接口
 */
export type { MarkdownRenderer as IMarkdownRenderer } from './interface'

/**
 * 导出 Markdown 扩展接口
 */
export type { MarkdownExtension } from './interface'

/**
 * 导出 Token 接口
 */
export type { Token } from './interface'

/**
 * 导出 Token 渲染函数类型
 */
export type { TokenRender } from './interface'

/**
 * 导出渲染器接口
 */
export type { Renderer } from './interface'
