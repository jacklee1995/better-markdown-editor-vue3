// 编辑器滚动管理
// src/core/editor/EditorScroll.ts

import type { EditorRef } from './interface'
import * as Monaco from 'monaco-editor'

export class EditorScroll {
  private readonly editor: EditorRef

  constructor(editor: EditorRef) {
    this.editor = editor
  }

  public scrollToLine(line: number): void {
    const position = new Monaco.Position(line, 1)
    this.editor.scrollIntoView(position)
  }

  public scrollToTop(): void {
    this.editor.setScrollPosition({ scrollTop: 0 })
  }

  public scrollToBottom(): void {
    const lastLine = this.editor.getLastVisibleLine()
    const position = new Monaco.Position(lastLine, 1)
    this.editor.scrollIntoView(position)
  }

  public scrollToLeft(): void {
    this.editor.setScrollPosition({ scrollLeft: 0 })
  }

  public scrollToRight(): void {
    const { scrollWidth } = this.editor.getScrollInfo()
    this.editor.setScrollPosition({ scrollLeft: scrollWidth })
  }

  public scrollBy(deltaX: number, deltaY: number): void {
    const { scrollLeft, scrollTop } = this.editor.getScrollInfo()
    this.editor.setScrollPosition({
      scrollLeft: scrollLeft + deltaX,
      scrollTop: scrollTop + deltaY,
    })
  }

  public getScrollPosition(): { scrollLeft: number; scrollTop: number } {
    const { scrollLeft, scrollTop } = this.editor.getScrollInfo()
    return { scrollLeft, scrollTop }
  }

  public setScrollPosition(position: { scrollLeft: number; scrollTop: number }): void {
    this.editor.setScrollPosition(position)
  }

  public isLineVisible(line: number): boolean {
    const firstLine = this.editor.getFirstVisibleLine()
    const lastLine = this.editor.getLastVisibleLine()
    return line >= firstLine && line <= lastLine
  }

  public getFirstVisibleLine(): number {
    return this.editor.getFirstVisibleLine()
  }

  public getLastVisibleLine(): number {
    return this.editor.getLastVisibleLine()
  }
}
