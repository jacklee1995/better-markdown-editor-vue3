<template>
  <div class="preview-file-page">
    <div class="preview-header">
      <h2>{{ fileName }}</h2>
      <div class="preview-actions">
        <button @click="downloadFile">Download</button>
        <button @click="printFile">Print</button>
      </div>
    </div>

    <div class="preview-content">
      <embed :src="fileUrl" type="application/pdf" width="100%" height="600px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const fileId = route.params.fileId as string

const fileName = ref('')
const fileUrl = computed(() => `/api/files/${fileId}`)

const downloadFile = () => {
  window.open(fileUrl.value, '_blank')
}

const printFile = () => {
  window.print()
}

// Fetch file details
fetch(`/api/files/${fileId}`)
  .then((res) => res.json())
  .then((data) => {
    fileName.value = data.name
  })
</script>

<style lang="scss" scoped>
.preview-file-page {
  padding: 20px;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
  }

  .preview-actions {
    button {
      margin-left: 10px;
    }
  }
}

.preview-content {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}
</style>
