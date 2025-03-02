// src/router/routes.ts

import type { RouteRecordRaw } from 'vue-router'
import { RoutePaths, RouteNames, RouteMeta } from './constants'
import homeRoutes from './modules/home'
import aboutRoutes from './modules/about'
import errorRoutes from './modules/error'
import editorRoutes from './modules/editor'
import previewRoutes from './modules/preview'
import settingsRoutes from './modules/settings'
import profileRoutes from './modules/profile'
import authRoutes from './modules/auth'
import helpRoutes from './modules/help'

const routes: RouteRecordRaw[] = [
  {
    path: RoutePaths.Root,
    name: RouteNames.Root,
    redirect: RoutePaths.Home,
  },
  {
    path: '/signup',
    redirect: '/register',
  },
  ...homeRoutes,
  ...aboutRoutes,
  ...errorRoutes,
  ...editorRoutes,
  ...previewRoutes,
  ...settingsRoutes,
  ...profileRoutes,
  ...authRoutes,
  ...helpRoutes,
  {
    path: RoutePaths.Contact,
    name: RouteNames.Contact,
    component: () => import('@/views/contact/ContactPage.vue'),
    meta: {
      [RouteMeta.Title]: 'Contact Us',
      [RouteMeta.RequiresAuth]: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: RouteNames.NotFound,
    component: () => import('@/views/error/NotFoundPage.vue'),
    meta: {
      [RouteMeta.Title]: 'Page Not Found',
    },
  },
]

export default routes
