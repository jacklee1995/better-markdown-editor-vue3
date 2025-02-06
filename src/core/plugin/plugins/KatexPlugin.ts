/* eslint-disable @typescript-eslint/no-unused-vars */
import katex from 'katex'
import { BasePlugin } from '../BasePlugin'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'

/**
 * KaTeX 插件
 * 支持通过 $...$ 和 $$...$$ 语法嵌入数学公式
 */
export class KatexPlugin extends BasePlugin {
  public name = 'katex'
  public level: 'block' | 'inline' | 'core' = 'inline'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const blockRule = /^\$\$\s*\n([\s\S]+?)\n\s*\$\$(?:\n|$)/ // 匹配块级数学公式
    const inlineRule = /\$(.+?)\$/g // 匹配行内数学公式
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    // 处理块级数学公式
    while ((match = blockRule.exec(src))) {
      const tex = match[1].trim() // 获取数学公式内容

      tokens.push({
        type: 'math',
        raw: match[0],
        text: tex,
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [0, 0],
        displayMode: true, // 标记为块级显示
      })

      src = src.slice(match[0].length) // 移动源码指针
    }

    // 处理行内数学公式
    while ((match = inlineRule.exec(src))) {
      const tex = match[1].trim() // 获取数学公式内容

      tokens.push({
        type: 'math',
        raw: match[0],
        text: tex,
        block: false,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [0, 0],
        displayMode: false, // 标记为行内显示
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
    const tex = token.text
    const displayMode = token.displayMode || false // 获取显示模式
    const html = katex.renderToString(tex, { displayMode, throwOnError: false }) // 使用 KaTeX 渲染公式
    return html
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
