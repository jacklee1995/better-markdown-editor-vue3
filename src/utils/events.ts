/**
 * 事件监听器类型定义
 * @template Args 事件参数类型,默认为 unknown[]
 */
export type EventListener<Args extends unknown[] = unknown[]> = (...args: Args) => void

/**
 * 事件发射器类
 * @template EventType 事件类型,默认为 string
 * @template Args 事件参数类型,默认为 unknown[]
 */
export class EventEmitter<EventType extends string = string, Args extends unknown[] = unknown[]> {
  private _events: Map<EventType, EventListener<Args>[]>
  private _maxListeners: number

  constructor() {
    this._events = new Map()
    this._maxListeners = 10
  }

  /**
   * 添加事件监听器
   * @param event 事件名
   * @param listener 事件监听器
   * @returns 返回当前 EventEmitter 实例,以便链式调用
   */
  addListener(event: EventType, listener: EventListener<Args>): this {
    const listeners = this._events.get(event) ?? []
    listeners.push(listener)
    this._events.set(event, listeners)
    if (listeners.length === this._maxListeners) {
      throw Error('Max listeners exceeded')
    }
    return this
  }

  /**
   * 移除指定的事件监听器
   * @param event 事件名
   * @param listener 要移除的事件监听器
   * @returns 返回当前 EventEmitter 实例,以便链式调用
   */
  removeListener(event: EventType, listener: EventListener<Args>): this {
    const listeners = this._events.get(event)
    if (listeners) {
      const index = listeners.indexOf(listener)
      if (index !== -1) {
        listeners.splice(index, 1)
      }
    }
    return this
  }

  /**
   * 移除指定事件的所有监听器,如果未指定事件则移除所有事件的所有监听器
   * @param event 事件名,可选
   * @returns 返回当前 EventEmitter 实例,以便链式调用
   */
  removeAllListeners(event?: EventType): this {
    if (event) {
      this._events.delete(event)
    } else {
      this._events.clear()
    }
    return this
  }

  /**
   * 设置最大事件监听器数量
   * @param n 最大事件监听器数量
   */
  set maxListeners(n: number) {
    this._maxListeners = n
  }

  /**
   * 获取最大事件监听器数量
   * @returns 最大事件监听器数量
   */
  get maxListeners(): number {
    return this._maxListeners
  }

  /**
   * 设置最大事件监听器数量
   * @param n 最大事件监听器数量
   * @returns 返回当前 EventEmitter 实例,以便链式调用
   */
  setMaxListeners(n: number): this {
    this._maxListeners = n
    return this
  }

  /**
   * 获取指定事件的监听器数组
   * @param event 事件名
   * @returns 指定事件的监听器数组
   */
  listeners(event: EventType): EventListener<Args>[] {
    return [...(this._events.get(event) ?? [])]
  }

  /**
   * 获取指定事件的原始监听器数组
   * @param event 事件名
   * @returns 指定事件的原始监听器数组
   */
  rawListeners(event: EventType): EventListener<Args>[] {
    return this._events.get(event) ?? []
  }

  /**
   * 触发指定事件,并传递事件参数
   * @param event 事件名
   * @param args 事件参数
   * @returns 如果事件存在监听器,则返回 true,否则返回 false
   */
  emit(event: EventType, ...args: Args): boolean {
    const listeners = this._events.get(event)
    if (!listeners) {
      return false
    }
    listeners.forEach((listener) => {
      listener(...args)
    })
    return true
  }

  /**
   * 获取指定事件的监听器数量
   * @param event 事件名
   * @returns 指定事件的监听器数量
   */
  listenerCount(event: EventType): number {
    return this._events.get(event)?.length ?? 0
  }

  /**
   * 将事件监听器添加到指定事件的监听器数组的开头
   * @param event 事件名
   * @param listener 事件监听器
   * @returns 返回当前 EventEmitter 实例,以便链式调用
   */
  prependListener(event: EventType, listener: EventListener<Args>): this {
    const listeners = this._events.get(event) ?? []
    listeners.unshift(listener)
    this._events.set(event, listeners)
    if (listeners.length === this._maxListeners) {
      console.warn(`Max listeners (${this._maxListeners}) reached for event ${event}`)
    }
    return this
  }

  /**
   * 将一次性事件监听器添加到指定事件的监听器数组的开头
   * @param event 事件名
   * @param listener 事件监听器
   * @returns 返回当前 EventEmitter 实例,以便链式调用
   */
  prependOnceListener(event: EventType, listener: EventListener<Args>): this {
    const onceListener = (...args: Args) => {
      this.removeListener(event, onceListener)
      listener(...args)
    }
    this.prependListener(event, onceListener)
    return this
  }

  /**
   * 添加一次性事件监听器
   * @param event 事件名
   * @param listener 事件监听器
   * @returns 返回当前 EventEmitter 实例,以便链式调用
   */
  once(event: EventType, listener: EventListener<Args>): this {
    const onceListener = (...args: Args) => {
      this.removeListener(event, onceListener)
      listener(...args)
    }
    this.addListener(event, onceListener)
    return this
  }
}
