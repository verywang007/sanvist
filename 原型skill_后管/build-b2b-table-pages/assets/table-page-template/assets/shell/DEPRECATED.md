# 已废弃资源说明（build-b2b-table-pages）

以下 SVG 属于**旧版"可信数据空间"Figma 浅色外壳**（主色 `#255CE9`、顶栏 56px、侧栏 240px）：

**本目录 `assets/shell/`：**
`avatar.svg`、`bell.svg`、`home.svg`、`logo-mark.svg`、`menu.svg`、`nav-icon.svg`、`separator.svg`、`settings.svg`

**上级目录 `assets/icons/`：**
`add.svg`、`calendar.svg`、`delete.svg`、`edit.svg`、`filter-collapse.svg`、`select-chevron.svg`、`sort-active.svg`、`sort-default.svg`

改造为三一 MySANY 后台（HZERO）规范后，外壳改为**深色导航**（顶栏 48px `#172742`、侧栏 220px `#1e3255`），
图标改用 `index.html` 内的**内联 SVG 雪碧图 + `currentColor`**（`.s-ico`），
以便随深浅语境自动变色、且不产生额外请求。排序箭头与复选框改为纯 CSS 绘制（`.s-sort` / `.s-check`）。

因此上述文件**已不再被任何模板引用**（可用 `grep -oE '(href|src)="[^"#][^"]*"' index.html` 验证：
模板只引用 `assets/sany-ui.css` 与 `assets/shell/shell-lock.css`）。
它们不是本次改造生成的，故予以保留而非删除；确认无其他依赖后可自行删除整组文件。

现行图标取自系统实际使用的 Material 图标名：
`menu-fold`、`expand_more`、`date_range`、`close`、`search`、`first_page`、`navigate_before`、
`navigate_next`、`last_page`、`notifications`、`apps`、`inbox`、`play_arrow`。
