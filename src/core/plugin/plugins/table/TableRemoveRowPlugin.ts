import { BasePlugin } from '../../BasePlugin'
import type { PluginAPI } from '../../PluginAPI'
import type { MarkdownTransformer } from '../../../markdown/MarkdownTransformer'
import { TableUtils } from './TableUtils'

export class TableRemoveRowPlugin extends BasePlugin {
  public name = 'table-remove-row'
  public level: 'block' | 'inline' | 'core' = 'block'

  private md!: MarkdownTransformer

  public extend(api: PluginAPI): void {
    this.md = api.getMarkdownTransformer()
  }

  public start(src: string): string {
    const lines = src.split('\n')
    const result: string[] = []

    let inTable = false
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (TableUtils.isTableHeader(line)) {
        inTable = true
        result.push(line)
      } else if (inTable && TableUtils.isTableRow(line)) {
        const nextLine = lines[i + 1]
        if (!TableUtils.isTableRow(nextLine)) {
          inTable = false
        } else {
          result.push(line)
        }
      } else {
        inTable = false
        result.push(line)
      }
    }

    return result.join('\n')
  }
}
