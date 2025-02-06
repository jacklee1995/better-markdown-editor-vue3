import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'
import { isTaskListItem, isTaskListItemChecked, extractTaskListItemContent } from './TaskListUtils'

export class TaskListPlugin extends BasePlugin {
  public name = 'tasklist'
  public level: 'block' | 'inline' | 'core' = 'block'

  public tokenizer(src: string): Token[] {
    const tokens: Token[] = []
    const lines = src.split('\n')

    for (const line of lines) {
      if (isTaskListItem(line)) {
        const checked = isTaskListItemChecked(line)
        const content = extractTaskListItemContent(line)

        tokens.push({
          type: 'task_list_item',
          raw: line,
          text: content,
          block: false,
          depth: 0,
          attrGet: (name: string) => {
            if (name === 'checked') {
              return checked ? 'true' : 'false'
            }
            return null
          },
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [0, 0],
        })
      }
    }

    return tokens
  }

  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]
    const checked = token.attrGet('checked') === 'true'
    const content = token.text

    return `<TaskListItem checked={${checked}}>${content}</TaskListItem>`
  }

  public start(src: string): string {
    return src
  }
}
