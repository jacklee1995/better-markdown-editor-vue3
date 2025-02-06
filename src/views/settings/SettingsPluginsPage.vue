<template>
  <div class="settings-plugins-page">
    <h2>Plugin Settings</h2>

    <div class="plugin-list">
      <div v-for="plugin in plugins" :key="plugin.name" class="plugin-item">
        <div class="plugin-header">
          <h3>{{ plugin.name }}</h3>
          <div class="plugin-actions">
            <button @click="enablePlugin(plugin)" :disabled="plugin.enabled">Enable</button>
            <button @click="disablePlugin(plugin)" :disabled="!plugin.enabled">Disable</button>
            <button @click="configurePlugin(plugin)">Configure</button>
          </div>
        </div>
        <p>{{ plugin.description }}</p>
      </div>
    </div>

    <button @click="openPluginStore">Get More Plugins</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePluginStore } from '@/store/plugin'

export default defineComponent({
  name: 'SettingsPluginsPage',
  setup() {
    const pluginStore = usePluginStore()

    const plugins = pluginStore.getPlugins()

    function enablePlugin(plugin: any) {
      pluginStore.enablePlugin(plugin.name)
    }

    function disablePlugin(plugin: any) {
      pluginStore.disablePlugin(plugin.name)
    }

    function configurePlugin(plugin: any) {
      // TODO: Implement plugin configuration
    }

    function openPluginStore() {
      // TODO: Implement opening plugin store
    }

    return {
      plugins,
      enablePlugin,
      disablePlugin,
      configurePlugin,
      openPluginStore,
    }
  },
})
</script>

<style lang="scss" scoped>
.settings-plugins-page {
  padding: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .plugin-list {
    margin-bottom: 20px;

    .plugin-item {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 10px;

      .plugin-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        h3 {
          margin: 0;
        }

        .plugin-actions {
          button {
            margin-left: 10px;
          }
        }
      }

      p {
        margin: 0;
      }
    }
  }
}
</style>
