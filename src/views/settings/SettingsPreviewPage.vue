<template>
  <div class="settings-preview-page">
    <h2>Preview Settings</h2>
    <div class="settings-section">
      <h3>Theme</h3>
      <div class="theme-options">
        <label>
          <input type="radio" name="theme" value="light" v-model="previewTheme" />
          Light
        </label>
        <label>
          <input type="radio" name="theme" value="dark" v-model="previewTheme" />
          Dark
        </label>
      </div>
    </div>

    <div class="settings-section">
      <h3>Font Size</h3>
      <div class="font-size-slider">
        <input
          type="range"
          min="12"
          max="32"
          v-model.number="previewFontSize"
          @input="updatePreviewFontSize"
        />
        <span>{{ previewFontSize }}px</span>
      </div>
    </div>

    <div class="settings-section">
      <h3>Line Height</h3>
      <div class="line-height-slider">
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          v-model.number="previewLineHeight"
          @input="updatePreviewLineHeight"
        />
        <span>{{ previewLineHeight.toFixed(1) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'

const settingsStore = useSettingsStore()

const previewTheme = ref(settingsStore.previewTheme)
const previewFontSize = ref(settingsStore.previewFontSize)
const previewLineHeight = ref(settingsStore.previewLineHeight)

function updatePreviewFontSize() {
  settingsStore.updatePreviewFontSize(previewFontSize.value)
}

function updatePreviewLineHeight() {
  settingsStore.updatePreviewLineHeight(previewLineHeight.value)
}

watch(previewTheme, (newTheme) => {
  settingsStore.updatePreviewTheme(newTheme)
})
</script>

<style scoped lang="scss">
.settings-preview-page {
  padding: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .settings-section {
    margin-bottom: 24px;

    h3 {
      font-size: 18px;
      margin-bottom: 12px;
    }
  }

  .theme-options {
    label {
      margin-right: 12px;
    }
  }

  .font-size-slider,
  .line-height-slider {
    display: flex;
    align-items: center;

    span {
      margin-left: 12px;
      min-width: 32px;
    }
  }
}
</style>
