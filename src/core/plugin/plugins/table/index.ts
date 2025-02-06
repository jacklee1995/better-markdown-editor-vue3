/*! *****************************************************************************
Copyright (c) jcLee95. All rights reserved.
Licensed under the MIT License. See License in the project root for license information.

Author: jcLee95
Email: 291148484@163.com
***************************************************************************** */

/**
 * src/plugins/table/index.ts
 * 表格插件模块
 *
 * 这个模块提供了表格插件的主要类、组件和工具函数。
 * 通过这个模块,我们可以方便地在 Markdown 解析器中注册和使用表格插件,
 * 实现在 Markdown 中创建和编辑表格的功能。
 *
 * 模块中导出的主要内容包括:
 * - TablePlugin: 表格插件类,实现表格的语法解析和渲染
 * - TableRow: 表格行类,表示表格中的一行
 * - TableCell: 表格单元格类,表示表格中的一个单元格
 * - TableHeader: 表格表头类,表示表格的表头部分
 * - TableBody: 表格主体类,表示表格的主体部分
 * - TableAddRowPlugin: 表格添加行插件类,实现在表格中添加新行的功能
 * - TableRemoveRowPlugin: 表格删除行插件类,实现从表格中删除行的功能
 * - TableAddColPlugin: 表格添加列插件类,实现在表格中添加新列的功能
 * - TableRemoveColPlugin: 表格删除列插件类,实现从表格中删除列的功能
 * - TableUtils: 表格工具函数模块,提供了一些常用的表格相关的工具函数
 *
 * 通过这个模块,我们可以方便地在 Markdown 解析器中集成表格插件,
 * 为 Markdown 文档添加表格的支持,提升文档的表现力和可读性。
 *
 * @module
 */

/**
 * 表格插件类
 * 实现表格的语法解析和渲染
 */
export { TablePlugin } from './TablePlugin'

/**
 * 表格行类
 * 表示表格中的一行
 */
export { TableRow } from './TableRow'

/**
 * 表格单元格类
 * 表示表格中的一个单元格
 */
export { TableCell } from './TableCell'

/**
 * 表格表头类
 * 表示表格的表头部分
 */
export { TableHeader } from './TableHeader'

/**
 * 表格主体类
 * 表示表格的主体部分
 */
export { TableBody } from './TableBody'

/**
 * 表格添加行插件类
 * 实现在表格中添加新行的功能
 */
export { TableAddRowPlugin } from './TableAddRowPlugin'

/**
 * 表格删除行插件类
 * 实现从表格中删除行的功能
 */
export { TableRemoveRowPlugin } from './TableRemoveRowPlugin'

/**
 * 表格添加列插件类
 * 实现在表格中添加新列的功能
 */
export { TableAddColPlugin } from './TableAddColPlugin'

/**
 * 表格删除列插件类
 * 实现从表格中删除列的功能
 */
export { TableRemoveColPlugin } from './TableRemoveColPlugin'

/**
 * 表格工具函数模块
 * 提供了一些常用的表格相关的工具函数
 */
export * from './TableUtils'

/**
 * 表格插件选项接口
 */
export type { TableOptions } from './TablePlugin'
