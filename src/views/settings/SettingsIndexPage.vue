<template>
  <div class="settings-index-page">
    <h2>Settings</h2>
    <div class="settings-menu">
      <router-link to="/settings/general">General</router-link>
      <router-link to="/settings/editor">Editor</router-link>
      <router-link to="/settings/preview">Preview</router-link>
      <router-link to="/settings/plugins">Plugins</router-link>
      <router-link to="/settings/keymap">Keymap</router-link>
      <router-link to="/settings/about">About</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// 设置首页组件
</script>

<style lang="scss" scoped>
.settings-index-page {
  padding: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .settings-menu {
    margin-bottom: 20px;

    a {
      display: block;
      padding: 10px;
      color: #333;
      text-decoration: none;

      &:hover {
        background-color: #f0f0f0;
      }

      &.router-link-active {
        color: #007acc;
        font-weight: bold;
      }
    }
  }
}
</style>
