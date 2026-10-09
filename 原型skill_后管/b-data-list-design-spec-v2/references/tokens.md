# SANY 后台管理平台 — Design Token（唯一真源）

本文件的数值全部来自 **MySANY 管理平台**（`sany-me-api.sany.com.cn`）线上产物的真实 CSS，
经"按页面实际加载顺序重建层叠、取最终生效声明"的方式解析得到，非估算、非套用任何开源 UI 库默认值。

技术栈事实：**HZERO 平台 + choerodon-ui pro（`c7n-pro-*` 前缀）**，页面另有少量 `ant-*`（hzero-ui）遗留组件。
choerodon-ui 原厂主色是 `#3f51b5`，本系统已覆盖为 `#29bece`——**主色是三一自有定制，不可用任何其他蓝色/靛蓝替代**。

> 三一集团的企业标准色是红色，但**该后台管理平台的界面主色不是红色**。本文件只描述这套后台的实际界面语言。

---

## 0. rem 基准（重要）

线上 `html{font-size:625%}` → **1rem = 100px**。源码里的 `.36rem = 36px`、`.24rem = 24px`、`.12rem = 12px`、`.01rem = 1px`。

**模板里一律直接写 px**，不要复制 `625%` 这个 hack：渲染一致，但不会在嵌套/第三方环境里被污染。
下文所有数值均已换算为 px。

---

## 1. 色彩

### 1.1 主色

| Token | 值 | 用途 | 证据 |
|---|---|---|---|
| `--sany-primary` | `#29bece` | 主按钮底色、选中态、链接、强调 | `.c7n-pro-btn-primary.c7n-pro-btn-raised{background-color:#29bece}` |
| `--sany-primary-hover` | `#1995a8` | 主按钮 hover / focus（**加深**） | `.c7n-pro-btn-primary.c7n-pro-btn-raised:hover{background-color:#1995a8}` |
| `--sany-primary-light` | `#4fd2db` | 输入控件 hover 边框 | `label:hover .c7n-pro-input{border-color:#4fd2db}` |
| `--sany-primary-focus` | `#a6f5f5` | 输入控件 focus 边框 | `.c7n-pro-input:focus{border-color:#a6f5f5}` |
| `--sany-primary-disabled` | `#79e4e8` | 主按钮 disabled 底色 | `.c7n-pro-btn-raised` disabled 变体 |

主按钮 focus **不产生 box-shadow / outline**（`box-shadow:none;outline:0`）——不要自行添加发光圈。
文字按钮 / 链接按钮用主色字：`.c7n-pro-btn-primary.c7n-pro-btn-flat{color:#29bece}`。

### 1.2 外壳色（深色导航）

这套系统是**深色导航壳 + 浅色内容区**，不是全浅色后台。这是它最强的视觉识别特征。

| Token | 值 | 用途 | 证据 |
|---|---|---|---|
| `--sany-header-bg` | `#172742` | 顶栏底色（深藏青） | `.hzero-normal-header{height:48px;background-color:#172742}` |
| `--sany-nav-bg` | `#1e3255` | 左侧菜单底色（比顶栏略浅） | `.hzero-normal-nav-container{background-color:#1e3255}` |
| `--sany-header-fg` | `#fff` | 顶栏文字与图标 | `.hzero-normal-header-collapsed-trigger{color:#fff}` |

### 1.3 中性色

| Token | 值 | 用途 | 证据 |
|---|---|---|---|
| `--sany-canvas` | `#f4f5f7` | 页面画布（内容区背景） | `.page-container{background-color:#f4f5f7}` |
| `--sany-card` | `#fff` | 卡片 / 内容容器 | `.page-content{background-color:#fff}` |
| `--sany-text` | `#333` | 正文（**全局默认字色**） | `body{color:#333}` |
| `--sany-text-strong` | `rgba(0,0,0,.85)` | 表头、弹窗标题 | `.c7n-pro-table-thead .c7n-pro-table-cell{color:rgba(0,0,0,.85)}` |
| `--sany-text-title` | `#000` | 页面主标题 | `.page-head-title{color:#000}` |
| `--sany-placeholder` | `#bfbfbf` | 占位符 | `.c7n-pro-input-placeholder{color:#bfbfbf}` |
| `--sany-border` | `#e0e0e0` | 表格线、次按钮边框、分割线 | `.c7n-pro-table-cell{border-bottom:1px solid #e0e0e0}` |
| `--sany-border-input` | `#d9d9d9` | 输入控件边框 | `.c7n-pro-input{border:1px #d9d9d9}` |
| `--sany-border-head` | `#e8e8e8` | 页头下边线 | `.page-head{border-bottom:1px solid #e8e8e8}` |
| `--sany-fill-head` | `rgba(0,0,0,.04)` | **表头底色** | `.c7n-pro-table-thead .c7n-pro-table-cell{background-color:rgba(0,0,0,.04)}` |
| `--sany-fill-hover` | `rgba(0,0,0,.04)` | 行 hover | `.c7n-pro-table-row:hover>.c7n-pro-table-cell{background-color:rgba(0,0,0,.04)}` |
| `--sany-fill-current` | `rgba(140,158,255,.12)` | 当前行 / 选中行 | `.c7n-pro-table-row-current>.c7n-pro-table-cell` |
| `--sany-fill-disabled` | `#f5f5f5` | 禁用态底色 | `.c7n-pro-input-disabled{background-color:#f5f5f5}` |

表头底色与行 hover 底色**是同一个值** `rgba(0,0,0,.04)`——这是原系统的事实，不要给表头换成实色灰。

### 1.4 语义色

| Token | 值 | 用途 | 证据 |
|---|---|---|---|
| `--sany-error` | `#d50000` | 校验错误、危险操作 | `.c7n-pro-validation-message{color:#d50000}` |
| `--sany-required-bg` | `#feffe6` | **必填项底色（淡黄）** | `.c7n-pro-input-required-colors{background-color:#feffe6}` |
| `--sany-mask` | `rgba(0,0,0,.288)` | 弹窗遮罩（注意是 .288，不是 .45） | `.c7n-pro-mask{background-color:rgba(0,0,0,.288)}` |

**必填项的表达方式是"淡黄底色"，不是红星号。** 该部署显式关掉了星号：
`html body .c7n-pro-field-required.c7n-pro-field-label:before{display:none!important}`。
生成页面时按此还原；若业务明确要求星号，再用 `#d50000` 的 `*`（SimSun、`margin-left:4px`、`width:8px`）。

无效态：`.c7n-pro-input-invalid .c7n-pro-input{color:#d50000;border-color:#d50000}`。

本系统**没有统一的 success/warning/info 语义色板**，状态主要靠 `c7n-tag`（主色实心）或纯文本表达。
不要凭空引入一整套绿/橙/蓝状态配色。

---

## 2. 字体

```css
font-family: "Monospaced Number", "Microsoft YaHei", "Chinese Quote", -apple-system,
             BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB",
             "Helvetica Neue", Helvetica, Arial, sans-serif;
```
证据：`body{font-family:...;font-size:12px;line-height:1.5;color:#333}`

| 层级 | 字号 | 字重 | 用途 |
|---|---|---|---|
| 正文 / 表格 / 表单 / 按钮 | **12px** | 400 | 全局基准（`body`、`.c7n-pro-table`、`.c7n-pro-input` 均为 12px） |
| 页面标题 | **16px** | 400 | `.page-head-title{font-size:16px;line-height:48px;color:#000}` |
| 弹窗标题 | **18px** | 500 | `.c7n-pro-modal-title{font-size:18px;font-weight:500;line-height:24px}` |
| 大号按钮 | 16px | 400 | `.c7n-pro-btn-lg{font-size:16px}` |
| 表头 | 12px | **700** | `.c7n-pro-table-thead .c7n-pro-table-cell{font-weight:700}` |

**基准字号是 12px，不是 14px。** 这是本系统与多数 Ant Design 项目最直观的差别，直接决定信息密度。
`line-height: 1.5` 为全局默认。

---

## 3. 圆角与阴影

| Token | 值 | 证据 |
|---|---|---|
| `--sany-radius` | **2px** | `.c7n-pro-btn`、`.c7n-pro-input`、`.c7n-pro-modal-content` 均为 `border-radius:2px` |
| `--sany-shadow-modal` | `0 4px 12px rgba(0,0,0,.12)` | `.c7n-pro-modal-content{box-shadow:...}` |
| `--sany-shadow-float` | `0 4px 12px rgba(0,0,0,.15)` | `.ant-message-notice-content`、`.ant-notification-notice` |

**全局圆角只有 2px。** 不要出现 6px / 8px / 12px 的大圆角，也不要给内容卡加投影——内容卡是**无阴影、无圆角**的纯白块（`.page-content` 只有 `background:#fff`）。

---

## 4. 尺寸

### 4.1 外壳

| 项 | 值 | 证据 |
|---|---|---|
| 顶栏高度 | **48px** | `.hzero-normal-header{height:48px}` |
| 侧边栏宽度 | **220px** | `.hzero-normal-nav{width:220px}` |
| 内容区宽度 | `calc(100vw - 220px)` | `.hzero-normal-content{width:calc(100vw - 220px)}` |
| 侧栏折叠动效 | `width .2s linear` | `.hzero-normal-nav{transition:width .2s linear}` |
| Logo 左边距 | 20px，`min-width:200px` | `.hzero-normal-header-logo{margin-left:20px;min-width:200px}` |
| 顶栏右区 | `padding-right:16px`，项间距 `margin-right:12px` | `.hzero-normal-header-right` |
| 折叠触发图标 | 18px，`margin-left:9px` | `.hzero-normal-header-collapsed-trigger` |

### 4.2 页面

| 项 | 值 | 证据 |
|---|---|---|
| 页头 `.page-head` | 高 48px，`line-height:47px`，底边 `1px solid #e8e8e8`，底色 `#fff` | `.page-head` |
| 内容卡 `.page-content` | `margin:8px 16px 16px`；`padding:16px`；`background:#fff` | `.page-content` |

即：**内容白卡距左右各 16px、距页头 8px、距底部 16px，内边距 16px。** 这是全站唯一的内容区节奏。

### 4.3 控件

| 尺寸 | 高度 | 内边距 | 字号 | 证据 |
|---|---|---|---|---|
| 默认 | **28px** | `0 12px` | 12px | `.c7n-pro-btn{height:28px;padding:0 12px}`、`.c7n-pro-input{height:28px}` |
| 大 `lg` | 40px | `0 12px` | 16px | `.c7n-pro-btn-lg` |
| 小 `sm` | 24px | `1px 6px` | 12px | `.c7n-pro-btn-sm` |

输入框内边距 `1px 10px`（`.c7n-pro-input{padding:1px 10px}`）。
**控件标准高度是 28px**，不是 32/36/40px——这是本系统紧凑感的来源。

### 4.4 表格

| 项 | 值 | 证据 |
|---|---|---|
| 行高 | **36px** | `.c7n-pro-table` 运行时 `line-height:.36rem`；单元格 `style="height:.36rem"` |
| 表头行内 line-height | 34px | 表头 `style="line-height:.34rem"` |
| 单元格内边距 | `5px 10px`；定高行为 `0 10px` | `.c7n-pro-table-cell-inner` |
| 单元格边框 | `border-bottom:1px solid #e0e0e0` | `.c7n-pro-table-cell` |
| 表格上下边框 | `1px solid #e0e0e0` | `.c7n-pro-table{border-top/bottom}` |
| 列最小宽 / 默认列宽 | 50px / 100px | `<col class="c7n-pro-table-col" style="min-width:.5rem;width:1rem">` |

### 4.5 查询区与分页

| 项 | 值 | 证据 |
|---|---|---|
| 查询区内边距 | `6px 0` | `.c7n-pro-table-professional-query-bar{padding:6px 0}` |
| 查询区 label 列宽 | **80px**，右对齐 + 冒号 | `<col style="width:.8rem">` + `.c7n-pro-field-label-right`、`-useColon` |
| 查询区字段列 | 宽度自适应（`<col>` 无宽度） | 同上 |
| 分页条 | `margin-top:10px`；`text-align:right`；`line-height:30px` | `.c7n-pro-table-pagination` |
| 分页页码信息 | 左右 `margin:0 20px` | `.c7n-pro-pagination-page-info` |
| 分页翻页按钮 | 28px，flat、仅图标 | `.c7n-pro-pagination-pager{height:28px}` |

### 4.6 弹窗

| 项 | 值 | 证据 |
|---|---|---|
| 默认宽度 | **520px**（`5.2rem`） | `.c7n-pro-modal{width:5.2rem;margin:0 auto}` |
| 头部内边距 | `15px 24px` | `.c7n-pro-modal-header` |
| 标题 | 18px / 500 / `rgba(0,0,0,.85)` / line-height 24px | `.c7n-pro-modal-title` |
| 主体内边距 | `24px`，字号 12px | `.c7n-pro-modal-body` |
| 底部内边距 | `12px 24px`，**右对齐** | `.c7n-pro-modal-footer{text-align:right}` |
| 圆角 / 阴影 | 2px / `0 4px 12px rgba(0,0,0,.12)` | `.c7n-pro-modal-content` |

### 4.7 标签与徽标

| 项 | 值 | 证据 |
|---|---|---|
| `c7n-tag`（主色实心） | 高 22px、`padding:0 8px`、line-height 20px、12px、圆角 2px、底色/边框 `#29bece`、字色 `#fff` | `.c7n-tag` |
| `ant-tag`（描边） | 高 22px、`padding:0 7px`、line-height 20px、12px、圆角 2px、边框 `#d9d9d9`、字色 `#333` | `.ant-tag` |
| 状态圆点 | 6×6px、`border-radius:50%` | `.ant-badge-status-dot` |

---

## 5. 间距阶

系统实际高频使用的间距（px）：**4 / 6 / 8 / 10 / 12 / 16 / 20 / 24**。

固定用法：内容卡外边距 `8px 16px 16px`、内边距 `16px`；弹窗主体 `24px`；表格单元格 `5px 10px`；顶栏右区项间距 `12px`。

---

## 6. 供直接粘贴的 CSS 变量块

```css
:root{
  /* 主色 */
  --sany-primary:#29bece;
  --sany-primary-hover:#1995a8;
  --sany-primary-light:#4fd2db;
  --sany-primary-focus:#a6f5f5;
  --sany-primary-disabled:#79e4e8;
  /* 外壳 */
  --sany-header-bg:#172742;
  --sany-nav-bg:#1e3255;
  --sany-header-fg:#fff;
  /* 中性 */
  --sany-canvas:#f4f5f7;
  --sany-card:#fff;
  --sany-text:#333;
  --sany-text-strong:rgba(0,0,0,.85);
  --sany-text-title:#000;
  --sany-placeholder:#bfbfbf;
  --sany-border:#e0e0e0;
  --sany-border-input:#d9d9d9;
  --sany-border-head:#e8e8e8;
  --sany-fill-head:rgba(0,0,0,.04);
  --sany-fill-hover:rgba(0,0,0,.04);
  --sany-fill-current:rgba(140,158,255,.12);
  --sany-fill-disabled:#f5f5f5;
  /* 语义 */
  --sany-error:#d50000;
  --sany-required-bg:#feffe6;
  --sany-mask:rgba(0,0,0,.288);
  /* 形状 */
  --sany-radius:2px;
  --sany-shadow-modal:0 4px 12px rgba(0,0,0,.12);
  --sany-shadow-float:0 4px 12px rgba(0,0,0,.15);
  /* 尺寸 */
  --sany-header-h:48px;
  --sany-nav-w:220px;
  --sany-pagehead-h:48px;
  --sany-control-h:28px;
  --sany-control-h-lg:40px;
  --sany-control-h-sm:24px;
  --sany-row-h:36px;
  --sany-label-w:80px;
  /* 字体 */
  --sany-font:"Monospaced Number","Microsoft YaHei","Chinese Quote",-apple-system,
    BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Hiragino Sans GB",
    "Helvetica Neue",Helvetica,Arial,sans-serif;
  --sany-fz:12px;
  --sany-fz-title:16px;
  --sany-fz-modal-title:18px;
}
```

---

## 7. 禁止事项

1. 不得使用 `#255CE9` 或任何其他蓝色作为主色——主色唯一为 `#29bece`。
2. 不得把导航壳做成浅色，顶栏 `#172742` / 侧栏 `#1e3255` 是识别特征。
3. 不得把基准字号提到 14px，不得把控件高度提到 32px 以上。
4. 不得引入大圆角（>2px）、卡片投影、渐变、装饰色。
5. 不得直接套用 Ant Design / Element / Tailwind 的默认视觉；本系统虽是 AntD 衍生，但主色、字号、控件高度、圆角、表头底色均已被覆盖。
6. 不得用红星号表示必填（本部署已关闭），改用 `#feffe6` 底色。
