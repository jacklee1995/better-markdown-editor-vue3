import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'

export class InlineCodePlugin extends BasePlugin {
  public name = 'inline_code'
  public level: 'block' | 'inline' | 'core' = 'inline'

  public tokenizer(src: string): Token[] {
    const rule = /`(.+?)`/g
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    while ((match = rule.exec(src))) {
      const text = match[1]

      tokens.push({
        type: 'code_inline',
        raw: match[0],
        text,
        block: false,
        depth: 0,
        attrGet: () => null,
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
    const text = token.children?.[0]?.text ?? ''
    return `<code>${text}</code>`
  }

  public start(src: string): string {
    return src
  }
}
