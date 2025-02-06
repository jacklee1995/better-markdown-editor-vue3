import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'

/**
 * 任务列表(CheckList)插件
 * 支持 Markdown 中的任务列表语法
 */
export class CheckListPlugin extends BasePlugin {
  public name = 'checklist'
  public level: 'block' | 'inline' | 'core' = 'block'

  /**
   * 任务列表插件的 Markdown 语法解析器
   * @param src 要解析的 Markdown 源文本
   * @returns 解析后的 Token 列表
   */
  public tokenizer(src: string): Token[] {
    const tokens: Token[] = []
    const lines = src.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const match = line.match(/^(\s*)-\s*\[(\s|x)\]\s*(.*)/)

      if (match) {
        const indent = match[1].length
        const checked = match[2] === 'x'
        const text = match[3]

        tokens.push({
          type: 'checklist_item_open',
          raw: line,
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
          type: 'checklist_item_checked',
          raw: checked ? '[x]' : '[ ]',
          text: checked ? '[x]' : '[ ]',
          block: false,
          depth: indent + 1,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [i, i + 1],
        })

        tokens.push({
          type: 'text',
          raw: text,
          text,
          block: false,
          depth: indent + 1,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [i, i + 1],
        })

        tokens.push({
          type: 'checklist_item_close',
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
    }

    return tokens
  }

  /**
   * 任务列表插件的 Token 渲染器
   * @param tokens Token 列表
   * @param idx 要渲染的 Token 索引
   * @returns 渲染后的 HTML 字符串
   */
  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]

    if (token.type === 'checklist_item_open') {
      return '<li>'
    } else if (token.type === 'checklist_item_checked') {
      return token.text === '[x]' ? '<input type="checkbox" checked>' : '<input type="checkbox">'
    } else if (token.type === 'checklist_item_close') {
      return '</li>'
    }

    return ''
  }

  /**
   * 任务列表插件的启动方法
   * @param src 要处理的 Markdown 源文本
   * @returns 处理后的 Markdown 源文本
   */
  public start(src: string): string {
    return src
  }
}
