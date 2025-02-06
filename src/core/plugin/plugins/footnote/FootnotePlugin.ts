import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'
import {
  isFootnoteDefinition,
  isFootnoteReference,
  extractFootnoteDefinitionName,
  extractFootnoteDefinitionContent,
  extractFootnoteReferenceName,
} from './FootnoteUtils'

/**
 * 脚注插件
 * 支持 Markdown 中的脚注语法
 */
export class FootnotePlugin extends BasePlugin {
  public name = 'footnote'
  public level: 'block' | 'inline' | 'core' = 'inline'

  /**
   * 脚注插件的 Markdown 语法解析器
   * @param src 要解析的 Markdown 源文本
   * @returns 解析后的 Token 列表
   */
  public tokenizer(src: string): Token[] {
    const tokens: Token[] = []
    const lines = src.split('\n')
    const footnoteDefinitions: Record<string, string> = {}

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (isFootnoteDefinition(line)) {
        const name = extractFootnoteDefinitionName(line)
        const content = extractFootnoteDefinitionContent(line)
        footnoteDefinitions[name] = content
      } else if (isFootnoteReference(line)) {
        const name = extractFootnoteReferenceName(line)
        const content = footnoteDefinitions[name] || ''

        tokens.push({
          type: 'footnote_reference',
          raw: line,
          text: content,
          block: false,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [i, i + 1],
        })
      }
    }

    return tokens
  }

  /**
   * 脚注插件的 Token 渲染器
   * @param tokens Token 列表
   * @param idx 要渲染的 Token 索引
   * @returns 渲染后的 HTML 字符串
   */
  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]

    if (token.type === 'footnote_reference') {
      const name = extractFootnoteReferenceName(token.raw)
      return `<FootnoteReference name="${name}" />`
    }

    return ''
  }

  /**
   * 脚注插件的启动方法
   * @param src 要处理的 Markdown 源文本
   * @returns 处理后的 Markdown 源文本
   */
  public start(src: string): string {
    const footnoteDefinitions: Record<string, string> = {}
    const lines = src.split('\n')

    // 提取所有脚注定义
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i]
      if (isFootnoteDefinition(line)) {
        const name = extractFootnoteDefinitionName(line)
        const content = extractFootnoteDefinitionContent(line)
        footnoteDefinitions[name] = content
        lines.splice(i, 1)
      }
    }

    // 渲染脚注定义
    const footnoteDefinitionHtml = Object.entries(footnoteDefinitions)
      .map(([name, content]) => `<FootnoteDefinition name="${name}" content="${content}" />`)
      .join('\n')

    // 将脚注定义添加到文档末尾
    lines.push(footnoteDefinitionHtml)

    return lines.join('\n')
  }
}
