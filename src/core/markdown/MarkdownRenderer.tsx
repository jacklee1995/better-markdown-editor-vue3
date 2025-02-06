// Markdown渲染器
// src/core/markdown/MarkdownRenderer.tsx

import { defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'
import { MarkdownParser } from './MarkdownParser'
import type { MarkdownParserOptions } from './interface'

/**
 * Markdown 渲染器组件
 * 使用 Vue 3 组合式 API 实现
 * 负责将 Markdown 文本解析并渲染为 HTML
 */
export default defineComponent({
  name: 'MarkdownRenderer',
  props: {
    /**
     * 要渲染的 Markdown 文本
     */
    value: {
      type: String,
      default: '',
    },
    /**
     * Markdown 解析选项
     */
    options: {
      type: Object as PropType<MarkdownParserOptions>,
      default: () => ({}),
    },
  },
  setup(props) {
    // 创建 Markdown 解析器实例
    const parser = new MarkdownParser(props.options)
    // 用于存储解析后的 HTML
    const html = ref('')

    // 渲染函数，将 Markdown 文本解析为 HTML
    const render = () => {
      html.value = parser.parse(props.value)
    }

    // 监听 Markdown 文本的变化，自动重新渲染
    watch(
      () => props.value,
      () => {
        render()
      },
      { immediate: true },
    )

    // 监听解析选项的变化，自动重新渲染
    watch(
      () => props.options,
      () => {
        render()
      },
      { deep: true },
    )

    // 返回渲染的 HTML
    return () => <div class="markdown-body" v-html={html.value}></div>
  },
})
