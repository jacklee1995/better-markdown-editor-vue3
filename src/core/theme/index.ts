/*! *****************************************************************************
Copyright (c) jcLee95. All rights reserved.
Licensed under the MIT License. See License in the project root for license information.

Author: jcLee95
Email: 291148484@163.com
***************************************************************************** */
/**
 * src/core/theme/index.ts
 * 主题模块
 *
 * 这个模块提供了一组类和接口,用于管理和切换 Markdown 编辑器的主题。
 * 通过这个模块,我们可以方便地为编辑器添加新的主题,或者在不同的主题之间切换。
 *
 * 模块中的主要类包括:
 * - BaseTheme: 主题基类,定义了主题的基本属性和方法
 * - LightTheme: 浅色主题,继承自 BaseTheme
 * - DarkTheme: 深色主题,继承自 BaseTheme
 * - ThemeManager: 主题管理器,负责加载、注册和切换主题
 * - ThemeLoader: 主题加载器,负责从文件系统或网络加载主题
 * - ThemeRegistry: 主题注册表,负责注册和管理主题实例
 * - ThemeFactory: 主题工厂,负责创建主题实例
 * - ThemeProxy: 主题代理,提供了一个统一的接口来访问主题管理器的功能
 * - ThemeAPI: 主题 API,提供了一组方法来操作主题
 * - ThemeChain: 主题链,允许按顺序应用多个主题
 * - ThemeContext: 主题上下文,提供了一种在组件树中共享主题状态的方式
 * - ThemeEvents: 主题事件,提供了一种在主题变化时触发事件的机制
 *
 * 模块中还导出了一些重要的接口和类型:
 * - ThemeOptions: 主题选项接口,定义了创建主题实例时可以传递的选项
 * - ThemeContextProps: 主题上下文属性接口,定义了主题上下文中包含的属性
 * - ThemeEventType: 主题事件类型,定义了可以触发的主题事件类型
 * - ThemeEventHandler: 主题事件处理器,定义了主题事件的处理函数签名
 *
 * 通过这些类和接口,我们可以方便地管理和切换编辑器的主题,实现自定义的主题效果。
 *
 * @module
 */
/**
 * 主题基类
 * 定义了主题的基本属性和方法
 */
export {
  BaseTheme,
  isTheme,
  getThemeName,
  getThemeStyle,
  setThemeStyle,
  getThemeMarkdownOptions,
  setThemeMarkdownOptions,
} from './BaseTheme'
export type { ThemeOptions } from './BaseTheme'

/**
 * 浅色主题
 * 继承自 BaseTheme
 */
export { LightTheme } from './LightTheme'

/**
 * 深色主题
 * 继承自 BaseTheme
 */
export { DarkTheme } from './DarkTheme'

/**
 * 主题管理器
 * 负责加载、注册和切换主题
 */
export { ThemeManager } from './ThemeManager'

/**
 * 主题加载器
 * 负责从文件系统或网络加载主题
 */
export { ThemeLoader } from './ThemeLoader'

/**
 * 主题注册表
 * 负责注册和管理主题实例
 */
export { ThemeRegistry } from './ThemeRegistry'

/**
 * 主题工厂
 * 负责创建主题实例
 */
export { ThemeFactory } from './ThemeFactory'

/**
 * 主题代理
 * 提供了一个统一的接口来访问主题管理器的功能
 */
export { ThemeProxy } from './ThemeProxy'

/**
 * 主题 API
 * 提供了一组方法来操作主题
 */
export { ThemeAPI } from './ThemeAPI'

/**
 * 主题链
 * 允许按顺序应用多个主题
 */
export { ThemeChain } from './ThemeChain'

/**
 * 主题上下文
 * 提供了一种在组件树中共享主题状态的方式
 */
export {
  provideThemeContext,
  injectThemeContext,
  useThemeContext,
  createThemeContext,
} from './ThemeContext'
export type { ThemeContextProps } from './ThemeContext'

/**
 * 主题事件
 * 提供了一种在主题变化时触发事件的机制
 */
export { ThemeEvents } from './ThemeEvents'
export type { ThemeEventType, ThemeEventHandler } from './ThemeEvents'

/**
 * 设置主题
 * @param theme 要设置的主题
 */
export function setTheme(theme: BaseTheme): void {
  const themeProxy = new ThemeProxy()
  themeProxy.setCurrentTheme(theme)
  themeProxy.applyTheme()
}
