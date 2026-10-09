/* ==========================================================================
   吊装规划 —— SANY SMART LIFT 首页（本地交互）
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
    ent: P('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3"/>'),
    truck: P('<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'),
    lift: P('<path d="M12 3v5"/><path d="M8 8h8"/><path d="M12 8a4.5 4.5 0 1 0 4.5 4.5"/><path d="M12 17v4"/><path d="M9 18l3 3 3-3"/>'),
    box: P('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>')
  };

  /* ---------------- 履带起重机占位图 ---------------- */
  var CRANE_SVG =
    '<svg viewBox="0 0 200 120" aria-hidden="true">' +
      '<g fill="#c6000b">' +
        '<rect x="28" y="96" width="72" height="14" rx="7"/>' +
        '<rect x="108" y="96" width="62" height="14" rx="7"/>' +
        '<rect x="52" y="78" width="74" height="20" rx="4"/>' +
        '<rect x="98" y="66" width="20" height="14" rx="3"/>' +
        '<path d="M84 80 168 18l5 7-81 60z"/>' +
      '</g>' +
      '<g stroke="#8a9099" stroke-width="2.4" fill="none" stroke-linecap="round">' +
        '<path d="M162 26v26"/>' +
      '</g>' +
      '<path d="M154 52h16l-8 12z" fill="#c6000b"/>' +
    '</svg>';

  var state = {
    tab: '概览',
    ln: 'welcome',
    view: 'grid',
    slide: 0,
    navOpen: JSON.parse(localStorage.getItem('ms_open') || '[]'),
    navCollapsed: localStorage.getItem('ms_collapsed') === '1',
    projects: [
      { name: '测试', time: '2026-10-09 14:00:00' }
    ]
  };

  function toast(msg, kind) {
    var el = document.createElement('div'); el.className = 'toast ' + (kind || 'ok'); el.innerHTML = '<span>' + esc(msg) + '</span>';
    $('#toasts').appendChild(el); setTimeout(function () { el.remove(); }, 2600);
  }

  /* ---------------- 主导航（与工作台一致） ---------------- */
  function renderMenu() {
    $('#menu').innerHTML = DB.menu.map(function (m) {
      var kids = m.children || null, isOpen = state.navOpen.indexOf(m.k) > -1;
      var selfOn = !kids && m.k === 'lift-plan';
      var row = '<div class="mi' + (selfOn ? ' on' : '') + '" data-nav="' + esc(m.k) + '" data-group="' + (kids ? '1' : '0') + '">' + (m.pro ? '<i class="mi-pro">PRO</i>' : '') + '<span class="mi-ico">' + (ICONS[m.icon] || ICONS.box) + '</span><span class="mi-lb">' + esc(m.label) + '</span>' + (kids ? '<svg class="mi-arw" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg>' : '') + '</div>';
      if (!kids) return row;
      var sub = kids.map(function (c) { return '<div class="si" data-route="' + esc(c.k) + '">' + esc(c.label) + '</div>'; }).join('');
      return '<div class="grp' + (isOpen ? ' open' : '') + '" data-g="' + esc(m.k) + '">' + row + '<div class="sub">' + sub + '</div></div>';
    }).join('');
  }
  function goToRoute(k) {
    if (k === 'lift-plan') return;
    if (k === 'tenant') { location.href = '企业服务-租户管理.html'; return; }
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
    fly.innerHTML = (kids.length ? '<div class="ft">' + esc(m.label) + '</div>' : '') + (kids.length ? kids.map(function (c) { return '<div class="fi" data-route="' + esc(c.k) + '">' + esc(c.label) + '</div>'; }).join('') : '<div class="fi" data-route="' + esc(m.k) + '">' + esc(m.label) + '</div>');
    fly.hidden = false; var r = row.getBoundingClientRect(); fly.style.top = Math.max(54, Math.min(r.top, innerHeight - fly.offsetHeight - 8)) + 'px';
  });
  $('#menu').addEventListener('mouseleave', hideFly); fly.addEventListener('mouseenter', function () { clearTimeout(flyTimer); }); fly.addEventListener('mouseleave', hideFly);
  fly.addEventListener('click', function (e) { var i = e.target.closest('.fi'); if (i) goToRoute(i.dataset.route); });
  function applyCollapsed() { document.body.classList.toggle('collapsed', state.navCollapsed); localStorage.setItem('ms_collapsed', state.navCollapsed ? '1' : '0'); }
  $('#toggle').addEventListener('click', function () { state.navCollapsed = !state.navCollapsed; applyCollapsed(); if (state.navCollapsed) fly.hidden = true; });

  /* ---------------- 模块页签 ---------------- */
  $('#lift-tabs').addEventListener('click', function (e) {
    var t = e.target.closest('.lift-tab'); if (!t) return;
    $$('.lift-tab').forEach(function (x) { x.classList.toggle('on', x === t); x.setAttribute('aria-selected', x === t ? 'true' : 'false'); });
    state.tab = t.textContent;
    toast('已切换到「' + state.tab + '」');
  });

  /* ---------------- 左侧 SMART LIFT 菜单 ---------------- */
  $('#lift-nav').addEventListener('click', function (e) {
    var b = e.target.closest('.ln'); if (!b) return;
    $$('.ln').forEach(function (x) { x.classList.toggle('on', x === b); });
    state.ln = b.dataset.ln;
    toast('已切换到「' + b.querySelector('span').textContent + '」');
  });

  /* ---------------- 轮播 ---------------- */
  function renderSlides() {
    $('#lift-slides').innerHTML = [0, 1, 2].map(function (i) {
      return '<div class="lift-slide' + (i === state.slide ? ' on' : '') + '" data-slide="' + i + '">' + CRANE_SVG + '</div>';
    }).join('');
    $('#lift-dots').innerHTML = [0, 1, 2].map(function (i) {
      return '<button class="lift-dot' + (i === state.slide ? ' on' : '') + '" type="button" data-slide="' + i + '" aria-label="第' + (i + 1) + '张"></button>';
    }).join('');
  }
  $('#lift-dots').addEventListener('click', function (e) {
    var d = e.target.closest('.lift-dot'); if (!d) return;
    state.slide = Number(d.dataset.slide); renderSlides();
  });
  $('#lift-slides').addEventListener('click', function (e) {
    var s = e.target.closest('.lift-slide'); if (!s) return;
    state.slide = Number(s.dataset.slide); renderSlides();
  });

  /* ---------------- 最近项目 ---------------- */
  function renderProjects() {
    $('#lift-projects').innerHTML = state.projects.map(function (p) {
      return '<div class="proj-card" data-p="' + esc(p.name) + '">' +
               '<div class="proj-thumb">' + CRANE_SVG + '</div>' +
               '<div class="proj-meta">' +
                 '<div class="proj-name">' +
                   '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8z"/></svg>' +
                   '<span>' + esc(p.name) + '</span>' +
                 '</div>' +
                 '<div class="proj-time">' + esc(p.time) + '</div>' +
               '</div>' +
             '</div>';
    }).join('');
    $('#lift-projects').classList.toggle('grid', state.view === 'grid');
    $('#lift-projects').classList.toggle('list', state.view === 'list');
  }
  $('#lift-view').addEventListener('click', function (e) {
    var b = e.target.closest('.v-btn'); if (!b) return;
    $$('.v-btn').forEach(function (x) { x.classList.toggle('on', x === b); });
    state.view = b.dataset.view; renderProjects();
  });
  $('#lift-projects').addEventListener('click', function (e) {
    var c = e.target.closest('.proj-card'); if (!c) return;
    toast('打开项目「' + c.dataset.p + '」');
  });

  /* ---------------- 顶栏 / 取消 ---------------- */
  $('#lp-bell').addEventListener('click', function () { toast('暂无新通知', 'info'); });
  $('#lp-language').addEventListener('click', function () { toast('当前语言：简体中文', 'info'); });
  $('#lp-tenant').addEventListener('click', function () { toast('当前租户：旺是旺旺的旺', 'info'); });
  $('#lp-user').addEventListener('click', function (e) { e.stopPropagation(); goToRoute('personal'); });
  $('#lift-cancel').addEventListener('click', function () { location.href = '工作台.html'; });

  applyCollapsed(); renderMenu(); renderSlides(); renderProjects();
})();
