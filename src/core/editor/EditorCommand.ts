// 编辑器命令
// src/core/editor/EditorCommand.ts

import type { EditorCommandFunctions, EditorRef } from './interface'
import * as Monaco from 'monaco-editor'

export class EditorCommand implements EditorCommandFunctions {
  private readonly editor: EditorRef

  constructor(editor: EditorRef) {
    this.editor = editor
  }

  /**
   * 聚焦编辑器
   */
  public focus() {
    this.editor.focus()
  }

  /**
   * 失焦编辑器
   */
  public blur() {
    this.editor.blur()
  }

  /**
   * 格式化选中文本
   * @param mode 格式化模式
   */
  public format(
    mode: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code' | 'link' | 'image',
  ) {
    const selection = this.editor.getSelection()
    if (selection) {
      let replacement = selection
      switch (mode) {
        case 'bold':
          replacement = `**${selection}**`
          break
        case 'italic':
          replacement = `*${selection}*`
          break
        case 'underline':
          replacement = `<u>${selection}</u>`
          break
        case 'strikethrough':
          replacement = `~~${selection}~~`
          break
        case 'code':
          replacement = `\`${selection}\``
          break
        case 'link':
          replacement = `[${selection}](url)`
          break
        case 'image':
          replacement = `![${selection}](url)`
          break
      }
      this.editor.replaceSelection(replacement)
    }
  }

  /**
   * 撤销上一步操作
   */
  public undo() {
    this.editor.undo()
  }

  /**
   * 重做下一步操作
   */
  public redo() {
    this.editor.redo()
  }

  /**
   * 插入标题
   * @param level 标题级别
   */
  public heading(level: number) {
    const prefix = '#'.repeat(level)
    const selection = this.editor.getSelection()
    const replacement = selection ? `${prefix} ${selection}` : `${prefix} `
    this.editor.replaceSelection(replacement)
  }

  /**
   * 插入引用
   */
  public quote() {
    const selection = this.editor.getSelection()
    const replacement = selection ? `> ${selection.replace(/\n/g, '\n> ')}` : '> '
    this.editor.replaceSelection(replacement)
  }

  /**
   * 插入列表
   * @param ordered 是否为有序列表
   */
  public list(ordered: boolean) {
    const selection = this.editor.getSelection()
    const rows = selection ? selection.split('\n') : ['']
    const prefix = ordered ? '1. ' : '- '
    const replacement = rows.map((row) => `${prefix}${row}`).join('\n')
    this.editor.replaceSelection(replacement)
  }

  /**
   * 插入分割线
   */
  public hr() {
    const cursor = this.editor.getCursor()
    if (cursor !== null) {
      const hrLine = '\n\n---\n\n'
      this.editor.replaceSelection(hrLine)
      this.editor.setCursor(new Monaco.Position(cursor.lineNumber + 2, 0))
    } else {
      const hrLine = '\n\n---\n\n'
      this.editor.replaceSelection(hrLine)
    }
  }

  /**
   * 插入表格
   */
  public table() {
    const tableTemplate = [
      '| Column 1 | Column 2 | Column 3 |',
      '| -------- | -------- | -------- |',
      '| Row 1, Cell 1 | Row 1, Cell 2 | Row 1, Cell 3 |',
      '| Row 2, Cell 1 | Row 2, Cell 2 | Row 2, Cell 3 |',
    ].join('\n')
    this.editor.replaceSelection(tableTemplate)
  }

  /**
   * 插入代码块
   */
  public code() {
    const selection = this.editor.getSelection()
    const codeTemplate = '```language\n' + (selection || 'code') + '\n```'
    this.editor.replaceSelection(codeTemplate)
  }

  /**
   * 查找文本
   */
  public find() {
    // TODO
  }

  /**
   * 替换文本
   */
  public replace() {
    // TODO
  }

  /**
   * 清空编辑器内容
   */
  public clear() {
    this.editor.setValue('')
  }

  /**
   * 插入表情符号
   */
  public insertEmoji() {
    // TODO
  }

  /**
   * 插入数学公式
   */
  public insertMath() {
    // TODO
  }

  /**
   * 插入流程图
   */
  public insertMermaid() {
    // TODO
  }

  /**
   * 插入图表
   */
  public insertECharts() {
    // TODO
  }

  /**
   * 插入目录
   */
  public insertToc() {
    // TODO
  }

  /**
   * 插入脚注
   */
  public insertFootnote() {
    // TODO
  }

  /**
   * 插入图片
   */
  public insertImage() {
    // TODO
  }

  /**
   * 插入链接
   */
  public insertLink() {
    // TODO
  }

  /**
   * 插入 HTML 代码
   */
  public insertHtml() {
    // TODO
  }
}
