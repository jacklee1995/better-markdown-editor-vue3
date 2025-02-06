<template>
  <div class="settings-general-page">
    <h2>{{ $t('settings.general.title') }}</h2>
    <form @submit.prevent="saveSettings">
      <div class="form-group">
        <label for="siteTitle">{{ $t('settings.general.siteTitle') }}</label>
        <input type="text" id="siteTitle" v-model="settings.siteTitle" required />
      </div>

      <div class="form-group">
        <label for="siteDescription">{{ $t('settings.general.siteDescription') }}</label>
        <textarea id="siteDescription" v-model="settings.siteDescription"></textarea>
      </div>

      <div class="form-group">
        <label for="language">{{ $t('settings.general.language') }}</label>
        <select id="language" v-model="settings.language">
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
      </div>

      <div class="form-group">
        <label for="dateFormat">{{ $t('settings.general.dateFormat') }}</label>
        <select id="dateFormat" v-model="settings.dateFormat">
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
        </select>
      </div>

      <div class="form-group">
        <label for="timeFormat">{{ $t('settings.general.timeFormat') }}</label>
        <select id="timeFormat" v-model="settings.timeFormat">
          <option value="12">12 Hour</option>
          <option value="24">24 Hour</option>
        </select>
      </div>

      <button type="submit">{{ $t('settings.general.save') }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'

export default defineComponent({
  name: 'SettingsGeneralPage',
  setup() {
    const settingsStore = useSettingsStore()

    const settings = reactive({
      siteTitle: settingsStore.siteTitle,
      siteDescription: settingsStore.siteDescription,
      language: settingsStore.defaultLanguage,
      dateFormat: settingsStore.dateFormat,
      timeFormat: settingsStore.timeFormat,
    })

    function saveSettings() {
      settingsStore.updateSettings(settings)
    }

    return {
      settings,
      saveSettings,
    }
  },
})
</script>

<style lang="scss" scoped>
.settings-general-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input[type='text'],
    textarea,
    select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    textarea {
      height: 100px;
    }
  }

  button[type='submit'] {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
