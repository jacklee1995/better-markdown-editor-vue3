// src/router/modules/home.ts

import type { RouteRecordRaw } from 'vue-router'
import { RoutePaths, RouteNames, RouteMeta } from '../constants'

const routes: RouteRecordRaw[] = [
  {
    path: RoutePaths.Home,
    name: RouteNames.Home,
    component: () => import('@/views/home/HomePage.vue'),
    meta: {
      [RouteMeta.Title]: 'Home',
      [RouteMeta.RequiresAuth]: false,
    },
    children: [
      {
        path: '',
        name: `${RouteNames.Home}-Index`,
        component: () => import('@/views/home/HomeIndexPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Welcome',
        },
      },
      {
        path: RoutePaths.HomeFeatures,
        name: `${RouteNames.Home}-Features`,
        component: () => import('@/views/home/HomeFeaturesPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Features',
        },
      },
      {
        path: RoutePaths.HomePricing,
        name: `${RouteNames.Home}-Pricing`,
        component: () => import('@/views/home/HomePricingPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Pricing',
        },
      },
      {
        path: RoutePaths.HomeTestimonials,
        name: `${RouteNames.Home}-Testimonials`,
        component: () => import('@/views/home/HomeTestimonialsPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Testimonials',
        },
      },
      {
        path: RoutePaths.HomeDemo,
        name: `${RouteNames.Home}-Demo`,
        component: () => import('@/views/home/HomeDemoPage.vue'),
        meta: {
          [RouteMeta.Title]: 'Demo',
        },
      },
    ],
  },
]

export default routes
