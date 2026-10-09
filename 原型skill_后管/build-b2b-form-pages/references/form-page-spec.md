# MySANY 后台表单页规范

## 1. 来源与适用范围

本规范描述 **三一 MySANY 后台管理平台**（`sany-me-api.sany.com.cn`，技术栈 **HZERO + choerodon-ui pro**，`c7n-pro-*` 前缀）中"新建 / 编辑 / 审核 / 详情编辑"类表单页的实现标准。

| 事项 | 说明 |
|---|---|
| 数值唯一真源 | `b-data-list-design-spec-v2/references/tokens.md`（线上产物 CSS 按真实加载顺序重建层叠后取最终生效声明） |
| 组件规格 | `b-data-list-design-spec-v2/references/components.md` |
| 样式实现 | `assets/form-page-template/assets/sany-ui.css`（本文出现的每个 class 均实现于此） |
| 外壳锁 | `references/chrome-lock.md` + `assets/form-page-template/assets/shell/shell-lock.css` |
| 验收 | `references/acceptance-checklist.md` |

**不得发明任何数值或颜色。** 本文未写、tokens.md 也未写的量，按最接近的既有 token 取值，不要自拟。

主色唯一为 `#29bece`（choerodon-ui 原厂 `#3f51b5` 已被三一覆盖）。三一集团企业标准色是红色，但**本后台的界面主色不是红色**。

---

## 2. 外壳与布局

页面自外向内固定为：**顶栏 → （侧栏 | 内容区）**，内容区内为 **多页签栏 → 页头 → 画布 → 内容卡**。

| 层 | class | 规格 |
|---|---|---|
| 应用根 | `.sany-app` | `100vh × 100vw`，纵向 flex，`overflow:hidden` |
| 顶栏 | `.sany-header` | 高 **48px**，底色 `#172742`，字色 `#fff` |
| 主体 | `.sany-body` | `flex:1`，横向 flex |
| 侧栏 | `.sany-nav` | 宽 **220px**，底色 `#1e3255`；折叠态 60px |
| 内容区 | `.sany-content` | `flex:1`，纵向 flex |
| 多页签栏 | `.s-tabs` / `.s-tab` | 总高 **36px**（3px 上间隙 + 32px 页签 + 1px 下边线） |
| 画布 | `.page-container` | 底色 `#f4f5f7`，纵向滚动 |
| 页头 | `.page-head` | 高 **48px**，白底，下边线 `1px solid #e8e8e8`，左右内边距 16px |
| 内容卡 | `.page-content` | 外边距 `8px 16px 16px`，内边距 **16px**，白底，**无圆角、无阴影** |
| 多卡堆叠 | `.page-content-stack` + `.sany-card` | 容器 `padding:8px 16px 16px`，卡间 **8px**，单卡 `padding:16px` |

表单页页头用**返回式标题** `.page-head-back`（16px 返回图标 + 16px 标题，字色 `#000`），右侧 `.page-head-operator` 放页面级操作（按钮间距 8px）。

**内容列不居中、不设固定像素宽度。** 内容卡由 `.sany-content` 撑满剩余宽度，左右各距 16px。表单靠 `table-layout:fixed` 的列宽比例自适应，不要写 `width:630px` 之类的固定表单列。

---

## 3. 场景分类

一个页面**只选一种**结构，由实际字段与业务流程推断，**不得在生产页面渲染任何"规范场景"切换器 / 布局选择器 / 演示壳**。仅当用户明确要求"对比规范"时，才单独产出一个隔离的演示页面，且该演示不得进入可复用模板、导航模型或业务页 DOM。

### 3.1 单列（一行 1 组）

一行只放 1 组 label + 字段，`<colgroup>` 为 `80px + auto`。

何时用：字段总数 ≤ 6；或字段值很长（完整企业名称、地址、URL、串联编码）；或字段之间有强依赖需要逐条阅读；或**在弹窗 / 抽屉里**（弹窗正文仅 520px − 48px 内边距，放不下两组）。

### 3.2 双列 / 三列（一行 2–3 组）

**这是后台表单页的默认形态。** 一行 2 组时 `<colgroup>` 为 `80px + auto + 80px + auto`；一行 3 组时为 `80px + auto` × 3。

何时用：字段为短值、彼此独立（编号、名称、类型、状态、数量、日期）。内容卡实际可用宽度 ≥ 约 1000px 时用 3 组，否则用 2 组。同一张卡内**每行的组数必须一致**，不得第一行 3 组、第二行 2 组——`table-layout:fixed` 下列宽由 `<colgroup>` 统一决定，混排会导致控件边缘错位。

### 3.3 分组卡片（多卡堆叠）

用 `.page-content-stack` 包一组 `.sany-card`，每张卡顶部一个 `.s-section-title`。

何时用：表单有 2 个及以上**业务含义独立**的分组（基本信息 / 联系人信息 / 结算信息 / 附件），且分组之间可能被单独提交、单独权限控制或单独折叠。分组少于 2 个时**不要**堆叠，直接用单张 `.page-content`。

一张卡承载一个业务分组，**不要一字段一卡**。

### 3.4 表格内嵌（主表 + 明细行）

上半部分是主表字段（`.s-form`），下半部分是明细集合：`.s-section-title` → `.s-toolbar`（新增 / 删除 / 导入）→ `.s-table-wrap` + `.s-table`。

何时用：表单需要维护可重复的结构化记录（商品明细、联系人列表、授权账号）。

要求：明细表行高 **36px**，表头底色 `rgba(0,0,0,.04)` + 字重 700；行内编辑控件仍是 28px 的 `.s-input` / `.s-select`；行操作用 `.s-row-actions` + `.s-btn-flat`（删除用 `.s-btn-flat.is-danger`）。工具栏按钮必须真正改变行数据——新增插入一行、删除移除选中行、选中行加 `.is-selected`（底色 `rgba(140,158,255,.12)`）。明细为空时用 `.s-empty` 占位，不要留空白区域。

主表分组标题与明细分组标题**必须左对齐在同一条网格线上**（同属一张卡的 `padding:16px` 内边界，或同一层 `.sany-card`）。

### 3.5 锚点导航（长表单分段跳转）

何时用：分组数 ≥ 5 且每组字段较多，一屏无法概览。

本系统 **没有独立的锚点导航组件**。等价实现按优先级：

1. **首选**：用内容区内嵌下划线 Tab `.s-tabs-line` / `.s-tab-line`（项间距 24px，高 32px，选中 `#29bece` 字色 + 2px 主色下划线）把长表单切成几屏，每屏只渲染一个分组。这是系统内真实存在的模式。
2. 确需左/右侧常驻锚点列时：锚点列宽度自适应内容、字号 12px、行高 32px、选中态**只能**用 `#29bece` 字色 + 2px 主色竖条，其余为 `#333`；不得引入新的底色、圆角、阴影或缩进动效。父子层级用 12px 缩进，父子标签**一律单行不换行**（`.s-ellipsis`）。

锚点点击须平滑滚动到对应分组，且分组标题不得被 48px 页头遮挡；滚动时激活项自动跟随。

### 3.6 分步（多步骤流程）

何时用：流程有**真实的顺序阶段**、阶段级校验边界或阶段间的异步/人工处理（提交 → 审批 → 开通）。**不要把步骤条当装饰**——没有阶段校验就不要分步。

本系统 **没有 stepper 组件**。等价实现：用 `.s-tabs-line` / `.s-tab-line` 表达阶段序列，未到达的阶段按钮置 `disabled`；或自绘最小步骤条，约束为：圆点直径 ≤ 24px、字号 12px、圆角 2px（圆点除外）、当前步 `#29bece`、未到达步 `#bfbfbf`、已完成步 `#29bece`。

**已完成步不得使用绿色对勾**——本系统没有 success 绿语义色，完成态一律用主色。

导航按钮放在 `.s-form-footer`，文案"上一步 / 下一步"，最右为主按钮；`下一步` / `上一步` 必须真正改变当前步的可见状态与内容，不能只是文案。

---

## 4. 表单布局规范

### 4.1 结构：table + colgroup，label 在左

表单**不是** label 在上的纵向堆叠，而是 `table` + `colgroup` 横向布局：**label 在左、列宽 80px、右对齐、自动带冒号**。这与查询区共用同一套 `field-label` 语义，是本系统信息密度的来源。

```html
<div class="s-form">
  <table>
    <colgroup>
      <col style="width:80px" /><col />
      <col style="width:80px" /><col />
      <col style="width:80px" /><col />
    </colgroup>
    <tbody>
      <tr>
        <td class="s-form-label is-required">租户名称</td>
        <td class="s-form-cell"><input class="s-input is-required" placeholder="请输入" /></td>
        <td class="s-form-label is-required">统一社会信用代码</td>
        <td class="s-form-cell"><input class="s-input is-required" placeholder="请输入" /></td>
        <td class="s-form-label">客户类型</td>
        <td class="s-form-cell"><select class="s-select"><option>集团客户</option></select></td>
      </tr>
      <tr>
        <td class="s-form-label">生效日期</td>
        <td class="s-form-cell">
          <span class="s-field-affix">
            <input class="s-input" placeholder="请选择" readonly />
            <svg class="s-ico s-field-affix-icon"><use href="#i-date-range"/></svg>
          </span>
        </td>
        <td class="s-form-label">状态</td>
        <td class="s-form-cell"><label class="s-switch"><input type="checkbox" checked /></label></td>
        <td class="s-form-label">授权账号数</td>
        <td class="s-form-cell"><input class="s-input" value="128" /></td>
      </tr>
      <tr>
        <td class="s-form-label">备注</td>
        <td class="s-form-cell" colspan="5"><textarea class="s-textarea" placeholder="请输入"></textarea></td>
      </tr>
    </tbody>
  </table>
</div>
```

### 4.2 列与间距（全部由 CSS 提供，不要覆写）

| 项 | 值 | 来源 |
|---|---|---|
| 表格 | `width:100%`，`table-layout:fixed` | `.s-form` / `.s-form table` |
| label 列宽 | **80px** | `<col style="width:80px">` + `--sany-label-w` |
| label 对齐 | **右对齐**，`padding:0 4px`，`white-space:nowrap`，`::after` 自动输出 `：` | `.s-form-label` |
| 字段格内边距 | `4px 12px 4px 0`（右侧 12px 是与下一组 label 的间隙） | `.s-form-cell` |
| 行内边距 | `4px 0` → **相邻字段行垂直间距 8px**，行总高约 36px | `.s-form td` |
| 字段宽度 | 控件 `width:100%` 占满所在列 | `.s-input` / `.s-select` / `.s-textarea` |

**垂直节奏是 8px（上下各 4px padding），不是自定义的大间距。** 不得给 `.s-form td` 加 margin 或额外 padding 撑开行距。

### 4.3 跨列规则

整行字段用 `colspan` 跨到行尾：

| 一行组数 | colgroup 列数 | 整行字段的 `colspan` |
|---|---|---|
| 1 组 | 2 | `colspan="1"`（本来就占满） |
| 2 组 | 4 | `colspan="3"` |
| 3 组 | 6 | `colspan="5"` |

必须跨列的字段：文本域（备注、审核意见、描述）、长文本单行输入（详细地址、URL）、复选框组 / 单选组（选项数 ≥ 3）、文件上传列表、内嵌明细表。

一行凑不满组数时，**剩余单元格留空**（输出空的 `<td class="s-form-label"></td><td class="s-form-cell"></td>`），**不得把最后一个控件拉宽填满整行**——除非它本就是整行字段。

### 4.4 字段顺序

同一分组内自上而下按：

1. 唯一标识（编号 / 编码 / 单号，通常只读）
2. 名称类
3. 分类 / 类型 / 状态（下拉、单选、开关）
4. 数值 / 数量 / 金额
5. 日期 / 时间范围
6. 关联对象（所属组织、负责人）
7. **长文本与备注，整行跨列，放在分组末尾**

必填字段尽量前置，可选字段后置；有依赖的字段（B 的可选值由 A 决定）必须相邻，A 在前。

---

## 5. 控件规范

所有输入型控件统一 **高 28px、字号 12px、圆角 2px**。

| 控件 | class | 规格 |
|---|---|---|
| 输入框 | `.s-input` | 28px，`padding:1px 10px`，边框 `1px solid #d9d9d9` |
| 下拉 | `.s-select` | 同上，`padding-right:24px`，自绘 16px 箭头 |
| 文本域 | `.s-textarea` | `min-height:60px`，`padding:4px 10px`，`resize:vertical` |
| 日期 / 带后缀图标 | `.s-field-affix` + `.s-field-affix-icon` | 输入右内边距 26px；图标 14px、`#bfbfbf`、`pointer-events:none` |
| 复选框 | `.s-check` + `input[type=checkbox]` | 盒子 14×14，与文字间距 6px |
| 单选 | `.s-check` + `input[type=radio]` | 同上，`border-radius:50%` |
| 开关 | `.s-switch` | 轨道 36×18，滑块 14×14，开启时滑块 `left:20px` |
| 字段容器 | `.s-field` | 块级占满（一格内并排多控件时使用） |

状态（由 CSS 提供，不要重写）：

| 状态 | 表现 |
|---|---|
| hover | 边框 `#4fd2db` |
| focus | 边框 `#a6f5f5`，**无 box-shadow / outline** |
| disabled | 底 `#f5f5f5`，字 `#bfbfbf`，边框 `#d9d9d9`，`cursor:not-allowed` |
| 占位符 | `#bfbfbf`，中文一律"请输入" / "请选择" |

只读展示值（详情页、已提交阶段）**不要用 disabled 控件**，改用描述列表 `.s-desc` / `.s-desc-item` / `.s-desc-label` / `.s-desc-value`（label 同样 80px 右对齐带冒号），空值显示 `-`。

单选组 / 复选组放在一个 `.s-form-cell` 内并排，选项之间靠 `.s-check` 自身的 6px 内间距 + 单元格内 16px 水平间隔；选项过多时跨列整行排布。

---

## 6. 必填与校验

**必填的表达方式是控件底色淡黄 `#feffe6`，不是红星号。** 线上部署显式关闭了 label 前星号（`.c7n-pro-field-required.c7n-pro-field-label:before{display:none!important}`）。

| 场景 | 写法 | 表现 |
|---|---|---|
| 必填控件 | `.s-input.is-required` / `.s-select.is-required` / `.s-textarea.is-required` | 底色 `#feffe6` |
| 必填 label | `.s-form-label.is-required` | 仍**只**输出冒号，不加星号、不变色 |
| 必填 + 禁用 | `.s-input.is-required:disabled` | 底色回落为 `#f5f5f5` |
| 校验失败 | `.s-input.is-invalid` / `.s-select.is-invalid` / `.s-textarea.is-invalid` | 字色 + 边框 `#d50000` |
| 错误文案 | `.s-msg-error` | 12px，`#d50000`，`margin-top:2px`，位于该单元格内控件正下方 |

规则：

- 仅当业务明确要求星号时才使用，且必须是 `#d50000` 的 `*`（`margin-left:4px`）。默认不用。
- **`备注` 一律可选**：不加 `.is-required`、不做非空校验、不阻断提交。仅当明确的下游业务规则覆盖时才例外。
- 校验在失焦时触发，提交时全量复校。提交失败要滚动到**第一个** `.is-invalid` 字段并聚焦；弹窗内校验失败**不关闭弹窗**。
- 错误文案出现会使该行增高，属预期；不要为"防抖动"预留固定空行。
- 整体失败提示用 `.s-message` + `.s-message-item.is-error`；成功用 `.s-message-item.is-success`（图标 `#29bece`，**不是绿色**，本系统无 success 语义色）。

---

## 7. 分组与标题

分组标题一律用 `.s-section-title`：

| 项 | 值 |
|---|---|
| 高度 | 32px |
| 字号 / 字重 / 字色 | 14px / 700 / `rgba(0,0,0,.85)` |
| 左侧装饰 | `::before` 输出 3px × 14px 的 `#29bece` 竖条，与文字间距 8px |
| 下边线 | `1px solid #e0e0e0` |
| 下间距 | `margin-bottom:8px` |

规则：

- 标题文字为业务名词（基本信息 / 联系人信息 / 结算信息），不要写"表单区""模块一"。
- 单卡页面：`.page-content` 内可放多个 `.s-section-title` 分节。
- 多卡页面：每张 `.sany-card` 顶部**最多一个** `.s-section-title`，卡间距由 `.page-content-stack` 的 8px 提供，不要在卡上再加 margin。
- 分组标题不得嵌套三级；需要三级时改用 `.s-tabs-line` 分屏。
- 页面标题只出现在 `.page-head`，不要在内容卡里重复。

---

## 8. 底部操作栏

长表单的提交区用 `.s-form-footer`：

| 项 | 值 |
|---|---|
| 高度 | **48px** |
| 对齐 | `justify-content:flex-end`（**右对齐**），按钮间距 8px |
| 内边距 | `0 16px` |
| 底色 / 上边线 | `#fff` / `1px solid #e0e0e0` |
| 位置 | `.sany-content` 内最后一个直接子元素，`flex:none`，位于滚动容器之外 |

按钮顺序（从左到右）：**取消 → 次要操作（保存草稿 / 上一步）→ 主操作（保存 / 提交 / 下一步，最右）**。

- 每个操作组**只允许一个** `.s-btn-primary`。
- 破坏性操作（删除、作废）用 `.s-btn-danger` 或 `.s-btn-flat.is-danger`，且必须二次确认（`.s-modal-sm`）。
- 提交中：主按钮置 `disabled`（底色自动变 `#79e4e8`）、文案改"提交中"，取消按钮保持可用。
- 按钮尺寸为默认 28px（`.s-btn`），**不要**在操作栏使用 `.s-btn-lg`。
- 所有按钮必须有可见的 hover / active / focus-visible 态；`.s-btn` 的 focus 不产生 box-shadow / outline（`:focus{outline:0;box-shadow:none}`），依靠 `:focus-visible` 的边框/底色变化表达焦点，**不要自行加发光圈**。

短表单（字段 ≤ 8 且无滚动）可省略 `.s-form-footer`，把主操作放进 `.page-head-operator`；两者**不并存**。

---

## 9. 弹窗内表单

字段少（≤ 6）、独立、一步完成的操作（审核、快速新建、参数确认）用弹窗，不要为此新开页面。

| 项 | 值 |
|---|---|
| 遮罩 | `.s-mask`，`rgba(0,0,0,.288)`，`padding:80px 16px 40px` |
| 宽度 | `.s-modal` **520px**；`.s-modal-sm` 400px；`.s-modal-lg` 800px |
| 头部 | `.s-modal-header`，`padding:15px 24px`，下边线 `1px solid #e0e0e0` |
| 标题 | `.s-modal-title`，18px / 500 / `rgba(0,0,0,.85)` / `line-height:24px` |
| 关闭 | `.s-modal-close`，16px，hover 转 `#29bece` |
| 正文 | `.s-modal-body`，`padding:24px`，字号 12px |
| 底部 | `.s-modal-footer`，`padding:12px 24px`，**右对齐**，按钮间距 8px |

弹窗内表单固定为**单列**：`<colgroup><col style="width:80px" /><col /></colgroup>`。底部"取消"在左、主按钮在最右。点击遮罩空白关闭；表单已填写未保存时改为不关闭并提示。Esc 关闭最上层 `.s-mask`。

字段多、或需与列表并排查看时改用抽屉 `.s-drawer`（右侧滑出，宽 640px，满高，复用 `.s-modal-header` / `.s-modal-body` / `.s-modal-footer`）。

---

## 10. 色彩与字体

```css
font-family:"Monospaced Number","Microsoft YaHei","Chinese Quote",-apple-system,
  BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Hiragino Sans GB",
  "Helvetica Neue",Helvetica,Arial,sans-serif;
```

| 层级 | 字号 / 字重 |
|---|---|
| 正文 / label / 控件 / 按钮 / 表格 | **12px / 400**（全局基准，`line-height:1.5`） |
| 页面标题 `.page-head-title` | 16px / 400，字色 `#000` |
| 分组标题 `.s-section-title` | 14px / 700，字色 `rgba(0,0,0,.85)` |
| 弹窗标题 `.s-modal-title` | 18px / 500 |
| 表头 | 12px / 700 |

| 用途 | 值 |
|---|---|
| 主色 / hover / 控件 hover 边框 / focus 边框 / 主按钮禁用 | `#29bece` / `#1995a8` / `#4fd2db` / `#a6f5f5` / `#79e4e8` |
| 顶栏 / 侧栏 / 侧栏搜索框 | `#172742` / `#1e3255` / `#425370` |
| 画布 / 卡片 | `#f4f5f7` / `#fff` |
| 正文 / 强调 / 标题 / 占位符 | `#333` / `rgba(0,0,0,.85)` / `#000` / `#bfbfbf` |
| 分割线 / 控件边框 / 页头下边线 | `#e0e0e0` / `#d9d9d9` / `#e8e8e8` |
| 表头底 / 行 hover / 当前行 / 禁用底 | `rgba(0,0,0,.04)` / `rgba(0,0,0,.04)` / `rgba(140,158,255,.12)` / `#f5f5f5` |
| 错误 / 必填底 / 遮罩 | `#d50000` / `#feffe6` / `rgba(0,0,0,.288)` |
| 圆角 | **2px**（全局唯一） |
| 阴影 | 仅弹窗 `0 4px 12px rgba(0,0,0,.12)` 与浮层 `0 4px 12px rgba(0,0,0,.15)`；**内容卡无阴影** |

间距阶只有：**4 / 6 / 8 / 10 / 12 / 16 / 20 / 24**。

本系统**没有**统一的 success / warning / info 语义色板，状态用 `.s-tag`（主色实心）或 `.s-status` 圆点三档（`.is-on` `#29bece` / `.is-off` `#bfbfbf` / `.is-error` `#d50000`）表达。不要凭空引入绿 / 橙 / 蓝状态配色。

---

## 11. 响应式与交互

本系统是桌面端后台，不做移动端适配，但必须保持弹性：

1. **不写死宽度。** `.sany-content` 与 `.page-content` 已是 flex 伸缩；表单靠 `table-layout:fixed` 的比例列自适应。
2. 内容区可用宽度收窄时，把一行 3 组降为 2 组、2 组降为 1 组——**同时改 `<colgroup>` 与 `colspan`**，保持列数一致。
3. 侧栏折叠用根节点 `is-collapsed`（宽度 220px → 60px，`transition:width .2s linear`），搜索框与菜单文字隐藏、图标居中。这是唯一允许的折叠形态。
4. 明细表过宽时由 `.s-table-wrap` 横向滚动，**不要**压缩列宽或换行表头。
5. 长表单在 `.page-container` / `.page-content-stack` 内纵向滚动，`.s-form-footer` 在滚动容器外保持常驻，**不得遮挡最后一个字段**。
6. 键盘：Tab 顺序与视觉顺序一致（逐行从左到右）；Enter 在单行输入内不提交表单；Esc 关闭最上层弹窗。
7. 所有可交互元素（按钮、页签、锚点、行内操作、翻页）都要有 hover、active/pressed、focus-visible 三态，且状态变化不得引起布局位移。
8. 交互必须是真实行为：明细表按钮要真的增删行，锚点要真的滚动并更新激活态，分步按钮要真的推进流程状态——不能只用文字或静态截图代替。

---

## 12. 锁定 Shell 规则

顶栏与侧栏是**不可变外壳**，完整规则见 `references/chrome-lock.md`，实现约束由 `assets/form-page-template/assets/shell/shell-lock.css` 强制（必须最后加载）。要点：

- 外壳节点必须带 `data-locked-shell="true"`。
- **仅可替换可见文字**：平台名、站点名、语言、用户名/头像首字、菜单分组名、菜单项名、页签文案。
- 不得改动外壳的 DOM 层级、class 名、尺寸、间距、颜色、圆角、选中态、图标尺寸与位置。
- 不得把深色导航改成浅色，不得改变顶栏 48px / 侧栏 220px / 菜单项 44px / 选中态 5px 主色左条 + 向右渐变至 `#29bece`。
- 图标一律用内联 SVG + `currentColor`（`.s-ico`，尺寸由父级 `font-size` 驱动），不使用 emoji、Unicode 字符或位图。
- 旧版"可信数据空间"浅色外壳的 SVG 资源已废弃，见 `assets/form-page-template/assets/shell/DEPRECATED.md`，不得再引用。

---

## 13. 禁止项

1. 不得使用 `#255CE9` 或任何其他蓝色作为主色——主色唯一 `#29bece`。
2. 不得把顶栏改为 56px、侧栏改为 240px，不得把导航壳改成浅色。
3. 不得把基准字号提到 14px，不得把控件高度做成 32px / 36px / 40px（`.s-btn-lg` 的 40px 仅用于超大号行动按钮，表单页不用）。
4. 不得把字段垂直节奏拉到 32px；不得把底部操作栏做成 64px。
5. 不得使用大于 2px 的圆角，不得给内容卡加阴影、渐变、装饰色。
6. 不得用红星号表示必填（本部署已关闭），必填一律 `#feffe6` 底色。
7. 不得使用 label 在上的纵向表单布局作为默认形态（`.s-form-vertical` 仅为极少数长表单的例外变体）。
8. 不得在生产页面渲染"规范场景"切换器、布局选择器或任何演示控件。
9. 不得把演示壳里的按钮、开关、假数据带进可复用业务模板。
10. 不得直接套用 Ant Design / Element / Tailwind 默认视觉——本系统虽是 AntD 衍生，但主色、字号、控件高度、圆角、表头底色均已被覆盖。
11. 不得引入绿 / 橙 success-warning 语义色，完成态一律用主色。
12. 不得把业务文案做成图片，必须保留真实文本与可访问的表单控件。
