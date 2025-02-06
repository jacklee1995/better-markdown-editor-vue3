import { TableRow } from './TableRow'

export interface TableHeaderOptions {
  sortable?: boolean
  sortIcon?: string
}

export class TableHeader {
  public row: TableRow
  public options: TableHeaderOptions

  private constructor(row: TableRow, options: TableHeaderOptions) {
    this.row = row
    this.options = options
  }

  public static create(row: TableRow, options: TableHeaderOptions): TableHeader {
    return new TableHeader(row, options)
  }

  public render(): string {
    const { sortable, sortIcon } = this.options

    let html = '<thead>\n'
    html += '<tr>\n'
    for (const cells of this.row.cells) {
      for (const cell of cells) {
        html += '<th'
        if (cell.align && cell.align[0]) {
          html += ` align="${cell.align[0]}"`
        }
        if (sortable) {
          html += ` class="sortable"`
        }
        html += `>${cell.text}`
        if (sortable) {
          html += ` <span class="sort-icon">${sortIcon}</span>`
        }
        html += '</th>\n'
      }
    }
    html += '</tr>\n'
    html += '</thead>\n'

    return html
  }
}
