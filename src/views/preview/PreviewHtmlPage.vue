<template>
  <div class="preview-html-page">
    <div class="preview-html-container">
      <iframe :srcdoc="htmlContent" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEditorStore } from '@/store/editor'

const route = useRoute()
const editorStore = useEditorStore()

const htmlContent = ref('')

onMounted(async () => {
  // Get the HTML content from the editor store based on the route params
  const { path } = route.params
  const content = await editorStore.getHtmlContent(path as string)
  htmlContent.value = content
})
</script>

<style lang="scss" scoped>
.preview-html-page {
  height: 100%;

  .preview-html-container {
    height: 100%;

    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
