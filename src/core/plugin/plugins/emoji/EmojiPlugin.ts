import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'
import emojiData, { type EmojiMap } from './emojiData'

export class EmojiPlugin extends BasePlugin {
  public name = 'emoji'
  public level: 'block' | 'inline' | 'core' = 'inline'

  public tokenizer(src: string): Token[] {
    const rule = /:(\w+):/g
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    while ((match = rule.exec(src))) {
      const emoji = match[1]
      if ((emojiData as EmojiMap)[emoji]) {
        tokens.push({
          type: 'emoji',
          raw: match[0],
          text: (emojiData as EmojiMap)[emoji],
          block: false,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [match.index, match.index + match[0].length],
        })
      }
    }

    return tokens
  }

  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]
    return token.text
  }

  public start(src: string): string {
    return src
  }
}
