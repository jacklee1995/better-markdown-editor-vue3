/**
 * 判断是否为脚注定义行
 * @param line 要判断的行文本
 * @returns 如果是脚注定义行则返回 true,否则返回 false
 */
export function isFootnoteDefinition(line: string): boolean {
  return /^\[\^[^\]]+\]:/.test(line.trim())
}

/**
 * 判断是否为脚注引用行
 * @param line 要判断的行文本
 * @returns 如果是脚注引用行则返回 true,否则返回 false
 */
export function isFootnoteReference(line: string): boolean {
  return /\[\^[^\]]+\]/.test(line.trim())
}

/**
 * 从脚注定义行中提取脚注名称
 * @param line 脚注定义行
 * @returns 提取出的脚注名称
 */
export function extractFootnoteDefinitionName(line: string): string {
  const match = line.trim().match(/^\[\^([^\]]+)\]:/)
  return match ? match[1] : ''
}

/**
 * 从脚注定义行中提取脚注内容
 * @param line 脚注定义行
 * @returns 提取出的脚注内容
 */
export function extractFootnoteDefinitionContent(line: string): string {
  return line
    .trim()
    .replace(/^\[\^[^\]]+\]:/, '')
    .trim()
}

/**
 * 从脚注引用行中提取脚注名称
 * @param line 脚注引用行
 * @returns 提取出的脚注名称
 */
export function extractFootnoteReferenceName(line: string): string {
  const match = line.trim().match(/\[\^([^\]]+)\]/)
  return match ? match[1] : ''
}

/**
 * 生成脚注定义的 HTML 代码
 * @param name 脚注名称
 * @param content 脚注内容
 * @returns 生成的 HTML 代码
 */
export function generateFootnoteDefinitionHtml(name: string, content: string): string {
  return `<div class="footnote-definition" id="footnote-definition-${name}">
    <sup>${name}</sup>
    <p>${content}</p>
  </div>`
}

/**
 * 生成脚注引用的 HTML 代码
 * @param name 脚注名称
 * @returns 生成的 HTML 代码
 */
export function generateFootnoteReferenceHtml(name: string): string {
  return `<sup class="footnote-reference">
    <a href="#footnote-definition-${name}">[${name}]</a>
  </sup>`
}
