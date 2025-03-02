<template>
  <div class="profile-notifications-page">
    <h1>Notification Settings</h1>

    <section class="email-notifications">
      <h2>Email Notifications</h2>
      <div class="notification-item">
        <label>
          <input type="checkbox" v-model="emailNotifications.productUpdates" />
          Product updates
        </label>
      </div>
      <div class="notification-item">
        <label>
          <input type="checkbox" v-model="emailNotifications.securityAlerts" />
          Security alerts
        </label>
      </div>
      <div class="notification-item">
        <label>
          <input type="checkbox" v-model="emailNotifications.newsletter" />
          Newsletter
        </label>
      </div>
    </section>

    <section class="push-notifications">
      <h2>Push Notifications</h2>
      <div class="notification-item">
        <label>
          <input type="checkbox" v-model="pushNotifications.newMessages" />
          New messages
        </label>
      </div>
      <div class="notification-item">
        <label>
          <input type="checkbox" v-model="pushNotifications.mentions" />
          Mentions
        </label>
      </div>
    </section>

    <button @click="saveSettings">Save Changes</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emailNotifications = ref({
  productUpdates: true,
  securityAlerts: true,
  newsletter: false
})

const pushNotifications = ref({
  newMessages: true,
  mentions: true
})

const saveSettings = () => {
  // TODO: Save notification settings
  console.log('Saving notification settings...')
}
</script>

<style scoped>
.profile-notifications-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
}

h2 {
  margin: 20px 0 10px;
  font-size: 1.2em;
}

.notification-item {
  margin: 10px 0;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
