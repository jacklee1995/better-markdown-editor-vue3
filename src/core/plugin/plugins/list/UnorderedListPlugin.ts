import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'

/**
 * 无序列表插件
 * 支持 Markdown 中的无序列表语法
 */
export class UnorderedListPlugin extends BasePlugin {
  public name = 'unordered_list'
  public level: 'block' | 'inline' | 'core' = 'block'

  /**
   * 无序列表插件的 Markdown 语法解析器
   * @param src 要解析的 Markdown 源文本
   * @returns 解析后的 Token 列表
   */
  public tokenizer(src: string): Token[] {
    const tokens: Token[] = []
    const lines = src.split('\n')
    let isInList = false
    let listStartIdx = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const match = line.match(/^(\s*)[-*+]\s+/)

      if (match) {
        const indent = match[1].length

        if (!isInList) {
          isInList = true
          listStartIdx = i

          tokens.push({
            type: 'unordered_list_open',
            raw: '',
            text: '',
            block: true,
            depth: indent,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [listStartIdx, 0],
          })
        }

        tokens.push({
          type: 'list_item_open',
          raw: match[0],
          text: '',
          block: true,
          depth: indent + 2,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [i, 0],
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
          type: 'list_item_close',
          raw: '',
          text: '',
          block: true,
          depth: indent + 2,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [i, i + 1],
        })
      } else {
        if (isInList) {
          isInList = false
          tokens.push({
            type: 'unordered_list_close',
            raw: '',
            text: '',
            block: true,
            depth: 0,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [listStartIdx, i],
          })
        }
      }
    }

    if (isInList) {
      tokens.push({
        type: 'unordered_list_close',
        raw: '',
        text: '',
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [listStartIdx, lines.length],
      })
    }

    return tokens
  }

  /**
   * 无序列表插件的 Token 渲染器
   * @param tokens Token 列表
   * @param idx 要渲染的 Token 索引
   * @returns 渲染后的 HTML 字符串
   */
  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]

    if (token.type === 'unordered_list_open') {
      return '<ul>\n'
    } else if (token.type === 'unordered_list_close') {
      return '</ul>\n'
    } else if (token.type === 'list_item_open') {
      return '<li>'
    } else if (token.type === 'list_item_close') {
      return '</li>\n'
    }

    return ''
  }

  /**
   * 无序列表插件的启动方法
   * @param src 要处理的 Markdown 源文本
   * @returns 处理后的 Markdown 源文本
   */
  public start(src: string): string {
    return src
  }
}
