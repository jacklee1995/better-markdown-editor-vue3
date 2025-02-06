/* eslint-disable @typescript-eslint/no-unused-vars */
import hljs from 'highlight.js'
import { BasePlugin } from '../BasePlugin'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'

/**
 * 代码高亮插件
 * 使用 highlight.js 对代码块进行语法高亮
 */
export class HighlightPlugin extends BasePlugin {
  public name = 'highlight'
  public level: 'block' | 'inline' | 'core' = 'block'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /^```(\w+)?\s*\n([\s\S]+?)\n```/ // 匹配代码块
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    // 处理代码块
    while ((match = rule.exec(src))) {
      const lang = match[1] || '' // 获取语言类型
      const code = match[2].trim() // 获取代码内容

      tokens.push({
        type: 'code',
        raw: match[0],
        text: code,
        block: true,
        depth: 0,
        attrGet: (name: string) => {
          if (name === 'lang') return lang
          return null
        },
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [0, 0],
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
    const lang = token.attrGet('lang') || '' // 获取语言类型
    const code = token.text
    const highlighted = hljs.highlight(code, { language: lang }).value // 使用 highlight.js 进行高亮
    return `<pre><code class="language-${lang}">${highlighted}</code></pre>\n`
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
