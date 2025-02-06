/**
 * 从代码块的语言标识中提取语言名称
 * @param lang 代码块的语言标识
 * @returns 提取出的语言名称,如果没有语言标识则返回 ''
 */
export function extractLanguage(lang?: string): string {
  if (!lang) {
    return ''
  }
  return lang.trim().toLowerCase()
}

/**
 * 从代码块的源代码中提取代码内容
 * @param src 代码块的源代码
 * @returns 提取出的代码内容
 */
export function extractCode(src: string): string {
  return src.replace(/^\n|\n$/g, '')
}

/**
 * 判断是否为代码块的开始标记
 * @param line 要判断的行文本
 * @returns 如果是代码块的开始标记则返回 true,否则返回 false
 */
export function isCodeBlockStart(line: string): boolean {
  return /^```(?:\w+)?$/.test(line.trim())
}

/**
 * 判断是否为代码块的结束标记
 * @param line 要判断的行文本
 * @returns 如果是代码块的结束标记则返回 true,否则返回 false
 */
export function isCodeBlockEnd(line: string): boolean {
  return line.trim() === '```'
}

/**
 * 获取代码块的语言标识
 * @param line 代码块的开始标记行
 * @returns 提取出的语言标识,如果没有语言标识则返回 undefined
 */
export function getCodeBlockLanguage(line: string): string | undefined {
  const match = line.match(/^```(\w+)$/)
  if (match) {
    return match[1]
  }
  return undefined
}

/**
 * 统计代码行数
 * @param code 代码内容
 * @returns 代码行数
 */
export function countCodeLines(code: string): number {
  return code.split('\n').length
}

/**
 * 获取指定行号的代码
 * @param code 代码内容
 * @param lineNumber 行号,从 1 开始
 * @returns 指定行号的代码,如果行号超出范围则返回 ''
 */
export function getCodeLine(code: string, lineNumber: number): string {
  const lines = code.split('\n')
  if (lineNumber < 1 || lineNumber > lines.length) {
    return ''
  }
  return lines[lineNumber - 1]
}

/**
 * 复制代码到剪贴板
 * @param code 要复制的代码
 */
export function copyToClipboard(code: string): void {
  const textarea = document.createElement('textarea')
  textarea.value = code
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}
