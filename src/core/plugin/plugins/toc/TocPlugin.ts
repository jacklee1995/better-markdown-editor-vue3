import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'

interface TocItem {
  level: number
  text: string
  anchor: string
}

export class TocPlugin extends BasePlugin {
  public name = 'toc'
  public level: 'block' | 'inline' | 'core' = 'core'

  private toc: TocItem[] = []

  public start(src: string): string {
    this.toc = []
    return src
  }

  public tokenizer(src: string): Token[] {
    const tokens: Token[] = []
    const headingRule = /^(#{1,6})\s+(.+)$/gm
    let match: RegExpExecArray | null

    while ((match = headingRule.exec(src))) {
      const level = match[1].length
      const text = match[2].trim()
      const anchor = `heading-${this.toc.length}`

      this.toc.push({ level, text, anchor })

      tokens.push({
        type: 'heading',
        raw: match[0],
        text,
        depth: level,
        block: true,
        attrGet: (name) => (name === 'id' ? anchor : null),
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [match.index, match.index + match[0].length],
      })
    }

    return tokens
  }

  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]
    const anchor = token.attrGet('id') || ''
    const level = token.depth
    const text = token.text

    return `<h${level} id="${anchor}">${text}</h${level}>`
  }

  public getToc(): TocItem[] {
    return this.toc
  }
}
