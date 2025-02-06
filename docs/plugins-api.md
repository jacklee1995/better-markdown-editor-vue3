# 插件 API

在 Markdown Better 编辑器的插件系统中,`PluginAPI` 类提供了一组方法,用于管理和操作插件。通过 `PluginAPI`,插件可以访问编辑器的核心功能,实现更加强大和灵活的扩展。

下面我们来详细了解 `PluginAPI` 的设计思想、接口解析和使用方法。

## 1. 设计思想

`PluginAPI` 的设计思想主要包括:

- 提供一组统一的 API,封装编辑器的核心功能
- 简化插件的开发,提供常用的工具函数和辅助方法
- 控制插件的访问权限,保证编辑器的安全和稳定
- 支持插件的链式调用,提高代码的可读性和可维护性

通过 `PluginAPI`,我们可以将编辑器的核心功能和插件的扩展功能解耦,让插件专注于自己的业务逻辑,而不需要关心编辑器的内部实现。

## 2. 接口解析

`PluginAPI` 类提供了以下几个主要的接口:

### 2.1 use(plugin: BasePlugin, options?: PluginOptions): this

注册一个插件,可以传入插件的选项。

- `plugin`: 要注册的插件实例
- `options`: 插件的选项,可选

### 2.2 getPlugin(name: string): BasePlugin | undefined

根据名称获取指定的插件实例。

- `name`: 插件的名称

### 2.3 removePlugin(name: string): this

移除指定名称的插件。

- `name`: 要移除的插件名称

### 2.4 hasPlugin(name: string): boolean

判断是否存在指定名称的插件。

- `name`: 插件的名称

### 2.5 getPlugins(): BasePlugin[]

获取所有已注册的插件实例。

### 2.6 getBlockPlugins(): BasePlugin[]

获取所有块级插件实例。

### 2.7 getInlinePlugins(): BasePlugin[]

获取所有行内插件实例。

### 2.8 getCorePlugins(): BasePlugin[]

获取所有核心插件实例。

### 2.9 process(src: string): string

处理 Markdown 源码,依次应用核心插件、块级插件和行内插件。

- `src`: 要处理的 Markdown 源码

### 2.10 getMarkdownTransformer(): MarkdownTransformer

获取 Markdown 编辑器实例。

## 3. 使用方法

下面是一个简单的示例,演示了如何在插件中使用 `PluginAPI`:

```typescript
import { BasePlugin, PluginAPI } from '@better-markdown/core'

class MyPlugin extends BasePlugin {
  name = 'my-plugin'
  
  extend(api: PluginAPI) {
    // 注册其他插件
    api.use(new OtherPlugin())
    
    // 判断是否存在指定插件
    if (api.hasPlugin('other-plugin')) {
      // ...
    }
    
    // 获取指定插件实例
    const otherPlugin = api.getPlugin('other-plugin')
    
    // 移除指定插件
    api.removePlugin('other-plugin')
    
    // 获取所有插件
    const plugins = api.getPlugins()
    
    // 获取编辑器实例
    const editor = api.getMarkdownTransformer()
  }
  
  start(src: string) {
    // 处理 Markdown 源码
    const result = this.api.process(src)
    
    return result
  }
}
```

在这个示例中,`MyPlugin` 插件通过 `extend` 方法获取到 `PluginAPI` 实例,然后可以调用 `PluginAPI` 提供的各种方法来管理和操作其他插件,以及访问编辑器实例。

在 `start` 方法中,插件可以调用 `api.process` 方法来处理 Markdown 源码,该方法会依次应用核心插件、块级插件和行内插件,返回处理后的结果。

## 4. 最佳实践

为了更好地利用 `PluginAPI`,我们推荐遵循以下最佳实践:

- 插件应该只注册和操作自己需要的插件,不要干扰其他插件的行为
- 插件应该合理使用 `PluginAPI` 提供的方法,避免过度调用,影响性能
- 插件应该注意异常处理,避免影响编辑器的稳定性
- 插件应该遵循编辑器的插件开发规范,保证插件的质量和可维护性

## 5. 小结

`PluginAPI` 为 Markdown Better 编辑器的插件提供了一组强大、灵活、安全的 API。通过 `PluginAPI`,插件可以访问编辑器的核心功能,实现各种自定义的扩展。

在开发插件时,我们应该合理利用 `PluginAPI`,遵循最佳实践,提高插件的性能和可维护性。

如果你对 `PluginAPI` 有任何疑问或建议,欢迎随时交流。 