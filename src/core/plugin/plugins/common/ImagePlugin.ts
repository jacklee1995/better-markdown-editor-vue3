import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'

export class ImagePlugin extends BasePlugin {
  public name = 'image'
  public level: 'block' | 'inline' | 'core' = 'inline'

  public tokenizer(src: string): Token[] {
    const rule = /!\[([^\]]*)\]\(([^)]+)\)/g
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    while ((match = rule.exec(src))) {
      const alt = match[1]
      const url = match[2]

      tokens.push({
        type: 'image',
        raw: match[0],
        text: '',
        block: false,
        depth: 0,
        attrGet: (name: string) => {
          if (name === 'alt') return alt
          if (name === 'src') return url
          return null
        },
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [0, 0],
      })
    }

    return tokens
  }

  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]
    const alt = token.attrGet('alt') ?? ''
    const src = token.attrGet('src') ?? ''
    return `<img src="${src}" alt="${alt}">`
  }

  public start(src: string): string {
    return src
  }
}
