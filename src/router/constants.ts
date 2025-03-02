// src/router/constants.ts

/**
 * 路由名称常量
 */
export enum RouteNames {
  /**
   * 根路由
   */
  Root = 'root',

  /**
   * 首页
   */
  Home = 'home',
  /**
   * 首页-欢迎页
   */
  HomeIndex = 'home-index',
  /**
   * 首页-功能特性页
   */
  HomeFeatures = 'home-features',
  /**
   * 首页-价格页
   */
  HomePricing = 'home-pricing',
  /**
   * 首页-用户评价页
   */
  HomeTestimonials = 'home-testimonials',
  /**
   * 首页-演示页
   */
  HomeDemo = 'home-demo',

  /**
   * 关于页面
   */
  About = 'about',
  /**
   * 关于-公司简介页
   */
  AboutIndex = 'about-index',
  /**
   * 关于-团队介绍页
   */
  AboutTeam = 'about-team',
  /**
   * 关于-新闻报道页
   */
  AboutPress = 'about-press',
  /**
   * 关于-招聘信息页
   */
  AboutCareers = 'about-careers',
  /**
   * 关于-联系我们页
   */
  AboutContact = 'about-contact',

  /**
   * 联系页面
   */
  Contact = 'contact',

  /**
   * 编辑器页面
   */
  Editor = 'editor',
  /**
   * 编辑器-我的文档页
   */
  EditorIndex = 'editor-index',
  /**
   * 编辑器-新建文档页
   */
  EditorNew = 'editor-new',
  /**
   * 编辑器-编辑文档页
   */
  EditorEdit = 'editor-edit',
  /**
   * 编辑器-查看文档页
   */
  EditorView = 'editor-view',
  /**
   * 编辑器-设置页
   */
  EditorSettings = 'editor-settings',

  /**
   * 预览页面
   */
  Preview = 'preview',
  /**
   * 预览-文档预览页
   */
  PreviewIndex = 'preview-index',
  /**
   * 预览-文件预览页
   */
  PreviewFile = 'preview-file',
  /**
   * 预览-Markdown预览页
   */
  PreviewMarkdown = 'preview-markdown',
  /**
   * 预览-HTML预览页
   */
  PreviewHtml = 'preview-html',
  /**
   * 预览-PDF预览页
   */
  PreviewPdf = 'preview-pdf',

  /**
   * 设置页面
   */
  Settings = 'settings',
  /**
   * 设置-通用设置页
   */
  SettingsIndex = 'settings-index',
  /**
   * 设置-常规设置页
   */
  SettingsGeneral = 'settings-general',
  /**
   * 设置-外观设置页
   */
  SettingsAppearance = 'settings-appearance',
  /**
   * 设置-编辑器设置页
   */
  SettingsEditor = 'settings-editor',
  /**
   * 设置-预览设置页
   */
  SettingsPreview = 'settings-preview',
  /**
   * 设置-插件设置页
   */
  SettingsPlugins = 'settings-plugins',
  /**
   * 设置-快捷键设置页
   */
  SettingsKeymap = 'settings-keymap',
  /**
   * 设置-关于页
   */
  SettingsAbout = 'settings-about',

  /**
   * 个人资料页面
   */
  Profile = 'profile',
  /**
   * 个人资料-账户信息页
   */
  ProfileIndex = 'profile-index',
  /**
   * 个人资料-基本信息设置页
   */
  ProfileSettings = 'profile-settings',
  /**
   * 个人资料-安全设置页
   */
  ProfileSecurity = 'profile-security',
  /**
   * 个人资料-通知设置页
   */
  ProfileNotifications = 'profile-notifications',
  /**
   * 个人资料-账单与订阅页
   */
  ProfileBilling = 'profile-billing',

  /**
   * 登录页面
   */
  Login = 'login',

  /**
   * 注册页面
   */
  Register = 'register',

  /**
   * 忘记密码页面
   */
  ForgotPassword = 'forgot-password',

  /**
   * 重置密码页面
   */
  ResetPassword = 'reset-password',

  /**
   * 帮助页面
   */
  Help = 'help',
  /**
   * 帮助-帮助中心页
   */
  HelpIndex = 'help-index',
  /**
   * 帮助-帮助主题页
   */
  HelpTopic = 'help-topic',
  /**
   * 帮助-搜索结果页
   */
  HelpSearch = 'help-search',
  /**
   * 帮助-意见反馈页
   */
  HelpFeedback = 'help-feedback',

  /**
   * 404 页面
   */
  NotFound = 'not-found',

  /**
   * 错误页面
   */
  Error = 'error',
  /**
   * 403 禁止访问页面
   */
  Forbidden = 'forbidden',
  /**
   * 500 服务器内部错误页面
   */
  InternalServerError = 'internal-server-error',
  /**
   * 503 服务不可用页面
   */
  ServiceUnavailable = 'service-unavailable',
}

/**
 * 路由路径常量
 */
export enum RoutePaths {
  /**
   * 根路由
   */
  Root = '/',

  /**
   * 首页
   */
  Home = '/home',
  /**
   * 首页-功能特性页
   */
  HomeFeatures = '/home/features',
  /**
   * 首页-价格页
   */
  HomePricing = '/home/pricing',
  /**
   * 首页-用户评价页
   */
  HomeTestimonials = '/home/testimonials',
  /**
   * 首页-演示页
   */
  HomeDemo = '/home/demo',

  /**
   * 关于页面
   */
  About = '/about',
  /**
   * 关于-团队介绍页
   */
  AboutTeam = '/about/team',
  /**
   * 关于-新闻报道页
   */
  AboutPress = '/about/press',
  /**
   * 关于-招聘信息页
   */
  AboutCareers = '/about/careers',
  /**
   * 关于-联系我们页
   */
  AboutContact = '/about/contact',

  /**
   * 联系页面
   */
  Contact = '/contact',

  /**
   * 编辑器页面
   */
  Editor = '/editor',
  /**
   * 编辑器-新建文档页
   */
  EditorNew = '/editor/new',
  /**
   * 编辑器-编辑文档页
   */
  EditorEdit = '/editor/edit',
  /**
   * 编辑器-查看文档页
   */
  EditorView = '/editor/view',
  /**
   * 编辑器-设置页
   */
  EditorSettings = '/editor/settings',

  /**
   * 预览页面
   */
  Preview = '/preview',
  /**
   * 预览-文件预览页
   */
  PreviewFile = '/preview/file',
  /**
   * 预览-Markdown预览页
   */
  PreviewMarkdown = '/preview/markdown',
  /**
   * 预览-HTML预览页
   */
  PreviewHtml = '/preview/html',
  /**
   * 预览-PDF预览页
   */
  PreviewPdf = '/preview/pdf',

  /**
   * 设置页面
   */
  Settings = '/settings',
  /**
   * 设置-常规设置页
   */
  SettingsGeneral = '/settings/general',
  /**
   * 设置-外观设置页
   */
  SettingsAppearance = '/settings/appearance',
  /**
   * 设置-编辑器设置页
   */
  SettingsEditor = '/settings/editor',
  /**
   * 设置-预览设置页
   */
  SettingsPreview = '/settings/preview',
  /**
   * 设置-插件设置页
   */
  SettingsPlugins = '/settings/plugins',
  /**
   * 设置-快捷键设置页
   */
  SettingsKeymap = '/settings/keymap',
  /**
   * 设置-关于页
   */
  SettingsAbout = '/settings/about',

  /**
   * 个人资料页面
   */
  Profile = '/profile',
  /**
   * 个人资料-基本信息设置页
   */
  ProfileSettings = '/profile/settings',
  /**
   * 个人资料-安全设置页
   */
  ProfileSecurity = '/profile/security',
  /**
   * 个人资料-通知设置页
   */
  ProfileNotifications = '/profile/notifications',
  /**
   * 个人资料-账单与订阅页
   */
  ProfileBilling = '/profile/billing',

  /**
   * 登录页面
   */
  Login = '/login',

  /**
   * 注册页面
   */
  Register = '/register',

  /**
   * 忘记密码页面
   */
  ForgotPassword = '/forgot-password',

  /**
   * 重置密码页面
   */
  ResetPassword = '/reset-password',

  /**
   * 帮助页面
   */
  Help = '/help',
  /**
   * 帮助-帮助主题页
   */
  HelpTopic = '/help/topic',
  /**
   * 帮助-搜索结果页
   */
  HelpSearch = '/help/search',
  /**
   * 帮助-意见反馈页
   */
  HelpFeedback = '/help/feedback',

  /**
   * 404 页面
   */
  NotFound = '/404',

  /**
   * 错误页面
   */
  Error = '/error',
  /**
   * 403 禁止访问页面
   */
  Forbidden = '/forbidden',
  /**
   * 500 服务器内部错误页面
   */
  InternalServerError = '/internal-server-error',
  /**
   * 503 服务不可用页面
   */
  ServiceUnavailable = '/service-unavailable',

  /**
   * 注册页面
   */
  Signup = '/signup',
}

/**
 * 路由参数常量
 */
export enum RouteParams {
  /**
   * 用户 ID
   */
  UserId = 'userId',

  /**
   * 文章 ID
   */
  ArticleId = 'articleId',

  /**
   * 文件 ID
   */
  FileId = 'fileId',

  /**
   * 图片 ID
   */
  ImageId = 'imageId',

  /**
   * 令牌
   */
  Token = 'token',
}

/**
 * 路由查询参数常量
 */
export enum RouteQuery {
  /**
   * 搜索关键字
   */
  Keyword = 'keyword',

  /**
   * 页码
   */
  Page = 'page',

  /**
   * 每页数量
   */
  PerPage = 'perPage',

  /**
   * 排序字段
   */
  SortBy = 'sortBy',

  /**
   * 排序方向
   */
  SortOrder = 'sortOrder',

  /**
   * 筛选条件
   */
  Filter = 'filter',
}

/**
 * 路由元信息常量
 */
export enum RouteMeta {
  /**
   * 是否需要登录
   */
  RequiresAuth = 'requiresAuth',

  /**
   * 是否需要管理员权限
   */
  RequiresAdmin = 'requiresAdmin',

  /**
   * 页面标题
   */
  Title = 'title',

  /**
   * 页面描述
   */
  Description = 'description',

  /**
   * 页面关键词
   */
  Keywords = 'keywords',
  /**
   * 是否缓存页面
   */
  KeepAlive = 'KeepAlive',
  /**
   * 页面权限
   */
  Permissions = 'Permissions',
}
