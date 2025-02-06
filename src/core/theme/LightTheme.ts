// 浅色主题
// src/core/theme/LightTheme.ts

import { BaseTheme } from './BaseTheme'

export class LightTheme extends BaseTheme {
  constructor() {
    super({
      name: 'light',
      style: {
        backgroundColor: '#fff',
        color: '#000',
      },
      markdown: {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        smartypants: false,
      },
    })
  }

  public apply(): void {
    const style = `
      .markdown-body {
        color: #24292f;
        background-color: #ffffff;
      }

      .markdown-body a {
        color: #0969da;
      }

      .markdown-body a:hover {
        text-decoration: underline;
      }

      .markdown-body img {
        max-width: 100%;
        box-sizing: content-box;
        background-color: #ffffff;
      }

      .markdown-body hr {
        height: 0.25em;
        padding: 0;
        margin: 24px 0;
        background-color: #d0d7de;
        border: 0;
      }

      .markdown-body kbd {
        display: inline-block;
        padding: 3px 5px;
        font: 11px ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
        line-height: 10px;
        color: #24292f;
        vertical-align: middle;
        background-color: #f6f8fa;
        border: solid 1px rgba(175, 184, 193, 0.2);
        border-bottom-color: rgba(175, 184, 193, 0.2);
        border-radius: 6px;
        box-shadow: inset 0 -1px 0 rgba(175, 184, 193, 0.2);
      }

      .markdown-body h1,
      .markdown-body h2,
      .markdown-body h3,
      .markdown-body h4,
      .markdown-body h5,
      .markdown-body h6 {
        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 600;
        line-height: 1.25;
      }

      .markdown-body h1 {
        font-size: 2em;
      }

      .markdown-body h2 {
        font-size: 1.5em;
      }

      .markdown-body h3 {
        font-size: 1.25em;
      }

      .markdown-body h4 {
        font-size: 1em;
      }

      .markdown-body h5 {
        font-size: 0.875em;
      }

      .markdown-body h6 {
        font-size: 0.85em;
        color: #57606a;
      }

      .markdown-body p {
        margin-top: 0;
        margin-bottom: 10px;
      }

      .markdown-body blockquote {
        margin: 0;
        padding: 0 1em;
        color: #57606a;
        border-left: 0.25em solid #d0d7de;
      }

      .markdown-body ul,
      .markdown-body ol {
        margin-top: 0;
        margin-bottom: 0;
        padding-left: 2em;
      }

      .markdown-body ol ol,
      .markdown-body ul ol {
        list-style-type: lower-roman;
      }

      .markdown-body ul ul ol,
      .markdown-body ul ol ol,
      .markdown-body ol ul ol,
      .markdown-body ol ol ol {
        list-style-type: lower-alpha;
      }

      .markdown-body dd {
        margin-left: 0;
      }

      .markdown-body tt,
      .markdown-body code,
      .markdown-body samp {
        font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
        font-size: 12px;
      }

      .markdown-body pre {
        margin-top: 0;
        margin-bottom: 0;
        font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
        font-size: 12px;
        word-wrap: normal;
      }

      .markdown-body .octicon {
        display: inline-block;
        overflow: visible !important;
        vertical-align: text-bottom;
        fill: currentColor;
      }

      .markdown-body input::-webkit-outer-spin-button,
      .markdown-body input::-webkit-inner-spin-button {
        margin: 0;
        -webkit-appearance: none;
        appearance: none;
      }

      .markdown-body::before {
        display: table;
        content: '';
      }

      .markdown-body::after {
        display: table;
        clear: both;
        content: '';
      }

      .markdown-body > *:first-child {
        margin-top: 0 !important;
      }

      .markdown-body > *:last-child {
        margin-bottom: 0 !important;
      }

      .markdown-body a:not([href]) {
        color: inherit;
        text-decoration: none;
      }

      .markdown-body .absent {
        color: #cf222e;
      }

      .markdown-body .anchor {
        float: left;
        padding-right: 4px;
        margin-left: -20px;
        line-height: 1;
      }

      .markdown-body .anchor:focus {
        outline: none;
      }

      .markdown-body p,
      .markdown-body blockquote,
      .markdown-body ul,
      .markdown-body ol,
      .markdown-body dl,
      .markdown-body table,
      .markdown-body pre,
      .markdown-body details {
        margin-top: 0;
        margin-bottom: 16px;
      }

      .markdown-body blockquote > :first-child {
        margin-top: 0;
      }

      .markdown-body blockquote > :last-child {
        margin-bottom: 0;
      }

      .markdown-body h1 .octicon-link,
      .markdown-body h2 .octicon-link,
      .markdown-body h3 .octicon-link,
      .markdown-body h4 .octicon-link,
      .markdown-body h5 .octicon-link,
      .markdown-body h6 .octicon-link {
        color: #24292f;
        vertical-align: middle;
        visibility: hidden;
      }

      .markdown-body h1:hover .anchor,
      .markdown-body h2:hover .anchor,
      .markdown-body h3:hover .anchor,
      .markdown-body h4:hover .anchor,
      .markdown-body h5:hover .anchor,
      .markdown-body h6:hover .anchor {
        text-decoration: none;
      }

      .markdown-body h1:hover .anchor .octicon-link,
      .markdown-body h2:hover .anchor .octicon-link,
      .markdown-body h3:hover .anchor .octicon-link,
      .markdown-body h4:hover .anchor .octicon-link,
      .markdown-body h5:hover .anchor .octicon-link,
      .markdown-body h6:hover .anchor .octicon-link {
        visibility: visible;
      }

      .markdown-body h1 tt,
      .markdown-body h1 code,
      .markdown-body h2 tt,
      .markdown-body h2 code,
      .markdown-body h3 tt,
      .markdown-body h3 code,
      .markdown-body h4 tt,
      .markdown-body h4 code,
      .markdown-body h5 tt,
      .markdown-body h5 code,
      .markdown-body h6 tt,
      .markdown-body h6 code {
        padding: 0 0.2em;
        font-size: inherit;
      }

      .markdown-body summary h1,
      .markdown-body summary h2,
      .markdown-body summary h3,
      .markdown-body summary h4,
      .markdown-body summary h5,
      .markdown-body summary h6 {
        display: inline-block;
      }

      .markdown-body summary h1 .anchor,
      .markdown-body summary h2 .anchor,
      .markdown-body summary h3 .anchor,
      .markdown-body summary h4 .anchor,
      .markdown-body summary h5 .anchor,
      .markdown-body summary h6 .anchor {
        margin-left: -40px;
      }

      .markdown-body summary h1,
      .markdown-body summary h2 {
        padding-bottom: 0;
        border-bottom: 0;
      }

      .markdown-body ul.no-list,
      .markdown-body ol.no-list {
        padding: 0;
        list-style-type: none;
      }

      .markdown-body ol[type='a'] {
        list-style-type: lower-alpha;
      }

      .markdown-body ol[type='A'] {
        list-style-type: upper-alpha;
      }

      .markdown-body ol[type='i'] {
        list-style-type: lower-roman;
      }

      .markdown-body ol[type='I'] {
        list-style-type: upper-roman;
      }

      .markdown-body ol[type='1'] {
        list-style-type: decimal;
      }

      .markdown-body div > ol:not([type]) {
        list-style-type: decimal;
      }

      .markdown-body ul ul,
      .markdown-body ul ol,
      .markdown-body ol ol,
      .markdown-body ol ul {
        margin-top: 0;
        margin-bottom: 0;
      }

      .markdown-body li > p {
        margin-top: 16px;
      }

      .markdown-body li + li {
        margin-top: 0.25em;
      }

      .markdown-body dl {
        padding: 0;
      }

      .markdown-body dl dt {
        padding: 0;
        margin-top: 16px;
        font-size: 1em;
        font-style: italic;
        font-weight: 600;
      }

      .markdown-body dl dd {
        padding: 0 16px;
        margin-bottom: 16px;
      }

      .markdown-body table th {
        font-weight: 600;
      }

      .markdown-body table th,
      .markdown-body table td {
        padding: 6px 13px;
        border: 1px solid #d0d7de;
      }

      .markdown-body table tr {
        background-color: #ffffff;
        border-top: 1px solid hsla(210, 18%, 87%, 1);
      }

      .markdown-body table tr:nth-child(2n) {
        background-color: #f6f8fa;
      }

      .markdown-body table img {
        background-color: transparent;
      }

      .markdown-body img[align='right'] {
        padding-left: 20px;
      }

      .markdown-body img[align='left'] {
        padding-right: 20px;
      }

      .markdown-body .emoji {
        max-width: none;
        vertical-align: text-top;
        background-color: transparent;
      }

      .markdown-body span.frame {
        display: block;
        overflow: hidden;
      }

      .markdown-body span.frame > span {
        display: block;
        float: left;
        width: auto;
        padding: 7px;
        margin: 13px 0 0;
        overflow: hidden;
        border: 1px solid #d0d7de;
      }

      .markdown-body span.frame span img {
        display: block;
        float: left;
      }

      .markdown-body span.frame span span {
        display: block;
        padding: 5px 0 0;
        clear: both;
        color: #24292f;
      }

      .markdown-body span.align-center {
        display: block;
        overflow: hidden;
        clear: both;
      }

      .markdown-body span.align-center > span {
        display: block;
        margin: 13px auto 0;
        overflow: hidden;
        text-align: center;
      }

      .markdown-body span.align-center span img {
        margin: 0 auto;
        text-align: center;
      }

      .markdown-body span.align-right {
        display: block;
        overflow: hidden;
        clear: both;
      }

      .markdown-body span.align-right > span {
        display: block;
        margin: 13px 0 0;
        overflow: hidden;
        text-align: right;
      }

      .markdown-body span.align-right span img {
        margin: 0;
        text-align: right;
      }

      .markdown-body span.float-left {
        display: block;
        float: left;
        margin-right: 13px;
        overflow: hidden;
      }

      .markdown-body span.float-left span {
        margin: 13px 0 0;
      }

      .markdown-body span.float-right {
        display: block;
        float: right;
        margin-left: 13px;
        overflow: hidden;
      }

      .markdown-body span.float-right > span {
        display: block;
        margin: 13px auto 0;
        overflow: hidden;
        text-align: right;
      }

      .markdown-body code,
      .markdown-body tt {
        padding: 0.2em 0.4em;
        margin: 0;
        font-size: 85%;
        white-space: break-spaces;
        background-color: rgba(175, 184, 193, 0.2);
        border-radius: 6px;
      }

      .markdown-body code br,
      .markdown-body tt br {
        display: none;
      }

      .markdown-body del code {
        text-decoration: inherit;
      }

      .markdown-body samp {
        font-size: 85%;
      }

      .markdown-body pre code {
        font-size: 100%;
      }

      .markdown-body pre > code {
        padding: 0;
        margin: 0;
        word-break: normal;
        white-space: pre;
        background: transparent;
        border: 0;
      }

      .markdown-body .highlight {
        margin-bottom: 16px;
      }

      .markdown-body .highlight pre {
        margin-bottom: 0;
        word-break: normal;
      }

      .markdown-body .highlight pre,
      .markdown-body pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: #f6f8fa;
        border-radius: 6px;
      }

      .markdown-body pre code,
      .markdown-body pre tt {
        display: inline;
        max-width: auto;
        padding: 0;
        margin: 0;
        overflow: visible;
        line-height: inherit;
        word-wrap: normal;
        background-color: transparent;
        border: 0;
      }

      .markdown-body .csv-data td,
      .markdown-body .csv-data th {
        padding: 5px;
        overflow: hidden;
        font-size: 12px;
        line-height: 1;
        text-align: left;
        white-space: nowrap;
      }

      .markdown-body .csv-data .blob-num {
        padding: 10px 8px 9px;
        text-align: right;
        background: #ffffff;
        border: 0;
      }

      .markdown-body .csv-data tr {
        border-top: 0;
      }

      .markdown-body .csv-data th {
        font-weight: 600;
        background: #f6f8fa;
        border-top: 0;
      }

      .markdown-body .footnotes {
        font-size: 12px;
        color: #57606a;
        border-top: 1px solid #d0d7de;
      }

      .markdown-body .footnotes ol {
        padding-left: 16px;
      }

      .markdown-body .footnotes li {
        position: relative;
      }

      .markdown-body .footnotes li:target::before {
        position: absolute;
        top: -8px;
        right: -8px;
        bottom: -8px;
        left: -24px;
        pointer-events: none;
        content: "";
        border: 2px solid #0969da;
        border-radius: 6px;
      }

      .markdown-body .footnotes li:target {
        color: #24292f;
      }

      .markdown-body .footnotes .data-footnote-backref g-emoji {
        font-family: monospace;
      }

      .markdown-body .task-list-item {
        list-style-type: none;
      }

      .markdown-body .task-list-item label {
        font-weight: 400;
      }

      .markdown-body .task-list-item.enabled label {
        cursor: pointer;
      }

      .markdown-body .task-list-item + .task-list-item {
        margin-top: 3px;
      }

      .markdown-body .task-list-item .handle {
        display: none;
      }

      .markdown-body .task-list-item-checkbox {
        margin: 0 0.2em 0.25em -1.6em;
        vertical-align: middle;
      }

      .markdown-body .contains-task-list:dir(rtl) .task-list-item-checkbox {
        margin: 0 -1.6em 0.25em 0.2em;
      }

      .markdown-body ::-webkit-calendar-picker-indicator {
        filter: invert(50%);
      }
    `

    const styleElement = document.createElement('style')
    styleElement.innerHTML = style
    document.head.appendChild(styleElement)
  }
}
