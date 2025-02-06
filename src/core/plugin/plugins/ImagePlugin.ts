/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasePlugin } from '../BasePlugin'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'

/**
 * 图片插件
 * 支持通过 ![alt](url) 语法嵌入图片
 */
export class ImagePlugin extends BasePlugin {
  public name = 'image'
  public level: 'block' | 'inline' | 'core' = 'inline'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /!\[([^\]]*)\]\(([^)]+)\)/g // 匹配图片语法
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    // 处理图片语法
    while ((match = rule.exec(src))) {
      const alt = match[1] // 获取图片的替代文本
      const url = match[2] // 获取图片的 URL

      tokens.push({
        type: 'image',
        raw: match[0],
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
    const src = token.attrGet('src') || '' // 获取图片的 URL
    const alt = token.attrGet('alt') || '' // 获取图片的替代文本
    return `<img src="${src}" alt="${alt}">`
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
