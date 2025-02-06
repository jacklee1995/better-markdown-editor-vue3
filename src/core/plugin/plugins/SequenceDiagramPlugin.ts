/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasePlugin } from '../BasePlugin'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'

/**
 * 序列图插件
 * 支持通过 ```sequence 语法嵌入序列图
 */
export class SequenceDiagramPlugin extends BasePlugin {
  public name = 'sequence'
  public level: 'block' | 'inline' | 'core' = 'block'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /^```sequence\s*\n([\s\S]+?)\n```/ // 匹配序列图代码块
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    // 处理序列图代码块
    while ((match = rule.exec(src))) {
      const code = match[1].trim() // 获取序列图代码内容

      tokens.push({
        type: 'sequence',
        raw: match[0],
        text: code,
        block: true,
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
    const code = token.text
    const id = `sequence-${idx}` // 为每个序列图生成唯一的 ID
    return `<div id="${id}" class="sequence-container"></div>\n<script>window.addEventListener("load", () => { Diagram.parse('${code}').drawSVG("${id}") })</script>\n`
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
