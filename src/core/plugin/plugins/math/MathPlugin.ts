import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'

export class MathPlugin extends BasePlugin {
  public name = 'math'
  public level: 'block' | 'inline' | 'core' = 'inline'

  public tokenizer(src: string): Token[] {
    const inlineRule = /\$(.+?)\$/g
    const blockRule = /^\$\$(\s*\n)?([\s\S]+?)\s*\n\$\$(\n|$)/
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    while ((match = inlineRule.exec(src))) {
      const text = match[1].trim()
      tokens.push({
        type: 'math_inline',
        raw: match[0],
        text,
        block: false,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [match.index, match.index + match[0].length],
      })
    }

    while ((match = blockRule.exec(src))) {
      const text = match[2].trim()
      tokens.push({
        type: 'math_block',
        raw: match[0],
        text,
        block: true,
        depth: 0,
        attrGet: () => null,
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [match.index, match.index + match[0].length],
      })
      src = src.slice(match.index + match[0].length)
    }

    return tokens
  }

  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]
    const code = token.text
    if (token.type === 'math_inline') {
      return `<span class="math-inline" data-code="${encodeURIComponent(code)}"></span>`
    } else {
      return `<div class="math-block" data-code="${encodeURIComponent(code)}"></div>`
    }
  }

  public start(src: string): string {
    return src
  }
}
