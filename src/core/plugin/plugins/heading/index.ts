/*! *****************************************************************************
Copyright (c) jcLee95. All rights reserved.
Licensed under the MIT License. See License in the project root for license information.

Author: jcLee95
Email: 291148484@163.com
***************************************************************************** */

/**
 * src/plugins/heading/index.ts
 * 标题插件模块
 *
 * 这个模块提供了标题插件的主要类和相关的工具函数。
 * 通过这个模块,我们可以方便地在 Markdown 解析器中注册和使用标题插件,
 * 实现标题的语法解析、渲染和锚点生成等功能。
 *
 * 模块中导出的主要内容包括:
 * - HeadingPlugin: 标题插件类,实现标题的语法解析和渲染
 * - Heading1Plugin: 一级标题插件类,实现一级标题的语法解析和渲染
 * - Heading2Plugin: 二级标题插件类,实现二级标题的语法解析和渲染
 * - Heading3Plugin: 三级标题插件类,实现三级标题的语法解析和渲染
 * - Heading4Plugin: 四级标题插件类,实现四级标题的语法解析和渲染
 * - Heading5Plugin: 五级标题插件类,实现五级标题的语法解析和渲染
 * - Heading6Plugin: 六级标题插件类,实现六级标题的语法解析和渲染
 * - HeadingUtils: 标题工具函数模块,提供了一些常用的标题相关的工具函数
 *
 * 通过这个模块,我们可以方便地在 Markdown 解析器中集成标题插件,
 * 为 Markdown 文本添加标题的支持,提升 Markdown 的文档结构和可读性。
 *
 * @module
 */

/**
 * 标题插件类
 * 实现标题的语法解析和渲染
 */
export { HeadingPlugin } from './HeadingPlugin'

/**
 * 一级标题插件类
 * 实现一级标题的语法解析和渲染
 */
export { Heading1Plugin } from './Heading1'

/**
 * 二级标题插件类
 * 实现二级标题的语法解析和渲染
 */
export { Heading2Plugin } from './Heading2'

/**
 * 三级标题插件类
 * 实现三级标题的语法解析和渲染
 */
export { Heading3Plugin } from './Heading3'

/**
 * 四级标题插件类
 * 实现四级标题的语法解析和渲染
 */
export { Heading4Plugin } from './Heading4'

/**
 * 五级标题插件类
 * 实现五级标题的语法解析和渲染
 */
export { Heading5Plugin } from './Heading5'

/**
 * 六级标题插件类
 * 实现六级标题的语法解析和渲染
 */
export { Heading6Plugin } from './Heading6'

/**
 * 标题工具函数模块
 * 提供了一些常用的标题相关的工具函数
 */
export * from './HeadingUtils'
