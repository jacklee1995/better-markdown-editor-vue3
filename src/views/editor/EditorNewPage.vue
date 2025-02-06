<template>
  <div class="editor-new-page">
    <div class="page-header">
      <h1 class="page-title">New Document</h1>
    </div>

    <div class="page-content">
      <div class="form-group">
        <label for="docTitle">Title:</label>
        <input
          type="text"
          id="docTitle"
          v-model="docTitle"
          class="form-input"
          placeholder="Enter document title"
        />
      </div>

      <div class="form-group">
        <label for="docTemplate">Template:</label>
        <select id="docTemplate" v-model="selectedTemplate" class="form-select">
          <option value="">Select a template</option>
          <option v-for="template in templates" :key="template.id" :value="template.id">
            {{ template.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <button class="btn btn-create" @click="createNewDoc">Create</button>
        <button class="btn btn-cancel" @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEditorStore } from '@/store/modules/editor'

const router = useRouter()
const editorStore = useEditorStore()

const docTitle = ref('')
const selectedTemplate = ref('')
const templates = [
  { id: 'blank', name: 'Blank Document' },
  { id: 'blog-post', name: 'Blog Post' },
  { id: 'meeting-notes', name: 'Meeting Notes' },
  // Add more templates...
]

function createNewDoc() {
  // Create new document with selected title and template
  const doc = editorStore.createDoc({
    title: docTitle.value,
    template: selectedTemplate.value,
  })

  // Navigate to editor page for the new document
  router.push({
    name: 'Editor-Edit',
    params: { id: doc.id },
  })
}

function cancel() {
  // Navigate back to editor index page
  router.push({ name: 'Editor-Index' })
}
</script>

<style lang="scss">
.editor-new-page {
  padding: 20px;

  .page-header {
    margin-bottom: 20px;

    .page-title {
      font-size: 24px;
      font-weight: bold;
    }
  }

  .page-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .form-input,
  .form-select {
    display: block;
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  .btn {
    display: inline-block;
    padding: 8px 15px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &.btn-create {
      background: #007bff;
      color: white;
      border: 1px solid #007bff;
      margin-right: 10px;

      &:hover {
        background: #0069d9;
        border-color: #0062cc;
      }
    }

    &.btn-cancel {
      background: white;
      color: #6c757d;
      border: 1px solid #6c757d;

      &:hover {
        background: #6c757d;
        color: white;
      }
    }
  }
}
</style>
