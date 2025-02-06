<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.go(-1)
}

function goHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="not-found-page">
    <h1 class="error-code">404</h1>
    <p class="error-message">Page Not Found</p>
    <p class="error-description">The page you are looking for does not exist.</p>
    <router-link to="/" class="back-link">Go back to home</router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

  .error-code {
    font-size: 10rem;
    font-weight: bold;
    color: #ff5252;
    margin-bottom: 1rem;
  }

  .error-message {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
  }

  .error-description {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
  }

  .back-link {
    font-size: 1.2rem;
    color: #007aff;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: darken(#007aff, 10%);
    }
  }
}
</style>
