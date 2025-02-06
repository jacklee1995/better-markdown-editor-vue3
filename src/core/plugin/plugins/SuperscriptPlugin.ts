import { BasePlugin } from '../BasePlugin'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'

/**
 * 上标插件
 * 支持通过 ^text^ 语法标记上标文本
 */
export class SuperscriptPlugin extends BasePlugin {
  public name = 'superscript'
  public level: 'block' | 'inline' | 'core' = 'inline'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /\^(.*?)\^/ // 匹配上标文本语法
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    // 处理上标文本语法
    while ((match = rule.exec(src))) {
      const text = match[1].trim() // 获取上标的文本内容

      tokens.push({
        type: 'superscript',
        raw: match[0],
        text,
        block: false,
        depth: 0,
        attrGet: () => null,
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
    const text = self.render([textToken], options, env) // 渲染上标的文本
    return `<sup>${text}</sup>` // 使用 <sup> 标签包裹上标文本
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
