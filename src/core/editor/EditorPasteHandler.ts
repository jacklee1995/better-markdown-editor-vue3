// 编辑器粘贴处理
// src/core/editor/EditorPasteHandler.ts

import type { EditorRef } from './interface'

export class EditorPasteHandler {
  private readonly editor: EditorRef

  constructor(editor: EditorRef) {
    this.editor = editor
    this.handlePaste = this.handlePaste.bind(this)
  }

  public attach(): void {
    const wrapperElement = this.editor.getWrapperElement()
    if (wrapperElement) {
      wrapperElement.addEventListener('paste', this.handlePaste)
    }
  }

  public detach(): void {
    const wrapperElement = this.editor.getWrapperElement()
    if (wrapperElement) {
      wrapperElement.removeEventListener('paste', this.handlePaste)
    }
  }

  private async handlePaste(event: ClipboardEvent): Promise<void> {
    const text = event.clipboardData?.getData('text/plain')
    const html = event.clipboardData?.getData('text/html')

    if (text) {
      await this.insertPlainText(text)
    } else if (html) {
      await this.insertHtml(html)
    }
  }

  private async insertPlainText(text: string): Promise<void> {
    this.editor.replaceSelection(text)
  }

  private async insertHtml(html: string): Promise<void> {
    const markdown = await this.convertHtmlToMarkdown(html)
    this.editor.replaceSelection(markdown)
  }

  private async convertHtmlToMarkdown(html: string): Promise<string> {
    // TODO: Implement HTML to Markdown conversion
    return html
  }
}
