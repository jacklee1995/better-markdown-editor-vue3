import type { Token } from '../../../markdown/interface'
import { TableCell } from './TableCell'

export class TableRow implements Token {
  public type = 'table_row'
  public raw = ''
  public text = ''
  public block = true
  public depth = 0
  public map: [number, number] = [0, 0]

  public cells: TableCell[][] = []
  public children: Token[] = []

  public attrGet(): null {
    return null
  }

  public attrSet(): void {
    // do nothing
  }

  public attrJoin(): void {
    // do nothing
  }

  public static parse(raw: string, align: ('left' | 'center' | 'right' | null)[]): TableRow {
    const row = new TableRow()
    row.raw = raw
    row.cells = [
      raw
        .split('|')
        .slice(1, -1)
        .map((text, index) => TableCell.parse(text.trim(), align[index])),
    ]
    return row
  }

  public render(): string {
    let html = '<tr>\n'
    for (const cell of this.cells[0]) {
      html += cell.render()
    }
    html += '</tr>\n'
    return html
  }
}
