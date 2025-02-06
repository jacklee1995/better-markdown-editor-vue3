/*! *****************************************************************************
Copyright (c) jcLee95. All rights reserved.
Licensed under the MIT License. See License in the project root for license information.

Author: jcLee95
Email: 291148484@163.com
***************************************************************************** */

/**
 * src/core/editor/index.ts
 * 编辑器模块
 *
 * 这个模块提供了一个基于Monaco Editor的Markdown编辑器组件,以及一些辅助类和接口。
 *
 * 编辑器组件(`Editor`)是整个编辑器的核心,它基于Monaco Editor实现,提供了一些额外的功能和配置项。
 *
 * 编辑器状态类(`EditorState`)用于管理编辑器的各种状态,如光标位置、选区、滚动位置、历史记录等。
 *
 * 编辑器命令类(`EditorCommand`)提供了一些常用的编辑器命令,如加粗、插入链接、插入图片等。
 *
 * 编辑器快捷键类(`EditorShortcut`)用于配置编辑器的快捷键。
 *
 * 编辑器按键映射类(`EditorKeymap`)用于配置编辑器的按键映射。
 *
 * 编辑器输入处理类(`EditorInputHandler`)用于处理编辑器的输入事件,如自动补全、建议等。
 *
 * 编辑器拖拽处理类(`EditorDropHandler`)用于处理编辑器的拖拽事件,如插入图片、附件等。
 *
 * 编辑器粘贴处理类(`EditorPasteHandler`)用于处理编辑器的粘贴事件,如粘贴图片、HTML等。
 *
 * 编辑器选项接口(`EditorOptions`)定义了编辑器的各种配置项。
 *
 * 编辑器引用接口(`EditorRef`)定义了编辑器组件的引用类型。
 *
 * 编辑器命令接口(`EditorCommand`)定义了编辑器命令的类型。
 *
 * @module
 */

/**
 * 编辑器组件
 * 基于Monaco Editor实现的Markdown编辑器
 */
export { default as Editor } from './Editor'

/**
 * 编辑器状态管理类
 * 管理编辑器的各种状态,如光标位置、选区、滚动位置、历史记录等
 */
export { EditorState } from './EditorState'

/**
 * 编辑器命令类
 * 提供一些常用的编辑器命令,如加粗、插入链接、插入图片等
 */
export { EditorCommand } from './EditorCommand'

/**
 * 编辑器快捷键类
 * 配置编辑器的快捷键
 */
export { EditorShortcut } from './EditorShortcut'

/**
 * 编辑器按键映射类
 * 配置编辑器的按键映射
 */
export { EditorKeymap } from './EditorKeymap'

/**
 * 编辑器输入处理类
 * 处理编辑器的输入事件,如自动补全、建议等
 */
export { EditorInputHandler } from './EditorInputHandler'

/**
 * 编辑器拖拽处理类
 * 处理编辑器的拖拽事件,如插入图片、附件等
 */
export { EditorDropHandler } from './EditorDropHandler'

/**
 * 编辑器粘贴处理类
 * 处理编辑器的粘贴事件,如粘贴图片、HTML等
 */
export { EditorPasteHandler } from './EditorPasteHandler'

/**
 * 编辑器配置解析函数
 * 解析编辑器的配置项,返回完整的配置对象
 */
export { resolveEditorConfig } from './EditorConfig'

/**
 * 默认的编辑器配置
 */
export { defaultEditorConfig } from './EditorConfig'

/**
 * 导出编辑器选项接口
 */
export type { EditorOptions } from './interface'

/**
 * 导出编辑器引用接口
 */
export type { EditorRef } from './interface'

/**
 * 导出编辑器命令接口
 */
export type { EditorCommand as IEditorCommand } from './interface'
