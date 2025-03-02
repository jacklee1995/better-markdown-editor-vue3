// 环境变量配置
export const env = {
  // 当前环境
  mode: import.meta.env.MODE,

  // 是否为开发环境
  isDev: import.meta.env.DEV,

  // 是否为生产环境
  isProd: import.meta.env.PROD,

  // 应用标题
  appTitle: import.meta.env.VITE_APP_TITLE,

  // API基础URL
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,

  // API超时时间
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '5000'),

  // 登录成功后的重定向路径
  loginRedirect: import.meta.env.VITE_LOGIN_REDIRECT || '/dashboard',

  // 是否启用Mock数据
  enableMock: import.meta.env.VITE_ENABLE_MOCK === 'true',
}

export default env
