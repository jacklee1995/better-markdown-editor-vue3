// src/router/interceptors.ts

import type { NavigationGuard } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useSettingsStore } from '@/store/modules/settings'
import { RouteMeta, RouteNames } from './constants'

/**
 * 身份验证拦截器
 * 检查用户是否已登录,如果未登录则重定向到登录页面
 */
export const authInterceptor: NavigationGuard = (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta[RouteMeta.RequiresAuth] as boolean | undefined

  if (requiresAuth && !authStore.isLoggedIn) {
    next({ name: RouteNames.Login, query: { redirect: to.fullPath } })
  } else {
    next()
  }
}

/**
 * 管理员拦截器
 * 检查用户是否具有管理员权限,如果没有则重定向到首页
 */
export const adminInterceptor: NavigationGuard = (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAdmin = to.meta[RouteMeta.RequiresAdmin] as boolean | undefined

  if (requiresAdmin && !authStore.isAdmin) {
    next({ name: RouteNames.Home })
  } else {
    next()
  }
}

/**
 * 标题拦截器
 * 根据路由元信息设置页面标题
 */
export const titleInterceptor: NavigationGuard = (to, from, next) => {
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
 * 进度条拦截器
 * 在路由跳转时显示进度条
 */
export const progressInterceptor: NavigationGuard = (to, from, next) => {
  const settingsStore = useSettingsStore()

  if (settingsStore.showProgress) {
    // TODO: 显示进度条
  }

  next()
}

/**
 * 滚动拦截器
 * 在路由跳转后将页面滚动到顶部
 */
export const scrollInterceptor: NavigationGuard = (to, from, next) => {
  window.scrollTo(0, 0)
  next()
}

/**
 * 缓存拦截器
 * 根据路由元信息判断是否需要缓存页面
 */
export const cacheInterceptor: NavigationGuard = (to, from, next) => {
  const keepAlive = to.meta[RouteMeta.KeepAlive] as boolean | undefined

  if (keepAlive) {
    // TODO: 缓存页面
  }

  next()
}

/**
 * 权限拦截器
 * 根据路由元信息判断用户是否有权限访问页面
 */
export const permissionInterceptor: NavigationGuard = (to, from, next) => {
  const permissions = to.meta[RouteMeta.Permissions] as string[] | undefined
  const authStore = useAuthStore()

  if (permissions) {
    const hasPermission = permissions.every((permission) => authStore.hasPermission(permission))
    if (!hasPermission) {
      next({ name: RouteNames.Forbidden })
    }
  }

  next()
}

/**
 * 路由拦截器列表
 */
export const routeInterceptors: NavigationGuard[] = [
  authInterceptor,
  adminInterceptor,
  titleInterceptor,
  progressInterceptor,
  scrollInterceptor,
  cacheInterceptor,
  permissionInterceptor,
]
