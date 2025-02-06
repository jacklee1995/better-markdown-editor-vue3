// Markdown序列化器
// src/core/markdown/MarkdownSerializer.ts

import type { MarkdownParserOptions, Token } from './interface'

/**
 * Markdown 序列化器类
 * 负责将 Token 数组序列化为 Markdown 字符串
 */
export class MarkdownSerializer {
  private options: MarkdownParserOptions

  /**
   * 构造函数
   * @param options Markdown 解析选项
   */
  constructor(options: MarkdownParserOptions) {
    this.options = options
  }

  /**
   * 序列化 Token 数组为 Markdown 字符串
   * @param tokens Token 数组
   * @returns 序列化后的 Markdown 字符串
   */
  public serialize(tokens: Token[]): string {
    let result = ''
    for (const token of tokens) {
      result += this.serializeToken(token)
    }
    return result
  }

  /**
   * 序列化单个 Token 为 Markdown 字符串
   * @param token Token 对象
   * @returns 序列化后的 Markdown 字符串
   */
  private serializeToken(token: Token): string {
    switch (token.type) {
      case 'heading': {
        const level = token.depth
        const text = this.serializeInline(token.children ?? [])
        return `${'#'.repeat(level)} ${text}\n\n`
      }

      case 'paragraph': {
        const text = this.serializeInline(token.children ?? [])
        return `${text}\n\n`
      }

      case 'text': {
        return token.text
      }

      case 'strong': {
        const text = this.serializeInline(token.children ?? [])
        return `**${text}**`
      }

      case 'em': {
        const text = this.serializeInline(token.children ?? [])
        return `*${text}*`
      }

      case 'codespan': {
        return `\`${token.text}\``
      }

      case 'br': {
        return '  \n'
      }

      case 'del': {
        const text = this.serializeInline(token.children ?? [])
        return `~~${text}~~`
      }

      case 'link': {
        const href = token.attrGet('href') ?? ''
        const title = token.attrGet('title') ?? ''
        const text = this.serializeInline(token.children ?? [])
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
        return '```' + lang + '\n' + code + '\n```\n\n'
      }

      case 'blockquote': {
        const text = this.serialize(token.children ?? [])
        return (
          text
            .split('\n')
            .map((line) => `> ${line}`)
            .join('\n') + '\n\n'
        )
      }

      case 'hr': {
        return '---\n\n'
      }

      case 'list': {
        const ordered = token.ordered ?? false
        let bulletStart = token.start ?? 1
        const body = token.children
          ?.map((item) => {
            const bullet = ordered ? `${bulletStart++}.` : '-'
            return `${bullet} ${this.serialize(item.children ?? []).trimEnd()}`
          })
          .join('\n')
        return body + '\n\n'
      }

      case 'list_item': {
        const text = this.serialize(token.children ?? [])
        return text
      }

      case 'html': {
        return token.text
      }

      default: {
        console.warn(`Token type "${token.type}" not supported yet.`)
        return ''
      }
    }
  }

  /**
   * 序列化内联 Token 数组为 Markdown 字符串
   * @param tokens Token 数组
   * @returns 序列化后的 Markdown 字符串
   */
  private serializeInline(tokens: Token[]): string {
    let result = ''
    for (const token of tokens) {
      switch (token.type) {
        case 'text': {
          result += token.text
          break
        }
        case 'strong': {
          result += `**${this.serializeInline(token.children ?? [])}**`
          break
        }
        case 'em': {
          result += `*${this.serializeInline(token.children ?? [])}*`
          break
        }
        case 'codespan': {
          result += `\`${token.text}\``
          break
        }
        case 'br': {
          result += '  \n'
          break
        }
        case 'del': {
          result += `~~${this.serializeInline(token.children ?? [])}~~`
          break
        }
        case 'link': {
          const href = token.attrGet('href') ?? ''
          const title = token.attrGet('title') ?? ''
          const text = this.serializeInline(token.children ?? [])
          if (title) {
            result += `[${text}](${href} "${title}")`
          } else {
            result += `[${text}](${href})`
          }
          break
        }
        case 'image': {
          const src = token.attrGet('src') ?? ''
          const alt = token.attrGet('alt') ?? ''
          const title = token.attrGet('title') ?? ''
          if (title) {
            result += `![${alt}](${src} "${title}")`
          } else {
            result += `![${alt}](${src})`
          }
          break
        }
        default: {
          console.warn(`Inline token type "${token.type}" not supported yet.`)
        }
      }
    }
    return result
  }
}
