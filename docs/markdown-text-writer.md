# MarkdownTextWriter

`MarkdownTextWriter` 是 Markdown Better 编辑器的一个重要组件,它负责将 Markdown 解析后的 Token 列表渲染为纯文本格式的 Markdown 内容。

通过 `MarkdownTextWriter`,我们可以方便地将编辑器中的 Markdown 文档转换为纯文本,实现 Markdown 的导出和备份功能。

下面我们来详细了解 `MarkdownTextWriter` 的功能、接口和使用方法。

## 1. 功能介绍

`MarkdownTextWriter` 的主要功能包括:

- 将 Markdown Token 列表渲染为纯文本格式的 Markdown
- 支持自定义渲染规则,可以对不同类型的 Token 进行特殊处理
- 提供了一组方法,用于渲染整个 Token 列表、渲染行内 Token 以及渲染单个 Token
- 可以与 `MarkdownParser`、`MarkdownTransformer` 等组件配合使用,实现 Markdown 的解析和导出功能

## 2. 接口说明

`MarkdownTextWriter` 实现了 `Renderer` 接口,该接口定义了以下几个方法:

### 2.1 render(tokens: Token[], options: MarkdownParserOptions, env: any): string

渲染 Token 列表为纯文本格式的 Markdown。

- `tokens`: 要渲染的 Token 列表
- `options`: Markdown 解析选项
- `env`: 渲染环境变量
- 返回值: 渲染后的 Markdown 文本

### 2.2 renderInline(tokens: Token[], options: MarkdownParserOptions, env: any): string

渲染行内 Token 列表为纯文本格式的 Markdown。

- `tokens`: 要渲染的行内 Token 列表
- `options`: Markdown 解析选项
- `env`: 渲染环境变量
- 返回值: 渲染后的 Markdown 文本

### 2.3 renderToken(tokens: Token[], idx: number, options: MarkdownParserOptions): string

渲染单个 Token 为纯文本格式的 Markdown。

- `tokens`: Token 列表
- `idx`: 要渲染的 Token 在列表中的索引
- `options`: Markdown 解析选项
- 返回值: 渲染后的 Markdown 文本

## 3. 使用示例

下面是一个简单的示例,演示了如何使用 `MarkdownTextWriter` 将 Markdown 文档转换为纯文本:

```typescript
import { MarkdownParser, MarkdownTextWriter } from '@better-markdown/core'

// 创建 MarkdownParser 实例
const parser = new MarkdownParser()

// 创建 MarkdownTextWriter 实例
const writer = new MarkdownTextWriter({})

// 要转换的 Markdown 源码
const src = `
# Hello, World!

This is a **Markdown** document.

- Item 1
- Item 2
- Item 3
`

// 解析 Markdown 为 Token 列表
const tokens = parser.parse(src)

// 将 Token 列表渲染为纯文本格式的 Markdown
const text = writer.render(tokens, {}, {})

console.log(text)
```

输出结果:

```markdown
# Hello, World!

This is a **Markdown** document.

- Item 1
- Item 2
- Item 3
```

可以看到,`MarkdownTextWriter` 成功地将 Markdown Token 列表渲染为了纯文本格式的 Markdown 内容,实现了 Markdown 的还原。

## 4. 自定义渲染规则

`MarkdownTextWriter` 支持自定义渲染规则,你可以通过扩展 `MarkdownTextWriter` 类并覆盖 `renderToken` 方法来实现。

例如,下面的代码演示了如何自定义 `strong` 类型 Token 的渲染规则:

```typescript
import { MarkdownTextWriter, MarkdownParserOptions, Token } from '@better-markdown/core'

class MyMarkdownTextWriter extends MarkdownTextWriter {
  renderToken(tokens: Token[], idx: number, options: MarkdownParserOptions): string {
    const token = tokens[idx]
    if (token.type === 'strong') {
      // 自定义 strong 类型 Token 的渲染规则
      return `**${this.renderInline(token.children ?? [], options, {})}**`
    }
    // 调用父类的 renderToken 方法渲染其他类型的 Token
    return super.renderToken(tokens, idx, options)
  }
}
```

在这个示例中,我们扩展了 `MarkdownTextWriter` 类,并覆盖了 `renderToken` 方法。当遇到 `strong` 类型的 Token 时,我们使用自定义的规则进行渲染,将加粗的文本转换为 `**text**` 的形式。

通过这种方式,你可以灵活地定制 `MarkdownTextWriter` 的渲染行为,满足不同场景下的需求。

## 5. 小结

`MarkdownTextWriter` 是 Markdown Better 编辑器中一个非常实用的组件,它允许我们将 Markdown 文档转换为纯文本格式,方便进行导出和备份。

通过 `MarkdownTextWriter` 提供的接口和自定义渲染规则,我们可以轻松地实现 Markdown 的还原和转换功能,提高编辑器的可用性和灵活性。

如果你正在开发 Markdown 相关的应用,不妨尝试使用 `MarkdownTextWriter`,相信它会给你带来很多便利。

如果你对 `MarkdownTextWriter` 有任何疑问或建议,欢迎随时交流。 