// 编辑器状态管理
// src/core/editor/EditorState.ts

import * as Monaco from 'monaco-editor'

import type { EditorRef } from './interface'
import { EditorHistory } from './EditorHistory'
import { EditorCursor } from './EditorCursor'
import { EditorSelection } from './EditorSelection'
import { EditorScroll } from './EditorScroll'
import { EditorCommand } from './EditorCommand'
import { EditorShortcut } from './EditorShortcut'
import { EditorKeymap } from './EditorKeymap'
import { EditorInputHandler } from './EditorInputHandler'
import { EditorDropHandler } from './EditorDropHandler'
import { EditorPasteHandler } from './EditorPasteHandler'

export class EditorState {
  public readonly editor: EditorRef
  public readonly history: EditorHistory
  public readonly cursor: EditorCursor
  public readonly selection: EditorSelection
  public readonly scroll: EditorScroll
  public readonly command: EditorCommand
  public readonly shortcut: EditorShortcut
  public readonly keymap: EditorKeymap
  public readonly inputHandler: EditorInputHandler
  public readonly dropHandler: EditorDropHandler
  public readonly pasteHandler: EditorPasteHandler

  constructor(editor: EditorRef) {
    this.editor = editor
    this.history = new EditorHistory(editor)
    this.cursor = new EditorCursor(editor)
    this.selection = new EditorSelection(editor)
    this.scroll = new EditorScroll(editor)
    this.command = new EditorCommand(editor)
    this.shortcut = new EditorShortcut(editor, this.command)
    this.keymap = new EditorKeymap(editor, this.command)
    this.inputHandler = new EditorInputHandler(editor, this.history)
    this.dropHandler = new EditorDropHandler(editor)
    this.pasteHandler = new EditorPasteHandler(editor)
  }

  public attach(): void {
    this.shortcut.attach()
    this.keymap.attach()
    this.inputHandler.attach()
    this.dropHandler.attach()
    this.pasteHandler.attach()
  }

  public detach(): void {
    this.inputHandler.detach()
    this.dropHandler.detach()
    this.pasteHandler.detach()
  }

  public getValue(): string {
    return this.editor.getValue()
  }

  public setValue(value: string): void {
    this.editor.setValue(value)
  }

  public getSelection(): string {
    return this.selection.getSelection()
  }

  public replaceSelection(replacement: string): void {
    this.selection.replaceSelection(replacement)
  }

  public focus(): void {
    this.editor.focus()
  }

  public blur(): void {
    this.editor.blur()
  }

  public undo(): void {
    this.history.undo()
  }

  public redo(): void {
    this.history.redo()
  }

  public scrollToLine(line: number): void {
    this.scroll.scrollToLine(line)
  }

  public scrollToPosition(position: Monaco.IPosition): void {
    this.scroll.setScrollPosition({ scrollLeft: position.column, scrollTop: position.lineNumber })
  }

  public getCursor(): { line: number; ch: number } {
    const { lineNumber, column } = this.cursor.getPosition()
    return { line: lineNumber, ch: column }
  }

  public setCursor(position: { line: number; ch: number }): void {
    this.cursor.setPosition(new Monaco.Position(position.line, position.ch))
  }
}
