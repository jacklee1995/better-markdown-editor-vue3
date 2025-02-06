<template>
  <div class="editor-page">
    <div class="editor-header">
      <div class="editor-header-left">
        <button class="editor-btn" @click="newDoc">New</button>
        <button class="editor-btn" @click="openDoc">Open</button>
        <button class="editor-btn" @click="saveDoc">Save</button>
      </div>
      <div class="editor-header-center">
        <input v-model="docTitle" class="editor-title" placeholder="Untitled Document" />
      </div>
      <div class="editor-header-right">
        <button class="editor-btn" @click="exportPDF">Export PDF</button>
        <button class="editor-btn" @click="exportHTML">Export HTML</button>
        <button class="editor-btn" @click="openSettings">Settings</button>
      </div>
    </div>

    <div class="editor-main">
      <Editor ref="editor" v-model="content" :options="editorOptions" @change="onEditorChange" />
    </div>

    <div class="editor-footer">
      <div class="editor-footer-left">
        <span class="editor-status">{{ status }}</span>
      </div>
      <div class="editor-footer-right">
        <span class="editor-count">Words: {{ wordCount }}</span>
        <span class="editor-count">Lines: {{ lineCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEditorStore } from '@/store/modules/editor'
import { Editor, type EditorOptions } from '@/core/editor'

const router = useRouter()
const editorStore = useEditorStore()
const { content, docTitle } = storeToRefs(editorStore)

const editor = ref<InstanceType<typeof Editor> | null>(null)
const editorOptions = reactive<EditorOptions>({
  // Editor configuration options
  minHeight: '400px',
  autofocus: true,
  placeholder: 'Write something...',
  lineNumbers: true,
  wordWrap: 'on',
})

const status = ref('Saved')
const wordCount = computed(() => content.value.trim().split(/\s+/).length)
const lineCount = computed(() => content.value.trim().split(/\r\n|\r|\n/).length)

function newDoc() {
  editorStore.resetDoc()
  status.value = 'New document created'
}

function openDoc() {
  // TODO: Implement open document functionality
  status.value = 'Opening document'
}

function saveDoc() {
  // TODO: Implement save document functionality
  status.value = 'Document saved'
}

function exportPDF() {
  // TODO: Implement export to PDF functionality
  status.value = 'Exporting to PDF'
}

function exportHTML() {
  // TODO: Implement export to HTML functionality
  status.value = 'Exporting to HTML'
}

function openSettings() {
  router.push({ name: `${RouteNames.Editor}-Settings` })
}

function onEditorChange() {
  editorStore.setContent(editor.value?.getContent() || '')
  status.value = 'Unsaved changes'
}

onMounted(() => {
  editor.value?.setContent(content.value)
})
</script>

<style lang="scss" scoped>
.editor-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  .editor-header {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;

    &-left,
    &-right {
      flex: 0 0 auto;
    }

    &-center {
      flex: 1;
      padding: 0 20px;
    }
  }

  .editor-main {
    flex: 1;
    overflow: hidden;
  }

  .editor-footer {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-top: 1px solid #ccc;
    font-size: 12px;

    &-left,
    &-right {
      flex: 0 0 auto;
    }
  }

  .editor-btn {
    margin-right: 10px;
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

  .editor-title {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 18px;
    text-align: center;
  }

  .editor-status {
    color: #999;
  }

  .editor-count {
    margin-left: 10px;
    color: #999;
  }
}
</style>
