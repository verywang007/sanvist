# MySANY 后台表格页规范

## 目录

1. 来源与适用范围
2. 外壳与布局
3. 场景选择
4. 查询区
5. 工具栏与操作按钮
6. 表格
7. 分页
8. 弹窗
9. 色彩与字体
10. 响应式与交互反馈
11. 锁定 Shell 规则

---

## 1. 来源与适用范围

本规范描述**三一 MySANY 后台管理平台**（`sany-me-api.sany.com.cn`）的真实界面语言。

技术栈事实：**HZERO 平台 + choerodon-ui pro**（`c7n-pro-*` 前缀），另有少量 `ant-*`（hzero-ui）遗留组件。

**数值来源**：线上产物 CSS 按页面真实加载顺序重建层叠、取最终生效声明，再与线上截图逐像素校验。
非估算，非套用 Ant Design / Element / choerodon-ui 原厂默认值（原厂主色 `#3f51b5` 已被覆盖为 `#29bece`）。

**唯一数值真源**：`../../b-data-list-design-spec-v2/references/tokens.md`。
本文件所有数值均来自该文件；本文件出现的每个 class 均真实存在于
`assets/table-page-template/assets/sany-ui.css`。二者冲突时以 tokens.md 为准，**不得自行发明数值或配色**。

**适用范围**：桌面端后台的列表页 / 表格页（纯表格、带查询、带页内 Tab 分类、带指标、带说明文案、含弹窗）。不覆盖移动端（< 768px）与前台营销页。

### 已作废（禁止出现）

旧版「可信数据空间 Figma 规范」已整体作废。以下为其数值，**只作反面对照，任何生成产物中不得出现**：

| 作废值 | 现行值 |
|---|---|
| 主色 `#255CE9` | `#29bece` |
| 画布 `#F9FBFB` | `#f4f5f7` |
| 表头 `#F3F6F8` | `rgba(0,0,0,.04)` |
| 顶栏 56px（浅色） | 48px，`#172742`（深色） |
| 侧栏 240px（浅色） | 220px，`#1e3255` |
| 基准字号 14px | **12px** |
| 控件高 36px / 40px | **28px** |
| 表格行高 48px | **36px** |
| 卡片圆角 8–10px + 阴影 | 圆角 0、**无阴影**（全局圆角仅 2px） |
| 面包屑 | 本系统**没有面包屑**，用多页签栏 `.s-tabs` + 页头 `.page-head` |

---

## 2. 外壳与布局

结构固定，自上而下、自外向内：

```
.sany-app
├── .sany-header                      顶栏 48px
└── .sany-body
    ├── .sany-nav                     侧栏 220px
    └── .sany-content
        ├── .s-tabs                   多页签栏 36px
        └── .page-container           画布 #f4f5f7
            ├── .page-head            页头 48px
            └── .page-content-wrap > .page-content   内容白卡
```

| 区域 | class | 规格 |
|---|---|---|
| 应用根 | `.sany-app` | `height:100vh;width:100vw`，纵向 flex，`overflow:hidden` |
| 顶栏 | `.sany-header` / `.sany-header-inner` | 高 **48px**，底色 **`#172742`**，字色 `#fff`，字号 12px |
| Logo 区 | `.sany-header-logo` / `.sany-header-logo-mark` / `.sany-header-title` | `margin-left:20px`，`min-width:200px`；标记 20×20；标题 16px/500 |
| 折叠触发 | `.sany-collapse-trigger` | 图标 18px，`margin-left:9px` |
| 顶栏右区 | `.sany-header-right` / `.sany-header-item` | `padding-right:16px`；项间距 `margin-right:12px` |
| 顶栏分隔 / 头像 / 红点 | `.sany-header-divider` / `.sany-header-avatar` / `.sany-header-notice-dot` | 1×16px `rgba(255,255,255,.2)` / 24×24 圆形主色 / 6×6 圆点 `#d50000` |
| 侧栏 | `.sany-nav` | 宽 **220px**，底色 **`#1e3255`**，`transition:width .2s linear` |
| 侧栏搜索 | `.sany-nav-search` / `.sany-nav-search-icon` | `padding:7px 12px`，输入 28px |
| 菜单项 | `.sany-menu-item` | 高 44px，`padding:0 20px`，字色 `rgba(255,255,255,.75)`，左侧 5px 透明边 |
| 菜单选中 | `.sany-menu-item.is-active` | `linear-gradient(90deg,#1e3255 0%,#29bece 100%)` + 5px 主色左条 + 字 `#fff` |
| 内容区 | `.sany-content` | `flex:1`，等价 `calc(100vw - 220px)`，**不得写死宽度** |
| 多页签栏 | `.s-tabs` / `.s-tab` / `.s-tab.is-active` / `.s-tab-close` | 条高 **36px**（3px 上间隙 + 32px 页签 + 1px 下边线），底白、下边线 `#e8e8e8`；页签 `margin:3px 2px 0 0`、`padding:0 12px`、底 `#e3e3e3`、字 `#4c4c4c`；选中底 `#f0f0f0` + 字 `#29bece` |
| 画布 | `.page-container` | 底色 **`#f4f5f7`**，纵向滚动 |
| 页头 | `.page-head` | 高 **48px**（`line-height:47px`），底 `#fff`，下边线 `1px solid #e8e8e8`，`padding:0 16px` |
| 页头标题 | `.page-head-title` | **16px**，字色 `#000`，`line-height:48px` |
| 页头操作区 | `.page-head-operator` | 右侧，按钮间距 8px |
| 返回式页头 | `.page-head-back` | 详情 / 表单页使用，16px + 16px 返回图标 |
| 内容卡 | `.page-content-wrap` > `.page-content` | **`margin:8px 16px 16px`；`padding:16px`**；底 `#fff`；**无圆角、无阴影** |
| 多卡堆叠 | `.page-content-stack` > `.sany-card` | `padding:8px 16px 16px`，卡间 8px，单卡 `padding:16px` |
| 贴边变体 | `.page-content-wrap-no-card` | 内容卡外边距归零 |

节奏铁律：**内容白卡距页头 8px、距左右各 16px、距底 16px，内边距 16px**。全站唯一节奏，不随断点变化。

**本系统没有面包屑**。页面定位靠多页签栏 `.s-tabs` 与页头标题 `.page-head-title` 表达，不要补画面包屑行。

---

## 3. 场景选择

所有场景共用第 2 节外壳，差异**只发生在 `.page-content` 内部**。按业务内容选**唯一**一种结构，不得渲染场景切换器 / 结构选择器 / 演示控件。

| 场景 | 何时用 | `.page-content` 内区块顺序 |
|---|---|---|
| A 纯表格 | 数据量小、无需筛选（字典、枚举、配置项） | `.s-toolbar` → `.s-table-wrap` → `.s-pagination` |
| B 带查询 | **默认场景**，存在 2 个以上检索维度 | `.s-query-bar` → `.s-toolbar` → `.s-table-wrap` → `.s-pagination` |
| C 带页内 Tab 分类 | 同一实体按状态 / 类型分组，列结构相同或高度重合，分组数 2–6 | `.s-tabs-line` → `.s-query-bar` → `.s-toolbar` → `.s-table-wrap` → `.s-pagination` |
| D 带指标 | 需要先看汇总再看明细 | 指标区 → `.s-query-bar` → `.s-toolbar` → `.s-table-wrap` → `.s-pagination` |
| E 带说明文案 | 需说明口径、范围、限制 | 说明段 → （可选指标区）→ `.s-query-bar` → … |
| F 带弹窗 | 新建 / 编辑 / 审核 / 二次确认需留在列表上下文 | 在 A–E 任一结构末尾追加 `.s-mask` > `.s-modal` 节点 |

补充规则：

- 无业务筛选条件时**不要**渲染空的 `.s-query-bar` 充门面。
- 分组数 > 6 时不用页内 Tab，改为查询区里的「状态」下拉（回落到场景 B）。
- 页内分类 Tab 用下划线式 `.s-tabs-line` / `.s-tab-line` / `.s-tab-line.is-active`（高 32px，项间距 24px，选中 2px 主色下划线），**不是**顶部多页签栏 `.s-tabs`，二者不可互换。切换 Tab 时重置分页到第 1 页、清空行选择、**保留**查询条件；Tab 文案带计数（如「待审核 12」），第一个固定为「全部」。
- **指标区**：本系统没有指标卡组件。用 `.s-section-title`（高 32px，14px/700，左侧 3px 主色竖条）作分组标题，下接 `.s-desc` 三列网格，每项 `.s-desc-item` > `.s-desc-label` + `.s-desc-value`，label 宽 80px 右对齐自动冒号。数值仍为 12px 正文字号。**禁止**大号 KPI 数字、圆角卡片、投影、绿 / 橙涨跌色、趋势箭头。
- **说明文案**：无专用 class，放在 `.page-content` 顶部的原生 `<p>` 中，继承 body 的 12px / `line-height:1.5` / `#333`，与下方区块间距 8px。不要做成带底色的提示条。
- 字段超过 15 个、或需上传 / 富文本的编辑，走独立表单页（`.page-content-stack` + `.s-form-footer`），不要塞进弹窗。
- 详情字段 > 10 个、或需边看列表边处理时，用 `.s-drawer`（640px）替代弹窗；打开时对应行加 `.is-current`。

---

## 4. 查询区

位于 `.page-content` 顶部（场景 C 中位于 `.s-tabs-line` 之下）。

### 4.1 结构：table + colgroup

label 与字段必须用 `table` + `<colgroup>` 严格对齐，**不要用 grid 或 flex 重写**——这是与线上系统对齐的唯一方式。

```html
<div class="s-query-bar" id="queryBar">
  <div class="s-form">
    <table>
      <colgroup>
        <col style="width:80px" /><col />
        <col style="width:80px" /><col />
        <col style="width:80px" /><col />
      </colgroup>
      <tbody>
        <tr>
          <td class="s-form-label">申请编号</td>
          <td class="s-form-cell"><input class="s-input" placeholder="请输入" /></td>
          <td class="s-form-label">审核状态</td>
          <td class="s-form-cell"><select class="s-select"><option>全部</option></select></td>
          <td class="s-form-label">申请时间</td>
          <td class="s-form-cell">
            <span class="s-field-affix">
              <input class="s-input" placeholder="请选择" readonly />
              <svg class="s-ico s-field-affix-icon"><use href="#i-date-range"/></svg>
            </span>
          </td>
        </tr>
        <tr class="s-query-row-overflow">
          <td class="s-form-label">企业名称</td>
          <td class="s-form-cell"><input class="s-input" placeholder="请输入" /></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="s-query-actions">
    <button class="s-btn s-btn-default s-query-more">更多 <svg class="s-ico"><use href="#i-expand-more"/></svg></button>
    <button class="s-btn s-btn-default">重置</button>
    <button class="s-btn s-btn-primary">查询</button>
  </div>
</div>
```

### 4.2 尺寸

| 项 | 值 | class |
|---|---|---|
| 区块内边距 | `6px 0` | `.s-query-bar` |
| label 列宽 | **80px**，**右对齐 + 自动冒号**（`::after` 输出 `：`） | `.s-form-label` |
| 字段列 | 宽度自适应，`<col>` 不设宽 | `.s-form-cell`（`padding:4px 12px 4px 0`） |
| 表单行内边距 | `4px 0` | `.s-form td` |
| 表格容器 | `width:100%`，`table-layout:fixed` | `.s-form` / `.s-form table` |
| 控件高度 | **28px** | `.s-input` / `.s-select` / `.s-textarea` |
| 按钮区 | 右侧固定，间距 8px，`padding-top:4px` | `.s-query-actions` |

一行放 **3–4 组**「label + 字段」。3 组是常规密度；字段普遍很短（状态、是否类）时可放 4 组。一行 5 组以上禁止。

### 4.3 折叠

- **默认只显示第一行**。第二行起的 `<tr>` 加 `.s-query-row-overflow`（`display:none`）。
- 展开：`.s-query-bar` 加 `.is-expanded` → 溢出行恢复 `display:table-row`，`.s-query-more` 内图标 `rotate(180deg)`，文案「更多」→「收起」。
- 只有一行字段时**省略**「更多」按钮，不要留一个永远无效的开关。
- 折叠必须真正移除行的布局占位（`display:none`），不得只隐藏内容或保留空行高度；折叠后下方 `.s-toolbar` / 表格必须同步上移。

### 4.4 按钮顺序（固定）

**更多 → 重置 → 查询**，整体**右对齐**，只有「查询」是 `.s-btn-primary`，其余 `.s-btn-default`。顺序不可颠倒，不可把查询放左边。

### 4.5 控件

统一用第 9 节字体与 tokens 中的控件规格：高 28px、`padding:1px 10px`、边框 `1px solid #d9d9d9`、圆角 2px、占位符 `#bfbfbf`、hover 边框 `#4fd2db`、focus 边框 `#a6f5f5` 且 **无 box-shadow**、disabled 底 `#f5f5f5`。

- 文本：`.s-input`
- 下拉：`.s-select`（原生 `select`，`padding-right:24px`，自绘 16px 箭头）
- 日期 / 日期区间：`.s-field-affix` 包裹 `.s-input`（`readonly`）+ `.s-field-affix-icon`（14px，`#bfbfbf`，`pointer-events:none`）
- 必填（编辑表单中）：`.is-required` → 底色 `#feffe6`，**不是红星号**

---

## 5. 工具栏与操作按钮

### 5.1 工具栏 `.s-toolbar`

位于查询区与表格之间，`padding:6px 0`，两端分布：

| 位置 | class | 放什么 |
|---|---|---|
| 左 | `.s-toolbar-left` | **主操作靠左**：新建、导出当前结果、批量处理。≤ 4 个，最多 1 个 `.s-btn-primary`，其余 `.s-btn-default`，间距 8px |
| 右 | `.s-toolbar-right` | 辅助信息与视图控制：已选计数（`.s-status`）、列设置。**不放业务主操作** |

```html
<div class="s-toolbar">
  <div class="s-toolbar-left">
    <button class="s-btn s-btn-primary">新建</button>
    <button class="s-btn s-btn-default" disabled>批量通过</button>
  </div>
  <div class="s-toolbar-right">
    <span class="s-status is-on"><i class="s-status-dot"></i>已选 3 项</span>
  </div>
</div>
```

### 5.2 各位置的按钮规则

| 位置 | class | 顺序与数量 |
|---|---|---|
| 页头操作区 | `.page-head-operator` | **在页头右侧**。页面级、与筛选无关的操作（新建、导入）。≤ 3 个，次按钮在左，**主按钮最右**，间距 8px |
| 查询区 | `.s-query-actions` | 固定 **更多 → 重置 → 查询**，右对齐 |
| 工具栏左 | `.s-toolbar-left` | 主操作靠左 |
| 行内操作 | `.s-row-actions` | **一律文字按钮 `.s-btn-flat`**，≤ 3 个，间距 8px；危险项加 `.is-danger` 且排最后 |
| 弹窗底部 | `.s-modal-footer` | 右对齐，取消在左、**主按钮最右**，间距 8px |
| 表单页底栏 | `.s-form-footer` | 高 48px，右对齐，`padding:0 16px`，上边线 `#e0e0e0` |

### 5.3 按钮规格

| 类型 | class | 默认 | hover / focus | disabled |
|---|---|---|---|---|
| 主 | `.s-btn-primary` | 底 `#29bece`，字 `#fff` | 底 `#1995a8` | 底 `#79e4e8`，`not-allowed` |
| 次 | `.s-btn-default` | 透明底，边框 `#e0e0e0`，字 `#333` | 边框 + 字 `#29bece` | 底 `#f5f5f5`，边框 `#d9d9d9`，字 `#bfbfbf` |
| 文字 | `.s-btn-flat` | 透明，字 `#29bece`，`padding:0 6px` | 字 `#1995a8`，底 `rgba(0,0,0,.04)` | 字 `#bfbfbf` |
| 文字·危险 | `.s-btn-flat.is-danger` | 字 `#d50000` | 底 `rgba(213,0,0,.06)` | 同上 |
| 危险实心 | `.s-btn-danger` | 底 `#d50000`，字 `#fff` | 底 `#b30000` | — |

尺寸：默认 `.s-btn` **28px**（`padding:0 12px`，12px 字）；`.s-btn-lg` 40px / 16px 字；`.s-btn-sm` 24px（`padding:1px 6px`）；`.s-btn-icon` 28px 见方。圆角一律 **2px**。按钮 **focus 不产生 box-shadow / outline**，不要自加发光圈。按钮组容器 `.s-btn-group`，间距 8px。

优先级：**一个页面（页头 + 工具栏）最多 2 个 `.s-btn-primary`**，通常是「查询」和一个业务主操作。无权限或当前状态不可执行的操作保留按钮并置 `disabled` + `.is-disabled`，不要隐藏（隐藏会让不同行的操作列错位）。

---

## 6. 表格

### 6.1 尺寸与配色

| 项 | 值 | class |
|---|---|---|
| 行高 | **36px** | `.s-table` 的 `th` / `td` |
| 单元格内边距 | **`0 10px`**（定高行）；折行模式 **`5px 10px`** | `.s-table` / `.s-table.is-wrap` |
| 表头底色 | **`rgba(0,0,0,.04)`**（与行 hover 同值，**不要换成实色灰**） | `.s-table thead th` |
| 表头字色 / 字重 | `rgba(0,0,0,.85)` / **700** | 同上 |
| 表头行内 line-height | 34px | 同上 |
| 单元格下边线 | `1px solid #e0e0e0` | `.s-table` 的 `th` / `td` |
| 表格上下边框 | `1px solid #e0e0e0` | `.s-table` |
| 字号 / 字色 | 12px / `#333` | `.s-table` |
| 行 hover | `rgba(0,0,0,.04)`，`transition .3s` | `.s-table tbody tr:hover>td` |
| 当前行 / 选中行 | **`rgba(140,158,255,.12)`** | `tr.is-current` / `tr.is-selected` |
| 横向滚动容器 | `overflow:auto` | `.s-table-wrap` |

### 6.2 复选框列

首列固定为选择列 `.s-col-check`（**宽 40px**，居中，`padding:0`）。表头放全选框，每个数据行放行选择框，均为 `.s-check` + 原生 `input[type=checkbox]`（14×14，边框 `#d9d9d9`，圆角 2px）。

| 状态 | 表现 |
|---|---|
| 未选中 | 白底，1px `#d9d9d9` 边框 |
| hover | 边框 `#29bece` |
| checked | 底 + 边框 `#29bece`，白色勾 |
| indeterminate | 底 `#29bece` + 白色横杠（部分选中时表头必须进入此态） |
| disabled | 底 `#f5f5f5`，边框 `#d9d9d9`，`not-allowed` |
| focus-visible | 边框 `#a6f5f5` |

全选只作用于**当前页可见行**；选中后在 `.s-toolbar-right` 更新计数，并解禁依赖选择的批量按钮。

### 6.3 排序

仅**真正实现了排序**的列在表头文案后加 `.s-sort`（`margin-left:4px`，CSS 三角），选择列与操作列**永不出现**排序标记。

| 状态 | class | 表现 |
|---|---|---|
| 默认 | `.s-sort` | 上下三角均 `#bfbfbf` |
| 升序 | `.s-sort.is-asc` | 上三角 `#29bece` |
| 降序 | `.s-sort.is-desc` | 下三角 `#29bece` |

### 6.4 列宽与对齐

用 `<colgroup>` 显式声明列宽，主文本列留空（`<col />`）吸收剩余宽度。硬下限：列最小宽 50px，未声明时默认 100px。总列数控制在 10 列以内。

| 列类型 | 建议宽度 | 对齐 / class |
|---|---|---|
| 选择列 | 40px | `.s-col-check`，居中 |
| 编号 / 单号 | 140px | 左对齐 |
| 日期时间 `2026-01-27 00:05:35` | 150px | 左对齐 |
| 仅日期 | 100px | 左对齐 |
| 手机号 / 证件号 | 120px | 左对齐 |
| 姓名 / 短枚举 | 90–100px | 左对齐 |
| 数值 / 金额 / 数量 | 100px | `.s-col-num`，**右对齐**，`tabular-nums` |
| 状态 | 90px | `.s-col-center`，居中 |
| 名称 / 地址等主文本 | 不设宽（`<col />`） | 左对齐，吸收剩余宽度 |
| 操作列（**固定最后一列**） | 2 个文字按钮约 100–130px | `.s-col-action`，左对齐 |

表头对齐必须与数据列一致：同样的 `.s-col-num` / `.s-col-center` 也要加到 `<th>` 上。

### 6.5 超长省略

- 默认定高 36px 行，`.s-table` 已内置 `white-space:nowrap` + `text-overflow:ellipsis`；主文本列额外加 `.s-ellipsis` 保证任何容器下都截断。
- 被截断的单元格加原生 `title` 提供完整文本，**不要**自建 tooltip 组件。
- 确需折行的表格整表加 `.s-table.is-wrap`（行高自适应、内边距变 `5px 10px`、`word-break:break-all`）；同一页面不得混用定高与折行两种模式。
- 空值统一显示 `-`，不要留空白或 `null`。

### 6.6 空状态与加载态

| 态 | 结构 | 规则 |
|---|---|---|
| 空数据 | `.s-empty` + `.s-empty-icon` | `padding:48px 0` 居中，字 `#bfbfbf`，图标 40px `#e0e0e0`。文案区分「暂无数据」（从未有数据）与「没有找到符合条件的数据」（筛选后为空）；后者下方给一个 `.s-btn-flat` 的「重置筛选」 |
| 加载中 | `.s-loading` + `.s-spin` | `padding:48px 0` 居中；20×20 转圈，轨道 `#e0e0e0`、指示色 `#29bece`、0.8s 匀速。首次加载替换表格主体；翻页 / 查询时保留表头与已有行，同时把查询区与工具栏按钮置 `disabled` |
| 加载失败 | `.s-empty` + `.s-btn-default` | 复用空状态容器，文案「加载失败，请重试」，下方给「重试」按钮；同时 `.s-message-item.is-error` 提示一次 |
| 无访问权限 | `.page-content` 内 `.s-empty` | 文案「暂无访问权限，请联系管理员」，不渲染查询区与表格 |

### 6.7 示例

```html
<div class="s-table-wrap">
  <table class="s-table">
    <colgroup>
      <col style="width:40px" /><col style="width:140px" /><col />
      <col style="width:100px" /><col style="width:90px" /><col style="width:130px" />
    </colgroup>
    <thead>
      <tr>
        <th class="s-col-check"><label class="s-check"><input type="checkbox" /></label></th>
        <th>申请编号 <span class="s-sort" data-sort><i class="up"></i><i class="down"></i></span></th>
        <th>企业名称</th>
        <th class="s-col-num">授权账号数</th>
        <th class="s-col-center">审核状态</th>
        <th class="s-col-action">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr class="is-selected">
        <td class="s-col-check"><label class="s-check"><input type="checkbox" checked /></label></td>
        <td>SQ2026012700135</td>
        <td class="s-ellipsis" title="三一重工股份有限公司">三一重工股份有限公司</td>
        <td class="s-col-num">128</td>
        <td class="s-col-center"><span class="s-status is-on"><i class="s-status-dot"></i>待审核</span></td>
        <td class="s-col-action">
          <div class="s-row-actions">
            <button class="s-btn s-btn-flat">查看</button>
            <button class="s-btn s-btn-flat is-danger">停用</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 7. 分页

表格下方唯一的翻页控件，**始终右对齐**。

| 项 | 值 | class |
|---|---|---|
| 容器 | **`margin-top:10px`**，`text-align:right`，`line-height:30px`，`justify-content:flex-end` | `.s-pagination` |
| 「每页行数：」 | 12px，`#333` | `.s-pagination-perpage` |
| 每页条数下拉 | 24px 高，`min-width:56px`，`margin-left:4px` | `.s-pagination-size`（与 `.s-select` 组合） |
| 页码信息 | 文案格式 **`1 - 20 / 45`**，左右 `margin:0 20px` | `.s-pagination-info` |
| 翻页按钮 | **28×28**，`.s-btn-flat` 式无底无边，图标 16px，圆角 2px；顺序 **首页 / 上一页 / 下一页 / 末页** 共 **4 个** | `.s-pagination-pager` |

文案固定为「每页行数：」与 `1 - 20 / 45`，**不要**改成「共 45 条」「Total」「10/页」。**不要**渲染 1 2 3 … 数字页码条。

| 状态 | 表现 |
|---|---|
| hover（可用） | 字色 `#29bece`，底 `rgba(0,0,0,.04)` |
| disabled | 字色 `#bfbfbf`，`not-allowed`，无 hover |
| 首页 | 「首页」「上一页」置 `disabled` |
| 末页 | 「下一页」「末页」置 `disabled` |

```html
<nav class="s-pagination">
  <span class="s-pagination-perpage">每页行数：</span>
  <select class="s-select s-pagination-size"><option>20</option><option>50</option><option>100</option></select>
  <span class="s-pagination-info">1 - 20 / 45</span>
  <button class="s-pagination-pager" disabled><svg class="s-ico"><use href="#i-first-page"/></svg></button>
  <button class="s-pagination-pager" disabled><svg class="s-ico"><use href="#i-navigate-before"/></svg></button>
  <button class="s-pagination-pager"><svg class="s-ico"><use href="#i-navigate-next"/></svg></button>
  <button class="s-pagination-pager"><svg class="s-ico"><use href="#i-last-page"/></svg></button>
</nav>
```

---

## 8. 弹窗

| 项 | 值 | class |
|---|---|---|
| 遮罩 | **`rgba(0,0,0,.288)`**（不是 `.45`），`padding:80px 16px 40px`，`z-index:1000` | `.s-mask` |
| 宽度 | **520px**（小 400px `.s-modal-sm` / 大 800px `.s-modal-lg`），`max-width:100%` | `.s-modal` |
| 圆角 / 阴影 | **2px** / `0 4px 12px rgba(0,0,0,.12)` | `.s-modal` |
| 头部 | **`padding:15px 24px`**，下边线 `1px solid #e0e0e0` | `.s-modal-header` |
| 标题 | **18px / 500**，`rgba(0,0,0,.85)`，`line-height:24px` | `.s-modal-title` |
| 关闭按钮 | 16px，hover 转 `#29bece` | `.s-modal-close` |
| 主体 | **`padding:24px`**，字号 12px | `.s-modal-body` |
| 底部 | **`padding:12px 24px`**，**右对齐**，按钮间距 8px，上边线 `1px solid #e0e0e0` | `.s-modal-footer` |
| 抽屉 | 右侧滑出，宽 640px，满高，复用弹窗头 / 体 / 脚 | `.s-drawer` |

**底部按钮：取消在左、主按钮在最右。** 弹窗内表单沿用第 4.1 节的 `.s-form` + `colgroup`（label 列 80px）。

```html
<div class="s-mask" hidden>
  <div class="s-modal" role="dialog" aria-modal="true">
    <div class="s-modal-header">
      <h4 class="s-modal-title">审核租户申请</h4>
      <button class="s-modal-close" data-close><svg class="s-ico"><use href="#i-close"/></svg></button>
    </div>
    <div class="s-modal-body">
      <div class="s-form">
        <table>
          <colgroup><col style="width:80px" /><col /></colgroup>
          <tbody>
            <tr>
              <td class="s-form-label is-required">审核意见</td>
              <td class="s-form-cell"><textarea class="s-textarea is-required" placeholder="请输入"></textarea></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="s-modal-footer">
      <button class="s-btn s-btn-default" data-close>取消</button>
      <button class="s-btn s-btn-primary">确定</button>
    </div>
  </div>
</div>
```

行为：

| 状态 | 表现 |
|---|---|
| 关闭 | `.s-mask[hidden]{display:none}` |
| 点击遮罩空白 | 关闭；表单已填写未保存时改为不关闭并提示 |
| Esc | 关闭最上层 `.s-mask`；焦点返回触发按钮；背景不滚动；焦点在弹窗内循环 |
| 提交中 | 主按钮置 `disabled`（底 `#79e4e8`），文案改「提交中」，取消保持可用 |
| 校验失败 | 弹窗不关闭，失败字段加 `.is-invalid`（字 + 边框 `#d50000`），其下输出 `.s-msg-error` |
| 提交成功 | 关闭弹窗 → `.s-message-item.is-success`（约 2s 自动消失）→ 刷新列表当前页 |

危险操作（删除、停用、批量驳回）必须先弹 `.s-modal-sm`（400px）确认，确认按钮用 `.s-btn-danger` 且文案写明具体动作（「确认停用」而非「确定」），正文写出影响范围。非破坏性操作（导出、刷新）不做二次确认。

---

## 9. 色彩与字体

数值全部引自 `../../b-data-list-design-spec-v2/references/tokens.md`，此处只列表格页高频用到的部分。

### 9.1 色彩

| 用途 | Token | 值 |
|---|---|---|
| 主色（主按钮、链接、选中、行内操作） | `--sany-primary` | **`#29bece`** |
| 主色 hover | `--sany-primary-hover` | `#1995a8` |
| 控件 hover 边框 | `--sany-primary-light` | `#4fd2db` |
| 控件 focus 边框 | `--sany-primary-focus` | `#a6f5f5` |
| 主按钮 disabled | `--sany-primary-disabled` | `#79e4e8` |
| 顶栏底 | `--sany-header-bg` | `#172742` |
| 侧栏底 | `--sany-nav-bg` | `#1e3255` |
| 画布 | `--sany-canvas` | `#f4f5f7` |
| 卡片 | `--sany-card` | `#fff` |
| 正文 | `--sany-text` | `#333` |
| 表头 / 弹窗标题 | `--sany-text-strong` | `rgba(0,0,0,.85)` |
| 页面标题 | `--sany-text-title` | `#000` |
| 占位符 / 禁用字 | `--sany-placeholder` | `#bfbfbf` |
| 表格线 / 次按钮边框 | `--sany-border` | `#e0e0e0` |
| 输入框边框 | `--sany-border-input` | `#d9d9d9` |
| 页头下边线 / 页签栏下边线 | `--sany-border-head` | `#e8e8e8` |
| 表头底 + 行 hover（同一值） | `--sany-fill-head` / `--sany-fill-hover` | `rgba(0,0,0,.04)` |
| 当前行 / 选中行 | `--sany-fill-current` | `rgba(140,158,255,.12)` |
| 禁用底 | `--sany-fill-disabled` | `#f5f5f5` |
| 错误 / 危险 | `--sany-error` | `#d50000` |
| 必填底色 | `--sany-required-bg` | `#feffe6` |
| 遮罩 | `--sany-mask` | `rgba(0,0,0,.288)` |

**本系统没有统一的 success / warning / info 语义色板。** 状态只能用主色 `#29bece`、中性 `#bfbfbf`、错误 `#d50000` 三档表达：

- 状态圆点 `.s-status` + `.s-status-dot`（6×6）：`.is-on` 主色（启用 / 进行中 / 待处理）、`.is-off` `#bfbfbf`（停用 / 已完成 / 已归档）、`.is-error` `#d50000`（驳回 / 失败 / 异常）。单值生命周期状态的**默认选择**。
- 标签 `.s-tag`（高 22px，`padding:0 8px`，圆角 2px，主色实心）/ `.s-tag-outline`（描边 `#d9d9d9`）/ `.s-tag-danger`（`#d50000`）：用于分类、属性等可多值标记。
- 不得给「已通过」配绿色、「待处理」配橙色；不得在同一列混用圆点与 Tag。

### 9.2 字体

```css
font-family:"Monospaced Number","Microsoft YaHei","Chinese Quote",-apple-system,
  BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Hiragino Sans GB",
  "Helvetica Neue",Helvetica,Arial,sans-serif;
```

| 层级 | 字号 | 字重 | 用途 |
|---|---|---|---|
| 正文 / 表格 / 表单 / 按钮 / 分页 | **12px** | 400 | 全局基准 |
| 页面标题 | **16px** | 400 | `.page-head-title` |
| 弹窗标题 | **18px** | 500 | `.s-modal-title` |
| 表头 | 12px | **700** | `.s-table thead th` |
| 分组标题 | 14px | 700 | `.s-section-title` |
| 大号按钮 | 16px | 400 | `.s-btn-lg` |

**基准字号是 12px，不是 14px**，`line-height:1.5`。这是本系统信息密度的直接来源。

### 9.3 形状

全局圆角 **2px**，仅此一个值。内容卡 `.page-content` **无圆角、无阴影**。阴影只存在于弹窗（`0 4px 12px rgba(0,0,0,.12)`）与浮层消息 / 通知（`0 4px 12px rgba(0,0,0,.15)`）。不得引入渐变（菜单选中态除外，其渐变已写死在锁定 Shell 中）、不得引入装饰色。

---

## 10. 响应式与交互反馈

### 10.1 响应式

| 规则 | 说明 |
|---|---|
| 验收基准 | **1440px**。所有间距、列宽、密度以此宽度做视觉验收 |
| 内容区流式 | `.sany-content` 占 `calc(100vw - 220px)`；`.page-content` 外边距恒 `8px 16px 16px`、内边距恒 16px，**不随断点变化** |
| 禁止写死 | 不得给 `.sany-app`、`.page-container`、`.page-content`、`.page-content-stack` 设固定宽度或 `max-width` |
| 侧栏折叠 | 根节点加 `.is-collapsed` → `.sany-nav` 由 220px 变 **60px**，`transition:width .2s linear`；`.sany-nav-search`、`.sany-menu-item-title`、`.sany-menu-group-title` 隐藏，菜单项图标居中；内容区自动补足宽度 |
| < 1280px | 建议默认折叠侧栏；查询区由每行 3 组字段降为 2 组（改 `<colgroup>`），**label 列仍为 80px** |
| 表格 | 宽度不足时由 `.s-table-wrap` 横向滚动，**不压缩列宽、不换行、不降低 36px 行高**；不得让 `.page-container` 出现横向滚动条 |
| 固定列 | 仅在真的溢出时启用：选择列固定左、操作列固定右，其余不固定 |
| 弹窗 / 抽屉 | `.s-modal`、`.s-drawer` 自带 `max-width:100%`，窄屏自动收缩，基准宽度值不变 |
| 移动端 | 不覆盖 < 768px |

### 10.2 交互反馈

| 场景 | 规则 |
|---|---|
| 控件状态 | 每个可交互控件都要有 hover / active / focus-visible / disabled 四态；focus **不加 box-shadow / outline**，只改边框色（`#a6f5f5`） |
| 键盘 | 焦点可见（靠边框色变化），Tab 顺序与视觉顺序一致；弹窗内焦点循环、Esc 关闭 |
| 表单校验时机 | 输入中不校验；blur 时校验当前字段并加 `.is-invalid` + `.s-msg-error`；输入变化即清除错误；提交时全量校验并滚动聚焦第一个失败字段 |
| 必填提示 | 初始渲染即带 `.is-required`（底色 `#feffe6`），**不用红星号**；`.is-required` 与 `.is-invalid` 可共存，此时 `#d50000` 覆盖生效 |
| 轻反馈 | `.s-message` + `.s-message-item`（`.is-success` 图标用**主色**，`.is-error` 用 `#d50000`），约 2s 自动消失，文案 ≤ 20 字，同类不叠加 |
| 长任务 | 导出 / 批量等异步任务用 `.s-notice`（右上角，320px）告知已提交及查看位置 |
| 过渡 | 按钮 `.2s`，单元格底色 `.3s`，侧栏宽度 `.2s linear`，加载转圈 `.8s` 匀速。不要自定其他时长 |

---

## 11. 锁定 Shell 规则

顶栏与侧栏是**不可变外壳**。生成页面时整段复制模板中带 `data-locked-shell="true"` 的 DOM，并完整复制 `assets/table-page-template/assets/shell/shell-lock.css`。

- **`shell-lock.css` 必须在所有页面样式之后加载**（`<link rel="stylesheet" href="assets/shell/shell-lock.css" data-shell-lock="immutable">` 放在样式链最末）。其规则全部带 `!important`，任何后写的页面样式都不应尝试覆盖。
- 被锁定的选择器：`.sany-app`、`.sany-header` 及其 `-inner` / `-left` / `-logo` / `-logo-mark` / `-title` / `-right` / `-item` / `-divider` / `-avatar` / `-notice` / `-notice-dot`、`.sany-collapse-trigger`、`.sany-nav`、`.sany-nav-search`、`.sany-nav-menu`、`.sany-menu`、`.sany-menu-group-title`、`.sany-menu-item`（含 `:hover` 与 `.is-active`）、`.sany-menu-item-icon`、`.sany-menu-item-title`。
- **唯一允许的改动是可见文字**：平台名、菜单名 / 分组名、用户名、语言项。
- 禁止：改 DOM 层级与 class 名；改 48px / 220px / 44px 等任何尺寸、间距、内边距；改 `#172742` / `#1e3255` / 选中渐变 / 左侧 5px 主色条；加圆角、阴影、边框、背景图；把深色壳改成浅色；替换或重绘 Logo 与图标。
- 禁止把 Shell 样式暴露成组件 props、主题变量、utility class、CSS-in-JS 覆盖或任何用户可配置入口。
- 图标用内联 SVG + `currentColor`（`.s-ico`，`1em` 见方，`fill:currentColor`，尺寸由父级 `font-size` 驱动），取自系统实际使用的 Material 图标名：`menu-fold`、`expand_more`、`date_range`、`close`、`search`、`arrow_drop_down`、`first_page`、`navigate_before`、`navigate_next`、`last_page`、`arrow_back`、`notifications`。不得用 Emoji、文字字形（`⌃` `⌄` `×`）、图标字体近似或第三方图标库替代。
- `assets/shell/` 下的 `home.svg`、`settings.svg`、`bell.svg`、`avatar.svg`、`separator.svg` 属旧版浅色外壳遗留资源，**已废弃、不得引用**（见同目录 `DEPRECATED.md`）。
