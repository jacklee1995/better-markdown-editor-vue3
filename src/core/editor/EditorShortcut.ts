// 编辑器快捷键
// src/core/editor/EditorShortcut.ts

import type { EditorRef } from './interface'
import { EditorCommand } from './EditorCommand'

export class EditorShortcut {
  private readonly editor: EditorRef
  private readonly command: EditorCommand

  constructor(editor: EditorRef, command: EditorCommand) {
    this.editor = editor
    this.command = command
  }

  public attach(): void {
    // this.editor.setOption('extraKeys', this.getShortcuts())
  }
}
