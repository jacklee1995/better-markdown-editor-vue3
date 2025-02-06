<template>
  <div class="settings-keymap-page">
    <h2>{{ $t('settings.keymap.title') }}</h2>
    <div class="keymap-list">
      <div v-for="(group, name) in keymapGroups" :key="name" class="keymap-group">
        <h3>{{ $t(`settings.keymap.groups.${name}`) }}</h3>
        <ul>
          <li v-for="(keymap, command) in group" :key="command" class="keymap-item">
            <span class="keymap-command">{{ $t(`settings.keymap.commands.${command}`) }}</span>
            <span class="keymap-shortcut">{{ keymap }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/store/modules/settings'

const { t } = useI18n()
const settingsStore = useSettingsStore()

const keymapGroups = computed(() => {
  const groups: Record<string, Record<string, string>> = {}
  const { keymap } = settingsStore

  for (const [command, shortcut] of Object.entries(keymap)) {
    const [groupName] = command.split('.')
    if (!groups[groupName]) {
      groups[groupName] = {}
    }
    groups[groupName][command] = shortcut
  }

  return groups
})
</script>

<style lang="scss" scoped>
.settings-keymap-page {
  padding: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.keymap-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.keymap-group {
  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}

.keymap-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
}

.keymap-command {
  flex: 1;
}

.keymap-shortcut {
  font-family: monospace;
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>
