import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'

export class LinkPlugin extends BasePlugin {
  public name = 'link'
  public level: 'block' | 'inline' | 'core' = 'inline'

  public tokenizer(src: string): Token[] {
    const rule = /\[([^\]]+)\]\(([^)]+)\)/g
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    while ((match = rule.exec(src))) {
      const text = match[1]
      const href = match[2]

      tokens.push({
        type: 'link',
        raw: match[0],
        text,
        block: false,
        depth: 0,
        attrGet: (name: string) => {
          if (name === 'href') return href
          return null
        },
        attrSet: () => {},
        attrJoin: () => {},
        children: [
          {
            type: 'text',
            raw: text,
            text,
            block: false,
            depth: 0,
            attrGet: () => null,
            attrSet: () => {},
            attrJoin: () => {},
            children: [],
            map: [0, 0],
          },
        ],
        map: [0, 0],
      })
    }

    return tokens
  }

  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]
    const href = token.attrGet('href') || ''
    const text = token.children?.[0]?.text ?? ''
    return `<a href="${href}">${text}</a>`
  }

  public start(src: string): string {
    return src
  }
}
