import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'

export class ClearFormatPlugin extends BasePlugin {
  public name = 'clear_format'
  public level: 'block' | 'inline' | 'core' = 'inline'

  public tokenizer(src: string): Token[] {
    const tokens: Token[] = []
    const rule = /(\*{1,2}|_{1,2}|~{1,2}|`)[^*_~`]+?\1/g
    let match: RegExpExecArray | null

    while ((match = rule.exec(src))) {
      tokens.push({
        type: 'clear_format',
        raw: match[0],
        text: match[0],
        block: false,
        depth: 0,
        attrGet: () => null,
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
    let text = token.text

    // 移除加粗、斜体、删除线、行内代码
    text = text.replace(/(\*{1,2}|_{1,2}|~{1,2}|`)[^*_~`]+?\1/g, (match, p1) => {
      return match.slice(p1.length, -p1.length)
    })

    return text
  }

  public start(src: string): string {
    return src
  }
}
