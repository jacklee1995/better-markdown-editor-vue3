<template>
  <div class="settings-appearance-page">
    <h2>Appearance Settings</h2>

    <div class="form-group">
      <label for="theme">Theme:</label>
      <select id="theme" v-model="selectedTheme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>

    <div class="form-group">
      <label for="fontSize">Font Size:</label>
      <input type="number" id="fontSize" v-model.number="fontSize" min="12" max="24" />
    </div>

    <div class="form-group">
      <label for="fontFamily">Font Family:</label>
      <select id="fontFamily" v-model="selectedFontFamily">
        <option value="default">Default</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
      </select>
    </div>

    <div class="form-group">
      <label for="lineHeight">Line Height:</label>
      <input type="number" id="lineHeight" v-model.number="lineHeight" min="1" max="2" step="0.1" />
    </div>

    <button @click="saveSettings">Save</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'

const settingsStore = useSettingsStore()

const selectedTheme = ref(settingsStore.previewOptions.theme)
const fontSize = ref(settingsStore.previewOptions.fontSize)
const selectedFontFamily = ref(settingsStore.editorOptions.fontFamily)
const lineHeight = ref(settingsStore.editorOptions.lineHeight)

function saveSettings() {
  settingsStore.updatePreviewTheme(selectedTheme.value as 'light' | 'dark')
  settingsStore.updatePreviewFontSize(fontSize.value)
  settingsStore.updateEditorFontFamily(selectedFontFamily.value)
  settingsStore.updateEditorLineHeight(lineHeight.value)
}
</script>

<style lang="scss" scoped>
.settings-appearance-page {
  padding: 20px;

  h2 {
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
    }

    select,
    input[type='number'] {
      width: 200px;
    }
  }

  button {
    padding: 8px 16px;
    background-color: #007acc;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #005c99;
    }
  }
}
</style>
