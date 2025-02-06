import { BasePlugin } from '../BasePlugin'
import type { MarkdownParserOptions, Token, Renderer } from '../../markdown/interface'

/**
 * 任务列表插件
 * 支持通过 - [ ] 和 - [x] 语法创建任务列表
 */
export class TaskListPlugin extends BasePlugin {
  public name = 'tasklist'
  public level: 'block' | 'inline' | 'core' = 'block'

  /**
   * 分词器
   * @param src 源码
   * @returns Token 数组
   */
  public tokenizer(src: string): Token[] {
    const rule = /^\s*[-*] \[([ xX])\] (.*)/ // 匹配任务列表语法
    let match: RegExpExecArray | null
    const tokens: Token[] = []

    // 处理任务列表语法
    while ((match = rule.exec(src))) {
      const checked = match[1] !== ' ' // 判断任务是否已完成
      const text = match[2].trim() // 获取任务文本内容

      tokens.push({
        type: 'task_list_item',
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
    const checked = token.attrGet('checked') === 'true' // 获取任务完成状态
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
    const text = self.render([textToken], options, env) // 渲染任务文本
    return `<li class="task-list-item"><input type="checkbox" disabled${checked ? ' checked' : ''}>${text}</li>\n` // 使用 <li> 和 <input> 标签创建任务列表项
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
