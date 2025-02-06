import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'
import {
  createHeadingAnchor,
  extractHeadingLevel,
  extractHeadingText,
  generateHeadingId,
  getHeadingMarkdown,
  getHeadingTag,
  isHeading,
} from './HeadingUtils'

/**
 * 标题插件
 * 支持 Markdown 中的 ATX 标题语法
 */
export class HeadingPlugin extends BasePlugin {
  public name = 'heading'
  public level: 'block' | 'inline' | 'core' = 'block'

  /**
   * 标题插件的 Markdown 语法解析器
   * @param src 要解析的 Markdown 源文本
   * @returns 解析后的 Token 列表
   */
  public tokenizer(src: string): Token[] {
    const tokens: Token[] = []
    const lines = src.split('\n')

    for (const line of lines) {
      if (isHeading(line)) {
        const level = extractHeadingLevel(line)
        const text = extractHeadingText(line)
        const id = generateHeadingId(text)

        tokens.push({
          type: `heading_${level}`,
          raw: line,
          text,
          block: true,
          depth: 0,
          attrGet: (name: string) => {
            if (name === 'id') return id
            return null
          },
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [0, 0],
        })
      }
    }

    return tokens
  }

  /**
   * 标题插件的 Token 渲染器
   * @param tokens Token 列表
   * @param idx 要渲染的 Token 索引
   * @returns 渲染后的 HTML 字符串
   */
  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]
    const level = Number(token.type.split('_')[1])
    const text = token.text
    const id = token.attrGet('id') ?? ''
    const tag = getHeadingTag(level)
    const anchor = createHeadingAnchor(text, level)

    return `<${tag} id="${id}">${anchor}</${tag}>`
  }

  /**
   * 标题插件的启动方法
   * @param src 要处理的 Markdown 源文本
   * @returns 处理后的 Markdown 源文本
   */
  public start(src: string): string {
    const tokens = this.tokenizer(src)
    let result = src

    for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i]
      const level = Number(token.type.split('_')[1])
      const markdown = getHeadingMarkdown(level)
      const text = token.text
      const replacement = `${markdown} ${text}`
      const start = result.indexOf(token.raw)
      const end = start + token.raw.length
      result = result.slice(0, start) + replacement + result.slice(end)
    }

    return result
  }
}
