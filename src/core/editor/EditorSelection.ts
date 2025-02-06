// 编辑器选区管理
// src/core/editor/EditorSelection.ts

import type { EditorRef } from './interface'
import * as Monaco from 'monaco-editor'

export class EditorSelection {
  private readonly editor: EditorRef

  constructor(editor: EditorRef) {
    this.editor = editor
  }

  /**
   * 获取编辑器选中的文本内容
   * @returns 选中的文本内容
   */
  public getSelection(): string {
    return this.editor.getSelection() || ''
  }

  /**
   * 设置编辑器选区
   * @param anchor 选区起始位置
   * @param head 选区结束位置,默认与起始位置相同
   */
  public setSelection(anchor: Monaco.Position, head?: Monaco.Position): void {
    const range = head
      ? new Monaco.Range(anchor.lineNumber, anchor.column, head.lineNumber, head.column)
      : new Monaco.Range(anchor.lineNumber, anchor.column, anchor.lineNumber, anchor.column)
    this.editor.setSelection(range as Monaco.IRange)
  }

  /**
   * 替换编辑器选中的文本内容
   * @param replacement 替换的文本内容
   */
  public replaceSelection(replacement: string): void {
    this.editor.replaceSelection(replacement)
  }

  /**
   * 全选编辑器内容
   */
  public selectAll(): void {
    const model = this.editor.getModel()
    if (model) {
      const endLineNumber = model.getLineCount()
      const endColumn = model.getLineMaxColumn(endLineNumber)
      this.setSelection(new Monaco.Position(1, 1), new Monaco.Position(endLineNumber, endColumn))
    }
  }

  /**
   * 选中某一行内容
   * @param line 行号,从1开始
   */
  public selectLine(line: number): void {
    const model = this.editor.getModel()
    if (model) {
      const position = new Monaco.Position(line, model.getLineFirstNonWhitespaceColumn(line))
      const endPosition = new Monaco.Position(line, model.getLineLastNonWhitespaceColumn(line))
      this.setSelection(position, endPosition)
    }
  }

  /**
   * 选中指定范围内容
   * @param from 起始位置
   * @param to 结束位置
   */
  public selectRange(from: Monaco.Position, to: Monaco.Position): void {
    this.setSelection(from, to)
  }

  /**
   * 选中指定位置单词
   * @param position 位置
   */
  public selectWord(position: Monaco.Position): void {
    const model = this.editor.getModel()
    if (model) {
      const word = model.getWordAtPosition(position)
      if (word) {
        this.setSelection(
          new Monaco.Position(position.lineNumber, word.startColumn),
          new Monaco.Position(position.lineNumber, word.endColumn),
        )
      }
    }
  }

  /**
   * 选中指定位置单词
   * @param position 位置
   */
  public selectWordAt(position: Monaco.Position): void {
    this.selectWord(position)
  }

  /**
   * 选中指定标记内容
   * @param marker 标记
   */
  public selectMarker(marker: Monaco.editor.IMarker): void {
    const range = new Monaco.Range(
      marker.startLineNumber,
      marker.startColumn,
      marker.endLineNumber,
      marker.endColumn,
    )
    this.editor.setSelection(range as Monaco.IRange)
  }

  /**
   * 获取编辑器选区范围
   * @returns 选区范围,如果没有选区则返回null
   */
  public getSelectionRange(): Monaco.Range | null {
    const selectionStr = this.editor.getSelection()
    if (!selectionStr) {
      return null
    }
    const [startStr, endStr] = selectionStr.split(' -> ')
    if (!startStr || !endStr) {
      return null
    }
    const [startLineNumber, startColumn] = startStr.substring(1).split(':').map(Number)
    const [endLineNumber, endColumn] = endStr
      .substring(0, endStr.length - 1)
      .split(':')
      .map(Number)
    return new Monaco.Range(startLineNumber, startColumn, endLineNumber, endColumn)
  }

  /**
   * 获取编辑器选区标记
   * @returns 选区标记,如果没有选区则返回null
   */
  public getSelectionMarker(): Monaco.editor.IMarker | null {
    const range = this.getSelectionRange()
    if (range) {
      return {
        startLineNumber: range.startLineNumber,
        startColumn: range.startColumn,
        endLineNumber: range.endLineNumber,
        endColumn: range.endColumn,
        severity: Monaco.MarkerSeverity.Hint,
        message: 'Selection',
        owner: 'editor',
        resource: Monaco.Uri.parse('inmemory://model/1'),
      }
    }
    return null
  }

  /**
   * 获取编辑器选区起始位置
   * @returns 选区起始位置,如果没有选区则返回null
   */
  public getSelectionStart(): Monaco.Position | null {
    const range = this.getSelectionRange()
    return range ? range.getStartPosition() : null
  }

  /**
   * 获取编辑器选区结束位置
   * @returns 选区结束位置,如果没有选区则返回null
   */
  public getSelectionEnd(): Monaco.Position | null {
    const range = this.getSelectionRange()
    return range ? range.getEndPosition() : null
  }

  /**
   * 获取编辑器选区起始行号
   * @returns 选区起始行号,如果没有选区则返回null
   */
  public getSelectionLine(): number | null {
    const range = this.getSelectionRange()
    return range ? range.startLineNumber : null
  }

  /**
   * 获取编辑器选区起始位置
   * @returns 选区起始位置,如果没有选区则返回null
   */
  public getSelectionLineStart(): Monaco.Position | null {
    const range = this.getSelectionRange()
    return range ? range.getStartPosition() : null
  }

  /**
   * 获取编辑器选区结束位置
   * @returns 选区结束位置,如果没有选区则返回null
   */
  public getSelectionLineEnd(): Monaco.Position | null {
    const range = this.getSelectionRange()
    if (range) {
      const model = this.editor.getModel()
      if (model) {
        const lineNumber = range.endLineNumber
        const column = model.getLineMaxColumn(lineNumber)
        return new Monaco.Position(lineNumber, column)
      }
    }
    return null
  }

  /**
   * 判断编辑器选区是否为空
   * @returns 如果选区为空则返回true,否则返回false
   */
  public isSelectionEmpty(): boolean {
    return this.editor.isSelectionEmpty()
  }
}
