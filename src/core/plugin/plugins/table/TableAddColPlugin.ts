import { BasePlugin } from '../../BasePlugin'
import type { PluginAPI } from '../../PluginAPI'
import type { MarkdownTransformer } from '../../../markdown/MarkdownTransformer'
import { TableUtils } from './TableUtils'

export class TableAddColPlugin extends BasePlugin {
  public name = 'table-add-col'
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
        result.push(TableUtils.normalizeRow(line + ' |'))
      } else {
        result.push(line)
      }
    }

    return result.join('\n')
  }
}
