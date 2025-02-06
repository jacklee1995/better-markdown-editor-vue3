<template>
  <div class="internal-server-error-page">
    <h1>500</h1>
    <h2>Internal Server Error</h2>
    <p>Oops! Something went wrong on our end.</p>
    <router-link to="/" class="btn btn-primary"> Go back to home page </router-link>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: '500 Internal Server Error',
  meta: [
    {
      name: 'description',
      content: 'The server encountered an internal error and was unable to complete your request.',
    },
  ],
})
</script>

<style lang="scss" scoped>
.internal-server-error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

  h1 {
    font-size: 6rem;
    font-weight: bold;
    color: var(--color-error);
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2rem;
    color: var(--color-text-light);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    color: var(--color-text-lighter);
    margin-bottom: 2rem;
  }

  .btn {
    font-size: 1.25rem;
    padding: 0.75rem 1.5rem;
  }
}
</style>
