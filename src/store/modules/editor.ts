import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as Monaco from 'monaco-editor'
import type { EditorState as IEditorState } from '@/core/editor'

export interface EditorStateOptions {
  value: string
  language: string
  readOnly: boolean
  autoFocus: boolean
  lineNumbers: boolean
  fontSize: number
  fontFamily: string
  lineHeight: number
  tabSize: number
  showGutter: boolean
  highlightActiveLine: boolean
}

export interface EditorHistoryState {
  undoStack: string[]
  redoStack: string[]
}

export interface EditorCursorState {
  line: number
  column: number
}

export interface EditorSelectionState {
  range: Monaco.Range | null
  text: string
}

export interface EditorScrollState {
  top: number
  left: number
}

export interface EditorShortcutState {
  [key: string]: string
}

export interface EditorKeymapState {
  [key: string]: () => void
}

export interface EditorState {
  content: string
  docTitle: string
  options: EditorStateOptions
  history: EditorHistoryState
  cursor: EditorCursorState
  selection: EditorSelectionState
  scroll: EditorScrollState
  shortcut: EditorShortcutState
  keymap: EditorKeymapState
}

export const useEditorStore = defineStore('editor', () => {
  const editorState = ref<IEditorState | null>(null)

  const content = ref('')
  const docTitle = ref('')

  const options = ref<EditorStateOptions>({
    value: '',
    language: 'markdown',
    readOnly: false,
    autoFocus: true,
    lineNumbers: true,
    fontSize: 14,
    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    lineHeight: 21,
    tabSize: 2,
    showGutter: true,
    highlightActiveLine: true,
  })

  const history = ref<EditorHistoryState>({
    undoStack: [],
    redoStack: [],
  })

  const cursor = ref<EditorCursorState>({
    line: 1,
    column: 1,
  })

  const selection = ref<EditorSelectionState>({
    range: null,
    text: '',
  })

  const scroll = ref<EditorScrollState>({
    top: 0,
    left: 0,
  })

  const shortcut = ref<EditorShortcutState>({})

  const keymap = ref<EditorKeymapState>({})

  function setEditorState(state: IEditorState) {
    editorState.value = state
  }

  function updateValue(value: string) {
    options.value.value = value
  }

  function updateLanguage(language: string) {
    options.value.language = language
  }

  function updateOptions(newOptions: Partial<EditorStateOptions>) {
    options.value = { ...options.value, ...newOptions }
  }

  function undo() {
    editorState.value?.undo()
  }

  function redo() {
    editorState.value?.redo()
  }

  function recordHistory() {
    editorState.value?.history.captureCurrent()
  }

  function updateCursor(line: number, column: number) {
    cursor.value = { line, column }
  }

  function updateSelection(range: Monaco.Range, text: string) {
    selection.value = { range, text }
  }

  function updateScroll(top: number, left: number) {
    scroll.value = { top, left }
  }

  function scrollToLine(line: number) {
    editorState.value?.scrollToLine(line)
  }

  function scrollToPosition(line: number, column: number) {
    editorState.value?.scrollToPosition({ line, ch: column })
  }

  function updateShortcut(key: string, command: string) {
    shortcut.value[key] = command
  }

  function executeShortcut(key: string) {
    const command = shortcut.value[key]
    if (command) {
      switch (command) {
        case 'bold':
          editorState.value?.command.format('bold')
          break
        case 'italic':
          editorState.value?.command.format('italic')
          break
        case 'underline':
          editorState.value?.command.format('underline')
          break
        case 'strikethrough':
          editorState.value?.command.format('strikethrough')
          break
        case 'code':
          editorState.value?.command.format('code')
          break
        case 'link':
          editorState.value?.command.format('link')
          break
        case 'image':
          editorState.value?.command.format('image')
          break
        case 'undo':
          editorState.value?.command.undo()
          break
        case 'redo':
          editorState.value?.command.redo()
          break
        default:
          break
      }
    }
  }

  function updateKeymap(key: string, handler: () => void) {
    keymap.value[key] = handler
  }

  function executeKeymap(key: string) {
    const handler = keymap.value[key]
    if (handler) {
      handler()
    }
  }

  async function init() {
    // 在这里进行编辑器的初始化操作
    console.log('Editor initialized')
  }

  async function saveDoc() {
    // TODO: 保存文档
    console.log('Document saved')
  }

  async function fetchDoc(id: string) {
    // TODO: 根据 id 获取文档数据
    console.log(`Fetching document with id: ${id}`)
  }

  return {
    content,
    docTitle,
    options,
    history,
    cursor,
    selection,
    scroll,
    shortcut,
    keymap,
    setEditorState,
    updateValue,
    updateLanguage,
    updateOptions,
    undo,
    redo,
    recordHistory,
    updateCursor,
    updateSelection,
    updateScroll,
    scrollToLine,
    scrollToPosition,
    updateShortcut,
    executeShortcut,
    updateKeymap,
    executeKeymap,
    init,
    saveDoc,
    fetchDoc,
  }
})
