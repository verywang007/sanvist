# 业务场景适配规则

本文件只定义"什么场景用什么结构"。具体尺寸与配色见 `references/tokens.md`，组件规格与 class 见 `references/components.md`。
文中出现的 class 均真实存在于 `assets/templates/assets/sany-ui.css`。

---

## 一、三种列表页场景

所有列表页共用同一套外壳：`.sany-app` → `.sany-header` + `.sany-nav` + `.sany-content` → `.s-tabs` → `.page-container` → `.page-head` → `.page-content`。
差异只发生在 `.page-content` 内部。

### 1.1 场景选择

| 场景 | 何时用 | 判据 |
|---|---|---|
| A 标准列表页 | 单一实体、一套查询条件、一张表 | 无需按状态/类型切分数据集 |
| B 带页签的分类列表页 | 同一实体按状态或类型分组，各组列相同或高度重合 | 分组数 2–6，且每组都需要独立计数/默认视图 |
| C 主从 + 详情抽屉 | 需要在不离开列表的前提下查看或处理单条记录 | 详情字段 > 10，或需要边看列表边处理 |

分组数 > 6 时不要用页签，改为查询区的"状态"下拉（场景 A）。

### 1.2 场景 A：标准列表页

区块顺序（自上而下，不可调换）：

1. `.page-head` — 标题 + 页面级操作
2. `.page-content` 内：
   1. `.s-query-bar` — 查询区
   2. `.s-toolbar` — 工具栏
   3. `.s-table-wrap` > `.s-table` — 表格
   4. `.s-pagination` — 分页

```html
<div class="page-head">
  <span class="page-head-title">租户审核</span>
  <div class="page-head-operator">
    <button class="s-btn s-btn-default">导入</button>
    <button class="s-btn s-btn-primary">新建租户</button>
  </div>
</div>
<div class="page-content-wrap">
  <div class="page-content">
    <div class="s-query-bar">…</div>
    <div class="s-toolbar">…</div>
    <div class="s-table-wrap"><table class="s-table">…</table></div>
    <nav class="s-pagination">…</nav>
  </div>
</div>
```

无查询条件时可省略 `.s-query-bar`，其余顺序不变。

### 1.3 场景 B：带页签的分类列表页

页签用内容区内嵌的下划线式 `.s-tabs-line`（**不是**顶部多页签导航 `.s-tabs`），置于 `.page-content` 最顶部、查询区之上。

区块顺序：

1. `.page-head`
2. `.page-content` 内：
   1. `.s-tabs-line` — 分类页签（含计数）
   2. `.s-query-bar`
   3. `.s-toolbar`
   4. `.s-table-wrap` > `.s-table`
   5. `.s-pagination`

```html
<div class="page-content">
  <div class="s-tabs-line">
    <button class="s-tab-line is-active">全部 45</button>
    <button class="s-tab-line">待审核 12</button>
    <button class="s-tab-line">已通过 28</button>
    <button class="s-tab-line">已驳回 5</button>
  </div>
  <div class="s-query-bar">…</div>
  <div class="s-toolbar">…</div>
  <div class="s-table-wrap"><table class="s-table">…</table></div>
  <nav class="s-pagination">…</nav>
</div>
```

规则：
- 切换页签时重置分页到第 1 页、清空行选择，**保留**查询条件。
- 页签文案带计数（如"待审核 12"），第一个固定为"全部"。
- 各页签列结构应一致；若某页签需要额外列，用同一张表按页签隐藏列，不要写两张表。
- 页签内不再嵌套第二层页签。

### 1.4 场景 C：主从 + 详情抽屉

左侧保持完整列表，点击行或行内"查看"从右侧滑出 `.s-drawer`（640px），列表不卸载、滚动位置不丢。

区块顺序：场景 A 的全部区块 + 页面末尾的抽屉节点。

```html
<!-- 列表部分同场景 A；行点击时给当前行加 is-current -->
<tr class="is-current">…
  <td class="s-col-action"><div class="s-row-actions">
    <button class="s-btn s-btn-flat">查看</button>
  </div></td>
</tr>

<!-- 抽屉：置于 .sany-app 之外 -->
<div class="s-mask" hidden style="padding:0;align-items:stretch;justify-content:flex-end">
  <div class="s-drawer" role="dialog" aria-modal="true">
    <div class="s-modal-header">
      <h4 class="s-modal-title">租户详情</h4>
      <button class="s-modal-close" data-close><svg class="s-ico"><use href="#i-close"/></svg></button>
    </div>
    <div class="s-modal-body">
      <div class="s-section-title">基本信息</div>
      <div class="s-desc">…</div>
      <div class="s-section-title">授权账号</div>
      <div class="s-table-wrap"><table class="s-table">…</table></div>
    </div>
    <div class="s-modal-footer">
      <button class="s-btn s-btn-default" data-close>关闭</button>
      <button class="s-btn s-btn-primary">去审核</button>
    </div>
  </div>
</div>
```

规则：
- 抽屉打开时，对应行加 `.is-current`（底色 `rgba(140,158,255,.12)`），关闭时移除。
- 抽屉内只读字段用 `.s-desc`，分组用 `.s-section-title`，内嵌明细用 `.s-table`。
- 抽屉内操作完成后刷新列表当前页，不关闭抽屉的场景需在抽屉内就地更新。

---

## 二、弹窗 vs 抽屉决策

| 判据 | 弹窗 `.s-modal`（520px） | 抽屉 `.s-drawer`（640px） |
|---|---|---|
| 字段数 | ≤ 8 个字段，单列或双列排布 | > 8 个字段，或含明细子表 |
| 是否需要并排看列表 | 不需要 | 需要（详情/审核时对照列表） |
| 是否多步 | 一步完成 | 多步 / 分组浏览（配合 `.s-section-title`） |
| 内容高度 | 一屏内可见，不滚动 | 内容可能超屏，主体自行滚动 |
| 典型用途 | 二次确认、审核意见、单条新建/编辑 | 详情查看、含子表的编辑、长表单预览 |

补充规则：
- 二次确认这类只有一句话的弹窗用 `.s-modal-sm`（400px）。
- 字段数超过 15 个、或需要上传/富文本的编辑，直接走**独立表单页**（`.page-content-stack` 多卡 + `.s-form-footer` 固定底栏），不要塞进抽屉。
- 需要在弹窗中再打开弹窗时，重新设计流程；最多允许一层（如详情抽屉内再开确认弹窗 `.s-modal-sm`）。
- 弹窗与抽屉共用 `.s-mask`、`.s-modal-header`、`.s-modal-body`、`.s-modal-footer`，视觉完全一致，只差宽度与定位。

---

## 三、表格列设计规则

### 3.1 列宽

用 `<colgroup>` 显式声明列宽，最后一列或主文本列留空（`<col />`）吸收剩余宽度。

| 列类型 | 建议宽度 | 说明 |
|---|---|---|
| 选择列 | 40px | `.s-col-check`，固定 |
| 编号 / 单号 | 140px | 定长字符串 |
| 日期时间 | 150px | `2026-01-27 00:05:35` 完整格式 |
| 日期 | 100px | 仅日期 |
| 手机号 / 证件号 | 120px | — |
| 姓名 / 短枚举 | 90–100px | — |
| 数值 | 100px | `.s-col-num` |
| 状态 | 90px | 圆点 + 二至四字 |
| 名称 / 地址等主文本 | 不设宽（`<col />`） | 吸收剩余空间 |
| 操作列 | 每个文字按钮约 44px + 间距 8px，2 个约 100–130px | `.s-col-action` |

硬下限：列最小宽 50px，未声明时默认 100px。总列数控制在 10 列以内；超过时把次要字段收进详情抽屉。

### 3.2 对齐

| 内容 | class | 对齐 |
|---|---|---|
| 文本 / 日期 / 编号 | 无 | 左对齐（默认） |
| 数值、金额、数量 | `.s-col-num` | **右对齐**，`tabular-nums` |
| 状态、图标、单选标记 | `.s-col-center` | 居中 |
| 选择框 | `.s-col-check` | 居中 |
| 操作 | `.s-col-action` | 左对齐（列本身固定在**最后一列**） |

表头对齐必须与数据列一致（把同样的 `.s-col-num` / `.s-col-center` 加到 `<th>` 上）。

### 3.3 超长省略

- 默认定高 36px 行，`.s-table` 已内置 `nowrap + ellipsis`；主文本列额外加 `.s-ellipsis` 以保证在任何容器下都截断。
- 被截断的单元格加原生 `title` 属性提供完整文本，不要用自定义 tooltip。
- 确需折行的表格（如备注列）整表加 `.s-table.is-wrap`，此时行高自适应、单元格内边距变为 `5px 10px`；同一页面不要混用两种模式。

### 3.4 固定列与横向滚动

- 横向滚动由 `.s-table-wrap`（`overflow:auto`）承担，不要让 `.page-content` 出现横向滚动条。
- 列数多导致横向滚动时：选择列固定在左，操作列固定在右；其余列不固定。
- 1440px 下若表格不需要滚动，则不做任何固定处理——固定列只在真的溢出时启用。

---

## 四、操作按钮布局规则

| 位置 | class | 放什么 | 数量与顺序 |
|---|---|---|---|
| 页头操作区 | `.page-head-operator` | 页面级、与列表筛选无关的操作（新建、导入、页面级导出） | ≤ 3 个；次按钮在左，**主按钮在最右**，间距 8px |
| 查询区按钮 | `.s-query-actions` | 查询相关 | 固定顺序 **更多 → 重置 → 查询**，只有"查询"是 `.s-btn-primary` |
| 工具栏左 | `.s-toolbar-left` | 与当前结果集相关的操作（导出当前结果、批量处理） | ≤ 4 个；最多 1 个 `.s-btn-primary`，其余 `.s-btn-default` |
| 工具栏右 | `.s-toolbar-right` | 辅助信息与视图控制（已选计数、列设置） | 不放业务主操作 |
| 行内操作 | `.s-row-actions` | 单条记录操作 | ≤ 3 个 `.s-btn-flat`，间距 8px；危险项加 `.is-danger` 且排在最后 |
| 弹窗底部 | `.s-modal-footer` | 取消 / 确定 | 右对齐；**取消在左、主按钮在最右**，间距 8px |
| 表单页底栏 | `.s-form-footer` | 取消 / 保存 | 右对齐，主按钮最右 |

优先级规则：
- 一个页面（含页头 + 工具栏）最多出现 **2 个** `.s-btn-primary`，通常是"查询"和一个业务主操作。
- 行内操作一律用文字按钮 `.s-btn-flat`，不要在行内出现实心按钮。
- 行内操作超过 3 个时，保留 2 个高频项 + 1 个"更多"（点开为下拉/弹窗菜单）。
- 无权限或当前状态不可执行的操作，保留按钮并置 `disabled` + `.is-disabled`，不要直接隐藏（隐藏会让不同行的操作列错位）。

---

## 五、状态表达规则

本系统**没有 success 绿 / warning 橙**语义色板，状态只能用主色 `#29bece`、中性 `#bfbfbf`、错误 `#d50000` 三档表达。

| 用法 | 选择 | 判据 |
|---|---|---|
| 状态圆点 `.s-status` | **默认选择** | 表示单条记录的唯一生命周期状态（启用/停用、待审核/已通过/已驳回），一行只出现一个 |
| Tag `.s-tag` | 例外选择 | 表示分类、属性、可多值标记（客户类型、所属业务线、标签），一个单元格可能出现多个 |

圆点语义映射：

| 业务含义 | class |
|---|---|
| 启用 / 进行中 / 待处理（需关注） | `.s-status.is-on`（`#29bece`） |
| 停用 / 已完成 / 已归档（中性收尾） | `.s-status.is-off`（`#bfbfbf`） |
| 驳回 / 失败 / 异常 | `.s-status.is-error`（`#d50000`） |

Tag 语义映射：

| 用途 | class |
|---|---|
| 主分类、强调标记 | `.s-tag`（主色实心） |
| 普通属性标记 | `.s-tag.s-tag-outline`（描边） |
| 风险标记（冻结、黑名单） | `.s-tag.s-tag-danger` |

禁止：
- 不要给"已通过"配绿色、给"待处理"配橙色——本系统无此配色。
- 不要在同一列里混用圆点和 Tag。
- 超过三种状态时，仍只用上述三色，靠**文字**区分具体含义。

---

## 六、空 / 加载 / 错误 / 无权限

| 态 | 结构 | 规则 |
|---|---|---|
| 空状态 | `.s-empty` + `.s-empty-icon` | 放在 `<tbody>` 位置或表格容器内，`padding:48px 0` 居中；文案区分"暂无数据"（从未有数据）与"没有找到符合条件的数据"（筛选后为空）；后者在文案下给一个 `.s-btn-flat` 的"重置筛选" |
| 加载态 | `.s-loading` + `.s-spin` | 首次加载替换表格主体；翻页 / 查询时保留表头与已有行，覆盖在表格区上；工具栏与查询区的按钮同时置 `disabled` |
| 按钮加载 | 主按钮置 `disabled` | 文案改为"提交中"，不加旋转图标以外的装饰 |
| 错误态 | `.s-empty` + `.s-btn-default` 重试 | 复用空状态容器，文案"加载失败，请重试"，下方给"重试"按钮；接口级错误同时用 `.s-message-item.is-error` 提示一次 |
| 无权限（整页） | `.page-content` 内 `.s-empty` | 文案"暂无访问权限，请联系管理员"，不显示查询区与表格 |
| 无权限（操作） | 按钮 `disabled` + `.is-disabled` | 保留按钮占位，`title` 说明原因；不要静默隐藏 |
| 无权限（字段） | `.s-desc-value` 显示脱敏值 | 如 `138****2891`，不要留空 |

空值统一显示 `-`（表格单元格与 `.s-desc-value` 同此规则），不要留空白或显示 `null`。

---

## 七、交互反馈规则

### 7.1 危险操作二次确认
删除、停用、批量驳回等不可逆操作，必须先弹 `.s-modal-sm`（400px）确认：

```html
<div class="s-mask" hidden>
  <div class="s-modal s-modal-sm" role="dialog" aria-modal="true">
    <div class="s-modal-header">
      <h4 class="s-modal-title">确认停用</h4>
      <button class="s-modal-close" data-close><svg class="s-ico"><use href="#i-close"/></svg></button>
    </div>
    <div class="s-modal-body">停用后该租户下 128 个账号将无法登录，是否继续？</div>
    <div class="s-modal-footer">
      <button class="s-btn s-btn-default" data-close>取消</button>
      <button class="s-btn s-btn-danger">确认停用</button>
    </div>
  </div>
</div>
```

- 确认按钮用 `.s-btn-danger`，文案写明具体动作（"确认停用"），不要只写"确定"。
- 正文必须写出影响范围（条数、关联对象）。
- 非破坏性操作（导出、刷新）不做二次确认。

### 7.2 提交后反馈

| 结果 | 反馈 |
|---|---|
| 成功 | 关闭弹窗/抽屉 → `.s-message-item.is-success`（约 2s 自动消失）→ 刷新列表当前页 |
| 失败（业务校验） | 弹窗不关闭，字段加 `.is-invalid` + `.s-msg-error` |
| 失败（接口） | 弹窗不关闭，主按钮恢复可用，`.s-message-item.is-error` 提示 |
| 异步长任务（导出、批量） | `.s-notice` 右上角通知，告知任务已提交及查看位置 |

message 文案不超过 20 字；同类消息不叠加，重复触发替换上一条。

### 7.3 表单校验时机

| 时机 | 行为 |
|---|---|
| 输入中 | 不校验、不报错（避免边输边红） |
| 失焦 blur | 校验当前字段，失败加 `.is-invalid` + `.s-msg-error` |
| 修正后 | 输入变化即移除 `.is-invalid` 与错误文案 |
| 提交时 | 全量校验，滚动定位到第一个失败字段并聚焦 |

必填字段在初始渲染时就带 `.is-required`（底色 `#feffe6`）作为预期提示，**不使用红星号**；`.is-required` 与 `.is-invalid` 可同时存在，此时边框与字色的 `#d50000` 覆盖生效。

---

## 八、响应式

| 规则 | 说明 |
|---|---|
| 验收基准 | **1440px**。所有间距、列宽、密度以此宽度为准做视觉验收 |
| 内容区 | 流式：`.sany-content` 占 `calc(100vw - 220px)`，`.page-content` 外边距恒为 `8px 16px 16px`、内边距恒为 16px，**不随断点变化** |
| 禁止写死 | 不得给 `.page-container`、`.page-content`、`.page-content-stack` 设固定宽度或 `max-width` |
| 侧栏折叠 | 根节点加 `is-collapsed` → `.sany-nav` 由 220px 变 **60px**，`transition:width .2s linear`；内容区自动补足宽度 |
| 折叠时隐藏 | `.sany-nav-search`、`.sany-menu-item-title`、`.sany-menu-group-title` 隐藏，`.sany-menu-item` 图标居中 |
| < 1280px | 建议默认折叠侧栏；查询区由 3 组字段/行降为 2 组（调整 `<colgroup>`），label 列仍为 80px |
| 表格 | 宽度不够时由 `.s-table-wrap` 横向滚动，不压缩列宽、不换行、不降低行高 |
| 弹窗 / 抽屉 | `.s-modal` 与 `.s-drawer` 均带 `max-width:100%`，窄屏自动收缩，宽度基准值不变 |
| 不做移动端 | 本规范只覆盖桌面后台；不提供 < 768px 的布局 |

---

## 九、场景落地自检

- [ ] 区块顺序：页头 → 查询区 → 工具栏 → 表格 → 分页（场景 B 在查询区前插 `.s-tabs-line`）
- [ ] 页面内 `.s-btn-primary` 不超过 2 个
- [ ] 查询按钮顺序：更多 → 重置 → 查询
- [ ] 弹窗底部主按钮在最右；页头操作区主按钮也在最右
- [ ] 行内操作全部为 `.s-btn-flat`，危险项 `.is-danger` 排最后
- [ ] 数值列 `.s-col-num` 右对齐，状态列居中，操作列在最后一列
- [ ] 状态只用 `#29bece` / `#bfbfbf` / `#d50000` 三色，无绿无橙
- [ ] 空 / 加载 / 错误 / 无权限四态均已定义，空值显示 `-`
- [ ] 危险操作有 `.s-modal-sm` 二次确认，确认按钮为 `.s-btn-danger`
- [ ] 必填用 `#feffe6` 底色，校验在 blur 与提交时触发
- [ ] 1440px 下无横向滚动条；内容区未写死宽度；侧栏可折叠至 60px
