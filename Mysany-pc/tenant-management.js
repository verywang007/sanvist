/* ========================================================================== 
   企业服务 / 租户管理 —— 完整本地交互
   ========================================================================== */
(function () {
  'use strict';
  var DB = window.DB;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var P = function (d) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>'; };
  var ICONS = {
    home: P('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/>'),
    device: P('<path d="M4 20h16"/><path d="M6 20v-6l4-3 4 3v6"/><circle cx="17" cy="7" r="3"/><path d="m14.5 9.5-3 2.5"/>'),
    audit: P('<rect x="4" y="3" width="13" height="18" rx="2"/><path d="M8 8h6M8 12h6M8 16h4"/>'),
    training: P('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z"/>'),
    screen: P('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),
    report: P('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 16V9M12 16v-4M16 16v-6"/>'),
    personnel: P('<circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15 15.2a5 5 0 0 1 6 4.8"/>'),
    project: P('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5"/>'),
    monitor: P('<circle cx="12" cy="12" r="9"/><path d="m12 12 4-3"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/>'),
    maintain: P('<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h3"/>'),
    repair: P('<path d="M15 5a4 4 0 0 0-5.3 5.3L4 16v4h4l5.7-5.7A4 4 0 0 0 19 9"/>'),
    cost: P('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 16V10M12 16V7M17 16v-4"/>'),
    video: P('<rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3z"/><circle cx="9.5" cy="12" r="2.5"/>'),
    ent: P('<path d="M12 3 3 8l9 5 9-5z"/><path d="m5 11 7 4 7-4v6l-7 4-7-4z"/>'),
    truck: P('<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'),
    box: P('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>')
  };
  var EDIT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';
  var clone = function (v) { return JSON.parse(JSON.stringify(v)); };
  var STORE_KEY = 'ms_tenant_management_demo';
  var OWNER_KEY = 'ms_tenant_owner_id';
  var ORG_STORE_KEY = 'ms_org_management_demo';
  var TENANT_USERS = [
    { id: 'u0', name: '5656', phone: '19955665566' },
    { id: 'u1', name: '大红', phone: '1666666' },
    { id: 'u2', name: '杨大明', phone: '15673290484' },
    { id: 'u3', name: '大绿', phone: '1777777' },
    { id: 'u4', name: '测试用户导入1昵称', phone: '17610001111' },
    { id: 'u5', name: '测试aaa', phone: '176734561122' },
    { id: 'u7', name: '测试手机用户abc1', phone: '17673451222' },
    { id: 'u10', name: '大紫', phone: '1565656' },
    { id: 'u11', name: '设备管理员', phone: '13800138000' },
    { id: 'u12', name: '安全主管', phone: '13900139000' }
  ];
  var DEFAULT_DATA = {
    tenant: {
      tenantType: '企业客户', contactName: '2603181012测试客户1212', customerCode: '0214006482',
      phoneCountryCode: '385', contactPhone: '93101803', companyName: '2603181012测试客户',
      contactEmail: '9310180326icsoi@test.com', registrationNo: '1666',
      address: '2603181012测试客户详细地址', activationTime: '2026-04-16 09:32:49',
      orgCount: 4, userCount: 12, deviceCount: 233, ownerId: 'u0'
    },
    authentications: [{
      id: 'auth-1', customerName: 'EDIFICE ENGINEERING ENTERPRISE PVT. LTD', customerCode: '0214007279',
      customerCategory: '公司', customerClassification: '三一终端客户', country: '印度',
      phone: '-', email: '-', address: '-', creationDate: '2026-07-01 22:59:05'
    }]
  };
  var VERIFY_CUSTOMERS = {
    '0214007279': clone(DEFAULT_DATA.authentications[0]),
    '0214009001': { customerName: '三一示例工程有限公司', customerCode: '0214009001', customerCategory: '公司', customerClassification: '三一终端客户', country: '中国', phone: '+86 13800138000', email: 'demo@sany.com.cn', address: '湖南省长沙市经济技术开发区' },
    '0214008008': { customerName: 'GLOBAL INFRA EQUIPMENT LTD.', customerCode: '0214008008', customerCategory: '公司', customerClassification: '三一海外客户', country: '印度尼西亚', phone: '+62 8123456789', email: 'contact@globalinfra.example', address: 'Jakarta, Indonesia' }
  };
  function rootOwnerFromOrganization() {
    try {
      var organizations = JSON.parse(localStorage.getItem(ORG_STORE_KEY) || 'null');
      return Array.isArray(organizations) && organizations[0] ? organizations[0].leaderId : '';
    } catch (e) { return ''; }
  }
  function loadData() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
      if (saved && saved.tenant && Array.isArray(saved.authentications)) {
        if (!saved.tenant.ownerId) saved.tenant.ownerId = localStorage.getItem(OWNER_KEY) || rootOwnerFromOrganization() || 'u0';
        return saved;
      }
    } catch (e) { /* default */ }
    var data = clone(DEFAULT_DATA);
    data.tenant.ownerId = localStorage.getItem(OWNER_KEY) || rootOwnerFromOrganization() || data.tenant.ownerId;
    return data;
  }
  var state = {
    data: loadData(), tab: 'tenant', authPage: 1, authPageSize: 10, modal: null,
    navOpen: JSON.parse(localStorage.getItem('ms_open') || '[]'),
    navCollapsed: localStorage.getItem('ms_collapsed') === '1'
  };
  if (state.navOpen.indexOf('enterprise') < 0) state.navOpen.push('enterprise');
  localStorage.setItem(OWNER_KEY, state.data.tenant.ownerId || 'u0');
  function saveData() { localStorage.setItem(STORE_KEY, JSON.stringify(state.data)); }
  function findTenantUser(id) { return TENANT_USERS.find(function (u) { return u.id === id; }) || TENANT_USERS[0]; }
  function syncRootOwner(ownerId) {
    localStorage.setItem(OWNER_KEY, ownerId);
    try {
      var organizations = JSON.parse(localStorage.getItem(ORG_STORE_KEY) || 'null');
      if (Array.isArray(organizations) && organizations[0]) {
        organizations[0].leaderId = ownerId;
        localStorage.setItem(ORG_STORE_KEY, JSON.stringify(organizations));
      }
    } catch (e) { /* organization page will read OWNER_KEY */ }
  }
  function nowText() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
  }
  function toast(msg, kind) {
    var el = document.createElement('div'); el.className = 'toast ' + (kind || 'ok'); el.innerHTML = '<span>' + esc(msg) + '</span>';
    $('#toasts').appendChild(el); setTimeout(function () { el.remove(); }, 2600);
  }

  /* ---------------- 主导航 ---------------- */
  function renderMenu() {
    $('#menu').innerHTML = DB.menu.map(function (m) {
      var kids = m.children || null, isOpen = state.navOpen.indexOf(m.k) > -1;
      var childOn = kids && kids.some(function (c) { return c.k === 'tenant'; });
      var row = '<div class="mi" data-nav="' + esc(m.k) + '" data-group="' + (kids ? '1' : '0') + '">' + (m.pro ? '<i class="mi-pro">PRO</i>' : '') + '<span class="mi-ico">' + (ICONS[m.icon] || ICONS.box) + '</span><span class="mi-lb">' + esc(m.label) + '</span>' + (kids ? '<svg class="mi-arw" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg>' : '') + '</div>';
      if (!kids) return row;
      var sub = kids.map(function (c) { return '<div class="si' + (c.k === 'tenant' ? ' on' : '') + '" data-route="' + esc(c.k) + '">' + esc(c.label) + '</div>'; }).join('');
      return '<div class="grp' + (isOpen ? ' open' : '') + (childOn ? ' has-on' : '') + '" data-g="' + esc(m.k) + '">' + row + '<div class="sub">' + sub + '</div></div>';
    }).join('');
  }
  function goToRoute(k) {
    if (k === 'tenant') return;
    if (k === 'organization') { location.href = '企业服务-组织管理.html'; return; }
    if (k === 'user-management') { location.href = '企业服务-用户管理.html'; return; }
    if (k === 'role-management') { location.href = '企业服务-角色管理.html'; return; }
    localStorage.setItem('ms_route', k); location.href = '工作台.html';
  }
  $('#menu').addEventListener('click', function (e) {
    var sub = e.target.closest('.si'); if (sub) { goToRoute(sub.dataset.route); return; }
    var row = e.target.closest('.mi'); if (!row) return; var key = row.dataset.nav;
    if (row.dataset.group === '1') {
      if (state.navCollapsed) return; var i = state.navOpen.indexOf(key); if (i > -1) state.navOpen.splice(i, 1); else state.navOpen.push(key);
      localStorage.setItem('ms_open', JSON.stringify(state.navOpen)); renderMenu();
    } else goToRoute(key);
  });
  var fly = $('#flyout'), flyTimer;
  function hideFly() { flyTimer = setTimeout(function () { fly.hidden = true; }, 150); }
  $('#menu').addEventListener('mouseover', function (e) {
    if (!state.navCollapsed) return; var row = e.target.closest('.mi'); if (!row) return; clearTimeout(flyTimer);
    var m = DB.menu.find(function (x) { return x.k === row.dataset.nav; }); if (!m) return; var kids = m.children || [];
    fly.innerHTML = (kids.length ? '<div class="ft">' + esc(m.label) + '</div>' : '') + (kids.length ? kids.map(function (c) { return '<div class="fi' + (c.k === 'tenant' ? ' on' : '') + '" data-route="' + esc(c.k) + '">' + esc(c.label) + '</div>'; }).join('') : '<div class="fi" data-route="' + esc(m.k) + '">' + esc(m.label) + '</div>');
    fly.hidden = false; var r = row.getBoundingClientRect(); fly.style.top = Math.max(54, Math.min(r.top, innerHeight - fly.offsetHeight - 8)) + 'px';
  });
  $('#menu').addEventListener('mouseleave', hideFly); fly.addEventListener('mouseenter', function () { clearTimeout(flyTimer); }); fly.addEventListener('mouseleave', hideFly);
  fly.addEventListener('click', function (e) { var i = e.target.closest('.fi'); if (i) goToRoute(i.dataset.route); });
  function applyCollapsed() { document.body.classList.toggle('collapsed', state.navCollapsed); localStorage.setItem('ms_collapsed', state.navCollapsed ? '1' : '0'); }
  $('#toggle').addEventListener('click', function () { state.navCollapsed = !state.navCollapsed; applyCollapsed(); fly.hidden = true; });

  /* ---------------- 顶栏 ---------------- */
  function closeTopPop() { $$('.tn-top-pop').forEach(function (p) { p.remove(); }); }
  function topPop(host, html, width) {
    closeTopPop(); var p = document.createElement('div'); p.className = 'tn-top-pop'; p.innerHTML = html; if (width) p.style.width = width + 'px'; document.body.appendChild(p);
    var r = host.getBoundingClientRect(); p.style.top = (r.bottom - 2) + 'px'; p.style.left = Math.max(8, r.right - p.offsetWidth) + 'px'; p.addEventListener('click', function (e) { e.stopPropagation(); }); return p;
  }
  $('#tn-bell').addEventListener('click', function (e) { e.stopPropagation(); toast('暂无新的租户管理通知', 'info'); });
  $('#tn-language').addEventListener('click', function (e) { e.stopPropagation(); topPop(this, '<button type="button">简体中文</button><button type="button">English</button>', 150); });
  $('#tn-tenant').addEventListener('click', function (e) { e.stopPropagation(); topPop(this, '<div class="pop-title">当前租户</div><button type="button">2603181012测试客户</button>', 220); });
  $('#tn-user').addEventListener('click', function (e) {
    e.stopPropagation(); var p = topPop(this, '<button type="button" data-top="personal">个人中心</button><button type="button" data-top="workbench">返回工作台</button><button type="button" data-top="logout">退出登录</button>', 150);
    p.addEventListener('click', function (ev) { var b = ev.target.closest('[data-top]'); if (!b) return; if (b.dataset.top === 'logout') location.href = '登录.html'; else goToRoute(b.dataset.top === 'personal' ? 'personal' : 'workbench'); });
  });
  document.addEventListener('click', closeTopPop);

  /* ---------------- 页面渲染 ---------------- */
  function infoItem(label, value) { return '<div class="tn-info-item"><div class="tn-info-label">' + esc(label) + '</div><div class="tn-info-value">' + esc(value || '-') + '</div></div>'; }
  function countIcon(type) {
    if (type === 'org') return '<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="15" r="9" fill="#69A9FF"/><circle cx="15" cy="45" r="9" fill="#2F78E7"/><circle cx="49" cy="45" r="9" fill="#82BEFF"/><path d="M32 24v8M20 41l12-9 12 9" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>';
    if (type === 'user') return '<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="21" r="13" fill="#67A7FF"/><path d="M10 57c2-15 11-22 22-22s20 7 22 22" fill="#397FEA"/><circle cx="46" cy="24" r="9" fill="#8DC5FF" opacity=".75"/></svg>';
    return '<svg viewBox="0 0 64 64" fill="none"><rect x="7" y="7" width="50" height="50" rx="15" fill="#9ED5FF"/><path d="m22 19 8 8-5 5-8-8a12 12 0 0 0 14 14l12 12 7-7-12-12a12 12 0 0 0-16-12z" fill="#fff"/></svg>';
  }
  function renderTenant() {
    var t = state.data.tenant, owner = findTenantUser(t.ownerId);
    var info = infoItem('租户类型', t.tenantType) + infoItem('联系人姓名', t.contactName) + infoItem('客户编码', t.customerCode) +
      infoItem('联系人手机号', '+' + t.phoneCountryCode + ' ' + t.contactPhone) + infoItem('企业名称', t.companyName) + infoItem('联系人邮箱', t.contactEmail) +
      infoItem('企业注册号', t.registrationNo) + infoItem('注册地址', t.address) + infoItem('开通时间', t.activationTime);
    var counts = [
      { label: '组织数量', value: t.orgCount, icon: 'org' }, { label: '用户数量', value: t.userCount, icon: 'user' }, { label: '设备数量', value: t.deviceCount, icon: 'device' }
    ].map(function (c) { return '<div class="tn-count-card"><div><div class="tn-count-label">' + c.label + '</div><div class="tn-count-value">' + c.value + '</div></div><div class="tn-count-icon">' + countIcon(c.icon) + '</div></div>'; }).join('');
    var ownerHtml = '<div class="tn-owner-block"><div class="tn-owner-head"><div class="tn-info-label">租户负责人</div><button class="tn-link" type="button" data-transfer-tenant-owner>转让</button></div><div class="tn-owner-inline"><span class="tn-owner-name">' + esc(owner.name) + '</span><span class="tn-owner-divider" aria-hidden="true"></span><span>' + esc(owner.phone || '-') + '</span></div></div>';
    $('#tenant-content').innerHTML = '<section><div class="tn-section-head"><h1>租户基础信息</h1><button class="tn-edit-contact" type="button" data-edit-contact>' + EDIT_ICON + '编辑联系人信息</button></div><div class="tn-info-card"><div class="tn-info-grid">' + info + ownerHtml + '</div></div><div class="tn-count-grid">' + counts + '</div></section>';
  }
  function authRows() {
    var start = (state.authPage - 1) * state.authPageSize;
    return state.data.authentications.slice(start, start + state.authPageSize);
  }
  function renderAuthPagination() {
    var total = state.data.authentications.length, count = Math.max(1, Math.ceil(total / state.authPageSize)), buttons = '';
    for (var i = 1; i <= count; i++) buttons += '<button class="tn-page-btn' + (i === state.authPage ? ' active' : '') + '" type="button" data-auth-page="' + i + '">' + i + '</button>';
    return '<div class="tn-pagination"><span>' + total + ' 条记录</span><button class="tn-page-btn" type="button" data-auth-prev ' + (state.authPage <= 1 ? 'disabled' : '') + '>‹</button>' + buttons + '<button class="tn-page-btn" type="button" data-auth-next ' + (state.authPage >= count ? 'disabled' : '') + '>›</button><select class="tn-page-size" data-auth-size><option value="10"' + (state.authPageSize === 10 ? ' selected' : '') + '>10 条/页</option><option value="20"' + (state.authPageSize === 20 ? ' selected' : '') + '>20 条/页</option><option value="50"' + (state.authPageSize === 50 ? ' selected' : '') + '>50 条/页</option></select></div>';
  }
  function renderAuth() {
    var total = state.data.authentications.length;
    var rows = authRows().map(function (r) { return '<tr><td title="' + esc(r.customerName) + '">' + esc(r.customerName) + '</td><td>' + esc(r.customerCode) + '</td><td><span class="tn-tag">' + esc(r.customerCategory) + '</span></td><td>' + esc(r.country) + '</td><td>' + esc(r.creationDate) + '</td><td class="tn-action-cell"><button class="tn-link" type="button" data-view-auth="' + esc(r.id) + '">查看</button><button class="tn-link" type="button" data-delete-auth="' + esc(r.id) + '">删除</button></td></tr>'; }).join('');
    if (!rows) rows = '<tr class="tn-empty"><td colspan="6">无结果</td></tr>';
    $('#tenant-content').innerHTML = '<section class="auth-overview"><div class="auth-count-card"><div class="auth-title">客户认证概览</div><div class="auth-count-circle"><div class="auth-count-number">' + total + '</div><div class="auth-count-label">已认证客户数</div></div></div>' +
      '<div class="auth-help-card"><div class="auth-help-title"><span class="auth-help-icon">!</span>什么是客户认证？</div><div class="auth-help-block"><strong>什么是客户认证？</strong><div>客户认证用于关联您在三一体系中的客户编码和设备资产。</div></div><div class="auth-help-block"><strong>为什么需要客户认证？</strong><ul><li>快速批量绑定：认证后可以批量绑定该客户编号下的所有设备</li><li>自动匹配设备：系统自动识别该客户编号下未绑定的设备</li><li>简化操作流程：无需逐台输入设备编号</li></ul></div><div class="auth-help-block"><strong>支持多个客户编号吗？</strong><div>支持。如果您使用多个企业主体向三一采购设备，可以添加多个客户编号进行认证。</div></div><div class="auth-help-block"><strong>认证需要多久？</strong><div>认证是即时的。客户编号有效时，提交后立即完成认证，无需等待审核。</div></div></div></section>' +
      '<section class="auth-list"><div class="auth-list-head"><h2>客户编码列表</h2><button class="tn-btn primary" type="button" data-add-auth>添加客户认证</button></div><div class="tn-table-wrap"><div class="tn-table-scroll"><table class="tn-table"><thead><tr><th style="width:25%">客户名称</th><th style="width:15%">客户编码</th><th style="width:13%">客户类别</th><th style="width:16%">国家/地区</th><th style="width:18%">认证时间</th><th class="tn-action-cell">操作</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>' + renderAuthPagination() + '</section>';
  }
  function renderPage() {
    $$('.tenant-tab').forEach(function (b) { var active = b.dataset.tenantTab === state.tab; b.classList.toggle('active', active); b.setAttribute('aria-selected', String(active)); });
    if (state.tab === 'tenant') renderTenant(); else renderAuth();
  }
  $('#tenant-tabs').addEventListener('click', function (e) { var b = e.target.closest('[data-tenant-tab]'); if (!b) return; state.tab = b.dataset.tenantTab; renderPage(); });
  $('#tenant-content').addEventListener('click', function (e) {
    if (e.target.closest('[data-transfer-tenant-owner]')) openTransferTenantOwner();
    else if (e.target.closest('[data-edit-contact]')) openEditContact();
    else if (e.target.closest('[data-add-auth]')) openAddAuth();
    else if (e.target.closest('[data-view-auth]')) openAuthDetail(e.target.closest('[data-view-auth]').dataset.viewAuth);
    else if (e.target.closest('[data-delete-auth]')) openDeleteAuth(e.target.closest('[data-delete-auth]').dataset.deleteAuth);
    else if (e.target.closest('[data-auth-page]')) { state.authPage = Number(e.target.closest('[data-auth-page]').dataset.authPage); renderAuth(); }
    else if (e.target.closest('[data-auth-prev]')) { state.authPage = Math.max(1, state.authPage - 1); renderAuth(); }
    else if (e.target.closest('[data-auth-next]')) { state.authPage += 1; renderAuth(); }
  });
  $('#tenant-content').addEventListener('change', function (e) { if (e.target.matches('[data-auth-size]')) { state.authPageSize = Number(e.target.value); state.authPage = 1; renderAuth(); } });

  /* ---------------- 弹窗 ---------------- */
  function closeModal() { state.modal = null; $('#tenant-modal-root').innerHTML = ''; }
  function openEditContact() { state.modal = { type: 'edit-contact' }; renderModal(); }
  function openTransferTenantOwner() { state.modal = { type: 'transfer-owner' }; renderModal(); }
  function openAddAuth() { state.modal = { type: 'add-auth', codeInput: '', verified: null, error: '', ok: '' }; renderModal(); }
  function findAuth(id) { return state.data.authentications.find(function (a) { return a.id === id; }); }
  function openAuthDetail(id) { state.modal = { type: 'auth-detail', id: id }; renderModal(); }
  function openDeleteAuth(id) { state.modal = { type: 'delete-auth', id: id }; renderModal(); }
  function modalShell(cls, title, body, foot) {
    return '<div class="tn-mask"><div class="tn-modal ' + (cls || '') + '" role="dialog" aria-modal="true"><div class="tn-modal-head"><h3>' + esc(title) + '</h3><button class="tn-modal-close" type="button" data-tn-close aria-label="关闭">×</button></div><div class="tn-modal-body">' + body + '</div><div class="tn-modal-foot">' + foot + '</div></div></div>';
  }
  function editContactHtml() {
    var t = state.data.tenant;
    var body = '<div class="tn-form-row"><label class="required" for="tn-contact-name">联系人姓名</label><input class="tn-field" id="tn-contact-name" placeholder="请输入联系人姓名" value="' + esc(t.contactName) + '"><div class="tn-field-error" data-error="name"></div></div>' +
      '<div class="tn-form-row"><label class="required">联系人手机号</label><div class="tn-phone-group"><select id="tn-phone-code"><option value="86"' + (t.phoneCountryCode === '86' ? ' selected' : '') + '>+86 中国</option><option value="385"' + (t.phoneCountryCode === '385' ? ' selected' : '') + '>+385 克罗地亚</option><option value="62"' + (t.phoneCountryCode === '62' ? ' selected' : '') + '>+62 印度尼西亚</option><option value="91"' + (t.phoneCountryCode === '91' ? ' selected' : '') + '>+91 印度</option></select><input class="tn-field" id="tn-contact-phone" placeholder="请输入联系人手机号" value="' + esc(t.contactPhone) + '"></div><div class="tn-field-error" data-error="phone"></div></div>' +
      '<div class="tn-form-row"><label class="required" for="tn-contact-email">联系人邮箱</label><input class="tn-field" id="tn-contact-email" placeholder="请输入联系人邮箱" value="' + esc(t.contactEmail) + '"><div class="tn-field-error" data-error="email"></div></div>';
    return modalShell('edit-contact', '编辑联系人信息', body, '<button class="tn-btn" type="button" data-tn-close>取消</button><button class="tn-btn primary" type="button" data-save-contact>保存</button>');
  }
  function transferOwnerHtml() {
    var current = findTenantUser(state.data.tenant.ownerId);
    var options = TENANT_USERS.filter(function (u) { return u.id !== current.id; }).map(function (u) { return '<option value="' + esc(u.id) + '">' + esc(u.name + (u.phone && u.phone !== '-' ? '（' + u.phone + '）' : '')) + '</option>'; }).join('');
    var body = '<div class="tn-form-row"><label>当前负责人</label><div class="tn-owner-panel"><span class="tn-owner-name">' + esc(current.name) + '</span><span class="tn-owner-divider" aria-hidden="true"></span><span>' + esc(current.phone || '-') + '</span></div></div>' +
      '<div class="tn-form-row"><label class="required" for="tn-new-owner">新负责人</label><select id="tn-new-owner"><option value="">请选择新负责人</option>' + options + '</select><div class="tn-field-error" data-error="owner"></div></div>' +
      '<div class="tn-owner-note">租户负责人转让后，根组织负责人将同步更新为新负责人。</div>';
    return modalShell('', '转让租户负责人', body, '<button class="tn-btn" type="button" data-tn-close>取消</button><button class="tn-btn primary" type="button" data-confirm-owner-transfer>确认转让</button>');
  }
  function detailGrid(items) { return '<div class="tn-detail-card"><div class="tn-detail-grid">' + items.map(function (i) { return infoItem(i[0], i[1]); }).join('') + '</div></div>'; }
  function authDetailHtml() {
    var a = findAuth(state.modal.id); if (!a) return '';
    var body = '<div class="tn-detail-title">客户基础信息</div>' + detailGrid([['客户名称', a.customerName], ['客户编码', a.customerCode], ['客户类别', a.customerCategory], ['客户分类', a.customerClassification], ['国家/地区', a.country], ['电话', a.phone], ['邮箱', a.email], ['地址', a.address]]) + '<div class="tn-detail-title">认证信息</div>' + detailGrid([['认证时间', a.creationDate]]);
    return modalShell('detail-modal', '客户编号详情', body, '<button class="tn-btn" type="button" data-tn-close>关闭</button>');
  }
  function deleteAuthHtml() {
    var a = findAuth(state.modal.id); if (!a) return '';
    var body = '<div class="tn-delete-copy">删除客户编号 <strong>' + esc(a.customerCode) + '</strong> 后将产生以下影响：<ul><li>您将无法使用该客户编号进行设备批量绑定</li><li>已绑定的设备不受影响，仍可正常访问</li><li>删除操作不可撤销</li></ul></div>';
    return modalShell('delete-modal', '删除客户编号', body, '<button class="tn-btn" type="button" data-tn-close>取消</button><button class="tn-btn danger" type="button" data-confirm-delete-auth>删除</button>');
  }
  function verifiedCard(a) { return '<div class="tn-verify-card"><div class="tn-verify-grid">' + [['客户名称', a.customerName], ['客户编码', a.customerCode], ['客户类别', a.customerCategory], ['客户分类', a.customerClassification], ['国家/地区', a.country], ['电话', a.phone], ['邮箱', a.email], ['地址', a.address]].map(function (i) { return infoItem(i[0], i[1]); }).join('') + '</div></div>'; }
  function addAuthHtml() {
    var m = state.modal;
    var body = '<div class="tn-info-tip"><i>!</i>请输入完整的客户编号，系统将自动验证其有效性</div><div class="tn-verify-row"><div class="tn-form-row"><label class="required" for="tn-auth-code">客户编码</label><input class="tn-field' + (m.error ? ' bad' : '') + '" id="tn-auth-code" placeholder="请输入D365客户编码" value="' + esc(m.codeInput) + '"></div><button class="tn-btn" type="button" data-verify-auth>验证</button></div>' +
      (m.error ? '<div class="tn-verify-msg err">● ' + esc(m.error) + '</div>' : m.ok ? '<div class="tn-verify-msg ok">● ' + esc(m.ok) + '</div>' : '') + (m.verified ? verifiedCard(m.verified) : '');
    return modalShell('', '添加客户认证', body, '<button class="tn-btn" type="button" data-tn-close>取消</button><button class="tn-btn primary" type="button" data-submit-auth>提交认证</button>');
  }
  function renderModal() {
    if (!state.modal) { $('#tenant-modal-root').innerHTML = ''; return; }
    var html = state.modal.type === 'edit-contact' ? editContactHtml() : state.modal.type === 'transfer-owner' ? transferOwnerHtml() : state.modal.type === 'add-auth' ? addAuthHtml() : state.modal.type === 'auth-detail' ? authDetailHtml() : deleteAuthHtml();
    $('#tenant-modal-root').innerHTML = html; var first = $('#tenant-modal-root input, #tenant-modal-root select'); if (first) setTimeout(function () { first.focus(); }, 20);
  }
  function saveContact() {
    var name = $('#tn-contact-name').value.trim(), code = $('#tn-phone-code').value, phone = $('#tn-contact-phone').value.trim(), email = $('#tn-contact-email').value.trim(), valid = true;
    $$('[data-error]').forEach(function (e) { e.textContent = ''; }); $$('.tn-field.bad').forEach(function (e) { e.classList.remove('bad'); });
    if (!name) { $('[data-error="name"]').textContent = '请输入联系人姓名'; $('#tn-contact-name').classList.add('bad'); valid = false; }
    if (!code || !phone) { $('[data-error="phone"]').textContent = '请完整填写联系人手机号'; $('#tn-contact-phone').classList.add('bad'); valid = false; }
    if (!email) { $('[data-error="email"]').textContent = '请输入联系人邮箱'; $('#tn-contact-email').classList.add('bad'); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { $('[data-error="email"]').textContent = '请输入正确的邮箱地址'; $('#tn-contact-email').classList.add('bad'); valid = false; }
    if (!valid) return;
    Object.assign(state.data.tenant, { contactName: name, phoneCountryCode: code, contactPhone: phone, contactEmail: email }); saveData(); closeModal(); renderTenant(); toast('联系人信息已保存');
  }
  function verifyAuthCode() {
    var input = $('#tn-auth-code').value.trim(), data = VERIFY_CUSTOMERS[input]; state.modal.codeInput = input; state.modal.verified = null; state.modal.ok = '';
    if (!input) state.modal.error = '请输入D365客户编码';
    else if (!data) state.modal.error = '未查询到有效的客户信息';
    else { state.modal.error = ''; state.modal.verified = clone(data); state.modal.ok = '客户编码有效'; }
    renderModal();
  }
  function submitAuth() {
    var input = $('#tn-auth-code').value.trim(); state.modal.codeInput = input;
    if (!state.modal.verified || state.modal.verified.customerCode !== input) { state.modal.error = '请先验证客户编码'; state.modal.ok = ''; renderModal(); return; }
    if (state.data.authentications.some(function (a) { return a.customerCode === input; })) { state.modal.error = '该客户编码已完成认证'; state.modal.ok = ''; renderModal(); return; }
    var record = clone(state.modal.verified); record.id = 'auth-' + Date.now(); record.creationDate = nowText();
    state.data.authentications.unshift(record); saveData(); state.authPage = 1; closeModal(); renderAuth(); toast('客户认证添加成功');
  }
  $('#tenant-modal-root').addEventListener('click', function (e) {
    if (e.target.closest('[data-tn-close]')) { closeModal(); return; }
    if (e.target.closest('[data-save-contact]')) { saveContact(); return; }
    if (e.target.closest('[data-confirm-owner-transfer]')) {
      var ownerSelect = $('#tn-new-owner'), ownerId = ownerSelect.value;
      if (!ownerId) { ownerSelect.classList.add('bad'); $('[data-error="owner"]').textContent = '请选择新负责人'; return; }
      var owner = findTenantUser(ownerId); state.data.tenant.ownerId = ownerId; saveData(); syncRootOwner(ownerId); closeModal(); renderTenant(); toast('租户负责人已转让给“' + owner.name + '”'); return;
    }
    if (e.target.closest('[data-verify-auth]')) { verifyAuthCode(); return; }
    if (e.target.closest('[data-submit-auth]')) { submitAuth(); return; }
    if (e.target.closest('[data-confirm-delete-auth]')) {
      var id = state.modal.id; state.data.authentications = state.data.authentications.filter(function (a) { return a.id !== id; }); saveData(); closeModal(); state.authPage = 1; renderAuth(); toast('客户认证已删除');
    }
  });
  $('#tenant-modal-root').addEventListener('input', function (e) { if (e.target.id === 'tn-auth-code') state.modal.codeInput = e.target.value; });
  $('#tenant-modal-root').addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.id === 'tn-auth-code') { e.preventDefault(); verifyAuthCode(); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && state.modal) closeModal(); });

  applyCollapsed(); renderMenu(); renderPage();
})();
