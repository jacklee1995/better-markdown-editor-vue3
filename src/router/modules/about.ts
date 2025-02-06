// src/router/modules/about.ts

import type { RouteRecordRaw } from 'vue-router'
import { RoutePaths, RouteNames, RouteMeta } from '../constants'

const routes: RouteRecordRaw[] = [
  {
    path: RoutePaths.About,
    name: RouteNames.About,
    component: () => import('@/views/about/AboutPage.vue'),
    meta: {
      [RouteMeta.Title]: 'About',
      [RouteMeta.RequiresAuth]: false,
    },
    children: [
      {
        path: '',
        name: `${RouteNames.About}-Index`,
        component: () => import('@/views/about/AboutIndexPage.vue'),
        meta: {
          [RouteMeta.Title]: 'About Us',
        },
      },
      {
        path: RoutePaths.AboutTeam,
        name: `${RouteNames.About}-Team`,
        component: () => import('@/views/about/AboutTeamPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Our Team',
        },
      },
      {
        path: RoutePaths.AboutPress,
        name: `${RouteNames.About}-Press`,
        component: () => import('@/views/about/AboutPressPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Press',
        },
      },
      {
        path: RoutePaths.AboutCareers,
        name: `${RouteNames.About}-Careers`,
        component: () => import('@/views/about/AboutCareersPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Careers',
        },
      },
      {
        path: RoutePaths.AboutContact,
        name: `${RouteNames.About}-Contact`,
        component: () => import('@/views/about/AboutContactPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Contact Us',
        },
      },
    ],
  },
]

export default routes
