import { BasePlugin } from '../../BasePlugin'
import type { PluginAPI } from '../../PluginAPI'
import type { MarkdownTransformer } from '../../../markdown/MarkdownTransformer'
import { TableUtils } from './TableUtils'

export class TableAddRowPlugin extends BasePlugin {
  public name = 'table-add-row'
  public level: 'block' | 'inline' | 'core' = 'block'

  private md!: MarkdownTransformer

  public extend(api: PluginAPI): void {
    this.md = api.getMarkdownTransformer()
  }

  public start(src: string): string {
    const lines = src.split('\n')
    const result: string[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      result.push(line)

      if (TableUtils.isTableRow(line)) {
        const nextLine = lines[i + 1]
        if (!nextLine || !TableUtils.isTableRow(nextLine)) {
          const cells = line.split('|').slice(1, -1).length
          const emptyRow = `|${' |'.repeat(cells)}`
          result.push(TableUtils.normalizeRow(emptyRow))
        }
      }
    }

    return result.join('\n')
  }
}
