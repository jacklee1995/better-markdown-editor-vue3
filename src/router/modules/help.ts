// src/router/modules/help.ts

import type { RouteRecordRaw } from 'vue-router'
import { RoutePaths, RouteNames, RouteMeta } from '../constants'

const routes: RouteRecordRaw[] = [
  {
    path: RoutePaths.Help,
    name: RouteNames.Help,
    component: () => import('@/views/help/HelpPage.vue'),
    meta: {
      [RouteMeta.Title]: 'Help',
      [RouteMeta.RequiresAuth]: false,
    },
    children: [
      {
        path: '',
        name: `${RouteNames.Help}-Index`,
        component: () => import('@/views/help/HelpIndexPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Help Center',
        },
      },
      {
        path: RoutePaths.HelpTopic,
        name: `${RouteNames.Help}-Topic`,
        component: () => import('@/views/help/HelpTopicPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Help Topic',
        },
      },
      {
        path: RoutePaths.HelpSearch,
        name: `${RouteNames.Help}-Search`,
        component: () => import('@/views/help/HelpSearchPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Search Help',
        },
      },
      {
        path: RoutePaths.HelpFeedback,
        name: `${RouteNames.Help}-Feedback`,
        component: () => import('@/views/help/HelpFeedbackPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Feedback',
        },
      },
    ],
  },
]

export default routes
