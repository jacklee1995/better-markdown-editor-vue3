import type { EditorOptions } from '@/core/editor'

export interface SettingsState {
  siteTitle: string
  siteDescription: string
  showProgress: boolean
  defaultLanguage: 'en' | 'zh'
  dateFormat: string
  timeFormat: string
  editorOptions: EditorOptions
  previewOptions: {
    enabled: boolean
    mode: 'live' | 'editor' | 'preview'
  }
  toolbarOptions: {
    enabled: boolean
    items: string[]
  }
  statusbarOptions: {
    enabled: boolean
    showLineAndColumn: boolean
    showSelectionLength: boolean
    showEditMode: boolean
  }
  shortcutOptions: {
    bold: string
    italic: string
    strikethrough: string
    link: string
    image: string
    table: string
    code: string
    inlineCode: string
    undo: string
    redo: string
    clear: string
  }
}
