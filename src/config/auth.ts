import env from './env'

export default {
  // 登录成功后的默认跳转路径
  loginRedirect: env.loginRedirect,

  // 注销后的跳转路径
  logoutRedirect: '/',

  // 未授权访问的跳转路径
  unauthorizedRedirect: '/login',

  // 会话过期的跳转路径
  sessionExpiredRedirect: '/login?expired=true',
}
