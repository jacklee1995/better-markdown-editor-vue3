// 编辑器光标管理
// src/core/editor/EditorCursor.ts

import type { EditorRef } from './interface'
import * as Monaco from 'monaco-editor'

export class EditorCursor {
  private readonly editor: EditorRef

  constructor(editor: EditorRef) {
    this.editor = editor
  }

  public getPosition(): Monaco.Position {
    return this.editor.getCursor() as Monaco.Position
  }

  public setPosition(pos: Monaco.Position): void {
    this.editor.setCursor(pos)
  }

  public getLine(): number {
    return this.getPosition().lineNumber
  }

  public getColumn(): number {
    return this.getPosition().column
  }

  public getOffset(): number {
    const { lineNumber, column } = this.getPosition()
    const content = this.editor.getValue()
    const lines = content.split('\n')
    let offset = 0
    for (let i = 0; i < lineNumber - 1; i++) {
      offset += lines[i].length + 1
    }
    offset += column
    return offset
  }

  public moveUp(n = 1): void {
    const { lineNumber, column } = this.getPosition()
    this.setPosition(new Monaco.Position(Math.max(lineNumber - n, 1), column))
  }

  public moveDown(n = 1): void {
    const { lineNumber, column } = this.getPosition()
    const lastLine = this.editor.getValue().split('\n').length
    this.setPosition(new Monaco.Position(Math.min(lineNumber + n, lastLine), column))
  }

  public moveLeft(n = 1): void {
    const { lineNumber, column } = this.getPosition()
    if (column === 1) {
      if (lineNumber > 1) {
        const prevLineLength = this.editor.getValue().split('\n')[lineNumber - 2].length
        this.setPosition(new Monaco.Position(lineNumber - 1, prevLineLength + 1))
      }
    } else {
      this.setPosition(new Monaco.Position(lineNumber, Math.max(column - n, 1)))
    }
  }

  public moveRight(n = 1): void {
    const { lineNumber, column } = this.getPosition()
    const lines = this.editor.getValue().split('\n')
    const lineLength = lines[lineNumber - 1].length
    if (column === lineLength + 1) {
      if (lineNumber < lines.length) {
        this.setPosition(new Monaco.Position(lineNumber + 1, 1))
      }
    } else {
      this.setPosition(new Monaco.Position(lineNumber, Math.min(column + n, lineLength + 1)))
    }
  }

  public moveToStart(): void {
    this.setPosition(new Monaco.Position(1, 1))
  }

  public moveToEnd(): void {
    const lines = this.editor.getValue().split('\n')
    const lastLine = lines.length
    this.setPosition(new Monaco.Position(lastLine, lines[lastLine - 1].length + 1))
  }

  public moveToStartOfLine(): void {
    const { lineNumber } = this.getPosition()
    this.setPosition(new Monaco.Position(lineNumber, 1))
  }

  public moveToEndOfLine(): void {
    const { lineNumber } = this.getPosition()
    const lineLength = this.editor.getValue().split('\n')[lineNumber - 1].length
    this.setPosition(new Monaco.Position(lineNumber, lineLength + 1))
  }

  public moveToStartOfWord(): void {
    const { lineNumber, column } = this.getPosition()
    const text = this.editor.getValue().split('\n')[lineNumber - 1]
    let start = column
    while (start > 0 && /\w/.test(text[start - 1])) {
      start--
    }
    this.setPosition(new Monaco.Position(lineNumber, start))
  }

  public moveToEndOfWord(): void {
    const { lineNumber, column } = this.getPosition()
    const text = this.editor.getValue().split('\n')[lineNumber - 1]
    let end = column
    while (end < text.length && /\w/.test(text[end])) {
      end++
    }
    this.setPosition(new Monaco.Position(lineNumber, end))
  }

  public moveToStartOfParagraph(): void {
    const { lineNumber } = this.getPosition()
    let start = lineNumber
    while (start > 0 && !/^\s*$/.test(this.editor.getValue().split('\n')[start - 1])) {
      start--
    }
    this.setPosition(new Monaco.Position(start, 1))
  }

  public moveToEndOfParagraph(): void {
    const lines = this.editor.getValue().split('\n')
    const { lineNumber } = this.getPosition()
    let end = lineNumber
    while (end < lines.length - 1 && !/^\s*$/.test(lines[end + 1])) {
      end++
    }
    this.setPosition(new Monaco.Position(end, lines[end].length + 1))
  }
}
