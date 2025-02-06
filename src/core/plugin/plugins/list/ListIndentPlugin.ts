import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'

/**
 * 列表缩进插件
 * 处理列表的缩进和层级关系
 */
export class ListIndentPlugin extends BasePlugin {
  public name = 'list_indent'
  public level: 'block' | 'inline' | 'core' = 'core'

  /**
   * 列表缩进插件的 Markdown 语法解析器
   * @param src 要解析的 Markdown 源文本
   * @returns 解析后的 Token 列表
   */
  public tokenizer(src: string): Token[] {
    const tokens: Token[] = []
    const lines = src.split('\n')
    let indent = 0
    let isInList = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const match = line.match(/^(\s*)([-*+]|\d+\.)\s+/)

      if (match) {
        const currentIndent = match[1].length
        const marker = match[2]

        if (!isInList) {
          isInList = true
          indent = currentIndent
          tokens.push({
            type: 'list_start',
            raw: '',
            text: '',
            block: true,
            depth: indent,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [i, i + 1],
          })
        }

        if (currentIndent > indent) {
          tokens.push({
            type: 'list_item_start',
            raw: '',
            text: '',
            block: true,
            depth: currentIndent,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [i, i + 1],
          })
          indent = currentIndent
        } else if (currentIndent < indent) {
          while (currentIndent < indent) {
            tokens.push({
              type: 'list_item_end',
              raw: '',
              text: '',
              block: true,
              depth: indent,
              attrGet: () => null,
              attrSet: () => {},
              attrJoin: () => {},
              children: [],
              map: [i, i + 1],
            })
            tokens.push({
              type: 'list_end',
              raw: '',
              text: '',
              block: true,
              depth: indent,
              attrGet: () => null,
              attrSet: () => {},
              attrJoin: () => {},
              children: [],
              map: [i, i + 1],
            })
            indent -= 2
          }
          tokens.push({
            type: 'list_item_start',
            raw: '',
            text: '',
            block: true,
            depth: currentIndent,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [i, i + 1],
          })
          indent = currentIndent
        } else {
          tokens.push({
            type: 'list_item_end',
            raw: '',
            text: '',
            block: true,
            depth: indent,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [i, i + 1],
          })
          tokens.push({
            type: 'list_item_start',
            raw: '',
            text: '',
            block: true,
            depth: indent,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [i, i + 1],
          })
        }

        tokens.push({
          type:
            marker === '-' || marker === '*' || marker === '+'
              ? 'bullet_list_marker'
              : 'ordered_list_marker',
          raw: marker,
          text: marker,
          block: false,
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
            type: 'list_item_end',
            raw: '',
            text: '',
            block: true,
            depth: indent,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [i, i + 1],
          })
          tokens.push({
            type: 'list_end',
            raw: '',
            text: '',
            block: true,
            depth: indent,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [i, i + 1],
          })
          isInList = false
          indent = 0
        }
      }
    }

    if (isInList) {
      tokens.push({
        type: 'list_item_end',
        raw: '',
        text: '',
        block: true,
        depth: indent,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [lines.length, lines.length],
      })
      tokens.push({
        type: 'list_end',
        raw: '',
        text: '',
        block: true,
        depth: indent,
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
   * 列表缩进插件的启动方法
   * @param src 要处理的 Markdown 源文本
   * @returns 处理后的 Markdown 源文本
   */
  public start(src: string): string {
    return src
  }
}
