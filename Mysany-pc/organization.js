/* ========================================================================== 
   企业服务 / 组织管理 —— 完整本地交互
   数据仅保存在 localStorage，不发起网络请求。
   ========================================================================== */
(function () {
  'use strict';

  var DB = window.DB;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  }); };
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
  var I = {
    chevron: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M7 6l1 14h8l1-14"/></svg>'
  };

  var CURRENT_USER_ID = 'u0';
  var USERS = [
    { id: 'u0', name: '5656', phone: '19955665566', email: 'iii@qq.com', roles: ['超级管理员'] },
    { id: 'u1', name: '大红', phone: '1666666', email: '-', roles: ['维修工'] },
    { id: 'u2', name: '杨大明', phone: '15673290484', email: '-', roles: ['管理员'] },
    { id: 'u3', name: '大绿', phone: '1777777', email: '-', roles: ['维修工'] },
    { id: 'u4', name: '测试用户导入1昵称', phone: '17610001111', email: '-', roles: ['维修工'] },
    { id: 'u5', name: '测试aaa', phone: '176734561122', email: '-', roles: ['车队长'] },
    { id: 'u6', name: '测试手动新增邮箱用户45665', phone: '-', email: '84715555@qq.com', roles: ['车队长'] },
    { id: 'u7', name: '测试手机用户abc1', phone: '17673451222', email: '847189111@qq.com', roles: ['管理员'] },
    { id: 'u8', name: '测试邮箱用户abc1', phone: '-', email: '847189223@qq.com', roles: ['管理员'] },
    { id: 'u9', name: 'xhh', phone: '-', email: 'xhh@qq.com', roles: ['管理员'] },
    { id: 'u10', name: '大紫', phone: '1565656', email: '-', roles: ['机手'] },
    { id: 'u11', name: '设备管理员', phone: '13800138000', email: 'device@test.com', roles: ['设备管理员'] },
    { id: 'u12', name: '安全主管', phone: '13900139000', email: 'safe@test.com', roles: ['安全主管', '管理员'] }
  ];

  var DEVICES = [
    { id: 'd1', code: 'SY007CBHC0908', model: '挖掘机' },
    { id: 'd2', code: 'HPGJ1041000683', model: '搅拌车' },
    { id: 'd3', code: 'AC0130CD0002', model: '全路面起重机' },
    { id: 'd4', code: 'AC0160CC0541', model: '全路面起重机' },
    { id: 'd5', code: 'TNEST202607232146', model: '搅拌车' },
    { id: 'd6', code: 'SY0076CC07218', model: '汽车起重机' },
    { id: 'd7', code: 'SFT0200CD1135', model: '塔机' },
    { id: 'd8', code: 'SY013NCC18558', model: '挖掘机' },
    { id: 'd9', code: 'SR285CCF19518', model: '旋挖钻机' },
    { id: 'd10', code: 'TH1056CC0001', model: '伸缩臂叉车' },
    { id: 'd11', code: 'SY036BBG15578', model: '挖掘机' },
    { id: 'd12', code: 'KT090SE20279', model: '矿用宽体自卸车' },
    { id: 'd13', code: 'SW956E9CFB678', model: '电动装载机' },
    { id: 'd14', code: 'SW956E9CFB868', model: '电动装载机' },
    { id: 'd15', code: 'SY0758CC01278', model: '挖掘机' },
    { id: 'd16', code: 'SYM5350THB', model: '泵车' },
    { id: 'd17', code: 'SSR120AC0001', model: '压路机' },
    { id: 'd18', code: 'SAG200C0008', model: '平地机' }
  ];

  var DEFAULT_ORGS = [{
    id: 'root', name: '2603181012测试客户', code: '-', parentId: null,
    creatorId: 'u0', leaderId: 'u0', description: '-', root: true,
    members: [
      { userId: 'u3', joined: '2026-05-07' }, { userId: 'u4', joined: '2026-05-09' },
      { userId: 'u5', joined: '2026-05-09' }, { userId: 'u6', joined: '2026-05-09' },
      { userId: 'u7', joined: '2026-05-09' }, { userId: 'u8', joined: '2026-05-09' },
      { userId: 'u9', joined: '2026-05-14' }
    ], devices: [], deviceDates: {}, children: [
      { id: 'org-1', name: '测试组织1', code: 'MYSANY20260507000142', parentId: 'root', creatorId: 'u1', leaderId: 'u1', description: '-', members: [
        { userId: 'u1', joined: '2026-05-07' }, { userId: 'u2', joined: '2026-05-08' }
      ], devices: ['d1', 'd2'], deviceDates: { d1: '2026-06-04', d2: '2026-06-04' }, children: [] },
      { id: 'org-2', name: '测试组织2', code: 'MYSANY20260507000143', parentId: 'root', creatorId: 'u10', leaderId: 'u10', description: '-', members: [
        { userId: 'u1', joined: '2026-05-07' }, { userId: 'u2', joined: '2026-05-08' }
      ], devices: ['d13'], deviceDates: { d13: '2026-06-05' }, children: [] },
      { id: 'org-3', name: 'aa', code: 'MYSANY20260605000201', parentId: 'root', creatorId: 'u4', leaderId: 'u4', description: '-', members: [
        { userId: 'u10', joined: '2026-05-07' }
      ], devices: [], deviceDates: {}, children: [] }
    ]
  }];

  var STORE_KEY = 'ms_org_management_demo';
  var TENANT_OWNER_KEY = 'ms_tenant_owner_id';
  var clone = function (v) { return JSON.parse(JSON.stringify(v)); };
  function normalizeOrganizations(nodes) {
    (nodes || []).forEach(function (node) {
      node.children = node.children || [];
      node.members = node.members || [];
      node.devices = node.devices || [];
      node.deviceDates = node.deviceDates || {};
      if (!node.creatorId) node.creatorId = node.root ? CURRENT_USER_ID : (node.leaderId || CURRENT_USER_ID);
      if (!node.leaderId) node.leaderId = node.creatorId;
      if (node.root && localStorage.getItem(TENANT_OWNER_KEY)) node.leaderId = localStorage.getItem(TENANT_OWNER_KEY);
      normalizeOrganizations(node.children);
    });
    return nodes;
  }
  function loadOrganizations() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
      if (Array.isArray(saved) && saved.length) return normalizeOrganizations(saved);
    } catch (e) { /* use defaults */ }
    return normalizeOrganizations(clone(DEFAULT_ORGS));
  }

  var state = {
    organizations: loadOrganizations(),
    selectedId: 'root',
    expanded: new Set(['root']),
    treeSearch: '',
    tab: 'members',
    memberSelection: new Set(),
    deviceSelection: new Set(),
    memberPage: 1,
    memberPageSize: 10,
    devicePage: 1,
    devicePageSize: 10,
    modal: null,
    navOpen: JSON.parse(localStorage.getItem('ms_open') || '[]'),
    navCollapsed: localStorage.getItem('ms_collapsed') === '1'
  };
  if (state.navOpen.indexOf('enterprise') < 0) state.navOpen.push('enterprise');

  function saveOrganizations() { localStorage.setItem(STORE_KEY, JSON.stringify(state.organizations)); }
  function today() {
    var d = new Date();
    return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
  }
  function findUser(id) { return USERS.find(function (u) { return u.id === id; }); }
  function findDevice(id) { return DEVICES.find(function (d) { return d.id === id; }); }
  function findNode(id, nodes) {
    nodes = nodes || state.organizations;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) return nodes[i];
      var found = findNode(id, nodes[i].children || []);
      if (found) return found;
    }
    return null;
  }
  function findParentNode(id, nodes, parent) {
    nodes = nodes || state.organizations;
    parent = parent || null;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) return parent;
      var found = findParentNode(id, nodes[i].children || [], nodes[i]);
      if (found) return found;
    }
    return null;
  }
  function selectedNode() { return findNode(state.selectedId) || state.organizations[0]; }
  function ownerUser(node) { return findUser(node.leaderId) || findUser(node.creatorId) || findUser(CURRENT_USER_ID); }
  function toast(msg, kind) {
    var el = document.createElement('div');
    el.className = 'toast ' + (kind || 'ok');
    el.innerHTML = '<span>' + esc(msg) + '</span>';
    $('#toasts').appendChild(el);
    setTimeout(function () { el.remove(); }, 2600);
  }

  /* ---------------- 主导航 ---------------- */
  function renderMenu() {
    $('#menu').innerHTML = DB.menu.map(function (m) {
      var kids = m.children || null;
      var isOpen = state.navOpen.indexOf(m.k) > -1;
      var childOn = kids && kids.some(function (c) { return c.k === 'organization'; });
      var selfOn = !kids && m.k === 'organization';
      var row = '<div class="mi' + (selfOn ? ' on' : '') + '" data-nav="' + esc(m.k) + '" data-group="' + (kids ? '1' : '0') + '">' +
        (m.pro ? '<i class="mi-pro">PRO</i>' : '') +
        '<span class="mi-ico">' + (ICONS[m.icon] || ICONS.box) + '</span>' +
        '<span class="mi-lb">' + esc(m.label) + '</span>' +
        (kids ? '<svg class="mi-arw" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg>' : '') + '</div>';
      if (!kids) return row;
      var sub = kids.map(function (c) {
        return '<div class="si' + (c.k === 'organization' ? ' on' : '') + '" data-route="' + esc(c.k) + '">' + esc(c.label) + '</div>';
      }).join('');
      return '<div class="grp' + (isOpen ? ' open' : '') + (childOn ? ' has-on' : '') + '" data-g="' + esc(m.k) + '">' + row + '<div class="sub">' + sub + '</div></div>';
    }).join('');
  }
  function goToRoute(k) {
    if (k === 'organization') return;
    if (k === 'tenant') { location.href = '企业服务-租户管理.html'; return; }
    if (k === 'user-management') { location.href = '企业服务-用户管理.html'; return; }
    if (k === 'role-management') { location.href = '企业服务-角色管理.html'; return; }
    localStorage.setItem('ms_route', k);
    location.href = '工作台.html';
  }
  $('#menu').addEventListener('click', function (e) {
    var sub = e.target.closest('.si');
    if (sub) { goToRoute(sub.getAttribute('data-route')); return; }
    var row = e.target.closest('.mi');
    if (!row) return;
    var key = row.getAttribute('data-nav');
    if (row.getAttribute('data-group') === '1') {
      if (state.navCollapsed) return;
      var i = state.navOpen.indexOf(key);
      if (i > -1) state.navOpen.splice(i, 1); else state.navOpen.push(key);
      localStorage.setItem('ms_open', JSON.stringify(state.navOpen));
      renderMenu();
    } else goToRoute(key);
  });
  var fly = $('#flyout'), flyTimer = null;
  function hideFly() { flyTimer = setTimeout(function () { fly.hidden = true; }, 150); }
  $('#menu').addEventListener('mouseover', function (e) {
    if (!state.navCollapsed) return;
    var row = e.target.closest('.mi');
    if (!row) return;
    clearTimeout(flyTimer);
    var key = row.getAttribute('data-nav');
    var m = DB.menu.find(function (x) { return x.k === key; });
    if (!m) return;
    var kids = m.children || [];
    fly.innerHTML = (kids.length ? '<div class="ft">' + esc(m.label) + '</div>' : '') +
      (kids.length ? kids.map(function (c) { return '<div class="fi' + (c.k === 'organization' ? ' on' : '') + '" data-route="' + esc(c.k) + '">' + esc(c.label) + '</div>'; }).join('') : '<div class="fi" data-route="' + esc(m.k) + '">' + esc(m.label) + '</div>');
    fly.hidden = false;
    var r = row.getBoundingClientRect();
    fly.style.top = Math.max(54, Math.min(r.top, innerHeight - fly.offsetHeight - 8)) + 'px';
  });
  $('#menu').addEventListener('mouseleave', hideFly);
  fly.addEventListener('mouseenter', function () { clearTimeout(flyTimer); });
  fly.addEventListener('mouseleave', hideFly);
  fly.addEventListener('click', function (e) { var i = e.target.closest('.fi'); if (i) goToRoute(i.getAttribute('data-route')); });
  function applyCollapsed() {
    document.body.classList.toggle('collapsed', state.navCollapsed);
    localStorage.setItem('ms_collapsed', state.navCollapsed ? '1' : '0');
  }
  $('#toggle').addEventListener('click', function () { state.navCollapsed = !state.navCollapsed; applyCollapsed(); fly.hidden = true; });

  /* ---------------- 顶栏 ---------------- */
  function closeTopPop() { $$('.org-top-pop').forEach(function (p) { p.remove(); }); }
  function topPop(host, html, width) {
    closeTopPop();
    var p = document.createElement('div'); p.className = 'org-top-pop'; p.innerHTML = html;
    if (width) p.style.width = width + 'px'; document.body.appendChild(p);
    var r = host.getBoundingClientRect(); p.style.top = (r.bottom - 2) + 'px'; p.style.left = Math.max(8, r.right - p.offsetWidth) + 'px';
    p.addEventListener('click', function (e) { e.stopPropagation(); }); return p;
  }
  $('#org-bell').addEventListener('click', function (e) { e.stopPropagation(); toast('暂无新的组织管理通知', 'info'); });
  $('#org-language').addEventListener('click', function (e) {
    e.stopPropagation(); topPop(this, '<button type="button">简体中文</button><button type="button">English</button>', 150);
  });
  $('#org-tenant').addEventListener('click', function (e) {
    e.stopPropagation(); topPop(this, '<div class="pop-title">当前租户</div><button type="button">2603181012测试客户</button>', 220);
  });
  $('#org-user').addEventListener('click', function (e) {
    e.stopPropagation(); var p = topPop(this, '<button type="button" data-top="personal">个人中心</button><button type="button" data-top="workbench">返回工作台</button><button type="button" data-top="logout">退出登录</button>', 150);
    p.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-top]'); if (!b) return;
      if (b.dataset.top === 'logout') location.href = '登录.html';
      else goToRoute(b.dataset.top === 'personal' ? 'personal' : 'workbench');
    });
  });
  document.addEventListener('click', closeTopPop);

  /* ---------------- 组织树 ---------------- */
  function highlight(text, query) {
    if (!query) return esc(text);
    var lower = text.toLowerCase(), q = query.toLowerCase(), at = lower.indexOf(q);
    if (at < 0) return esc(text);
    return esc(text.slice(0, at)) + '<mark>' + esc(text.slice(at, at + query.length)) + '</mark>' + esc(text.slice(at + query.length));
  }
  function filteredNode(node, query) {
    var children = (node.children || []).map(function (c) { return filteredNode(c, query); }).filter(Boolean);
    if (!query || node.name.toLowerCase().indexOf(query.toLowerCase()) > -1 || children.length) return { node: node, children: children };
    return null;
  }
  function renderTreeBranch(entry, depth) {
    var n = entry.node, children = entry.children || [], hasChildren = children.length > 0;
    var open = state.treeSearch ? true : state.expanded.has(n.id);
    var action = n.root ? '<button class="org-node-action" type="button" data-tree-action="add" data-id="' + esc(n.id) + '" title="创建组织" aria-label="创建子组织">' + I.plus + '</button>' :
      '<button class="org-node-action" type="button" data-tree-action="menu" data-id="' + esc(n.id) + '" title="更多操作" aria-label="更多操作" aria-expanded="false">' + I.more + '</button>';
    var html = '<div class="org-node" role="treeitem" aria-expanded="' + (hasChildren ? String(open) : 'false') + '">' +
      '<div class="org-node-row' + (state.selectedId === n.id ? ' selected' : '') + '" data-select-org="' + esc(n.id) + '" style="padding-left:' + (8 + depth * 18) + 'px">' +
      (hasChildren ? '<button class="org-node-toggle' + (open ? ' open' : '') + '" type="button" data-toggle-org="' + esc(n.id) + '" aria-label="展开或收起">' + I.chevron + '</button>' : '<span class="org-node-spacer"></span>') +
      '<span class="org-node-name" title="' + esc(n.name) + '">' + highlight(n.name, state.treeSearch.trim()) + '</span>' + action + '</div>';
    if (hasChildren && open) html += '<div role="group">' + children.map(function (c) { return renderTreeBranch(c, depth + 1); }).join('') + '</div>';
    return html + '</div>';
  }
  function renderTree() {
    var query = state.treeSearch.trim();
    var visible = state.organizations.map(function (n) { return filteredNode(n, query); }).filter(Boolean);
    $('#org-tree').innerHTML = visible.length ? visible.map(function (e) { return renderTreeBranch(e, 0); }).join('') :
      '<div class="org-tree-empty">未找到匹配的组织<br><button type="button" data-clear-search>清除搜索</button></div>';
    $('#org-search').value = state.treeSearch;
  }
  $('#org-search').addEventListener('input', function () { state.treeSearch = this.value; renderTree(); });
  $('#org-tree').addEventListener('click', function (e) {
    if (e.target.closest('[data-clear-search]')) { state.treeSearch = ''; renderTree(); $('#org-search').focus(); return; }
    var toggle = e.target.closest('[data-toggle-org]');
    if (toggle) {
      e.stopPropagation(); var id = toggle.dataset.toggleOrg;
      if (state.expanded.has(id)) state.expanded.delete(id); else state.expanded.add(id);
      renderTree(); return;
    }
    var action = e.target.closest('[data-tree-action]');
    if (action) {
      e.stopPropagation();
      if (action.dataset.treeAction === 'add') openOrgForm('add', findNode(action.dataset.id));
      else openNodeMenu(action, findNode(action.dataset.id));
      return;
    }
    var row = e.target.closest('[data-select-org]');
    if (row) selectOrganization(row.dataset.selectOrg);
  });
  function closeNodeMenu() { var m = $('.org-node-menu'); if (m) m.remove(); $$('.org-node-action[aria-expanded="true"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); }); }
  function openNodeMenu(button, node) {
    closeNodeMenu(); button.setAttribute('aria-expanded', 'true');
    var menu = document.createElement('div'); menu.className = 'org-node-menu'; menu.dataset.nodeId = node.id;
    menu.innerHTML = '<button type="button" data-node-command="edit">' + I.edit + '编辑</button>' +
      '<button type="button" data-node-command="add">' + I.plus + '添加子组织</button>' +
      '<button type="button" class="danger" data-node-command="delete">' + I.trash + '删除</button>';
    document.body.appendChild(menu); var r = button.getBoundingClientRect();
    menu.style.left = Math.min(innerWidth - menu.offsetWidth - 8, r.right + 3) + 'px';
    menu.style.top = Math.min(innerHeight - menu.offsetHeight - 8, r.top) + 'px';
  }
  document.addEventListener('click', function (e) {
    var cmd = e.target.closest('[data-node-command]');
    if (cmd) {
      e.stopPropagation(); var menu = cmd.closest('.org-node-menu'), node = findNode(menu.dataset.nodeId), c = cmd.dataset.nodeCommand; closeNodeMenu();
      if (c === 'edit') openOrgForm('edit', node);
      else if (c === 'add') openOrgForm('add', node);
      else requestDeleteOrganization(node);
      return;
    }
    if (!e.target.closest('.org-node-menu') && !e.target.closest('[data-tree-action="menu"]')) closeNodeMenu();
  });

  function selectOrganization(id) {
    state.selectedId = id; state.tab = 'members'; state.memberSelection.clear(); state.deviceSelection.clear();
    state.memberPage = 1; state.devicePage = 1; renderPage();
  }

  /* ---------------- 信息、表格与分页 ---------------- */
  function infoItem(label, value) { return '<div class="org-info-item"><div class="org-info-label">' + esc(label) + '</div><div class="org-info-value">' + esc(value || '-') + '</div></div>'; }
  function ownerInfo(node) {
    var owner = ownerUser(node);
    return '<div class="org-info-item org-info-owner"><div class="org-info-label">组织负责人</div>' +
      '<div class="org-owner-inline"><span class="org-owner-name">' + esc(owner ? owner.name : '-') + '</span><span class="org-owner-divider" aria-hidden="true"></span><span>' + esc(owner ? owner.phone : '-') + '</span></div></div>';
  }
  function renderInfo() {
    var n = selectedNode(), parent = findParentNode(n.id);
    $('#org-info').innerHTML = infoItem('组织名称', n.name) + infoItem('组织编码', n.code || '-') + infoItem('上级组织', parent ? parent.name : '-') +
      ownerInfo(n) + infoItem('组织描述', n.description || '-');
  }
  function roleTags(roles) { return '<span class="role-tags">' + (roles || []).map(function (r) { return '<span class="role-tag">' + esc(r) + '</span>'; }).join('') + '</span>'; }
  function memberRecords(node) {
    return (node.members || []).map(function (m) { var u = findUser(m.userId); return u ? Object.assign({}, u, { joined: m.joined }) : null; }).filter(Boolean);
  }
  function deviceOwnerOrg(deviceId) {
    var found = null;
    (function walk(nodes) {
      (nodes || []).forEach(function (n) {
        if (found) return;
        if ((n.devices || []).indexOf(deviceId) > -1) { found = n; return; }
        walk(n.children);
      });
    })(state.organizations);
    return found;
  }
  /* 根组织为租户全局视图，展示全部设备；子组织展示本组织已分配设备 */
  function deviceRecords(node) {
    var ids = node.root ? DEVICES.map(function (d) { return d.id; }) : (node.devices || []);
    return ids.map(function (id) {
      var d = findDevice(id); if (!d) return null;
      var owner = deviceOwnerOrg(id);
      return Object.assign({}, d, {
        allocated: owner ? ((owner.deviceDates || {})[id] || '-') : '-',
        orgId: owner ? owner.id : '',
        orgName: owner ? owner.name : '-'
      });
    }).filter(Boolean);
  }
  function tableEmpty(cols, text) { return '<tr class="org-empty-row"><td colspan="' + cols + '">' + esc(text || '暂无数据') + '</td></tr>'; }
  function renderMembers(node) {
    var rows = memberRecords(node), start = (state.memberPage - 1) * state.memberPageSize, page = rows.slice(start, start + state.memberPageSize);
    var allChecked = page.length && page.every(function (u) { return state.memberSelection.has(u.id); });
    var body = page.length ? page.map(function (u) {
      return '<tr><td class="check-col"><input type="checkbox" data-member-check="' + esc(u.id) + '" ' + (state.memberSelection.has(u.id) ? 'checked' : '') + ' aria-label="选择' + esc(u.name) + '"></td>' +
        '<td title="' + esc(u.name) + '">' + esc(u.name) + (node.leaderId === u.id ? '<span class="leader-badge" title="组织负责人">人</span>' : '') + '</td>' +
        '<td>' + esc(u.phone || '-') + '</td><td title="' + esc(u.email || '-') + '">' + esc(u.email || '-') + '</td><td>' + roleTags(u.roles) + '</td>' +
        '<td>' + esc(u.joined || '-') + '</td><td class="action-col"><button class="org-link-btn" type="button" data-remove-member="' + esc(u.id) + '">移除</button></td></tr>';
    }).join('') : tableEmpty(7);
    $('#org-table-wrap').innerHTML = '<div class="org-table-scroll"><table class="org-table"><thead><tr><th class="check-col"><input type="checkbox" data-check-all-members ' + (allChecked ? 'checked' : '') + ' aria-label="全选当前页"></th>' +
      '<th style="width:20%">用户姓名</th><th style="width:14%">手机号码</th><th style="width:18%">邮箱</th><th style="width:18%">角色</th><th style="width:13%">加入时间</th><th class="action-col">操作</th></tr></thead><tbody>' + body + '</tbody></table></div>';
    renderPagination(rows.length, 'members');
  }
  function renderDevices(node) {
    var rows = deviceRecords(node), start = (state.devicePage - 1) * state.devicePageSize, page = rows.slice(start, start + state.devicePageSize);
    var allChecked = page.length && page.every(function (d) { return state.deviceSelection.has(d.id); });
    var body = page.length ? page.map(function (d) {
      var action = d.orgId ?
        '<button class="org-link-btn" type="button" data-remove-device="' + esc(d.id) + '">取消分配</button>' :
        '<button class="org-link-btn" type="button" data-assign-device-one="' + esc(d.id) + '">分配</button>';
      return '<tr><td class="check-col"><input type="checkbox" data-device-check="' + esc(d.id) + '" ' + (state.deviceSelection.has(d.id) ? 'checked' : '') + ' aria-label="选择' + esc(d.code) + '"></td>' +
        '<td title="' + esc(d.code) + '">' + esc(d.code) + '</td><td>' + esc(d.model) + '</td><td>' + esc(d.allocated) + '</td>' +
        '<td title="' + esc(d.orgName) + '">' + esc(d.orgName) + '</td>' +
        '<td class="action-col">' + action + '</td></tr>';
    }).join('') : tableEmpty(6);
    $('#org-table-wrap').innerHTML = '<div class="org-table-scroll"><table class="org-table"><thead><tr><th class="check-col"><input type="checkbox" data-check-all-devices ' + (allChecked ? 'checked' : '') + ' aria-label="全选当前页"></th>' +
      '<th style="width:24%">设备编号</th><th style="width:18%">设备类型</th><th style="width:17%">分配时间</th><th style="width:23%">所属组织</th><th class="action-col">操作</th></tr></thead><tbody>' + body + '</tbody></table></div>';
    renderPagination(rows.length, 'devices');
  }
  function pageButtons(total, current, size) {
    var count = Math.max(1, Math.ceil(total / size)), out = '';
    for (var i = 1; i <= count; i++) out += '<button class="org-page-btn' + (i === current ? ' active' : '') + '" type="button" data-page="' + i + '">' + i + '</button>';
    return { count: count, html: out };
  }
  function renderPagination(total, type) {
    var current = type === 'members' ? state.memberPage : state.devicePage;
    var size = type === 'members' ? state.memberPageSize : state.devicePageSize;
    var pages = pageButtons(total, current, size);
    $('#org-pagination').innerHTML = '<span>' + total + ' 条记录</span><button class="org-page-btn" type="button" data-page-prev ' + (current <= 1 ? 'disabled' : '') + '>‹</button>' + pages.html +
      '<button class="org-page-btn" type="button" data-page-next ' + (current >= pages.count ? 'disabled' : '') + '>›</button>' +
      '<select class="org-page-size" data-page-size aria-label="每页记录数"><option value="10"' + (size === 10 ? ' selected' : '') + '>10 条/页</option><option value="20"' + (size === 20 ? ' selected' : '') + '>20 条/页</option><option value="50"' + (size === 50 ? ' selected' : '') + '>50 条/页</option></select>';
  }
  function renderWorkspace() {
    var n = selectedNode();
    var tabs = '<div class="org-tabs"><button class="org-tab' + (state.tab === 'members' ? ' active' : '') + '" type="button" data-tab="members">组织成员</button><button class="org-tab' + (state.tab === 'devices' ? ' active' : '') + '" type="button" data-tab="devices">设备分配</button></div>';
    var actions = state.tab === 'members' ?
      '<button class="org-btn danger" type="button" data-batch-remove-members ' + (!state.memberSelection.size ? 'disabled' : '') + '>批量移除' + (state.memberSelection.size ? '(' + state.memberSelection.size + ')' : '') + '</button><button class="org-btn primary" type="button" data-add-member>添加成员</button>' :
      '<button class="org-btn danger" type="button" data-batch-remove-devices ' + (!state.deviceSelection.size ? 'disabled' : '') + '>批量取消分配' + (state.deviceSelection.size ? '(' + state.deviceSelection.size + ')' : '') + '</button><button class="org-btn primary" type="button" data-assign-device>分配设备</button><button class="org-btn" type="button" data-import-device>导入</button>';
    $('#org-toolbar').innerHTML = tabs + '<div class="org-toolbar-actions">' + actions + '</div>';
    if (state.tab === 'devices') renderDevices(n); else renderMembers(n);
  }
  function renderPage() { renderTree(); renderInfo(); renderWorkspace(); }

  $('#org-toolbar').addEventListener('click', function (e) {
    var tab = e.target.closest('[data-tab]');
    if (tab) { state.tab = tab.dataset.tab; state.memberSelection.clear(); state.deviceSelection.clear(); renderWorkspace(); return; }
    var n = selectedNode();
    if (e.target.closest('[data-add-member]')) openAssignMembers(n);
    else if (e.target.closest('[data-assign-device]')) { if (n.root) openBatchAssignDevices(); else openAssignDevices(n); }
    else if (e.target.closest('[data-import-device]')) openDeviceImport();
    else if (e.target.closest('[data-batch-remove-members]') && state.memberSelection.size) confirmRemoveMembers(n, Array.from(state.memberSelection), true);
    else if (e.target.closest('[data-batch-remove-devices]') && state.deviceSelection.size) confirmRemoveDevices(n, Array.from(state.deviceSelection), true);
  });
  $('#org-table-wrap').addEventListener('change', function (e) {
    var n = selectedNode();
    if (e.target.matches('[data-member-check]')) { if (e.target.checked) state.memberSelection.add(e.target.dataset.memberCheck); else state.memberSelection.delete(e.target.dataset.memberCheck); renderWorkspace(); }
    else if (e.target.matches('[data-device-check]')) { if (e.target.checked) state.deviceSelection.add(e.target.dataset.deviceCheck); else state.deviceSelection.delete(e.target.dataset.deviceCheck); renderWorkspace(); }
    else if (e.target.matches('[data-check-all-members]')) {
      var list = memberRecords(n).slice((state.memberPage - 1) * state.memberPageSize, state.memberPage * state.memberPageSize);
      list.forEach(function (u) { if (e.target.checked) state.memberSelection.add(u.id); else state.memberSelection.delete(u.id); }); renderWorkspace();
    } else if (e.target.matches('[data-check-all-devices]')) {
      var devices = deviceRecords(n).slice((state.devicePage - 1) * state.devicePageSize, state.devicePage * state.devicePageSize);
      devices.forEach(function (d) { if (e.target.checked) state.deviceSelection.add(d.id); else state.deviceSelection.delete(d.id); }); renderWorkspace();
    }
  });
  $('#org-table-wrap').addEventListener('click', function (e) {
    var member = e.target.closest('[data-remove-member]'), device = e.target.closest('[data-remove-device]'), assignOne = e.target.closest('[data-assign-device-one]'), n = selectedNode();
    if (member) confirmRemoveMembers(n, [member.dataset.removeMember]);
    if (device) confirmRemoveDevices(n, [device.dataset.removeDevice]);
    if (assignOne) openPickOrg({ deviceIds: [assignOne.dataset.assignDeviceOne] });
  });
  $('#org-pagination').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var isMembers = state.tab === 'members', rows = isMembers ? memberRecords(selectedNode()).length : deviceRecords(selectedNode()).length;
    var size = isMembers ? state.memberPageSize : state.devicePageSize, cur = isMembers ? state.memberPage : state.devicePage, max = Math.max(1, Math.ceil(rows / size));
    if (b.dataset.page) cur = Number(b.dataset.page); else if (b.hasAttribute('data-page-prev')) cur = Math.max(1, cur - 1); else if (b.hasAttribute('data-page-next')) cur = Math.min(max, cur + 1);
    if (isMembers) state.memberPage = cur; else state.devicePage = cur; renderWorkspace();
  });
  $('#org-pagination').addEventListener('change', function (e) {
    if (!e.target.matches('[data-page-size]')) return; var v = Number(e.target.value);
    if (state.tab === 'members') { state.memberPageSize = v; state.memberPage = 1; } else { state.devicePageSize = v; state.devicePage = 1; }
    renderWorkspace();
  });

  /* ---------------- 弹窗及业务操作 ---------------- */
  function openOrgForm(mode, node) { state.modal = { type: 'org-form', mode: mode, nodeId: node.id }; renderModal(); }
  function requestDeleteOrganization(node) {
    if ((node.children || []).length) { toast('请先删除该组织下的下级组织', 'err'); return; }
    if ((node.members || []).length) { toast('请先移除该组织下的成员', 'err'); return; }
    if ((node.devices || []).length) { toast('请先取消该组织下的设备分配', 'err'); return; }
    openConfirm('确认删除', '确认删除组织“' + node.name + '”吗？删除后不可恢复。', '删除', function () {
      var parent = findParentNode(node.id); if (!parent) return;
      parent.children = parent.children.filter(function (c) { return c.id !== node.id; }); state.selectedId = parent.id; saveOrganizations(); renderPage(); toast('删除成功');
    });
  }
  function openConfirm(title, content, okText, onOk) { state.modal = { type: 'confirm', title: title, content: content, okText: okText, onOk: onOk }; renderModal(); }
  function closeModal() { state.modal = null; $('#modal-root').innerHTML = ''; }
  function orgFormHtml(m) {
    var node = findNode(m.nodeId), edit = m.mode === 'edit', parent = edit ? findParentNode(node.id) : node;
    var creator = edit ? ownerUser(node) : findUser(CURRENT_USER_ID);
    return '<div class="org-mask"><div class="org-modal" role="dialog" aria-modal="true" aria-labelledby="org-modal-title"><div class="org-modal-head"><h3 id="org-modal-title">' + (edit ? '编辑组织' : '创建组织') + '</h3><button class="org-modal-close" type="button" data-modal-close aria-label="关闭">×</button></div>' +
      '<div class="org-modal-body"><div class="org-form-row"><label class="required" for="org-form-name">组织名称</label><input class="org-field" id="org-form-name" maxlength="64" placeholder="请输入" value="' + esc(edit ? node.name : '') + '"><div class="org-field-error" data-error="name"></div></div>' +
      '<div class="org-form-row"><label for="org-form-parent">上级组织</label><input class="org-field" id="org-form-parent" disabled value="' + esc(parent ? parent.name : '根组织') + '"><div class="org-field-error"></div></div>' +
      '<div class="org-form-row"><label>组织负责人</label><div class="org-form-owner"><span class="org-owner-name">' + esc(creator ? creator.name : '-') + '</span><span class="org-owner-divider" aria-hidden="true"></span><span>' + esc(creator ? creator.phone : '-') + '</span></div><div class="org-form-help">组织负责人由创建者自动担任。</div></div>' +
      '<div class="org-form-row"><label for="org-form-desc">组织描述</label><div class="org-textarea-wrap"><textarea id="org-form-desc" maxlength="200" placeholder="请输入">' + esc(edit && node.description !== '-' ? node.description : '') + '</textarea><span class="org-count" id="org-desc-count">' + (edit && node.description !== '-' ? node.description.length : 0) + ' / 200</span></div><div class="org-field-error"></div></div></div>' +
      '<div class="org-modal-foot"><button class="org-btn" type="button" data-modal-close>取消</button><button class="org-btn primary" type="button" data-save-org>保存</button></div></div></div>';
  }
  function confirmHtml(m) {
    return '<div class="org-mask"><div class="org-modal confirm-modal" role="alertdialog" aria-modal="true"><div class="org-modal-head"><h3 class="org-confirm-title"><span class="org-confirm-icon">!</span>' + esc(m.title) + '</h3><button class="org-modal-close" type="button" data-modal-close aria-label="关闭">×</button></div>' +
      '<div class="org-modal-body"><div class="org-confirm-content">' + esc(m.content) + '</div></div><div class="org-modal-foot"><button class="org-btn" type="button" data-modal-close>取消</button><button class="org-btn danger" type="button" data-confirm-ok>' + esc(m.okText || '确认') + '</button></div></div></div>';
  }
  function candidateMemberRows(m, node) {
    var used = new Set((node.members || []).map(function (x) { return x.userId; }));
    var q = (m.search || '').toLowerCase();
    var list = USERS.filter(function (u) { return !used.has(u.id) && (!q || [u.name, u.phone, u.email].join(' ').toLowerCase().indexOf(q) > -1); });
    var start = (m.page - 1) * m.pageSize, page = list.slice(start, start + m.pageSize);
    var body = page.length ? page.map(function (u) { return '<tr><td class="check-col"><input type="checkbox" data-modal-select="' + esc(u.id) + '" ' + (m.selection.has(u.id) ? 'checked' : '') + '></td><td>' + esc(u.name) + '</td><td>' + esc(u.phone) + '</td><td>' + esc(u.email) + '</td><td>' + roleTags(u.roles) + '</td></tr>'; }).join('') : '<tr><td colspan="5" style="height:180px;text-align:center;color:#a0a5af">无结果</td></tr>';
    return { list: list, html: body };
  }
  function candidateDeviceRows(m, node) {
    var used = new Set(node.devices || []), q = (m.search || '').toLowerCase();
    /* 只可选择尚未分配给任何组织的设备 */
    var list = DEVICES.filter(function (d) { return !used.has(d.id) && !deviceOwnerOrg(d.id) && (!q || (d.code + ' ' + d.model).toLowerCase().indexOf(q) > -1); });
    var start = (m.page - 1) * m.pageSize, page = list.slice(start, start + m.pageSize);
    var body = page.length ? page.map(function (d) { return '<tr><td class="check-col"><input type="checkbox" data-modal-select="' + esc(d.id) + '" ' + (m.selection.has(d.id) ? 'checked' : '') + '></td><td>' + esc(d.code) + '</td><td>' + esc(d.model) + '</td></tr>'; }).join('') : '<tr><td colspan="3" style="height:180px;text-align:center;color:#a0a5af">无结果</td></tr>';
    return { list: list, html: body };
  }
  function modalPages(total, m) {
    var p = pageButtons(total, m.page, m.pageSize);
    return '<div class="org-modal-pages"><span>' + total + ' 条记录</span><button class="org-page-btn" type="button" data-modal-prev ' + (m.page <= 1 ? 'disabled' : '') + '>‹</button>' + p.html.replace(/data-page=/g, 'data-modal-page=') + '<button class="org-page-btn" type="button" data-modal-next ' + (m.page >= p.count ? 'disabled' : '') + '>›</button><select class="org-page-size" data-modal-page-size><option value="10">10 条/页</option><option value="20"' + (m.pageSize === 20 ? ' selected' : '') + '>20 条/页</option></select></div>';
  }
  function assignHtml(m) {
    var node = findNode(m.nodeId), members = m.type === 'assign-members', data = members ? candidateMemberRows(m, node) : candidateDeviceRows(m, node);
    var heads = members ? '<th class="check-col"></th><th>用户姓名</th><th>手机号码</th><th>邮箱</th><th>角色</th>' : '<th class="check-col"></th><th>设备编号</th><th>设备类型</th>';
    return '<div class="org-mask"><div class="org-modal ' + (members ? 'wide' : 'device-modal') + '" role="dialog" aria-modal="true"><div class="org-modal-head"><h3>' + (members ? '添加组织成员' : '分配设备') + '</h3><button class="org-modal-close" type="button" data-modal-close>×</button></div>' +
      '<div class="org-modal-body"><div class="org-modal-search"><label><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="modal-search" placeholder="' + (members ? '搜索用户' : '搜索设备') + '" value="' + esc(m.searchInput || '') + '"></label><button class="org-btn primary" type="button" data-modal-search>搜索</button></div>' +
      '<div class="org-modal-table-wrap"><div class="org-modal-table-scroll"><table class="org-modal-table"><thead><tr>' + heads + '</tr></thead><tbody>' + data.html + '</tbody></table></div></div>' + modalPages(data.list.length, m) + '</div>' +
      '<div class="org-modal-foot"><button class="org-btn" type="button" data-modal-close>取消</button><button class="org-btn primary" type="button" data-assign-confirm ' + (!m.selection.size ? 'disabled' : '') + '>确定</button></div></div></div>';
  }
  function orgOptions() {
    var out = [];
    (function walk(nodes, depth) {
      (nodes || []).forEach(function (n) {
        out.push({ id: n.id, name: n.name, depth: depth, root: !!n.root });
        walk(n.children, depth + 1);
      });
    })(state.organizations, 0);
    return out;
  }
  function pickOrgHtml(m) {
    var items = orgOptions().map(function (o) {
      return '<button class="org-pick-org-item' + (m.picked === o.id ? ' is-on' : '') + '" type="button" data-pick-org="' + esc(o.id) + '" style="padding-left:' + (16 + o.depth * 20) + 'px">' +
        '<span class="org-pick-org-radio" aria-hidden="true"></span><span class="org-pick-org-name">' + esc(o.name) + '</span>' +
        (o.root ? '<span class="org-pick-org-tag">根组织</span>' : '') + '</button>';
    }).join('');
    return '<div class="org-mask"><div class="org-modal pick-org-modal" role="dialog" aria-modal="true"><div class="org-modal-head"><h3>选择组织</h3><button class="org-modal-close" type="button" data-modal-close aria-label="关闭">×</button></div>' +
      '<div class="org-modal-body"><p class="org-pick-org-tip">选择该设备要分配到的组织。</p>' +
      '<div class="org-pick-org-list">' + items + '</div></div>' +
      '<div class="org-modal-foot"><button class="org-btn" type="button" data-modal-close>取消</button><button class="org-btn primary" type="button" data-pick-org-confirm ' + (m.picked ? '' : 'disabled') + '>确定</button></div></div></div>';
  }
  /* 根组织设备分配：两步流程（选择组织 → 选择设备） */
  function assignSteps(step) {
    return '<div class="org-steps"><span class="org-step' + (step === 1 ? ' active' : '') + '"><i>1</i>选择组织</span><span class="org-step-line"></span><span class="org-step' + (step === 2 ? ' active' : '') + '"><i>2</i>选择设备</span></div>';
  }
  function searchBoxHtml(inputId, placeholder, buttonAttr, value) {
    return '<div class="org-modal-search"><label><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="' + inputId + '" placeholder="' + esc(placeholder) + '" value="' + esc(value || '') + '"></label><button class="org-btn primary" type="button" ' + buttonAttr + '>搜索</button></div>';
  }
  function batchAssignStepsHtml(m) {
    if (m.step === 1) {
      var q = (m.orgSearch || '').toLowerCase();
      var list = orgOptions().filter(function (o) { return !q || o.name.toLowerCase().indexOf(q) > -1; });
      var rows = list.length ? list.map(function (o) {
        var node = findNode(o.id), parent = findParentNode(o.id);
        return '<tr><td class="check-col"><input type="radio" name="batch-org" data-batch-org="' + esc(o.id) + '" ' + (m.orgId === o.id ? 'checked' : '') + ' aria-label="选择' + esc(o.name) + '"></td>' +
          '<td title="' + esc(o.name) + '"><span class="org-batch-name" style="padding-left:' + (o.depth * 18) + 'px">' + esc(o.name) + '</span>' + (o.root ? '<span class="org-pick-org-tag">根组织</span>' : '') + '</td>' +
          '<td>' + esc(node.code || '-') + '</td><td>' + esc(parent ? parent.name : '-') + '</td><td>' + (node.devices || []).length + '</td></tr>';
      }).join('') : tableEmpty(5);
      return '<h4 class="org-batch-title">选择组织</h4>' +
        searchBoxHtml('batch-org-search', '搜索组织名称', 'data-batch-org-search', m.orgSearch) +
        '<div class="org-modal-table-wrap"><div class="org-modal-table-scroll"><table class="org-modal-table org-batch-table"><thead><tr><th class="check-col"></th><th>组织名称</th><th>组织编码</th><th>上级组织</th><th>当前设备数</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
    }
    var dq = (m.deviceSearch || '').toLowerCase();
    var devices = DEVICES.filter(function (d) { return !dq || (d.code + ' ' + d.model).toLowerCase().indexOf(dq) > -1; });
    var drows = devices.length ? devices.map(function (d) {
      var owner = deviceOwnerOrg(d.id);
      return '<tr><td class="check-col"><input type="checkbox" data-batch-device="' + esc(d.id) + '" ' + (m.devices.has(d.id) ? 'checked' : '') + ' aria-label="选择' + esc(d.code) + '"></td>' +
        '<td title="' + esc(d.code) + '">' + esc(d.code) + '</td><td>' + esc(d.model) + '</td><td title="' + esc(owner ? owner.name : '-') + '">' + esc(owner ? owner.name : '-') + '</td></tr>';
    }).join('') : tableEmpty(4);
    return '<h4 class="org-batch-title">选择设备</h4><p class="org-batch-note">已分配的设备将转移至所选组织。</p>' +
      searchBoxHtml('batch-device-search', '搜索设备编号或类型', 'data-batch-device-search', m.deviceSearch) +
      '<div class="org-modal-table-wrap"><div class="org-modal-table-scroll"><table class="org-modal-table org-batch-table"><thead><tr><th class="check-col"></th><th>设备编号</th><th>设备类型</th><th>所属组织</th></tr></thead><tbody>' + drows + '</tbody></table></div></div>';
  }
  function batchAssignDevicesHtml(m) {
    var step1 = m.step === 1;
    var foot = step1 ?
      '<span class="org-selected-count">已选组织：' + (m.orgId ? 1 : 0) + '</span><button class="org-btn" type="button" data-modal-close>取消</button><button class="org-btn primary" type="button" data-batch-next ' + (m.orgId ? '' : 'disabled') + '>下一步</button>' :
      '<span class="org-selected-count">为「' + esc((findNode(m.orgId) || {}).name || '-') + '」分配 ' + m.devices.size + ' 台设备</span><button class="org-btn" type="button" data-modal-close>取消</button><button class="org-btn" type="button" data-batch-prev>上一步</button><button class="org-btn primary" type="button" data-batch-confirm ' + (m.devices.size ? '' : 'disabled') + '>确认分配</button>';
    return '<div class="org-mask"><div class="org-modal wide" role="dialog" aria-modal="true"><div class="org-modal-head"><h3>设备分配</h3><button class="org-modal-close" type="button" data-modal-close aria-label="关闭">×</button></div>' +
      '<div class="org-modal-body">' + assignSteps(m.step) + batchAssignStepsHtml(m) + '</div><div class="org-modal-foot">' + foot + '</div></div></div>';
  }
  function renderModal() {
    var m = state.modal;
    if (!m) { $('#modal-root').innerHTML = ''; return; }
    $('#modal-root').innerHTML = m.type === 'org-form' ? orgFormHtml(m) : m.type === 'confirm' ? confirmHtml(m) : m.type === 'pick-org' ? pickOrgHtml(m) : m.type === 'batch-assign-devices' ? batchAssignDevicesHtml(m) : m.type === 'import-devices' ? importDevicesHtml(m) : assignHtml(m);
    var first = $('#modal-root input:not([disabled]), #modal-root select:not([disabled])'); if (first) setTimeout(function () { first.focus(); }, 20);
  }
  function openAssignMembers(node) { state.modal = { type: 'assign-members', nodeId: node.id, searchInput: '', search: '', selection: new Set(), page: 1, pageSize: 10 }; renderModal(); }
  function openAssignDevices(node) { state.modal = { type: 'assign-devices', nodeId: node.id, searchInput: '', search: '', selection: new Set(), page: 1, pageSize: 10 }; renderModal(); }
  function openPickOrg(options) { state.modal = { type: 'pick-org', picked: '', deviceIds: (options && options.deviceIds) || null }; renderModal(); }
  function openBatchAssignDevices() { state.modal = { type: 'batch-assign-devices', step: 1, orgId: '', devices: new Set(), orgSearch: '', deviceSearch: '' }; renderModal(); }
  function confirmBatchAssignDevices() {
    var m = state.modal, target = findNode(m.orgId);
    if (!target || !m.devices.size) return;
    assignDevicesTo(target, Array.from(m.devices));
    saveOrganizations(); closeModal(); renderPage();
    toast('已为「' + target.name + '」分配 ' + m.devices.size + ' 台设备');
  }

  /* 设备导入：模板字段为 设备编号、所属组织 */
  function openDeviceImport() { state.modal = { type: 'import-devices', fileName: '', rows: [] }; renderModal(); }
  function importDevicesHtml(m) {
    var body = '<div class="org-import-tools"><button class="org-link-btn" type="button" data-download-device-template>下载导入模板</button></div>';
    if (!m.rows.length) {
      body += '<div class="org-upload-box">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 16V4m0 0L7 9m5-5 5 5"/><path d="M4 15v5h16v-5"/></svg>' +
        '<p>拖放文件到此处或点击选择文件</p><small>请下载标准的 Excel 模板，按照模板字段（设备编号、所属组织）填写后上传文件</small>' +
        '<button class="org-btn" type="button" data-choose-device-file>选择文件</button><input type="file" id="device-import-file" accept=".xlsx,.xls,.csv" hidden></div>';
    } else {
      body += '<div class="org-import-summary">文件 ' + esc(m.fileName) + ' 校验完成：成功 ' + m.rows.length + ' 条，失败 0 条</div>' +
        '<div class="org-modal-table-wrap"><div class="org-modal-table-scroll"><table class="org-modal-table org-batch-table"><thead><tr><th style="width:16%">行号</th><th>设备编号</th><th>所属组织</th><th style="width:20%">状态</th></tr></thead><tbody>' +
        m.rows.map(function (r, i) {
          return '<tr><td>' + (i + 2) + '</td><td>' + esc(r.code) + '</td><td>' + esc(r.orgName) + '</td><td><span class="org-import-ok">成功</span></td></tr>';
        }).join('') + '</tbody></table></div></div>';
    }
    var foot = '<button class="org-btn" type="button" data-modal-close>取消</button>' + (m.rows.length ? '<button class="org-btn primary" type="button" data-save-device-import>保存导入</button>' : '');
    return '<div class="org-mask"><div class="org-modal wide" role="dialog" aria-modal="true"><div class="org-modal-head"><h3>导入设备</h3><button class="org-modal-close" type="button" data-modal-close aria-label="关闭">×</button></div>' +
      '<div class="org-modal-body">' + body + '</div><div class="org-modal-foot">' + foot + '</div></div></div>';
  }
  function downloadDeviceTemplate() {
    var csv = '\ufeff设备编号,所属组织\nSY007CBHC0908,测试组织1\nHPGJ1041000683,测试组织2\n';
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = '设备导入模板.csv'; a.click(); URL.revokeObjectURL(a.href);
  }
  /* 原型仅做本地演示：按模板结构生成校验结果，不解析真实文件 */
  function setDeviceImportFile(file) {
    var m = state.modal;
    m.fileName = file && file.name ? file.name : '设备导入模板.xlsx';
    var hosts = orgOptions().filter(function (o) { return !o.root; });
    if (!hosts.length) hosts = orgOptions();
    var free = DEVICES.filter(function (d) { return !deviceOwnerOrg(d.id); });
    if (!free.length) free = DEVICES.slice(0, 3);
    m.rows = free.slice(0, 3).map(function (d, i) {
      return { code: d.code, orgName: hosts[i % hosts.length].name };
    });
    renderModal();
  }
  function saveDeviceImport() {
    var m = state.modal, done = 0;
    m.rows.forEach(function (r) {
      var device = DEVICES.filter(function (d) { return d.code === r.code; })[0];
      var host = orgOptions().map(function (o) { return findNode(o.id); }).filter(function (n) { return n && n.name === r.orgName; })[0];
      if (!device || !host) return;
      assignDevicesTo(host, [device.id]); done++;
    });
    saveOrganizations(); closeModal(); renderPage();
    toast('设备导入成功，共处理 ' + done + ' 台设备');
  }
  function saveOrgForm() {
    var m = state.modal, node = findNode(m.nodeId), edit = m.mode === 'edit';
    var name = $('#org-form-name').value.trim(), desc = $('#org-form-desc').value.trim();
    var valid = true, forbidden = /[`~!$%^*|\\=?;:'"<>{}\[\]\/]/;
    $('[data-error="name"]').textContent = '';
    $('#org-form-name').classList.remove('bad');
    if (!name) { $('[data-error="name"]').textContent = '请输入组织名称'; $('#org-form-name').classList.add('bad'); valid = false; }
    else if (name.length > 64) { $('[data-error="name"]').textContent = '组织名称不能超过 64 个字符'; valid = false; }
    else if (forbidden.test(name)) { $('[data-error="name"]').textContent = '组织名称不能包含特殊字符'; valid = false; }
    if (!valid) return;
    if (edit) { node.name = name; node.description = desc || '-'; toast('组织信息已保存'); }
    else {
      var stamp = Date.now().toString(), child = { id: 'org-' + stamp, name: name, code: 'MYSANY' + today().replace(/-/g, '') + stamp.slice(-6), parentId: node.id, creatorId: CURRENT_USER_ID, leaderId: CURRENT_USER_ID, description: desc || '-', members: [], devices: [], deviceDates: {}, children: [] };
      node.children = node.children || []; node.children.push(child); state.expanded.add(node.id); state.selectedId = child.id; state.tab = 'members'; toast('组织创建成功');
    }
    saveOrganizations(); closeModal(); renderPage();
  }
  function confirmRemoveMembers(node, ids, batch) {
    var isBatch = batch || ids.length > 1;
    openConfirm(isBatch ? '批量移除' : '移除', isBatch ? '确认移除选中的 ' + ids.length + ' 名组织成员吗？' : '确认移除组织成员“' + (findUser(ids[0]) || {}).name + '”吗？', isBatch ? '批量移除' : '移除', function () {
      node.members = (node.members || []).filter(function (m) { return ids.indexOf(m.userId) < 0; });
      state.memberSelection.clear(); saveOrganizations(); renderPage(); toast('成员已移除');
    });
  }
  function confirmRemoveDevices(node, ids, batch) {
    /* 根组织为全局视图，取消分配需从设备实际所属组织移除 */
    var targets = ids.filter(function (id) { return !!deviceOwnerOrg(id); });
    if (!targets.length) { toast('所选设备暂未分配组织', 'err'); return; }
    var one = findDevice(targets[0]);
    var isBatch = batch || targets.length > 1;
    openConfirm(isBatch ? '批量取消分配' : '取消分配', isBatch ? '确认取消所选 ' + targets.length + ' 台设备的分配吗？' : '确认取消设备“' + (one ? one.code : '') + '”的分配吗？', isBatch ? '批量取消分配' : '取消分配', function () {
      targets.forEach(function (id) {
        var owner = deviceOwnerOrg(id) || node;
        owner.devices = (owner.devices || []).filter(function (x) { return x !== id; });
        if (owner.deviceDates) delete owner.deviceDates[id];
      });
      state.deviceSelection.clear(); saveOrganizations(); renderPage(); toast('已取消设备分配');
    });
  }
  function assignDevicesTo(node, ids) {
    node.devices = node.devices || []; node.deviceDates = node.deviceDates || {};
    ids.forEach(function (id) {
      var owner = deviceOwnerOrg(id);
      if (owner && owner.id !== node.id) {
        owner.devices = (owner.devices || []).filter(function (x) { return x !== id; });
        if (owner.deviceDates) delete owner.deviceDates[id];
      }
      if (node.devices.indexOf(id) < 0) node.devices.push(id);
      node.deviceDates[id] = today();
    });
  }
  $('#modal-root').addEventListener('click', function (e) {
    if (e.target.closest('[data-modal-close]')) { closeModal(); return; }
    if (e.target.closest('[data-save-org]')) { saveOrgForm(); return; }
    if (e.target.closest('[data-confirm-ok]')) { var fn = state.modal.onOk; closeModal(); fn(); return; }
    if (e.target.closest('[data-modal-search]')) {
      state.modal.searchInput = $('#modal-search').value; state.modal.search = state.modal.searchInput.trim(); state.modal.page = 1; renderModal(); return;
    }
    if (e.target.closest('[data-download-device-template]')) { downloadDeviceTemplate(); return; }
    if (e.target.closest('[data-choose-device-file]')) { $('#device-import-file').click(); return; }
    if (e.target.closest('[data-save-device-import]')) { saveDeviceImport(); return; }
    if (e.target.closest('[data-batch-org-search]')) { state.modal.orgSearch = $('#batch-org-search').value.trim(); renderModal(); return; }
    if (e.target.closest('[data-batch-device-search]')) { state.modal.deviceSearch = $('#batch-device-search').value.trim(); renderModal(); return; }
    if (e.target.closest('[data-batch-next]')) { state.modal.step = 2; renderModal(); return; }
    if (e.target.closest('[data-batch-prev]')) { state.modal.step = 1; renderModal(); return; }
    if (e.target.closest('[data-batch-confirm]')) { confirmBatchAssignDevices(); return; }
    var pickOrg = e.target.closest('[data-pick-org]');
    if (pickOrg) { state.modal.picked = pickOrg.dataset.pickOrg; renderModal(); return; }
    if (e.target.closest('[data-pick-org-confirm]')) {
      var pm = state.modal, target = findNode(pm.picked);
      if (!target || !pm.deviceIds) { closeModal(); return; }
      assignDevicesTo(target, pm.deviceIds); closeModal(); renderPage(); toast('设备已分配到“' + target.name + '”');
      return;
    }
    if (e.target.closest('[data-assign-confirm]')) {
      var m = state.modal, node = findNode(m.nodeId), ids = Array.from(m.selection);
      if (m.type === 'assign-members') ids.forEach(function (id) { node.members.push({ userId: id, joined: today() }); });
      else assignDevicesTo(node, ids);
      saveOrganizations(); closeModal(); renderPage(); toast(m.type === 'assign-members' ? '成员添加成功' : '设备分配成功'); return;
    }
    var pb = e.target.closest('[data-modal-page]');
    if (pb) { state.modal.page = Number(pb.dataset.modalPage); renderModal(); return; }
    if (e.target.closest('[data-modal-prev]')) { state.modal.page = Math.max(1, state.modal.page - 1); renderModal(); return; }
    if (e.target.closest('[data-modal-next]')) { state.modal.page += 1; renderModal(); }
  });
  $('#modal-root').addEventListener('change', function (e) {
    if (e.target.matches('[data-modal-select]')) { if (e.target.checked) state.modal.selection.add(e.target.dataset.modalSelect); else state.modal.selection.delete(e.target.dataset.modalSelect); renderModal(); }
    if (e.target.matches('[data-modal-page-size]')) { state.modal.pageSize = Number(e.target.value); state.modal.page = 1; renderModal(); }
    if (e.target.matches('[data-batch-org]')) { state.modal.orgId = e.target.dataset.batchOrg; renderModal(); }
    if (e.target.matches('[data-batch-device]')) { if (e.target.checked) state.modal.devices.add(e.target.dataset.batchDevice); else state.modal.devices.delete(e.target.dataset.batchDevice); renderModal(); }
    if (e.target.id === 'device-import-file') setDeviceImportFile(e.target.files && e.target.files[0]);
  });
  $('#modal-root').addEventListener('input', function (e) {
    if (e.target.id === 'org-form-desc') $('#org-desc-count').textContent = e.target.value.length + ' / 200';
    if (e.target.id === 'modal-search') state.modal.searchInput = e.target.value;
  });
  $('#modal-root').addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    if (e.target.id === 'modal-search') { e.preventDefault(); state.modal.search = e.target.value.trim(); state.modal.searchInput = e.target.value; state.modal.page = 1; renderModal(); }
    if (e.target.id === 'batch-org-search') { e.preventDefault(); state.modal.orgSearch = e.target.value.trim(); renderModal(); }
    if (e.target.id === 'batch-device-search') { e.preventDefault(); state.modal.deviceSearch = e.target.value.trim(); renderModal(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && state.modal) closeModal(); });

  /* ---------------- 启动 ---------------- */
  applyCollapsed(); renderMenu(); renderPage();
})();
