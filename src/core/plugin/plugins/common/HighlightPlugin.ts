import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'
import hljs from 'highlight.js'

export class HighlightPlugin extends BasePlugin {
  public name = 'highlight'
  public level: 'block' | 'inline' | 'core' = 'block'

  public tokenizer(src: string): Token[] {
    const rule = /^```(\w+)?\s*\n([\s\S]+?)\n```/gm
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    while ((match = rule.exec(src))) {
      const language = match[1] || ''
      const code = match[2] || ''

      tokens.push({
        type: 'code',
        raw: match[0],
        text: code,
        block: true,
        depth: 0,
        attrGet: (name: string) => (name === 'lang' ? language : null),
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
    const language = token.attrGet('lang') || ''
    const code = token.text

    if (language && hljs.getLanguage(language)) {
      const highlightedCode = hljs.highlight(code, { language }).value
      return `<pre><code class="hljs language-${language}">${highlightedCode}</code></pre>`
    } else {
      const escapedCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      return `<pre><code>${escapedCode}</code></pre>`
    }
  }

  public start(src: string): string {
    return src
  }
}
