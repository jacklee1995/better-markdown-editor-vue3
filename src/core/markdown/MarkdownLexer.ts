// Markdown词法分析器
// src/core/markdown/MarkdownLexer.ts

import type { MarkdownExtension, MarkdownParserOptions, Token } from './interface'

const CHAR_CODE = {
  SPACE: 32,
  TAB: 9,
  LF: 10, // \n
  CR: 13, // \r
  ASTERISK: 42, // *
  UNDERSCORE: 95, // _
  BACKTICK: 96, // `
  TILDE: 126, // ~
  LESSTHAN: 60, // <
  GREATERTHAN: 62, // >
  EXCLAMATION: 33, // !
  HASH: 35, // #
  DOLLAR: 36, // $
  AMPERSAND: 38, // &
  PARENTHESIS_LEFT: 40, // (
  PARENTHESIS_RIGHT: 41, // )
  BRACKET_LEFT: 91, // [
  BRACKET_RIGHT: 93, // ]
  DASH: 45, // -
  QUOTE: 34, // "
  SLASH: 47, // /
  COLON: 58, // :
  SEMICOLON: 59, // ;
  EQUALS: 61, // =
  QUESTION: 63, // ?
  PIPE: 124, // |
  PLUS: 43, // +
}

/**
 * Markdown 词法分析器类
 * 负责将 Markdown 源码分解为 Token
 */
export class MarkdownLexer {
  private options: MarkdownParserOptions
  private tokens: Token[]
  private tokenTypes: string[]
  private tokenizers: Record<string, (src: string) => boolean>
  private state: Record<string, unknown>
  private src: string
  private pos: number
  private posMax: number

  /**
   * 构造函数
   * @param options Markdown 解析选项
   */
  constructor(options: MarkdownParserOptions) {
    this.options = options
    this.tokens = []
    this.tokenTypes = [
      'space',
      'text',
      'paragraph',
      'heading',
      'code',
      'fences',
      'hr',
      'blockquote',
      'list',
      'list_item',
      'html',
      'def',
      'table',
      'lheading',
      'strong',
      'em',
      'codespan',
      'br',
      'del',
      'ins',
      'link',
      'image',
      'footnote',
    ]
    this.tokenizers = {}
    this.state = {}
    this.src = ''
    this.pos = 0
    this.posMax = 0

    this.initTokenizers()
  }

  /**
   * 初始化 Tokenizer
   */
  private initTokenizers(): void {
    for (const type of this.tokenTypes) {
      const methodName = `tokenize${type.charAt(0).toUpperCase()}${type.slice(1)}`
      if (typeof this[methodName as keyof MarkdownLexer] === 'function') {
        this.tokenizers[type] = (src: string) => {
          this.src = src
          return Boolean((this[methodName as keyof MarkdownLexer] as (src: string) => boolean)(src))
        }
      }
    }
  }

  /**
   * 设置输入源
   * @param src 源码
   */
  public input(src: string): void {
    this.src = src
    this.pos = 0
    this.posMax = src.length
  }

  /**
   * 词法分析
   * @returns Token 数组
   */
  public tokenize(): Token[] {
    return this.lex(this.src)
  }

  /**
   * 执行词法分析
   * @param src 源码
   * @returns Token 数组
   */
  public lex(src: string): Token[] {
    this.src = src
    this.pos = 0
    this.posMax = src.length
    this.tokens = []

    while (this.pos < this.posMax) {
      let matched = false
      for (const type of this.tokenTypes) {
        const tokenizer = this.tokenizers[type]
        if (tokenizer) {
          const result = tokenizer(src.slice(this.pos))
          if (result) {
            matched = true
            break
          }
        }
      }
      if (!matched) {
        this.pos++
      }
    }

    return this.tokens
  }

  /**
   * 处理空白字符
   * @param src 源码
   * @returns 是否匹配
   */
  private tokenizeSpace(src: string): boolean {
    const start = this.pos
    let pos = start

    while (pos < src.length) {
      const code = src.charCodeAt(pos)
      if (code !== CHAR_CODE.SPACE && code !== CHAR_CODE.TAB) {
        break
      }
      pos++
    }

    if (pos > start) {
      this.pos = pos
      this.tokens.push({
        type: 'space',
        raw: src.slice(start, pos),
        text: '',
        block: false,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [start, pos],
      })
      return true
    }
    return false
  }

  private tokenizeText(src: string): boolean {
    const start = this.pos
    let pos = start

    while (pos < src.length) {
      const code = src.charCodeAt(pos)
      if (
        code === CHAR_CODE.LF ||
        code === CHAR_CODE.CR ||
        code === CHAR_CODE.SPACE ||
        code === CHAR_CODE.TAB
      ) {
        break
      }
      pos++
    }

    if (pos > start) {
      this.pos = pos
      this.tokens.push({
        type: 'text',
        raw: src.slice(start, pos),
        text: src.slice(start, pos),
        block: false,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [start, pos],
      })
      return true
    }

    return false
  }

  private tokenizeParagraph(src: string): boolean {
    const start = this.pos
    let pos = start

    while (pos < src.length) {
      const code = src.charCodeAt(pos)
      if (code === CHAR_CODE.LF) {
        pos++
        if (pos < src.length && src.charCodeAt(pos) === CHAR_CODE.LF) {
          break
        }
      } else {
        pos++
      }
    }

    if (pos > start) {
      this.pos = pos
      this.tokens.push({
        type: 'paragraph',
        raw: src.slice(start, pos),
        text: src.slice(start, pos).trim(),
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [start, pos],
      })
      return true
    }

    return false
  }

  private tokenizeHeading(src: string): boolean {
    const start = this.pos
    let pos = start
    let level = 0

    while (pos < src.length && src.charCodeAt(pos) === CHAR_CODE.HASH) {
      level++
      pos++
    }

    if (level > 0 && level <= 6 && /\s/.test(src[pos])) {
      pos++
      while (pos < src.length) {
        const code = src.charCodeAt(pos)
        if (code === CHAR_CODE.LF) {
          break
        }
        pos++
      }

      this.pos = pos
      this.tokens.push({
        type: 'heading',
        raw: src.slice(start, pos),
        text: src.slice(start + level + 1, pos).trim(),
        block: true,
        depth: level,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [start, pos],
      })
      return true
    }

    return false
  }

  private tokenizeCode(src: string): boolean {
    const start = this.pos
    let pos = start

    if (src.charCodeAt(pos) === CHAR_CODE.BACKTICK) {
      pos++
      while (pos < src.length) {
        const code = src.charCodeAt(pos)
        if (code === CHAR_CODE.BACKTICK) {
          break
        }
        pos++
      }

      if (pos < src.length && src.charCodeAt(pos) === CHAR_CODE.BACKTICK) {
        pos++
        this.pos = pos
        this.tokens.push({
          type: 'code',
          raw: src.slice(start, pos),
          text: src.slice(start + 1, pos - 1),
          block: false,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [start, pos],
        })
        return true
      }
    }

    return false
  }

  private tokenizeFences(src: string): boolean {
    const start = this.pos
    let pos = start
    const marker = src.charCodeAt(pos)

    if (marker === CHAR_CODE.TILDE || marker === CHAR_CODE.BACKTICK) {
      pos++
      while (pos < src.length && src.charCodeAt(pos) === marker) {
        pos++
      }

      const fencesLength = pos - start
      if (fencesLength >= 3) {
        const infoStart = pos
        while (pos < src.length) {
          const code = src.charCodeAt(pos)
          if (code === CHAR_CODE.LF || code === CHAR_CODE.CR) {
            break
          }
          pos++
        }

        const info = src.slice(infoStart, pos).trim()
        const codeStart = pos + 1
        while (pos < src.length) {
          const code = src.charCodeAt(pos)
          if (code === marker) {
            const fencesEnd = pos
            pos++
            while (pos < src.length && src.charCodeAt(pos) === marker) {
              pos++
            }
            if (pos - fencesEnd === fencesLength) {
              break
            }
          }
          pos++
        }

        const codeEnd = pos - fencesLength
        if (codeEnd > codeStart) {
          this.pos = pos
          this.tokens.push({
            type: 'fences',
            raw: src.slice(start, pos),
            text: src.slice(codeStart, codeEnd),
            block: true,
            depth: 0,
            attrGet: (name) => (name === 'lang' ? info : null),
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [start, pos],
          })
          return true
        }
      }
    }

    return false
  }

  private tokenizeHr(src: string): boolean {
    const start = this.pos
    let pos = start
    const marker = src.charCodeAt(pos)

    if (
      marker === CHAR_CODE.ASTERISK ||
      marker === CHAR_CODE.DASH ||
      marker === CHAR_CODE.UNDERSCORE
    ) {
      pos++
      while (pos < src.length && src.charCodeAt(pos) === marker) {
        pos++
      }

      if (pos - start >= 3 && (pos === src.length || /\s/.test(src[pos]))) {
        this.pos = pos
        this.tokens.push({
          type: 'hr',
          raw: src.slice(start, pos),
          text: '',
          block: true,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [start, pos],
        })
        return true
      }
    }

    return false
  }

  private tokenizeBlockquote(src: string): boolean {
    const start = this.pos
    let pos = start

    if (src.charCodeAt(pos) === CHAR_CODE.GREATERTHAN) {
      pos++
      while (pos < src.length && /\s/.test(src[pos])) {
        pos++
      }

      const contentStart = pos
      while (pos < src.length) {
        const code = src.charCodeAt(pos)
        if (code === CHAR_CODE.LF) {
          pos++
          if (pos < src.length && src.charCodeAt(pos) !== CHAR_CODE.GREATERTHAN) {
            break
          }
          while (pos < src.length && /\s/.test(src[pos])) {
            pos++
          }
        } else {
          pos++
        }
      }

      const contentEnd = pos
      if (contentEnd > contentStart) {
        this.pos = pos
        this.tokens.push({
          type: 'blockquote',
          raw: src.slice(start, pos),
          text: src.slice(contentStart, contentEnd).trim(),
          block: true,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [start, pos],
        })
        return true
      }
    }

    return false
  }

  private tokenizeList(src: string): boolean {
    const start = this.pos
    let pos = start
    const marker = src.charCodeAt(pos)

    if (marker === CHAR_CODE.ASTERISK || marker === CHAR_CODE.DASH || marker === CHAR_CODE.PLUS) {
      pos++
      while (pos < src.length && /\s/.test(src[pos])) {
        pos++
      }

      const itemStart = pos
      while (pos < src.length) {
        const code = src.charCodeAt(pos)
        if (code === CHAR_CODE.LF) {
          pos++
          if (pos < src.length && /\s/.test(src[pos])) {
            while (pos < src.length && /\s/.test(src[pos])) {
              pos++
            }
            if (src.charCodeAt(pos) === marker) {
              pos++
              while (pos < src.length && /\s/.test(src[pos])) {
                pos++
              }
            } else {
              break
            }
          } else {
            break
          }
        } else {
          pos++
        }
      }

      const itemEnd = pos
      if (itemEnd > itemStart) {
        this.pos = pos
        this.tokens.push({
          type: 'list',
          raw: src.slice(start, pos),
          text: '',
          block: true,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [start, pos],
        })

        const itemText = src.slice(itemStart, itemEnd).trim()
        this.tokens.push({
          type: 'list_item',
          raw: itemText,
          text: itemText,
          block: false,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [itemStart, itemEnd],
        })

        return true
      }
    }

    return false
  }

  private tokenizeHtml(src: string): boolean {
    const start = this.pos
    let pos = start

    if (src.charCodeAt(pos) === CHAR_CODE.LESSTHAN) {
      pos++
      while (pos < src.length) {
        const code = src.charCodeAt(pos)
        if (code === CHAR_CODE.GREATERTHAN) {
          pos++
          break
        }
        pos++
      }

      if (pos > start + 1) {
        this.pos = pos
        this.tokens.push({
          type: 'html',
          raw: src.slice(start, pos),
          text: src.slice(start + 1, pos - 1),
          block: true,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [start, pos],
        })
        return true
      }
    }
    return false
  }

  private tokenizeDef(src: string): boolean {
    const start = this.pos
    let pos = start

    if (src.charCodeAt(pos) === CHAR_CODE.BRACKET_LEFT) {
      pos++
      while (pos < src.length && /\s/.test(src[pos])) {
        pos++
      }
      const labelStart = pos
      while (pos < src.length && src.charCodeAt(pos) !== CHAR_CODE.BRACKET_RIGHT) {
        pos++
      }
      const labelEnd = pos
      if (src.charCodeAt(pos) === CHAR_CODE.BRACKET_RIGHT) {
        pos++
        while (pos < src.length && /\s/.test(src[pos])) {
          pos++
        }
        if (src.charCodeAt(pos) === CHAR_CODE.COLON) {
          pos++
          while (pos < src.length && /\s/.test(src[pos])) {
            pos++
          }
          const hrefStart = pos
          while (pos < src.length && !this.isTerminatorChar(src.charCodeAt(pos))) {
            pos++
          }
          const hrefEnd = pos
          while (pos < src.length && /\s/.test(src[pos])) {
            pos++
          }
          const titleStart = pos
          while (pos < src.length && !this.isTerminatorChar(src.charCodeAt(pos))) {
            pos++
          }
          const titleEnd = pos

          const label = src.slice(labelStart, labelEnd)
          const href = src.slice(hrefStart, hrefEnd)
          const title = src.slice(titleStart, titleEnd)

          this.pos = pos
          this.tokens.push({
            type: 'def',
            raw: src.slice(start, pos),
            text: '',
            block: true,
            depth: 0,
            attrGet: (name: string) => {
              if (name === 'label') return label
              if (name === 'href') return href
              if (name === 'title') return title
              return null
            },
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [start, pos],
          })
          return true
        }
      }
    }
    return false
  }

  private tokenizeTable(src: string): boolean {
    // TODO: implement table tokenizer
    console.warn(`Table tokenizer is not implemented yet.\n src: ${src}`)
    return false
  }

  private tokenizeLheading(src: string): boolean {
    const start = this.pos
    let pos = start

    let level = 0
    while (pos < src.length && src.charCodeAt(pos) === CHAR_CODE.EQUALS) {
      level++
      pos++
    }
    if (level > 0 && level <= 6) {
      while (pos < src.length && /\s/.test(src[pos])) {
        pos++
      }
      const textStart = pos
      while (pos < src.length && !this.isTerminatorChar(src.charCodeAt(pos))) {
        pos++
      }
      const textEnd = pos

      const text = src.slice(textStart, textEnd)

      this.pos = pos
      this.tokens.push({
        type: 'heading',
        raw: src.slice(start, pos),
        text,
        depth: level,
        block: true,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [start, pos],
      })
      return true
    }
    return false
  }

  private tokenizeStrong(src: string): boolean {
    const start = this.pos
    let pos = start

    if (
      src.charCodeAt(pos) === CHAR_CODE.ASTERISK &&
      src.charCodeAt(pos + 1) === CHAR_CODE.ASTERISK
    ) {
      pos += 2
      const textStart = pos
      while (pos < src.length) {
        if (
          src.charCodeAt(pos) === CHAR_CODE.ASTERISK &&
          src.charCodeAt(pos + 1) === CHAR_CODE.ASTERISK
        ) {
          pos += 2
          break
        }
        pos++
      }
      const textEnd = pos - 2

      if (textEnd > textStart) {
        const text = src.slice(textStart, textEnd)
        this.pos = pos
        this.tokens.push({
          type: 'strong',
          raw: src.slice(start, pos),
          text,
          block: false,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [start, pos],
        })
        return true
      }
    }
    return false
  }

  private tokenizeEm(src: string): boolean {
    const start = this.pos
    let pos = start

    if (src.charCodeAt(pos) === CHAR_CODE.ASTERISK) {
      pos++
      const textStart = pos
      while (pos < src.length) {
        if (src.charCodeAt(pos) === CHAR_CODE.ASTERISK) {
          pos++
          break
        }
        pos++
      }
      const textEnd = pos - 1

      if (textEnd > textStart) {
        const text = src.slice(textStart, textEnd)
        this.pos = pos
        this.tokens.push({
          type: 'em',
          raw: src.slice(start, pos),
          text,
          block: false,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [start, pos],
        })
        return true
      }
    }
    return false
  }

  private tokenizeCodespan(src: string): boolean {
    const start = this.pos
    let pos = start

    if (src.charCodeAt(pos) === CHAR_CODE.BACKTICK) {
      pos++
      const textStart = pos
      while (pos < src.length) {
        if (src.charCodeAt(pos) === CHAR_CODE.BACKTICK) {
          pos++
          break
        }
        pos++
      }
      const textEnd = pos - 1

      if (textEnd > textStart) {
        const text = src.slice(textStart, textEnd)
        this.pos = pos
        this.tokens.push({
          type: 'codespan',
          raw: src.slice(start, pos),
          text,
          block: false,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [start, pos],
        })
        return true
      }
    }
    return false
  }

  private tokenizeBr(src: string): boolean {
    const start = this.pos
    let pos = start

    if (
      src.charCodeAt(pos) === CHAR_CODE.SPACE &&
      src.charCodeAt(pos + 1) === CHAR_CODE.SPACE &&
      this.isTerminatorChar(src.charCodeAt(pos + 2))
    ) {
      pos += 3
      this.pos = pos
      this.tokens.push({
        type: 'br',
        raw: src.slice(start, pos),
        text: '',
        block: false,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [start, pos],
      })
      return true
    }
    return false
  }

  private tokenizeDel(src: string): boolean {
    const start = this.pos
    let pos = start

    if (src.charCodeAt(pos) === CHAR_CODE.TILDE && src.charCodeAt(pos + 1) === CHAR_CODE.TILDE) {
      pos += 2
      const textStart = pos
      while (pos < src.length) {
        if (
          src.charCodeAt(pos) === CHAR_CODE.TILDE &&
          src.charCodeAt(pos + 1) === CHAR_CODE.TILDE
        ) {
          pos += 2
          break
        }
        pos++
      }
      const textEnd = pos - 2

      if (textEnd > textStart) {
        const text = src.slice(textStart, textEnd)
        this.pos = pos
        this.tokens.push({
          type: 'del',
          raw: src.slice(start, pos),
          text,
          block: false,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [start, pos],
        })
        return true
      }
    }
    return false
  }

  private tokenizeIns(src: string): boolean {
    const start = this.pos
    let pos = start

    if (src.charCodeAt(pos) === CHAR_CODE.PLUS && src.charCodeAt(pos + 1) === CHAR_CODE.PLUS) {
      pos += 2
      const textStart = pos
      while (pos < src.length) {
        if (src.charCodeAt(pos) === CHAR_CODE.PLUS && src.charCodeAt(pos + 1) === CHAR_CODE.PLUS) {
          pos += 2
          break
        }
        pos++
      }
      const textEnd = pos - 2

      if (textEnd > textStart) {
        const text = src.slice(textStart, textEnd)
        this.pos = pos
        this.tokens.push({
          type: 'ins',
          raw: src.slice(start, pos),
          text,
          block: false,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [start, pos],
        })
        return true
      }
    }
    return false
  }

  private tokenizeLink(src: string): boolean {
    const start = this.pos
    let pos = start

    if (src.charCodeAt(pos) === CHAR_CODE.BRACKET_LEFT) {
      pos++
      const textStart = pos
      while (pos < src.length && src.charCodeAt(pos) !== CHAR_CODE.BRACKET_RIGHT) {
        pos++
      }
      const textEnd = pos
      if (src.charCodeAt(pos) === CHAR_CODE.BRACKET_RIGHT) {
        pos++
        if (src.charCodeAt(pos) === CHAR_CODE.PARENTHESIS_LEFT) {
          pos++
          const hrefStart = pos
          while (pos < src.length && src.charCodeAt(pos) !== CHAR_CODE.PARENTHESIS_RIGHT) {
            pos++
          }
          const hrefEnd = pos
          if (src.charCodeAt(pos) === CHAR_CODE.PARENTHESIS_RIGHT) {
            pos++
            const text = src.slice(textStart, textEnd)
            const href = src.slice(hrefStart, hrefEnd)
            this.pos = pos
            this.tokens.push({
              type: 'link',
              raw: src.slice(start, pos),
              text,
              block: false,
              depth: 0,
              attrGet: (name: string) => {
                if (name === 'href') return href
                return null
              },
              attrSet: () => {},
              attrJoin: () => {},
              children: [],
              map: [start, pos],
            })
            return true
          }
        }
      }
    }
    return false
  }

  private tokenizeImage(src: string): boolean {
    const start = this.pos
    let pos = start

    if (
      src.charCodeAt(pos) === CHAR_CODE.EXCLAMATION &&
      src.charCodeAt(pos + 1) === CHAR_CODE.BRACKET_LEFT
    ) {
      pos += 2
      const altStart = pos
      while (pos < src.length && src.charCodeAt(pos) !== CHAR_CODE.BRACKET_RIGHT) {
        pos++
      }
      const altEnd = pos
      if (src.charCodeAt(pos) === CHAR_CODE.BRACKET_RIGHT) {
        pos++
        if (src.charCodeAt(pos) === CHAR_CODE.PARENTHESIS_LEFT) {
          pos++
          const srcStart = pos
          while (pos < src.length && src.charCodeAt(pos) !== CHAR_CODE.PARENTHESIS_RIGHT) {
            pos++
          }
          const srcEnd = pos
          if (src.charCodeAt(pos) === CHAR_CODE.PARENTHESIS_RIGHT) {
            pos++
            const alt = src.slice(altStart, altEnd)
            const url = src.slice(srcStart, srcEnd)
            this.pos = pos
            this.tokens.push({
              type: 'image',
              raw: src.slice(start, pos),
              text: alt,
              block: false,
              depth: 0,
              attrGet: (name: string) => {
                if (name === 'src') return url
                if (name === 'alt') return alt
                return null
              },
              attrSet: () => {},
              attrJoin: () => {},
              children: [],
              map: [start, pos],
            })
            return true
          }
        }
      }
    }
    return false
  }

  private tokenizeFootnote(src: string): boolean {
    // TODO: implement footnote tokenizer
    console.warn(`Footnote tokenizer is not implemented yet.\n src: ${src}`)
    return false
  }

  /**
   * 检查是否为终止字符
   * @param code 字符编码
   * @returns 是否为终止字符
   */
  private isTerminatorChar(code: number): boolean {
    return (
      code === CHAR_CODE.LF ||
      code === CHAR_CODE.CR ||
      code === CHAR_CODE.SPACE ||
      code === CHAR_CODE.TAB
    )
  }

  /**
   * 内联词法分析
   * @returns Token 数组
   */
  public tokenizeInline(): Token[] {
    // TODO: implement inline tokenization
    return []
  }

  /**
   * 获取源码
   * @returns 源码
   */
  public getSrc(): string {
    return this.src
  }

  /**
   * 使用扩展
   * @param extension Markdown 扩展
   */
  public use(extension: MarkdownExtension): void {
    if (extension.tokenizer) {
      this.tokenTypes.push(extension.name)
      this.tokenizers[extension.name] = (src: string) => {
        this.src = src
        return Boolean(extension.tokenizer!(src))
      }
    }
  }

  /**
   * 开始处理
   * @param src 源码
   */
  public start(src: string): void {
    this.input(src)
  }

  /**
   * 获取下一个 Token
   * @returns Token 或 undefined
   */
  public next(): Token | undefined {
    if (this.pos < this.posMax) {
      let matched = false
      for (const type of this.tokenTypes) {
        const tokenizer = this.tokenizers[type]
        if (tokenizer) {
          const result = tokenizer(this.src.slice(this.pos))
          if (result) {
            matched = true
            break
          }
        }
      }
      if (!matched) {
        this.pos++
      }
    }

    if (this.pos < this.posMax) {
      return this.tokens[this.tokens.length - 1]
    }
    return undefined
  }
}
