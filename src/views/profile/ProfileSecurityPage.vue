<template>
  <div class="profile-security-page">
    <h1>Security Settings</h1>

    <section class="password-section">
      <h2>Change Password</h2>
      <form @submit.prevent="changePassword">
        <div class="form-group">
          <label for="current-password">Current Password</label>
          <input type="password" id="current-password" v-model="currentPassword" required />
        </div>
        <div class="form-group">
          <label for="new-password">New Password</label>
          <input type="password" id="new-password" v-model="newPassword" required />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm New Password</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </section>

    <section class="two-factor-auth-section">
      <h2>Two-Factor Authentication</h2>
      <div v-if="twoFactorEnabled">
        <p>Two-factor authentication is currently enabled.</p>
        <button @click="disableTwoFactor">Disable</button>
      </div>
      <div v-else>
        <p>Two-factor authentication is currently disabled.</p>
        <button @click="enableTwoFactor">Enable</button>
      </div>
    </section>

    <section class="login-history-section">
      <h2>Login History</h2>
      <ul>
        <li v-for="login in loginHistory" :key="login.id">
          <div class="login-info">
            <span class="login-date">{{ login.date }}</span>
            <span class="login-ip">{{ login.ip }}</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const twoFactorEnabled = ref(false)
const loginHistory = ref([
  { id: 1, date: '2023-06-01 10:30:00', ip: '192.168.0.1' },
  { id: 2, date: '2023-05-28 14:45:00', ip: '192.168.0.1' },
  { id: 3, date: '2023-05-25 09:15:00', ip: '192.168.0.1' },
])

function changePassword() {
  // TODO: Implement change password logic
  console.log('Change password')
}

function enableTwoFactor() {
  twoFactorEnabled.value = true
  // TODO: Implement enable two-factor authentication logic
  console.log('Enable two-factor authentication')
}

function disableTwoFactor() {
  twoFactorEnabled.value = false
  // TODO: Implement disable two-factor authentication logic
  console.log('Disable two-factor authentication')
}
</script>

<style scoped lang="scss">
.profile-security-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  section {
    margin-bottom: 40px;

    h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }
  }

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 5px;
    }

    input[type='password'] {
      width: 100%;
      padding: 10px;
      font-size: 16px;
    }
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }

  .login-history-section {
    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 10px;

        .login-info {
          display: flex;
          justify-content: space-between;

          .login-date {
            font-weight: bold;
          }

          .login-ip {
            color: #888;
          }
        }
      }
    }
  }
}
</style>
