import { createRouter, createWebHistory } from 'vue-router'
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
  routeInterceptors,
  routeAfterInterceptors
} from './interceptors'
import routeConfig from './routes'

const router = createRouter({
  history: createWebHistory(config.base),
  routes: routeConfig,
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

// Register route-specific interceptors
routeInterceptors.forEach(interceptor => {
  router.beforeEach(interceptor)
})

// Register route-specific after interceptors
routeAfterInterceptors.forEach(interceptor => {
  router.afterEach(interceptor)
})

export default router
