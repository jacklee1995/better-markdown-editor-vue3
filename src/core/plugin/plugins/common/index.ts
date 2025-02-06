/*! *****************************************************************************
Copyright (c) jcLee95. All rights reserved.
Licensed under the MIT License. See License.txt in the project root for license information.

Author: jcLee95
Email: 291148484@163.com
***************************************************************************** */

/**
 * src/plugins/common/index.ts
 * 通用插件模块
 *
 * 这个模块提供了一组通用的 Markdown 插件,包括各种常用的语法解析和渲染功能。
 * 通过这个模块,我们可以方便地在 Markdown 解析器中注册和使用这些插件,
 * 实现对应的语法解析和渲染效果。
 *
 * 模块中导出的插件类包括:
 * - BlockquotePlugin: 引用块插件,实现引用块的语法解析和渲染
 * - BoldPlugin: 加粗插件,实现加粗文本的语法解析和渲染
 * - ClearFormatPlugin: 清除格式插件,实现清除文本格式的语法解析和渲染
 * - HighlightPlugin: 高亮插件,实现代码高亮的语法解析和渲染
 * - HrPlugin: 分隔线插件,实现分隔线的语法解析和渲染
 * - ImagePlugin: 图片插件,实现图片的语法解析和渲染
 * - InlineCodePlugin: 行内代码插件,实现行内代码的语法解析和渲染
 * - ItalicPlugin: 斜体插件,实现斜体文本的语法解析和渲染
 * - LinkPlugin: 链接插件,实现链接的语法解析和渲染
 * - SelectAllPlugin: 全选插件,实现 Ctrl+A 全选文本的功能
 * - StrikePlugin: 删除线插件,实现删除线文本的语法解析和渲染
 * - SubscriptPlugin: 下标插件,实现下标文本的语法解析和渲染
 * - SuperscriptPlugin: 上标插件,实现上标文本的语法解析和渲染
 *
 * 通过这个模块,我们可以方便地在 Markdown 解析器中集成这些通用插件,
 * 为 Markdown 文本添加各种常用的语法支持和渲染效果,提升 Markdown 的展示和交互效果。
 *
 * @module
 */

/**
 * 引用块插件
 * 实现引用块的语法解析和渲染
 */
export { BlockquotePlugin } from './BlockquotePlugin'

/**
 * 加粗插件
 * 实现加粗文本的语法解析和渲染
 */
export { BoldPlugin } from './BoldPlugin'

/**
 * 清除格式插件
 * 实现清除文本格式的语法解析和渲染
 */
export { ClearFormatPlugin } from './ClearFormatPlugin'

/**
 * 高亮插件
 * 实现代码高亮的语法解析和渲染
 */
export { HighlightPlugin } from './HighlightPlugin'

/**
 * 分隔线插件
 * 实现分隔线的语法解析和渲染
 */
export { HrPlugin } from './HrPlugin'

/**
 * 图片插件
 * 实现图片的语法解析和渲染
 */
export { ImagePlugin } from './ImagePlugin'

/**
 * 行内代码插件
 * 实现行内代码的语法解析和渲染
 */
export { InlineCodePlugin } from './InlineCodePlugin'

/**
 * 斜体插件
 * 实现斜体文本的语法解析和渲染
 */
export { ItalicPlugin } from './ItalicPlugin'

/**
 * 链接插件
 * 实现链接的语法解析和渲染
 */
export { LinkPlugin } from './LinkPlugin'

/**
 * 全选插件
 * 实现 Ctrl+A 全选文本的功能
 */
export { SelectAllPlugin } from './SelectAllPlugin'

/**
 * 删除线插件
 * 实现删除线文本的语法解析和渲染
 */
export { StrikePlugin } from './StrikePlugin'

/**
 * 下标插件
 * 实现下标文本的语法解析和渲染
 */
export { SubscriptPlugin } from './SubscriptPlugin'

/**
 * 上标插件
 * 实现上标文本的语法解析和渲染
 */
export { SuperscriptPlugin } from './SuperscriptPlugin'
