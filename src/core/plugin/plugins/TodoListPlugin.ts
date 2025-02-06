import { BasePlugin } from '../BasePlugin'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'

/**
 * 待办事项列表插件
 * 支持通过 - [ ] 和 - [x] 语法创建待办事项列表
 */
export class TodoListPlugin extends BasePlugin {
  public name = 'todolist'
  public level: 'block' | 'inline' | 'core' = 'inline'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /^\s*[-*] \[([ xX])\] (.*)/ // 匹配待办事项列表语法
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    // 处理待办事项列表语法
    while ((match = rule.exec(src))) {
      const checked = match[1] !== ' ' // 判断待办事项是否已完成
      const text = match[2].trim() // 获取待办事项文本内容

      tokens.push({
        type: 'todolist',
        raw: match[0],
        text,
        block: false,
        depth: 0,
        attrGet: (name: string) => {
          if (name === 'checked') return checked ? 'true' : 'false'
          return null
        },
        attrSet: () => {},
        attrJoin: () => {},
        children: [],
        map: [0, 0],
      })

      src = src.slice(match[0].length) // 移动源码指针
    }

    return tokens
  }

  /**
   * 渲染器
   * @param tokens Token 数组
   * @param idx 当前 Token 索引
   * @param options 解析选项
   * @param env 环境变量
   * @param self 渲染器实例
   * @returns 渲染后的 HTML 字符串
   */
  public renderer(
    tokens: Token[],
    idx: number,
    options: MarkdownParserOptions,
    env: Record<string, unknown>,
    self: Renderer,
  ): string {
    const token = tokens[idx]
    const checked = token.attrGet('checked') === 'true' // 获取待办事项完成状态
    const textToken: Token = {
      type: 'text',
      raw: token.text,
      text: token.text,
      block: false,
      depth: 0,
      attrGet: () => null,
      attrSet: () => {},
      attrJoin: () => {},
      children: [],
      map: [0, 0],
    }
    const text = self.render([textToken], options, env) // 渲染待办事项文本
    return `<input type="checkbox" ${checked ? 'checked' : ''}>${text}</input>` // 使用 <input> 标签创建待办事项项
  }

  /**
   * 插件开始处理前的钩子函数
   * @param src 源码
   * @returns 处理后的源码
   */
  public start(src: string): string {
    return src
  }
}
