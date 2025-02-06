<template>
  <div class="register-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h1 class="text-center">Register</h1>
            </div>
            <div class="card-body">
              <form @submit.prevent="register">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    v-model="form.username"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="form.email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="form.password"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    v-model="form.confirmPassword"
                    required
                  />
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary">Register</button>
                </div>
              </form>
            </div>
            <div class="card-footer text-center">
              <p>
                Already have an account?
                <router-link :to="{ name: RouteNames.Login }">Login</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import { RouteNames } from '@/router/constants'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

async function register() {
  if (form.password !== form.confirmPassword) {
    alert('Passwords do not match')
    return
  }

  try {
    await authStore.register({
      username: form.username,
      email: form.email,
      password: form.password,
    })
    router.push({ name: RouteNames.Home })
  } catch (error) {
    console.error(error)
    alert('Registration failed')
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;

  .container {
    max-width: 400px;
  }

  .card {
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .card-header {
      background-color: #fff;
      border-bottom: none;
      padding: 30px;

      h1 {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
      }
    }

    .card-body {
      padding: 30px;

      .form-label {
        font-weight: bold;
      }

      .form-control {
        border-radius: 5px;
      }

      .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
        border-radius: 5px;
        font-weight: bold;
        padding: 12px;
      }
    }

    .card-footer {
      background-color: #fff;
      border-top: none;
      padding: 20px;

      p {
        margin: 0;
      }

      a {
        color: #007bff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
}
</style>
