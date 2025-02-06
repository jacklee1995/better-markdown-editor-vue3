<template>
  <div class="editor-index-page">
    <header class="page-header">
      <h1 class="page-title">Markdown Editor</h1>
      <p class="page-description">Create and edit your Markdown documents with ease.</p>
    </header>

    <main class="page-content">
      <div class="document-list">
        <div class="document-list-header">
          <h2 class="list-title">Recent Documents</h2>
          <router-link to="/editor/new" class="btn btn-new">New Document</router-link>
        </div>
        <ul class="document-list-body">
          <li v-for="doc in recentDocs" :key="doc.id" class="document-list-item">
            <router-link :to="`/editor/${doc.id}`" class="document-link">
              <h3 class="document-title">{{ doc.title }}</h3>
              <p class="document-info">
                <span class="document-date">{{ formatDate(doc.updatedAt) }}</span>
                <span class="document-words">{{ doc.words }} words</span>
              </p>
            </router-link>
            <button class="btn btn-delete" @click="deleteDoc(doc.id)">Delete</button>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { formatDistanceToNow } from 'date-fns'
import { useEditorStore, type EditorDocument } from '@/store/modules/editor'

const editorStore = useEditorStore()

const recentDocs = ref<EditorDocument[]>([])

onMounted(() => {
  recentDocs.value = editorStore.getRecentDocs()
})

function formatDate(date: string | number | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

function deleteDoc(id: string) {
  editorStore.deleteDoc(id)
  recentDocs.value = editorStore.getRecentDocs()
}
</script>

<style scoped lang="scss">
.editor-index-page {
  .page-header {
    text-align: center;
    margin-bottom: 2rem;

    .page-title {
      font-size: 2rem;
      font-weight: bold;
    }

    .page-description {
      font-size: 1.1rem;
      color: #666;
    }
  }

  .page-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .document-list {
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;

      .list-title {
        font-size: 1.5rem;
        font-weight: bold;
      }
    }

    &-body {
      list-style: none;
      padding: 0;
    }

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 1rem;
      transition:
        background-color 0.3s,
        border-color 0.3s;

      &:hover {
        background-color: #f9f9f9;
        border-color: #bbb;
      }
    }
  }

  .document-link {
    flex: 1;
    color: inherit;
    text-decoration: none;

    .document-title {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .document-info {
      font-size: 0.9rem;
      color: #666;

      .document-date {
        margin-right: 1rem;
      }
    }
  }

  .btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    color: #fff;
    text-decoration: none;
    transition: background-color 0.3s;

    &-new {
      background-color: #007bff;
      border: 1px solid #007bff;

      &:hover {
        background-color: #0056b3;
      }
    }

    &-delete {
      background-color: #dc3545;
      border: 1px solid #dc3545;
      margin-left: 1rem;

      &:hover {
        background-color: #c82333;
      }
    }
  }
}
</style>
