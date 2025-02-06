import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  MarkdownParser,
  MarkdownRenderer,
  MarkdownTransformer,
  type Token,
  type MarkdownParserOptions,
  type MarkdownExtension,
} from '@/core/markdown'
import { MarkdownUtils } from '@/core/markdown/MarkdownUtils'

/**
 * Markdown 状态接口
 */
export interface MarkdownState {
  /**
   * Markdown 解析器实例
   */
  parser: MarkdownParser

  /**
   * Markdown 渲染器实例
   */
  renderer: typeof MarkdownRenderer

  /**
   * Markdown 转换器实例
   */
  transformer: MarkdownTransformer

  /**
   * Markdown Token 列表
   */
  tokens: Token[]

  /**
   * Markdown 解析选项
   */
  options: MarkdownParserOptions
}

/**
 * 使用 Pinia 定义 Markdown 状态存储
 */
export const useMarkdownStore = defineStore('markdown', () => {
  // Markdown 解析器实例
  const parser = ref(new MarkdownParser())

  // Markdown 渲染器实例
  const renderer = ref(MarkdownRenderer)

  // Markdown 转换器实例
  const transformer = ref(new MarkdownTransformer({}))

  // Markdown Token 列表
  const tokens = ref<Token[]>([])

  // Markdown 解析选项
  const options = ref<MarkdownParserOptions>({
    gfm: true,
    breaks: true,
    pedantic: false,
    smartLists: true,
    smartypants: true,
  })

  /**
   * 解析 Markdown 文本
   * @param text Markdown 文本
   * @returns Token 列表
   */
  function parse(text: string): Token[] {
    const result = parser.value.parse(text)
    tokens.value = result
    return result
  }

  /**
   * 将 Token 列表渲染为 HTML
   * @param tokens Token 列表
   * @returns 渲染后的 HTML 字符串
   */
  function render(tokens: Token[]): string {
    return renderer.value.render(tokens)
  }

  /**
   * 更新 Markdown 解析选项
   * @param newOptions 新的解析选项
   */
  function updateOptions(newOptions: MarkdownParserOptions): void {
    options.value = { ...options.value, ...newOptions }
    parser.value = new MarkdownParser(options.value)
  }

  /**
   * 使用 Markdown 扩展
   * @param extension Markdown 扩展
   */
  function use(extension: MarkdownExtension): void {
    parser.value.use(extension)
    transformer.value.use(extension)
  }

  /**
   * 提取 Token 列表中的锚点
   * @param tokens Token 列表
   * @returns 锚点列表
   */
  function extractAnchors(tokens: Token[]): Token[] {
    return MarkdownUtils.extractHeaders(tokens)
  }

  /**
   * 提取 Token 列表中的目录
   * @param tokens Token 列表
   * @returns 目录列表
   */
  function extractToc(tokens: Token[]): Token[] {
    return MarkdownUtils.extractToc(tokens)
  }

  return {
    parse,
    render,
    updateOptions,
    use,
    extractAnchors,
    extractToc,
    parser,
    renderer,
    transformer,
    tokens,
    options,
  }
})
