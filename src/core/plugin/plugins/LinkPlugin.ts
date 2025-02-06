/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasePlugin } from '../BasePlugin'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'

/**
 * 链接插件
 * 支持通过 [text](url) 语法创建超链接
 */
export class LinkPlugin extends BasePlugin {
  public name = 'link'
  public level: 'block' | 'inline' | 'core' = 'inline'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /\[([^\]]+)\]\(([^)]+)\)/g // 匹配链接语法
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    // 处理链接语法
    while ((match = rule.exec(src))) {
      const text = match[1] // 获取链接文本
      const href = match[2] // 获取链接 URL

      tokens.push({
        type: 'link',
        raw: match[0],
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
        map: [0, 0],
      })
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
    const href = token.attrGet('href') || '' // 获取链接 URL
    const text = token.text
    return `<a href="${href}">${text}</a>` // 使用 <a> 标签创建超链接
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
