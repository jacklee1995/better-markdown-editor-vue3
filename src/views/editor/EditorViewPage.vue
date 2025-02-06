<template>
  <div class="editor-view-page">
    <div class="view-header">
      <h1 class="view-title">{{ title }}</h1>
      <div class="view-toolbar">
        <button class="toolbar-btn" @click="print">Print</button>
        <button class="toolbar-btn" @click="exportPDF">Export PDF</button>
        <button class="toolbar-btn" @click="exportHTML">Export HTML</button>
      </div>
    </div>

    <div class="view-content">
      <MarkdownRenderer :content="content" />
    </div>

    <div class="view-footer">
      <router-link to="/editor" class="back-link">Back to Editor</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEditorStore } from '@/store/modules/editor'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'

const route = useRoute()
const editorStore = useEditorStore()
const { getDoc } = editorStore
const { content } = storeToRefs(editorStore)

const docId = computed(() => route.params.id as string)
const doc = computed(() => getDoc(docId.value))

const title = computed(() => doc.value?.title || 'Untitled Document')

function print() {
  window.print()
}

function exportPDF() {
  // TODO: Implement PDF export
  console.log('Export PDF')
}

function exportHTML() {
  // TODO: Implement HTML export
  console.log('Export HTML')
}
</script>

<style lang="scss" scoped>
.editor-view-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  .view-header {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid #ccc;

    .view-title {
      margin: 0;
      font-size: 24px;
    }

    .view-toolbar {
      .toolbar-btn {
        margin-left: 10px;
        padding: 8px 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: white;
        cursor: pointer;
        font-size: 14px;

        &:hover {
          color: #333;
          border-color: #999;
        }
      }
    }
  }

  .view-content {
    flex: 1 1 auto;
    padding: 20px;
    overflow-y: auto;

    :deep(.markdown-body) {
      padding: 0;
    }
  }

  .view-footer {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px 20px;
    border-top: 1px solid #ccc;

    .back-link {
      color: #666;
      text-decoration: none;

      &:hover {
        color: #333;
        text-decoration: underline;
      }
    }
  }
}
</style>
