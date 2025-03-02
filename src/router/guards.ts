// src/router/guards.ts

import type { NavigationGuard, NavigationHookAfter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import { useSettingsStore } from '@/store/modules/settings'
import { RouteMeta, RouteNames } from './constants'

/**
 * 身份验证守卫
 * 检查用户是否已登录,如果未登录则重定向到登录页面
 */
export const authGuard: NavigationGuard = (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta[RouteMeta.RequiresAuth] as boolean | undefined

  if (requiresAuth && !authStore.isLoggedIn) {
    next({ name: RouteNames.Login, query: { redirect: to.fullPath } })
  } else {
    next()
  }
}

/**
 * 管理员守卫
 * 检查用户是否具有管理员权限,如果没有则重定向到首页
 */
export const adminGuard: NavigationGuard = (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAdmin = to.meta[RouteMeta.RequiresAdmin] as boolean | undefined

  if (requiresAdmin && !authStore.isAdmin) {
    next({ name: RouteNames.Home })
  } else {
    next()
  }
}

/**
 * 标题守卫
 * 根据路由元信息设置页面标题
 */
export const titleGuard: NavigationGuard = (to, from, next) => {
  const settingsStore = useSettingsStore()
  const pageTitle = to.meta[RouteMeta.Title] as string | undefined

  if (pageTitle) {
    document.title = `${pageTitle} | ${settingsStore.siteTitle}`
  } else {
    document.title = settingsStore.siteTitle
  }

  next()
}

/**
 * 进度条守卫
 * 在路由跳转时显示进度条
 */
export const progressGuard: NavigationGuard = (to, from, next) => {
  const settingsStore = useSettingsStore()

  if (settingsStore.showProgress) {
    // TODO: 显示进度条
  }

  next()
}

/**
 * 滚动守卫
 * 在路由跳转后将页面滚动到顶部
 */
export const scrollGuard: NavigationHookAfter = (to, from) => {
  window.scrollTo(0, 0)
}
