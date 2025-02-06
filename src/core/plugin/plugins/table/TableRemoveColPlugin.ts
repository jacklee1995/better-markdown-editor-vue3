import { BasePlugin } from '../../BasePlugin'
import type { PluginAPI } from '../../PluginAPI'
import type { MarkdownTransformer } from '../../../markdown/MarkdownTransformer'
import { TableUtils } from './TableUtils'

export class TableRemoveColPlugin extends BasePlugin {
  public name = 'table-remove-col'
  public level: 'block' | 'inline' | 'core' = 'block'

  private md!: MarkdownTransformer

  public extend(api: PluginAPI): void {
    this.md = api.getMarkdownTransformer()
  }

  public start(src: string): string {
    const lines = src.split('\n')
    const result: string[] = []

    for (const line of lines) {
      if (TableUtils.isTableRow(line)) {
        const cells = line.split('|').slice(1, -1)
        cells.pop()
        result.push(TableUtils.normalizeRow(`| ${cells.join(' | ')} |`))
      } else {
        result.push(line)
      }
    }

    return result.join('\n')
  }
}
