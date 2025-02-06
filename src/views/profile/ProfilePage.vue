<template>
  <div class="profile-page">
    <header class="profile-header">
      <h1>Profile</h1>
      <nav>
        <router-link :to="{ name: `${RouteNames.Profile}-Index` }">Overview</router-link>
        <router-link :to="{ name: `${RouteNames.Profile}-Settings` }">Settings</router-link>
        <router-link :to="{ name: `${RouteNames.Profile}-Security` }">Security</router-link>
        <router-link :to="{ name: `${RouteNames.Profile}-Notifications` }"
          >Notifications</router-link
        >
        <router-link :to="{ name: `${RouteNames.Profile}-Billing` }">Billing</router-link>
      </nav>
    </header>

    <main class="profile-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouteNames } from '@/router/constants'
</script>

<style lang="scss" scoped>
.profile-page {
  padding: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
  }

  nav {
    display: flex;
    gap: 1rem;

    a {
      color: var(--color-text-light);
      text-decoration: none;

      &:hover,
      &.router-link-active {
        color: var(--color-primary);
      }
    }
  }
}

.profile-content {
  background-color: var(--color-background-soft);
  border-radius: 8px;
  padding: 2rem;
}
</style>
