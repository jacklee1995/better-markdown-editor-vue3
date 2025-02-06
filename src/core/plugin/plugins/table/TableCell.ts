import type { Token } from '../../../markdown/interface'

export class TableCell implements Token {
  public type = 'table_cell'
  public raw = ''
  public text = ''
  public block = false
  public depth = 0
  public map: [number, number] = [0, 0]
  public children: Token[] = []

  public align?: ('left' | 'center' | 'right' | null)[]
  public colspan = 1
  public rowspan = 1

  public attrGet(): null {
    return null
  }

  public attrSet(): void {
    // do nothing
  }

  public attrJoin(): void {
    // do nothing
  }

  public static parse(text: string, align: 'left' | 'center' | 'right' | null): TableCell {
    const cell = new TableCell()
    cell.raw = text
    cell.text = text
    cell.align = [align]
    return cell
  }

  public render(): string {
    const attrs: string[] = []
    if (this.align && this.align[0]) {
      attrs.push(` align="${this.align[0]}"`)
    }
    if (this.colspan > 1) {
      attrs.push(` colspan="${this.colspan}"`)
    }
    if (this.rowspan > 1) {
      attrs.push(` rowspan="${this.rowspan}"`)
    }
    return `<td${attrs.join('')}>${this.text}</td>\n`
  }
}
