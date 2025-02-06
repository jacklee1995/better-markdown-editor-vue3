<template>
  <div class="home-demo-page">
    <header class="header">
      <h1 class="title">Markdown Editor Demo</h1>
      <p class="description">Experience the power of our Markdown editor!</p>
    </header>

    <main class="main">
      <div class="editor-container">
        <Editor v-model="markdownText" :options="editorOptions" @change="handleEditorChange" />
      </div>

      <div class="preview-container">
        <MarkdownRenderer :source="markdownText" />
      </div>
    </main>

    <footer class="footer">
      <p class="copyright">&copy; 2023 Markdown Editor. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Editor from '@/components/Editor.vue'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import { defaultEditorOptions } from '@/config/editor'

const markdownText = ref('# Welcome to Markdown Editor Demo!')

const editorOptions = ref({
  ...defaultEditorOptions,
  // Add custom options here
})

function handleEditorChange() {
  // Handle editor change event
  console.log('Editor content changed')
}
</script>

<style scoped lang="scss">
.home-demo-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .header {
    padding: 2rem;
    background-color: #f8f8f8;
    text-align: center;

    .title {
      margin-bottom: 1rem;
      font-size: 2.5rem;
      color: #333;
    }

    .description {
      font-size: 1.25rem;
      color: #666;
    }
  }

  .main {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    padding: 2rem;

    .editor-container,
    .preview-container {
      border: 1px solid #ccc;
      border-radius: 4px;
      overflow: hidden;
    }
  }

  .footer {
    padding: 1rem;
    background-color: #f8f8f8;
    text-align: center;
    font-size: 0.875rem;
    color: #999;
  }
}
</style>
