// src/core/markdown/interface.ts

import { TableCell } from '../plugin/plugins/table/TableCell'

export interface MarkdownParserOptions {
  /**
   * 是否启用 GitHub Flavored Markdown 扩展
   */
  gfm?: boolean

  /**
   * 是否启用表格扩展
   */
  tables?: boolean

  /**
   * 是否启用删除线扩展
   */
  breaks?: boolean

  /**
   * 是否启用智能标点
   */
  smartypants?: boolean

  /**
   * 是否启用自动链接
   */
  autolink?: boolean

  /**
   * 是否启用emoji替换
   */
  emoji?: boolean

  /**
   * 自定义渲染器
   */
  renderer?: MarkdownRenderer

  /**
   * 是否启用pedantic模式
   */
  pedantic?: boolean

  /**
   * 自定义语法扩展
   */
  extensions?: MarkdownExtension[]
}

export interface MarkdownRenderer {
  /**
   * 渲染代码块
   * @param code 代码内容
   * @param lang 代码语言
   */
  code?: (code: string, lang: string) => string

  /**
   * 渲染分隔线
   */
  hr?: () => string

  /**
   * 渲染标题
   * @param text 标题文本
   * @param level 标题级别,取值1-6
   */
  heading?: (text: string, level: number) => string

  /**
   * 渲染链接
   * @param href 链接地址
   * @param title 链接标题
   * @param text 链接文本
   */
  link?: (href: string, title: string, text: string) => string

  /**
   * 渲染图片
   * @param href 图片地址
   * @param title 图片标题
   * @param text 图片替代文本
   */
  image?: (href: string, title: string, text: string) => string

  /**
   * 渲染强调
   * @param text 文本内容
   */
  strong?: (text: string) => string

  /**
   * 渲染斜体
   * @param text 文本内容
   */
  em?: (text: string) => string

  /**
   * 渲染删除线
   * @param text 文本内容
   */
  del?: (text: string) => string

  /**
   * 渲染行内代码
   * @param code 代码内容
   */
  codespan?: (code: string) => string

  /**
   * 渲染段落
   * @param text 段落文本
   */
  paragraph?: (text: string) => string

  /**
   * 渲染文本
   * @param text 文本内容
   */
  text?: (text: string) => string

  /**
   * 渲染表格
   * @param header 表头
   * @param body 表格主体
   */
  table?: (header: string, body: string) => string

  /**
   * 渲染表格行
   * @param content 行内容
   */
  tablerow?: (content: string) => string

  /**
   * 渲染表格单元格
   * @param content 单元格内容
   * @param flags 单元格标志
   */
  tablecell?: (
    content: string,
    flags: {
      header: boolean
      align: 'center' | 'left' | 'right' | null
    },
  ) => string

  /**
   * 渲染引用块
   * @param quote 引用内容
   */
  blockquote?: (quote: string) => string

  /**
   * 渲染列表
   * @param body 列表项
   * @param ordered 是否为有序列表
   * @param start 有序列表的起始编号
   */
  list?: (body: string, ordered: boolean, start?: number) => string

  /**
   * 渲染列表项
   * @param text 列表项文本
   */
  listitem?: (text: string) => string

  /**
   * 渲染checkbox
   * @param checked 是否选中
   */
  checkbox?: (checked: boolean) => string

  /**
   * 渲染html
   * @param html html内容
   */
  html?: (html: string) => string

  /**
   * 渲染换行符
   */
  br?: () => string
}

export interface MarkdownExtension {
  /**
   * 扩展名称
   */
  name: string

  /**
   * 扩展级别
   */
  level: 'block' | 'inline' | 'core'

  /**
   * 启动扩展
   */
  start?: (src: string) => void

  /**
   * 扩展token化方法
   * @param src 源码
   */
  tokenizer?: (src: string) => Token[]

  /**
   * 扩展渲染方法
   * @param tokens token列表
   * @param idx token索引
   * @param options 选项
   * @param env 环境
   * @param self 渲染器自身
   */
  renderer?: TokenRender
}

export interface Token {
  /**
   * token类型
   */
  type: string

  /**
   * token原始内容
   */
  raw: string

  /**
   * token文本内容
   */
  text: string

  /**
   * 是否以换行符结尾
   */
  block: boolean

  /**
   * token深度
   */
  depth: number

  /**
   * token属性
   */
  attrGet: (name: string) => string | null
  attrSet: (name: string, value: string) => void
  attrJoin: (name: string, value: string) => void

  /**
   * 子token列表
   */
  children: Token[]

  /**
   * token映射
   */
  map: [number, number]

  /**
   * 是否为有序列表(仅用于list类型的token)
   */
  ordered?: boolean

  /**
   * 有序列表的起始编号(仅用于list类型的token)
   */
  start?: number

  /**
   * 是否为display模式(仅用于math类型的token)
   */
  displayMode?: boolean

  /**
   * 表格头部(仅用于table类型的token)
   */
  header?: string[]

  /**
   * 表格对齐方式(仅用于table类型的token)
   */
  align?: ('left' | 'center' | 'right' | null)[]

  /**
   * 表格单元格(仅用于table类型的token)
   */
  cells?: TableCell[][]
}

export type TokenRender = (
  tokens: Token[],
  idx: number,
  options: MarkdownParserOptions,
  env: Record<string, unknown>,
  self: Renderer,
) => string

export interface Renderer {
  render: (tokens: Token[], options: MarkdownParserOptions, env: Record<string, unknown>) => string
  renderInline: (
    tokens: Token[],
    options: MarkdownParserOptions,
    env: Record<string, unknown>,
  ) => string
  renderToken: (tokens: Token[], idx: number, options: MarkdownParserOptions) => string
}
