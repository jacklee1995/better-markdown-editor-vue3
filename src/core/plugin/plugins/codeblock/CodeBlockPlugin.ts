/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasePlugin } from '../../BasePlugin'
import type { MarkdownParserOptions, Token } from '../../../markdown/interface'
import { extractLanguage, extractCode } from './CodeBlockUtils'

/**
 * 代码块插件
 * 实现代码块的语法解析和渲染
 */
export class CodeBlockPlugin extends BasePlugin {
  public name = 'codeblock'
  public level: 'block' | 'inline' | 'core' = 'block'

  /**
   * 代码块的语法解析
   * 将代码块的源代码解析为 Token
   * @param src 源代码
   * @returns 解析后的 Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /^```([\w-]+)?\n([\s\S]*?)^```/gm
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    while ((match = rule.exec(src))) {
      const language = extractLanguage(match[1])
      const code = extractCode(match[2])

      tokens.push({
        type: 'codeblock',
        raw: match[0],
        text: code,
        block: true,
        depth: 0,
        attrGet: (name: string) => {
          if (name === 'language') return language
          return null
        },
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [match.index, match.index + match[0].length],
      })
    }

    return tokens
  }

  /**
   * 代码块的渲染
   * 将代码块的 Token 渲染为 HTML
   * @param tokens Token 数组
   * @param idx 当前 Token 的索引
   * @returns 渲染后的 HTML 字符串
   */
  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]
    const language = token.attrGet('language') ?? ''
    const code = token.text
    return `<CodeBlockRenderer code="${encodeURIComponent(code)}" language="${language}" />`
  }

  /**
   * 插件的启动方法
   * 在解析 Markdown 文本之前调用
   * @param src 要处理的 Markdown 文本
   * @returns 处理后的 Markdown 文本
   */
  public start(src: string): string {
    return src
  }
}
