# 已废弃资源说明

本目录下的以下 SVG 属于**旧版"可信数据空间"Figma 浅色外壳**（主色 `#255CE9`、顶栏 56px、侧栏 240px）：

- `home.svg`
- `settings.svg`
- `bell.svg`
- `avatar.svg`
- `separator.svg`

三一后台管理平台（MySANY / HZERO）改造后，外壳改为**深色导航**（顶栏 48px `#172742`、侧栏 220px `#1e3255`），
图标改用**内联 SVG + `currentColor`**（见 `sany-ui.css` 的 `.s-ico`，以及模板中的 `<symbol>` 雪碧图），
以便随深色/浅色语境自动改变颜色，且不产生额外请求。

因此上述文件**已不再被任何模板引用**。它们不是本次改造生成的，故予以保留而非删除；
确认无其他依赖后可自行删除整组文件。

现行图标取自系统实际使用的 Material 图标名：
`menu-fold`、`expand_more`、`date_range`、`close`、`search`、`arrow_drop_down`、
`first_page`、`navigate_before`、`navigate_next`、`last_page`、`arrow_back`、`notifications`。
