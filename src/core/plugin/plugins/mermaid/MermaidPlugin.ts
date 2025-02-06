import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'

export class MermaidPlugin extends BasePlugin {
  public name = 'mermaid'
  public level: 'block' | 'inline' | 'core' = 'block'

  public tokenizer(src: string): Token[] {
    const rule = /^`{3,}mermaid\s*\n([\s\S]+?)\n`{3,}/
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    while ((match = rule.exec(src))) {
      const code = match[1].trim()

      tokens.push({
        type: 'mermaid',
        raw: match[0],
        text: code,
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
    return `<div class="mermaid-container" data-code="${encodeURIComponent(code)}"></div>`
  }

  public start(src: string): string {
    return src
  }
}
