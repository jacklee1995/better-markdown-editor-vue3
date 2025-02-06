import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import config from './config'
import { authGuard, adminGuard, titleGuard, progressGuard, scrollGuard } from './guards'
import {
  authInterceptor,
  adminInterceptor,
  titleInterceptor,
  progressInterceptor,
  scrollInterceptor,
  cacheInterceptor,
  permissionInterceptor,
} from './interceptors'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/HomePage.vue'),
  },
  // 添加其他路由配置...
]

const router = createRouter({
  history: createWebHistory(config.base),
  routes,
  strict: config.strict,
  sensitive: config.sensitive,
  scrollBehavior: config.scrollBehavior,
})

// Register global navigation guards
router.beforeEach(authGuard)
router.beforeEach(adminGuard)
router.beforeEach(titleGuard)
router.beforeEach(progressGuard)
router.afterEach(scrollGuard)

// Register global navigation interceptors
router.beforeEach(authInterceptor)
router.beforeEach(adminInterceptor)
router.beforeEach(titleInterceptor)
router.beforeEach(progressInterceptor)
router.afterEach(scrollInterceptor)
router.beforeEach(cacheInterceptor)
router.beforeEach(permissionInterceptor)

export default router
