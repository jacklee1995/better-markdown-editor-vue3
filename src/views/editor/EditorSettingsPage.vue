<template>
  <div class="editor-settings-page">
    <h2>Editor Settings</h2>

    <div class="settings-section">
      <h3>General</h3>
      <div class="setting-item">
        <label>Theme:</label>
        <select v-model="editorSettings.theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div class="setting-item">
        <label>Font Family:</label>
        <select v-model="editorSettings.fontFamily">
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>
      <div class="setting-item">
        <label>Font Size:</label>
        <input type="number" v-model.number="editorSettings.fontSize" min="10" max="30" />
      </div>
      <div class="setting-item">
        <label>Line Height:</label>
        <input
          type="number"
          v-model.number="editorSettings.lineHeight"
          min="1"
          max="3"
          step="0.1"
        />
      </div>
    </div>

    <div class="settings-section">
      <h3>Editor</h3>
      <div class="setting-item">
        <label>Tab Size:</label>
        <input type="number" v-model.number="editorSettings.tabSize" min="2" max="8" />
      </div>
      <div class="setting-item">
        <label>Word Wrap:</label>
        <select v-model="editorSettings.wordWrap">
          <option value="off">Off</option>
          <option value="on">On</option>
          <option value="wordWrapColumn">Word Wrap at Column</option>
          <option value="bounded">Bounded</option>
        </select>
      </div>
      <div class="setting-item">
        <label>Minimap:</label>
        <input type="checkbox" v-model="editorSettings.minimap" />
      </div>
      <div class="setting-item">
        <label>Line Numbers:</label>
        <select v-model="editorSettings.lineNumbers">
          <option value="off">Off</option>
          <option value="on">On</option>
          <option value="relative">Relative</option>
          <option value="interval">Interval</option>
        </select>
      </div>
    </div>

    <div class="settings-section">
      <h3>Markdown</h3>
      <div class="setting-item">
        <label>GitHub Flavored Markdown:</label>
        <input type="checkbox" v-model="editorSettings.gfm" />
      </div>
      <div class="setting-item">
        <label>Auto Indent:</label>
        <input type="checkbox" v-model="editorSettings.autoIndent" />
      </div>
      <div class="setting-item">
        <label>Auto Close Brackets:</label>
        <input type="checkbox" v-model="editorSettings.autoCloseBrackets" />
      </div>
      <div class="setting-item">
        <label>Auto Close Quotes:</label>
        <input type="checkbox" v-model="editorSettings.autoCloseQuotes" />
      </div>
    </div>

    <div class="settings-actions">
      <button @click="saveSettings">Save</button>
      <button @click="resetSettings">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useEditorStore } from '@/store/modules/editor'

const editorStore = useEditorStore()
const { settings: editorSettings } = storeToRefs(editorStore)

function saveSettings() {
  editorStore.updateSettings(editorSettings.value)
}

function resetSettings() {
  editorStore.$reset()
}
</script>

<style lang="scss" scoped>
.editor-settings-page {
  padding: 20px;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
  }

  .settings-section {
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;

    h3 {
      margin-bottom: 15px;
      font-size: 20px;
    }

    .setting-item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      label {
        flex: 0 0 150px;
        margin-right: 15px;
      }

      input[type='number'],
      select {
        flex: 1;
        padding: 6px 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
      }

      input[type='checkbox'] {
        margin-right: 10px;
      }
    }
  }

  .settings-actions {
    display: flex;
    justify-content: flex-end;

    button {
      margin-left: 10px;
      padding: 8px 15px;
      border: none;
      border-radius: 4px;
      background: #007acc;
      color: white;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background: #006bb3;
      }
    }
  }
}
</style>
