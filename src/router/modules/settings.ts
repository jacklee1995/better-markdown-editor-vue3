// src/router/modules/settings.ts

import type { RouteRecordRaw } from 'vue-router'
import { RoutePaths, RouteNames, RouteMeta } from '../constants'

const routes: RouteRecordRaw[] = [
  {
    path: RoutePaths.Settings,
    name: RouteNames.Settings,
    component: () => import('@/views/settings/SettingsPage.vue'),
    meta: {
      [RouteMeta.Title]: 'Settings',
      [RouteMeta.RequiresAuth]: true,
    },
    children: [
      {
        path: '',
        name: `${RouteNames.Settings}-Index`,
        component: () => import('@/views/settings/SettingsIndexPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Settings',
        },
      },
      {
        path: RoutePaths.SettingsGeneral,
        name: `${RouteNames.Settings}-General`,
        component: () => import('@/views/settings/SettingsGeneralPage.vue'),
        meta: {
          [RouteMeta.Title]: 'General Settings',
        },
      },
      {
        path: RoutePaths.SettingsAppearance,
        name: `${RouteNames.Settings}-Appearance`,
        component: () => import('@/views/settings/SettingsAppearancePage.vue'),
        meta: {
          [RouteMeta.Title]: 'Appearance Settings',
        },
      },
      {
        path: RoutePaths.SettingsEditor,
        name: `${RouteNames.Settings}-Editor`,
        component: () => import('@/views/settings/SettingsEditorPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Editor Settings',
        },
      },
      {
        path: RoutePaths.SettingsPreview,
        name: `${RouteNames.Settings}-Preview`,
        component: () => import('@/views/settings/SettingsPreviewPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Preview Settings',
        },
      },
      {
        path: RoutePaths.SettingsPlugins,
        name: `${RouteNames.Settings}-Plugins`,
        component: () => import('@/views/settings/SettingsPluginsPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Plugin Settings',
        },
      },
      {
        path: RoutePaths.SettingsKeymap,
        name: `${RouteNames.Settings}-Keymap`,
        component: () => import('@/views/settings/SettingsKeymapPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Keymap Settings',
        },
      },
      {
        path: RoutePaths.SettingsAbout,
        name: `${RouteNames.Settings}-About`,
        component: () => import('@/views/settings/SettingsAboutPage.vue'),
        meta: {
          [RouteMeta.Title]: 'About',
        },
      },
    ],
  },
]

export default routes
