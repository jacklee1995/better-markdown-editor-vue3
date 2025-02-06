// 编辑器历史记录管理
// src/core/editor/EditorHistory.ts

import type { EditorRef } from './interface'
import * as Monaco from 'monaco-editor'

interface HistoryState {
  content: string
  cursor: Monaco.Position
}

export class EditorHistory {
  private readonly editor: EditorRef
  private readonly maxSize: number
  private readonly states: HistoryState[]
  private currentIndex: number

  constructor(editor: EditorRef, maxSize = 100) {
    this.editor = editor
    this.maxSize = maxSize
    this.states = []
    this.currentIndex = -1

    this.captureCurrent()
  }

  public undo(): void {
    if (this.canUndo()) {
      this.currentIndex--
      this.restoreState(this.states[this.currentIndex])
    }
  }

  public redo(): void {
    if (this.canRedo()) {
      this.currentIndex++
      this.restoreState(this.states[this.currentIndex])
    }
  }

  public canUndo(): boolean {
    return this.currentIndex > 0
  }

  public canRedo(): boolean {
    return this.currentIndex < this.states.length - 1
  }

  public captureCurrent(): void {
    const content = this.editor.getValue()
    const cursor = this.editor.getCursor() as Monaco.Position

    if (this.isDifferentFromCurrent(content, cursor)) {
      this.states.splice(this.currentIndex + 1)
      this.states.push({ content, cursor })

      if (this.states.length > this.maxSize) {
        this.states.shift()
      }

      this.currentIndex = this.states.length - 1
    }
  }

  private isDifferentFromCurrent(content: string, cursor: Monaco.Position): boolean {
    if (this.currentIndex < 0) {
      return true
    }

    const currentState = this.states[this.currentIndex]
    return (
      content !== currentState.content ||
      cursor.lineNumber !== currentState.cursor.lineNumber ||
      cursor.column !== currentState.cursor.column
    )
  }

  private restoreState(state: HistoryState): void {
    this.editor.setValue(state.content)
    this.editor.setCursor(state.cursor)
  }
}
