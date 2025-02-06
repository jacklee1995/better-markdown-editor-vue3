<template>
  <div class="settings-editor-page">
    <h2>{{ $t('settings.editor.title') }}</h2>
    <div class="settings-editor-form">
      <div class="form-group">
        <label for="editorFontSize">{{ $t('settings.editor.fontSize') }}</label>
        <input
          type="number"
          id="editorFontSize"
          v-model.number="editorSettings.fontSize"
          min="8"
          max="48"
        />
      </div>
      <div class="form-group">
        <label for="editorFontFamily">{{ $t('settings.editor.fontFamily') }}</label>
        <select id="editorFontFamily" v-model="editorSettings.fontFamily">
          <option value="default">{{ $t('settings.editor.fontFamilyOption.default') }}</option>
          <option value="monospace">{{ $t('settings.editor.fontFamilyOption.monospace') }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="editorLineHeight">{{ $t('settings.editor.lineHeight') }}</label>
        <input
          type="number"
          id="editorLineHeight"
          v-model.number="editorSettings.lineHeight"
          min="1"
          max="3"
          step="0.1"
        />
      </div>
      <div class="form-group">
        <label for="editorTabSize">{{ $t('settings.editor.tabSize') }}</label>
        <input
          type="number"
          id="editorTabSize"
          v-model.number="editorSettings.tabSize"
          min="1"
          max="8"
        />
      </div>
      <div class="form-group">
        <input
          type="checkbox"
          id="editorShowLineNumbers"
          v-model="editorSettings.showLineNumbers"
        />
        <label for="editorShowLineNumbers">{{ $t('settings.editor.showLineNumbers') }}</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="editorShowGutter" v-model="editorSettings.showGutter" />
        <label for="editorShowGutter">{{ $t('settings.editor.showGutter') }}</label>
      </div>
      <div class="form-group">
        <input
          type="checkbox"
          id="editorHighlightActiveLine"
          v-model="editorSettings.highlightActiveLine"
        />
        <label for="editorHighlightActiveLine">{{
          $t('settings.editor.highlightActiveLine')
        }}</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/store/modules/settings'

const { t } = useI18n()
const settingsStore = useSettingsStore()

const editorSettings = reactive({
  fontSize: settingsStore.editorFontSize,
  fontFamily: settingsStore.editorFontFamily,
  lineHeight: settingsStore.editorLineHeight,
  tabSize: settingsStore.editorTabSize,
  showLineNumbers: settingsStore.editorShowLineNumbers,
  showGutter: settingsStore.editorShowGutter,
  highlightActiveLine: settingsStore.editorHighlightActiveLine,
})
</script>

<style lang="scss" scoped>
.settings-editor-page {
  padding: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.settings-editor-form {
  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 5px;
    }

    input[type='number'],
    select {
      width: 100px;
    }

    input[type='checkbox'] {
      margin-right: 5px;
    }
  }
}
</style>
