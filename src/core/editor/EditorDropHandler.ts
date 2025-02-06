// 编辑器拖拽处理
// src/core/editor/EditorDropHandler.ts

import type { EditorRef } from './interface'

export class EditorDropHandler {
  private readonly editor: EditorRef

  constructor(editor: EditorRef) {
    this.editor = editor
    this.handleDrop = this.handleDrop.bind(this)
  }

  public attach(): void {
    const wrapperElement = this.editor.getWrapperElement()
    if (wrapperElement) {
      wrapperElement.addEventListener('drop', this.handleDrop)
    }
  }

  public detach(): void {
    const wrapperElement = this.editor.getWrapperElement()
    if (wrapperElement) {
      wrapperElement.removeEventListener('drop', this.handleDrop)
    }
  }

  private async handleDrop(event: DragEvent): Promise<void> {
    event.preventDefault()
    event.stopPropagation()

    if (event.dataTransfer) {
      const { files } = event.dataTransfer
      const text = event.dataTransfer.getData('text/plain')

      if (files.length > 0) {
        await this.handleFiles(files)
      } else if (typeof text === 'string') {
        await this.handleText(text)
      }
    }
  }

  private async handleFiles(files: FileList): Promise<void> {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (/^image\//.test(file.type)) {
        await this.insertImage(file)
      } else {
        await this.insertAttachment(file)
      }
    }
  }

  /**
   * 插入图片
   * @param file 图片文件
   */
  private async insertImage(file: File): Promise<void> {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const url = reader.result as string
      const name = file.name
      const text = `![${name}](${url})`
      this.editor.replaceSelection(text)
    }
  }

  /**
   * 插入附件
   * @param file 附件文件
   */
  private async insertAttachment(file: File): Promise<void> {
    // 生成附件链接
    const url = URL.createObjectURL(file)
    const name = file.name
    const text = `[${name}](${url})`

    // 插入附件链接
    this.editor.replaceSelection(text)

    // 释放 URL 对象
    URL.revokeObjectURL(url)
  }

  /**
   * 处理文本拖拽
   * @param text 文本内容
   */
  private async handleText(text: string): Promise<void> {
    if (/^https?:\/\//.test(text)) {
      await this.insertLink(text)
    } else {
      await this.insertPlainText(text)
    }
  }

  /**
   * 插入链接
   * @param url 链接地址
   */
  private async insertLink(url: string): Promise<void> {
    const selection = this.editor.getSelection()
    const text = selection || url
    const link = `[${text}](${url})`
    this.editor.replaceSelection(link)
  }

  /**
   * 插入纯文本
   * @param text 文本内容
   */
  private async insertPlainText(text: string): Promise<void> {
    this.editor.replaceSelection(text)
  }
}
