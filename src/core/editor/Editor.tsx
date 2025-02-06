// 编辑器核心组件
// src/core/editor/Editor.tsx

import { defineComponent, ref, onMounted, watch } from 'vue'
import type { PropType } from 'vue'
import type { CSSProperties } from 'vue'
import * as Monaco from 'monaco-editor'
import { EditorState } from './EditorState'
import type { EditorOptions, EditorProps, EditorRef } from './interface'
import { resolveEditorConfig } from './EditorConfig'

export default defineComponent({
  name: 'MarkdownEditor',
  props: {
    value: {
      type: String,
      default: '',
    },
    language: {
      type: String as PropType<string>,
      default: 'markdown',
    },
    placeholder: {
      type: String,
      default: 'Type here...',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    lineNumbers: {
      type: Boolean,
      default: true,
    },
    lineWrapping: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'vs',
    },
    style: {
      type: [String, Object] as PropType<EditorOptions['style']>,
      default: () => ({}),
    },
    className: {
      type: String,
      default: '',
    },
    monaco: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
    markdown: {
      type: Object as PropType<EditorOptions['markdown']>,
      default: () => ({}),
    },
    onChange: {
      type: Function as PropType<EditorProps['onChange']>,
      default: () => {},
    },
    onFocus: {
      type: Function as PropType<EditorProps['onFocus']>,
      default: () => {},
    },
    onBlur: {
      type: Function as PropType<EditorProps['onBlur']>,
      default: () => {},
    },
    onScroll: {
      type: Function as PropType<EditorProps['onScroll']>,
      default: () => {},
    },
    onKeyDown: {
      type: Function as PropType<EditorProps['onKeyDown']>,
      default: () => {},
    },
    onKeyUp: {
      type: Function as PropType<EditorProps['onKeyUp']>,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const editorRef = ref<HTMLDivElement>()
    const monacoRef = ref<Monaco.editor.IStandaloneCodeEditor>()
    const editorState = ref<EditorState>()

    onMounted(() => {
      if (editorRef.value) {
        const config = resolveEditorConfig(props)
        const editor = Monaco.editor.create(editorRef.value!, {
          value: config.value,
          language: config.language,
          placeholder: config.placeholder,
          readOnly: config.readonly,
          lineNumbers: config.lineNumbers ? 'on' : 'off',
          wordWrap: config.lineWrapping ? 'on' : 'off',
          theme: config.theme,
          minimap: { enabled: false },
          ...config.monaco,
        })
        monacoRef.value = editor

        const editorRefProxy: EditorRef = {
          getValue: () => editor.getValue(),
          setValue: (value: string) => editor.setValue(value),
          getSelection: () => editor.getSelection()?.toString() || '',
          setSelection: (range) => editor.setSelection(range),
          replaceSelection: (value) =>
            editor.executeEdits('', [{ range: editor.getSelection()!, text: value }]),
          focus: () => editor.focus(),
          blur: () => {},
          getWrapperElement: () => editorRef.value!,
          getElement: () => editorRef.value!,
          getContentElement: () => editor.getDomNode()!,
          getOverflowElement: () => editor.getDomNode()!,
          getScrollElement: () => editor.getDomNode()!,
          getContentSize: () => {
            const contentWidth = editor.getContentWidth()
            const contentHeight = editor.getContentHeight()
            return {
              contentHeight,
              contentWidth,
            }
          },
          getVisibleRanges: () => {
            const visibleRanges = editor.getVisibleRanges()
            return visibleRanges.map(
              (range) =>
                new Monaco.Range(
                  range.startLineNumber,
                  range.startColumn,
                  range.endLineNumber,
                  range.endColumn,
                ),
            )
          },
          getFirstVisibleLine: () => editor.getVisibleRanges()[0].startLineNumber,
          getLastVisibleLine: () => editor.getVisibleRanges()[0].endLineNumber,
          getCursor: () => editor.getPosition(),
          setCursor: (pos) => editor.setPosition(pos),
          getScrollInfo: () => ({
            scrollLeft: editor.getScrollLeft(),
            scrollTop: editor.getScrollTop(),
            scrollWidth: editor.getScrollWidth(),
            scrollHeight: editor.getScrollHeight(),
            scrollLeftChanged: false,
            scrollTopChanged: false,
            scrollWidthChanged: false,
            scrollHeightChanged: false,
          }),
          scrollTo: (options) => {
            if (options.x !== undefined) {
              editor.setScrollLeft(options.x)
            }
            if (options.y !== undefined) {
              editor.setScrollTop(options.y)
            }
          },
          scrollIntoView: (position) => editor.revealPositionInCenter(position),
          refresh: () => editor.layout(),
          selectAll: () => editor.setSelection(editor.getModel()!.getFullModelRange()),
          selectLine: (line) => {
            const lineLength = editor.getModel()!.getLineLength(line)
            editor.setSelection(new Monaco.Range(line, 1, line, lineLength + 1))
          },
          selectWord: (position) => editor.setPosition(position),
          getSelectionStart: () => editor.getPosition(),
          getSelectionEnd: () => editor.getPosition(),
          getSelectionLine: () => editor.getPosition()?.lineNumber || null,
          getSelectionLineStart: () => editor.getPosition(),
          getSelectionLineEnd: () => editor.getPosition(),
          getMonacoInstance: () => Monaco,
          isSelectionEmpty: () => editor.getSelection()?.isEmpty() ?? true,
          getModel: () => editor.getModel(),
          undo: () => editor.trigger('', 'undo', undefined),
          redo: () => editor.trigger('', 'redo', undefined),
          onDidChangeModelContent: (listener: () => void) =>
            editor.onDidChangeModelContent(listener),
          offDidChangeModelContent: (listener: () => void) =>
            editor.onDidChangeModelContent(listener),
          onDidChangeCursorSelection: (listener: () => void) =>
            editor.onDidChangeCursorSelection(listener),
          offDidChangeCursorSelection: (listener: () => void) =>
            editor.onDidChangeCursorSelection(listener),
          onKeyDown: (listener: (e: KeyboardEvent) => void) =>
            editor.onKeyDown((e) => listener(e.browserEvent)),
          offKeyDown: (listener: (e: KeyboardEvent) => void) =>
            editor.onKeyDown((e) => listener(e.browserEvent)),
          onPaste: () => {},
          offPaste: () => {},
          scrollRangeIntoView: (range) => editor.revealRangeInCenter(range),
          getScrollPosition: () => ({
            scrollLeft: editor.getScrollLeft(),
            scrollTop: editor.getScrollTop(),
          }),
          setScrollPosition: (position) => {
            if (position.scrollLeft !== undefined) {
              editor.setScrollLeft(position.scrollLeft)
            }
            if (position.scrollTop !== undefined) {
              editor.setScrollTop(position.scrollTop)
            }
          },
          selectWordAt: (position) => editor.setPosition(position),
          getVisibleHeight: () => editor.getLayoutInfo().height,
          getVisibleWidth: () => editor.getLayoutInfo().width,
          getScrollHeight: () => editor.getScrollHeight(),
          getScrollWidth: () => editor.getScrollWidth(),
          getScrollLeft: () => editor.getScrollLeft(),
          getScrollTop: () => editor.getScrollTop(),
          getSelectionRange: () => editor.getSelection(),
          getSelectionMarker: () => {
            const selection = editor.getSelection()
            if (selection) {
              return {
                startLineNumber: selection.startLineNumber,
                startColumn: selection.startColumn,
                endLineNumber: selection.endLineNumber,
                endColumn: selection.endColumn,
              }
            }
            return null
          },
          getContentHeight: () => editor.getContentHeight(),
          getContentWidth: () => editor.getContentWidth(),
          selectMarker: (range) => {
            const decorations = editor.getModel()!.deltaDecorations(
              [],
              [
                {
                  range,
                  options: {
                    className: 'selection-marker',
                    isWholeLine: true,
                  },
                },
              ],
            )
            return {
              clear: () => {
                editor.getModel()!.deltaDecorations(decorations, [])
              },
            }
          },
        }
        editorState.value = new EditorState(editorRefProxy)
        editorState.value.attach()

        editor.onDidChangeModelContent(() => {
          const value = editor.getValue()
          emit('update:value', value)
          emit('change', value)
        })

        editor.onDidFocusEditorText(() => {
          emit('focus')
        })

        editor.onDidBlurEditorText(() => {
          emit('blur')
        })

        editor.onDidScrollChange((e) => {
          emit('scroll', e.scrollTop)
        })

        editor.onKeyDown((event) => {
          emit('keydown', event)
        })

        editor.onKeyUp((event) => {
          emit('keyup', event)
        })
      }
    })

    watch(
      () => props.value,
      (value) => {
        if (monacoRef.value && value !== monacoRef.value.getValue()) {
          monacoRef.value.setValue(value ?? '')
        }
      },
    )

    watch(
      () => props.language,
      (language) => {
        if (monacoRef.value) {
          Monaco.editor.setModelLanguage(monacoRef.value.getModel()!, language ?? 'plaintext')
        }
      },
    )

    watch(
      () => props.theme,
      (theme) => {
        if (monacoRef.value) {
          Monaco.editor.setTheme(theme ?? 'vs')
        }
      },
    )

    return () => (
      <div
        ref={editorRef}
        class={['editor', props.className]}
        style={props.style as CSSProperties}
      ></div>
    )
  },
})
