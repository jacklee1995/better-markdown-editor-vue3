// 暗黑主题
// src/core/theme/DarkTheme.ts

import { BaseTheme } from './BaseTheme'

export class DarkTheme extends BaseTheme {
  constructor() {
    super({
      name: 'dark',
      style: {
        backgroundColor: '#282c34',
        color: '#abb2bf',
      },
      markdown: {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        smartypants: false,
        emoji: true,
      },
    })
  }

  public apply(): void {
    const style = `
      .markdown-body {
        color: #abb2bf;
        background-color: #282c34;
      }

      .markdown-body a {
        color: #61afef;
      }

      .markdown-body code {
        color: #98c379;
        background-color: #3e4451;
      }

      .markdown-body pre {
        background-color: #3e4451;
      }

      .markdown-body h1,
      .markdown-body h2,
      .markdown-body h3,
      .markdown-body h4,
      .markdown-body h5,
      .markdown-body h6 {
        color: #e06c75;
        border-bottom-color: #5c6370;
      }

      .markdown-body table tr {
        background-color: #282c34;
        border-top-color: #5c6370;
      }

      .markdown-body table tr:nth-child(2n) {
        background-color: #3e4451;
      }

      .markdown-body table th,
      .markdown-body table td {
        border-color: #5c6370;
      }

      .markdown-body blockquote {
        color: #5c6370;
        border-left-color: #5c6370;
      }

      .markdown-body hr {
        background-color: #5c6370;
      }

      .markdown-body img {
        background-color: #282c34;
      }
    `

    const styleElement = document.createElement('style')
    styleElement.innerHTML = style
    document.head.appendChild(styleElement)
  }
}
