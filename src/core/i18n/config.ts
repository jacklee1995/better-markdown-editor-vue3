// src/core/i18n/config.ts

export type I18nLanguage = 'en-US' | 'zh-CN'

export interface I18nConfig {
  /**
   * 默认语言
   */
  defaultLanguage: I18nLanguage

  /**
   * 回退语言
   */
  fallbackLanguage: I18nLanguage

  /**
   * 支持的语言列表
   */
  supportedLanguages: I18nLanguage[]
}

const config: I18nConfig = {
  defaultLanguage: 'en-US',
  fallbackLanguage: 'en-US',
  supportedLanguages: ['en-US', 'zh-CN'],
}

export default config
