import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'
import {
  createHeadingAnchor,
  extractHeadingText,
  generateHeadingId,
  isHeading,
} from './HeadingUtils'

export class Heading2Plugin extends BasePlugin {
  public name = 'heading_2'
  public level: 'block' | 'inline' | 'core' = 'block'

  public tokenizer(src: string): Token[] {
    const tokens: Token[] = []
    const lines = src.split('\n')

    for (const line of lines) {
      if (isHeading(line) && line.startsWith('## ')) {
        const text = extractHeadingText(line)
        const id = generateHeadingId(text)

        tokens.push({
          type: 'heading_2',
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

  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]
    const text = token.text
    const id = token.attrGet('id') ?? ''
    const anchor = createHeadingAnchor(text, 2)

    return `<h2 id="${id}">${anchor}</h2>`
  }

  public start(src: string): string {
    const tokens = this.tokenizer(src)
    let result = src

    for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i]
      const replacement = `## ${token.text}`
      const start = result.indexOf(token.raw)
      const end = start + token.raw.length
      result = result.slice(0, start) + replacement + result.slice(end)
    }

    return result
  }
}
