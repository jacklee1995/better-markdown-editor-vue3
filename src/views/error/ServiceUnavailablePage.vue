<template>
  <div class="service-unavailable-page">
    <h1 class="title">503</h1>
    <h2 class="subtitle">Service Unavailable</h2>
    <p class="description">
      The server is currently unable to handle the request due to a temporary overload or scheduled
      maintenance.
    </p>
    <router-link to="/" class="back-link"> Go back to home page </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ServiceUnavailablePage',
})
</script>

<style lang="scss" scoped>
.service-unavailable-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

  .title {
    font-size: 6rem;
    font-weight: bold;
    color: #ff5252;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
    max-width: 500px;
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
