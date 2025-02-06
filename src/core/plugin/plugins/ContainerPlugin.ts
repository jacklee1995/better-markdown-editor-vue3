import { BasePlugin } from '../BasePlugin'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'

/**
 * 自定义容器插件
 * 支持通过 :::type 语法创建自定义容器
 */
export class ContainerPlugin extends BasePlugin {
  public name = 'container'
  public level: 'block' | 'inline' | 'core' = 'block'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /^:::(\w+)(?:\s+(.*))?$/
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    while ((match = rule.exec(src))) {
      const type = match[1]
      const title = match[2] || ''
      const text = src.slice(match[0].length).trim()

      tokens.push({
        type: 'container_start',
        raw: match[0],
        text,
        block: true,
        depth: 0,
        attrGet: (name: string) => {
          if (name === 'type') return type
          if (name === 'title') return title
          return null
        },
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [0, 0],
      })

      tokens.push({
        type: 'container_end',
        raw: ':::',
        text: '',
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [0, 0],
      })

      src = src.slice(match[0].length + text.length + 3)
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
    if (token.type === 'container_start') {
      const type = token.attrGet('type') || 'info'
      const title = token.attrGet('title') || ''
      const text = token.text
      const textToken: Token = {
        type: 'text',
        raw: text,
        text,
        block: false,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [0, 0],
      }
      return `<div class="custom-container ${type}">\n<p class="custom-container-title">${title}</p>\n${self.render([textToken], options, env)}\n`
    } else {
      return '</div>\n'
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
