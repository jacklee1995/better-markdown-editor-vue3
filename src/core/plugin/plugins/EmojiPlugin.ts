/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasePlugin } from '../BasePlugin'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'

/**
 * Emoji 插件
 * 支持通过 :emoji_name: 语法嵌入 Emoji 表情
 */
export class EmojiPlugin extends BasePlugin {
  public name = 'emoji'
  public level: 'block' | 'inline' | 'core' = 'inline'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /:([\w-]+):/g // 匹配 Emoji 语法
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    // 处理 Emoji 语法
    while ((match = rule.exec(src))) {
      const emoji = match[1] // 获取 Emoji 名称

      tokens.push({
        type: 'emoji',
        raw: match[0],
        text: emoji,
        block: false,
        depth: 0,
        attrGet: () => null,
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
    const emoji = token.text
    return `<span class="emoji emoji-${emoji}"></span>` // 使用 <span> 标签包裹 Emoji
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
