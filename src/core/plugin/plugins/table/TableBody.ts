import { TableRow } from './TableRow'

export interface TableBodyOptions {
  stripe?: boolean
  spannable?: boolean
}

export class TableBody {
  public rows: TableRow[]
  public options: TableBodyOptions

  private constructor(rows: TableRow[], options: TableBodyOptions) {
    this.rows = rows
    this.options = options
  }

  public static create(rows: TableRow[], options: TableBodyOptions): TableBody {
    return new TableBody(rows, options)
  }

  public render(): string {
    const { stripe, spannable } = this.options

    let html = '<tbody>\n'
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i]
      html += '<tr'
      if (stripe && i % 2 === 1) {
        html += ' class="stripe"'
      }
      html += '>\n'
      for (const cells of row.cells) {
        for (const cell of cells) {
          if (spannable && cell.colspan > 1) {
            html += `<td colspan="${cell.colspan}">${cell.text}</td>\n`
          } else if (spannable && cell.rowspan > 1) {
            html += `<td rowspan="${cell.rowspan}">${cell.text}</td>\n`
          } else {
            html += `<td>${cell.text}</td>\n`
          }
        }
      }
      html += '</tr>\n'
    }
    html += '</tbody>\n'

    return html
  }
}
