// src/router/utils.ts

import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'

/**
 * 判断给定的路由是否匹配指定的路径
 * @param route 要判断的路由
 * @param path 要匹配的路径
 * @returns 是否匹配
 */
export function isRouteMatched(route: RouteLocationNormalized, path: string): boolean {
  return route.path === path
}

/**
 * 判断给定的路由是否包含指定的路径
 * @param route 要判断的路由
 * @param path 要包含的路径
 * @returns 是否包含
 */
export function isRouteContained(route: RouteLocationNormalized, path: string): boolean {
  return route.path.includes(path)
}

/**
 * 根据路由名称获取路由记录
 * @param name 路由名称
 * @param routes 路由记录数组
 * @returns 匹配的路由记录或 undefined
 */
export function getRouteRecordByName(
  name: string | symbol,
  routes: RouteRecordNormalized[],
): RouteRecordNormalized | undefined {
  return routes.find((route) => route.name === name)
}

/**
 * 根据路由路径获取路由记录
 * @param path 路由路径
 * @param routes 路由记录数组
 * @returns 匹配的路由记录或 undefined
 */
export function getRouteRecordByPath(
  path: string,
  routes: RouteRecordNormalized[],
): RouteRecordNormalized | undefined {
  return routes.find((route) => route.path === path)
}

/**
 * 根据路由名称获取包含该名称的所有嵌套路由记录
 * @param name 路由名称
 * @param routes 路由记录数组
 * @returns 匹配的嵌套路由记录数组
 */
export function getNestedRouteRecordsByName(
  name: string | symbol,
  routes: RouteRecordNormalized[],
): RouteRecordNormalized[] {
  const records: RouteRecordNormalized[] = []

  function traverse(routes: RouteRecordNormalized[]) {
    for (const route of routes) {
      if (route.name === name) {
        records.push(route)
      }
      if (route.children) {
        traverse(route.children as RouteRecordNormalized[])
      }
    }
  }

  traverse(routes)
  return records
}

/**
 * 根据路由路径获取包含该路径的所有嵌套路由记录
 * @param path 路由路径
 * @param routes 路由记录数组
 * @returns 匹配的嵌套路由记录数组
 */
export function getNestedRouteRecordsByPath(
  path: string,
  routes: RouteRecordNormalized[],
): RouteRecordNormalized[] {
  const records: RouteRecordNormalized[] = []

  function traverse(routes: RouteRecordNormalized[]) {
    for (const route of routes) {
      if (route.path === path) {
        records.push(route)
      }
      if (route.children) {
        traverse(route.children as RouteRecordNormalized[])
      }
    }
  }

  traverse(routes)
  return records
}

/**
 * 根据路由名称获取完整的路由路径
 * @param name 路由名称
 * @param routes 路由记录数组
 * @returns 完整的路由路径或空字符串
 */
export function getFullPathByName(name: string | symbol, routes: RouteRecordNormalized[]): string {
  const record = getRouteRecordByName(name, routes)
  return record ? record.path : ''
}

/**
 * 根据路由名称获取包含该名称的所有嵌套路由的完整路径
 * @param name 路由名称
 * @param routes 路由记录数组
 * @returns 匹配的嵌套路由完整路径数组
 */
export function getFullPathsByName(
  name: string | symbol,
  routes: RouteRecordNormalized[],
): string[] {
  const records = getNestedRouteRecordsByName(name, routes)
  return records.map((record) => record.path)
}

/**
 * 根据路由路径获取包含该路径的所有嵌套路由的完整路径
 * @param path 路由路径
 * @param routes 路由记录数组
 * @returns 匹配的嵌套路由完整路径数组
 */
export function getFullPathsByPath(path: string, routes: RouteRecordNormalized[]): string[] {
  const records = getNestedRouteRecordsByPath(path, routes)
  return records.map((record) => record.path)
}
