<template>
  <div class="settings-page">
    <h1>Settings</h1>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'Settings-General' }">General</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Settings-Editor' }">Editor</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Settings-Preview' }">Preview</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Settings-Plugins' }">Plugins</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Settings-Keymap' }">Keymap</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Settings-About' }">About</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// Settings page component
</script>

<style lang="scss" scoped>
.settings-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  nav {
    margin-bottom: 20px;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 10px;

      li {
        a {
          display: block;
          padding: 10px;
          background-color: #f0f0f0;
          text-decoration: none;
          color: #333;
          border-radius: 4px;

          &:hover {
            background-color: #e0e0e0;
          }

          &.router-link-active {
            background-color: #333;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
