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
    <div class="action-buttons">
      <button @click="goBack" class="action-button">Go Back</button>
      <button @click="goHome" class="action-button">Go Home</button>
    </div>
    <router-link to="/" class="back-link">Go back to home</router-link>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';

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

  .action-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .action-button {
    padding: 0.5rem 1rem;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #e0e0e0;
    }
  }

  .back-link {
    font-size: 1.2rem;
    color: #007aff;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: color.adjust(#007aff, $lightness: -10%);
    }
  }
}
</style>
