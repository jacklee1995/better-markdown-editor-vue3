// Markdown符号化器

import type { MarkdownParserOptions, Token } from './interface'
import { MarkdownLexer } from './MarkdownLexer'
import type { MarkdownExtension } from './interface'

/**
 * Markdown 符号化器类
 * 负责将 Markdown 文本转换为 Token 列表
 */
export class MarkdownTokenizer {
  private options: MarkdownParserOptions
  private lexer: MarkdownLexer

  /**
   * 构造函数
   * @param options Markdown 解析选项
   */
  constructor(options: MarkdownParserOptions) {
    this.options = options
    this.lexer = new MarkdownLexer(options)
  }

  /**
   * 将 Markdown 文本转换为 Token 列表
   * @param src 要转换的 Markdown 文本
   * @returns 转换后的 Token 列表
   */
  public tokenize(src: string): Token[] {
    this.lexer.start(src)
    let token
    const tokens: Token[] = []
    while ((token = this.lexer.next())) {
      tokens.push(token)
    }
    return tokens
  }

  /**
   * 将段落 Token 的文本内容转换为行内 Token 列表
   * @param tokens 段落 Token 列表
   */
  private tokenizeParagraph(tokens: Token[]): void {
    const token = tokens[tokens.length - 1]
    if (token.type === 'paragraph') {
      token.children = this.tokenizeInline(token.text)
    }
  }

  /**
   * 将行内 Markdown 文本转换为 Token 列表
   * @param src 要转换的行内 Markdown 文本
   * @returns 转换后的 Token 列表
   */
  private tokenizeInline(src: string): Token[] {
    const tokens: Token[] = []
    let pos = 0
    while (pos < src.length) {
      const char = src[pos]
      if (char === '*' || char === '_') {
        const token = this.tokenizeEmphasis(src, pos)
        if (token) {
          tokens.push(token)
          pos += token.raw.length
          continue
        }
      }
      if (char === '`') {
        const token = this.tokenizeCodeSpan(src, pos)
        if (token) {
          tokens.push(token)
          pos += token.raw.length
          continue
        }
      }
      if (char === '[') {
        const token = this.tokenizeLink(src, pos)
        if (token) {
          tokens.push(token)
          pos += token.raw.length
          continue
        }
      }
      if (char === '!') {
        const token = this.tokenizeImage(src, pos)
        if (token) {
          tokens.push(token)
          pos += token.raw.length
          continue
        }
      }
      const text = this.scanText(src, pos)
      if (text) {
        tokens.push({
          type: 'text',
          raw: text,
          text,
          block: false,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [pos, pos + text.length],
        })
        pos += text.length
        continue
      }
      pos++
    }
    return tokens
  }

  /**
   * 将强调 Markdown 文本转换为 Token
   * @param src 要转换的 Markdown 文本
   * @param start 开始位置
   * @returns 转换后的 Token,如果不是有效的强调文本则返回 undefined
   */
  private tokenizeEmphasis(src: string, start: number): Token | undefined {
    const char = src[start]
    const isAsterisk = char === '*'
    const isSingle = src[start + 1] !== char
    const type = isSingle ? (isAsterisk ? 'em' : 'strong') : isAsterisk ? 'strong' : 'em'
    let pos = start + 1
    while (pos < src.length && src[pos] === char) {
      pos++
    }
    const end = pos
    if (end === start + 1) {
      return
    }
    if (src[end] !== char) {
      return
    }
    const raw = src.slice(start, end + 1)
    const text = src.slice(start + 1, end)
    return {
      type,
      raw,
      text,
      block: false,
      depth: 0,
      attrGet: () => null,
      attrSet: () => {},
      attrJoin: () => {},
      children: this.tokenizeInline(text),
      map: [start, end + 1],
    }
  }

  /**
   * 将行内代码 Markdown 文本转换为 Token
   * @param src 要转换的 Markdown 文本
   * @param start 开始位置
   * @returns 转换后的 Token,如果不是有效的行内代码文本则返回 undefined
   */
  private tokenizeCodeSpan(src: string, start: number): Token | undefined {
    let pos = start
    let found = false
    while (pos < src.length) {
      if (src[pos] === '`') {
        found = true
        break
      }
      pos++
    }
    if (!found) {
      return
    }
    const raw = src.slice(start, pos + 1)
    const text = src.slice(start + 1, pos)
    return {
      type: 'codespan',
      raw,
      text,
      block: false,
      depth: 0,
      attrGet: () => null,
      attrSet: () => {},
      attrJoin: () => {},
      children: [],
      map: [start, pos + 1],
    }
  }

  /**
   * 将链接 Markdown 文本转换为 Token
   * @param src 要转换的 Markdown 文本
   * @param start 开始位置
   * @returns 转换后的 Token,如果不是有效的链接文本则返回 undefined
   */
  private tokenizeLink(src: string, start: number): Token | undefined {
    let pos = start + 1
    let text = ''
    let href = ''
    let title = ''
    while (pos < src.length && src[pos] !== ']') {
      text += src[pos]
      pos++
    }
    if (src[pos] !== ']') {
      return
    }
    pos++
    if (src[pos] !== '(') {
      return
    }
    pos++
    while (pos < src.length && src[pos] !== ')') {
      href += src[pos]
      pos++
    }
    if (src[pos] !== ')') {
      return
    }
    pos++
    if (src[pos] === '"') {
      pos++
      while (pos < src.length && src[pos] !== '"') {
        title += src[pos]
        pos++
      }
      if (src[pos] !== '"') {
        return
      }
      pos++
    }
    const raw = src.slice(start, pos)
    return {
      type: 'link',
      raw,
      text,
      block: false,
      depth: 0,
      attrGet: (name: string) => {
        if (name === 'href') return href
        if (name === 'title') return title
        return null
      },
      attrSet: () => {},
      attrJoin: () => {},
      children: this.tokenizeInline(text),
      map: [start, pos],
    }
  }

  /**
   * 将图片 Markdown 文本转换为 Token
   * @param src 要转换的 Markdown 文本
   * @param start 开始位置
   * @returns 转换后的 Token,如果不是有效的图片文本则返回 undefined
   */
  private tokenizeImage(src: string, start: number): Token | undefined {
    let pos = start + 1
    let alt = ''
    let url = ''
    let title = ''
    while (pos < src.length && src[pos] !== ']') {
      alt += src[pos]
      pos++
    }
    if (src[pos] !== ']') {
      return
    }
    pos++
    if (src[pos] !== '(') {
      return
    }
    pos++
    while (pos < src.length && src[pos] !== ')') {
      url += src[pos]
      pos++
    }
    if (src[pos] !== ')') {
      return
    }
    pos++
    if (src[pos] === '"') {
      pos++
      while (pos < src.length && src[pos] !== '"') {
        title += src[pos]
        pos++
      }
      if (src[pos] !== '"') {
        return
      }
      pos++
    }
    const raw = src.slice(start, pos)
    return {
      type: 'image',
      raw,
      text: alt,
      block: false,
      depth: 0,
      attrGet: (name: string) => {
        if (name === 'src') return url
        if (name === 'alt') return alt
        if (name === 'title') return title
        return null
      },
      attrSet: () => {},
      attrJoin: () => {},
      children: [],
      map: [start, pos],
    }
  }

  /**
   * 扫描普通文本
   * @param src 要扫描的 Markdown 文本
   * @param start 开始位置
   * @returns 扫描到的普通文本
   */
  private scanText(src: string, start: number): string {
    let pos = start
    while (pos < src.length) {
      const char = src[pos]
      if (
        char === '*' ||
        char === '_' ||
        char === '`' ||
        char === '[' ||
        char === '!' ||
        char === '<'
      ) {
        break
      }
      pos++
    }
    return src.slice(start, pos)
  }

  /**
   * 使用插件扩展 Markdown 符号化器功能
   * @param extension 要使用的插件
   */
  public use(extension: MarkdownExtension): void {
    if (extension.tokenizer) {
      this.lexer.use({
        name: extension.name,
        level: extension.level,
        tokenizer: extension.tokenizer,
      })
    }
  }
}
