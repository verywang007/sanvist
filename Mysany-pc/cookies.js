/* ==========================================================================
   Cookies 偏好中心 —— 登录页与工作台共用逻辑
   原先只存在于 wb.js 内，现抽成独立模块，登录页与「工作台 › 设置 › Cookies 设置」
   调用的是同一份代码、同一份文案、同一份 localStorage（ms_settings），
   因此两处的交互与勾选结果完全一致、互相同步。

   依赖：data.js（DB.cookies 提供 Cookie 清单）、cookies.css
   用法：
     var draft = MSCookies.load();                  // 读取当前偏好
     MSCookies.openDrawer(draft, function (applied) { ... });
   ========================================================================== */
window.MSCookies = (function () {
  'use strict';

  var SET_KEY = 'ms_settings';
  var SET_DEFAULT = {
    ckNecessary: true,      // 必要 Cookies，始终开启且不可关闭
    ckFunctional: true,
    ckAnalytics: true,
    ckAds: false,
    personalAds: false,
  };

  function load() {
    try { return Object.assign({}, SET_DEFAULT, JSON.parse(localStorage.getItem(SET_KEY) || '{}')); }
    catch (e) { return Object.assign({}, SET_DEFAULT); }
  }
  function save(s) { s.ckNecessary = true; localStorage.setItem(SET_KEY, JSON.stringify(s)); }

  var CK_ITEMS = [
    { k: 'ckNecessary', t: '绝对必要的 Cookie', lock: true,
      d: '这类 Cookie 是网站运行所必需的，无法在系统中关闭。它们通常只在你主动操作时才会生成，' +
         '例如登录、填写表单或设置隐私偏好。你可以通过浏览器阻止这些 Cookie，但网站的部分功能将无法正常工作。' },
    { k: 'ckFunctional', t: '功能 Cookie',
      d: '这类 Cookie 用于提供增强功能与个性化设置，例如记住你选择的语言、侧边菜单的折叠状态等。' +
         '如果不允许，部分功能可能无法正常使用。' },
    { k: 'ckAnalytics', t: '性能 Cookie',
      d: '这类 Cookie 用于统计访问量与流量来源，帮助我们了解哪些页面最受欢迎、用户如何在站点中浏览，' +
         '从而衡量并改进页面性能。所有信息都是汇总的，因此是匿名的。' },
    { k: 'ckAds', t: '定向 Cookie',
      d: '这类 Cookie 可能由我们的广告合作伙伴设置，用于建立你的兴趣画像并展示相关推广内容。' +
         '它们不会直接存储个人身份信息，而是基于对浏览器和设备的唯一标识。如果不允许，你看到的推广内容相关性会降低。' },
  ];

  var AD_DESC = '关闭个性化广告将限制sanvist向你推送相关广告的能力，但不会减少你收到的广告数量。';

  function enabledCount(s) {
    return CK_ITEMS.filter(function (c) { return s[c.k]; }).length;
  }

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------------- 轻提示（宿主页面没有 #toasts 时自动创建） ---------------- */
  var TI = { ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
             info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
             err: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="m15 9-6 6M9 9l6 6"/></svg>' };

  function toastBox() {
    var box = document.getElementById('toasts');
    if (!box) {
      box = document.createElement('div');
      box.className = 'toasts';
      box.id = 'toasts';
      document.body.appendChild(box);
    }
    return box;
  }
  function toast(msg, kind) {
    kind = kind || 'ok';
    var el = document.createElement('div');
    el.className = 'toast ' + kind;
    el.innerHTML = TI[kind] + '<span>' + esc(msg) + '</span>';
    toastBox().appendChild(el);
    setTimeout(function () { el.remove(); }, 2600);
  }

  /* ---------- Cookies 偏好中心（右侧抽屉，参考通用同意管理面板交互） ---------- */
  function openDrawer(target, onDone) {
    var d = Object.assign({}, target);   // 抽屉内的临时副本，确认后才写回
    var open = {};                        // 各分类展开状态
    var view = 'main';                    // 'main' | 'list'
    var listCat = null;                   // 查看详细信息的分类 key
    var hopen = {};                       // Cookie 列表中各主机分组的展开状态

    var mk = document.createElement('div');
    mk.className = 'dw-mask';
    document.body.appendChild(mk);

    function icon(o) {
      return o
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
    }

    function renderMain() {
      return '<div class="dw-h2">首选项中心</div>' +
            '<p class="dw-p">Cookie 是网站放置在你设备上的小文件，用于让网站正常运行、记住你的偏好，' +
              '并帮助我们了解页面的使用情况。</p>' +
            '<p class="dw-p">你可以按类别选择是否允许。必要类别无法关闭，因为它们是网站运行所必需的；' +
              '关闭其他类别可能会影响部分功能和你看到的内容的相关性。点击各分类标题可查看详细说明。</p>' +
            '<div class="dw-h3">浏览器设置</div>' +
            '<p class="dw-p">你也可以在浏览器中阻止或删除 Cookie，但届时网站的部分功能可能无法正常运行。</p>' +

            '<div class="dw-sec"><h3>管理许可偏好</h3>' +
              '<button class="btn" data-all="1">全部允许</button></div>' +

            CK_ITEMS.map(function (c, i) {
              return '<div class="ct' + (open[i] ? ' open' : '') + '" data-i="' + i + '">' +
                '<div class="ct-hd" data-toggle="' + i + '">' +
                  '<span class="ct-plus">' + icon(open[i]) + '</span>' +
                  '<span class="ct-name">' + c.t + '</span>' +
                  (c.lock ? '<span class="ct-always">始终处于活动状态</span>'
                          : '<span class="sw' + (d[c.k] ? ' on' : '') + '" data-sw="' + c.k + '" role="switch" aria-checked="' + !!d[c.k] + '"></span>') +
                '</div>' +
                '<div class="ct-bd"><p>' + c.d + '</p>' +
                  '<div class="ct-more"><span data-detail="' + c.k + '">Cookie 详细信息' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg>' +
                  '</span></div>' +
                '</div>' +
              '</div>';
            }).join('');
    }

    /* ---- Cookie 列表：按主机分组，展开后逐条展示 ---- */
    function renderList() {
      var cat = CK_ITEMS.filter(function (c) { return c.k === listCat; })[0] || {};
      var rows = (window.DB && window.DB.cookies && window.DB.cookies[listCat]) || [];

      var hosts = [];
      rows.forEach(function (r) { if (hosts.indexOf(r.host) < 0) hosts.push(r.host); });

      var body = hosts.length ? hosts.map(function (h, i) {
        var items = rows.filter(function (r) { return r.host === h; });
        return '<div class="hg' + (hopen[i] ? ' open' : '') + '" data-h="' + i + '">' +
          '<div class="hg-hd" data-host="' + i + '">' +
            '<span class="hg-p">' + icon(hopen[i]) + '</span>' +
            '<span class="hg-n">' + esc(h) + '</span>' +
          '</div>' +
          '<div class="hg-bd">' +
            items.map(function (r) {
              return '<div class="ck-card">' +
                fld('名称', r.name) + fld('主机', r.host) + fld('持续时间', r.dur) +
                fld('类型', r.type) + fld('类别', cat.t || '') + fld('说明', r.desc) +
              '</div>';
            }).join('') +
          '</div></div>';
      }).join('') : '<p class="dw-p" style="padding-top:12px;">该分类下暂无 Cookie。</p>';

      return '<div class="ck-back">' +
          '<span class="b" data-blist="1">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m15 6-6 6 6 6"/></svg>' +
          '</span><h3>Cookie 列表</h3></div>' +
        '<div class="ck-cat">' + esc(cat.t || '') + ' · 共 ' + rows.length + ' 项</div>' +
        body;
    }

    function fld(k, v) {
      return '<div class="ck-f"><span class="k">' + k + '</span><span class="v">' + esc(v) + '</span></div>';
    }

    function render() {
      mk.innerHTML =
        '<div class="drawer" role="dialog" aria-label="Cookies 偏好中心">' +
          '<div class="dw-hd"><img src="./static/icon-mysanyLogo.svg" alt="My SANY" />' +
            '<span class="dw-x" data-x="1" title="关闭">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>' +
            '</span>' +
          '</div>' +
          '<div class="dw-bd">' + (view === 'main' ? renderMain() : renderList()) + '</div>' +
          '<div class="dw-ft">' +
            '<button class="btn" data-none="1">全部拒绝</button>' +
            '<button class="btn btn-p" data-ok="1">确认我的选择</button>' +
          '</div>' +
        '</div>';
      var bd = mk.querySelector('.dw-bd');
      if (bd) bd.scrollTop = 0;
    }

    function close(applied) {
      mk.remove();
      document.removeEventListener('keydown', onKey);
      if (onDone) onDone(applied);
    }
    function onKey(e) { if (e.key === 'Escape') close(false); }
    document.addEventListener('keydown', onKey);

    function commit(msg) {
      CK_ITEMS.forEach(function (c) { target[c.k] = d[c.k]; });
      target.ckNecessary = true;
      save(target);
      close(true);
      toast(msg);
    }

    mk.addEventListener('click', function (e) {
      if (e.target === mk || e.target.closest('[data-x]')) return close(false);

      var det = e.target.closest('[data-detail]');
      if (det) {
        listCat = det.getAttribute('data-detail');
        view = 'list'; hopen = {}; render();
        return;
      }
      if (e.target.closest('[data-blist]')) { view = 'main'; render(); return; }

      var hh = e.target.closest('[data-host]');
      if (hh) {
        var hi = hh.getAttribute('data-host');
        hopen[hi] = !hopen[hi];
        var g = mk.querySelector('.hg[data-h="' + hi + '"]');
        g.classList.toggle('open', hopen[hi]);
        g.querySelector('.hg-p').innerHTML = icon(hopen[hi]);
        return;
      }

      var s = e.target.closest('[data-sw]');
      if (s) {                                   // 开关不应触发手风琴
        e.stopPropagation();
        var k = s.getAttribute('data-sw');
        d[k] = !d[k];
        s.classList.toggle('on', d[k]);
        s.setAttribute('aria-checked', String(d[k]));
        return;
      }

      var t = e.target.closest('[data-toggle]');
      if (t) {
        var i = t.getAttribute('data-toggle');
        open[i] = !open[i];
        var card = mk.querySelector('.ct[data-i="' + i + '"]');
        card.classList.toggle('open', open[i]);
        card.querySelector('.ct-plus').innerHTML = icon(open[i]);
        return;
      }

      if (e.target.closest('[data-all]')) {
        CK_ITEMS.forEach(function (c) { d[c.k] = true; });
        render();
        toast('已允许全部 Cookie', 'info');
        return;
      }
      if (e.target.closest('[data-none]')) {
        CK_ITEMS.forEach(function (c) { d[c.k] = !!c.lock; });
        commit('已拒绝全部非必要 Cookie');
        return;
      }
      if (e.target.closest('[data-ok]')) { commit('Cookie 偏好已保存'); }
    });

    render();
  }

  return {
    KEY: SET_KEY,
    DEFAULT: SET_DEFAULT,
    items: CK_ITEMS,
    adDesc: AD_DESC,
    load: load,
    save: save,
    enabledCount: enabledCount,
    total: CK_ITEMS.length,
    openDrawer: openDrawer,
    toast: toast,
  };
})();
