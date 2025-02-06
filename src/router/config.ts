import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { RoutePaths, RouteNames, RouteMeta } from './constants'

export interface RouterConfig {
  /**
   * 路由模式
   * - hash: 使用 URL hash 作为路由
   * - history: 使用 HTML5 history 模式
   */
  mode: 'hash' | 'history'

  /**
   * 路由基础路径
   * 默认为 '/'
   */
  base?: string

  /**
   * 是否应该禁止尾部斜杠
   * 默认为 false
   */
  strict?: boolean

  /**
   * 当浏览器不支持 history.pushState 控制路由是否应该回退到 hash 模式
   * 默认为 false
   */
  fallback?: boolean

  /**
   * 是否应该禁止尾部斜杠
   * 默认为 false
   */
  sensitive?: boolean

  /**
   * 在页面之间导航时控制滚动的函数
   */
  scrollBehavior?: (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    savedPosition: { x: number; y: number } | null,
  ) => ScrollBehavior | Promise<ScrollBehavior> | undefined | null

  /**
   * 路由记录数组
   */
  routes: RouteRecordRaw[]

  /**
   * 路由模块
   */
  modules?: Record<string, RouteRecordRaw>

  /**
   * 路由别名
   */
  alias?: Record<string, string>

  /**
   * 默认的路由名称
   */
  defaultName?: string

  /**
   * 默认的重定向路径
   */
  defaultRedirect?: string

  /**
   * 是否启用路由过渡动效
   */
  transition?: boolean

  /**
   * 路由过渡动效名称
   */
  transitionName?: string

  /**
   * 路由过渡动效模式
   */
  transitionMode?: 'in-out' | 'out-in'

  /**
   * 路由过渡动效持续时间
   */
  transitionDuration?: number

  /**
   * 路由过渡动效函数
   */
  transitionFn?: () => void

  /**
   * 是否启用路由懒加载
   */
  lazy?: boolean

  /**
   * 路由懒加载函数
   */
  lazyFn?: () => Promise<RouteRecordRaw[]>

  /**
   * 是否启用路由缓存
   */
  cache?: boolean

  /**
   * 路由缓存的key
   */
  cacheKey?: string

  /**
   * 路由缓存的持续时间,单位:秒
   */
  cacheDuration?: number
}

const config: RouterConfig = {
  mode: 'history',
  base: '/',
  strict: false,
  sensitive: false,
  routes: [
    {
      path: RoutePaths.Root,
      name: RouteNames.Root,
      redirect: RoutePaths.Home,
      meta: {
        [RouteMeta.Title]: 'Root',
      },
    },
    {
      path: RoutePaths.Home,
      name: RouteNames.Home,
      component: () => import('@/views/home/HomePage.vue'),
      meta: {
        [RouteMeta.Title]: 'Home',
      },
    },
    {
      path: RoutePaths.About,
      name: RouteNames.About,
      component: () => import('@/views/about/AboutPage.vue'),
      meta: {
        [RouteMeta.Title]: 'About',
      },
    },
    {
      path: RoutePaths.Contact,
      name: RouteNames.Contact,
      component: () => import('@/views/contact/ContactPage.vue'),
      meta: {
        [RouteMeta.Title]: 'Contact',
      },
    },
    {
      path: RoutePaths.Editor,
      name: RouteNames.Editor,
      component: () => import('@/views/editor/EditorPage.vue'),
      meta: {
        [RouteMeta.Title]: 'Editor',
        [RouteMeta.RequiresAuth]: true,
      },
    },
    {
      path: RoutePaths.Preview,
      name: RouteNames.Preview,
      component: () => import('@/views/preview/PreviewPage.vue'),
      meta: {
        [RouteMeta.Title]: 'Preview',
      },
    },
    {
      path: RoutePaths.Settings,
      name: RouteNames.Settings,
      component: () => import('@/views/settings/SettingsPage.vue'),
      meta: {
        [RouteMeta.Title]: 'Settings',
        [RouteMeta.RequiresAuth]: true,
      },
    },
    {
      path: RoutePaths.Profile,
      name: RouteNames.Profile,
      component: () => import('@/views/profile/ProfilePage.vue'),
      meta: {
        [RouteMeta.Title]: 'Profile',
        [RouteMeta.RequiresAuth]: true,
      },
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
    {
      path: RoutePaths.Help,
      name: RouteNames.Help,
      component: () => import('@/views/help/HelpPage.vue'),
      meta: {
        [RouteMeta.Title]: 'Help',
      },
    },
    {
      path: RoutePaths.NotFound,
      name: RouteNames.NotFound,
      component: () => import('@/views/error/NotFoundPage.vue'),
      meta: {
        [RouteMeta.Title]: 'Page Not Found',
      },
    },
    {
      path: RoutePaths.Error,
      name: RouteNames.Error,
      component: () => import('@/views/error/ErrorPage.vue'),
      meta: {
        [RouteMeta.Title]: 'Error',
      },
    },
  ],
  defaultRedirect: RoutePaths.Home,
  transition: true,
  transitionName: 'fade',
  transitionMode: 'out-in',
  transitionDuration: 300,
  lazy: true,
  cache: true,
  cacheKey: 'cache:routes',
  cacheDuration: 1800,
}

export default config
