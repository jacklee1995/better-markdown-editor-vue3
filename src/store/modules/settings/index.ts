import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SettingsState } from './types'

export const useSettingsStore = defineStore('settings', () => {
  // 网站标题
  const siteTitle = ref('Markdown Editor')

  // 网站描述
  const siteDescription = ref('')

  // 是否显示进度条
  const showProgress = ref(true)

  // 默认语言
  const defaultLanguage = ref<'en' | 'zh'>('en')

  // 日期格式
  const dateFormat = ref('YYYY-MM-DD')

  // 时间格式
  const timeFormat = ref('24')

  // 编辑器配置
  const editorOptions = ref({
    // 初始 Markdown 内容
    value: '',
    // 语言
    language: 'markdown',
    // 只读模式
    readOnly: false,
    // 自动聚焦
    autoFocus: true,
    // 显示行号
    lineNumbers: true,
    // 字体大小
    fontSize: 14,
    // 字体家族
    fontFamily: 'monospace',
    // 行高
    lineHeight: 1.5,
    // Tab 大小
    tabSize: 2,
    // 显示行号
    showLineNumbers: true,
    // 显示行号槽
    showGutter: true,
    // 高亮当前行
    highlightActiveLine: true,
  })

  // 预览配置
  const previewOptions = ref({
    // 是否启用预览
    enabled: true,
    // 预览模式: 'live' | 'editor' | 'preview'
    mode: 'live',
    // 预览主题: 'light' | 'dark'
    theme: 'light',
    // 预览字体大小
    fontSize: 16,
    // 预览行高
    lineHeight: 1.5,
  })

  // 工具栏配置
  const toolbarOptions = ref({
    // 是否启用工具栏
    enabled: true,
    // 工具栏项
    items: [
      'bold',
      'italic',
      'strikethrough',
      '|',
      'title',
      'subject',
      'sub',
      'sup',
      '|',
      'quote',
      'unordered-list',
      'ordered-list',
      'task-list',
      '|',
      'link',
      'image',
      'table',
      'line',
      'code',
      'inline-code',
      '|',
      'undo',
      'redo',
      'clear',
    ],
  })

  // 状态栏配置
  const statusbarOptions = ref({
    // 是否启用状态栏
    enabled: true,
    // 显示行列号
    showLineAndColumn: true,
    // 显示选择字符数
    showSelectionLength: true,
    // 显示编辑模式
    showEditMode: true,
  })

  // 快捷键配置
  const shortcutOptions = ref({
    // 加粗
    bold: 'Ctrl+B',
    // 斜体
    italic: 'Ctrl+I',
    // 删除线
    strikethrough: 'Ctrl+D',
    // 插入链接
    link: 'Ctrl+K',
    // 插入图片
    image: 'Ctrl+Alt+I',
    // 插入表格
    table: 'Ctrl+Alt+T',
    // 插入代码块
    code: 'Ctrl+Alt+C',
    // 插入行内代码
    inlineCode: 'Ctrl+Alt+K',
    // 撤销
    undo: 'Ctrl+Z',
    // 重做
    redo: 'Ctrl+Y',
    // 清除格式
    clear: 'Ctrl+/',
  })

  function updateSettings(newSettings: Partial<SettingsState>) {
    siteTitle.value = newSettings.siteTitle ?? siteTitle.value
    siteDescription.value = newSettings.siteDescription ?? siteDescription.value
    showProgress.value = newSettings.showProgress ?? showProgress.value
    defaultLanguage.value = newSettings.defaultLanguage ?? defaultLanguage.value
    dateFormat.value = newSettings.dateFormat ?? dateFormat.value
    timeFormat.value = newSettings.timeFormat ?? timeFormat.value
    editorOptions.value = { ...editorOptions.value, ...newSettings.editorOptions }
    previewOptions.value = { ...previewOptions.value, ...newSettings.previewOptions }
    toolbarOptions.value = { ...toolbarOptions.value, ...newSettings.toolbarOptions }
    statusbarOptions.value = { ...statusbarOptions.value, ...newSettings.statusbarOptions }
    shortcutOptions.value = { ...shortcutOptions.value, ...newSettings.shortcutOptions }
  }

  function resetSettings() {
    siteTitle.value = 'Markdown Editor'
    siteDescription.value = ''
    showProgress.value = true
    defaultLanguage.value = 'en'
    dateFormat.value = 'YYYY-MM-DD'
    timeFormat.value = '24'
    editorOptions.value = {
      value: '',
      language: 'markdown',
      readOnly: false,
      autoFocus: true,
      lineNumbers: true,
      fontSize: 14,
      fontFamily: 'monospace',
      lineHeight: 1.5,
      tabSize: 2,
      showLineNumbers: true,
      showGutter: true,
      highlightActiveLine: true,
    }
    previewOptions.value = {
      enabled: true,
      mode: 'live',
      theme: 'light',
      fontSize: 16,
      lineHeight: 1.5,
    }
    toolbarOptions.value = {
      enabled: true,
      items: [
        'bold',
        'italic',
        'strikethrough',
        '|',
        'title',
        'subject',
        'sub',
        'sup',
        '|',
        'quote',
        'unordered-list',
        'ordered-list',
        'task-list',
        '|',
        'link',
        'image',
        'table',
        'line',
        'code',
        'inline-code',
        '|',
        'undo',
        'redo',
        'clear',
      ],
    }
    statusbarOptions.value = {
      enabled: true,
      showLineAndColumn: true,
      showSelectionLength: true,
      showEditMode: true,
    }
    shortcutOptions.value = {
      bold: 'Ctrl+B',
      italic: 'Ctrl+I',
      strikethrough: 'Ctrl+D',
      link: 'Ctrl+K',
      image: 'Ctrl+Alt+I',
      table: 'Ctrl+Alt+T',
      code: 'Ctrl+Alt+C',
      inlineCode: 'Ctrl+Alt+K',
      undo: 'Ctrl+Z',
      redo: 'Ctrl+Y',
      clear: 'Ctrl+/',
    }
  }

  function updatePreviewTheme(theme: 'light' | 'dark') {
    previewOptions.value.theme = theme
  }

  function updatePreviewFontSize(fontSize: number) {
    previewOptions.value.fontSize = fontSize
  }

  function updatePreviewLineHeight(lineHeight: number) {
    previewOptions.value.lineHeight = lineHeight
  }

  function updateEditorFontSize(fontSize: number) {
    editorOptions.value.fontSize = fontSize
  }

  function updateEditorFontFamily(fontFamily: string) {
    editorOptions.value.fontFamily = fontFamily
  }

  function updateEditorLineHeight(lineHeight: number) {
    editorOptions.value.lineHeight = lineHeight
  }

  function updateEditorTabSize(tabSize: number) {
    editorOptions.value.tabSize = tabSize
  }

  function updateEditorShowLineNumbers(showLineNumbers: boolean) {
    editorOptions.value.showLineNumbers = showLineNumbers
  }

  function updateEditorShowGutter(showGutter: boolean) {
    editorOptions.value.showGutter = showGutter
  }

  function updateEditorHighlightActiveLine(highlightActiveLine: boolean) {
    editorOptions.value.highlightActiveLine = highlightActiveLine
  }

  return {
    siteTitle,
    siteDescription,
    showProgress,
    defaultLanguage,
    dateFormat,
    timeFormat,
    editorOptions,
    previewOptions,
    toolbarOptions,
    statusbarOptions,
    shortcutOptions,
    updateSettings,
    resetSettings,
    updatePreviewTheme,
    updatePreviewFontSize,
    updatePreviewLineHeight,
    updateEditorFontSize,
    updateEditorFontFamily,
    updateEditorLineHeight,
    updateEditorTabSize,
    updateEditorShowLineNumbers,
    updateEditorShowGutter,
    updateEditorHighlightActiveLine,
  }
})
