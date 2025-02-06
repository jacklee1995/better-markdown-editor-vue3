/* eslint-disable @typescript-eslint/no-unused-vars */
// Markdown 工具函数

import type { Token } from './interface'

/**
 * Markdown 工具类
 * 提供常用的字符串处理和 Token 操作方法
 */
export class MarkdownUtils {
  static extractHeaders(tokens: Token[]): Token[] {
    throw new Error('Method not implemented.')
  }
  /**
   * 将字符串转换为 slug
   * @param str 输入字符串
   * @returns 转换后的 slug
   */
  public static slugify(str: string): string {
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  /**
   * 反转义 HTML 实体
   * @param str 输入字符串
   * @returns 反转义后的字符串
   */
  public static unescapeAll(str: string): string {
    return str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
  }

  /**
   * 转义 HTML 字符
   * @param str 输入字符串
   * @returns 转义后的字符串
   */
  public static escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  /**
   * 检查字符串是否为空白
   * @param str 输入字符串
   * @returns 是否为空白
   */
  public static isBlank(str: string): boolean {
    return /^\s*$/.test(str)
  }

  /**
   * 替换 HTML 实体
   * @param str 输入字符串
   * @returns 替换后的字符串
   */
  public static replaceEntities(str: string): string {
    return str
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
  }

  /**
   * 清理并验证 URL
   * @param sanitize URL 清理函数
   * @param base 基础 URL
   * @param href 输入 URL
   * @returns 清理后的 URL
   */
  public static cleanUrl(sanitize: (url: string) => string, base: string, href: string): string {
    if (href.startsWith('javascript:')) {
      return ''
    }
    const cleanUrl = sanitize(href)
    if (cleanUrl.startsWith('http:') || cleanUrl.startsWith('https:')) {
      return cleanUrl
    }
    return new URL(href, base).toString()
  }

  /**
   * 提取脚注
   * @param tokens Token 数组
   * @returns 包含脚注和新 Token 数组的对象
   */
  public static extractFootnotes(tokens: Token[]): {
    footnotes: Record<string, Token>
    tokens: Token[]
  } {
    const footnotes: Record<string, Token> = {}
    const newTokens: Token[] = []

    for (const token of tokens) {
      if (token.type === 'footnote_start') {
        const label = token.attrGet('label') ?? ''
        const footnoteTokens: Token[] = []
        let i = tokens.indexOf(token) + 1
        while (i < tokens.length) {
          const t = tokens[i]
          if (t.type === 'footnote_end') {
            break
          }
          footnoteTokens.push(t)
          i++
        }
        footnotes[label] = {
          type: 'footnote',
          raw: '',
          text: '',
          block: true,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: footnoteTokens,
          map: token.map,
        }
      } else {
        newTokens.push(token)
      }
    }

    return { footnotes, tokens: newTokens }
  }

  /**
   * 提取目录
   * @param tokens Token 数组
   * @returns 包含目录项的 Token 数组
   */
  public static extractToc(tokens: Token[]): Token[] {
    const toc: Token[] = []
    const newTokens: Token[] = []

    for (const token of tokens) {
      if (token.type === 'heading') {
        const level = token.depth
        const text = token.text
        const slug = this.slugify(text)
        toc.push({
          type: 'toc_item',
          raw: '',
          text,
          block: false,
          depth: level,
          attrGet: (name: string) => {
            if (name === 'href') return `#${slug}`
            return null
          },
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: token.map,
        })
        newTokens.push({
          ...token,
          attrJoin: (name: string, value: string) => {
            if (name === 'id') return slug
          },
        })
      } else {
        newTokens.push(token)
      }
    }

    return [
      {
        type: 'toc',
        raw: '',
        text: '',
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: toc,
        map: [0, 0],
      },
      ...newTokens,
    ]
  }

  /**
   * 高亮代码
   * @param code 代码字符串
   * @param lang 语言
   * @returns 高亮后的代码字符串
   */
  public static highlightCode(code: string, lang: string): string {
    // TODO: implement code highlighting
    return code
  }

  /**
   * 包装表格
   * @param header 表头 HTML
   * @param body 表体 HTML
   * @returns 完整的表格 HTML
   */
  public static wrapTable(header: string, body: string): string {
    return `<table>\n<thead>\n${header}</thead>\n<tbody>\n${body}</tbody>\n</table>\n`
  }

  /**
   * 解析表格行
   * @param content 行内容
   * @returns 单元格数组
   */
  public static parseTableRow(content: string): string[] {
    const cells: string[] = []
    let start = 0
    let end = 0
    while (end < content.length) {
      if (content[end] === '|' && content[end - 1] !== '\\') {
        cells.push(content.slice(start, end).trim())
        start = end + 1
      }
      end++
    }
    cells.push(content.slice(start).trim())
    return cells
  }

  /**
   * 解析表格对齐方式
   * @param content 对齐内容
   * @returns 对齐方式数组
   */
  public static parseTableAlign(content: string): ('left' | 'center' | 'right' | null)[] {
    const aligns: ('left' | 'center' | 'right' | null)[] = []
    const cells = this.parseTableRow(content)
    for (const cell of cells) {
      const trimmed = cell.trim()
      if (trimmed.startsWith(':') && trimmed.endsWith(':')) {
        aligns.push('center')
      } else if (trimmed.startsWith(':')) {
        aligns.push('left')
      } else if (trimmed.endsWith(':')) {
        aligns.push('right')
      } else {
        aligns.push(null)
      }
    }
    return aligns
  }

  /**
   * 解析表格单元格
   * @param content 单元格内容
   * @returns 解析后的单元格内容
   */
  public static parseTableCell(content: string): string {
    return content.replace(/\\\|/g, '|').trim()
  }
}
