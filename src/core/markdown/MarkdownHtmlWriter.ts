/* eslint-disable @typescript-eslint/no-unused-vars */
// Markdown HTML写入器
// src/core/markdown/MarkdownHtmlWriter.ts

import type { MarkdownParserOptions, Renderer, Token, TokenRender } from './interface'

/**
 * Markdown HTML 写入器类
 * 负责将 Token 数组渲染为 HTML 字符串
 */
export class MarkdownHtmlWriter implements Renderer {
  private options: MarkdownParserOptions

  /**
   * 构造函数
   * @param options Markdown 解析选项
   */
  constructor(options: MarkdownParserOptions) {
    this.options = options
  }

  /**
   * 渲染 Token 数组为 HTML 字符串
   * @param tokens Token 数组
   * @param options 解析选项
   * @param env 环境变量
   * @returns 渲染后的 HTML 字符串
   */
  public render(
    tokens: Token[],
    options: MarkdownParserOptions,
    env: Record<string, unknown>,
  ): string {
    let result = ''
    for (let i = 0; i < tokens.length; i++) {
      result += this.renderToken(tokens, i, options)
    }
    return result
  }

  /**
   * 渲染内联 Token 数组为 HTML 字符串
   * @param tokens Token 数组
   * @param options 解析选项
   * @param env 环境变量
   * @returns 渲染后的 HTML 字符串
   */
  public renderInline(
    tokens: Token[],
    options: MarkdownParserOptions,
    env: Record<string, unknown>,
  ): string {
    let result = ''
    for (let i = 0; i < tokens.length; i++) {
      result += this.renderToken(tokens, i, options)
    }
    return result
  }

  /**
   * 渲染单个 Token 为 HTML 字符串
   * @param tokens Token 数组
   * @param idx 当前 Token 索引
   * @param options 解析选项
   * @returns 渲染后的 HTML 字符串
   */
  public renderToken(tokens: Token[], idx: number, options: MarkdownParserOptions): string {
    const token = tokens[idx]
    const renderer = this.options.renderer

    switch (token.type) {
      case 'heading': {
        const level = token.depth
        const text = this.renderInline(token.children ?? [], options, {})
        if (renderer?.heading) {
          return renderer.heading(text, level)
        }
        return `<h${level}>${text}</h${level}>\n`
      }

      case 'paragraph': {
        const text = this.renderInline(token.children ?? [], options, {})
        if (renderer?.paragraph) {
          return renderer.paragraph(text)
        }
        return `<p>${text}</p>\n`
      }

      case 'text': {
        if (renderer?.text) {
          return renderer.text(token.text)
        }
        return token.text
      }

      case 'strong': {
        const text = this.renderInline(token.children ?? [], options, {})
        if (renderer?.strong) {
          return renderer.strong(text)
        }
        return `<strong>${text}</strong>`
      }

      case 'em': {
        const text = this.renderInline(token.children ?? [], options, {})
        if (renderer?.em) {
          return renderer.em(text)
        }
        return `<em>${text}</em>`
      }

      case 'codespan': {
        const code = token.text
        if (renderer?.codespan) {
          return renderer.codespan(code)
        }
        return `<code>${code}</code>`
      }

      case 'br': {
        if (renderer?.br) {
          return renderer.br()
        }
        return '<br>\n'
      }

      case 'del': {
        const text = this.renderInline(token.children ?? [], options, {})
        if (renderer?.del) {
          return renderer.del(text)
        }
        return `<del>${text}</del>`
      }

      case 'link': {
        const href = token.attrGet('href') ?? ''
        const title = token.attrGet('title') ?? ''
        const text = this.renderInline(token.children ?? [], options, {})
        if (renderer?.link) {
          return renderer.link(href, title, text)
        }
        return `<a href="${href}" title="${title}">${text}</a>`
      }

      case 'image': {
        const src = token.attrGet('src') ?? ''
        const alt = token.attrGet('alt') ?? ''
        const title = token.attrGet('title') ?? ''
        if (renderer?.image) {
          return renderer.image(src, title, alt)
        }
        return `<img src="${src}" alt="${alt}" title="${title}">`
      }

      case 'code': {
        const code = token.text
        const lang = token.attrGet('lang') ?? ''
        if (renderer?.code) {
          return renderer.code(code, lang)
        }
        return `<pre><code class="language-${lang}">${code}</code></pre>\n`
      }

      case 'blockquote': {
        const text = this.render(token.children ?? [], options, {})
        if (renderer?.blockquote) {
          return renderer.blockquote(text)
        }
        return `<blockquote>\n${text}</blockquote>\n`
      }

      case 'hr': {
        if (renderer?.hr) {
          return renderer.hr()
        }
        return '<hr>\n'
      }

      case 'list': {
        const ordered = token.ordered ?? false
        const start = token.start
        const body = this.render(token.children ?? [], options, {})
        if (renderer?.list) {
          return renderer.list(body, ordered, start)
        }
        const type = ordered ? 'ol' : 'ul'
        const startatt = ordered && start !== 1 ? ` start="${start}"` : ''
        return `<${type}${startatt}>\n${body}</${type}>\n`
      }

      case 'list_item': {
        const text = this.render(token.children ?? [], options, {})
        if (renderer?.listitem) {
          return renderer.listitem(text)
        }
        return `<li>${text}</li>\n`
      }

      case 'html': {
        const html = token.text
        if (renderer?.html) {
          return renderer.html(html)
        }
        return html
      }

      default: {
        const text = this.renderInline(token.children ?? [], options, {})
        return text
      }
    }
  }

  /**
   * 使用自定义渲染器
   * @param renderer 自定义渲染器
   */
  public use(renderer: TokenRender): void {
    this.options.renderer = {
      ...this.options.renderer,
      ...renderer,
    }
  }
}
