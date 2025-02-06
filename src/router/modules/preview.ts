// src/router/modules/preview.ts

import type { RouteRecordRaw } from 'vue-router'
import { RoutePaths, RouteNames, RouteMeta } from '../constants'

const routes: RouteRecordRaw[] = [
  {
    path: RoutePaths.Preview,
    name: RouteNames.Preview,
    component: () => import('@/views/preview/PreviewPage.vue'),
    meta: {
      [RouteMeta.Title]: 'Preview',
      [RouteMeta.RequiresAuth]: true,
    },
    children: [
      {
        path: '',
        name: `${RouteNames.Preview}-Index`,
        component: () => import('@/views/preview/PreviewIndexPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Preview',
        },
      },
      {
        path: RoutePaths.PreviewFile,
        name: `${RouteNames.Preview}-File`,
        component: () => import('@/views/preview/PreviewFilePage.vue'),
        meta: {
          [RouteMeta.Title]: 'Preview File',
        },
      },
      {
        path: RoutePaths.PreviewMarkdown,
        name: `${RouteNames.Preview}-Markdown`,
        component: () => import('@/views/preview/PreviewMarkdownPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Preview Markdown',
        },
      },
      {
        path: RoutePaths.PreviewHtml,
        name: `${RouteNames.Preview}-Html`,
        component: () => import('@/views/preview/PreviewHtmlPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Preview HTML',
        },
      },
      {
        path: RoutePaths.PreviewPdf,
        name: `${RouteNames.Preview}-Pdf`,
        component: () => import('@/views/preview/PreviewPdfPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Preview PDF',
        },
      },
    ],
  },
]

export default routes
