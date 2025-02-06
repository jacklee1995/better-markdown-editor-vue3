/*! *****************************************************************************
Copyright (c) jcLee95. All rights reserved.
Licensed under the MIT License. See License.txt in the project root for license information.

Author: jcLee95
Email: 291148484@163.com
***************************************************************************** */

/**
 * src/plugins/emoji/index.ts
 * Emoji 插件模块
 *
 * 这个模块提供了 Emoji 插件的主要类和相关的数据模块。
 * 通过这个模块,我们可以方便地在 Markdown 解析器中注册和使用 Emoji 插件,
 * 实现 Emoji 表情的语法解析和渲染功能。
 *
 * 模块中导出的主要内容包括:
 * - EmojiPlugin: Emoji 插件类,实现 Emoji 表情的语法解析和渲染
 * - emojiData: Emoji 数据模块,提供了 Emoji 表情的数据映射关系
 * - EmojiMap: Emoji 数据映射类型,定义了 Emoji 表情的数据结构
 *
 * 通过这个模块,我们可以方便地在 Markdown 解析器中集成 Emoji 插件,
 * 为 Markdown 文本添加 Emoji 表情的支持,提升 Markdown 的表现力和趣味性。
 *
 * @module
 */

/**
 * Emoji 插件类
 * 实现 Emoji 表情的语法解析和渲染
 */
export { EmojiPlugin } from './EmojiPlugin'

/**
 * Emoji 数据模块
 * 提供了 Emoji 表情的数据映射关系
 */
export { default as emojiData } from './emojiData'

/**
 * Emoji 数据映射类型
 * 定义了 Emoji 表情的数据结构
 */
export type { EmojiMap } from './emojiData'
