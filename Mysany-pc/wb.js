/* ==========================================================================
   MySANY 工作台 / 个人中心 —— 本地交互逻辑
   纯前端，全部数据来自 data.js，运行期不发起任何网络请求。
   ========================================================================== */
(function () {
  'use strict';
  var DB = window.DB;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------------- 图标（线性，1.8 描边） ---------------- */
  var P = function (d) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>'; };
  var ICONS = {
    home:    P('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/>'),
    device:  P('<path d="M4 20h16"/><path d="M6 20v-6l4-3 4 3v6"/><circle cx="17" cy="7" r="3"/><path d="m14.5 9.5-3 2.5"/>'),
    audit:   P('<rect x="4" y="3" width="13" height="18" rx="2"/><path d="M8 8h6M8 12h6M8 16h4"/>'),
    training:P('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z"/>'),
    screen:  P('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),
    report:  P('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 16V9M12 16v-4M16 16v-6"/>'),
    personnel:P('<circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15 15.2a5 5 0 0 1 6 4.8"/>'),
    project: P('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5"/>'),
    monitor: P('<circle cx="12" cy="12" r="9"/><path d="m12 12 4-3"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/>'),
    maintain:P('<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h3"/>'),
    service: P('<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="13" width="4" height="6" rx="1.6"/><rect x="17.5" y="13" width="4" height="6" rx="1.6"/>'),
    parts:   P('<path d="M4 8h7v7H4z"/><path d="M13 4h7v7"/><path d="M13 13h7v7h-7z"/>'),
    repair:  P('<path d="M15 5a4 4 0 0 0-5.3 5.3L4 16v4h4l5.7-5.7A4 4 0 0 0 19 9"/>'),
    cost:    P('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 16V10M12 16V7M17 16v-4"/>'),
    video:   P('<rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3z"/><circle cx="9.5" cy="12" r="2.5"/>'),
    ent:     P('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3"/>'),
    truck:   P('<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'),
    lift:    P('<path d="M12 3v5"/><path d="M8 8h8"/><path d="M12 8a4.5 4.5 0 1 0 4.5 4.5"/><path d="M12 17v4"/><path d="M9 18l3 3 3-3"/>'),
    globe:   P('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>'),
    user:    P('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
    key:     P('<circle cx="8" cy="14" r="4"/><path d="m11 11 8-8M17 5l2 2M15 7l2 2"/>'),
    mail:    P('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    pin:     P('<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
    warn:    P('<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>'),
    hex:     P('<path d="M12 2.6 20 7v10l-8 4.4L4 17V7z"/><path d="M12 8.2 16 10.4v4.2L12 16.8 8 14.6v-4.2z"/>'),
    box:     P('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>'),
  };

  /* ---------------- Toast ---------------- */
  var TI = { ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
             info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
             err: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="m15 9-6 6M9 9l6 6"/></svg>' };
  function toast(msg, kind) {
    kind = kind || 'ok';
    var el = document.createElement('div');
    el.className = 'toast ' + kind;
    el.innerHTML = TI[kind] + '<span>' + esc(msg) + '</span>';
    $('#toasts').appendChild(el);
    setTimeout(function () { el.remove(); }, 2600);
  }

  /* ---------------- 简易弹窗 ---------------- */
  function dialog(opt) {
    var m = document.createElement('div');
    m.className = 'mask';
    m.innerHTML =
      '<div class="dlg"><h3>' + esc(opt.title) + '</h3>' +
      (opt.desc ? '<p>' + esc(opt.desc) + '</p>' : '') +
      (opt.input !== undefined
        ? '<input class="ipt" id="dlg-i" style="padding-right:12px" value="' + esc(opt.input) + '" placeholder="' + esc(opt.ph || '请输入') + '" />'
        : '') +
      '<div class="dlg-ft"><button class="btn" data-x="0">取消</button>' +
      '<button class="btn btn-p" style="margin:0" data-x="1">确定</button></div></div>';
    document.body.appendChild(m);
    var inp = $('#dlg-i', m);
    if (inp) { inp.focus(); inp.select(); }
    function close(ok) {
      var v = inp ? inp.value.trim() : true;
      m.remove();
      if (ok && opt.onOk) opt.onOk(v);
    }
    m.addEventListener('click', function (e) {
      if (e.target === m) return close(false);
      var b = e.target.closest('[data-x]');
      if (b) close(b.getAttribute('data-x') === '1');
    });
    m.addEventListener('keydown', function (e) { if (e.key === 'Enter') close(true); });
  }

  /* ======================================================================
     左侧菜单
     ====================================================================== */
  var state = {
    route: localStorage.getItem('ms_route') || 'workbench',
    open: JSON.parse(localStorage.getItem('ms_open') || '[]'),
    collapsed: localStorage.getItem('ms_collapsed') === '1',
    auditKey: 'device',
    sortDesc: true,
    pcTab: 'info',
    pwMode: 'old',
  };

  function renderMenu() {
    var html = DB.menu.map(function (m) {
      var kids = m.children;
      var hasKids = !!kids;                       // 有 children 字段即为可展开分组
      var isOpen = state.open.indexOf(m.k) > -1;
      var childOn = hasKids && kids.some(function (c) { return c.k === state.route; });
      var selfOn = !hasKids && m.k === state.route;

      var row =
        '<div class="mi' + (selfOn ? ' on' : '') + '" data-k="' + m.k + '" data-grp="' + (hasKids ? 1 : 0) + '">' +
          (m.pro ? '<i class="mi-pro">PRO</i>' : '') +
          '<span class="mi-ico">' + (ICONS[m.icon] || ICONS.box) + '</span>' +
          '<span class="mi-lb">' + esc(m.label) + '</span>' +
          (hasKids ? '<svg class="mi-arw" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>' : '') +
        '</div>';

      if (!hasKids) return row;

      var sub = kids.map(function (c) {
        return '<div class="si' + (c.k === state.route ? ' on' : '') + '" data-k="' + c.k + '">' + esc(c.label) + '</div>';
      }).join('');

      return '<div class="grp' + (isOpen ? ' open' : '') + (childOn ? ' has-on' : '') + '" data-g="' + m.k + '">' +
               row + '<div class="sub">' + sub + '</div></div>';
    }).join('');
    $('#menu').innerHTML = html;
  }

  // 菜单点击
  $('#menu').addEventListener('click', function (e) {
    var si = e.target.closest('.si');
    if (si) { go(si.getAttribute('data-k')); return; }
    var mi = e.target.closest('.mi');
    if (!mi) return;
    var k = mi.getAttribute('data-k');
    if (mi.getAttribute('data-grp') === '1') {
      if (state.collapsed) return;                 // 折叠态由浮层处理
      var i = state.open.indexOf(k);
      if (i > -1) state.open.splice(i, 1); else state.open.push(k);
      localStorage.setItem('ms_open', JSON.stringify(state.open));
      renderMenu();
    } else {
      go(k);
    }
  });

  /* ---------------- 折叠态浮层子菜单 ---------------- */
  var fly = $('#flyout'), flyTimer = null;
  function hideFly() { flyTimer = setTimeout(function () { fly.hidden = true; }, 180); }
  $('#menu').addEventListener('mouseover', function (e) {
    if (!state.collapsed) return;
    var mi = e.target.closest('.mi');
    if (!mi) return;
    clearTimeout(flyTimer);
    var k = mi.getAttribute('data-k');
    var m = DB.menu.filter(function (x) { return x.k === k; })[0];
    if (!m) return;
    var kids = m.children;
    var body = (kids && kids.length)
      ? kids.map(function (c) { return '<div class="fi' + (c.k === state.route ? ' on' : '') + '" data-k="' + c.k + '">' + esc(c.label) + '</div>'; }).join('')
      : '<div class="fi" data-k="' + m.k + '">' + esc(m.label) + '</div>';
    var head = (kids && kids.length) ? '<div class="ft">' + esc(m.label) + '</div>' : '';
    fly.innerHTML = head + body;
    fly.hidden = false;
    var r = mi.getBoundingClientRect();
    var top = Math.min(r.top, window.innerHeight - fly.offsetHeight - 10);
    fly.style.top = Math.max(56, top) + 'px';
  });
  $('#menu').addEventListener('mouseleave', hideFly);
  fly.addEventListener('mouseenter', function () { clearTimeout(flyTimer); });
  fly.addEventListener('mouseleave', hideFly);
  fly.addEventListener('click', function (e) {
    var f = e.target.closest('.fi');
    if (f) { fly.hidden = true; go(f.getAttribute('data-k')); }
  });

  /* ---------------- 折叠开关 ---------------- */
  function applyCollapsed() {
    document.body.classList.toggle('collapsed', state.collapsed);
    localStorage.setItem('ms_collapsed', state.collapsed ? '1' : '0');
  }
  $('#toggle').addEventListener('click', function () {
    state.collapsed = !state.collapsed;
    applyCollapsed();
    if (state.collapsed) fly.hidden = true;
  });

  /* ======================================================================
     路由
     ====================================================================== */
  var LABEL = {};
  DB.menu.forEach(function (m) {
    LABEL[m.k] = m.label;
    (m.children || []).forEach(function (c) { LABEL[c.k] = c.label; });
  });
  // 线上菜单调整后，清理本地可能残留的旧路由（如“服务工单”“道依茨系统”）。
  if (!LABEL[state.route]) {
    state.route = 'workbench';
    localStorage.setItem('ms_route', state.route);
  }

  function go(k) {
    state.route = k;
    localStorage.setItem('ms_route', k);
    // 自动展开包含该子项的分组
    DB.menu.forEach(function (m) {
      if ((m.children || []).some(function (c) { return c.k === k; }) && state.open.indexOf(m.k) < 0) {
        state.open.push(m.k);
      }
    });
    localStorage.setItem('ms_open', JSON.stringify(state.open));

    if (k === 'tenant' || k === 'organization' || k === 'user-management' || k === 'role-management') {
      location.href = k === 'tenant' ? '企业服务-租户管理.html' : k === 'organization' ? '企业服务-组织管理.html' : k === 'user-management' ? '企业服务-用户管理.html' : '企业服务-角色管理.html';
      return;
    }

    if (k === 'lift-plan') {
      location.href = '吊装规划.html';
      return;
    }

    $('#v-workbench').hidden = k !== 'workbench';
    $('#v-personal').hidden = k !== 'personal';
    $('#v-selfservice').hidden = k !== 'selfservice';
    $('#v-ph').hidden = (k === 'workbench' || k === 'personal' || k === 'selfservice');
    if ($('#v-ph').hidden === false) $('#ph-t').textContent = LABEL[k] || '模块';
    document.title = (LABEL[k] || '工作台') + ' - MySANY';
    renderMenu();
    window.scrollTo(0, 0);
  }

  /* ======================================================================
     顶栏下拉
     ====================================================================== */
  function closePops() { $$('.pop').forEach(function (p) { p.remove(); }); }
  document.addEventListener('click', function () { closePops(); });

  function popup(host, html, width) {
    closePops();
    var p = document.createElement('div');
    p.className = 'pop';
    if (width) p.style.width = width + 'px';
    p.innerHTML = html;
    host.appendChild(p);
    p.addEventListener('click', function (e) { e.stopPropagation(); });
    return p;
  }

  $('#t-bell').addEventListener('click', function (e) {
    e.stopPropagation();
    var rows = DB.messages.map(function (m) {
      return '<div class="msg-row"><i>' + esc(m.time) + '</i><b>' + esc(m.t) + '</b><span>' + esc(m.d) + '</span></div>';
    }).join('');
    var p = popup(this, '<div class="pop-hd">通知 (' + DB.messages.length + ')<span class="clear" id="mk">全部已读</span></div>' +
                        '<div class="pop-msgs">' + rows + '</div>', 330);
    $('#mk', p).addEventListener('click', function () {
      $('#bell-n').hidden = true; closePops(); toast('已全部标记为已读');
    });
  });

  $('#t-lang').addEventListener('click', function (e) {
    e.stopPropagation();
    var cur = $('#lang-txt').textContent;
    popup(this, DB.langs.map(function (l) {
      return '<div class="pop-item' + (l === cur ? ' on' : '') + '" data-l="' + esc(l) + '">' + esc(l) + '</div>';
    }).join('')).addEventListener('click', function (ev) {
      var it = ev.target.closest('[data-l]');
      if (!it) return;
      $('#lang-txt').textContent = it.getAttribute('data-l');
      closePops(); toast('语言已切换为 ' + it.getAttribute('data-l'));
    });
  });

  $('#t-tenant').addEventListener('click', function (e) {
    e.stopPropagation();
    popup(this, DB.tenant.list.map(function (t) {
      return '<div class="pop-item' + (t.current ? ' on' : '') + '">' + esc(t.name) + '</div>';
    }).join(''));
  });

  $('#t-user').addEventListener('click', function (e) {
    e.stopPropagation();
    popup(this, '<div class="pop-item" data-u="personal">个人中心</div>' +
                '<div class="pop-item" data-u="settings">设置</div>' +
                '<div class="pop-item" data-u="logout">退出登录</div>')
      .addEventListener('click', function (ev) {
        var it = ev.target.closest('[data-u]');
        if (!it) return;
        var act = it.getAttribute('data-u');
        closePops();
        if (act === 'personal') { go('personal'); }
        else if (act === 'settings') { openSettings(); }
        else {
          dialog({ title: '退出登录', desc: '确定要退出当前账号吗？', onOk: function () {
            location.href = '登录.html';
          } });
        }
      });
  });

  /* ======================================================================
     工作台
     ====================================================================== */
  var TONE = { red: '#c6000b', orange: '#f08200', green: '#2a9d4e', gray: '#b7bdc6' };

  function renderWorkbench() {
    var h = new Date().getHours();
    var g = h < 6 ? '凌晨好' : h < 9 ? '早上好' : h < 12 ? '上午好' : h < 14 ? '中午好' : h < 18 ? '下午好' : '晚上好';
    $('#greet').textContent = g + '，' + DB.user.name;

    $('#mt-grid').innerHTML = DB.maintain.map(function (m) {
      return '<div class="mt-card" style="--tone:' + TONE[m.tone] + '">' +
               '<div class="mt-n">' + m.n + '<small>台设备</small></div>' +
               '<div class="mt-s"><i class="dot"></i>' + esc(m.label) + '</div></div>';
    }).join('');

    $('#qk-grid').innerHTML = DB.quick.map(function (q) {
      return '<div class="qk" data-q="' + q.k + '"><span class="qk-i t-' + q.tone + '">' +
             (ICONS[q.icon] || ICONS.box) + '</span><span>' + esc(q.label) + '</span></div>';
    }).join('');

    renderAudit();
  }

  function renderAudit() {
    $('#au-grid').innerHTML = DB.audit.map(function (a) {
      return '<div class="au-card' + (a.k === state.auditKey ? ' on' : '') + '" data-a="' + a.k + '">' +
               '<div class="au-n">' + a.n + (a.fresh ? '<span class="au-new">新 ' + a.fresh + '</span>' : '') + '</div>' +
               '<div class="au-l">' + esc(a.label) + '</div></div>';
    }).join('');
    renderEvents();
  }

  function renderEvents() {
    var rows = (DB.auditList[state.auditKey] || []).slice();
    rows.sort(function (a, b) {
      var x = a.time.slice(0, 19), y = b.time.slice(0, 19);
      return state.sortDesc ? (x < y ? 1 : x > y ? -1 : 0) : (x > y ? 1 : x < y ? -1 : 0);
    });
    $('#ev-sort').classList.toggle('asc', !state.sortDesc);
    if (!rows.length) { $('#ev-list').innerHTML = '<div class="ev-empty">暂无数据</div>'; return; }
    $('#ev-list').innerHTML = rows.map(function (r) {
      return '<div class="ev"><div class="ev-main">' +
               '<div class="ev-t"><i class="d"></i><span class="tx">' + esc(r.title) + '</span>' +
               (r.fresh ? '<span class="ev-tag">新</span>' : '') + '</div>' +
               '<div class="ev-sub">' + esc(r.sub) + '</div></div>' +
             '<div class="ev-time">' + esc(r.time) + '</div></div>';
    }).join('');
  }

  $('#au-grid').addEventListener('click', function (e) {
    var c = e.target.closest('[data-a]');
    if (!c) return;
    state.auditKey = c.getAttribute('data-a');
    renderAudit();
  });
  $('#ev-sort').addEventListener('click', function () { state.sortDesc = !state.sortDesc; renderEvents(); });
  $('#qk-grid').addEventListener('click', function (e) {
    var q = e.target.closest('[data-q]');
    if (q) go(q.getAttribute('data-q'));
  });
  $$('.more').forEach(function (b) {
    b.addEventListener('click', function () { go(b.getAttribute('data-go')); });
  });
  $('#wb-gear').addEventListener('click', function () { toast('工作台设置（本地演示）', 'info'); });
  $('#wb-search').addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var v = this.value.trim();
    toast(v ? '搜索设备：' + v : '请输入设备关键字', v ? 'info' : 'err');
  });

  /* ======================================================================
     个人中心
     ====================================================================== */
  var PC_TABS = [
    { k: 'info',   label: '个人信息', icon: 'user' },
    { k: 'pwd',    label: '修改密码', icon: 'key' },
    { k: 'invite', label: '通知邀请', icon: 'mail' },
  ];

  function renderPC() {
    $('#pc-nav').innerHTML = PC_TABS.map(function (t) {
      return '<div class="pc-nav-i' + (t.k === state.pcTab ? ' on' : '') + '" data-t="' + t.k + '">' +
             ICONS[t.icon] + '<span>' + t.label + '</span></div>';
    }).join('');
    $$('.pc-pane').forEach(function (p) { p.hidden = p.getAttribute('data-pane') !== state.pcTab; });

    var u = DB.user;
    $('#u-name').textContent = u.name;
    $('#u-phone').textContent = u.phone;
    $('#u-mail').textContent = u.email;
    $('#u-role').textContent = u.role;
    $('#u-created').textContent = u.created;
    $('#u-last').textContent = u.lastLogin;

    var t = DB.tenant;
    function card(x, badge) {
      return '<div class="tn-card"><span class="tn-ico">' + ICONS.hex + '</span>' +
             '<div><div class="tn-n">' + esc(x.name) + '</div><div class="tn-t">' + esc(x.type) + '</div></div>' +
             (badge ? '<span class="pill">当前</span>' : '') + '</div>';
    }
    $('#tn-wrap').innerHTML =
      '<div class="tn-l">当前租户</div>' + card(t.current, false) +
      '<div class="tn-l">所属租户列表</div>' +
      t.list.map(function (x) { return card(x, x.current); }).join('');

    var iv = DB.invites;
    $$('#iv-tabs .iv-tab').forEach(function (b) {
      var f = b.getAttribute('data-f');
      b.textContent = ({ all: '全部', done: '已处理', todo: '待处理' })[f] + '(' + iv[f] + ')';
    });
    $('#iv-body').innerHTML = iv.rows.length ? '' :
      '<div class="empty">' + ICONS.box + '暂无数据</div>';
  }

  $('#pc-nav').addEventListener('click', function (e) {
    var i = e.target.closest('[data-t]');
    if (!i) return;
    state.pcTab = i.getAttribute('data-t');
    renderPC();
  });

  // 行内编辑（姓名 / 业务职责）
  $('#v-personal').addEventListener('click', function (e) {
    var ed = e.target.closest('[data-edit]');
    if (ed) {
      var f = ed.getAttribute('data-edit');
      var map = { name: ['修改用户姓名', 'name'], role: ['修改业务职责', 'role'] };
      dialog({ title: map[f][0], input: DB.user[map[f][1]], onOk: function (v) {
        if (!v) { toast('内容不能为空', 'err'); return; }
        DB.user[map[f][1]] = v;
        renderPC();
        if (f === 'name') { $('#user-txt').textContent = v; renderWorkbench(); }
        toast('修改成功');
      } });
      return;
    }
    var rb = e.target.closest('[data-rebind]');
    if (rb) {
      var kind = rb.getAttribute('data-rebind');
      dialog({
        title: kind === 'phone' ? '换绑手机号' : '换绑邮箱',
        desc: '本地演示：直接填写新的' + (kind === 'phone' ? '手机号' : '邮箱') + '即可。',
        input: '', ph: kind === 'phone' ? '请输入新手机号' : '请输入新邮箱',
        onOk: function (v) {
          if (kind === 'phone' && !/^1\d{10}$/.test(v)) { toast('手机号格式不正确', 'err'); return; }
          if (kind === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) { toast('邮箱格式不正确', 'err'); return; }
          if (kind === 'phone') DB.user.phone = v.slice(0, 3) + '****' + v.slice(7);
          else DB.user.email = v;
          renderPC(); toast('换绑成功');
        }
      });
    }
  });

  $('#iv-tabs').addEventListener('click', function (e) {
    var t = e.target.closest('.iv-tab');
    if (!t) return;
    $$('#iv-tabs .iv-tab').forEach(function (x) { x.classList.remove('on'); });
    t.classList.add('on');
  });
  $('#iv-rule').addEventListener('click', function () {
    dialog({ title: '规则说明', desc: '收到他人发起的租户邀请后，可在此处处理。处理结果会同步到通知列表。' });
  });

  /* ---------------- 修改密码 ---------------- */
  var VERIFY = { old: ['原密码', 'password'], sms: ['短信验证码', 'text'], mail: ['邮箱验证码', 'text'] };
  $('#pw-rads').addEventListener('click', function (e) {
    var r = e.target.closest('.rad');
    if (!r) return;
    state.pwMode = r.getAttribute('data-m');
    $$('#pw-rads .rad').forEach(function (x) { x.classList.remove('on'); });
    r.classList.add('on');
    var v = VERIFY[state.pwMode];
    $('#lb-verify').textContent = v[0];
    var inp = $('#pw-old');
    inp.type = v[1]; inp.value = ''; $('#er-old').textContent = '';
    $('[data-eye="pw-old"]').style.display = state.pwMode === 'old' ? '' : 'none';
  });

  $$('.eye').forEach(function (ey) {
    ey.addEventListener('click', function () {
      var i = $('#' + ey.getAttribute('data-eye'));
      i.type = i.type === 'password' ? 'text' : 'password';
      ey.style.opacity = i.type === 'text' ? '.9' : '';
    });
  });

  function setErr(id, msg) { $(id).textContent = msg || ''; }
  $('#pw-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var a = $('#pw-old').value.trim(), b = $('#pw-new').value, c = $('#pw-re').value;
    var ok = true;
    setErr('#er-old'); setErr('#er-new'); setErr('#er-re');
    $$('.ipt').forEach(function (i) { i.classList.remove('bad'); });

    if (!a) { setErr('#er-old', '请输入' + VERIFY[state.pwMode][0]); $('#pw-old').classList.add('bad'); ok = false; }
    if (!b) { setErr('#er-new', '请输入新密码'); $('#pw-new').classList.add('bad'); ok = false; }
    else if (b.length < 8 || b.length > 20 || !/[A-Za-z]/.test(b) || !/\d/.test(b)) {
      setErr('#er-new', '密码需 8-20 位，且同时包含字母和数字'); $('#pw-new').classList.add('bad'); ok = false;
    }
    if (c !== b) { setErr('#er-re', '两次输入的密码不一致'); $('#pw-re').classList.add('bad'); ok = false; }
    if (!ok) return;

    $('#pw-form').reset();
    setErr('#er-old'); setErr('#er-new'); setErr('#er-re');
    toast('密码修改成功（本地演示，未提交服务器）');
  });
  $('#pw-reset').addEventListener('click', function () {
    $('#pw-form').reset();
    setErr('#er-old'); setErr('#er-new'); setErr('#er-re');
    $$('.ipt').forEach(function (i) { i.classList.remove('bad'); });
    toast('已重置', 'info');
  });

  /* ======================================================================
     设置弹窗（隐私协议 / 用户服务协议 / Cookies / 个人化广告）
     Cookies 相关的偏好读写、分类文案与偏好中心抽屉都来自 cookies.js，
     登录页调用的是同一份实现，两处交互与结果完全一致。
     ====================================================================== */
  var MSC = window.MSCookies;
  function loadSet() { return MSC.load(); }
  function saveSet(s) { MSC.save(s); }

  var SI = {
    shield: P('<path d="M12 3l7 3v6c0 4.2-2.9 7.8-7 9-4.1-1.2-7-4.8-7-9V6z"/><path d="m9 12 2 2 4-4"/>'),
    doc:    P('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>'),
    cookie: P('<path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4.6-4.4A4 4 0 0 1 12 3z"/><circle cx="9.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="14.5" r="1" fill="currentColor" stroke="none"/><circle cx="9" cy="15.5" r="1" fill="currentColor" stroke="none"/>'),
    ads:    P('<path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16.5 9.5a4 4 0 0 1 0 5M19 7a7.5 7.5 0 0 1 0 10"/>'),
  };

  // 本地示例条款文本（非官方法律文本，仅用于演示交互）
  var DOCS = {
    privacy: {
      title: '隐私协议',
      body:
        '<div class="note">以下为本地演示用的示例说明文本，概括常见的隐私处理方式，' +
        '<b>不是正式法律文件</b>，不能替代官方发布的隐私协议。请以官方条款为准。</div>' +
        '<h4>一、我们收集哪些信息</h4>' +
        '<ul><li>账号信息：姓名、手机号、邮箱、所属租户与业务职责。</li>' +
        '<li>设备信息：你有权限查看的设备编号、型号、状态与告警记录。</li>' +
        '<li>使用信息：登录时间、访问页面、操作日志，用于安全审计与问题排查。</li></ul>' +
        '<h4>二、信息如何被使用</h4>' +
        '<ul><li>向你提供工作台、设备管理、告警与保养等核心功能。</li>' +
        '<li>保障账号安全，识别异常登录与风险操作。</li>' +
        '<li>在你授权的范围内改进产品体验。</li></ul>' +
        '<h4>三、存储与保护</h4>' +
        '<p>信息在满足业务目的所必需的期限内保存；传输与存储环节采用加密措施，' +
        '并按最小必要原则限制内部访问权限。</p>' +
        '<h4>四、你的权利</h4>' +
        '<ul><li>查阅、更正本人账号信息（可在「个人中心」中操作）。</li>' +
        '<li>撤回非必要的授权，例如关闭分析类 Cookies 与个人化广告。</li>' +
        '<li>在符合规定的前提下申请注销账号或删除相关数据。</li></ul>' +
        '<h4>五、联系我们</h4>' +
        '<p>如对隐私处理有疑问，可通过官方客服渠道反馈。</p>' +
        '<div class="meta">示例文本版本：本地 v1.0</div>',
    },
    service: {
      title: '用户服务协议',
      body:
        '<div class="note">以下为本地演示用的示例说明文本，' +
        '<b>不是正式法律文件</b>，不能替代官方发布的用户服务协议。请以官方条款为准。</div>' +
        '<h4>一、服务范围</h4>' +
        '<p>平台向你提供设备接入、状态监控、告警提醒、保养计划与报表统计等功能。' +
        '具体可用模块以你所属租户开通的权限为准。</p>' +
        '<h4>二、账号与安全</h4>' +
        '<ul><li>你应妥善保管账号与密码，并对账号下的操作负责。</li>' +
        '<li>建议定期修改密码，发现异常应及时更换并联系管理员。</li>' +
        '<li>不得将账号转借、出租或共享给未获授权的第三方。</li></ul>' +
        '<h4>三、使用规范</h4>' +
        '<ul><li>不得利用平台从事违法违规活动。</li>' +
        '<li>不得以自动化方式非正常地大量抓取或干扰平台正常运行。</li>' +
        '<li>不得擅自公开或传播因使用平台而获知的他人数据。</li></ul>' +
        '<h4>四、服务变更与中断</h4>' +
        '<p>因升级维护、设备故障或不可抗力等原因，服务可能暂时中断；' +
        '平台将尽合理努力提前告知并尽快恢复。</p>' +
        '<h4>五、协议变更</h4>' +
        '<p>条款更新后将在平台内公示，继续使用即视为接受更新后的条款。</p>' +
        '<div class="meta">示例文本版本：本地 v1.0</div>',
    },
  };

  var CK_ITEMS = MSC.items;                 // 四个 Cookie 分类（文案见 cookies.js）
  var AD_DESC  = MSC.adDesc;
  var openCookieDrawer = MSC.openDrawer;    // Cookies 偏好中心抽屉，与登录页共用

  function openSettings() {
    var draft = loadSet();
    var page = 'main';        // 'main' | 'privacy' | 'service'

    function ckStatus() {
      var on = CK_ITEMS.filter(function (c) { return draft[c.k]; }).length;
      return '已启用 ' + on + ' / ' + CK_ITEMS.length + ' 类';
    }

    var m = document.createElement('div');
    m.className = 'mask';
    document.body.appendChild(m);

    function sw(k, lock) {
      return '<span class="sw' + (draft[k] ? ' on' : '') + (lock ? ' lock' : '') +
             '" data-sw="' + k + '" role="switch" aria-checked="' + !!draft[k] + '"></span>';
    }
    function arrow() {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg>';
    }

    function renderMain() {
      return '<div class="dlg dlg-lg">' +
        '<div class="dlg-hd"><h3>设置</h3>' +
          '<span class="x" data-close="1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg></span>' +
        '</div>' +
        '<div class="dlg-bd">' +

          '<div class="set-row"><span class="ic">' + SI.shield + '</span>' +
            '<div class="set-main"><div class="t">隐私协议</div>' +
            '<div class="d">了解我们收集哪些信息、如何使用与保护，以及你享有的权利。</div></div>' +
            '<span class="r"><span class="set-view" data-doc="privacy">查看' + arrow() + '</span></span></div>' +

          '<div class="set-row"><span class="ic">' + SI.doc + '</span>' +
            '<div class="set-main"><div class="t">用户服务协议</div>' +
            '<div class="d">了解服务范围、账号安全责任与使用规范。</div></div>' +
            '<span class="r"><span class="set-view" data-doc="service">查看' + arrow() + '</span></span></div>' +

          '<div class="set-row"><span class="ic">' + SI.cookie + '</span>' +
            '<div class="set-main"><div class="t">Cookies 设置</div>' +
            '<div class="d">管理各类 Cookie 的启用状态，了解它们分别用于什么。</div>' +
            '<div class="set-status">' + ckStatus() + '</div></div>' +
            '<span class="r"><span class="set-view" data-ck="1">设置' + arrow() + '</span></span></div>' +

          '<div class="set-row"><span class="ic">' + SI.ads + '</span>' +
            '<div class="set-main"><div class="t">个性化广告</div>' +
            '<div class="d">' + AD_DESC + '</div></div>' +
            '<span class="r">' + sw('personalAds') + '</span></div>' +

        '</div>' +
        '<div class="dlg-ft2">' +
          '<button class="btn" data-close="1">取消</button>' +
          '<button class="btn btn-p" data-save="1">保存</button>' +
        '</div></div>';
    }

    function renderDoc(k) {
      var d = DOCS[k];
      return '<div class="dlg dlg-lg dlg-doc">' +
        '<div class="dlg-hd">' +
          '<span class="back" data-back="1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m15 6-6 6 6 6"/></svg></span>' +
          '<h3>' + d.title + '</h3>' +
          '<span class="x" data-close="1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg></span>' +
        '</div>' +
        '<div class="dlg-bd"><div class="doc">' + d.body + '</div></div>' +
        '<div class="dlg-ft2"><button class="btn" data-back="1">返回设置</button></div></div>';
    }

    function render() {
      m.innerHTML = page === 'main' ? renderMain() : renderDoc(page);
      var bd = m.querySelector('.dlg-bd');
      if (bd) bd.scrollTop = 0;
    }
    function close() { m.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);

    m.addEventListener('click', function (e) {
      if (e.target === m) return close();
      if (e.target.closest('[data-close]')) return close();

      if (e.target.closest('[data-back]')) { page = 'main'; render(); return; }

      var dv = e.target.closest('[data-doc]');
      if (dv) { page = dv.getAttribute('data-doc'); render(); return; }

      if (e.target.closest('[data-ck]')) {
        openCookieDrawer(draft, function () { render(); });
        return;
      }

      var s = e.target.closest('[data-sw]');
      if (s) {
        var k = s.getAttribute('data-sw');
        if (s.classList.contains('lock')) { toast('必要 Cookies 无法关闭', 'info'); return; }
        draft[k] = !draft[k];
        s.classList.toggle('on', draft[k]);
        s.setAttribute('aria-checked', String(draft[k]));
        return;
      }

      if (e.target.closest('[data-save]')) {
        saveSet(draft);
        close();
        toast('设置已保存');
      }
    });

    render();
  }

  /* ======================================================================
     启动
     ====================================================================== */
  $('#user-txt').textContent = DB.user.name;
  $('#tenant-txt').textContent = DB.tenant.current.name;
  $('#bell-n').textContent = DB.messages.length;
  applyCollapsed();
  renderWorkbench();
  renderPC();
  go(state.route);
})();
