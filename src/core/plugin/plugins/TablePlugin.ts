/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasePlugin } from '../BasePlugin'
import { TableCell } from './table/TableCell'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'

/**
 * 表格插件
 * 支持通过 Markdown 表格语法创建表格
 */
export class TablePlugin extends BasePlugin {
  public name = 'table'
  public level: 'block' | 'inline' | 'core' = 'block'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /^ *(\|?.+\|.+)\n *\|?( *[-:]+[-| :]*)\n((?: *\|?.+\|.+(?:\n|$))*)\n*/ // 匹配表格语法
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    // 处理表格语法
    while ((match = rule.exec(src))) {
      const header = match[1].replace(/\|/g, '').split(/\s*\|\s*/) // 获取表头
      const align: ('center' | 'left' | 'right' | null)[] = match[2].split(/\s*\|\s*/).map((s) => {
        if (s.startsWith(':') && s.endsWith(':')) return 'center'
        if (s.startsWith(':')) return 'left'
        if (s.endsWith(':')) return 'right'
        return null
      }) // 获取对齐方式
      const cells: TableCell[][] = match[3]
        .replace(/\n$/, '')
        .split('\n')
        .map((row) =>
          row
            .replace(/\|/g, '')
            .split(/\s*\|\s*/)
            .map((cell) => TableCell.parse(cell, null)),
        ) // 获取单元格内容

      tokens.push({
        type: 'table',
        raw: match[0],
        text: '',
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [0, 0],
        header,
        align,
        cells,
      })

      src = src.slice(match[0].length) // 移动源码指针
    }

    return tokens
  }

  /**
   * 渲染器
   * @param tokens Token 数组
   * @param idx 当前 Token 索引
   * @param options 解析选项
   * @param env 环境变量
   * @param self 渲染器实例
   * @returns 渲染后的 HTML 字符串
   */
  public renderer(
    tokens: Token[],
    idx: number,
    options: MarkdownParserOptions,
    env: Record<string, unknown>,
    self: Renderer,
  ): string {
    const token = tokens[idx]
    const header = token.header || []
    const align = token.align || []
    const cells = token.cells || []

    let result = '<table>\n'

    result += '<thead>\n'
    result += '<tr>\n'
    for (let i = 0; i < header.length; i++) {
      result += `<th${align[i] ? ` align="${align[i]}"` : ''}>${header[i]}</th>\n` // 渲染表头
    }
    result += '</tr>\n'
    result += '</thead>\n'

    result += '<tbody>\n'
    for (const row of cells) {
      result += '<tr>\n'
      for (const cell of row as TableCell[]) {
        result += cell.render() // 渲染单元格
      }
      result += '</tr>\n'
    }
    result += '</tbody>\n'

    result += '</table>\n'

    return result
  }

  /**
   * 插件开始处理前的钩子函数
   * @param src 源码
   * @returns 处理后的源码
   */
  public start(src: string): string {
    return src
  }
}
