// src/router/modules/profile.ts

import type { RouteRecordRaw } from 'vue-router'
import { RoutePaths, RouteNames, RouteMeta } from '../constants'

const routes: RouteRecordRaw[] = [
  {
    path: RoutePaths.Profile,
    name: RouteNames.Profile,
    component: () => import('@/views/profile/ProfilePage.vue'),
    meta: {
      [RouteMeta.Title]: 'Profile',
      [RouteMeta.RequiresAuth]: true,
    },
    children: [
      {
        path: '',
        name: `${RouteNames.Profile}-Index`,
        component: () => import('@/views/profile/ProfileIndexPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Profile Overview',
        },
      },
      {
        path: RoutePaths.ProfileSettings,
        name: `${RouteNames.Profile}-Settings`,
        component: () => import('@/views/profile/ProfileSettingsPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Profile Settings',
        },
      },
      {
        path: RoutePaths.ProfileSecurity,
        name: `${RouteNames.Profile}-Security`,
        component: () => import('@/views/profile/ProfileSecurityPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Security Settings',
        },
      },
      {
        path: RoutePaths.ProfileNotifications,
        name: `${RouteNames.Profile}-Notifications`,
        component: () => import('@/views/profile/ProfileNotificationsPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Notification Settings',
        },
      },
      {
        path: RoutePaths.ProfileBilling,
        name: `${RouteNames.Profile}-Billing`,
        component: () => import('@/views/profile/ProfileBillingPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Billing & Subscription',
        },
      },
    ],
  },
]

export default routes
