# 组件规格

本文件所有数值来自 `references/tokens.md`；tokens.md 未收录、但在 `assets/templates/assets/sany-ui.css` 中已实现的细节（多页签配色、菜单项高度与选中渐变、侧栏搜索底色、危险按钮 hover 色）标注 **[css]**，同样不得改动。
本文件出现的每个 class 均真实存在于 `assets/templates/assets/sany-ui.css`。

**通用前提**

| 项 | 值 |
|---|---|
| 基准字号 | 12px（不是 14px） |
| 行高 | 1.5 |
| 正文字色 | `#333`（`--sany-text`） |
| 主色 | `#29bece`（`--sany-primary`），唯一 |
| 全局圆角 | 2px（`--sany-radius`） |
| 控件高度 | 28px / lg 40px / sm 24px |
| 表格行高 | 36px |
| 内容卡 | 无圆角、无阴影 |

---

## 1. 应用外壳

### 1.1 用途
深色导航壳 + 浅色内容区，是本系统最强的识别特征。结构固定：顶栏 →（侧栏 | 内容区），内容区内再放多页签栏 → 页头 → 内容卡。生成页面时整段复制，仅替换可见文字。

### 1.2 尺寸 / 配色

| 部件 | class | 规格 |
|---|---|---|
| 应用根 | `.sany-app` | `height:100vh;width:100vw`，纵向 flex |
| 顶栏 | `.sany-header` / `.sany-header-inner` | 高 **48px**，底色 `#172742`，字色 `#fff`，字号 12px |
| Logo 区 | `.sany-header-logo` / `.sany-header-logo-mark` / `.sany-header-title` | `margin-left:20px`，`min-width:200px`；标记 20×20；标题 16px/500 |
| 折叠触发 | `.sany-collapse-trigger` | 图标 18px，`margin-left:9px` |
| 顶栏右区 | `.sany-header-right` / `.sany-header-item` | `padding-right:16px`；项间距 `margin-right:12px` |
| 顶栏分隔 | `.sany-header-divider` | 1×16px，`rgba(255,255,255,.2)` |
| 顶栏文字按钮 | `.sany-header-item-btn` | 无底无边，字色 `#fff`，图文间距 4px |
| 头像 | `.sany-header-avatar` | 24×24 圆形，底色 `#29bece`，字色 `#fff` |
| 消息红点 | `.sany-header-notice` / `.sany-header-notice-dot` | 6×6 圆点，`#d50000` |
| 主体 | `.sany-body` | `flex:1`，横向 flex |
| 侧栏 | `.sany-nav` | 宽 **220px**，底色 `#1e3255`，`transition:width .2s linear` |
| 侧栏折叠 | `.sany-app.is-collapsed .sany-nav` | 宽 **60px** |
| 侧栏搜索 | `.sany-nav-search` / `.sany-nav-search-icon` | `padding:7px 12px`；输入 28px，底色 `#425370` **[css]**，focus 边框主色 |
| 菜单容器 | `.sany-nav-menu` / `.sany-menu` | 纵向滚动，滚动条宽 0 |
| 分组标题 | `.sany-menu-group-title` | `padding:8px 20px 4px`，`rgba(255,255,255,.35)` |
| 菜单项 | `.sany-menu-item` | 高 **44px** **[css]**，`padding:0 20px`，字色 `rgba(255,255,255,.75)`，左侧 5px 透明边 |
| 菜单图标/标题/箭头 | `.sany-menu-item-icon` / `.sany-menu-item-title` / `.sany-menu-item-arrow` | 14px / 省略号 / 12px |
| 内容区 | `.sany-content` | `flex:1`，等价于 `calc(100vw - 220px)` |
| 画布 | `.page-container` | 底色 `#f4f5f7`，纵向滚动 |

### 1.3 多页签栏

| 项 | class | 规格 |
|---|---|---|
| 条 | `.s-tabs` | 总高 **36px** = 3px 上间隙 + 32px 页签 + 1px 下边线；底白色，下边线 `1px solid #e8e8e8` |
| 页签 | `.s-tab` | 高 32px，`margin:3px 2px 0 0`（2px 白缝），`padding:0 12px`，底色 `#e3e3e3` **[css]**，字色 `#4c4c4c`，12px |
| 选中 | `.s-tab.is-active` | 底色 `#f0f0f0` **[css]**，字色 `#29bece` |
| 关闭 | `.s-tab-close` | 12px，`opacity:.6` |

页签顶部圆角由 `.s-tab` 内置，勿自行调整；页签栏无阴影。

### 1.4 HTML 用法

```html
<div class="sany-app" id="app">
  <header class="sany-header" data-locked-shell="true">
    <div class="sany-header-inner">
      <div class="sany-header-left">
        <div class="sany-header-logo">
          <svg class="s-ico sany-header-logo-mark"><use href="#i-apps"/></svg>
          <h1 class="sany-header-title">MySANY管理平台</h1>
        </div>
        <button class="sany-collapse-trigger"><svg class="s-ico"><use href="#i-menu-fold"/></svg></button>
      </div>
      <div class="sany-header-right">
        <div class="sany-header-item"><button class="sany-header-item-btn">简体中文</button></div>
        <span class="sany-header-divider"></span>
        <div class="sany-header-item sany-header-notice">
          <svg class="s-ico"><use href="#i-notifications"/></svg>
          <span class="sany-header-notice-dot"></span>
        </div>
        <div class="sany-header-item"><span class="sany-header-avatar">刘</span></div>
      </div>
    </div>
  </header>
  <div class="sany-body">
    <nav class="sany-nav" data-locked-shell="true">
      <div class="sany-nav-search">
        <svg class="s-ico sany-nav-search-icon"><use href="#i-search"/></svg>
        <input type="text" placeholder="菜单搜索" />
      </div>
      <div class="sany-nav-menu">
        <ul class="sany-menu">
          <li class="sany-menu-group-title">业务中心</li>
          <li class="sany-menu-item is-active">
            <svg class="s-ico sany-menu-item-icon"><use href="#i-inbox"/></svg>
            <span class="sany-menu-item-title">客户管理</span>
            <svg class="s-ico sany-menu-item-arrow"><use href="#i-play-arrow"/></svg>
          </li>
        </ul>
      </div>
    </nav>
    <main class="sany-content">
      <div class="s-tabs">
        <button class="s-tab">工作台</button>
        <button class="s-tab is-active">租户审核 <span class="s-tab-close"><svg class="s-ico"><use href="#i-close"/></svg></span></button>
      </div>
      <div class="page-container"><!-- 页头 + 内容卡 --></div>
    </main>
  </div>
</div>
```

### 1.5 状态

| 状态 | 表现 |
|---|---|
| 菜单项 hover | 底 `rgba(255,255,255,.06)`，字色 `#fff` |
| 菜单项选中 `.is-active` | `linear-gradient(90deg,#1e3255 0%,#29bece 100%)` + 左侧 5px 主色实条 + 字色 `#fff` **[css]** |
| 顶栏按钮 hover | `.sany-collapse-trigger:hover` / `.sany-header-item-btn:hover` 字色转 `#29bece` |
| 侧栏折叠 | 根节点加 `is-collapsed`：`.sany-nav-search`、`.sany-menu-item-title`、`.sany-menu-group-title` 隐藏，菜单项居中 |
| 页签 hover | 字色 `#29bece`；`.s-tab-close:hover` 时 `opacity:1` |

---

## 2. 页头 page-head

### 2.1 用途
承载页面标题与页面级操作，位于内容卡之上、多页签栏之下。每页仅一个。

### 2.2 尺寸 / 配色

| 项 | 值 | class |
|---|---|---|
| 高度 | **48px**（`line-height:47px`） | `.page-head` |
| 底色 / 下边线 | `#fff` / `1px solid #e8e8e8` | `.page-head` |
| 左右内边距 | 16px | `.page-head` |
| 标题 | **16px**，字色 `#000`，`line-height:48px` | `.page-head-title` |
| 操作区 | 右侧，按钮间距 8px | `.page-head-operator` |
| 返回式标题 | 16px，图标 16px（字色 `#333`） | `.page-head-back` |

### 2.3 HTML 用法

```html
<div class="page-head">
  <span class="page-head-title">租户审核</span>
  <div class="page-head-operator">
    <button class="s-btn s-btn-default">导入</button>
    <button class="s-btn s-btn-primary">新建租户</button>
  </div>
</div>

<!-- 详情页 / 表单页：返回式页头 -->
<div class="page-head">
  <button class="page-head-back"><svg class="s-ico"><use href="#i-navigate-before"/></svg>租户详情</button>
  <div class="page-head-operator"><button class="s-btn s-btn-primary">保存</button></div>
</div>
```

### 2.4 状态
`.page-head-back:hover` 时其内部 `.s-ico` 字色转 `#29bece`；标题本身不变色、不加下划线。页头无 hover 态、无阴影。

---

## 3. 内容卡 page-content

### 3.1 用途
页面唯一的白色内容容器，承载查询区、工具栏、表格、分页或表单。

### 3.2 尺寸 / 配色

| 项 | 值 |
|---|---|
| 外边距 | **`8px 16px 16px`**（距页头 8px、左右各 16px、距底 16px） |
| 内边距 | **16px** |
| 底色 | `#fff` |
| 圆角 / 阴影 | **无**（不要加 2px 以外的圆角，不要加投影） |
| 外层画布 | `#f4f5f7` |

| class | 说明 |
|---|---|
| `.page-content-wrap` | 卡片外层伸缩容器 |
| `.page-content` | 白卡本体 |
| `.page-content-wrap-no-card` | 卡片贴边（外边距归零）变体 |
| `.page-content-stack` | 多卡堆叠容器：`padding:8px 16px 16px`，卡间 8px |
| `.sany-card` | 堆叠模式下的单张白卡，`padding:16px` |

### 3.3 HTML 用法

```html
<!-- 单卡：列表页 -->
<div class="page-content-wrap">
  <div class="page-content"><!-- 查询区 / 工具栏 / 表格 / 分页 --></div>
</div>

<!-- 多卡：表单页分组 -->
<div class="page-content-stack">
  <div class="sany-card"><div class="s-section-title">基本信息</div></div>
  <div class="sany-card"><div class="s-section-title">联系人信息</div></div>
</div>
```

### 3.4 状态
无交互态。卡片高度随内容流式伸缩，内部自带 `overflow:auto`，不得写死像素宽度。

---

## 4. 按钮

### 4.1 用途
主按钮承载页面唯一主操作；次按钮承载并列普通操作；文字按钮用于表格行内与低优先级操作；危险按钮仅用于删除/停用等破坏性操作；图标按钮用于工具栏与分页。

### 4.2 尺寸

| 尺寸 | class | 高度 | 内边距 | 字号 |
|---|---|---|---|---|
| 默认 | `.s-btn` | **28px** | `0 12px` | 12px |
| 大 | `.s-btn-lg` | 40px | `0 12px` | 16px |
| 小 | `.s-btn-sm` | 24px | `1px 6px` | 12px |
| 图标 | `.s-btn-icon` | 28px 见方（与 `.s-btn-sm` 组合时 24px） | 0 | 随内容 |

圆角统一 2px；按钮组间距 8px（`.s-btn-group`）；按钮 focus **不产生 box-shadow / outline**，不要自行加发光圈。

### 4.3 配色与状态

| 类型 | class | 默认 | hover / focus | active | disabled |
|---|---|---|---|---|---|
| 主 | `.s-btn-primary` | 底 `#29bece`，字 `#fff` | 底 `#1995a8` | 底 `#1995a8` | 底 `#79e4e8`，字 `#fff`，`not-allowed` |
| 次 | `.s-btn-default` | 透明底，边框 `#e0e0e0`，字 `#333` | 边框+字 `#29bece` | 边框+字 `#1995a8` | 底 `#f5f5f5`，边框 `#d9d9d9`，字 `#bfbfbf` |
| 文字 | `.s-btn-flat` | 透明，字 `#29bece`，`padding:0 6px` | 字 `#1995a8`，底 `rgba(0,0,0,.04)` | — | 字 `#bfbfbf`，底透明 |
| 文字·危险 | `.s-btn-flat.is-danger` | 字 `#d50000` | 字 `#d50000`，底 `rgba(213,0,0,.06)` | — | 同文字按钮 |
| 危险实心 | `.s-btn-danger` | 底 `#d50000`，字 `#fff` | 底 `#b30000` **[css]** | — | — |

禁用同时使用属性 `disabled` 与 class `.is-disabled`（原生 `<button>` 用属性即可，非按钮元素用 class）。

### 4.4 HTML 用法

```html
<div class="s-btn-group">
  <button class="s-btn s-btn-primary">查询</button>
  <button class="s-btn s-btn-default">重置</button>
  <button class="s-btn s-btn-flat">详情</button>
  <button class="s-btn s-btn-flat is-danger">删除</button>
  <button class="s-btn s-btn-danger">确认删除</button>
  <button class="s-btn s-btn-primary" disabled>提交中</button>
  <button class="s-btn s-btn-default s-btn-icon"><svg class="s-ico"><use href="#i-search"/></svg></button>
  <button class="s-btn s-btn-primary s-btn-lg">立即开通</button>
  <button class="s-btn s-btn-default s-btn-sm">小</button>
</div>
```

---

## 5. 表单控件

### 5.1 用途
所有输入型控件统一 28px 高、12px 字号、2px 圆角，保证紧凑密度。

### 5.2 尺寸 / 配色（共用）

| 项 | 值 |
|---|---|
| 高度 | **28px** |
| 内边距 | `1px 10px`；文本域 `4px 10px` |
| 边框 | `1px solid #d9d9d9`，圆角 2px |
| 底色 / 字色 | `#fff` / `#333` |
| 占位符 | `#bfbfbf` |
| hover 边框 | `#4fd2db` |
| focus 边框 | `#a6f5f5`，**无 box-shadow** |
| disabled | 底 `#f5f5f5`，字 `#bfbfbf`，边框 `#d9d9d9`，`not-allowed` |

| 控件 | class | 差异点 |
|---|---|---|
| 输入框 | `.s-input` | — |
| 下拉 | `.s-select` | 原生 select，`padding-right:24px`，自绘 16px 箭头 |
| 文本域 | `.s-textarea` | `min-height:60px`，`resize:vertical` |
| 日期 / 带后缀图标 | `.s-field-affix` + `.s-field-affix-icon` | 输入右内边距 26px；图标 14px、`#bfbfbf`、`pointer-events:none` |
| 字段容器 | `.s-field` | 块级占满 |

### 5.3 复选框 / 单选 / 开关

| 控件 | class | 规格 |
|---|---|---|
| 复选框 | `.s-check` + `input[type=checkbox]` | 盒子 14×14，边框 `#d9d9d9`，圆角 2px；与文字间距 6px |
| 单选 | `.s-check` + `input[type=radio]` | 同上，`border-radius:50%` |
| 开关 | `.s-switch` | 轨道 36×18，滑块 14×14 |

| 状态 | 表现 |
|---|---|
| hover | 勾选框边框 `#29bece` |
| checked | 底 + 边框 `#29bece`，勾/点为白色 |
| indeterminate | 底 `#29bece` + 白色横杠（表头半选态） |
| disabled | 底 `#f5f5f5`，边框 `#d9d9d9`，`not-allowed` |
| focus-visible | 边框 `#a6f5f5` |
| 开关开启 | 轨道 `#29bece`，滑块移至 `left:20px` |

### 5.4 HTML 用法

```html
<input class="s-input" type="text" placeholder="请输入" />
<select class="s-select"><option>全部</option></select>
<textarea class="s-textarea" placeholder="请输入"></textarea>

<span class="s-field-affix">
  <input class="s-input" type="text" placeholder="请选择" readonly />
  <svg class="s-ico s-field-affix-icon"><use href="#i-date-range"/></svg>
</span>

<label class="s-check"><input type="checkbox" checked /> 选项A</label>
<label class="s-check"><input type="radio" name="r" /> 选项B</label>
<label class="s-switch"><input type="checkbox" checked /></label>
```

---

## 6. 必填与校验

### 6.1 规则
**必填项的表达方式是"淡黄底色"，不是红星号。** 线上部署显式关闭了 label 前的星号。仅当业务明确要求星号时，才用 `#d50000` 的 `*`。

### 6.2 规格

| 场景 | class | 表现 |
|---|---|---|
| 必填 | `.s-input.is-required` / `.s-select.is-required` / `.s-textarea.is-required` | 控件底色 `#feffe6` |
| 必填 + 禁用 | `.s-input.is-required:disabled` | 底色回落为 `#f5f5f5` |
| 必填 label | `.s-form-label.is-required` | 仍只输出冒号，**不加星号** |
| 校验失败 | `.s-input.is-invalid` / `.s-select.is-invalid` / `.s-textarea.is-invalid` | 字色 + 边框 `#d50000` |
| 错误文案 | `.s-msg-error` | 12px，`#d50000`，`margin-top:2px` |

### 6.3 HTML 用法

```html
<td class="s-form-label is-required">租户名称</td>
<td class="s-form-cell"><input class="s-input is-required" value="三一重工股份有限公司" /></td>

<td class="s-form-label">联系邮箱</td>
<td class="s-form-cell">
  <input class="s-input is-invalid" value="not-an-email" />
  <div class="s-msg-error">请输入正确的邮箱地址</div>
</td>
```

---

## 7. 查询区

### 7.1 用途
列表页第一区块，位于内容卡顶部。用 `table` + `colgroup` 严格对齐 label 与字段，默认一行 3 组字段，超出部分折叠。

### 7.2 尺寸

| 项 | 值 | class |
|---|---|---|
| 区块内边距 | `6px 0` | `.s-query-bar` |
| label 列宽 | **80px**，**右对齐 + 自动冒号** | `.s-form-label`（`::after` 输出 `：`） |
| 字段列 | 宽度自适应（`<col>` 不设宽） | `.s-form-cell`（`padding:4px 12px 4px 0`） |
| 表单行内边距 | `4px 0` | `.s-form td` |
| 表格容器 | `width:100%`，`table-layout:fixed` | `.s-form` / `.s-form table` |
| 按钮区 | 右侧固定，间距 8px，`padding-top:4px` | `.s-query-actions` |
| 纵向 label 变体 | label 独占一行、左对齐 | `.s-form-vertical` |

### 7.3 按钮顺序（固定）
**更多 → 重置 → 查询（主按钮，最右）**。字段不超过一行时省略"更多"。

### 7.4 HTML 用法

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

### 7.5 状态

| 状态 | 表现 |
|---|---|
| 折叠（默认） | `.s-query-row-overflow` 行 `display:none` |
| 展开 | 根节点加 `.is-expanded`：溢出行显示为 `table-row`，`.s-query-more` 内图标旋转 180°，文案"更多"→"收起" |
| 字段态 | 沿用第 5 节控件的 hover / focus / disabled |

---

## 8. 工具栏

### 8.1 用途
位于查询区与表格之间，承载表格级操作（新建、导出、批量处理）与右侧辅助信息（已选数量等）。

### 8.2 尺寸

| 项 | 值 | class |
|---|---|---|
| 内边距 | `6px 0` | `.s-toolbar` |
| 两端分布 | 左组主操作 / 右组辅助 | `.s-toolbar-left` / `.s-toolbar-right` |
| 元素间距 | 8px | 同上 |

### 8.3 HTML 用法

```html
<div class="s-toolbar">
  <div class="s-toolbar-left">
    <button class="s-btn s-btn-primary">导出</button>
    <button class="s-btn s-btn-default" disabled>批量通过</button>
  </div>
  <div class="s-toolbar-right">
    <span class="s-status is-on"><i class="s-status-dot"></i>已选 3 项</span>
  </div>
</div>
```

### 8.4 状态
依赖行选择的批量按钮未选中时置 `disabled`（次按钮禁用样式：底 `#f5f5f5` / 边框 `#d9d9d9` / 字 `#bfbfbf`）；选中后恢复可用并在右区更新计数。

---

## 9. 表格

### 9.1 用途
列表页核心。定高行模式（默认）保证密度，折行模式用于长文本列。

### 9.2 尺寸 / 配色

| 项 | 值 | class |
|---|---|---|
| 行高 | **36px** | `.s-table` 的 `th/td` |
| 单元格内边距 | `0 10px`（定高行）；折行模式 `5px 10px` | `.s-table` / `.s-table.is-wrap` |
| 表头底色 | **`rgba(0,0,0,.04)`**（不要换成实色灰） | `.s-table thead th` |
| 表头字色 / 字重 | `rgba(0,0,0,.85)` / **700** | 同上 |
| 表头行内 line-height | 34px | 同上 |
| 单元格下边线 | `1px solid #e0e0e0` | `.s-table` 的 `th/td` |
| 表格上下边框 | `1px solid #e0e0e0` | `.s-table` |
| 字号 / 字色 | 12px / `#333` | `.s-table` |
| 溢出滚动容器 | `overflow:auto` | `.s-table-wrap` |
| 列最小宽 / 默认列宽 | 50px / 100px | `<colgroup>` |

对齐与列类型：

| class | 用途 |
|---|---|
| `.s-col-num` | 数值列右对齐，`tabular-nums` |
| `.s-col-center` | 居中列（状态等） |
| `.s-col-check` | 选择列，宽 40px，居中，`padding:0` |
| `.s-col-action` | 操作列，左对齐 |
| `.s-row-actions` | 行内操作容器，按钮间距 8px，内部 `.s-btn-flat` 去内边距 |

### 9.3 HTML 用法

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
        <td class="s-ellipsis">三一重工股份有限公司</td>
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

### 9.4 状态

| 状态 | class | 表现 |
|---|---|---|
| 行 hover | `.s-table tbody tr:hover>td` | 底色 `rgba(0,0,0,.04)`，`transition .3s` |
| 当前行 / 选中行 | `tr.is-current` / `tr.is-selected` | 底色 `rgba(140,158,255,.12)` |
| 全选半选 | 表头 `input:indeterminate` | 主色底 + 白色横杠 |
| 排序·默认 | `.s-sort` | 上下三角均为 `#bfbfbf` |
| 排序·升序 | `.s-sort.is-asc` | 上三角转 `#29bece` |
| 排序·降序 | `.s-sort.is-desc` | 下三角转 `#29bece` |
| 行内操作禁用 | `.s-btn-flat.is-disabled` + `disabled` | 字色 `#bfbfbf` |
| 空数据 | `.s-empty` / `.s-empty-icon` | `padding:48px 0` 居中，字 `#bfbfbf`，图标 40px `#e0e0e0` |
| 加载中 | `.s-loading` + `.s-spin` | `padding:48px 0` 居中；20×20 转圈，轨道 `#e0e0e0`、指示色 `#29bece`，0.8s 匀速 |

```html
<div class="s-empty"><span class="s-empty-icon">□</span>暂无数据</div>
<div class="s-loading"><span class="s-spin"></span></div>
```

超长文本列加 `.s-ellipsis`（定高模式下 `.s-table` 已默认 `nowrap + ellipsis`）；确需折行时给表格加 `.s-table.is-wrap`（此时单元格内边距变为 `5px 10px`）。

---

## 10. 分页

### 10.1 用途
表格下方唯一的翻页控件，始终右对齐。

### 10.2 尺寸 / 文案

| 项 | 值 | class |
|---|---|---|
| 容器 | `margin-top:10px`，`text-align:right`，`line-height:30px` | `.s-pagination` |
| "每页行数：" | 12px，`#333` | `.s-pagination-perpage` |
| 每页条数下拉 | 24px 高，`min-width:56px`，`margin-left:4px` | `.s-pagination-size`（与 `.s-select` 组合） |
| 页码信息 | 文案格式 **`1 - 20 / 45`**，左右 `margin:0 20px` | `.s-pagination-info` |
| 翻页按钮 | 28×28，无底无边，图标 16px；顺序：首页 / 上一页 / 下一页 / 末页 | `.s-pagination-pager` |

文案固定为"每页行数："与"1 - 20 / 45"，不要改成"共 45 条"或"Total"。

### 10.3 HTML 用法

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

### 10.4 状态

| 状态 | 表现 |
|---|---|
| hover（可用） | 字色 `#29bece`，底 `rgba(0,0,0,.04)` |
| disabled | 字色 `#bfbfbf`，`not-allowed`，无 hover |
| 首页 | 首页 / 上一页按钮置 `disabled` |
| 末页 | 下一页 / 末页按钮置 `disabled` |

---

## 11. 弹窗与抽屉

### 11.1 用途
弹窗用于字段少、独立、一步完成的操作（审核、新建、确认）；抽屉用于字段多或需要与列表并排查看的详情。

### 11.2 尺寸 / 配色

| 项 | 值 | class |
|---|---|---|
| 遮罩 | `rgba(0,0,0,.288)`（不是 .45），内边距 `80px 16px 40px` | `.s-mask` |
| 弹窗宽度 | **520px**（小 400px / 大 800px） | `.s-modal` / `.s-modal-sm` / `.s-modal-lg` |
| 圆角 / 阴影 | 2px / `0 4px 12px rgba(0,0,0,.12)` | `.s-modal` |
| 头部 | `padding:15px 24px`，下边线 `1px solid #e0e0e0` | `.s-modal-header` |
| 标题 | **18px / 500**，`rgba(0,0,0,.85)`，`line-height:24px` | `.s-modal-title` |
| 关闭按钮 | 16px，hover 转 `#29bece` | `.s-modal-close` |
| 主体 | `padding:24px`，字号 12px | `.s-modal-body` |
| 底部 | `padding:12px 24px`，**右对齐**，按钮间距 8px，上边线 `1px solid #e0e0e0` | `.s-modal-footer` |
| 抽屉 | 右侧滑出，宽 640px，满高，阴影同弹窗 | `.s-drawer` |

抽屉复用 `.s-modal-header` / `.s-modal-body` / `.s-modal-footer`；抽屉内 `.s-modal-body` 自动 `flex:1;overflow:auto`。

### 11.3 HTML 用法

```html
<!-- 弹窗 520px：取消在左，主按钮在最右 -->
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

<!-- 抽屉：遮罩贴边、右侧对齐 -->
<div class="s-mask" hidden style="padding:0;align-items:stretch;justify-content:flex-end">
  <div class="s-drawer" role="dialog" aria-modal="true">
    <div class="s-modal-header">
      <h4 class="s-modal-title">租户详情</h4>
      <button class="s-modal-close" data-close><svg class="s-ico"><use href="#i-close"/></svg></button>
    </div>
    <div class="s-modal-body">
      <div class="s-section-title">基本信息</div>
      <div class="s-desc"></div>
    </div>
    <div class="s-modal-footer">
      <button class="s-btn s-btn-default" data-close>关闭</button>
      <button class="s-btn s-btn-primary">去审核</button>
    </div>
  </div>
</div>
```

### 11.4 状态

| 状态 | 表现 |
|---|---|
| 关闭 | 根节点 `.s-mask[hidden]{display:none}` |
| 点击遮罩空白 | 关闭（表单已填写未保存时改为不关闭并提示） |
| Esc | 关闭当前最上层 `.s-mask` |
| 提交中 | 主按钮置 `disabled`（底 `#79e4e8`），取消按钮保持可用 |
| 校验失败 | 弹窗不关闭，失败字段加 `.is-invalid` 并在其下输出 `.s-msg-error` |

弹窗 / 抽屉内的分组标题用 `.s-section-title`（高 32px，14px/700，字色 `rgba(0,0,0,.85)`，左侧 3px 主色竖条，下边线 `#e0e0e0`，下间距 8px）；整页长表单的固定操作条用 `.s-form-footer`（高 48px，右对齐，`padding:0 16px`，上边线 `#e0e0e0`）。

---

## 12. 标签 Tag / 状态圆点

### 12.1 用途
Tag 用于分类 / 属性标记（可多个并列）；状态圆点用于单值生命周期状态（启用 / 停用 / 异常）。

### 12.2 尺寸 / 配色

| 组件 | class | 规格 |
|---|---|---|
| 主色实心 Tag | `.s-tag` | 高 22px，`padding:0 8px`，`line-height:20px`，12px，圆角 2px，底 + 边框 `#29bece`，字 `#fff`，`margin-right:8px`（末个归零） |
| 描边 Tag | `.s-tag.s-tag-outline` | 透明底，边框 `#d9d9d9`，字 `#333` |
| 危险 Tag | `.s-tag.s-tag-danger` | 底 + 边框 `#d50000`，字 `#fff` |
| 状态容器 | `.s-status` | 行内 flex，圆点与文字间距 6px，12px，`#333` |
| 状态圆点 | `.s-status-dot` | **6×6**，`border-radius:50%`，默认 `#bfbfbf` |

圆点配色只有三档（不要引入绿 / 橙）：

| 语义 | class | 圆点色 |
|---|---|---|
| 生效 / 进行中 | `.s-status.is-on` | `#29bece` |
| 失效 / 已结束 | `.s-status.is-off` | `#bfbfbf` |
| 异常 / 驳回 | `.s-status.is-error` | `#d50000` |

### 12.3 HTML 用法

```html
<span class="s-tag">集团客户</span>
<span class="s-tag s-tag-outline">试用</span>
<span class="s-tag s-tag-danger">已冻结</span>

<span class="s-status is-on"><i class="s-status-dot"></i>启用</span>
<span class="s-status is-off"><i class="s-status-dot"></i>停用</span>
<span class="s-status is-error"><i class="s-status-dot"></i>已驳回</span>
```

### 12.4 状态
Tag 与状态圆点均为静态展示，无 hover / focus 态，不可点击，不要加光标变化。

---

## 13. 全局消息 message / 通知 notification

### 13.1 用途
message 用于操作结果的轻量反馈（保存成功、删除成功），自动消失；notification 用于需要保留阅读的较长信息，右上角展示。

### 13.2 尺寸 / 配色

| 组件 | class | 规格 |
|---|---|---|
| message 容器 | `.s-message` | 固定顶部居中，`top:16px`，`z-index:1010`，多条间距 8px |
| message 单条 | `.s-message-item` | `padding:10px 16px`，白底，圆角 2px，阴影 `0 4px 12px rgba(0,0,0,.15)`，12px，字 `#333`，图标 14px |
| 成功 | `.s-message-item.is-success` | 图标 `#29bece`（**不是绿色**，本系统无 success 语义色） |
| 失败 | `.s-message-item.is-error` | 图标 `#d50000` |
| 通知 | `.s-notice` | 固定右上，`top:16px;right:16px`，宽 320px，`padding:16px 24px`，白底，圆角 2px，阴影 `0 4px 12px rgba(0,0,0,.15)` |

### 13.3 HTML 用法

```html
<div class="s-message">
  <div class="s-message-item is-success"><svg class="s-ico"><use href="#i-check"/></svg>操作成功</div>
  <div class="s-message-item is-error"><svg class="s-ico"><use href="#i-close"/></svg>提交失败，请重试</div>
</div>

<div class="s-notice">
  <b>租户审核提醒</b>
  <div>有 3 条租户申请待处理。</div>
</div>
```

### 13.4 状态
message 展示约 2s 后移除 DOM；同类消息不叠加，重复触发替换上一条。通知需用户主动关闭（复用 `.s-modal-close` 作为关闭按钮）。

---

## 14. 描述列表 s-desc

### 14.1 用途
详情页 / 详情抽屉中只读字段的展示，不使用表单控件。

### 14.2 尺寸 / 配色

| 项 | 值 | class |
|---|---|---|
| 布局 | 3 列等宽网格，行距 12px、列距 24px | `.s-desc` |
| 单项 | 行内 flex，12px，`line-height:1.5` | `.s-desc-item` |
| 标签 | 宽 **80px**，右对齐，自动冒号，字 `#333` + `opacity:.65` | `.s-desc-label` |
| 值 | 占满剩余宽度，`word-break:break-all` | `.s-desc-value` |
| 分组标题 | 高 32px，14px/700，`rgba(0,0,0,.85)`，左侧 3px 主色竖条，下边线 `#e0e0e0`，下间距 8px | `.s-section-title` |

### 14.3 HTML 用法

```html
<div class="s-section-title">基本信息</div>
<div class="s-desc">
  <div class="s-desc-item"><span class="s-desc-label">申请编号</span><span class="s-desc-value">SQ2026012700135</span></div>
  <div class="s-desc-item"><span class="s-desc-label">企业名称</span><span class="s-desc-value">三一重工股份有限公司</span></div>
  <div class="s-desc-item"><span class="s-desc-label">申请时间</span><span class="s-desc-value">2026-01-27 00:05:35</span></div>
</div>
```

### 14.4 状态
无交互态。长值默认换行；需要单行截断时给 `.s-desc-value` 追加 `.s-ellipsis`。字段为空时值位显示 `-`，不要留空白。

---

## 15. 内容区内嵌 Tab 与工具类

### 15.1 下划线式 Tab

| 项 | class | 规格 |
|---|---|---|
| 容器 | `.s-tabs-line` | 项间距 24px，下边线 `1px solid #e0e0e0`，下间距 12px |
| 项 | `.s-tab-line` | 高 32px，12px，字 `#333`，无底无边 |
| 选中 | `.s-tab-line.is-active` | 字色 `#29bece`，底部 2px 主色下划线 |

```html
<div class="s-tabs-line">
  <button class="s-tab-line is-active">全部</button>
  <button class="s-tab-line">待审核</button>
  <button class="s-tab-line">已通过</button>
</div>
```

与顶部的 `.s-tabs`（多页签导航，36px）职责不同，不可互换。

### 15.2 工具类

| class | 作用 |
|---|---|
| `.s-ico` | 内联 SVG 图标，`1em` 见方，`fill:currentColor`，尺寸由父级 `font-size` 驱动 |
| `.s-ellipsis` | 单行省略号 |
| `.s-hidden` | `display:none!important` |
| `.s-field` | 表单字段块级容器 |

---

## 16. 自检清单

- [ ] 主色只有 `#29bece`，无 `#255CE9` 或其他蓝
- [ ] 基准字号 12px，页面标题 16px，弹窗标题 18px
- [ ] 控件 28px、表格行 36px、顶栏 / 页头 48px、侧栏 220px
- [ ] 圆角一律 2px，内容卡无圆角无阴影
- [ ] 表头底色 `rgba(0,0,0,.04)` + 字重 700
- [ ] 必填用 `#feffe6` 底色而非红星号
- [ ] 查询按钮顺序：更多 → 重置 → 查询
- [ ] 分页文案"每页行数："与"1 - 20 / 45"，整体右对齐
- [ ] 弹窗 520px，底部右对齐，主按钮最右
- [ ] 未引入任何 success 绿 / warning 橙语义色
