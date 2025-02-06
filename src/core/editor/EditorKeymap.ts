// 编辑器按键映射配置
// src/core/editor/EditorKeymap.ts

import type { EditorRef } from './interface'
import { EditorCommand } from './EditorCommand'

export class EditorKeymap {
  private readonly editor: EditorRef
  private readonly command: EditorCommand

  constructor(editor: EditorRef, command: EditorCommand) {
    this.editor = editor
    this.command = command
  }

  public attach(): void {
    this.editor.onKeyDown((e: KeyboardEvent) => {
      if (e.code === 'KeyZ' && e.ctrlKey) {
        this.command.undo()
      } else if (e.code === 'KeyZ' && e.ctrlKey && e.shiftKey) {
        this.command.redo()
      } else if (e.code === 'KeyY' && e.ctrlKey) {
        this.command.redo()
      } else if (e.code === 'KeyF' && e.altKey) {
        this.command.find()
      } else if (e.code === 'KeyF' && e.ctrlKey) {
        this.command.find()
      } else if (e.code === 'KeyH' && e.ctrlKey) {
        this.command.replace()
      }
    })
  }
}
