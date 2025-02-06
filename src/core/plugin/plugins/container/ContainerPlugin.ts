import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'
import type { PluginAPI } from '../../PluginAPI'
import type { MarkdownTransformer } from '../../../markdown/MarkdownTransformer'

export interface ContainerOptions {
  name: string
  openRender?: (info: string) => string
  closeRender?: (info: string) => string
}

export class ContainerPlugin extends BasePlugin {
  public name = 'container'
  public level: 'block' | 'inline' | 'core' = 'block'

  private containers: ContainerOptions[] = []
  private md!: MarkdownTransformer

  constructor(containers: ContainerOptions[]) {
    super()
    this.containers = containers
  }

  public extend(api: PluginAPI): void {
    this.md = api.getMarkdownTransformer()
  }

  public tokenizer(src: string): Token[] {
    const tokens: Token[] = []
    const rules = this.containers.map((container) => {
      const { name } = container
      const openRule = new RegExp(`^:::+\\s*${name}\\s*([^\\n]*)\\n`)
      const closeRule = new RegExp(`^:::+\\s*${name}\\s*$`)
      return { name, openRule, closeRule }
    })

    let pending = true
    while (pending) {
      pending = false
      for (const { name, openRule, closeRule } of rules) {
        let startMatch: RegExpExecArray | null
        let endMatch: RegExpExecArray | null
        if ((startMatch = openRule.exec(src))) {
          const endIndex = src.indexOf('\n:::')
          if (endIndex !== -1 && (endMatch = closeRule.exec(src.slice(endIndex)))) {
            const text = src.slice(startMatch[0].length, endIndex)
            tokens.push({
              type: `container_${name}_open`,
              raw: startMatch[0],
              text: startMatch[1].trim(),
              block: true,
              depth: 0,
              attrGet: () => null,
              attrSet: () => {},
              attrJoin: () => {},
              children: [],
              map: [0, startMatch[0].length],
            })
            tokens.push({
              type: `container_${name}_close`,
              raw: endMatch[0],
              text: '',
              block: true,
              depth: 0,
              attrGet: () => null,
              attrSet: () => {},
              attrJoin: () => {},
              children: this.md.parse(text),
              map: [endIndex, endIndex + endMatch[0].length],
            })
            src = src.slice(endIndex + endMatch[0].length)
            pending = true
            break
          }
        }
      }
    }

    return tokens
  }

  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]
    const [, name] = token.type.match(/^container_(\w+)_open$/) || []
    const container = this.containers.find((c) => c.name === name)
    if (container) {
      const { openRender, closeRender } = container
      const openToken = token
      const closeToken = tokens[idx + 1]
      const openHtml = openRender ? openRender(openToken.text) : `<div class="${name}">`
      const closeHtml = closeRender ? closeRender(openToken.text) : '</div>'
      const innerHtml = this.md.renderToHtml(closeToken.children)
      return `${openHtml}${innerHtml}${closeHtml}`
    }
    return ''
  }

  public start(src: string): string {
    return src
  }
}
