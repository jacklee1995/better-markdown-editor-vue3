/* eslint-disable @typescript-eslint/no-unused-vars */
// Markdown文本写入器
// src/core/markdown/MarkdownTextWriter.ts

import type { MarkdownParserOptions, Renderer, Token } from './interface'
import type { TableCell } from '../plugin/plugins/table/TableCell'

/**
 * Markdown 文本写入器类
 * 负责将 Token 数组渲染为纯文本格式的 Markdown
 */
export class MarkdownTextWriter implements Renderer {
  private options: MarkdownParserOptions

  /**
   * 构造函数
   * @param options Markdown 解析选项
   */
  constructor(options: MarkdownParserOptions) {
    this.options = options
  }

  /**
   * 渲染 Token 数组为纯文本格式的 Markdown
   * @param tokens Token 数组
   * @param options 解析选项
   * @param env 环境变量
   * @returns 渲染后的 Markdown 文本
   */
  public render(
    tokens: Token[],
    options: MarkdownParserOptions,
    env: Record<string, unknown>,
  ): string {
    let result = ''
    for (let i = 0; i < tokens.length; i++) {
      result += this.renderToken(tokens, i, options)
    }
    return result
  }

  /**
   * 渲染内联 Token 数组为纯文本格式的 Markdown
   * @param tokens Token 数组
   * @param options 解析选项
   * @param env 环境变量
   * @returns 渲染后的 Markdown 文本
   */
  public renderInline(
    tokens: Token[],
    options: MarkdownParserOptions,
    env: Record<string, unknown>,
  ): string {
    let result = ''
    for (let i = 0; i < tokens.length; i++) {
      result += this.renderToken(tokens, i, options)
    }
    return result
  }

  /**
   * 渲染单个 Token 为纯文本格式的 Markdown
   * @param tokens Token 数组
   * @param idx 当前 Token 的索引
   * @param options 解析选项
   * @returns 渲染后的 Markdown 文本
   */
  public renderToken(tokens: Token[], idx: number, options: MarkdownParserOptions): string {
    const token = tokens[idx]
    const renderer = this.options.renderer

    switch (token.type) {
      case 'heading': {
        const level = token.depth
        const text = this.renderInline(token.children ?? [], options, {})
        return `${'#'.repeat(level)} ${text}\n\n`
      }

      case 'paragraph': {
        const text = this.renderInline(token.children ?? [], options, {})
        return `${text}\n\n`
      }

      case 'text': {
        return token.text
      }

      case 'strong': {
        const text = this.renderInline(token.children ?? [], options, {})
        return `**${text}**`
      }

      case 'em': {
        const text = this.renderInline(token.children ?? [], options, {})
        return `*${text}*`
      }

      case 'codespan': {
        return `\`${token.text}\``
      }

      case 'br': {
        return '  \n'
      }

      case 'del': {
        const text = this.renderInline(token.children ?? [], options, {})
        return `~~${text}~~`
      }

      case 'link': {
        const href = token.attrGet('href') ?? ''
        const title = token.attrGet('title') ?? ''
        const text = this.renderInline(token.children ?? [], options, {})
        if (title) {
          return `[${text}](${href} "${title}")`
        } else {
          return `[${text}](${href})`
        }
      }

      case 'image': {
        const src = token.attrGet('src') ?? ''
        const alt = token.attrGet('alt') ?? ''
        const title = token.attrGet('title') ?? ''
        if (title) {
          return `![${alt}](${src} "${title}")`
        } else {
          return `![${alt}](${src})`
        }
      }

      case 'code': {
        const code = token.text
        const lang = token.attrGet('lang') ?? ''
        return `\`\`\`${lang}\n${code}\n\`\`\`\n\n`
      }

      case 'blockquote': {
        const text = this.render(token.children ?? [], options, {})
        return text
          .split('\n')
          .map((line) => `> ${line}`)
          .join('\n')
      }

      case 'hr': {
        return '---\n\n'
      }

      case 'list': {
        const ordered = token.ordered
        const start = token.start ?? 1
        const body = token.children
          ?.map((item, index) => {
            const bullet = ordered ? `${start + index}.` : '-'
            return `${bullet} ${this.renderInline(item.children ?? [], options, {})}`
          })
          .join('\n')
        return `${body}\n\n`
      }

      case 'list_item': {
        const text = this.renderInline(token.children ?? [], options, {})
        return text
      }

      case 'html': {
        return token.text
      }

      case 'table': {
        const header = token.header ?? []
        const align = token.align ?? []
        const cells = token.cells ?? []
        let result = ''

        // 渲染表头
        result += '|'
        header.forEach((cell: string) => {
          result += ` ${cell} |`
        })
        result += '\n'

        // 渲染表格对齐方式
        result += '|'
        align.forEach((a: 'center' | 'left' | 'right' | null) => {
          if (a === 'center') {
            result += ':--:'
          } else if (a === 'left') {
            result += ':--'
          } else if (a === 'right') {
            result += '--:'
          } else {
            result += '---'
          }
          result += '|'
        })
        result += '\n'

        // 渲染表格内容
        cells.forEach((row: TableCell[]) => {
          result += '|'
          row.forEach((cell: TableCell) => {
            result += ` ${cell.text} |`
          })
          result += '\n'
        })

        return result + '\n'
      }

      case 'footnote': {
        const id = token.attrGet('id') ?? ''
        const text = this.renderInline(token.children ?? [], options, {})
        return `[^${id}]: ${text}\n\n`
      }

      case 'math': {
        const text = token.text
        const displayMode = token.displayMode ?? false
        if (displayMode) {
          return `$$\n${text}\n$$\n\n`
        } else {
          return `$${text}$`
        }
      }

      case 'mermaid': {
        const code = token.text
        return `\`\`\`mermaid\n${code}\n\`\`\`\n\n`
      }

      case 'toc': {
        const title = token.attrGet('title') ?? 'Table of Contents'
        return `@[toc](${title})\n\n`
      }

      case 'container': {
        const type = token.attrGet('type') ?? 'info'
        const title = token.attrGet('title') ?? ''
        const text = this.render(token.children ?? [], options, {})
        return `:::${type} ${title}\n${text}\n:::\n\n`
      }

      case 'echarts': {
        const code = token.text
        return `\`\`\`echarts\n${code}\n\`\`\`\n\n`
      }

      default: {
        console.warn(`Token type "${token.type}" not supported yet.`)
        return ''
      }
    }
  }
}
