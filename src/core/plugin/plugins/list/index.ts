/*! *****************************************************************************
Copyright (c) jcLee95. All rights reserved.
Licensed under the MIT License. See License.txt in the project root for license information.

Author: jcLee95
Email: 291148484@163.com
***************************************************************************** */

/**
 * src/plugins/list/index.ts
 * 列表插件模块
 *
 * 这个模块提供了一组列表相关的插件,包括有序列表、无序列表、任务列表等。
 * 通过这个模块,我们可以方便地在 Markdown 解析器中注册和使用这些插件,
 * 实现对应的列表语法解析和渲染功能。
 *
 * 模块中导出的插件类包括:
 * - OrderedListPlugin: 有序列表插件,实现有序列表的语法解析和渲染
 * - UnorderedListPlugin: 无序列表插件,实现无序列表的语法解析和渲染
 * - CheckListPlugin: 任务列表插件,实现任务列表的语法解析和渲染
 * - ListIndentPlugin: 列表缩进插件,处理列表的缩进和层级关系
 *
 * 通过这些插件的组合使用,我们可以在 Markdown 解析器中支持各种类型的列表,
 * 为文档添加更丰富的结构和样式。
 *
 * @module
 */

/**
 * 有序列表插件
 * 实现有序列表的语法解析和渲染
 */
export { OrderedListPlugin } from './OrderedListPlugin'

/**
 * 无序列表插件
 * 实现无序列表的语法解析和渲染
 */
export { UnorderedListPlugin } from './UnorderedListPlugin'

/**
 * 任务列表插件
 * 实现任务列表的语法解析和渲染
 */
export { CheckListPlugin } from './CheckListPlugin'

/**
 * 列表缩进插件
 * 处理列表的缩进和层级关系
 */
export { ListIndentPlugin } from './ListIndentPlugin'
