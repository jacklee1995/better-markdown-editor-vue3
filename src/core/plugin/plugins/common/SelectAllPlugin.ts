import { BasePlugin } from '../../BasePlugin'
import type { PluginAPI } from '../../PluginAPI'

/**
 * 全选插件
 * 在 Markdown 编辑器中按下 Ctrl+A 时选中所有文本
 */
export class SelectAllPlugin extends BasePlugin {
  public name = 'select-all'
  public level: 'block' | 'inline' | 'core' = 'core'

  /**
   * 插件扩展方法
   * @param api 插件 API
   */
  public extend(api: PluginAPI): void {
    const md = api.getMarkdownTransformer()
    md.on('keydown', this.onKeydown.bind(this))
  }

  /**
   * 键盘事件处理方法
   * @param event 键盘事件对象
   */
  private onKeydown(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'a') {
      event.preventDefault()
      this.selectAll()
    }
  }

  /**
   * 选中所有文本
   */
  private selectAll(): void {
    const textarea = document.querySelector<HTMLTextAreaElement>('.markdown-editor')
    if (textarea) {
      textarea.select()
    }
  }
}
