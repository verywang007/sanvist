/* ==========================================================================
   本地数据源 —— 全部数据固化在本地，页面运行时不发起任何网络请求。
   内容取自登录后工作台 / 个人中心的真实页面，修改此文件即可改变页面显示。
   ========================================================================== */
window.DB = {

  /* ---------------- 账号 ---------------- */
  user: {
    name: '旺是旺旺的旺',
    phone: '133****2180',
    email: '87948985@qq.com',
    role: '设备操作手',
    created: '2026-09-08 09:27:59',
    lastLogin: '-',
  },

  tenant: {
    current: { name: '旺是旺旺的旺', type: '个人租户' },
    list: [{ name: '旺是旺旺的旺', type: '个人租户', current: true }],
  },

  /* ---------------- 左侧菜单 ----------------
     按测试环境企业租户账号实际返回的 Web 菜单排序整理（2026-10-08）。
     children 为二级菜单；无 children 的项目点击后直接进入对应页面。          */
  menu: [
    { k: 'workbench', icon: 'home', label: '工作台', path: '/standard/workbench' },
    { k: 'device', icon: 'device', label: '设备管理', path: '/standard/machine/machine' },
    { k: 'audit', icon: 'audit', label: '审核', children: [
        { k: 'audit-event', label: '审核', path: '/standard/audit/auditEvent' },
        { k: 'audit-task', label: '审核任务' },
      ] },
    { k: 'training', icon: 'training', label: '培训中心', children: [
        { k: 'training-knowledge', label: '知识库' },
      ] },
    { k: 'screen', icon: 'screen', label: '数据大屏', pro: true, path: '/standard/cloudLeasingScreen/cloudLeasingScreen' },
    { k: 'fleet-report', icon: 'report', label: '机群报表', path: '/standard/report/report-management' },
    { k: 'personnel', icon: 'personnel', label: '人员管理', pro: true, children: [
        { k: 'personnel-monitor', label: '考勤监控' },
        { k: 'personnel-stats', label: '考勤统计' },
        { k: 'personnel-detail', label: '考勤明细' },
        { k: 'personnel-config', label: '考勤配置' },
      ] },
    { k: 'project', icon: 'project', label: '项目管理', path: '/standard/project/list' },
    { k: 'monitor', icon: 'monitor', label: '监控中心', children: [
        { k: 'monitor-map', label: '地图监控', path: '/standard/monitor/map' },
        { k: 'monitor-alarm', label: '预警中心', path: '/standard/monitor/alarm' },
      ] },
    { k: 'maintain', icon: 'maintain', label: '设备保养', path: '/standard/maintenance/maintenance' },
    { k: 'repair', icon: 'repair', label: '维修管理', pro: true, children: [
        { k: 'repair-list', label: '维修列表', path: '/standard/repair/repair' },
        { k: 'repair-approval', label: '费用审批', path: '/standard/repair/costApproval' },
        { k: 'repair-parts', label: '配件管理', path: '/standard/repair/parts' },
        { k: 'repair-engineer', label: '工程师配置', path: '/standard/repair/engineer' },
        { k: 'repair-vehicle', label: '服务车配置', path: '/standard/repair/serviceVehicle' },
      ] },
    { k: 'cost', icon: 'cost', label: '费用核算', pro: true, children: [
        { k: 'cost-details', label: '费用明细', path: '/standard/costAccountingStats/costDetails' },
        { k: 'cost-workload', label: '工作量明细', path: '/standard/costAccountingStats/workloadDetails' },
        { k: 'cost-stats', label: '核算统计', path: '/standard/costAccountingStats/accountingStats' },
      ] },
    { k: 'audio-video', icon: 'video', label: '音视频服务', pro: true, children: [
        { k: 'audio-terminal', label: '终端管理', path: '/standard/audioVideo/terminal' },
      ] },
    { k: 'enterprise', icon: 'ent', label: '企业服务', children: [
        { k: 'tenant', label: '租户管理', path: '/standard/configuration/tenant' },
        { k: 'personal', label: '个人中心', path: '/standard/configuration/personal' },
        { k: 'organization', label: '组织管理', path: '/standard/configuration/organization' },
        { k: 'user-management', label: '用户管理', path: '/standard/configuration/user' },
        { k: 'role-management', label: '角色管理', path: '/standard/configuration/role' },
        { k: 'selfservice', label: '自助服务' },
      ] },
    { k: 'truck', icon: 'truck', label: '重卡车队运营', children: [
        { k: 'truck-screen', label: '运营大屏' },
        { k: 'truck-dashboard', label: '车队仪表盘' },
        { k: 'truck-analysis', label: '运营分析' },
        { k: 'truck-energy', label: '里程能耗' },
        { k: 'truck-charge', label: '充电数据' },
        { k: 'truck-fence', label: '电子围栏' },
        { k: 'truck-report', label: '车队报告' },
        { k: 'truck-driving', label: '驾驶行为' },
      ] },
    { k: 'lift-plan', icon: 'lift', label: '吊装规划', path: '/standard/liftPlanning/liftPlanning' },
  ],

  /* ---------------- 工作台：计划保养 ---------------- */
  maintain: [
    { n: 2, label: '待保养',          tone: 'red' },
    { n: 0, label: '临期保养',        tone: 'orange' },
    { n: 2, label: '正常保养',        tone: 'green' },
    { n: 0, label: '未设置保养策略',  tone: 'gray' },
  ],

  /* ---------------- 工作台：审核概览 ---------------- */
  audit: [
    { k: 'device', n: 19, fresh: 17, label: '设备异常' },
    { k: 'maint',  n: 85, fresh: 84, label: '维保事项' },
    { k: 'fuel',   n: 0,  fresh: 0,  label: '燃油异常' },
    { k: 'geo',    n: 0,  fresh: 0,  label: '位置预警' },
    { k: 'check',  n: 0,  fresh: 0,  label: '检查异常' },
  ],

  auditList: {
    device: [
      { title: '故障码 | 空滤阻塞(P072)',            fresh: true, sub: 'SY0758CC01278 · 挖掘机', time: '2026-09-28 13:12:36 (UTC+7)' },
      { title: '故障码 | HCU-电源电压过低(E001)',    fresh: true, sub: 'SY0758CC01278 · 挖掘机', time: '2026-09-27 09:51:57 (UTC+7)' },
      { title: '故障码 | 冷却水温过高(P068)',        fresh: true, sub: 'SY0758CC01278 · 挖掘机', time: '2026-09-26 16:55:41 (UTC+7)' },
    ],
    maint: [
      { title: '保养超期 | 超时保养提醒 — 已超过保养日期，超期 781h，请尽快安排保养，如需远程支持立即预约。', fresh: true, sub: 'SW956E9CFB678 · 电动装载机', time: '2026-09-27 18:52:53 (UTC+8)' },
      { title: '保养超期 | 超时保养提醒 — 已超过保养日期，超期 738h，请尽快安排保养，如需远程支持立即预约。', fresh: true, sub: 'SW956E9CFB868 · 电动装载机', time: '2026-09-27 18:52:52 (UTC+8)' },
      { title: '保养超期 | 超时保养提醒 — 已超过保养日期，超期 761h，请尽快安排保养，如需远程支持立即预约。', fresh: true, sub: 'SW956E9CFB678 · 电动装载机', time: '2026-09-26 18:56:03 (UTC+8)' },
    ],
    fuel: [], geo: [], check: [],
  },

  /* ---------------- 工作台：快速链接 ---------------- */
  quick: [
    { k: 'monitor-map',   icon: 'pin',      label: '地图监控', tone: 'amber' },
    { k: 'monitor-alarm', icon: 'warn',     label: '预警中心', tone: 'slate' },
    { k: 'maintain', icon: 'maintain', label: '设备保养', tone: 'green' },
    { k: 'project',  icon: 'project',  label: '项目管理', tone: 'blue'  },
  ],

  /* ---------------- 顶栏消息（角标 10） ---------------- */
  messages: [
    { t: '空滤阻塞(P072)',        d: 'SY0758CC01278 · 挖掘机',     time: '09-28 13:12' },
    { t: 'HCU-电源电压过低(E001)', d: 'SY0758CC01278 · 挖掘机',     time: '09-27 09:51' },
    { t: '超时保养提醒 超期 781h', d: 'SW956E9CFB678 · 电动装载机', time: '09-27 18:52' },
    { t: '超时保养提醒 超期 738h', d: 'SW956E9CFB868 · 电动装载机', time: '09-27 18:52' },
    { t: '冷却水温过高(P068)',     d: 'SY0758CC01278 · 挖掘机',     time: '09-26 16:55' },
    { t: '超时保养提醒 超期 761h', d: 'SW956E9CFB678 · 电动装载机', time: '09-26 18:56' },
    { t: '设备离线提醒',           d: 'SW956E9CFB868 · 电动装载机', time: '09-25 08:10' },
    { t: '保养计划已生成',         d: 'SW956E9CFB678 · 电动装载机', time: '09-24 17:30' },
    { t: '设备入网成功',           d: 'SY0758CC01278 · 挖掘机',     time: '09-23 11:02' },
    { t: '账号登录提醒',           d: '新设备登录',                 time: '09-22 09:28' },
  ],

  /* ---------------- 个人中心 › 通知邀请 ---------------- */
  invites: { all: 0, done: 0, todo: 0, rows: [] },

  /* ---------------- 语言 ---------------- */
  langs: ['简体中文', 'English'],

  /* ==========================================================================
     Cookie 清单 —— 「Cookie 详细信息」里按分类展示，再按主机分组
     必要 / 功能 两类是本地页面**真实使用**的存储项；
     性能 / 定向 两类本地页面并不会写入，仅作示例条目（域名用保留示例域名）。
     ========================================================================== */
  cookies: {
    ckNecessary: [
      { name: 'ms_settings', host: '第一方 Cookie', dur: '180 天', type: '第一方',
        desc: '保存你在「设置」中的选择，包括各类 Cookie 的启用状态与个性化广告开关。清除后偏好会恢复默认。' },
      { name: 'mysany_lang', host: '第一方 Cookie', dur: '180 天', type: '第一方',
        desc: '记录界面语言（简体中文 / English），使你再次访问时无需重新选择。' },
      { name: 'SESSIONID', host: '第一方 Cookie', dur: '会话结束时', type: '第一方',
        desc: '用于维持登录会话，识别当前请求属于哪个已登录用户。关闭浏览器后失效。' },
      { name: 'XSRF-TOKEN', host: '第一方 Cookie', dur: '会话结束时', type: '第一方',
        desc: '用于校验请求来源，防止跨站请求伪造（CSRF）攻击，保障账号操作安全。' },
    ],
    ckFunctional: [
      { name: 'ms_collapsed', host: '第一方 Cookie', dur: '180 天', type: '第一方',
        desc: '记住左侧菜单是展开还是折叠状态，使布局在下次访问时保持一致。' },
      { name: 'ms_open', host: '第一方 Cookie', dur: '180 天', type: '第一方',
        desc: '记住左侧菜单中哪些分组处于展开状态。' },
      { name: 'ms_route', host: '第一方 Cookie', dur: '会话结束时', type: '第一方',
        desc: '记录你最后访问的页面，刷新后可回到同一位置。' },
    ],
    ckAnalytics: [
      { name: '_stat_id', host: 'analytics.example.com', dur: '2 年', type: '第三者',
        desc: '示例条目：用于以匿名方式区分访客，统计访问量与页面浏览路径，帮助衡量并改进页面性能。' },
      { name: '_stat_ses', host: 'analytics.example.com', dur: '30 分钟', type: '第三者',
        desc: '示例条目：标识一次访问会话，用于统计单次访问内的页面停留与跳转情况。' },
      { name: '_perf_sample', host: '第一方 Cookie', dur: '1 天', type: '第一方',
        desc: '示例条目：控制性能采样比例，避免重复上报同一用户的加载耗时数据。' },
    ],
    ckAds: [
      { name: '_ad_uid', host: 'ads.example.com', dur: '1 年', type: '第三者',
        desc: '示例条目：由广告合作伙伴设置，基于浏览器与设备的唯一标识建立兴趣画像，用于展示相关推广内容。' },
      { name: '_ad_imp', host: 'ads.example.com', dur: '90 天', type: '第三者',
        desc: '示例条目：记录推广内容的展示次数，用于控制同一广告的重复展示频率。' },
      { name: '_ad_click', host: 'promo.example.com', dur: '30 天', type: '第三者',
        desc: '示例条目：记录推广内容的点击行为，用于衡量投放效果。' },
    ],
  },
};
