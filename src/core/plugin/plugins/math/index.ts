/*! *****************************************************************************
Copyright (c) jcLee95. All rights reserved.
Licensed under the MIT License. See License in the project root for license information.

Author: jcLee95
Email: 291148484@163.com
***************************************************************************** */

/**
 * src/plugins/math/index.ts
 * 数学公式插件模块
 *
 * 这个模块提供了数学公式插件的主要类和组件。
 * 通过这个模块,我们可以方便地在 Markdown 解析器中注册和使用数学公式插件,
 * 实现在 Markdown 中嵌入 LaTeX 数学公式的功能。
 *
 * 模块中导出的主要内容包括:
 * - MathPlugin: 数学公式插件类,实现数学公式的语法解析和渲染
 * - MathRenderer: 数学公式渲染器组件,负责将 LaTeX 数学公式渲染为 HTML
 *
 * 通过这个模块,我们可以方便地在 Markdown 解析器中集成数学公式插件,
 * 为 Markdown 文档添加丰富的数学表达能力,提升文档的专业性和可读性。
 *
 * @module
 */

/**
 * 数学公式插件类
 * 实现数学公式的语法解析和渲染
 */
export { MathPlugin } from './MathPlugin'

/**
 * 数学公式渲染器组件
 * 负责将 LaTeX 数学公式渲染为 HTML
 */
export { default as MathRenderer } from './MathRenderer'
