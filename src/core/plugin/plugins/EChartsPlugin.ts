/* eslint-disable @typescript-eslint/no-unused-vars */
import { BasePlugin } from '../BasePlugin'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'

/**
 * ECharts 插件
 * 支持通过 ```echarts 语法嵌入 ECharts 图表
 */
export class EChartsPlugin extends BasePlugin {
  public name = 'echarts'
  public level: 'block' | 'inline' | 'core' = 'block'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /^```echarts\s*\n([\s\S]+?)\n```/
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    while ((match = rule.exec(src))) {
      const code = match[1].trim()

      tokens.push({
        type: 'echarts',
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

      src = src.slice(match[0].length)
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
    const id = `echarts-${idx}`
    return `<div id="${id}" class="echarts-container"></div>\n<script>window.addEventListener("load", () => { echarts.init(document.getElementById("${id}")).setOption(${code}) })</script>\n`
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
