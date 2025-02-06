<template>
  <div class="editor-edit-page">
    <div class="editor-edit-header">
      <div class="editor-edit-header-left">
        <button class="editor-edit-btn" @click="goBack">
          <i class="icon-arrow-left"></i>
          <span>Back</span>
        </button>
      </div>
      <div class="editor-edit-header-center">
        <input
          v-model="editorStore.docTitle"
          class="editor-edit-title"
          placeholder="Untitled Document"
        />
      </div>
      <div class="editor-edit-header-right">
        <button class="editor-edit-btn" @click="saveDoc">
          <i class="icon-save"></i>
          <span>Save</span>
        </button>
      </div>
    </div>

    <div class="editor-edit-main">
      <Editor
        ref="editor"
        v-model="editorStore.content"
        :options="editorOptions"
        @change="onEditorChange"
      />
    </div>

    <div class="editor-edit-footer">
      <div class="editor-edit-footer-left">
        <span class="editor-edit-status">{{ status }}</span>
      </div>
      <div class="editor-edit-footer-right">
        <span class="editor-edit-count">Words: {{ wordCount }}</span>
        <span class="editor-edit-count">Lines: {{ lineCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEditorStore } from '@/store/modules/editor'
import { Editor, type EditorOptions } from '@/core/editor'

const router = useRouter()
const route = useRoute()
const editorStore = useEditorStore()

const editor = ref<InstanceType<typeof Editor> | null>(null)
const editorOptions = reactive<EditorOptions>({
  // Editor configuration options
  minHeight: '500px',
  theme: 'vs',
  language: 'markdown',
  wordWrap: 'on',
  minimap: {
    enabled: false,
  },
})

const wordCount = computed(() => {
  return editorStore.content.split(/\s+/).length
})

const lineCount = computed(() => {
  return editorStore.content.split(/\r\n|\r|\n/).length
})

const status = computed(() => {
  return `Editing Document`
})

function onEditorChange() {
  // Handle editor content change
  editorStore.updateValue(editorStore.content)
}

function saveDoc() {
  // Save document
  editorStore.saveDoc()
}

function goBack() {
  // Go back to previous page
  router.back()
}

onMounted(() => {
  // Fetch document data based on route params
  const { id } = route.params
  if (id) {
    editorStore.fetchDoc(id as string)
  }
})
</script>

<style lang="scss" scoped>
.editor-edit-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  .editor-edit-header {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background: #f5f5f5;
    border-bottom: 1px solid #ddd;

    &-left,
    &-right {
      flex: 0 0 auto;
    }

    &-center {
      flex: 1;
      margin: 0 20px;
    }
  }

  .editor-edit-main {
    flex: 1;
    overflow: hidden;
  }

  .editor-edit-footer {
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

  .editor-edit-btn {
    display: inline-flex;
    align-items: center;
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

    i {
      margin-right: 5px;
      font-size: 14px;
    }
  }

  .editor-edit-title {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 18px;
    text-align: center;
  }

  .editor-edit-status {
    color: #999;
  }

  .editor-edit-count {
    margin-left: 10px;
    color: #999;
  }
}
</style>
