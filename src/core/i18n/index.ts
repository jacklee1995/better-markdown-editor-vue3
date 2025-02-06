// src/core/i18n/index.ts

import { createI18n } from 'vue-i18n'
import config from './config'
import enUS from './locales/en-US.json'
import zhCN from './locales/zh-CN.json'

const messages = {
  'en-US': enUS,
  'zh-CN': zhCN,
}

const i18n = createI18n({
  legacy: false,
  locale: config.defaultLanguage,
  fallbackLocale: config.fallbackLanguage,
  messages,
})

export default i18n

export function setLanguage(lang: 'en-US' | 'zh-CN') {
  i18n.global.locale.value = lang
}

export function getLanguage() {
  return i18n.global.locale.value
}

export function t(key: string, args?: Record<string, unknown>) {
  return i18n.global.t(key, args || {})
}
