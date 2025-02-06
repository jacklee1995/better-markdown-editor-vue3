import { BasePlugin } from '../BasePlugin'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'

/**
 * 定义列表插件
 * 支持通过 term: definition 语法创建定义列表
 */
export class DefListPlugin extends BasePlugin {
  public name = 'deflist'
  public level: 'block' | 'inline' | 'core' = 'block'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /^(.*?)\n(:[ \t]+)(.*)/
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    while ((match = rule.exec(src))) {
      const term = match[1].trim()
      const def = match[3].trim()

      tokens.push({
        type: 'def_list_start',
        raw: '',
        text: '',
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [0, 0],
      })

      tokens.push({
        type: 'def_list_term',
        raw: term,
        text: term,
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [0, 0],
      })

      tokens.push({
        type: 'def_list_def',
        raw: def,
        text: def,
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [0, 0],
      })

      tokens.push({
        type: 'def_list_end',
        raw: '',
        text: '',
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [0, 0],
      })

      src = src.slice(match[0].length)
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
    switch (token.type) {
      case 'def_list_start': {
        return '<dl>\n'
      }
      case 'def_list_term': {
        const textToken: Token = {
          type: 'text',
          raw: token.text,
          text: token.text,
          block: false,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [0, 0],
        }
        return `<dt>${self.render([textToken], options, env)}</dt>\n`
      }
      case 'def_list_def': {
        const textToken: Token = {
          type: 'text',
          raw: token.text,
          text: token.text,
          block: false,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [0, 0],
        }
        return `<dd>${self.render([textToken], options, env)}</dd>\n`
      }
      case 'def_list_end': {
        return '</dl>\n'
      }
      default: {
        return ''
      }
    }
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
