import { BasePlugin } from '../BasePlugin'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'

/**
 * 标记文本插件
 * 支持通过 ==text== 语法标记文本
 */
export class MarkPlugin extends BasePlugin {
  public name = 'mark'
  public level: 'block' | 'inline' | 'core' = 'inline'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /==(.*?)==/ // 匹配标记文本语法
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    // 处理标记文本语法
    while ((match = rule.exec(src))) {
      const text = match[1].trim() // 获取标记的文本内容

      tokens.push({
        type: 'mark',
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
    const text = self.render([textToken], options, env) // 渲染标记的文本
    return `<mark>${text}</mark>` // 使用 <mark> 标签包裹标记文本
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
