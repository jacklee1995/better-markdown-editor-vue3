<template>
  <div class="preview-markdown-page">
    <div class="toolbar">
      <button @click="toggleDarkMode">{{ darkMode ? 'Light Mode' : 'Dark Mode' }}</button>
      <button @click="print">Print</button>
    </div>
    <div class="markdown-body" :class="{ 'dark-mode': darkMode }" v-html="html"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMarkdownStore } from '@store/modules/markdown'
import { storeToRefs } from 'pinia'

const route = useRoute()
const markdownStore = useMarkdownStore()
const { html } = storeToRefs(markdownStore)

const darkMode = ref(false)

onMounted(() => {
  const id = route.params.id as string
  markdownStore.fetchMarkdown(id)
})

function toggleDarkMode() {
  darkMode.value = !darkMode.value
}

function print() {
  window.print()
}
</script>

<style lang="scss" scoped>
.preview-markdown-page {
  padding: 20px;

  .toolbar {
    margin-bottom: 20px;
    button {
      margin-right: 10px;
    }
  }

  .markdown-body {
    &.dark-mode {
      color: #fff;
      background: #000;
    }
  }
}
</style>
