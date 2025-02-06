import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'

export class HrPlugin extends BasePlugin {
  public name = 'hr'
  public level: 'block' | 'inline' | 'core' = 'block'

  public tokenizer(src: string): Token[] {
    const rule = /^(?:(?:\*[ ]?){3,}|(?:_[ ]?){3,}|(?:-[ ]?){3,})(?:\n+|$)/
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    while ((match = rule.exec(src))) {
      tokens.push({
        type: 'hr',
        raw: match[0],
        text: '',
        block: true,
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

  /**
   * 渲染分隔线
   * @param tokens Token 列表
   * @param idx 当前 Token 的索引
   * @returns 渲染后的 HTML 字符串
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public renderer(tokens: Token[], idx: number): string {
    // 直接返回一个固定的 HTML 字符串,不依赖其他 token 或 token 索引
    return '<hr />\n'
  }

  public start(src: string): string {
    return src
  }
}
