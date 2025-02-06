src/
  ├─ core/                         # 核心模块目录
  │   ├─ editor/                   # 编辑器相关代码
  │   │   ├─ interface.ts          # 编辑器模块接口
  │   │   ├─ Editor.tsx            # 编辑器组件
  │   │   ├─ EditorState.ts        # 编辑器状态管理
  │   │   ├─ EditorConfig.ts       # 编辑器配置项  
  │   │   ├─ EditorCommand.ts      # 编辑器命令
  │   │   ├─ EditorShortcut.ts     # 编辑器快捷键
  │   │   ├─ EditorHistory.ts      # 编辑器历史记录管理
  │   │   ├─ EditorSelection.ts    # 编辑器选区管理
  │   │   ├─ EditorCursor.ts       # 编辑器光标管理
  │   │   ├─ EditorScroll.ts       # 编辑器滚动管理
  │   │   ├─ EditorInputHandler.ts # 编辑器输入处理
  │   │   ├─ EditorKeymap.ts       # 编辑器按键映射配置
  │   │   ├─ EditorDropHandler.ts  # 编辑器拖拽处理
  │   │   └─ EditorPasteHandler.ts # 编辑器粘贴处理
  │   ├─ markdown/                 # Markdown解析相关代码
  │   │   ├─ interface.ts          # Markdown模块接口
  │   │   ├─ MarkdownParser.ts     # Markdown解析器  
  │   │   ├─ MarkdownSerializer.ts # Markdown序列化器
  │   │   ├─ MarkdownLexer.ts      # Markdown词法分析器
  │   │   ├─ MarkdownTokenizer.ts  # Markdown符号化器
  │   │   ├─ MarkdownRenderer.tsx  # Markdown渲染器
  │   │   ├─ MarkdownHtmlWriter.ts # Markdown HTML写入器
  │   │   ├─ MarkdownTextWriter.ts # Markdown 纯文本写入器
  │   │   ├─ MarkdownWalker.ts     # Markdown 语法树遍历器
  │   │   ├─ MarkdownTransformer.ts# Markdown 转换器
  │   │   └─ MarkdownUtils.ts      # Markdown 工具函数
  │   ├─ plugin/                   # 插件系统相关代码
  │   │   ├─ interface.ts          # 插件模块接口
  │   │   ├─ PluginManager.ts      # 插件管理器
  │   │   ├─ PluginAPI.ts          # 插件API定义
  │   │   ├─ PluginContext.ts      # 插件上下文
  │   │   ├─ PluginEvents.ts       # 插件事件定义
  │   │   ├─ PluginFactory.ts      # 插件工厂
  │   │   ├─ PluginRegistry.ts     # 插件注册表
  │   │   ├─ PluginLoader.ts       # 插件加载器  
  │   │   ├─ PluginProxy.ts        # 插件代理
  │   │   ├─ PluginChain.ts        # 插件链
  │   │   ├─ BasePlugin.ts         # 插件基类
  │   │   └─ BuiltInPlugins.ts     # 内置插件注册
  │   ├─ theme/                    # 主题相关代码
  │   │   ├─ interface.ts          # 主题模块接口
  │   │   ├─ ThemeManager.ts       # 主题管理器
  │   │   ├─ ThemeAPI.ts           # 主题API定义
  │   │   ├─ ThemeContext.ts       # 主题上下文
  │   │   ├─ ThemeEvents.ts        # 主题事件定义
  │   │   ├─ ThemeFactory.ts       # 主题工厂
  │   │   ├─ ThemeRegistry.ts      # 主题注册表
  │   │   ├─ ThemeLoader.ts        # 主题加载器
  │   │   ├─ ThemeProxy.ts         # 主题代理  
  │   │   ├─ ThemeChain.ts         # 主题链
  │   │   ├─ BaseTheme.ts          # 主题基类
  │   │   ├─ LightTheme.ts         # 亮色主题
  │   │   └─ DarkTheme.ts          # 暗色主题
  │   ├─ i18n/                     # 国际化相关代码
  |   ├─ index.ts                  # 国际化入口
  |   ├─ config.ts                 # 国际化配置
  |   ├─ locales/                  # 国际化语言包
  |   |   ├─ en-US.json            # 英文语言包
  |   |   └─ zh-CN.json            # 中文语言包
  ├─ plugins/                      # 内置插件目录
  │   ├─ common/                   # 通用插件
  │   │   ├─ BoldPlugin.ts         # 加粗插件
  │   │   ├─ ItalicPlugin.ts       # 斜体插件
  │   │   ├─ StrikePlugin.ts       # 删除线插件
  │   │   ├─ InlineCodePlugin.ts   # 行内代码插件
  │   │   ├─ BlockquotePlugin.ts   # 引用块插件
  │   │   ├─ HrPlugin.ts           # 分隔线插件
  │   │   ├─ LinkPlugin.ts         # 链接插件
  │   │   ├─ ImagePlugin.ts        # 图片插件
  │   │   ├─ SuperscriptPlugin.ts  # 上标插件
  │   │   ├─ SubscriptPlugin.ts    # 下标插件
  │   │   ├─ HighlightPlugin.ts    # 高亮插件
  │   │   ├─ ClearFormatPlugin.ts  # 清除格式插件
  │   │   └─ SelectAllPlugin.ts    # 全选插件
  │   ├─ list/                     # 列表插件  
  │   │   ├─ OrderedListPlugin.ts  # 有序列表插件
  │   │   ├─ UnorderedListPlugin.ts# 无序列表插件
  │   │   ├─ CheckListPlugin.ts    # 清单列表插件
  │   │   └─ ListIndentPlugin.ts   # 列表缩进插件
  │   ├─ table/                    # 表格插件
  │   │   ├─ TablePlugin.ts        # 表格插件
  │   │   ├─ TableRow.ts           # 表格行
  │   │   ├─ TableCell.ts          # 表格单元格
  │   │   ├─ TableUtils.ts         # 表格工具函数
  │   │   ├─ TableHeader.ts        # 表格表头
  │   │   ├─ TableBody.ts          # 表格主体
  │   │   ├─ TableAddRowPlugin.ts  # 添加行插件
  │   │   ├─ TableAddColPlugin.ts  # 添加列插件
  │   │   ├─ TableRemoveRowPlugin.ts # 删除行插件
  │   │   └─ TableRemoveColPlugin.ts # 删除列插件
  │   ├─ codeblock/                # 代码块插件
  │   │   ├─ CodeBlockPlugin.ts    # 代码块插件
  │   │   ├─ CodeBlockRenderer.tsx # 代码块渲染器
  │   │   ├─ CodeBlockUtils.ts     # 代码块工具函数
  │   │   ├─ CodeBlockLangSelect.tsx # 代码语言选择
  │   │   ├─ CodeBlockCopyButton.tsx # 代码复制按钮
  │   │   └─ CodeBlockLineNumber.tsx # 代码行号
  │   ├─ heading/                  # 标题插件
  │   │   ├─ HeadingPlugin.ts      # 标题插件
  │   │   ├─ Heading1.ts           # 一级标题
  │   │   ├─ Heading2.ts           # 二级标题  
  │   │   ├─ Heading3.ts           # 三级标题
  │   │   ├─ Heading4.ts           # 四级标题
  │   │   ├─ Heading5.ts           # 五级标题
  │   │   ├─ Heading6.ts           # 六级标题
  │   │   └─ HeadingUtils.ts       # 标题工具函数
  │   ├─ emoji/                    # Emoji插件
  │   │   ├─ EmojiPlugin.ts        # Emoji插件
  │   │   ├─ EmojiRenderer.tsx     # Emoji渲染器
  │   │   ├─ EmojiPicker.tsx       # Emoji选择器
  │   │   └─ EmojiUtils.ts         # Emoji工具函数
  │   ├─ container/                # 自定义容器插件  
  │   │   ├─ ContainerPlugin.ts    # 自定义容器插件
  │   │   ├─ ContainerRenderer.tsx # 自定义容器渲染器
  │   │   └─ ContainerUtils.ts     # 自定义容器工具函数
  │   ├─ tasklist/                 # 任务列表插件
  │   │   ├─ TaskListPlugin.ts     # 任务列表插件
  │   │   ├─ TaskListRenderer.tsx  # 任务列表渲染器
  │   │   ├─ TaskListUtils.ts      # 任务列表工具函数
  │   │   ├─ TaskListItem.tsx      # 任务列表项组件
  │   │   └─ TaskListItemToggle.tsx# 任务列表项切换组件
  │   ├─ footnote/                 # 脚注插件
  │   │   ├─ FootnotePlugin.ts     # 脚注插件
  │   │   ├─ FootnoteRenderer.tsx  # 脚注渲染器
  │   │   ├─ FootnoteUtils.ts      # 脚注工具函数
  │   │   ├─ FootnoteDefinition.tsx# 脚注定义组件
  │   │   └─ FootnoteReference.tsx # 脚注引用组件
  │   ├─ deflist/                  # 定义列表插件
  │   │   ├─ DefListPlugin.ts      # 定义列表插件
  │   │   ├─ DefListRenderer.tsx   # 定义列表渲染器
  │   │   ├─ DefListUtils.ts       # 定义列表工具函数
  │   │   ├─ DefListTerm.tsx       # 定义列表术语组件
  │   │   └─ DefListDefinition.tsx # 定义列表定义组件
  │   ├─ underline/                # 下划线插件
  │   │   ├─ UnderlinePlugin.ts    # 下划线插件
  │   │   ├─ UnderlineRenderer.tsx # 下划线渲染器
  │   │   ├─ UnderlineUtils.ts     # 下划线工具函数
  │   │   └─ UnderlineButton.tsx   # 下划线按钮组件
  │   ├─ math/                     # 数学公式插件
  │   │   ├─ MathPlugin.ts         # 数学公式插件
  │   │   ├─ MathRenderer.tsx      # 数学公式渲染器
  │   │   ├─ MathUtils.ts          # 数学公式工具函数
  │   │   ├─ MathInline.tsx        # 行内公式组件
  │   │   └─ MathBlock.tsx         # 公式块组件
  │   ├─ toc/                      # 目录插件
  │   │   ├─ TocPlugin.ts          # 目录插件
  │   │   ├─ TocRenderer.tsx       # 目录渲染器
  │   │   ├─ TocUtils.ts           # 目录工具函数
  │   │   ├─ TocList.tsx           # 目录列表组件
  │   │   └─ TocItem.tsx           # 目录项组件
  │   ├─ mermaid/                  # Mermaid插件
  │   │   ├─ MermaidPlugin.ts      # Mermaid插件
  │   │   ├─ MermaidRenderer.tsx   # Mermaid渲染器
  │   │   ├─ MermaidUtils.ts       # Mermaid工具函数
  │   │   ├─ MermaidFlowchart.tsx  # Mermaid流程图组件
  │   │   ├─ MermaidSequence.tsx   # Mermaid时序图组件
  │   │   ├─ MermaidGantt.tsx      # Mermaid甘特图组件
  │   │   ├─ MermaidClass.tsx      # Mermaid类图组件
  │   │   ├─ MermaidState.tsx      # Mermaid状态图组件
  │   │   ├─ MermaidPie.tsx        # Mermaid饼图组件
  │   │   └─ MermaidRelationship.tsx # Mermaid关系图组件
  │   ├─ echarts/                  # ECharts插件
  │   │   ├─ EChartsPlugin.ts      # ECharts插件
  │   │   ├─ EChartsRenderer.tsx   # ECharts渲染器
  │   │   ├─ EChartsUtils.ts       # ECharts工具函数
  │   │   ├─ EChartsLine.tsx       # ECharts折线图组件
  │   │   ├─ EChartsBar.tsx        # ECharts柱状图组件
  │   │   ├─ EChartsPie.tsx        # ECharts饼图组件
  │   │   ├─ EChartsScatter.tsx    # ECharts散点图组件
  │   │   ├─ EChartsRadar.tsx      # ECharts雷达图组件
  │   │   ├─ EChartsTree.tsx       # ECharts树图组件
  │   │   ├─ EChartsMap.tsx        # ECharts地图组件
  │   │   ├─ EChartsHeatmap.tsx    # ECharts热力图组件
  │   │   ├─ EChartsGraph.tsx      # ECharts关系图组件
  │   │   ├─ EChartsGauge.tsx      # ECharts仪表盘组件
  │   │   ├─ EChartsFunnel.tsx     # ECharts漏斗图组件
  │   │   └─ EChartsCalendar.tsx   # ECharts日历图组件
  │   └─ ...
  ├─ ui/                           # UI组件目录
  │   ├─ toolbar/                  # 工具栏
  │   │   ├─ Toolbar.tsx           # 工具栏组件
  │   │   ├─ ToolbarButton.tsx     # 工具栏按钮组件
  │   │   ├─ ToolbarButtonGroup.tsx# 工具栏按钮组组件
  │   │   ├─ ToolbarDivider.tsx    # 工具栏分隔线组件
  │   │   ├─ ToolbarDropdown.tsx   # 工具栏下拉菜单组件
  │   │   ├─ ToolbarInput.tsx      # 工具栏输入框组件
  │   │   ├─ ToolbarSelect.tsx     # 工具栏选择框组件
  │   │   ├─ ToolbarIcon.tsx       # 工具栏图标组件
  │   │   ├─ ToolbarLink.tsx       # 工具栏链接组件
  │   │   ├─ ToolbarSeparator.tsx  # 工具栏分隔符组件
  │   │   ├─ ToolbarText.tsx       # 工具栏文本组件
  │   │   └─ ToolbarSlot.tsx       # 工具栏插槽组件
  │   ├─ sidebar/                  # 侧边栏
  │   │   ├─ Sidebar.tsx           # 侧边栏组件
  │   │   ├─ SidebarItem.tsx       # 侧边栏项组件
  │   │   ├─ SidebarGroup.tsx      # 侧边栏分组组件
  │   │   ├─ SidebarDivider.tsx    # 侧边栏分隔线组件
  │   │   ├─ SidebarToggle.tsx     # 侧边栏开关组件
  │   │   ├─ SidebarHeader.tsx     # 侧边栏头部组件
  │   │   ├─ SidebarFooter.tsx     # 侧边栏底部组件
  │   │   ├─ SidebarBrand.tsx      # 侧边栏品牌组件
  │   │   ├─ SidebarNav.tsx        # 侧边栏导航组件
  │   │   ├─ SidebarNavItem.tsx    # 侧边栏导航项组件
  │   │   └─ SidebarNavGroup.tsx   # 侧边栏导航分组组件
  │   ├─ statusbar/                # 状态栏
  │   │   ├─ Statusbar.tsx         # 状态栏组件
  │   │   ├─ StatusbarItem.tsx     # 状态栏项组件
  │   │   ├─ StatusbarDivider.tsx  # 状态栏分隔线组件
  │   │   ├─ StatusbarText.tsx     # 状态栏文本组件
  │   │   ├─ StatusbarIcon.tsx     # 状态栏图标组件
  │   │   ├─ StatusbarLink.tsx     # 状态栏链接组件
  │   │   ├─ StatusbarProgress.tsx # 状态栏进度条组件
  │   │   └─ StatusbarSlot.tsx     # 状态栏插槽组件
  │   ├─ preview/                  # 预览区
  │   │   ├─ Preview.tsx           # 预览区组件
  │   │   ├─ PreviewHeader.tsx     # 预览区头部组件
  │   │   ├─ PreviewBody.tsx       # 预览区主体组件
  │   │   ├─ PreviewFooter.tsx     # 预览区底部组件
  │   │   ├─ PreviewNavbar.tsx     # 预览区导航栏组件
  │   │   ├─ PreviewToc.tsx        # 预览区目录组件
  │   │   ├─ PreviewAnchor.tsx     # 预览区锚点组件
  │   │   ├─ PreviewHighlight.tsx  # 预览区高亮组件
  │   │   ├─ PreviewMath.tsx       # 预览区数学公式组件
  │   │   ├─ PreviewMermaid.tsx    # 预览区Mermaid图表组件
  │   │   ├─ PreviewEcharts.tsx    # 预览区Echarts图表组件
  │   │   └─ PreviewSlot.tsx       # 预览区插槽组件
  │   ├─ outline/                  # 大纲
  │   │   ├─ Outline.tsx           # 大纲组件
  │   │   ├─ OutlineItem.tsx       # 大纲项组件
  │   │   ├─ OutlineTree.tsx       # 大纲树组件
  │   │   ├─ OutlineSearch.tsx     # 大纲搜索组件
  │   │   ├─ OutlineFilter.tsx     # 大纲过滤组件
  │   │   ├─ OutlineSort.tsx       # 大纲排序组件
  │   │   ├─ OutlineExpand.tsx     # 大纲展开/折叠组件
  │   │   └─ OutlineSlot.tsx       # 大纲插槽组件
  │   ├─ dialog/                   # 对话框
  │   │   ├─ Dialog.tsx            # 对话框组件
  │   │   ├─ DialogHeader.tsx      # 对话框头部组件
  │   │   ├─ DialogBody.tsx        # 对话框主体组件
  │   │   ├─ DialogFooter.tsx      # 对话框底部组件
  │   │   ├─ DialogTitle.tsx       # 对话框标题组件
  │   │   ├─ DialogContent.tsx     # 对话框内容组件
  │   │   ├─ DialogActions.tsx     # 对话框操作按钮组件
  │   │   ├─ DialogClose.tsx       # 对话框关闭组件
  │   │   ├─ DialogFullscreen.tsx  # 对话框全屏组件
  │   │   ├─ DialogResize.tsx      # 对话框调整大小组件
  │   │   ├─ DialogDrag.tsx        # 对话框拖拽组件
  │   │   └─ DialogSlot.tsx        # 对话框插槽组件
  │   ├─ menu/                     # 菜单
  │   │   ├─ Menu.tsx              # 菜单组件
  │   │   ├─ MenuItem.tsx          # 菜单项组件
  │   │   ├─ MenuDivider.tsx       # 菜单分隔线组件
  │   │   ├─ MenuGroup.tsx         # 菜单分组组件
  │   │   ├─ MenuSub.tsx           # 子菜单组件
  │   │   ├─ MenuIcon.tsx          # 菜单图标组件
  │   │   ├─ MenuLink.tsx          # 菜单链接组件
  │   │   ├─ MenuHeader.tsx        # 菜单头部组件
  │   │   ├─ MenuFooter.tsx        # 菜单底部组件
  │   │   └─ MenuSlot.tsx          # 菜单插槽组件
  │   ├─ tooltip/                  # 提示框
  │   │   ├─ Tooltip.tsx           # 提示框组件
  │   │   ├─ TooltipTrigger.tsx    # 提示框触发器组件
  │   │   ├─ TooltipContent.tsx    # 提示框内容组件
  │   │   ├─ TooltipArrow.tsx      # 提示框箭头组件
  │   │   ├─ TooltipTheme.tsx      # 提示框主题组件
  │   │   ├─ TooltipAnimation.tsx  # 提示框动画组件
  │   │   ├─ TooltipPlacement.tsx  # 提示框位置组件
  │   │   └─ TooltipSlot.tsx       # 提示框插槽组件
  │   ├─ popover/                  # 弹出框
  │   │   ├─ Popover.tsx           # 弹出框组件
  │   │   ├─ PopoverTrigger.tsx    # 弹出框触发器组件
  │   │   ├─ PopoverContent.tsx    # 弹出框内容组件
  │   │   ├─ PopoverArrow.tsx      # 弹出框箭头组件
  │   │   ├─ PopoverTheme.tsx      # 弹出框主题组件
  │   │   ├─ PopoverAnimation.tsx  # 弹出框动画组件
  │   │   ├─ PopoverPlacement.tsx  # 弹出框位置组件
  │   │   └─ PopoverSlot.tsx       # 弹出框插槽组件
  │   ├─ modal/                    # 模态框
  │   │   ├─ Modal.tsx             # 模态框组件
  │   │   ├─ ModalHeader.tsx       # 模态框头部组件
  │   │   ├─ ModalBody.tsx         # 模态框主体组件
  │   │   ├─ ModalFooter.tsx       # 模态框底部组件
  │   │   ├─ ModalTitle.tsx        # 模态框标题组件
  │   │   ├─ ModalContent.tsx      # 模态框内容组件
  │   │   ├─ ModalClose.tsx        # 模态框关闭组件
  │   │   ├─ ModalBackdrop.tsx     # 模态框背景组件
  │   │   ├─ ModalAnimation.tsx    # 模态框动画组件
  │   │   ├─ ModalSize.tsx         # 模态框尺寸组件
  │   │   └─ ModalSlot.tsx         # 模态框插槽组件
  │   ├─ button/                   # 按钮
  │   │   ├─ Button.tsx            # 按钮组件
  │   │   ├─ ButtonGroup.tsx       # 按钮组组件
  │   │   ├─ ButtonIcon.tsx        # 按钮图标组件
  │   │   ├─ ButtonText.tsx        # 按钮文本组件
  │   │   ├─ ButtonLink.tsx        # 按钮链接组件
  │   │   ├─ ButtonLoading.tsx     # 按钮加载组件
  │   │   ├─ ButtonDisabled.tsx    # 按钮禁用组件
  │   │   ├─ ButtonActive.tsx      # 按钮激活组件
  │   │   ├─ ButtonSize.tsx        # 按钮尺寸组件
  │   │   └─ ButtonSlot.tsx        # 按钮插槽组件
  │   ├─ icon/                     # 图标
  │   │   ├─ Icon.tsx              # 图标组件
  │   │   ├─ IconButton.tsx        # 图标按钮组件
  │   │   ├─ IconText.tsx          # 图标文本组件
  │   │   ├─ IconLink.tsx          # 图标链接组件
  │   │   ├─ IconLoading.tsx       # 图标加载组件
  │   │   ├─ IconDisabled.tsx      # 图标禁用组件
  │   │   ├─ IconActive.tsx        # 图标激活组件
  │   │   ├─ IconSize.tsx          # 图标尺寸组件
  │   │   └─ IconSlot.tsx          # 图标插槽组件
  │   ├─ dropdown/                 # 下拉菜单
  │   │   ├─ Dropdown.tsx          # 下拉菜单组件
  │   │   ├─ DropdownTrigger.tsx   # 下拉菜单触发器组件
  │   │   ├─ DropdownMenu.tsx      # 下拉菜单内容组件
  │   │   ├─ DropdownItem.tsx      # 下拉菜单项组件
  │   │   ├─ DropdownDivider.tsx   # 下拉菜单分隔线组件
  │   │   ├─ DropdownGroup.tsx     # 下拉菜单分组组件
  │   │   ├─ DropdownSub.tsx       # 下拉子菜单组件
  │   │   ├─ DropdownIcon.tsx      # 下拉菜单图标组件
  │   │   ├─ DropdownHeader.tsx    # 下拉菜单头部组件
  │   │   ├─ DropdownFooter.tsx    # 下拉菜单底部组件
  │   │   └─ DropdownSlot.tsx      # 下拉菜单插槽组件
  │   ├─ input/                    # 输入框
  │   │   ├─ Input.tsx             # 输入框组件
  │   │   ├─ InputGroup.tsx        # 输入框组组件
  │   │   ├─ InputAddon.tsx        # 输入框附加组件
  │   │   ├─ InputIcon.tsx         # 输入框图标组件
  │   │   ├─ InputClear.tsx        # 输入框清除组件
  │   │   ├─ InputPassword.tsx     # 密码输入框组件
  │   │   ├─ InputNumber.tsx       # 数字输入框组件
  │   │   ├─ InputTextarea.tsx     # 多行输入框组件
  │   │   ├─ InputSearch.tsx       # 搜索输入框组件
  │   │   └─ InputSlot.tsx         # 输入框插槽组件
  │   ├─ select/                   # 选择框
  │   │   ├─ Select.tsx            # 选择框组件
  │   │   ├─ Option.tsx            # 选项组件
  │   │   ├─ OptionGroup.tsx       # 选项组组件
  │   │   ├─ SelectMultiple.tsx    # 多选选择框组件
  │   │   ├─ SelectSearch.tsx      # 可搜索选择框组件
  │   │   ├─ SelectTree.tsx        # 树形选择框组件
  │   │   ├─ SelectCascader.tsx    # 级联选择框组件
  │   │   ├─ SelectLoading.tsx     # 选择框加载组件
  │   │   ├─ SelectClear.tsx       # 选择框清除组件
  │   │   └─ SelectSlot.tsx        # 选择框插槽组件
  │   ├─ radio/                    # 单选框
  │   │   ├─ Radio.tsx             # 单选框组件
  │   │   ├─ RadioGroup.tsx        # 单选框组组件
  │   │   ├─ RadioButton.tsx       # 单选按钮组件
  │   │   ├─ RadioText.tsx         # 单选文本组件
  │   │   ├─ RadioIcon.tsx         # 单选图标组件
  │   │   ├─ RadioDisabled.tsx     # 单选禁用组件
  │   │   ├─ RadioVertical.tsx     # 垂直单选组件
  │   │   ├─ RadioSize.tsx         # 单选尺寸组件
  │   │   └─ RadioSlot.tsx         # 单选插槽组件
  │   ├─ checkbox/                 # 复选框
  │   │   ├─ Checkbox.tsx          # 复选框组件
  │   │   ├─ CheckboxGroup.tsx     # 复选框组组件
  │   │   ├─ CheckboxButton.tsx    # 复选按钮组件
  │   │   ├─ CheckboxText.tsx      # 复选文本组件
  │   │   ├─ CheckboxIcon.tsx      # 复选图标组件
  │   │   ├─ CheckboxDisabled.tsx  # 复选禁用组件
  │   │   ├─ CheckboxVertical.tsx  # 垂直复选组件
  │   │   ├─ CheckboxSize.tsx      # 复选尺寸组件
  │   │   └─ CheckboxSlot.tsx      # 复选插槽组件
  │   ├─ switch/                   # 开关
  │   │   ├─ Switch.tsx            # 开关组件
  │   │   ├─ SwitchDisabled.tsx    # 开关禁用组件
  │   │   ├─ SwitchLoading.tsx     # 开关加载组件
  │   │   ├─ SwitchText.tsx        # 开关文本组件
  │   │   ├─ SwitchIcon.tsx        # 开关图标组件
  │   │   ├─ SwitchSize.tsx        # 开关尺寸组件
  │   │   └─ SwitchSlot.tsx        # 开关插槽组件
  │   ├─ slider/                   # 滑块
  │   │   ├─ Slider.tsx            # 滑块组件
  │   │   ├─ SliderRange.tsx       # 范围滑块组件
  │   │   ├─ SliderVertical.tsx    # 垂直滑块组件
  │   │   ├─ SliderTooltip.tsx     # 滑块提示组件
  │   │   ├─ SliderMark.tsx        # 滑块标记组件
  │   │   ├─ SliderStep.tsx        # 滑块步长组件
  │   │   ├─ SliderDisabled.tsx    # 滑块禁用组件
  │   │   ├─ SliderSize.tsx        # 滑块尺寸组件
  │   │   └─ SliderSlot.tsx        # 滑块插槽组件
  │   ├─ progress/                 # 进度条
  │   │   ├─ Progress.tsx          # 进度条组件
  │   │   ├─ ProgressCircle.tsx    # 环形进度条组件
  │   │   ├─ ProgressDashboard.tsx # 仪表盘进度条组件
  │   │   ├─ ProgressLine.tsx      # 线形进度条组件
  │   │   ├─ ProgressText.tsx      # 进度条文本组件
  │   │   ├─ ProgressAnimation.tsx # 进度条动画组件
  │   │   ├─ ProgressSize.tsx      # 进度条尺寸组件
  │   │   └─ ProgressSlot.tsx      # 进度条插槽组件
  │   ├─ avatar/                   # 头像
  │   │   ├─ Avatar.tsx            # 头像组件
  │   │   ├─ AvatarGroup.tsx       # 头像组组件
  │   │   ├─ AvatarText.tsx        # 头像文本组件
  │   │   ├─ AvatarIcon.tsx        # 头像图标组件
  │   │   ├─ AvatarImage.tsx       # 头像图片组件
  │   │   ├─ AvatarBadge.tsx       # 头像徽标组件
  │   │   ├─ AvatarSize.tsx        # 头像尺寸组件
  │   │   └─ AvatarSlot.tsx        # 头像插槽组件
  │   ├─ badge/                    # 徽标
  │   │   ├─ Badge.tsx             # 徽标组件
  │   │   ├─ BadgeText.tsx         # 徽标文本组件
  │   │   ├─ BadgeIcon.tsx         # 徽标图标组件
  │   │   ├─ BadgeDot.tsx          # 徽标圆点组件
  │   │   ├─ BadgeRibbon.tsx       # 徽标缎带组件
  │   │   ├─ BadgeCount.tsx        # 徽标计数组件
  │   │   ├─ BadgeOverflow.tsx     # 徽标溢出组件
  │   │   └─ BadgeSlot.tsx         # 徽标插槽组件
  │   ├─ alert/                    # 警告框
  │   │   ├─ Alert.tsx             # 警告框组件
  │   │   ├─ AlertIcon.tsx         # 警告框图标组件
  │   │   ├─ AlertText.tsx         # 警告框文本组件
  │   │   ├─ AlertClose.tsx        # 警告框关闭组件
  │   │   ├─ AlertDescription.tsx  # 警告框描述组件
  │   │   ├─ AlertType.tsx         # 警告框类型组件
  │   │   ├─ AlertSlot.tsx         # 警告框插槽组件
  │   │   └─ AlertTransition.tsx   # 警告框过渡组件
  │   ├─ notification/             # 通知
  │   │   ├─ Notification.tsx      # 通知组件
  │   │   ├─ NotificationManager.ts# 通知管理器
  │   │   ├─ NotificationIcon.tsx  # 通知图标组件
  │   │   ├─ NotificationText.tsx  # 通知文本组件
  │   │   ├─ NotificationClose.tsx # 通知关闭组件
  │   │   ├─ NotificationType.tsx  # 通知类型组件
  │   │   ├─ NotificationSlot.tsx  # 通知插槽组件
  │   │   └─ NotificationTransition.tsx # 通知过渡组件
  │   ├─ message/                  # 全局提示
  │   │   ├─ Message.tsx           # 全局提示组件
  │   │   ├─ MessageManager.ts     # 全局提示管理器
  │   │   ├─ MessageIcon.tsx       # 全局提示图标组件
  │   │   ├─ MessageText.tsx       # 全局提示文本组件
  │   │   ├─ MessageClose.tsx      # 全局提示关闭组件
  │   │   ├─ MessageType.tsx       # 全局提示类型组件
  │   │   ├─ MessageSlot.tsx       # 全局提示插槽组件
  │   │   └─ MessageTransition.tsx # 全局提示过渡组件
  │   ├─ drawer/                   # 抽屉
  │   │   ├─ Drawer.tsx            # 抽屉组件
  │   │   ├─ DrawerHeader.tsx      # 抽屉头部组件
  │   │   ├─ DrawerBody.tsx        # 抽屉主体组件
  │   │   ├─ DrawerFooter.tsx      # 抽屉底部组件
  │   │   ├─ DrawerClose.tsx       # 抽屉关闭组件
  │   │   ├─ DrawerMask.tsx        # 抽屉遮罩组件
  │   │   ├─ DrawerPlacement.tsx   # 抽屉位置组件
  │   │   ├─ DrawerSize.tsx        # 抽屉尺寸组件
  │   │   ├─ DrawerSlot.tsx        # 抽屉插槽组件
  │   │   └─ DrawerTransition.tsx  # 抽屉过渡组件
  │   ├─ card/                     # 卡片
  │   │   ├─ Card.tsx              # 卡片组件
  │   │   ├─ CardHeader.tsx        # 卡片头部组件
  │   │   ├─ CardBody.tsx          # 卡片主体组件
  │   │   ├─ CardFooter.tsx        # 卡片底部组件
  │   │   ├─ CardCover.tsx         # 卡片封面组件
  │   │   ├─ CardActions.tsx       # 卡片操作组组件
  │   │   ├─ CardMeta.tsx          # 卡片元信息组件
  │   │   ├─ CardLoading.tsx       # 卡片加载组件
  │   │   ├─ CardSlot.tsx          # 卡片插槽组件
  │   │   └─ CardGrid.tsx          # 卡片网格组件
  │   ├─ tabs/                     # 标签页
  │   │   ├─ Tabs.tsx              # 标签页组件
  │   │   ├─ TabPane.tsx           # 标签页面板组件
  │   │   ├─ TabNav.tsx            # 标签页导航组件
  │   │   ├─ TabContent.tsx        # 标签页内容组件
  │   │   ├─ TabExtra.tsx          # 标签页额外内容组件
  │   │   ├─ TabAdd.tsx            # 标签页添加组件
  │   │   ├─ TabClose.tsx          # 标签页关闭组件
  │   │   ├─ TabScroll.tsx         # 标签页滚动组件
  │   │   ├─ TabSlot.tsx           # 标签页插槽组件
  │   │   └─ TabTransition.tsx     # 标签页过渡组件
  │   ├─ breadcrumb/               # 面包屑
  │   │   ├─ Breadcrumb.tsx        # 面包屑组件
  │   │   ├─ BreadcrumbItem.tsx    # 面包屑项组件
  │   │   ├─ BreadcrumbSeparator.tsx # 面包屑分隔符组件
  │   │   ├─ BreadcrumbLink.tsx    # 面包屑链接组件
  │   │   ├─ BreadcrumbIcon.tsx    # 面包屑图标组件
  │   │   ├─ BreadcrumbSlot.tsx    # 面包屑插槽组件
  │   │   └─ BreadcrumbTransition.tsx # 面包屑过渡组件
  │   ├─ steps/                    # 步骤条
  │   │   ├─ Steps.tsx             # 步骤条组件
  │   │   ├─ Step.tsx              # 步骤项组件
  │   │   ├─ StepIcon.tsx          # 步骤图标组件
  │   │   ├─ StepTitle.tsx         # 步骤标题组件
  │   │   ├─ StepDescription.tsx   # 步骤描述组件
  │   │   ├─ StepStatus.tsx        # 步骤状态组件
  │   │   ├─ StepNumber.tsx        # 步骤编号组件
  │   │   ├─ StepSlot.tsx          # 步骤插槽组件
  │   │   └─ StepTransition.tsx    # 步骤过渡组件
  │   ├─ collapse/                 # 折叠面板
  │   │   ├─ Collapse.tsx          # 折叠面板组件
  │   │   ├─ CollapsePanel.tsx     # 折叠面板项组件
  │   │   ├─ CollapseHeader.tsx    # 折叠面板头部组件
  │   │   ├─ CollapseBody.tsx      # 折叠面板主体组件
  │   │   ├─ CollapseArrow.tsx     # 折叠面板箭头组件
  │   │   ├─ CollapseExtra.tsx     # 折叠面板额外内容组件
  │   │   ├─ CollapseSlot.tsx      # 折叠面板插槽组件
  │   │   └─ CollapseTransition.tsx# 折叠面板过渡组件
  │   ├─ tree/                     # 树形控件
  │   │   ├─ Tree.tsx              # 树形控件组件
  │   │   ├─ TreeNode.tsx          # 树节点组件
  │   │   ├─ TreeBranch.tsx        # 树枝组件
  │   │   ├─ TreeLeaf.tsx          # 树叶组件
  │   │   ├─ TreeIndent.tsx        # 树缩进组件
  │   │   ├─ TreeIcon.tsx          # 树图标组件
  │   │   ├─ TreeCheckbox.tsx      # 树复选框组件
  │   │   ├─ TreeRadio.tsx         # 树单选框组件
  │   │   ├─ TreeLoading.tsx       # 树加载组件
  │   │   ├─ TreeDraggable.tsx     # 树拖拽组件
  │   │   ├─ TreeSlot.tsx          # 树插槽组件
  │   │   └─ TreeTransition.tsx    # 树过渡组件
  │   ├─ pagination/               # 分页
  │   │   ├─ Pagination.tsx        # 分页组件
  │   │   ├─ PaginationPrev.tsx    # 分页上一页组件
  │   │   ├─ PaginationNext.tsx    # 分页下一页组件
  │   │   ├─ PaginationJumper.tsx  # 分页跳转组件
  │   │   ├─ PaginationSizes.tsx   # 分页尺寸选择组件
  │   │   ├─ PaginationTotal.tsx   # 分页总数组件
  │   │   ├─ PaginationSlot.tsx    # 分页插槽组件
  │   │   └─ PaginationTransition.tsx # 分页过渡组件
  │   ├─ table/                    # 表格
  │   │   ├─ Table.tsx             # 表格组件
  │   │   ├─ TableColumn.tsx       # 表格列组件
  │   │   ├─ TableHeader.tsx       # 表格头部组件
  │   │   ├─ TableBody.tsx         # 表格主体组件
  │   │   ├─ TableRow.tsx          # 表格行组件
  │   │   ├─ TableCell.tsx         # 表格单元格组件
  │   │   ├─ TableExpand.tsx       # 表格展开组件
  │   │   ├─ TableSelect.tsx       # 表格选择组件
  │   │   ├─ TableSort.tsx         # 表格排序组件
  │   │   ├─ TableFilter.tsx       # 表格过滤组件
  │   │   ├─ TableLoading.tsx      # 表格加载组件
  │   │   ├─ TableEmpty.tsx        # 表格空数据组件
  │   │   ├─ TableSlot.tsx         # 表格插槽组件
  │   │   └─ TableTransition.tsx   # 表格过渡组件
  │   ├─ datepicker/               # 日期选择器
  │   │   ├─ DatePicker.tsx        # 日期选择器组件
  │   │   ├─ DatePickerInput.tsx   # 日期选择器输入框组件
  │   │   ├─ DatePickerPanel.tsx   # 日期选择器面板组件
  │   │   ├─ DatePickerHeader.tsx  # 日期选择器头部组件
  │   │   ├─ DatePickerBody.tsx    # 日期选择器主体组件
  │   │   ├─ DatePickerFooter.tsx  # 日期选择器底部组件
  │   │   ├─ DatePickerShortcut.tsx# 日期选择器快捷选项组件
  │   │   ├─ DatePickerRange.tsx   # 日期范围选择器组件
  │   │   ├─ DatePickerTime.tsx    # 日期时间选择器组件
  │   │   ├─ DatePickerMonth.tsx   # 月份选择器组件
  │   │   ├─ DatePickerYear.tsx    # 年份选择器组件
  │   │   ├─ DatePickerSlot.tsx    # 日期选择器插槽组件
  │   │   └─ DatePickerTransition.tsx # 日期选择器过渡组件
  │   ├─ timepicker/               # 时间选择器
  │   │   ├─ TimePicker.tsx        # 时间选择器组件
  │   │   ├─ TimePickerInput.tsx   # 时间选择器输入框组件
  │   │   ├─ TimePickerPanel.tsx   # 时间选择器面板组件
  │   │   ├─ TimePickerHeader.tsx  # 时间选择器头部组件
  │   │   ├─ TimePickerBody.tsx    # 时间选择器主体组件
  │   │   ├─ TimePickerFooter.tsx  # 时间选择器底部组件
  │   │   ├─ TimePickerRange.tsx   # 时间范围选择器组件
  │   │   ├─ TimePickerSlot.tsx    # 时间选择器插槽组件
  │   │   ├─ TimePickerTransition.tsx # 时间选择器过渡组件
  │   │   ├─ TimePickerFormat.tsx  # 时间选择器格式化组件
  │   │   ├─ TimePickerStep.tsx    # 时间选择器步长组件
  │   │   └─ TimePickerDisabled.tsx# 时间选择器禁用组件
  │   ├─ upload/                   # 上传
  │   │   ├─ Upload.tsx            # 上传组件
  │   │   ├─ UploadDragger.tsx     # 拖拽上传组件
  │   │   ├─ UploadList.tsx        # 上传列表组件
  │   │   ├─ UploadItem.tsx        # 上传项组件
  │   │   ├─ UploadProgress.tsx    # 上传进度组件
  │   │   ├─ UploadPreview.tsx     # 上传预览组件
  │   │   ├─ UploadRemove.tsx      # 上传移除组件
  │   │   ├─ UploadReupload.tsx    # 上传重新上传组件
  │   │   ├─ UploadSlot.tsx        # 上传插槽组件
  │   │   ├─ UploadTransition.tsx  # 上传过渡组件
  │   │   ├─ UploadTrigger.tsx     # 上传触发器组件
  │   │   └─ UploadPictureCard.tsx # 上传图片卡片组件
  │   ├─ carousel/                 # 走马灯
  │   │   ├─ Carousel.tsx          # 走马灯组件
  │   │   ├─ CarouselItem.tsx      # 走马灯项组件
  │   │   ├─ CarouselArrow.tsx     # 走马灯箭头组件
  │   │   ├─ CarouselDots.tsx      # 走马灯指示点组件
  │   │   ├─ CarouselAutoplay.tsx  # 走马灯自动播放组件
  │   │   ├─ CarouselSlot.tsx      # 走马灯插槽组件
  │   │   ├─ CarouselTransition.tsx# 走马灯过渡组件
  │   │   ├─ CarouselVertical.tsx  # 垂直走马灯组件
  │   │   ├─ CarouselEffect.tsx    # 走马灯效果组件
  │   │   └─ CarouselLazyLoad.tsx  # 走马灯懒加载组件
  │   ├─ skeleton/                 # 骨架屏
  │   │   ├─ Skeleton.tsx          # 骨架屏组件
  │   │   ├─ SkeletonItem.tsx      # 骨架屏项组件
  │   │   ├─ SkeletonAvatar.tsx    # 骨架屏头像组件
  │   │   ├─ SkeletonTitle.tsx     # 骨架屏标题组件
  │   │   ├─ SkeletonParagraph.tsx # 骨架屏段落组件
  │   │   ├─ SkeletonButton.tsx    # 骨架屏按钮组件
  │   │   ├─ SkeletonInput.tsx     # 骨架屏输入框组件
  │   │   ├─ SkeletonImage.tsx     # 骨架屏图片组件
  │   │   ├─ SkeletonSlot.tsx      # 骨架屏插槽组件
  │   │   └─ SkeletonTransition.tsx# 骨架屏过渡组件
  │   ├─ backtop/                  # 回到顶部
  │   │   ├─ BackTop.tsx           # 回到顶部组件
  │   │   ├─ BackTopIcon.tsx       # 回到顶部图标组件
  │   │   ├─ BackTopText.tsx       # 回到顶部文本组件
  │   │   ├─ BackTopSlot.tsx       # 回到顶部插槽组件
  │   │   ├─ BackTopTransition.tsx # 回到顶部过渡组件
  │   │   ├─ BackTopTarget.tsx     # 回到顶部目标组件
  │   │   ├─ BackTopVisibility.tsx # 回到顶部可见性组件
  │   │   └─ BackTopDuration.tsx   # 回到顶部持续时间组件
  │   ├─ affix/                    # 固钉
  │   │   ├─ Affix.tsx             # 固钉组件
  │   │   ├─ AffixTop.tsx          # 固钉顶部组件
  │   │   ├─ AffixBottom.tsx       # 固钉底部组件
  │   │   ├─ AffixTarget.tsx       # 固钉目标组件
  │   │   ├─ AffixOffset.tsx       # 固钉偏移组件
  │   │   ├─ AffixSlot.tsx         # 固钉插槽组件
  │   │   └─ AffixTransition.tsx   # 固钉过渡组件
  │   ├─ anchor/                   # 锚点
  │   │   ├─ Anchor.tsx            # 锚点组件
  │   │   ├─ AnchorLink.tsx        # 锚点链接组件
  │   │   ├─ AnchorTitle.tsx       # 锚点标题组件
  │   │   ├─ AnchorParagraph.tsx   # 锚点段落组件
  │   │   ├─ AnchorAffix.tsx       # 锚点固钉组件
  │   │   ├─ AnchorClick.tsx       # 锚点点击组件
  │   │   ├─ AnchorScroll.tsx      # 锚点滚动组件
  │   │   ├─ AnchorSlot.tsx        # 锚点插槽组件
  │   │   └─ AnchorTransition.tsx  # 锚点过渡组件
  ├─ styles/                       # 样式目录
  │   ├─ index.scss                # 全局样式入口
  │   ├─ variables.scss            # 全局样式变量
  │   ├─ mixins.scss               # 全局样式混入
  │   ├─ functions.scss            # 全局样式函数
  │   ├─ reset.scss                # 重置样式
  │   ├─ themes/                   # 主题样式目录
  │   │   ├─ light.scss            # 亮色主题
  │   │   ├─ dark.scss             # 暗色主题
  │   │   ├─ custom.scss           # 自定义主题
  │   │   └─ theme.scss            # 主题样式入口
  │   ├─ components/               # 组件样式目录
  │   │   ├─ editor.scss           # 编辑器样式
  │   │   ├─ toolbar.scss          # 工具栏样式
  │   │   ├─ preview.scss          # 预览区样式
  │   │   ├─ statusbar.scss        # 状态栏样式
  │   │   ├─ sidebar.scss          # 侧边栏样式
  │   │   ├─ dialog.scss           # 对话框样式
  │   │   ├─ button.scss           # 按钮样式
  │   │   ├─ icon.scss             # 图标样式
  │   │   ├─ dropdown.scss         # 下拉菜单样式
  │   │   ├─ input.scss            # 输入框样式
  │   │   ├─ select.scss           # 选择框样式
  │   │   ├─ radio.scss            # 单选框样式
  │   │   ├─ checkbox.scss         # 复选框样式
  │   │   ├─ switch.scss           # 开关样式
  │   │   ├─ slider.scss           # 滑块样式
  │   │   ├─ progress.scss         # 进度条样式
  │   │   ├─ avatar.scss           # 头像样式
  │   │   ├─ badge.scss            # 徽标样式
  │   │   ├─ alert.scss            # 警告框样式
  │   │   ├─ notification.scss     # 通知样式
  │   │   ├─ message.scss          # 全局提示样式
  │   │   ├─ drawer.scss           # 抽屉样式
  │   │   ├─ card.scss             # 卡片样式
  │   │   ├─ tabs.scss             # 标签页样式
  │   │   ├─ breadcrumb.scss       # 面包屑样式
  │   │   ├─ steps.scss            # 步骤条样式
  │   │   ├─ collapse.scss         # 折叠面板样式
  │   │   ├─ tree.scss             # 树形控件样式
  │   │   ├─ pagination.scss       # 分页样式
  │   │   ├─ table.scss            # 表格样式
  │   │   ├─ datepicker.scss       # 日期选择器样式
  │   │   ├─ timepicker.scss       # 时间选择器样式
  │   │   ├─ upload.scss           # 上传样式
  │   │   ├─ carousel.scss         # 走马灯样式
  │   │   ├─ skeleton.scss         # 骨架屏样式
  │   │   ├─ backtop.scss          # 回到顶部样式
  │   │   ├─ affix.scss            # 固钉样式
  │   │   ├─ anchor.scss           # 锚点样式
  │   │   ├─ tooltip.scss          # 提示框样式
  │   │   ├─ popover.scss          # 弹出框样式
  │   │   ├─ modal.scss            # 模态框样式
  │   │   ├─ menu.scss             # 菜单样式
  │   │   └─ component.scss        # 组件样式入口
  │   ├─ layouts/                  # 布局样式目录
  │   │   ├─ header.scss           # 头部样式
  │   │   ├─ footer.scss           # 底部样式
  │   │   ├─ main.scss             # 主体样式
  │   │   ├─ grid.scss             # 网格布局样式
  │   │   └─ layout.scss           # 布局样式入口
  │   ├─ pages/                    # 页面样式目录
  │   │   ├─ home.scss             # 首页样式
  │   │   ├─ about.scss            # 关于页样式
  │   │   ├─ contact.scss          # 联系页样式
  │   │   ├─ error.scss            # 错误页样式
  │   │   └─ page.scss             # 页面样式入口
  │   ├─ utilities/                # 工具样式目录
  │   │   ├─ display.scss          # 显示样式
  │   │   ├─ position.scss         # 定位样式
  │   │   ├─ flex.scss             # 弹性盒子样式
  │   │   ├─ text.scss             # 文本样式
  │   │   ├─ background.scss       # 背景样式
  │   │   ├─ border.scss           # 边框样式
  │   │   ├─ size.scss             # 尺寸样式
  │   │   ├─ spacing.scss          # 间距样式
  │   │   ├─ shadow.scss           # 阴影样式
  │   │   ├─ animation.scss        # 动画样式
  │   │   └─ utility.scss          # 工具样式入口
  │   ├─ vendors/                  # 第三方样式目录
  │   │   ├─ normalize.scss        # 重置样式库
  │   │   ├─ bootstrap.scss        # Bootstrap样式库
  │   │   ├─ animate.scss          # Animate样式库
  │   │   └─ vendor.scss           # 第三方样式入口
  │   └─ style.scss                # 全局样式出口
  ├─ router/                       # 路由目录
  │   ├─ index.ts                  # 路由入口
  │   ├─ routes.ts                 # 路由配置
  │   ├─ guards.ts                 # 路由守卫
  │   ├─ interceptors.ts           # 路由拦截器
  │   ├─ modules/                  # 路由模块目录
  │   │   ├─ home.ts               # 首页路由模块
  │   │   ├─ about.ts              # 关于页路由模块
  │   │   ├─ contact.ts            # 联系页路由模块
  │   │   ├─ error.ts              # 错误页路由模块
  │   │   ├─ editor.ts             # 编辑器路由模块
  │   │   ├─ preview.ts            # 预览路由模块
  │   │   ├─ settings.ts           # 设置路由模块
  │   │   ├─ profile.ts            # 个人资料路由模块
  │   │   ├─ auth.ts               # 认证路由模块
  │   │   └─ help.ts               # 帮助路由模块
  │   ├─ utils.ts                  # 路由工具函数
  │   ├─ constants.ts              # 路由常量
  │   ├─ types.ts                  # 路由类型定义
  │   └─ config.ts                 # 路由配置选项
  ├─ store/                        # 状态管理目录
  │   ├─ index.ts                  # 状态管理入口
  │   ├─ modules/                  # 状态模块目录
  │   │   ├─ editor.ts             # 编辑器状态模块
  │   │   ├─ markdown.ts           # Markdown状态模块
  │   │   ├─ plugin.ts             # 插件状态模块
  │   │   ├─ theme.ts              # 主题状态模块
  │   │   ├─ i18n.ts               # 国际化状态模块
  │   │   ├─ file.ts               # 文件状态模块
  │   │   ├─ history.ts            # 历史记录状态模块
  │   │   ├─ outline.ts            # 大纲状态模块
  │   │   ├─ scroll.ts             # 滚动状态模块
  │   │   ├─ selection.ts          # 选区状态模块
  │   │   ├─ cursor.ts             # 光标状态模块
  │   │   ├─ shortcut.ts           # 快捷键状态模块
  │   │   ├─ toolbar.ts            # 工具栏状态模块
  │   │   ├─ statusbar.ts          # 状态栏状态模块
  │   │   ├─ preview.ts            # 预览状态模块
  │   │   ├─ export.ts             # 导出状态模块
  │   │   └─ import.ts             # 导入状态模块
  │   ├─ plugins/                  # 状态插件目录
  │   │   ├─ logger.ts             # 日志插件
  │   │   ├─ persist.ts            # 持久化插件
  │   │   ├─ undo.ts               # 撤销重做插件
  │   │   ├─ history.ts            # 历史记录插件
  │   │   ├─ selection.ts          # 选区插件
  │   │   ├─ cursor.ts             # 光标插件
  │   │   ├─ scroll.ts             # 滚动插件
  │   │   ├─ shortcut.ts           # 快捷键插件
  │   │   ├─ toolbar.ts            # 工具栏插件
  │   │   ├─ statusbar.ts          # 状态栏插件
  │   │   ├─ preview.ts            # 预览插件
  │   │   ├─ export.ts             # 导出插件
  │   │   └─ import.ts             # 导入插件
  │   ├─ getters.ts                # 状态获取器
  │   ├─ actions.ts                # 状态操作
  │   ├─ mutations.ts              # 状态变更
  │   └─ types.ts                  # 状态类型定义
  ├─ utils/                        # 工具函数目录
  │   ├─ index.ts                  # 工具函数入口
  │   ├─ dom.ts                    # DOM操作工具函数
  │   ├─ event.ts                  # 事件处理工具函数
  │   ├─ format.ts                 # 格式化工具函数
  │   ├─ http.ts                   # HTTP请求工具函数
  │   ├─ storage.ts                # 本地存储工具函数
  │   ├─ validate.ts               # 数据验证工具函数
  │   ├─ file.ts                   # 文件处理工具函数
  │   ├─ markdown.ts               # Markdown工具函数
  │   ├─ theme.ts                  # 主题工具函数
  │   ├─ shortcut.ts               # 快捷键工具函数
  │   ├─ editor.ts                 # 编辑器工具函数
  │   ├─ preview.ts                # 预览工具函数
  │   ├─ export.ts                 # 导出工具函数
  │   └─ import.ts                 # 导入工具函数
  ├─ assets/                       # 静态资源目录
  │   ├─ images/                   # 图片资源目录
  │   │   ├─ logo.png              # Logo图片
  │   │   ├─ background.jpg        # 背景图片
  │   │   ├─ icon-bold.svg         # 加粗图标
  │   │   ├─ icon-italic.svg       # 斜体图标
  │   │   ├─ icon-underline.svg    # 下划线图标
  │   │   ├─ icon-strikethrough.svg# 删除线图标
  │   │   ├─ icon-quote.svg        # 引用图标
  │   │   ├─ icon-ul.svg           # 无序列表图标
  │   │   ├─ icon-ol.svg           # 有序列表图标
  │   │   ├─ icon-link.svg         # 链接图标
  │   │   ├─ icon-image.svg        # 图片图标
  │   │   ├─ icon-code.svg         # 代码图标
  │   │   ├─ icon-table.svg        # 表格图标
  │   │   ├─ icon-hr.svg           # 分隔线图标
  │   │   ├─ icon-undo.svg         # 撤销图标
  │   │   ├─ icon-redo.svg         # 重做图标
  │   │   ├─ icon-clear.svg        # 清除图标
  │   │   ├─ icon-save.svg         # 保存图标
  │   │   ├─ icon-preview.svg      # 预览图标
  │   │   ├─ icon-expand.svg       # 展开图标
  │   │   ├─ icon-collapse.svg     # 折叠图标
  │   │   ├─ icon-theme.svg        # 主题图标
  │   │   ├─ icon-lang.svg         # 语言图标
  │   │   └─ icon-about.svg        # 关于图标
  │   ├─ fonts/                    # 字体资源目录
  │   │   ├─ iconfont.ttf          # 图标字体
  │   │   ├─ sourcecodepro.ttf     # 代码字体
  │   │   └─ robotoslab.ttf        # 正文字体
  │   ├─ videos/                   # 视频资源目录
  │   ├─ audios/                   # 音频资源目录
  │   └─ examples/                 # 示例文件目录
  │       ├─ welcome.md            # 欢迎文档
  │       ├─ guide.md              # 使用指南
  │       └─ sample.md             # 示例文档
  ├─ locales/                      # 国际化语言包目录
  │   ├─ en-US.json                # 英文语言包
  │   └─ zh-CN.json                # 中文语言包
  ├─ tests/                        # 测试目录
  │   ├─ unit/                     # 单元测试目录
  │   │   ├─ editor.spec.ts        # 编辑器单元测试
  │   │   ├─ markdown.spec.ts      # Markdown单元测试
  │   │   ├─ toolbar.spec.ts       # 工具栏单元测试
  │   │   ├─ preview.spec.ts       # 预览单元测试
  │   │   ├─ theme.spec.ts         # 主题单元测试
  │   │   ├─ plugin.spec.ts        # 插件单元测试
  │   │   ├─ file.spec.ts          # 文件单元测试
  │   │   ├─ image.spec.ts         # 图片单元测试
  │   │   ├─ history.spec.ts       # 历史记录单元测试
  │   │   ├─ shortcut.spec.ts      # 快捷键单元测试
  │   │   ├─ export.spec.ts        # 导出单元测试
  │   │   └─ import.spec.ts        # 导入单元测试
  │   ├─ e2e/                      # 端到端测试目录
  │   │   ├─ home.spec.ts          # 首页端到端测试
  │   │   ├─ editor.spec.ts        # 编辑器端到端测试
  │   │   ├─ toolbar.spec.ts       # 工具栏端到端测试
  │   │   ├─ preview.spec.ts       # 预览端到端测试
  │   │   ├─ theme.spec.ts         # 主题端到端测试
  │   │   ├─ plugin.spec.ts        # 插件端到端测试
  │   │   ├─ file.spec.ts          # 文件端到端测试
  │   │   ├─ image.spec.ts         # 图片端到端测试
  │   │   ├─ history.spec.ts       # 历史记录端到端测试
  │   │   ├─ shortcut.spec.ts      # 快捷键端到端测试
  │   │   ├─ export.spec.ts        # 导出端到端测试
  │   │   └─ import.spec.ts        # 导入端到端测试
  │   └─ coverage/                 # 测试覆盖率报告目录
  │       ├─ index.html            # 覆盖率报告首页
  │       └─ lcov-report/          # 覆盖率详细报告
  ├─ public/                       # 公共静态资源目录
  │   ├─ index.html                # 应用入口HTML
  │   ├─ favicon.ico               # 网站图标
  │   ├─ robots.txt                # 爬虫规则文件
  │   ├─ manifest.json             # PWA清单文件
  │   └─ service-worker.js         # PWA Service Worker
  ├─ docs/                         # 文档目录
  │   ├─ README.md                 # 文档说明
  │   ├─ CHANGELOG.md              # 更新日志
  │   ├─ CONTRIBUTING.md           # 贡献指南
  │   ├─ CODE_OF_CONDUCT.md        # 行为准则
  │   ├─ CODING_STYLE.md           # 编码规范
  │   ├─ API.md                    # API文档
  │   └─ FAQ.md                    # 常见问题解答
  ├─ scripts/                      # 脚本目录
  │   ├─ build.js                  # 构建脚本
  │   ├─ deploy.js                 # 部署脚本
  │   ├─ start.js                  # 启动脚本
  │   ├─ test.js                   # 测试脚本
  │   ├─ lint.js                   # 代码检查脚本
  │   ├─ format.js                 # 代码格式化脚本
  │   ├─ commit.js                 # 提交脚本
  │   ├─ release.js                # 发布脚本
  │   └─ version.js                # 版本管理脚本  
  ├─ types/                        # 类型定义目录
  │   ├─ editor.d.ts               # 编辑器类型定义
  │   ├─ markdown.d.ts             # Markdown类型定义
  │   ├─ plugin.d.ts               # 插件类型定义
  │   ├─ toolbar.d.ts              # 工具栏类型定义
  │   ├─ preview.d.ts              # 预览类型定义
  │   ├─ theme.d.ts                # 主题类型定义
  │   ├─ file.d.ts                 # 文件类型定义
  │   ├─ image.d.ts                # 图片类型定义
  │   ├─ history.d.ts              # 历史记录类型定义
  │   ├─ shortcut.d.ts             # 快捷键类型定义
  │   ├─ export.d.ts               # 导出类型定义
  │   └─ import.d.ts               # 导入类型定义
  ├─ .editorconfig                 # 编辑器配置文件
  ├─ .gitignore                    # Git忽略文件
  ├─ .eslintrc.js                  # ESLint配置文件
  ├─ .prettierrc.js                # Prettier配置文件
  ├─ babel.config.js               # Babel配置文件
  ├─ tsconfig.json                 # TypeScript配置文件
  ├─ jest.config.js                # Jest配置文件
  ├─ cypress.json                  # Cypress配置文件
  ├─ LICENSE                       # 开源许可证
  ├─ package.json                  # 项目元数据和依赖配置
  └─ README.md                     # 项目说明文档
