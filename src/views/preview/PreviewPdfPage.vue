<template>
  <div class="preview-pdf-page">
    <div class="preview-header">
      <h2>{{ pdfTitle }}</h2>
      <div class="preview-actions">
        <button @click="downloadPDF">Download</button>
        <button @click="printPDF">Print</button>
      </div>
    </div>

    <div class="preview-content">
      <pdf
        :src="pdfUrl"
        :page="currentPage"
        @num-pages="totalPages = $event"
        @page-loaded="currentPage = $event"
        @loaded="onPDFLoaded"
      ></pdf>
    </div>

    <div class="preview-footer">
      <div class="page-info">Page {{ currentPage }} of {{ totalPages }}</div>
      <div class="page-actions">
        <button :disabled="currentPage <= 1" @click="currentPage--">Previous</button>
        <button :disabled="currentPage >= totalPages" @click="currentPage++">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import pdf from 'vue3-pdf'

const route = useRoute()
const pdfId = route.params.pdfId as string

const pdfTitle = ref('')
const pdfUrl = ref('')
const currentPage = ref(1)
const totalPages = ref(1)

onMounted(() => {
  // Fetch PDF details
  fetch(`/api/pdfs/${pdfId}`)
    .then((res) => res.json())
    .then((data) => {
      pdfTitle.value = data.title
      pdfUrl.value = data.url
    })
})

const onPDFLoaded = () => {
  console.log('PDF loaded')
}

const downloadPDF = () => {
  window.open(pdfUrl.value, '_blank')
}

const printPDF = () => {
  window.print()
}
</script>

<style lang="scss" scoped>
.preview-pdf-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  .preview-header {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background: #f8f8f8;
    border-bottom: 1px solid #eee;

    h2 {
      margin: 0;
      font-size: 20px;
    }

    .preview-actions {
      button {
        margin-left: 10px;
      }
    }
  }

  .preview-content {
    flex: 1 1 auto;
    padding: 20px;
    overflow-y: auto;
  }

  .preview-footer {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: #f8f8f8;
    border-top: 1px solid #eee;

    .page-info {
      font-size: 14px;
    }

    .page-actions {
      button {
        margin-left: 10px;
      }
    }
  }
}
</style>
