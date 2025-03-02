// src/router/modules/auth.ts

import type { RouteRecordRaw } from 'vue-router'
import { RoutePaths, RouteNames, RouteMeta } from '../constants'

const routes: RouteRecordRaw[] = [
  {
    path: '/signup',
    redirect: RoutePaths.Register,
  },
  {
    path: RoutePaths.Login,
    name: RouteNames.Login,
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: {
      [RouteMeta.Title]: 'Login',
      [RouteMeta.RequiresAuth]: false,
    },
  },
  {
    path: RoutePaths.Register,
    name: RouteNames.Register,
    component: () => import('@/views/auth/RegisterPage.vue'),
    meta: {
      [RouteMeta.Title]: 'Register',
      [RouteMeta.RequiresAuth]: false,
    },
  },
  {
    path: RoutePaths.ForgotPassword,
    name: RouteNames.ForgotPassword,
    component: () => import('@/views/auth/ForgotPasswordPage.vue'),
    meta: {
      [RouteMeta.Title]: 'Forgot Password',
      [RouteMeta.RequiresAuth]: false,
    },
  },
  {
    path: RoutePaths.ResetPassword,
    name: RouteNames.ResetPassword,
    component: () => import('@/views/auth/ResetPasswordPage.vue'),
    meta: {
      [RouteMeta.Title]: 'Reset Password',
      [RouteMeta.RequiresAuth]: false,
    },
  },
]

export default routes
