// src/router/types.ts

import type {
  RouteRecordRaw,
  RouteMeta,
  NavigationGuard,
  RouteRecordRedirectOption,
} from 'vue-router'

/**
 * 扩展的路由元信息接口
 */
export interface ExtendedRouteMeta extends RouteMeta {
  /**
   * 页面标题
   */
  title?: string

  /**
   * 页面描述
   */
  description?: string

  /**
   * 页面关键词
   */
  keywords?: string

  /**
   * 是否需要登录验证
   */
  requiresAuth?: boolean

  /**
   * 是否需要管理员权限
   */
  requiresAdmin?: boolean

  /**
   * 是否缓存页面
   */
  keepAlive?: boolean

  /**
   * 页面过渡效果
   */
  transition?: {
    /**
     * 过渡名称
     */
    name?: string

    /**
     * 过渡模式
     */
    mode?: 'in-out' | 'out-in'

    /**
     * 过渡类型
     */
    type?: 'fade' | 'slide' | 'zoom' | 'none'

    /**
     * 过渡持续时间,单位毫秒
     */
    duration?: number

    /**
     * 过渡延迟时间,单位毫秒
     */
    delay?: number
  }
}

/**
 * 扩展的路由记录接口
 */
export interface ExtendedRouteRecordRaw
  extends Omit<RouteRecordRaw, 'meta' | 'redirect' | 'children'> {
  meta?: ExtendedRouteMeta
  redirect?: RouteRecordRedirectOption
  children?: ExtendedRouteRecordRaw[]
}

/**
 * 扩展的导航守卫类型
 */
export type ExtendedNavigationGuard = NavigationGuard

/**
 * 路由模块类型
 */
export interface RouteModule {
  default: ExtendedRouteRecordRaw[]
}
