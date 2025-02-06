<template>
  <div class="forgot-password-page">
    <h1 class="title">Forgot Password</h1>
    <p class="description">
      Enter your email address and we'll send you a link to reset your password.
    </p>

    <form @submit.prevent="handleSubmit" class="forgot-password-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <button type="submit" class="submit-btn" :disabled="loading">
        {{ loading ? 'Sending...' : 'Send Reset Link' }}
      </button>
    </form>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>

    <router-link to="/login" class="back-link">Back to Login</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from '@/store/modules/auth'

export default defineComponent({
  name: 'ForgotPasswordPage',
  setup() {
    const authStore = useAuthStore()

    const email = ref('')
    const loading = ref(false)
    const errorMessage = ref('')
    const successMessage = ref('')

    const handleSubmit = async () => {
      loading.value = true
      errorMessage.value = ''
      successMessage.value = ''

      try {
        await authStore.sendPasswordResetEmail(email.value)
        successMessage.value = 'Password reset link has been sent to your email.'
      } catch (error) {
        console.error(error)
        errorMessage.value = 'Failed to send password reset link. Please try again.'
      }

      loading.value = false
    }

    return {
      email,
      loading,
      errorMessage,
      successMessage,
      handleSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>
.forgot-password-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;

  .title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .description {
    margin-bottom: 2rem;
  }

  .forgot-password-form {
    .form-group {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
      }

      input {
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    }

    .submit-btn {
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

  .error-message {
    color: #dc3545;
    margin-top: 1rem;
  }

  .success-message {
    color: #28a745;
    margin-top: 1rem;
  }

  .back-link {
    display: block;
    margin-top: 2rem;
    text-align: center;
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
