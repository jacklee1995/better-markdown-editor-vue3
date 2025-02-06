import { BasePlugin } from '../../BasePlugin'
import type { Token } from '../../../markdown/interface'
import type { PluginAPI } from '../../PluginAPI'
import type { MarkdownTransformer } from '../../../markdown/MarkdownTransformer'
import { TableRow } from './TableRow'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { TableUtils } from './TableUtils'

export interface TableOptions {
  /**
   * 是否启用斑马纹效果
   * @default true
   */
  stripe?: boolean

  /**
   * 是否启用边框
   * @default false
   */
  border?: boolean

  /**
   * 是否启用响应式布局
   * @default false
   */
  responsive?: boolean

  /**
   * 表格的最小宽度,单位为 px
   * @default 400
   */
  minWidth?: number

  /**
   * 是否启用排序功能
   * @default false
   */
  sortable?: boolean

  /**
   * 排序图标的 HTML 内容
   */
  sortIcon?: string

  /**
   * 是否启用单元格合并功能
   * @default false
   */
  spannable?: boolean
}

export class TablePlugin extends BasePlugin {
  public name = 'table'
  public level: 'block' | 'inline' | 'core' = 'block'

  private options: TableOptions
  private md!: MarkdownTransformer

  constructor(options?: TableOptions) {
    super()
    this.options = {
      stripe: true,
      border: false,
      responsive: false,
      minWidth: 400,
      sortable: false,
      sortIcon: '▼',
      spannable: false,
      ...options,
    }
  }

  public extend(api: PluginAPI): void {
    this.md = api.getMarkdownTransformer()
  }

  public tokenizer(src: string): Token[] {
    const tokens: Token[] = []
    const lines = src.split('\n')
    let table: Token | null = null
    let align: ('left' | 'center' | 'right' | null)[] = []

    for (const line of lines) {
      if (TableUtils.isTableHeader(line)) {
        if (table) {
          tokens.push(table)
          table = null
          align = []
        }
        table = {
          type: 'table',
          raw: line,
          text: '',
          block: true,
          depth: 0,
          attrGet: () => null,
          attrSet: () => {},
          attrJoin: () => {},
          children: [],
          map: [0, 0],
        }
        align = TableUtils.parseHeaderAlign(line)
      } else if (table && TableUtils.isTableRow(line)) {
        const row = TableRow.parse(line, align)
        table.children.push(row)
      } else {
        if (table) {
          tokens.push(table)
          table = null
          align = []
        }
      }
    }

    if (table) {
      tokens.push(table)
    }

    return tokens
  }

  public renderer(tokens: Token[], idx: number): string {
    const token = tokens[idx]
    const { stripe, border, responsive, minWidth, sortable, sortIcon, spannable } = this.options

    const headerRow = token.children[0]
    if (!(headerRow instanceof TableRow)) {
      throw new Error('Table header must be a TableRow instance')
    }
    const header = TableHeader.create(headerRow, {
      sortable,
      sortIcon,
    })

    const bodyRows = token.children.slice(1)
    if (!bodyRows.every((row) => row instanceof TableRow)) {
      throw new Error('Table body must be an array of TableRow instances')
    }
    const body = TableBody.create(bodyRows as TableRow[], {
      stripe,
      spannable,
    })

    let html = `<div class="table-wrapper"${responsive ? ` style="min-width: ${minWidth}px;"` : ''}>\n`
    html += `<table${border ? ' class="table-bordered"' : ''}>\n`
    html += header.render()
    html += body.render()
    html += '</table>\n'
    html += '</div>\n'

    return html
  }

  public start(src: string): string {
    return src
  }
}
