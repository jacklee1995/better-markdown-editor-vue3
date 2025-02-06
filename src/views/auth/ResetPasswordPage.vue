<template>
  <div class="reset-password-page">
    <h1 class="page-title">Reset Password</h1>
    <form class="reset-password-form" @submit.prevent="resetPassword">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">New Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <div class="form-group">
        <button type="submit" :disabled="loading">
          <span v-if="loading">Resetting...</span>
          <span v-else>Reset Password</span>
        </button>
      </div>
    </form>
    <div class="links">
      <router-link to="/login">Back to Login</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

async function resetPassword() {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  loading.value = true

  try {
    await authStore.resetPassword(email.value, password.value)
    alert('Password reset successful. Please login with your new password.')
    router.push('/login')
  } catch (error) {
    console.error(error)
    alert('Password reset failed. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.reset-password-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;

  .page-title {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .reset-password-form {
    .form-group {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
      }

      input {
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      button {
        display: block;
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }
      }
    }
  }

  .links {
    margin-top: 2rem;
    text-align: center;

    a {
      color: #007bff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
