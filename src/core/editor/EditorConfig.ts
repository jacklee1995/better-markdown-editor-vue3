// 编辑器配置
// src/core/editor/EditorConfig.ts

import type { EditorOptions } from './interface'

export const defaultEditorConfig: EditorOptions = {
  value: '',
  language: 'markdown',
  placeholder: 'Type here...',
  readonly: false,
  autofocus: false,
  lineNumbers: true,
  lineWrapping: false,
  theme: 'vs',
  style: {},
  className: '',
  monaco: {},
  markdown: {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    smartypants: false,
    emoji: true,
  },
}

export function resolveEditorConfig(options: Partial<EditorOptions>): EditorOptions {
  const config: EditorOptions = { ...defaultEditorConfig }

  if (options.value) {
    config.value = options.value
  }
  if (options.language) {
    config.language = options.language
  }
  if (options.placeholder) {
    config.placeholder = options.placeholder
  }
  if (options.readonly) {
    config.readonly = options.readonly
  }
  if (options.autofocus) {
    config.autofocus = options.autofocus
  }
  if (options.lineNumbers !== undefined) {
    config.lineNumbers = options.lineNumbers
  }
  if (options.lineWrapping !== undefined) {
    config.lineWrapping = options.lineWrapping
  }
  if (options.theme) {
    config.theme = options.theme
  }
  if (options.style) {
    config.style = { ...config.style, ...options.style }
  }
  if (options.className) {
    config.className = options.className
  }
  if (options.monaco) {
    config.monaco = { ...config.monaco, ...options.monaco }
  }
  if (options.markdown) {
    config.markdown = { ...config.markdown, ...options.markdown }
  }

  return config
}
