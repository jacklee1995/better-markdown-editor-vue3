<template>
  <div class="forbidden-page">
    <h1 class="title">403</h1>
    <p class="subtitle">Forbidden</p>
    <p class="description">You don't have permission to access this page.</p>
    <router-link to="/" class="button">Go Back Home</router-link>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: '403 Forbidden',
  meta: [
    {
      name: 'description',
      content: "You don't have permission to access this page.",
    },
  ],
})
</script>

<style lang="scss" scoped>
.forbidden-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

  .title {
    font-size: 10rem;
    font-weight: bold;
    color: var(--color-text-primary);
    margin-bottom: 2rem;
  }

  .subtitle {
    font-size: 2rem;
    color: var(--color-text-regular);
    margin-bottom: 1rem;
  }

  .description {
    font-size: 1.2rem;
    color: var(--color-text-secondary);
    margin-bottom: 2rem;
  }

  .button {
    display: inline-block;
    padding: 0.8rem 2rem;
    font-size: 1rem;
    color: #fff;
    background-color: var(--color-primary);
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--color-primary-dark);
    }
  }
}
</style>
