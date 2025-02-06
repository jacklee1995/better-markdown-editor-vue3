<template>
  <div class="preview-index-page">
    <h2>Preview Overview</h2>
    <p>
      This is the preview overview page. You can preview different types of content here, including
      files, Markdown, HTML, and PDF.
    </p>

    <div class="preview-cards">
      <div class="preview-card">
        <router-link :to="{ name: `${RouteNames.Preview}-File` }">
          <i class="icon-file"></i>
          <h3>File Preview</h3>
          <p>Preview uploaded files</p>
        </router-link>
      </div>

      <div class="preview-card">
        <router-link :to="{ name: `${RouteNames.Preview}-Markdown` }">
          <i class="icon-markdown"></i>
          <h3>Markdown Preview</h3>
          <p>Preview Markdown content</p>
        </router-link>
      </div>

      <div class="preview-card">
        <router-link :to="{ name: `${RouteNames.Preview}-Html` }">
          <i class="icon-html"></i>
          <h3>HTML Preview</h3>
          <p>Preview HTML content</p>
        </router-link>
      </div>

      <div class="preview-card">
        <router-link :to="{ name: `${RouteNames.Preview}-Pdf` }">
          <i class="icon-pdf"></i>
          <h3>PDF Preview</h3>
          <p>Preview PDF files</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router/constants'
</script>

<style lang="scss" scoped>
.preview-index-page {
  padding: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .preview-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .preview-card {
      background-color: #f8f8f8;
      border-radius: 4px;
      padding: 20px;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      a {
        display: block;
        color: inherit;
        text-decoration: none;
      }

      i {
        font-size: 48px;
        margin-bottom: 10px;
      }

      h3 {
        font-size: 20px;
        margin-bottom: 10px;
      }

      p {
        color: #666;
      }
    }
  }
}
</style>
