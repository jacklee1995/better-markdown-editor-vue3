// 编辑器输入处理
// src/core/editor/EditorInputHandler.ts

import type { EditorRef } from './interface'
import { EditorHistory } from './EditorHistory'

export class EditorInputHandler {
  private readonly editor: EditorRef
  private readonly history: EditorHistory

  constructor(editor: EditorRef, history: EditorHistory) {
    this.editor = editor
    this.history = history

    this.handleBeforeChange = this.handleBeforeChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectionChange = this.handleSelectionChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handlePaste = this.handlePaste.bind(this)
  }

  public attach(): void {
    const onDidChangeModelContent = this.editor.onDidChangeModelContent
    const onDidChangeCursorSelection = this.editor.onDidChangeCursorSelection
    const onKeyDown = this.editor.onKeyDown
    const onPaste = this.editor.onPaste

    if (onDidChangeModelContent) {
      onDidChangeModelContent(this.handleChange)
    }
    if (onDidChangeCursorSelection) {
      onDidChangeCursorSelection(this.handleSelectionChange)
    }
    if (onKeyDown) {
      onKeyDown(this.handleKeyDown)
    }
    if (onPaste) {
      onPaste(this.handlePaste)
    }
  }

  public detach(): void {
    const offDidChangeModelContent = this.editor.offDidChangeModelContent
    const offDidChangeCursorSelection = this.editor.offDidChangeCursorSelection
    const offKeyDown = this.editor.offKeyDown
    const offPaste = this.editor.offPaste

    if (offDidChangeModelContent) {
      offDidChangeModelContent(this.handleChange)
    }
    if (offDidChangeCursorSelection) {
      offDidChangeCursorSelection(this.handleSelectionChange)
    }
    if (offKeyDown) {
      offKeyDown(this.handleKeyDown)
    }
    if (offPaste) {
      offPaste(this.handlePaste)
    }
  }

  private handleBeforeChange(): void {
    // TODO: Implement auto completion, suggestion, etc.
  }

  private handleChange(): void {
    this.history.captureCurrent()
  }

  private handleSelectionChange(): void {
    // TODO: Update toolbar status, highlight selection, etc.
  }

  private handleKeyDown(): void {
    // TODO: Handle keyboard shortcuts, auto indent, etc.
  }

  private handlePaste(): void {
    // TODO: Handle paste, filter content, convert HTML to Markdown, etc.
  }
}
