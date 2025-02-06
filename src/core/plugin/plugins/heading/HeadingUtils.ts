// 标题工具函数
// src/plugins/heading/HeadingUtils.ts

/**
 * 根据标题级别获取对应的 HTML 标签名
 * @param level 标题级别,取值范围为 1~6
 * @returns 对应的 HTML 标签名
 */
export function getHeadingTag(level: number): string {
  if (level < 1 || level > 6) {
    throw new Error('Invalid heading level. It should be between 1 and 6.')
  }
  return `h${level}`
}

/**
 * 根据标题级别获取对应的 Markdown 语法
 * @param level 标题级别,取值范围为 1~6
 * @returns 对应的 Markdown 语法
 */
export function getHeadingMarkdown(level: number): string {
  if (level < 1 || level > 6) {
    throw new Error('Invalid heading level. It should be between 1 and 6.')
  }
  return '#'.repeat(level)
}

/**
 * 根据标题内容生成标题的 ID 属性值
 * @param text 标题内容
 * @returns 生成的 ID 属性值
 */
export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * 根据标题内容和级别创建锚点链接
 * @param text 标题内容
 * @param level 标题级别
 * @returns 锚点链接的 HTML 代码
 */
export function createHeadingAnchor(text: string, level: number): string {
  const id = generateHeadingId(text)
  const tag = getHeadingTag(level)
  return `<${tag} id="${id}"><a href="#${id}">${text}</a></${tag}>`
}

/**
 * 从 Markdown 标题文本中提取标题内容
 * @param text Markdown 标题文本
 * @returns 提取出的标题内容
 */
export function extractHeadingText(text: string): string {
  return text.replace(/^#+\s*/, '')
}

/**
 * 从 Markdown 标题文本中提取标题级别
 * @param text Markdown 标题文本
 * @returns 提取出的标题级别,如果不是有效的标题文本则返回 0
 */
export function extractHeadingLevel(text: string): number {
  const match = text.match(/^(#+)/)
  if (match) {
    return match[1].length
  }
  return 0
}

/**
 * 判断是否为 Markdown 标题文本
 * @param text 要判断的文本
 * @returns 如果是标题文本则返回 true,否则返回 false
 */
export function isHeading(text: string): boolean {
  return /^#+\s+/.test(text)
}
