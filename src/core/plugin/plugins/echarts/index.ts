/*! *****************************************************************************
Copyright (c) jcLee95. All rights reserved.
Licensed under the MIT License. See License in the project root for license information.

Author: jcLee95
Email: 291148484@163.com
***************************************************************************** */

/**
 * src/plugins/echarts/index.ts
 * ECharts 插件模块
 *
 * 这个模块提供了 ECharts 插件的主要类和组件。
 * 通过这个模块,我们可以方便地在 Markdown 解析器中注册和使用 ECharts 插件,
 * 实现在 Markdown 中嵌入 ECharts 图表的功能。
 *
 * 模块中导出的主要内容包括:
 * - EChartsPlugin: ECharts 插件类,实现 ECharts 代码块的语法解析和渲染
 * - EChartsRenderer: ECharts 渲染器组件,负责将 ECharts 配置渲染为图表
 *
 * 通过这个模块,我们可以方便地在 Markdown 解析器中集成 ECharts 插件,
 * 为 Markdown 文档添加丰富的数据可视化功能,提升文档的表现力和可读性。
 *
 * @module
 */

/**
 * ECharts 插件类
 * 实现 ECharts 代码块的语法解析和渲染
 */
export { EChartsPlugin } from './EChartsPlugin'

/**
 * ECharts 渲染器组件
 * 负责将 ECharts 配置渲染为图表
 */
export { default as EChartsRenderer } from './EChartsRenderer'
