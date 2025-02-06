// src/plugins/tasklist/TaskListUtils.ts

/**
 * 判断给定的文本是否为任务列表项
 * @param text 要判断的文本
 * @returns 如果是任务列表项则返回 true,否则返回 false
 */
export function isTaskListItem(text: string): boolean {
  return /^(\s*[-+*])\s*\[[\sx]\]\s*/.test(text)
}

/**
 * 判断给定的任务列表项是否已完成
 * @param text 要判断的任务列表项文本
 * @returns 如果任务列表项已完成则返回 true,否则返回 false
 */
export function isTaskListItemChecked(text: string): boolean {
  return /^(\s*[-+*])\s*\[[x]\]\s*/.test(text)
}

/**
 * 从任务列表项文本中提取任务列表项的内容
 * @param text 任务列表项文本
 * @returns 提取出的任务列表项内容
 */
export function extractTaskListItemContent(text: string): string {
  return text.replace(/^(\s*[-+*])\s*\[[\sx]\]\s*/, '')
}

/**
 * 切换任务列表项的完成状态
 * @param text 要切换完成状态的任务列表项文本
 * @returns 切换完成状态后的任务列表项文本
 */
export function toggleTaskListItem(text: string): string {
  if (isTaskListItemChecked(text)) {
    return text.replace(/^(\s*[-+*])\s*\[[x]\]\s*/, '$1 [ ] ')
  } else {
    return text.replace(/^(\s*[-+*])\s*\[[\s]\]\s*/, '$1 [x] ')
  }
}
