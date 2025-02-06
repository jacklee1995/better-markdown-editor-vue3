// src/router/modules/error.ts

import type { RouteRecordRaw } from 'vue-router'
import { RoutePaths, RouteNames, RouteMeta } from '../constants'

const routes: RouteRecordRaw[] = [
  {
    path: RoutePaths.NotFound,
    name: RouteNames.NotFound,
    component: () => import('@/views/error/NotFoundPage.vue'),
    meta: {
      [RouteMeta.Title]: 'Page Not Found',
      [RouteMeta.RequiresAuth]: false,
    },
  },
  {
    path: RoutePaths.Forbidden,
    name: RouteNames.Forbidden,
    component: () => import('@/views/error/ForbiddenPage.vue'),
    meta: {
      [RouteMeta.Title]: 'Forbidden',
      [RouteMeta.RequiresAuth]: false,
    },
  },
  {
    path: RoutePaths.InternalServerError,
    name: RouteNames.InternalServerError,
    component: () => import('@/views/error/InternalServerErrorPage.vue'),
    meta: {
      [RouteMeta.Title]: 'Internal Server Error',
      [RouteMeta.RequiresAuth]: false,
    },
  },
  {
    path: RoutePaths.ServiceUnavailable,
    name: RouteNames.ServiceUnavailable,
    component: () => import('@/views/error/ServiceUnavailablePage.vue'),
    meta: {
      [RouteMeta.Title]: 'Service Unavailable',
      [RouteMeta.RequiresAuth]: false,
    },
  },
  {
    path: RoutePaths.Error,
    name: RouteNames.Error,
    component: () => import('@/views/error/ErrorPage.vue'),
    meta: {
      [RouteMeta.Title]: 'Error',
      [RouteMeta.RequiresAuth]: false,
    },
  },
]

export default routes
