// src/core/editor/interface.ts

import type { MarkdownParserOptions } from '../markdown/interface'
import * as Monaco from 'monaco-editor'

export interface EditorOptions {
  /**
   * 编辑器初始值
   */
  value?: string

  /**
   * 编辑器初始语言
   */
  language?: string

  /**
   * 编辑器占位符
   */
  placeholder?: string

  /**
   * 是否只读
   */
  readonly?: boolean

  /**
   * 是否自动聚焦
   */
  autofocus?: boolean

  /**
   * 是否显示行号
   */
  lineNumbers?: boolean

  /**
   * 是否自动换行
   */
  lineWrapping?: boolean

  /**
   * 编辑器主题
   */
  theme?: string

  /**
   * 编辑器样式
   */
  style?: Partial<CSSStyleDeclaration>

  /**
   * 编辑器类名
   */
  className?: string

  /**
   * Monaco编辑器配置项
   */
  monaco?: Record<string, unknown>

  /**
   * Markdown解析器配置项
   */
  markdown?: MarkdownParserOptions
}

export interface EditorProps extends EditorOptions {
  /**
   * 编辑器值变化事件
   */
  onChange?: (value: string) => void

  /**
   * 编辑器聚焦事件
   */
  onFocus?: () => void

  /**
   * 编辑器失焦事件
   */
  onBlur?: () => void

  /**
   * 编辑器滚动事件
   */
  onScroll?: (scrollTop: number) => void

  /**
   * 编辑器按键按下事件
   */
  onKeyDown?: (event: KeyboardEvent) => void

  /**
   * 编辑器按键抬起事件
   */
  onKeyUp?: (event: KeyboardEvent) => void
}

export interface IScrollEvent {
  scrollTop: number
  scrollLeft: number
  scrollWidth: number
  scrollHeight: number
  scrollTopChanged: boolean
  scrollLeftChanged: boolean
  scrollWidthChanged: boolean
  scrollHeightChanged: boolean
}

export interface EditorRef {
  /**
   * 获取编辑器的值
   */
  getValue: () => string

  /**
   * 设置编辑器的值
   * @param value 值
   */
  setValue: (value: string) => void

  /**
   * 获取编辑器的选中文本
   */
  getSelection: () => string | undefined

  /**
   * 替换编辑器的选中文本
   * @param replacement 替换的文本
   */
  replaceSelection: (replacement: string) => void

  /**
   * 聚焦编辑器
   */
  focus: () => void

  /**
   * 失焦编辑器
   */
  blur: () => void

  /**
   * 撤销上一步操作
   */
  undo: () => void

  /**
   * 重做下一步操作
   */
  redo: () => void

  /**
   * 获取编辑器的 DOM 元素
   */
  getElement: () => HTMLElement | null

  /**
   * 获取编辑器的包装 DOM 元素
   */
  getWrapperElement: () => HTMLElement | null

  /**
   * 获取编辑器的内容 DOM 元素
   */
  getContentElement: () => HTMLElement | null

  /**
   * 获取编辑器的装饰 DOM 元素
   */
  getOverflowElement: () => HTMLElement | null

  /**
   * 获取编辑器的滚动 DOM 元素
   */
  getScrollElement: () => HTMLElement | null

  /**
   * 获取编辑器的内容大小
   */
  getContentSize: () => {
    contentHeight: number
    contentWidth: number
  }

  /**
   * 获取编辑器的可见范围
   */
  getVisibleRanges: () => Monaco.Range[]

  /**
   * 获取编辑器的第一个可见行
   */
  getFirstVisibleLine: () => number

  /**
   * 获取编辑器的最后一个可见行
   */
  getLastVisibleLine: () => number

  /**
   * 获取编辑器当前光标位置
   */
  getCursor: () => Monaco.IPosition | null

  /**
   * 设置编辑器当前光标位置
   * @param position 光标位置
   */
  setCursor: (position: Monaco.IPosition) => void

  /**
   * 获取编辑器当前滚动位置
   */
  getScrollInfo: () => Monaco.IScrollEvent

  /**
   * 将位置滚动到视图中
   * @param position 要滚动到的位置
   */
  scrollIntoView: (position: Monaco.Position) => void

  /**
   * 将范围滚动到视图中
   * @param range 要滚动到的范围
   */
  scrollRangeIntoView: (range: Monaco.Range) => void

  /**
   * 滚动到指定位置
   * @param options 滚动选项
   */
  scrollTo: (options: { x?: number; y?: number }) => void

  /**
   * 获取编辑器的当前滚动位置
   */
  getScrollPosition: () => {
    scrollLeft: number
    scrollTop: number
  }

  /**
   * 设置编辑器的滚动位置
   * @param position 要设置的滚动位置
   */
  setScrollPosition: (position: Monaco.editor.INewScrollPosition) => void

  /**
   * 刷新编辑器
   */
  refresh: () => void

  /**
   * 全选编辑器内容
   */
  selectAll: () => void

  /**
   * 选中某行内容
   * @param line 行号
   */
  selectLine: (line: number) => void

  /**
   * 选中某个单词
   * @param position 位置
   */
  selectWord: (position: Monaco.Position) => void

  /**
   * 选中某个单词
   * @param position 位置
   */
  selectWordAt: (position: Monaco.Position) => void

  /**
   * 选中某个标记
   * @param marker 标记
   */
  selectMarker: (marker: Monaco.editor.IMarker) => void

  /**
   * 获取选区起始位置
   */
  getSelectionStart: () => Monaco.IPosition | null

  /**
   * 获取选区结束位置
   */
  getSelectionEnd: () => Monaco.IPosition | null

  /**
   * 获取选区所在行
   */
  getSelectionLine: () => number | null

  /**
   * 获取选区所在行的起始位置
   */
  getSelectionLineStart: () => Monaco.IPosition | null

  /**
   * 获取选区所在行的结束位置
   */
  getSelectionLineEnd: () => Monaco.IPosition | null

  /**
   * 获取编辑器 Monaco 实例
   */
  getMonacoInstance: () => typeof Monaco

  /**
   * 判断选区是否为空
   */
  isSelectionEmpty: () => boolean

  /**
   * 获取编辑器 ITextModel 实例
   */
  getModel: () => Monaco.editor.ITextModel | null

  /**
   * 监听编辑器内容变化事件
   * @param listener 事件监听器
   */
  onDidChangeModelContent: (listener: () => void) => void

  /**
   * 监听光标选区变化事件
   * @param listener 事件监听器
   */
  onDidChangeCursorSelection: (listener: () => void) => void

  /**
   * 监听键盘按键事件
   * @param listener 事件监听器
   */
  onKeyDown: (listener: (e: KeyboardEvent) => void) => void

  /**
   * 监听粘贴事件
   * @param listener 事件监听器
   */
  onPaste: (listener: (e: ClipboardEvent) => void) => void

  /**
   * 取消监听编辑器内容变化事件
   * @param listener 事件监听器
   */
  offDidChangeModelContent: (listener: () => void) => void

  /**
   * 取消监听光标选区变化事件
   * @param listener 事件监听器
   */
  offDidChangeCursorSelection: (listener: () => void) => void

  /**
   * 取消监听键盘按键事件
   * @param listener 事件监听器
   */
  offKeyDown: (listener: (e: KeyboardEvent) => void) => void

  /**
   * 取消监听粘贴事件
   * @param listener 事件监听器
   */
  offPaste: (listener: (e: ClipboardEvent) => void) => void

  /**
   * 设置编辑器选区
   * @param range 选区范围
   */
  setSelection: (range: Monaco.IRange) => void

  /**
   * 获取编辑器选区范围
   */
  getSelectionRange: () => Monaco.Range | null

  /**
   * 获取编辑器选区标记
   */
  getSelectionMarker: () => Monaco.IRange | null

  /**
   * 获取编辑器可见区域高度
   */
  getVisibleHeight: () => number

  /**
   * 获取编辑器可见区域宽度
   */
  getVisibleWidth: () => number

  /**
   * 获取编辑器内容高度
   */
  getContentHeight: () => number

  /**
   * 获取编辑器内容宽度
   */
  getContentWidth: () => number

  /**
   * 获取编辑器滚动高度
   */
  getScrollHeight: () => number

  /**
   * 获取编辑器滚动宽度
   */
  getScrollWidth: () => number

  /**
   * 获取编辑器滚动左侧距离
   */
  getScrollLeft: () => number

  /**
   * 获取编辑器滚动顶部距离
   */
  getScrollTop: () => number
}

export interface EditorCommandFunctions {
  focus: () => void
  blur: () => void
  format: (
    mode: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code' | 'link' | 'image',
  ) => void
  undo: () => void
  redo: () => void
  heading: (level: number) => void
  quote: () => void
  list: (ordered: boolean) => void
  hr: () => void
  table: () => void
  code: () => void
  find: () => void
  replace: () => void
  clear: () => void
  insertEmoji: () => void
  insertMath: () => void
  insertMermaid: () => void
  insertECharts: () => void
  insertToc: () => void
  insertFootnote: () => void
  insertImage: () => void
  insertLink: () => void
  insertHtml: () => void
}

export interface EditorCommand {
  /** 命令名称 */
  name: string
  /** 命令执行方法 */
  execute: (editor: EditorRef) => void
  /** 命令快捷键 */
  keyMap?: string
  /** 命令提示文本 */
  tooltip?: string
}
