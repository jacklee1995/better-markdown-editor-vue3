# MarkdownHtmlWriter

`MarkdownHtmlWriter` 是 Markdown 模块中的一个重要组件，它负责将 Markdown 解析生成的 Token 列表渲染为 HTML 字符串。

## 1. 功能介绍

`MarkdownHtmlWriter` 的主要功能包括:

- 遍历 Token 列表，将每个 Token 渲染为对应的 HTML 标签或文本
- 支持自定义渲染器,可以自定义 Token 的渲染方式
- 支持渲染内联 Token 和块级 Token
- 可以和 `MarkdownParser`、`MarkdownTransformer` 等组件配合使用

通过 `MarkdownHtmlWriter`，我们可以方便地将 Markdown 文档转换为 HTML 页面，实现 Markdown 的预览和发布功能。

## 2. 使用方法

### 2.1 基本用法

下面是一个简单的示例，演示了如何使用 `MarkdownHtmlWriter` 将 Markdown 转换为 HTML:

```typescript
import { MarkdownParser, MarkdownHtmlWriter } from '@better-markdown/core'

// 创建 MarkdownParser 实例
const parser = new MarkdownParser()

// 创建 MarkdownHtmlWriter 实例
const writer = new MarkdownHtmlWriter(parser.getOptions())

// 解析 Markdown 为 Token 列表
const tokens = parser.parse('# Hello, world!')

// 将 Token 列表渲染为 HTML
const html = writer.render(tokens, parser.getOptions(), {})

console.log(html)
// 输出: <h1>Hello, world!</h1>
```

### 2.2 自定义渲染器

`MarkdownHtmlWriter` 支持自定义渲染器，可以通过 `use` 方法注册自定义的 Token 渲染函数:

```typescript
import { MarkdownParser, MarkdownHtmlWriter } from '@better-markdown/core'

// 创建 MarkdownParser 实例
const parser = new MarkdownParser()

// 创建 MarkdownHtmlWriter 实例
const writer = new MarkdownHtmlWriter(parser.getOptions())

// 注册自定义渲染器
writer.use((tokens, idx, options, env, self) => {
  const token = tokens[idx]
  if (token.type === 'heading') {
    const level = token.depth
    const text = self.renderInline(token.children ?? [], options, env)
    return `<h${level} id="${text.toLowerCase().replace(/\s+/g, '-')}">${text}</h${level}>\n`
  }
  return self.renderToken(tokens, idx, options)
})

// 解析 Markdown 为 Token 列表
const tokens = parser.parse('# Hello, world!')

// 将 Token 列表渲染为 HTML
const html = writer.render(tokens, parser.getOptions(), {})

console.log(html)
// 输出: <h1 id="hello-world">Hello, world!</h1>
```

在这个示例中，我们注册了一个自定义渲染器，它会为标题元素添加一个 `id` 属性，值为标题文本的 slug 化结果。这样就可以实现标题的锚点功能。

## 3. 实现原理

`MarkdownHtmlWriter` 的实现原理比较简单，主要是通过递归遍历 Token 列表，根据 Token 的类型调用对应的渲染方法，将 Token 转换为 HTML 标签或文本。

下面是 `MarkdownHtmlWriter` 的核心实现:

```typescript
export class MarkdownHtmlWriter implements Renderer {
  // ...

  public render(
    tokens: Token[],
    options: MarkdownParserOptions,
    env: Record<string, unknown>,
  ): string {
    let result = ''
    for (let i = 0; i < tokens.length; i++) {
      result += this.renderToken(tokens, i, options)
    }
    return result
  }

  public renderToken(tokens: Token[], idx: number, options: MarkdownParserOptions): string {
    const token = tokens[idx]
    const renderer = this.options.renderer

    switch (token.type) {
      case 'heading': {
        const level = token.depth
        const text = this.renderInline(token.children ?? [], options, {})
        if (renderer?.heading) {
          return renderer.heading(text, level)
        }
        return `<h${level}>${text}</h${level}>\n`
      }

      // ...

      default: {
        const text = this.renderInline(token.children ?? [], options, {})
        return text
      }
    }
  }

  // ...
}
```

`render` 方法是渲染的入口，它会遍历 Token 列表,对每个 Token 调用 `renderToken` 方法进行渲染。

`renderToken` 方法会根据 Token 的类型,调用对应的渲染方法。如果有自定义渲染器，则优先使用自定义渲染器。否则,使用默认的渲染逻辑。

对于块级 Token，`renderToken` 方法会递归渲染它的子 Token。对于内联 Token，则通过 `renderInline` 方法进行渲染。

通过这种递归的方式，`MarkdownHtmlWriter` 可以将整个 Token 树渲染为 HTML 字符串。

## 4. 小结

`MarkdownHtmlWriter` 是 Markdown 模块中非常重要的一个组件，它负责将 Markdown 解析生成的 Token 列表渲染为 HTML 字符串，是实现 Markdown 预览和发布功能的关键。

通过 `MarkdownHtmlWriter`，我们可以方便地自定义 Markdown 的渲染方式，满足不同场景下的需求。同时，它也为其他组件提供了基础设施，使得 Markdown 模块的扩展和集成变得更加容易。

如果你对 Markdown 的解析和渲染感兴趣，不妨阅读 `MarkdownHtmlWriter` 的源码，相信你会有更多的收获。
