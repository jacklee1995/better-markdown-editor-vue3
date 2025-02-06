import { BasePlugin } from '../BasePlugin'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'
import { MarkdownUtils } from '../../markdown/MarkdownUtils'

/**
 * 目录插件
 * 支持通过 @[toc] 语法生成目录
 */
export class TocPlugin extends BasePlugin {
  public name = 'toc'
  public level: 'block' | 'inline' | 'core' = 'block'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /@\[toc\](?:\((?<title>.*)\))?/i // 匹配目录语法
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    // 处理目录语法
    while ((match = rule.exec(src))) {
      const title = match.groups?.title || 'Table of Contents' // 获取目录标题

      tokens.push({
        type: 'toc',
        raw: match[0],
        text: '',
        block: true,
        depth: 0,
        attrGet: (name: string) => {
          if (name === 'title') return title
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
    const title = token.attrGet('title') || 'Table of Contents' // 获取目录标题
    const toc = MarkdownUtils.extractToc(tokens) // 提取目录内容
    const tocHtml = self.render(toc, options, env) // 渲染目录内容
    return `<nav class="table-of-contents">\n<h2>${title}</h2>\n${tocHtml}\n</nav>\n` // 使用 <nav> 和 <h2> 标签创建目录
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
