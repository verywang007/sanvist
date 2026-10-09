# 锁定外壳规则

MySANY 后台管理平台（HZERO + choerodon-ui pro）的**顶栏与侧栏是不可变外壳**。任何页面工作开始之前先读本文。

- 数值真源：`b-data-list-design-spec-v2/references/tokens.md`
- 样式实现：`assets/form-page-template/assets/sany-ui.css`
- 强制锁：`assets/form-page-template/assets/shell/shell-lock.css`

外壳的识别特征是 **深色导航壳 + 浅色内容区**：顶栏 `#172742`、侧栏 `#1e3255`、画布 `#f4f5f7`。这不是可选风格，是这套系统的身份。

---

## 1. 标记要求

外壳的两个根节点必须带 `data-locked-shell="true"`，`shell-lock.css` 的所有规则都以该属性为选择器前缀：

```html
<header class="sany-header" data-locked-shell="true"> … </header>
<nav class="sany-nav" data-locked-shell="true"> … </nav>
```

缺少该属性 = 外壳未锁定 = 验收不通过。

---

## 2. 顶栏（48px / #172742）

### 2.1 结构（DOM 顺序固定）

```html
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
      <div class="sany-header-item"><button class="sany-header-item-btn">总部站点</button></div>
      <span class="sany-header-divider"></span>
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
```

左区自左至右：**Logo 标记 → 平台名 → 折叠按钮**。
右区自左至右：**站点 → 分隔 → 语言 → 分隔 → 消息（带红点）→ 头像**。

### 2.2 锁定数值

| 部件 | class | 锁定值 |
|---|---|---|
| 顶栏 | `.sany-header` | 高 **48px**，`flex:none`，底色 `#172742`，字色 `#fff`，字号 12px |
| 内层 | `.sany-header-inner` | `display:flex`，高 48px，`justify-content:space-between`，`align-items:center` |
| 左区 | `.sany-header-left` | `display:flex`，`flex:none`，`max-width:600px` |
| Logo 区 | `.sany-header-logo` | `margin-left:20px`，`min-width:200px`，图标与文字间距 8px，字色 `#fff` |
| Logo 标记 | `.sany-header-logo-mark` | **20 × 20px**，`flex:none` |
| 平台名 | `.sany-header-title` | **16px / 500**，`#fff`，`white-space:nowrap` |
| 折叠按钮 | `.sany-collapse-trigger` | `margin-left:9px`，图标 **18px**，`line-height:48px`，`#fff`，无底无边 |
| 右区 | `.sany-header-right` | `display:flex`，`align-items:center`，`padding-right:16px` |
| 右区项 | `.sany-header-item` | `margin-right:12px`（末项 0），`#fff`，`white-space:nowrap` |
| 右区文字按钮 | `.sany-header-item-btn` | 无底无边，`#fff`，图文间距 4px |
| 分隔线 | `.sany-header-divider` | **1 × 16px**，`rgba(255,255,255,.2)`，`margin-right:12px` |
| 消息区 | `.sany-header-notice` | `position:relative`，图标 16px |
| 消息红点 | `.sany-header-notice-dot` | **6 × 6px** 圆点，`#d50000`，`top:-2px;right:-2px` |
| 头像 | `.sany-header-avatar` | **24 × 24px** 圆形，底 `#29bece`，字 `#fff`，12px |

hover 态：`.sany-collapse-trigger:hover` 与 `.sany-header-item-btn:hover` 字色转 `#29bece`。这是顶栏唯一的交互反馈。

---

## 3. 侧栏（220px / #1e3255）

### 3.1 结构（DOM 顺序固定）

```html
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
```

自上而下：**搜索框 → 可滚动菜单容器（分组标题 + 菜单项）**。

### 3.2 锁定数值

| 部件 | class | 锁定值 |
|---|---|---|
| 侧栏 | `.sany-nav` | 宽 **220px**，`flex:none`，底色 `#1e3255`，`transition:width .2s linear`，纵向 flex |
| 折叠态 | `.sany-app.is-collapsed .sany-nav` | 宽 **60px** |
| 搜索区 | `.sany-nav-search` | `padding:7px 12px`，`position:relative`，`flex:none` |
| 搜索输入 | `.sany-nav-search input` | 高 **28px**，`padding:1px 10px 1px 28px`，12px，字 `#fff`，底 **`#425370`**，边框 `1px solid transparent`，圆角 2px，`outline:0` |
| 搜索占位符 | — | `rgba(255,255,255,.55)` |
| 搜索 focus | `.sany-nav-search input:focus` | 边框转 `#29bece` |
| 搜索图标 | `.sany-nav-search-icon` | 14px，`left:21px`，垂直居中，`rgba(255,255,255,.55)`，`pointer-events:none` |
| 菜单容器 | `.sany-nav-menu` | `flex:1`，纵向滚动，滚动条宽 0 |
| 菜单列表 | `.sany-menu` | `list-style:none`，`margin:0`，`padding:0` |
| 分组标题 | `.sany-menu-group-title` | `padding:8px 20px 4px`，`rgba(255,255,255,.35)`，12px，不换行 |
| 菜单项 | `.sany-menu-item` | 高 **44px**，`padding:0 20px`，图文间距 10px，字色 `rgba(255,255,255,.75)`，`border-left:5px solid transparent` |
| 菜单图标 | `.sany-menu-item-icon` | 14px，`flex:none` |
| 菜单标题 | `.sany-menu-item-title` | `flex:1`，溢出省略号 |
| 菜单箭头 | `.sany-menu-item-arrow` | 12px，`opacity:.8` |

### 3.3 菜单项状态（选中态是识别特征，不可改）

| 状态 | class | 表现 |
|---|---|---|
| hover | `.sany-menu-item:hover` | 底 `rgba(255,255,255,.06)`，字色 `#fff` |
| **选中** | `.sany-menu-item.is-active` | 底 `linear-gradient(90deg,#1e3255 0%,#29bece 100%)`（**向右渐变至主色**）+ `border-left-color:#29bece`（**5px 主色左条**）+ 字色 `#fff` |
| 折叠 | `.sany-app.is-collapsed` | `.sany-nav-search`、`.sany-menu-item-title`、`.sany-menu-group-title` 隐藏；`.sany-menu-item` 变 `justify-content:center;padding:0` |

同一时刻**只允许一个** `.sany-menu-item.is-active`。

---

## 4. 允许改动的范围

**仅可替换可见文字。** 允许改的只有：

- 平台名 `.sany-header-title`
- 顶栏站点名 / 语言 `.sany-header-item-btn` 的文案
- 头像首字 `.sany-header-avatar`
- 侧栏搜索框 `placeholder`
- 菜单分组名 `.sany-menu-group-title`
- 菜单项名 `.sany-menu-item-title`
- 哪一项是 `.is-active`（选中样式本身不可改）
- 菜单项图标所引用的 `<symbol>` id（须来自系统实际使用的 Material 图标集，尺寸与颜色不变）
- 多页签 `.s-tab` 的文案与激活项

菜单项数量可按业务增减，但**必须保持 44px 行高、相同的 padding/间距/字色/选中态**。业务标签过长时截断（`.sany-menu-item-title` 已有省略号），**不得加宽侧栏**。

---

## 5. 禁止行为

1. 不得改动外壳的 DOM 层级、节点顺序或 class 名。
2. 不得改顶栏 48px、侧栏 220px、折叠 60px、菜单项 44px、搜索框 28px、头像 24px、分隔线 1×16px、红点 6×6px 中的任何一个。
3. 不得把外壳改成浅色、白底、玻璃拟态或渐变背景；`#172742` / `#1e3255` / `#425370` 三个底色固定。
4. 不得更换选中态表达方式——5px 主色左条 + 向右渐变至 `#29bece` 是唯一形式；不得改成整块实心底、圆角胶囊、下划线或右侧指示条。
5. 不得使用 `#255CE9` 或其他蓝色，不得把顶栏做成 56px、侧栏做成 240px（旧"可信数据空间"规范的数值，已废弃）。
6. 不得给外壳加阴影、圆角（> 2px）、边框或分隔装饰。
7. 不得使用 emoji、Unicode 字符（如 `≡`、`⌄`）、位图或第三方图标字体替代图标。
8. 不得改变图标尺寸去迁就更长的文案；改文案本身。
9. 不得增删顶栏右区的结构槽位（站点 / 语言 / 消息 / 头像）——文案可改，槽位保留。
10. 不得自创另一套折叠形态（抽屉、悬浮、mini 图标栏）；折叠只有 `is-collapsed` 的 220px → 60px 一种。
11. 不得把页面内容（面包屑、页签、业务按钮）塞进顶栏或侧栏。

---

## 6. shell-lock.css 的加载顺序

`assets/form-page-template/assets/shell/shell-lock.css` 内的规则全部带 `!important`，用于在页面样式被改写时把外壳强制拉回锁定值。

**必须在所有页面样式（含 `sany-ui.css`、业务样式、内联 `<style>`）之后加载：**

```html
<link rel="stylesheet" href="assets/sany-ui.css" />
<link rel="stylesheet" href="assets/business.css" />
<!-- 必须最后 -->
<link rel="stylesheet" href="assets/shell/shell-lock.css" />
```

它锁定的范围是：顶栏全部部件、侧栏容器 / 搜索 / 菜单容器 / 分组标题 / 菜单项及其 hover 与 is-active、菜单图标与标题。它**不**锁定多页签栏 `.s-tabs` 与页头 `.page-head`，这两者仍须按 `references/form-page-spec.md` 的数值实现，同样不得改动。

删除或调换该文件的加载顺序，视同外壳未锁定。

---

## 7. 图标

图标一律用**内联 SVG 雪碧图 + `currentColor`**：页面底部放一段 `<svg style="display:none"><symbol id="i-xxx" viewBox="0 0 24 24">…</symbol></svg>`，使用处写 `<svg class="s-ico"><use href="#i-xxx"/></svg>`。

`.s-ico` 的定义是 `width:1em;height:1em;vertical-align:-.15em;fill:currentColor;flex:none` —— **尺寸由父级 `font-size` 驱动，颜色随父级字色自动变化**，因此同一个图标在深色外壳与浅色内容区都正确，且不产生额外网络请求。

现行图标取自系统实际使用的 Material 图标名：
`menu-fold`、`expand_more`、`date_range`、`close`、`search`、`arrow_drop_down`、`first_page`、`navigate_before`、`navigate_next`、`last_page`、`arrow_back`、`notifications`。

### 旧资源已废弃

`assets/form-page-template/assets/` 下的 `logo.svg`、`home.svg`、`settings.svg`、`notification.svg`、`avatar.svg`、`menu.svg`、`arrow-left.svg`、`step-complete.svg`、`step-check-circle.svg` 全部属于**旧版"可信数据空间" Figma 浅色外壳**（主色 `#255CE9`、顶栏 56px、侧栏 240px），**已废弃、不得再引用**。

说明见 `assets/form-page-template/assets/shell/DEPRECATED.md`。这些文件为保留历史而未删除，任何新页面引用它们即为验收失败。其中 `step-complete.svg` / `step-check-circle.svg` 的绿色对勾尤其不可用——本系统没有 success 绿语义色。

---

## 8. 验收

逐项比对实现与本文的锁定值。**文字差异允许，视觉结构差异不允许。** 任一锁定数值、颜色、状态表达或图标方式不符，即判定交付失败。
