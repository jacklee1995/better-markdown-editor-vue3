// Markdown AST遍历器
// src/core/markdown/MarkdownWalker.ts

import type { Token } from './interface'

/**
 * Markdown AST 遍历器类
 * 负责遍历 Markdown 解析生成的抽象语法树 (AST)
 */
export class MarkdownWalker {
  /**
   * 要遍历的 Token 数组
   */
  private tokens: Token[]

  /**
   * 遍历选项
   * 包含进入和离开节点时的回调函数
   */
  private options: WalkerOptions

  /**
   * 构造函数
   * @param tokens 要遍历的 Token 数组
   * @param options 遍历选项
   */
  constructor(tokens: Token[], options: WalkerOptions = {}) {
    this.tokens = tokens
    this.options = options
  }

  /**
   * 开始遍历 Token 数组
   */
  public walk(): void {
    this.walkTokens(this.tokens)
  }

  /**
   * 递归遍历 Token 数组
   * @param tokens 当前遍历的 Token 数组
   */
  private walkTokens(tokens: Token[]): void {
    for (const token of tokens) {
      // 进入节点时调用回调
      this.options.enter?.(token)
      // 如果节点有子节点，递归遍历
      if (token.children && token.children.length > 0) {
        this.walkTokens(token.children)
      }
      // 离开节点时调用回调
      this.options.leave?.(token)
    }
  }
}

/**
 * 遍历选项接口
 * 包含进入和离开节点时的回调函数
 */
export interface WalkerOptions {
  /**
   * 进入节点时的回调函数
   * @param token 当前节点
   */
  enter?: (token: Token) => void

  /**
   * 离开节点时的回调函数
   * @param token 当前节点
   */
  leave?: (token: Token) => void
}
