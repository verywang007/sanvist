# 表格页验收清单

逐条对照 `references/table-page-spec.md` 与 `../../b-data-list-design-spec-v2/references/tokens.md`。
验收基准宽度 **1440px**，再复查 1280px。每条均可用取色器 / 开发者工具客观判定。

---

## 一、外壳

- [ ] 顶栏 `.sany-header` 高度 **48px**，底色 **`#172742`**，字色 `#fff`，字号 12px。
- [ ] Logo 区 `.sany-header-logo` 的 `margin-left:20px`、`min-width:200px`；标记 20×20；标题 `.sany-header-title` 16px / 500。
- [ ] 折叠触发 `.sany-collapse-trigger` 图标 18px、`margin-left:9px`。
- [ ] 顶栏右区 `.sany-header-right` 的 `padding-right:16px`，`.sany-header-item` 间距 `margin-right:12px`。
- [ ] 侧栏 `.sany-nav` 宽 **220px**，底色 **`#1e3255`**，`transition:width .2s linear`。
- [ ] 菜单项 `.sany-menu-item` 高 44px、`padding:0 20px`、字色 `rgba(255,255,255,.75)`。
- [ ] 选中菜单项 `.sany-menu-item.is-active` 为 `linear-gradient(90deg,#1e3255 0%,#29bece 100%)` + 左侧 5px `#29bece` 实条 + 字色 `#fff`。
- [ ] 多页签栏 `.s-tabs` 总高 **36px**，底白、下边线 `1px solid #e8e8e8`；`.s-tab` 高 32px、`margin:3px 2px 0 0`、底 `#e3e3e3`；`.s-tab.is-active` 底 `#f0f0f0` + 字 `#29bece`。
- [ ] 页面**没有**面包屑行（本系统用多页签栏 + 页头标题定位）。
- [ ] Shell DOM 带 `data-locked-shell="true"`，与模板逐字一致，仅替换了可见文字。
- [ ] `assets/shell/shell-lock.css` 已完整复制，且 `<link>` 位于所有页面样式**之后**。
- [ ] 页面样式中没有任何针对 `.sany-header*` / `.sany-nav*` / `.sany-menu*` / `.sany-collapse-trigger` / `.sany-app` 的覆盖规则。
- [ ] 未引用已废弃资源 `home.svg` / `settings.svg` / `bell.svg` / `avatar.svg` / `separator.svg`。

## 二、布局与节奏

- [ ] DOM 层级为 `.sany-app` → `.sany-header` + `.sany-body`（`.sany-nav` + `.sany-content`）→ `.s-tabs` + `.page-container`。
- [ ] 画布 `.page-container` 底色 **`#f4f5f7`**。
- [ ] 页头 `.page-head` 高 **48px**，底 `#fff`，下边线 `1px solid #e8e8e8`，`padding:0 16px`。
- [ ] 页头标题 `.page-head-title` 字号 **16px**、字色 `#000`、`line-height:48px`，页面有且仅有一个。
- [ ] 内容卡 `.page-content` 外边距 **`8px 16px 16px`**、内边距 **`16px`**、底色 `#fff`。
- [ ] 内容卡**无圆角、无阴影、无边框**。
- [ ] `.sany-app` / `.page-container` / `.page-content` 均未设固定 `width` 或 `max-width`。
- [ ] 区块顺序正确：页头 →（说明段）→（指标区）→（`.s-tabs-line`）→ `.s-query-bar` → `.s-toolbar` → `.s-table-wrap` → `.s-pagination`。
- [ ] 场景与内容匹配：无筛选条件时未渲染空的 `.s-query-bar`；未渲染任何场景切换器 / 结构选择器 / 演示控件。
- [ ] 页内分类 Tab 使用 `.s-tabs-line` / `.s-tab-line`（高 32px、项间距 24px、选中 2px 主色下划线），未误用顶部 `.s-tabs`。
- [ ] 指标区用 `.s-section-title` + `.s-desc`（3 列网格、label 80px 右对齐带冒号），数值仍为 12px 正文，无大号 KPI 数字、无卡片投影、无趋势涨跌色。
- [ ] 说明文案位于 `.page-content` 顶部，12px / `line-height:1.5` / `#333`，未做成带底色的提示条。

## 三、查询区

- [ ] `.s-query-bar` 内边距 `6px 0`。
- [ ] 查询区用 `table` + `<colgroup>` 布局，**不是** grid / flex 重写。
- [ ] label 单元格 `.s-form-label` 列宽 **80px**、**右对齐**、自动输出冒号 `：`。
- [ ] 字段列 `<col>` 不设宽度，`.s-form-cell` 内边距 `4px 12px 4px 0`；`.s-form td` 内边距 `4px 0`。
- [ ] 一行 **3–4 组** label + 字段，没有一行 5 组以上的情况。
- [ ] 默认折叠态**只显示第一行**；第二行起的 `<tr>` 带 `.s-query-row-overflow` 且实际 `display:none`（不是内容隐藏或保留空行高）。
- [ ] 折叠时下方 `.s-toolbar` 与表格同步上移；展开（`.s-query-bar.is-expanded`）后溢出行恢复 `table-row`，`.s-query-more` 图标旋转 180°，文案由「更多」变「收起」。
- [ ] 字段只有一行时**未渲染**「更多」按钮。
- [ ] 按钮区 `.s-query-actions` 整体**右对齐**，间距 8px，顺序固定为 **更多 → 重置 → 查询**。
- [ ] 仅「查询」为 `.s-btn-primary`，「更多」「重置」为 `.s-btn-default`。
- [ ] 查询区控件高度均为 **28px**，边框 `1px solid #d9d9d9`，圆角 2px，占位符 `#bfbfbf`。
- [ ] 日期 / 日期区间用 `.s-field-affix` + `.s-field-affix-icon`（14px，`#bfbfbf`，`pointer-events:none`），输入右内边距 26px。

## 四、工具栏与操作

- [ ] `.s-toolbar` 内边距 `6px 0`，两端分布；主操作在 `.s-toolbar-left`（靠左），辅助信息在 `.s-toolbar-right`。
- [ ] `.s-toolbar-left` 按钮 ≤ 4 个，最多 1 个 `.s-btn-primary`，间距 8px。
- [ ] `.s-toolbar-right` 未放置业务主操作。
- [ ] 页头操作区 `.page-head-operator` 在页头**右侧**，≤ 3 个按钮，次按钮在左、**主按钮最右**，间距 8px。
- [ ] 整页（页头 + 工具栏 + 查询区）`.s-btn-primary` 不超过 **2 个**。
- [ ] 行内操作全部为 `.s-btn-flat` 文字按钮（≤ 3 个，间距 8px），**无实心按钮**；危险项带 `.is-danger` 且排在最后。
- [ ] 按钮尺寸：默认 `.s-btn` **28px** / `padding:0 12px` / 12px 字；`.s-btn-sm` 24px；`.s-btn-lg` 40px；`.s-btn-icon` 28px 见方。
- [ ] 按钮圆角一律 **2px**；`:focus` 无 `box-shadow`、无 `outline`。
- [ ] 主按钮 `#29bece` → hover `#1995a8` → disabled `#79e4e8`；次按钮边框 `#e0e0e0` → hover 边框+字 `#29bece`；文字按钮字 `#29bece`。
- [ ] 无权限 / 不可执行的操作保留按钮并置 `disabled` + `.is-disabled`，未直接隐藏导致操作列错位。

## 五、表格

- [ ] 表格行高 **36px**（`th` / `td` 的 `height`）。
- [ ] 单元格内边距 **`0 10px`**；若整表使用 `.s-table.is-wrap` 折行模式，则为 **`5px 10px`**，且同页未混用两种模式。
- [ ] 表头 `.s-table thead th` 底色 **`rgba(0,0,0,.04)`**、字色 `rgba(0,0,0,.85)`、字重 **700**、`line-height:34px`。
- [ ] 单元格下边线 `1px solid #e0e0e0`；`.s-table` 上下边框 `1px solid #e0e0e0`。
- [ ] 表格字号 12px、字色 `#333`。
- [ ] 行 hover 底色 `rgba(0,0,0,.04)`；当前行 / 选中行（`tr.is-current` / `tr.is-selected`）底色 **`rgba(140,158,255,.12)`**。
- [ ] 首列为 `.s-col-check`（宽 **40px**、居中、`padding:0`），表头有全选框，每个数据行有行选择框。
- [ ] 复选框 14×14、边框 `#d9d9d9`、圆角 2px；选中 / 半选才用 `#29bece`；部分选中时表头进入 `indeterminate`（主色底 + 白色横杠）。
- [ ] 全选只作用于当前页可见行，选中后 `.s-toolbar-right` 计数更新且批量按钮解禁。
- [ ] 仅已实现排序的列有 `.s-sort`；选择列与操作列无排序标记；升序 `.s-sort.is-asc` 上三角主色、降序 `.s-sort.is-desc` 下三角主色、默认双三角 `#bfbfbf`。
- [ ] 用 `<colgroup>` 显式声明列宽，主文本列留空吸收剩余宽度；最小列宽不低于 50px；总列数 ≤ 10。
- [ ] 数值列 `.s-col-num` 右对齐且 `tabular-nums`；状态列 `.s-col-center` 居中；操作列 `.s-col-action` 固定为**最后一列**、左对齐；表头与数据列对齐方式一致。
- [ ] 超长文本单元格截断为省略号并带原生 `title`；未使用自建 tooltip 组件。
- [ ] 空值统一显示 `-`，未出现空白或 `null`。
- [ ] 空状态用 `.s-empty` + `.s-empty-icon`（`padding:48px 0`、字 `#bfbfbf`、图标 40px `#e0e0e0`），筛选后为空时附带 `.s-btn-flat` 的「重置筛选」。
- [ ] 加载态用 `.s-loading` + `.s-spin`（20×20，轨道 `#e0e0e0`、指示 `#29bece`、0.8s 匀速）；翻页 / 查询时保留表头与已有行，并把查询区、工具栏按钮置 `disabled`。
- [ ] 横向溢出由 `.s-table-wrap`（`overflow:auto`）承担，`.page-container` 无横向滚动条。

## 六、分页

- [ ] `.s-pagination` 整体**右对齐**，`margin-top:10px`，`line-height:30px`。
- [ ] 文案为 **「每页行数：」**（`.s-pagination-perpage`）与 **`1 - 20 / 45`**（`.s-pagination-info`），未写成「共 45 条」「Total」「10/页」。
- [ ] `.s-pagination-info` 左右 `margin:0 20px`。
- [ ] 每页条数下拉 `.s-pagination-size` 高 24px、`min-width:56px`、`margin-left:4px`。
- [ ] 翻页按钮 `.s-pagination-pager` 共 **4 个**（首页 / 上一页 / 下一页 / 末页），28×28，flat 无底无边，图标 16px，圆角 2px。
- [ ] **未**渲染 1 2 3 … 数字页码条。
- [ ] 可用态 hover 字色 `#29bece` + 底 `rgba(0,0,0,.04)`；disabled 字色 `#bfbfbf` + `not-allowed` + 无 hover。
- [ ] 首页时「首页 / 上一页」为 `disabled`；末页时「下一页 / 末页」为 `disabled`。

## 七、弹窗

- [ ] 遮罩 `.s-mask` 底色 **`rgba(0,0,0,.288)`**，`padding:80px 16px 40px`。
- [ ] 弹窗 `.s-modal` 宽 **520px**（确认类可用 `.s-modal-sm` 400px、宽表单 `.s-modal-lg` 800px），带 `max-width:100%`。
- [ ] 圆角 **2px**，阴影 `0 4px 12px rgba(0,0,0,.12)`。
- [ ] 头部 `.s-modal-header` 内边距 **`15px 24px`**，下边线 `1px solid #e0e0e0`。
- [ ] 标题 `.s-modal-title` **18px / 500**，字色 `rgba(0,0,0,.85)`，`line-height:24px`；关闭按钮 `.s-modal-close` 16px。
- [ ] 主体 `.s-modal-body` 内边距 **`24px`**，字号 12px。
- [ ] 底部 `.s-modal-footer` 内边距 **`12px 24px`**、**右对齐**、按钮间距 8px、上边线 `1px solid #e0e0e0`。
- [ ] 底部按钮顺序：取消 `.s-btn-default` 在左，**主按钮在最右**。
- [ ] 弹窗内表单沿用 `.s-form` + `colgroup`，label 列 80px 右对齐带冒号。
- [ ] Esc 可关闭、点击遮罩空白可关闭（有未保存输入时改为提示）、焦点在弹窗内循环、关闭后焦点回到触发按钮、背景不滚动。
- [ ] 提交中主按钮 `disabled`（底 `#79e4e8`）且文案改「提交中」，取消按钮保持可用。
- [ ] 危险操作有 `.s-modal-sm` 二次确认，确认按钮为 `.s-btn-danger`，文案写明具体动作与影响范围。
- [ ] 详情字段 > 10 或需并排看列表时改用 `.s-drawer`（640px），打开时对应行加 `.is-current`。

## 八、表单控件

- [ ] `.s-input` / `.s-select` / `.s-textarea` 高 **28px**（文本域 `min-height:60px`），内边距 `1px 10px`（文本域 `4px 10px`）。
- [ ] 边框 `1px solid #d9d9d9`，圆角 **2px**，底 `#fff`，字 `#333`，占位符 `#bfbfbf`。
- [ ] hover 边框 `#4fd2db`；focus 边框 `#a6f5f5` 且**无 box-shadow**。
- [ ] disabled 底 `#f5f5f5`、字 `#bfbfbf`、`not-allowed`。
- [ ] `.s-select` 为原生 `select` + `padding-right:24px` + 自绘 16px 箭头，未自建浮层 listbox。
- [ ] 必填用 `.is-required`（底色 **`#feffe6`**），**未使用红星号**；`.s-form-label.is-required` 仍只输出冒号。
- [ ] 校验失败用 `.is-invalid`（字 + 边框 `#d50000`）并在其下输出 `.s-msg-error`（12px，`margin-top:2px`）。
- [ ] 复选框 / 单选用 `.s-check`（盒子 14×14，与文字间距 6px，单选 `border-radius:50%`）；开关用 `.s-switch`（轨道 36×18，滑块 14×14）。
- [ ] 校验时机：输入中不报错，blur 校验，输入变化即清错，提交时全量校验并聚焦第一个失败字段。

## 九、状态与反馈

- [ ] 状态表达只用 `#29bece` / `#bfbfbf` / `#d50000` 三档：`.s-status.is-on` / `.s-status.is-off` / `.s-status.is-error`，圆点 `.s-status-dot` 6×6。
- [ ] 分类 / 属性标记用 `.s-tag`（高 22px、`padding:0 8px`、圆角 2px、主色实心）或 `.s-tag-outline` / `.s-tag-danger`；同一列未混用圆点与 Tag。
- [ ] 轻反馈用 `.s-message` + `.s-message-item`，`.is-success` 图标为**主色**（非绿色），`.is-error` 为 `#d50000`；约 2s 自动消失，文案 ≤ 20 字，同类不叠加。
- [ ] 异步长任务（导出 / 批量）用 `.s-notice`（右上角、320px、`padding:16px 24px`）告知已提交及查看位置。
- [ ] 每个可交互控件都有 hover / active / focus-visible / disabled 四态；focus 只改边框色，未加发光圈。
- [ ] 过渡时长：按钮 `.2s`、单元格底色 `.3s`、侧栏宽度 `.2s linear`、转圈 `.8s`，未自定其他时长。
- [ ] 侧栏折叠：根节点加 `.is-collapsed` → `.sany-nav` 变 **60px**，`.sany-nav-search` / `.sany-menu-item-title` / `.sany-menu-group-title` 隐藏，菜单图标居中，内容区自动补宽。
- [ ] 1280px 下无重叠、无截断、操作区未错位；查询区可由 3 组降为 2 组，label 列仍 80px；表格行高仍 36px。

## 十、禁止项

- [ ] 未出现 **`#255CE9`** 或任何其他蓝色作主色；全站主色唯一为 `#29bece`。
- [ ] 未出现 **`#F9FBFB`** 作画布（应为 `#f4f5f7`）。
- [ ] 未出现 **`#F3F6F8`** 作表头底（应为 `rgba(0,0,0,.04)`）。
- [ ] 未出现 **56px 顶栏**、**240px 侧栏**、浅色导航壳。
- [ ] 未出现 **14px 基准字号**；正文 / 表格 / 表单 / 按钮均为 12px。
- [ ] 未出现 **36px / 40px 的常规控件高度**；控件统一 28px（`.s-btn-lg` 的 40px 仅限特定大号按钮）。
- [ ] 未出现 **48px 表格行高**；行高为 36px。
- [ ] 未出现 **大于 2px 的圆角**（6px / 8px / 10px / 12px 一律禁止）。
- [ ] **内容卡未加任何 box-shadow**；阴影只允许出现在 `.s-modal` / `.s-drawer`（`0 4px 12px rgba(0,0,0,.12)`）与 `.s-message-item` / `.s-notice`（`0 4px 12px rgba(0,0,0,.15)`）。
- [ ] 未引入 tokens.md 中不存在的语义色：**无 success 绿、无 warning 橙、无 info 蓝**。
- [ ] 未用红星号表示必填（应为 `#feffe6` 底色）。
- [ ] 未渲染面包屑行。
- [ ] 未渲染数字页码条、未改写分页文案。
- [ ] 未使用 Emoji、文字字形（`⌃` `⌄` `×` `▲`）、图标字体近似或第三方图标库替代内联 SVG（`.s-ico`）。
- [ ] 未直接套用 Ant Design / Element / Tailwind / choerodon-ui 原厂默认视觉（原厂主色 `#3f51b5` 等）。
- [ ] 未引入渐变（除锁定 Shell 内的菜单选中态）、装饰色、背景图案。
- [ ] 未渲染场景切换器 / 结构选择器 / 演示控件。
- [ ] 未把 Shell 样式暴露为 props、主题变量、utility class 或任何可配置入口。

---

## 阻断性缺陷

出现以下任意一项即判定**不通过**，必须返工后重新验收，不接受「后续迭代修复」：

- [ ] 主色不是 `#29bece`，或页面中存在 `#255CE9` 等旧主色。
- [ ] 导航壳被改成浅色，或顶栏 ≠ 48px / `#172742`、侧栏 ≠ 220px / `#1e3255`。
- [ ] `shell-lock.css` 缺失、未在页面样式之后加载，或 Shell 样式被页面 CSS 覆盖。
- [ ] Shell 的 DOM 结构、class 名、尺寸、间距、图标被改动（超出「仅替换可见文字」的范围）。
- [ ] 基准字号被提到 14px，或表格行高被提到 48px，或控件高度被提到 32px 以上。
- [ ] 内容卡出现圆角（> 2px）或投影。
- [ ] 内容卡外边距 / 内边距不是 `8px 16px 16px` / `16px`。
- [ ] 表头底色被换成实色灰（非 `rgba(0,0,0,.04)`）。
- [ ] 查询区未用 `table` + `colgroup`，或 label 列宽 ≠ 80px / 未右对齐带冒号。
- [ ] 查询按钮顺序不是「更多 → 重置 → 查询」，或未整体右对齐，或查询不是主按钮。
- [ ] 默认展开了全部查询行（未折叠溢出行）。
- [ ] 分页未右对齐，或文案不是「每页行数：」与 `1 - 20 / 45`，或渲染了数字页码条。
- [ ] 弹窗宽度 ≠ 520px（且非 400 / 800 的合法变体），或底部按钮未右对齐、主按钮不在最右。
- [ ] 遮罩不是 `rgba(0,0,0,.288)`。
- [ ] 引入了 success 绿 / warning 橙等 tokens.md 中不存在的语义色。
- [ ] 表格缺少首列复选框，或部分选中时表头未进入 indeterminate。
- [ ] 页面写死了固定宽度 / `max-width`，导致内容区不随视口伸缩。
- [ ] 生产页面中出现了场景切换器或演示控件。
