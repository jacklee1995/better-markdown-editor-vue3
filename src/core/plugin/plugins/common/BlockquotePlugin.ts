import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'

export class BlockquotePlugin extends BasePlugin {
  public name = 'blockquote'
  public level: 'block' | 'inline' | 'core' = 'block'

  public tokenizer(src: string): Token[] {
    const rule = /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    while ((match = rule.exec(src))) {
      const raw = match[0]
      const text = raw.replace(/^ *> ?/gm, '')

      tokens.push({
        type: 'blockquote',
        raw,
        text,
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: this.tokenizer(text),
        map: [0, 0],
      })
    }

    return tokens
  }

  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]
    const text = token.children?.map((child) => child.text).join('') ?? ''
    return `<blockquote>${text}</blockquote>`
  }

  public start(src: string): string {
    return src
  }
}
