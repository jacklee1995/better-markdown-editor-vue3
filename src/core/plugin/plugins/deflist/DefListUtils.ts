/**
 * 判断是否为定义列表的术语行
 * @param line 要判断的行文本
 * @returns 如果是定义列表的术语行则返回 true,否则返回 false
 */
export function isDefListTerm(line: string): boolean {
  return /^;/.test(line.trim())
}

/**
 * 判断是否为定义列表的定义行
 * @param line 要判断的行文本
 * @returns 如果是定义列表的定义行则返回 true,否则返回 false
 */
export function isDefListDefinition(line: string): boolean {
  return /^:/.test(line.trim())
}

/**
 * 从定义列表的术语行中提取术语文本
 * @param line 定义列表的术语行
 * @returns 提取出的术语文本
 */
export function extractDefListTerm(line: string): string {
  return line.trim().slice(1).trim()
}

/**
 * 从定义列表的定义行中提取定义文本
 * @param line 定义列表的定义行
 * @returns 提取出的定义文本
 */
export function extractDefListDefinition(line: string): string {
  return line.trim().slice(1).trim()
}
