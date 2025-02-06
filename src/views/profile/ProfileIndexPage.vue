<template>
  <div class="profile-index-page">
    <h1>Profile Overview</h1>
    <div class="profile-section">
      <h2>Personal Information</h2>
      <div class="profile-info">
        <div class="info-item">
          <span class="label">Name:</span>
          <span class="value">{{ user.username }}</span>
        </div>
        <div class="info-item">
          <span class="label">Email:</span>
          <span class="value">{{ user.email }}</span>
        </div>
        <div class="info-item">
          <span class="label">Username:</span>
          <span class="value">{{ user.username }}</span>
        </div>
      </div>
    </div>

    <div class="profile-section">
      <h2>Account Settings</h2>
      <ul class="settings-list">
        <li>
          <router-link :to="{ name: 'Profile-Settings' }">Profile Settings</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Profile-Security' }">Security Settings</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Profile-Notifications' }">Notification Settings</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Profile-Billing' }">Billing & Subscription</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store/modules/auth'

const authStore = useAuthStore()
const user = ref(
  authStore.user ?? {
    id: 0,
    username: '',
    email: '',
    avatar: '',
    roles: [],
    permissions: [],
  },
)
</script>

<style lang="scss" scoped>
.profile-index-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.profile-section {
  margin-bottom: 40px;

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
}

.profile-info {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 4px;

  .info-item {
    display: flex;
    margin-bottom: 10px;

    .label {
      font-weight: bold;
      width: 100px;
    }

    .value {
      flex: 1;
    }
  }
}

.settings-list {
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 10px;

    a {
      color: #333;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
