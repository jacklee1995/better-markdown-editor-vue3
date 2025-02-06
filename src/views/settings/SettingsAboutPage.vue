<template>
  <div class="settings-about-page">
    <h2>About</h2>
    <div class="about-content">
      <p>
        Markdown Editor is a powerful and easy-to-use editor for creating and editing Markdown
        documents.
      </p>
      <p>Version: 1.0.0</p>
      <p>Release Date: 2023-06-01</p>
      <h3>Features</h3>
      <ul>
        <li>Syntax highlighting</li>
        <li>Live preview</li>
        <li>Customizable themes</li>
        <li>Keyboard shortcuts</li>
        <li>Export to HTML and PDF</li>
      </ul>
      <h3>Credits</h3>
      <p>Markdown Editor is built with the following open source projects:</p>
      <ul>
        <li>Vue.js</li>
        <li>Monaco Editor</li>
        <li>Marked</li>
        <li>Highlight.js</li>
      </ul>
      <p>&copy; 2025 Better Markdown Editor. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// About page for the settings module
</script>

<style scoped lang="scss">
.settings-about-page {
  padding: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .about-content {
    font-size: 16px;
    line-height: 1.6;

    h3 {
      font-size: 20px;
      margin-top: 30px;
      margin-bottom: 10px;
    }

    ul {
      margin-left: 20px;
      margin-bottom: 20px;

      li {
        margin-bottom: 5px;
      }
    }

    p:last-child {
      margin-top: 30px;
    }
  }
}
</style>
