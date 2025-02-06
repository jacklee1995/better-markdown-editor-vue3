<template>
  <div class="error-page">
    <h1 class="error-title">{{ errorTitle }}</h1>
    <p class="error-message">{{ errorMessage }}</p>
    <router-link to="/" class="back-link">Back to Home</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const errorCode = computed(() => route.query.code as string)

const errorTitle = computed(() => {
  switch (errorCode.value) {
    case '400':
      return 'Bad Request'
    case '401':
      return 'Unauthorized'
    case '403':
      return 'Forbidden'
    case '404':
      return 'Not Found'
    case '500':
      return 'Internal Server Error'
    default:
      return 'Error'
  }
})

const errorMessage = computed(() => {
  switch (errorCode.value) {
    case '400':
      return 'The request cannot be fulfilled due to bad syntax.'
    case '401':
      return 'Authentication is required and has failed or has not yet been provided.'
    case '403':
      return 'You do not have permission to access this resource.'
    case '404':
      return 'The requested resource could not be found.'
    case '500':
      return 'The server encountered an unexpected condition.'
    default:
      return 'An unknown error occurred.'
  }
})
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

  .error-title {
    font-size: 6rem;
    font-weight: bold;
    color: #ff4d4f;
    margin-bottom: 1rem;
  }

  .error-message {
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 2rem;
  }

  .back-link {
    font-size: 1.2rem;
    color: #1890ff;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #40a9ff;
    }
  }
}
</style>
