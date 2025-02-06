import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'
import {
  isDefListTerm,
  isDefListDefinition,
  extractDefListTerm,
  extractDefListDefinition,
} from './DefListUtils'

/**
 * 定义列表插件
 * 支持 Markdown 中的定义列表语法
 */
export class DefListPlugin extends BasePlugin {
  public name = 'deflist'
  public level: 'block' | 'inline' | 'core' = 'block'

  /**
   * 定义列表插件的 Markdown 语法解析器
   * @param src 要解析的 Markdown 源文本
   * @returns 解析后的 Token 列表
   */
  public tokenizer(src: string): Token[] {
    const tokens: Token[] = []
    const lines = src.split('\n')
    let term = ''
    let definition = ''

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (isDefListTerm(line)) {
        if (term && definition) {
          tokens.push({
            type: 'deflist_term',
            raw: term,
            text: extractDefListTerm(term),
            block: true,
            depth: 0,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [i - 2, i - 1],
          })
          tokens.push({
            type: 'deflist_definition',
            raw: definition,
            text: extractDefListDefinition(definition),
            block: true,
            depth: 0,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [i - 1, i],
          })
        }
        term = line
        definition = ''
      } else if (isDefListDefinition(line)) {
        definition = line
      } else {
        if (term && definition) {
          tokens.push({
            type: 'deflist_term',
            raw: term,
            text: extractDefListTerm(term),
            block: true,
            depth: 0,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [i - 2, i - 1],
          })
          tokens.push({
            type: 'deflist_definition',
            raw: definition,
            text: extractDefListDefinition(definition),
            block: true,
            depth: 0,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [i - 1, i],
          })
        }
        term = ''
        definition = ''
      }
    }

    if (term && definition) {
      tokens.push({
        type: 'deflist_term',
        raw: term,
        text: extractDefListTerm(term),
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [lines.length - 2, lines.length - 1],
      })
      tokens.push({
        type: 'deflist_definition',
        raw: definition,
        text: extractDefListDefinition(definition),
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [lines.length - 1, lines.length],
      })
    }

    return tokens
  }

  /**
   * 定义列表插件的 Token 渲染器
   * @param tokens Token 列表
   * @param idx 要渲染的 Token 索引
   * @returns 渲染后的 HTML 字符串
   */
  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]

    if (token.type === 'deflist_term') {
      return `<DefListTerm term="${token.text}" />`
    } else if (token.type === 'deflist_definition') {
      return `<DefListDefinition definition="${token.text}" />`
    }

    return ''
  }

  /**
   * 定义列表插件的启动方法
   * @param src 要处理的 Markdown 源文本
   * @returns 处理后的 Markdown 源文本
   */
  public start(src: string): string {
    return src
  }
}
