/**
 * src/ui/toolbar/index.ts
 * 工具栏模块
 *
 * 这个模块提供了一组工具栏组件,用于构建 Markdown 编辑器的工具栏。
 * 通过组合不同的工具栏组件,可以方便地实现各种常用的编辑功能,例如加粗、斜体、插入链接等。
 *
 * 工具栏组件包括:
 * - `Toolbar`: 工具栏容器组件,用于包裹和管理其他工具栏组件。
 * - `ToolbarButton`: 工具栏按钮组件,用于触发特定的编辑操作。
 * - `ToolbarButtonGroup`: 工具栏按钮组组件,用于将多个按钮组合在一起。
 * - `ToolbarDivider`: 工具栏分隔线组件,用于在工具栏中添加分隔线。
 * - `ToolbarDropdown`: 工具栏下拉菜单组件,用于提供一组相关的操作选项。
 * - `ToolbarInput`: 工具栏输入框组件,用于接受用户输入。
 * - `ToolbarSelect`: 工具栏选择框组件,用于提供一组预设的选项供用户选择。
 * - `ToolbarIcon`: 工具栏图标组件,用于显示图标。
 * - `ToolbarLink`: 工具栏链接组件,用于插入链接。
 * - `ToolbarSeparator`: 工具栏分隔符组件,用于在工具栏中添加分隔符。
 * - `ToolbarText`: 工具栏文本组件,用于显示文本内容。
 * - `ToolbarSlot`: 工具栏插槽组件,用于在工具栏中插入自定义内容。
 *
 * 这些组件可以通过 `Toolbar` 组件的 `items` 属性进行组合和配置,从而实现灵活的工具栏布局和功能。
 *
 * @module
 */

/**
 * 工具栏容器组件
 */
export { default as Toolbar } from './Toolbar'

/**
 * 工具栏按钮组件
 */
export { default as ToolbarButton } from './ToolbarButton'

/**
 * 工具栏按钮组组件
 */
export { default as ToolbarButtonGroup } from './ToolbarButtonGroup'

/**
 * 工具栏分隔线组件
 */
export { default as ToolbarDivider } from './ToolbarDivider'

/**
 * 工具栏下拉菜单组件
 */
export { default as ToolbarDropdown } from './ToolbarDropdown'

/**
 * 工具栏输入框组件
 */
export { default as ToolbarInput } from './ToolbarInput'

/**
 * 工具栏选择框组件
 */
export { default as ToolbarSelect } from './ToolbarSelect'

/**
 * 工具栏图标组件
 */
export { default as ToolbarIcon } from './ToolbarIcon'

/**
 * 工具栏链接组件
 */
export { default as ToolbarLink } from './ToolbarLink'

/**
 * 工具栏分隔符组件
 */
export { default as ToolbarSeparator } from './ToolbarSeparator'

/**
 * 工具栏文本组件
 */
export { default as ToolbarText } from './ToolbarText'

/**
 * 工具栏插槽组件
 */
export { default as ToolbarSlot } from './ToolbarSlot'

/**
 * 导出工具栏项类型
 */
export type { ToolbarItem } from './Toolbar'

/**
 * 导出工具栏按钮属性类型
 */
export type { ToolbarButtonProps } from './ToolbarButton'

/**
 * 导出工具栏按钮组属性类型
 */
export type { ToolbarButtonGroupProps } from './ToolbarButtonGroup'

/**
 * 导出工具栏下拉菜单属性类型
 */
export type { ToolbarDropdownProps } from './ToolbarDropdown'

/**
 * 导出工具栏输入框属性类型
 */
export type { ToolbarInputProps } from './ToolbarInput'

/**
 * 导出工具栏选择框属性类型
 */
export type { ToolbarSelectProps } from './ToolbarSelect'

/**
 * 导出工具栏图标属性类型
 */
export type { ToolbarIconProps } from './ToolbarIcon'

/**
 * 导出工具栏链接属性类型
 */
export type { ToolbarLinkProps } from './ToolbarLink'

/**
 * 导出工具栏文本属性类型
 */
export type { ToolbarTextProps } from './ToolbarText'
