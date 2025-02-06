# Markdown 转换器

`MarkdownTransformer` 是 Markdown 模块中最核心的类之一,它的主要职责是将 Markdown 文本转换为 HTML 或其他格式。它集成了 Markdown 解析、渲染和序列化的完整流程,并提供了灵活的 API 和配置项,方便用户进行定制和扩展。

下面我们来详细了解 `MarkdownTransformer` 的功能、用法和设计思想。

## 1. 功能介绍

`MarkdownTransformer` 的主要功能包括:

- 解析 Markdown 文本,生成 Token 列表
- 将 Token 列表渲染为 HTML 或其他格式
- 支持自定义渲染器,可以对渲染结果进行定制
- 支持插件机制,可以扩展 Markdown 语法和功能
- 提供事件机制,可以在解析和渲染过程中进行监听和处理
- 提供序列化功能,可以将 Token 列表转换回 Markdown 文本

通过 `MarkdownTransformer`,我们可以轻松地将 Markdown 文本转换为 HTML,并且可以通过自定义渲染器和插件来实现各种灵活的功能。

## 2. 基本用法

下面是一个简单的示例,演示了如何使用 `MarkdownTransformer` 将 Markdown 文本转换为 HTML:

```typescript
import { MarkdownTransformer } from '@/core/markdown'

// 创建 MarkdownTransformer 实例
const transformer = new MarkdownTransformer({
  // 配置解析器选项
  gfm: true,
  breaks: true,
  // ...
})

// 解析 Markdown 文本
const tokens = transformer.parse('# Hello, Markdown!')

// 渲染为 HTML
const html = transformer.renderToHtml(tokens)

console.log(html)
// 输出: <h1>Hello, Markdown!</h1>
```

在这个示例中,我们首先创建了一个 `MarkdownTransformer` 实例,并传入了一些解析器选项。然后,我们调用 `parse` 方法将 Markdown 文本解析为 Token 列表,再调用 `renderToHtml` 方法将 Token 列表渲染为 HTML 字符串。

`MarkdownTransformer` 还提供了一些其他常用的方法:

- `render(src: string, env?: any): string`: 直接将 Markdown 文本渲染为 HTML,是 `parse` 和 `renderToHtml` 的组合。
- `renderToText(tokens: Token[]): string`: 将 Token 列表渲染为纯文本格式的 Markdown。
- `serialize(tokens: Token[]): string`: 将 Token 列表序列化为 Markdown 文本。

## 3. 自定义渲染器

`MarkdownTransformer` 支持自定义渲染器,可以对渲染结果进行定制。我们可以通过传入一个 `renderer` 选项来自定义渲染器:

```typescript
import { MarkdownTransformer } from '@/core/markdown'

const transformer = new MarkdownTransformer({
  renderer: {
    heading(text: string, level: number) {
      // 自定义标题渲染
      return `<h${level} class="my-heading">${text}</h${level}>`
    },
    link(href: string, title: string, text: string) {
      // 自定义链接渲染
      return `<a href="${href}" title="${title}" target="_blank">${text}</a>`
    },
    // ...
  },
})
```

在这个示例中,我们传入了一个 `renderer` 选项,其中定义了 `heading` 和 `link` 两个渲染方法,用于自定义标题和链接的渲染结果。

`MarkdownTransformer` 内置了一些默认的渲染器,包括:

- `heading`: 渲染标题
- `paragraph`: 渲染段落
- `text`: 渲染文本
- `strong`: 渲染加粗文本
- `em`: 渲染斜体文本
- `codespan`: 渲染行内代码
- `br`: 渲染换行符
- `del`: 渲染删除线
- `link`: 渲染链接
- `image`: 渲染图片
- `code`: 渲染代码块
- `blockquote`: 渲染引用
- `hr`: 渲染分隔线
- `list`: 渲染列表
- `listitem`: 渲染列表项
- `table`: 渲染表格
- `html`: 渲染原始 HTML

我们可以根据需要,选择性地覆盖这些默认渲染器。

## 4. 插件机制

`MarkdownTransformer` 支持插件机制,可以通过插件来扩展 Markdown 语法和功能。插件可以通过 `use` 方法注册到 `MarkdownTransformer` 实例中:

```typescript
import { MarkdownTransformer } from '@/core/markdown'
import { MyPlugin } from './MyPlugin'

const transformer = new MarkdownTransformer()

// 注册插件
transformer.use(MyPlugin)
```

插件需要实现 `MarkdownExtension` 接口,其中包含以下属性和方法:

- `name: string`: 插件名称
- `level: 'block' | 'inline' | 'core'`: 插件级别
- `start(src: string): string`: 插件启动方法,在解析 Markdown 文本之前调用
- `tokenizer(src: string): Token[]`: 插件 Token 化方法,将 Markdown 文本转换为 Token 列表
- `renderer(tokens: Token[], idx: number, options: MarkdownParserOptions, env: any, self: Renderer): string`: 插件渲染方法,将 Token 列表渲染为 HTML 或其他格式

通过插件,我们可以方便地扩展 Markdown 的语法和功能,例如添加新的标记、实现自定义的渲染效果等。

## 5. 事件机制

`MarkdownTransformer` 提供了事件机制,可以在解析和渲染过程中进行监听和处理。通过 `on` 方法,我们可以注册事件监听器:

```typescript
import { MarkdownTransformer } from '@/core/markdown'

const transformer = new MarkdownTransformer()

// 监听解析开始事件
transformer.on('parse:start', () => {
  console.log('Markdown parsing started.')
})

// 监听解析完成事件
transformer.on('parse:end', (tokens: Token[]) => {
  console.log('Markdown parsing finished.')
  console.log('Generated tokens:', tokens)
})

// 监听渲染开始事件
transformer.on('render:start', (tokens: Token[]) => {
  console.log('Markdown rendering started.')
  console.log('Tokens to render:', tokens)
})

// 监听渲染完成事件
transformer.on('render:end', (html: string) => {
  console.log('Markdown rendering finished.')
  console.log('Generated HTML:', html)
})
```

`MarkdownTransformer` 内置了以下事件:

- `parse:start`: 解析开始事件,在开始解析 Markdown 文本之前触发
- `parse:end`: 解析完成事件,在解析完成后触发,参数为生成的 Token 列表
- `render:start`: 渲染开始事件,在开始渲染 Token 列表之前触发,参数为要渲染的 Token 列表
- `render:end`: 渲染完成事件,在渲染完成后触发,参数为生成的 HTML 字符串

通过事件机制,我们可以在解析和渲染的过程中进行一些自定义的处理,例如记录日志、收集统计信息等。

## 6. 设计思想

`MarkdownTransformer` 的设计思想主要体现在以下几个方面:

- 职责单一: `MarkdownTransformer` 只负责 Markdown 文本的解析和渲染,不关心其他的功能,例如编辑器的实现、文档的存储等。
- 可扩展性: 通过插件机制和自定义渲染器,`MarkdownTransformer` 可以方便地扩展 Markdown 的语法和功能,满足不同场景下的需求。
- 事件驱动: 通过事件机制,`MarkdownTransformer` 可以在解析和渲染的过程中进行监听和处理,实现一些自定义的功能。
- 可测试性: `MarkdownTransformer` 的各个部分都是可测试的,包括 Markdown 解析器、Token 化器、渲染器等,可以编写单元测试来保证代码的正确性。

## 7. 小结

`MarkdownTransformer` 是 Markdown 模块中最核心的类之一,它负责将 Markdown 文本转换为 HTML 或其他格式。它提供了灵活的 API 和配置项,支持自定义渲染器和插件机制,可以方便地扩展 Markdown 的语法和功能。

通过 `MarkdownTransformer`,我们可以轻松地实现 Markdown 的解析和渲染,并且可以根据需要进行定制和扩展。

如果你想要深入了解 `MarkdownTransformer` 的实现细节,可以阅读源代码 `src/core/markdown/MarkdownTransformer.ts`,相信你会有更多的收获。 