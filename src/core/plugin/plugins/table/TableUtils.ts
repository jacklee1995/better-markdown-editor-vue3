export class TableUtils {
  public static isTableHeader(text: string): boolean {
    return /^[|:-]+$/.test(text.trim())
  }

  public static isTableRow(text: string): boolean {
    return /^\|.+\|$/.test(text.trim())
  }

  public static parseHeaderAlign(text: string): ('left' | 'center' | 'right' | null)[] {
    const align: ('left' | 'center' | 'right' | null)[] = []
    const cells = text.split('|').slice(1, -1)
    for (const cell of cells) {
      const trimmed = cell.trim()
      if (trimmed.startsWith(':') && trimmed.endsWith(':')) {
        align.push('center')
      } else if (trimmed.startsWith(':')) {
        align.push('left')
      } else if (trimmed.endsWith(':')) {
        align.push('right')
      } else {
        align.push(null)
      }
    }
    return align
  }

  public static normalizeRow(row: string): string {
    const cells = row.split('|').slice(1, -1)
    const normalized = cells.map((cell) => cell.trim()).join(' | ')
    return `| ${normalized} |`
  }
}
