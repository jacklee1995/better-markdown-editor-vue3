import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'

/**
 * 有序列表插件
 * 支持 Markdown 中的有序列表语法
 */
export class OrderedListPlugin extends BasePlugin {
  public name = 'ordered_list'
  public level: 'block' | 'inline' | 'core' = 'block'

  /**
   * 有序列表插件的 Markdown 语法解析器
   * @param src 要解析的 Markdown 源文本
   * @returns 解析后的 Token 列表
   */
  public tokenizer(src: string): Token[] {
    const tokens: Token[] = []
    const lines = src.split('\n')
    let isInList = false
    let listStart = 1

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const match = line.match(/^(\s*)(\d+)\.\s+/)

      if (match) {
        const indent = match[1].length
        const marker = match[2]

        if (!isInList) {
          isInList = true
          listStart = parseInt(marker, 10)
          tokens.push({
            type: 'ordered_list_start',
            raw: '',
            text: '',
            block: true,
            depth: indent,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [i, i + 1],
            start: listStart,
          })
        }

        tokens.push({
          type: 'list_item_start',
          raw: '',
          text: '',
          block: true,
          depth: indent + 1,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [i, i + 1],
        })

        tokens.push({
          type: 'text',
          raw: line.slice(match[0].length),
          text: line.slice(match[0].length),
          block: false,
          depth: indent + 2,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [i, i + 1],
        })

        tokens.push({
          type: 'list_item_end',
          raw: '',
          text: '',
          block: true,
          depth: indent + 1,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [i, i + 1],
        })
      } else {
        if (isInList) {
          tokens.push({
            type: 'ordered_list_end',
            raw: '',
            text: '',
            block: true,
            depth: 0,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [i, i + 1],
          })
          isInList = false
        }
      }
    }

    if (isInList) {
      tokens.push({
        type: 'ordered_list_end',
        raw: '',
        text: '',
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [lines.length, lines.length],
      })
    }

    return tokens
  }

  /**
   * 有序列表插件的 Token 渲染器
   * @param tokens Token 列表
   * @param idx 要渲染的 Token 索引
   * @returns 渲染后的 HTML 字符串
   */
  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]

    if (token.type === 'ordered_list_start') {
      const start = token.start ?? 1
      return `<ol start="${start}">`
    } else if (token.type === 'ordered_list_end') {
      return '</ol>'
    } else if (token.type === 'list_item_start') {
      return '<li>'
    } else if (token.type === 'list_item_end') {
      return '</li>'
    }

    return ''
  }

  /**
   * 有序列表插件的启动方法
   * @param src 要处理的 Markdown 源文本
   * @returns 处理后的 Markdown 源文本
   */
  public start(src: string): string {
    return src
  }
}
