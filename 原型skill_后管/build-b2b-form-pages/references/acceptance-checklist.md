# 表单页验收清单

对照 `references/form-page-spec.md` 与 `references/chrome-lock.md` 逐项核对。数值真源为 `b-data-list-design-spec-v2/references/tokens.md`，class 必须真实存在于 `assets/form-page-template/assets/sany-ui.css`。

---

## 外壳

- [ ] 动手做页面之前已读 `chrome-lock.md`。
- [ ] `.sany-header` 与 `.sany-nav` 都带 `data-locked-shell="true"`。
- [ ] `shell-lock.css` 在所有页面样式**之后**加载。
- [ ] 顶栏 `.sany-header` 高 48px、底色 `#172742`、字色 `#fff`。
- [ ] 顶栏左区顺序为 Logo 标记（20×20）→ 平台名（16px/500）→ 折叠按钮（18px，`margin-left:9px`）。
- [ ] `.sany-header-logo` 为 `margin-left:20px` + `min-width:200px`。
- [ ] 顶栏右区为站点 / 语言 / 消息 / 头像，`padding-right:16px`，项间距 12px。
- [ ] `.sany-header-divider` 为 1×16px `rgba(255,255,255,.2)`；`.sany-header-avatar` 为 24×24 圆形 `#29bece`；`.sany-header-notice-dot` 为 6×6 `#d50000`。
- [ ] 侧栏 `.sany-nav` 宽 220px、底色 `#1e3255`、`transition:width .2s linear`。
- [ ] `.sany-nav-search` 为 `padding:7px 12px`，输入框 28px、底色 `#425370`、focus 边框 `#29bece`。
- [ ] `.sany-menu-item` 高 44px、`padding:0 20px`、字色 `rgba(255,255,255,.75)`、`border-left:5px solid transparent`。
- [ ] 选中项 `.is-active` 为 5px 主色左条 + `linear-gradient(90deg,#1e3255 0%,#29bece 100%)` + 字色 `#fff`，且全局只有一个。
- [ ] 折叠态由 `.sany-app.is-collapsed` 驱动，侧栏 220px → 60px，搜索框与文字隐藏、图标居中。
- [ ] 外壳与原规格的差异仅限可见文字；DOM 层级、class、尺寸、颜色、状态均未改动。
- [ ] 所有图标为内联 SVG + `.s-ico`（`currentColor`），未使用 emoji、Unicode 字符、位图或图标字体。
- [ ] 未引用 `DEPRECATED.md` 中列出的旧版浅色外壳 SVG。

## 布局与节奏

- [ ] 页面结构为 顶栏 →（侧栏 | 内容区），内容区内为 `.s-tabs` → `.page-head` → `.page-container` → 内容卡。
- [ ] `.s-tabs` 总高 36px（3px + 32px + 1px 下边线）。
- [ ] `.page-head` 高 48px、白底、下边线 `1px solid #e8e8e8`、左右内边距 16px。
- [ ] 表单页页头用返回式标题 `.page-head-back`（16px 标题 + 16px 图标），页面级操作在 `.page-head-operator`（间距 8px）。
- [ ] 画布 `.page-container` 底色 `#f4f5f7`。
- [ ] 单卡页面用 `.page-content-wrap` + `.page-content`，外边距 `8px 16px 16px`、内边距 16px。
- [ ] 多分组页面用 `.page-content-stack` + `.sany-card`，容器 `padding:8px 16px 16px`、卡间 8px、单卡 `padding:16px`。
- [ ] 内容卡为纯白块：无圆角、无阴影、无边框。
- [ ] 内容列未写死像素宽度、未做居中固定列，随内容区弹性伸缩。
- [ ] 全局圆角一律 2px。
- [ ] 间距只用 4 / 6 / 8 / 10 / 12 / 16 / 20 / 24。

## 表单结构

- [ ] 表单用 `.s-form` + `table` + `<colgroup>` 横向布局，`table-layout:fixed`。
- [ ] label 在**左侧**，列宽 80px，右对齐，`.s-form-label` 自动输出冒号；未使用 label 在上的纵向布局作为默认形态。
- [ ] 一行放 2–3 组 label + 字段；同一张卡内每行组数一致。
- [ ] `<colgroup>` 与实际列数匹配：2 组 = 4 列，3 组 = 6 列。
- [ ] 整行字段用 `colspan` 跨到行尾（2 组布局 `colspan="3"`，3 组布局 `colspan="5"`）。
- [ ] 文本域、长文本、选项数 ≥ 3 的单选/复选组、内嵌明细表均为整行跨列。
- [ ] 一行凑不满组数时留空单元格，未把最后一个控件拉宽填满整行。
- [ ] `.s-form-cell` 保持 `4px 12px 4px 0`，`.s-form td` 保持 `4px 0`（字段行垂直间距 8px），未被覆写撑开。
- [ ] 字段顺序为 标识 → 名称 → 分类/状态 → 数值 → 日期 → 关联对象 → 长文本/备注（末位、整行）。
- [ ] 有依赖关系的字段相邻，被依赖者在前。

## 控件

- [ ] 输入型控件统一高 **28px**、字号 12px、圆角 2px、边框 `1px solid #d9d9d9`。
- [ ] `.s-input` 内边距 `1px 10px`；`.s-textarea` 为 `min-height:60px`、`padding:4px 10px`、`resize:vertical`。
- [ ] `.s-select` 使用自绘 16px 箭头，`padding-right:24px`。
- [ ] 日期等带后缀图标的字段用 `.s-field-affix` + `.s-field-affix-icon`（14px，`#bfbfbf`，`pointer-events:none`）。
- [ ] 复选框 / 单选 `.s-check` 盒子 14×14、与文字间距 6px；开关 `.s-switch` 轨道 36×18、滑块 14×14。
- [ ] 控件 hover 边框 `#4fd2db`、focus 边框 `#a6f5f5` 且**无 box-shadow / outline**。
- [ ] disabled 控件为底 `#f5f5f5`、字 `#bfbfbf`、`cursor:not-allowed`。
- [ ] 占位符为 `#bfbfbf`，文案为"请输入" / "请选择"。
- [ ] 只读展示值用 `.s-desc` 描述列表（label 80px 右对齐带冒号，空值显示 `-`），未用 disabled 控件冒充只读。

## 必填与校验

- [ ] 必填表现为控件淡黄底 `#feffe6`（`.is-required`），**未使用红星号**。
- [ ] `.s-form-label.is-required` 仍只输出冒号，未加星号或变色。
- [ ] 必填 + 禁用的控件底色回落为 `#f5f5f5`。
- [ ] 校验失败用 `.is-invalid`（字色 + 边框 `#d50000`）+ 控件下方 `.s-msg-error`（12px、`#d50000`、`margin-top:2px`）。
- [ ] 提交失败会滚动并聚焦到第一个 `.is-invalid` 字段；弹窗内校验失败不关闭弹窗。
- [ ] **`备注` 字段可选**：无 `.is-required`、无非空校验、空值可提交。
- [ ] 全局反馈用 `.s-message` + `.s-message-item.is-success` / `.is-error`，成功图标为 `#29bece` 而非绿色。

## 分组与标题

- [ ] 分组标题一律用 `.s-section-title`：高 32px、14px/700、`rgba(0,0,0,.85)`、左侧 3px 主色竖条、下边线 `#e0e0e0`、下间距 8px。
- [ ] 每张 `.sany-card` 最多一个 `.s-section-title`，卡片外未再加 margin。
- [ ] 标题文字为业务名词，未出现"表单区""模块一"之类占位词。
- [ ] 页面标题只在 `.page-head` 出现一次，未在内容卡内重复。
- [ ] 分组未嵌套到三级；确需分屏时改用 `.s-tabs-line` / `.s-tab-line`。
- [ ] 表格内嵌场景中，主表分组标题与明细分组标题左对齐于同一网格线。

## 操作栏与按钮

- [ ] 长表单底部操作栏用 `.s-form-footer`：高 **48px**、右对齐、`padding:0 16px`、上边线 `1px solid #e0e0e0`、按钮间距 8px。
- [ ] 操作栏位于滚动容器之外，不遮挡最后一个字段。
- [ ] 按钮顺序为 取消 → 次要操作 → 主操作（最右）。
- [ ] 每个操作组只有一个 `.s-btn-primary`。
- [ ] 按钮为默认 28px（`.s-btn`），操作栏未使用 `.s-btn-lg`。
- [ ] 主按钮配色 `#29bece` / hover `#1995a8` / disabled `#79e4e8`；次按钮 `.s-btn-default` 边框 `#e0e0e0`、hover 转主色。
- [ ] 破坏性操作用 `.s-btn-danger` 或 `.s-btn-flat.is-danger`，并有二次确认弹窗。
- [ ] 短表单（≤ 8 字段、无滚动）把主操作放进 `.page-head-operator`，未与 `.s-form-footer` 并存。
- [ ] 所有按钮、页签、锚点、行内操作、翻页都有可见的 hover / active / focus-visible 三态，且状态变化不引起布局位移。
- [ ] 按钮 focus 未自行添加发光圈或 outline。

## 状态与反馈

- [ ] 提交中主按钮置 `disabled`、文案改"提交中"，取消按钮仍可用。
- [ ] 加载用 `.s-loading` + `.s-spin`（20×20，轨道 `#e0e0e0`，指示色 `#29bece`）。
- [ ] 空明细用 `.s-empty` + `.s-empty-icon` 占位，未留空白。
- [ ] 状态展示用 `.s-status` 三档圆点（`.is-on` `#29bece` / `.is-off` `#bfbfbf` / `.is-error` `#d50000`）或 `.s-tag`，未引入绿 / 橙语义色。
- [ ] 内嵌明细表行高 36px、表头底色 `rgba(0,0,0,.04)` + 字重 700、选中行 `rgba(140,158,255,.12)`。
- [ ] 明细表工具栏按钮真正增删行；锚点真正滚动并更新激活态；分步按钮真正推进流程状态。
- [ ] 弹窗内表单为单列，宽 520px（`.s-modal`），正文 `padding:24px`，底部右对齐、主按钮最右；遮罩 `rgba(0,0,0,.288)`。
- [ ] 抽屉 `.s-drawer` 宽 640px、满高，复用 `.s-modal-header` / `.s-modal-body` / `.s-modal-footer`。
- [ ] 明细表过宽时由 `.s-table-wrap` 横向滚动，未压缩列宽或换行表头。
- [ ] Tab 顺序与视觉顺序一致；Esc 关闭最上层 `.s-mask`；Enter 在单行输入内不误提交。

## 禁止项

- [ ] 未出现 `#255CE9` 或任何其他蓝色主色；主色唯一 `#29bece`。
- [ ] 顶栏不是 56px、侧栏不是 240px，导航壳不是浅色。
- [ ] 基准字号不是 14px（是 12px）；控件高度不是 32px / 36px / 40px（是 28px）。
- [ ] 字段垂直节奏不是 32px（是 8px）；底部操作栏不是 64px（是 48px）。
- [ ] 无大于 2px 的圆角；内容卡无阴影、无渐变、无装饰色。
- [ ] 未用红星号表示必填。
- [ ] 未把 label 在上的纵向布局当作默认形态。
- [ ] 生产页面内无"规范场景"切换器、布局选择器或任何演示控件。
- [ ] 演示壳中的控件、开关、假数据未被带进可复用业务模板或后续页面。
- [ ] 未直接套用 Ant Design / Element / Tailwind 的默认视觉。
- [ ] 完成态未使用绿色对勾；未引入 success / warning / info 语义色板。
- [ ] 业务文案未被做成图片，全部为真实文本与可访问控件。
- [ ] 所有出现的 class 都能在 `sany-ui.css` 中检索到，未发明新 class 或新数值。

---

## 阻断性缺陷

出现以下任意一条，**直接判定交付失败**，不进入细节复核：

1. **外壳被改动**：顶栏不是 48px `#172742`、侧栏不是 220px `#1e3255`，或缺 `data-locked-shell="true"`，或 `shell-lock.css` 未最后加载。
2. **主色错误**：出现 `#255CE9` 或任何非 `#29bece` 的主色。
3. **表单布局形态错误**：未使用 `table` + `colgroup` 横向布局，或 label 不在左侧 80px 右对齐位。
4. **控件高度错误**：输入型控件不是 28px。
5. **基准字号错误**：正文 / label / 控件不是 12px。
6. **必填表达错误**：用红星号而非 `#feffe6` 淡黄底。
7. **底部操作栏错误**：高度不是 48px，或不是右对齐 / 主按钮不在最右。
8. **引用了不存在的 class 或凭空发明的数值 / 颜色**。
9. **生产页面里出现"规范场景"切换器、布局选择器或演示控件**。
10. **交互是假的**：明细表按钮不改数据、锚点不滚动、分步不推进状态。
11. **引用了已废弃的旧版浅色外壳 SVG**，或使用 emoji / Unicode 字符充当图标。
12. **`备注` 被设为必填或阻断提交**（无明确业务规则覆盖时）。
