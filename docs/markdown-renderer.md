# MarkdownRenderer 组件

`MarkdownRenderer` 是一个 Vue 3 组件,用于将 Markdown 文本解析并渲染为 HTML。它封装了 Markdown 解析和渲染的逻辑,使你可以轻松地在 Vue 应用中显示 Markdown 内容。

## 1. 功能特性

- 支持标准 Markdown 语法,如标题、段落、列表、链接、图片等
- 支持 GitHub Flavored Markdown (GFM) 扩展,如表格、任务列表、删除线等
- 支持自定义 Markdown 解析选项,如是否启用 GFM、是否转换换行符等
- 支持自定义渲染器,可以自定义各种 Markdown 元素的渲染方式
- 自动监听 Markdown 文本和解析选项的变化,实时更新渲染结果
- 使用 `markdown-body` 类名包装渲染后的 HTML,可以方便地应用样式

## 2. 使用方法

### 2.1 安装依赖

首先,确保你已经安装了 `@better-markdown/core` 包:

```bash
npm install @better-markdown/core
```

### 2.2 导入组件

在需要使用 `MarkdownRenderer` 的组件中,导入它:

```js
import { MarkdownRenderer } from '@better-markdown/core'
```

### 2.3 注册组件

在组件的 `components` 选项中注册 `MarkdownRenderer`:

```js
export default {
  components: {
    MarkdownRenderer
  }
  // ...
}
```

### 2.4 使用组件

在模板中使用 `<MarkdownRenderer>` 组件,传入 `value` 和 `options` 属性:

```html
<template>
  <MarkdownRenderer :value="markdownText" :options="markdownOptions" />
</template>
```

- `value`: 要渲染的 Markdown 文本,类型为 `string`。
- `options`: Markdown 解析选项,类型为 `MarkdownParserOptions`,可选。

### 2.5 示例

下面是一个完整的示例:

```html
<template>
  <div>
    <textarea v-model="markdownText"></textarea>
    <MarkdownRenderer :value="markdownText" :options="markdownOptions" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { MarkdownRenderer } from '@better-markdown/core'

export default defineComponent({
  components: {
    MarkdownRenderer
  },
  setup() {
    const markdownText = ref('# Hello, Markdown!')
    const markdownOptions = ref({
      gfm: true,
      breaks: true
    })

    return {
      markdownText,
      markdownOptions
    }
  }
})
</script>
```

在这个示例中,我们使用了一个 `<textarea>` 来编辑 Markdown 文本,并将其绑定到 `markdownText` 变量。然后,将 `markdownText` 传递给 `<MarkdownRenderer>` 组件的 `value` 属性,同时传入了一些解析选项。

当 `markdownText` 发生变化时,`<MarkdownRenderer>` 组件会自动重新渲染 Markdown 内容。

## 3. 实现原理

`MarkdownRenderer` 组件的实现原理如下:

1. 在组件的 `setup` 函数中,创建了一个 `MarkdownParser` 实例,用于解析 Markdown 文本。
2. 定义了一个 `render` 函数,用于将 Markdown 文本解析为 HTML,并将结果存储在 `html` 变量中。
3. 使用 `watch` 监听 `value` 和 `options` 属性的变化,当它们发生变化时,自动调用 `render` 函数重新渲染。
4. 在组件的模板中,将 `html` 变量通过 `v-html` 指令渲染到页面上,并使用 `markdown-body` 类名包装渲染后的 HTML。

下面是 `MarkdownRenderer` 组件的简化实现:

```js
import { defineComponent, ref, watch } from 'vue'
import { MarkdownParser } from '@better-markdown/core'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const parser = new MarkdownParser(props.options)
    const html = ref('')

    const render = () => {
      html.value = parser.parse(props.value)
    }

    watch(() => props.value, render, { immediate: true })
    watch(() => props.options, render, { deep: true })

    return () => <div class="markdown-body" v-html={html.value}></div>
  }
})
```

## 4. 小结

`MarkdownRenderer` 组件是 Better Markdown 编辑器中一个非常实用的组件,它使得在 Vue 应用中集成 Markdown 变得非常简单。

通过 `MarkdownRenderer`,你可以轻松地将 Markdown 文本渲染为 HTML,并且可以自定义解析选项和渲染器,以满足不同的需求。

`MarkdownRenderer` 组件的实现也非常简洁,它巧妙地利用了 Vue 3 的组合式 API 和侦听器,实现了自动更新和渲染。

如果你正在开发一个支持 Markdown 的 Vue 应用,不妨试试 `MarkdownRenderer` 组件,相信它会给你带来很大的帮助。 