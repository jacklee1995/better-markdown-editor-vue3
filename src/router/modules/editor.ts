// src/router/modules/editor.ts

import type { RouteRecordRaw } from 'vue-router'
import { RoutePaths, RouteNames, RouteMeta } from '../constants'

const routes: RouteRecordRaw[] = [
  {
    path: RoutePaths.Editor,
    name: RouteNames.Editor,
    component: () => import('@/views/editor/EditorPage.vue'),
    meta: {
      [RouteMeta.Title]: 'Editor',
      [RouteMeta.RequiresAuth]: true,
    },
    children: [
      {
        path: '',
        name: `${RouteNames.Editor}-Index`,
        component: () => import('@/views/editor/EditorIndexPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Editor',
        },
      },
      {
        path: RoutePaths.EditorNew,
        name: `${RouteNames.Editor}-New`,
        component: () => import('@/views/editor/EditorNewPage.vue'),
        meta: {
          [RouteMeta.Title]: 'New Document',
        },
      },
      {
        path: RoutePaths.EditorEdit,
        name: `${RouteNames.Editor}-Edit`,
        component: () => import('@/views/editor/EditorEditPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Edit Document',
        },
      },
      {
        path: RoutePaths.EditorView,
        name: `${RouteNames.Editor}-View`,
        component: () => import('@/views/editor/EditorViewPage.vue'),
        meta: {
          [RouteMeta.Title]: 'View Document',
        },
      },
      {
        path: RoutePaths.EditorSettings,
        name: `${RouteNames.Editor}-Settings`,
        component: () => import('@/views/editor/EditorSettingsPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Editor Settings',
        },
      },
    ],
  },
]

export default routes
