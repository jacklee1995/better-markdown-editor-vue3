import { defineStore } from 'pinia'

export interface AuthState {
  token: string | null
  user: {
    id: number
    username: string
    email: string
    avatar: string
    roles: string[]
    permissions: string[]
  } | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null,
  }),

  getters: {
    isLoggedIn(): boolean {
      return !!this.token
    },

    isAdmin(): boolean {
      return this.user?.roles.includes('admin') ?? false
    },

    hasPermission(): (permission: string) => boolean {
      return (permission: string) => this.user?.permissions.includes(permission) ?? false
    },
  },

  actions: {
    async login(username: string, password: string) {
      // TODO: 调用登录接口
      console.log('Login with:', username, password)
      this.token = 'mock_token'
      this.user = {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        avatar: 'https://example.com/avatar.png',
        roles: ['admin'],
        permissions: ['read', 'write', 'delete'],
      }
    },

    async logout() {
      // TODO: 调用登出接口
      console.log('Logout')
      this.token = null
      this.user = null
    },

    async fetchUserInfo() {
      if (this.token) {
        // TODO: 调用获取用户信息接口
        this.user = {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          avatar: 'https://example.com/avatar.png',
          roles: ['admin'],
          permissions: ['read', 'write', 'delete'],
        }
      }
    },

    async sendPasswordResetEmail(email: string) {
      // TODO: 调用发送密码重置邮件接口
      console.log('Send password reset email to:', email)
    },

    async resetPassword(email: string, newPassword: string) {
      // TODO: 调用重置密码接口
      console.log('Reset password for:', email, 'with new password:', newPassword)
    },

    async register(formData: { username: string; email: string; password: string }) {
      // TODO: 调用注册接口
      console.log('Register with:', formData)
    },
  },
})
