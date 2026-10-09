/* =========================================================
   MySANY APP · 登录页原型 —— 交互脚本
   ---------------------------------------------------------
   核心规则：用户服务协议 + 隐私协议 两个复选框 **都勾选**
            登录按钮才会高亮（品牌红），否则保持未激活的浅红。
   ========================================================= */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ── 元素 ─────────────────────────────────────────── */
  var sbTime      = $('.sb-time');

  var tabs        = $$('.tab');
  var tabInk      = $('.tab-ink');
  var panels      = $$('.panel');

  var countryBtn  = $('#countryBtn');
  var countryName = $('#countryName');
  var dialCode    = $('#dialCode');
  var phoneInput  = $('#phone');
  var phoneClear  = $('#phoneClear');
  var codeInput   = $('#code');
  var sendCode    = $('#sendCode');

  var accountInput = $('#account');
  var passwordInput = $('#password');
  var togglePwd   = $('#togglePwd');

  var agreements  = $('#agreements');
  var cbService   = $('#agreeService');
  var cbPrivacy   = $('#agreePrivacy');
  var loginBtn    = $('#loginBtn');

  var scrim       = $('#scrim');
  var countrySheet = $('#countrySheet');
  var countryList = $('#countryList');
  var countrySearch = $('#countrySearch');
  var docSheet    = $('#docSheet');
  var docTitle    = $('#docTitle');
  var docBody     = $('#docBody');
  var docAgree    = $('#docAgree');
  var toastEl     = $('#toast');

  var state = { tab: 'phone', dial: '86', sentCode: null, timer: 0, openDoc: null };

  /* ── Toast ────────────────────────────────────────── */
  var toastTimer;
  function toast(msg, ms) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-open');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-open'); }, ms || 1800);
  }

  /* ── 状态栏时钟 ───────────────────────────────────── */
  /* 取本机本地时间，24 小时制、不补前导零（对齐 iOS 状态栏写法）。
     每次都按整分边界续下一次定时，既不用 1s 轮询也不会走时漂移。 */
  var clockTimer;
  function tickClock() {
    clearTimeout(clockTimer);
    var now = new Date();
    var m = now.getMinutes();
    sbTime.textContent = now.getHours() + ':' + (m < 10 ? '0' + m : m);
    clockTimer = setTimeout(tickClock, 60000 - (now.getSeconds() * 1000 + now.getMilliseconds()));
  }
  /* 标签页在后台时定时器会被节流，切回来立刻补一次 */
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) tickClock();
  });

  /* ── 顶部 Tab ─────────────────────────────────────── */
  function moveInk() {
    var active = $('.tab.is-active');
    if (!active) return;
    // 下划线宽度固定 24px，居中于当前 tab 文字
    var w = 24;
    var x = active.offsetLeft + (active.offsetWidth - w) / 2;
    tabInk.style.setProperty('--ink-x', x + 'px');
    tabInk.style.setProperty('--ink-w', w + 'px');
  }

  function switchTab(name) {
    if (state.tab === name) return;
    state.tab = name;
    tabs.forEach(function (t) {
      var on = t.dataset.tab === name;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach(function (p) {
      var on = p.dataset.panel === name;
      p.hidden = !on;
      p.classList.toggle('is-active', on);
    });
    // 字号变化后再定位下划线
    requestAnimationFrame(moveInk);
    syncLogin();
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { switchTab(t.dataset.tab); });
  });

  /* ── 国家 / 地区 ──────────────────────────────────── */
  var COUNTRIES = [
    { flag: '🇨🇳', name: '中国',        dial: '86',  py: 'zhongguo china' },
    { flag: '🇭🇰', name: '中国香港',     dial: '852', py: 'xianggang hongkong' },
    { flag: '🇲🇴', name: '中国澳门',     dial: '853', py: 'aomen macao' },
    { flag: '🇹🇼', name: '中国台湾',     dial: '886', py: 'taiwan' },
    { flag: '🇸🇬', name: '新加坡',      dial: '65',  py: 'xinjiapo singapore' },
    { flag: '🇲🇾', name: '马来西亚',     dial: '60',  py: 'malaixiya malaysia' },
    { flag: '🇮🇩', name: '印度尼西亚',   dial: '62',  py: 'yindunixiya indonesia' },
    { flag: '🇹🇭', name: '泰国',        dial: '66',  py: 'taiguo thailand' },
    { flag: '🇻🇳', name: '越南',        dial: '84',  py: 'yuenan vietnam' },
    { flag: '🇮🇳', name: '印度',        dial: '91',  py: 'yindu india' },
    { flag: '🇯🇵', name: '日本',        dial: '81',  py: 'riben japan' },
    { flag: '🇰🇷', name: '韩国',        dial: '82',  py: 'hanguo korea' },
    { flag: '🇦🇺', name: '澳大利亚',     dial: '61',  py: 'aodaliya australia' },
    { flag: '🇺🇸', name: '美国',        dial: '1',   py: 'meiguo usa america' },
    { flag: '🇨🇦', name: '加拿大',       dial: '1',   py: 'jianada canada' },
    { flag: '🇧🇷', name: '巴西',        dial: '55',  py: 'baxi brazil' },
    { flag: '🇲🇽', name: '墨西哥',       dial: '52',  py: 'moxige mexico' },
    { flag: '🇨🇱', name: '智利',        dial: '56',  py: 'zhili chile' },
    { flag: '🇬🇧', name: '英国',        dial: '44',  py: 'yingguo uk britain' },
    { flag: '🇩🇪', name: '德国',        dial: '49',  py: 'deguo germany' },
    { flag: '🇫🇷', name: '法国',        dial: '33',  py: 'faguo france' },
    { flag: '🇮🇹', name: '意大利',       dial: '39',  py: 'yidali italy' },
    { flag: '🇪🇸', name: '西班牙',       dial: '34',  py: 'xibanya spain' },
    { flag: '🇳🇱', name: '荷兰',        dial: '31',  py: 'helan netherlands' },
    { flag: '🇵🇱', name: '波兰',        dial: '48',  py: 'bolan poland' },
    { flag: '🇹🇷', name: '土耳其',       dial: '90',  py: 'tuerqi turkey' },
    { flag: '🇷🇺', name: '俄罗斯',       dial: '7',   py: 'eluosi russia' },
    { flag: '🇸🇦', name: '沙特阿拉伯',   dial: '966', py: 'shate saudi' },
    { flag: '🇦🇪', name: '阿联酋',       dial: '971', py: 'alianqiu uae' },
    { flag: '🇿🇦', name: '南非',        dial: '27',  py: 'nanfei southafrica' },
    { flag: '🇳🇬', name: '尼日利亚',     dial: '234', py: 'nirileiya nigeria' },
    { flag: '🇪🇬', name: '埃及',        dial: '20',  py: 'aiji egypt' }
  ];

  function renderCountries(kw) {
    kw = (kw || '').trim().toLowerCase().replace(/^\+/, '');
    var rows = COUNTRIES.filter(function (c) {
      if (!kw) return true;
      return c.name.indexOf(kw) > -1 || c.dial.indexOf(kw) === 0 || c.py.indexOf(kw) > -1;
    });

    if (!rows.length) {
      countryList.innerHTML = '<li class="country-empty" >没有匹配的国家 / 地区</li>';
      return;
    }
    countryList.innerHTML = rows.map(function (c) {
      var cur = (c.name === countryName.textContent && c.dial === state.dial) ? ' is-current' : '';
      return '<li class="' + cur + '" data-name="' + c.name + '" data-dial="' + c.dial + '">' +
             '<span class="c-flag">' + c.flag + '</span>' +
             '<span class="c-name">' + c.name + '</span>' +
             '<span class="c-dial">+' + c.dial + '</span></li>';
    }).join('');
  }

  function openSheet(el) {
    el.hidden = false;
    el.setAttribute('aria-hidden', 'false');
    scrim.hidden = false;
    requestAnimationFrame(function () {
      scrim.classList.add('is-open');
      el.classList.add('is-open');
    });
  }

  function closeSheets() {
    [countrySheet, docSheet].forEach(function (el) {
      if (el.hidden) return;
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
      setTimeout(function () { el.hidden = true; }, 300);
    });
    scrim.classList.remove('is-open');
    setTimeout(function () { scrim.hidden = true; }, 300);
    state.openDoc = null;
  }

  countryBtn.addEventListener('click', function () {
    countrySearch.value = '';
    renderCountries('');
    openSheet(countrySheet);
  });

  countrySearch.addEventListener('input', function () { renderCountries(countrySearch.value); });

  countryList.addEventListener('click', function (e) {
    var li = e.target.closest('li[data-dial]');
    if (!li) return;
    countryName.textContent = li.dataset.name;
    state.dial = li.dataset.dial;
    dialCode.textContent = '+' + state.dial;
    phoneInput.value = '';
    phoneClear.hidden = true;
    resetCode();
    closeSheets();
    syncLogin();
  });

  scrim.addEventListener('click', closeSheets);
  $$('[data-close]').forEach(function (b) { b.addEventListener('click', closeSheets); });

  /* ── 协议全文 ─────────────────────────────────────── */
  var DOCS = {
    service: {
      title: '用户服务协议',
      html: '<p>本协议由您与三一集团（以下简称"三一"）就 MySANY 应用所提供的各项服务订立。请在使用前完整阅读。</p>' +
            '<h4>一、服务内容</h4><p>三一通过 MySANY 向您提供设备管理、工况查看、服务预约、配件商城、在线报修等功能。具体服务以应用内实际展示为准。</p>' +
            '<h4>二、账号与实名</h4><p>您应使用本人手机号或企业分配的账号注册与登录，并对账号下的一切操作负责。涉及设备控制、订单支付等敏感操作时，三一可能要求您完成实名认证。</p>' +
            '<h4>三、使用规范</h4><p>您承诺不利用本应用从事任何违反法律法规的活动，不干扰服务的正常运行，不非法获取他人设备数据。</p>' +
            '<h4>四、服务变更与中止</h4><p>因设备维护、系统升级或不可抗力导致服务中断的，三一将尽合理努力提前公告并及时恢复。</p>' +
            '<h4>五、争议解决</h4><p>本协议适用中华人民共和国法律。如发生争议，双方应友好协商；协商不成的，提交三一住所地有管辖权的人民法院裁决。</p>' +
            '<p style="margin-top:14px;color:#9A9AA0">（原型演示文本，不构成正式法律文件。）</p>'
    },
    privacy: {
      title: '隐私协议',
      html: '<p>三一非常重视您的隐私。本政策说明我们如何收集、使用、存储与保护您的个人信息。</p>' +
            '<h4>一、我们收集的信息</h4><p>手机号码与验证码：用于登录与身份校验。设备信息与日志：用于安全风控与故障排查。位置信息（可选）：用于就近匹配服务网点与救援。</p>' +
            '<h4>二、信息的使用</h4><p>仅用于向您提供服务、改进产品体验、保障账号安全，以及在您同意的前提下推送服务通知。</p>' +
            '<h4>三、对外提供</h4><p>除法律法规要求或取得您的单独同意外，我们不会向第三方共享您的个人信息。为完成服务所必需的委托处理方，将受与本政策同等的保密义务约束。</p>' +
            '<h4>四、存储与安全</h4><p>您的信息存储于中华人民共和国境内，采取加密传输与访问控制等措施保护。留存期限不超过实现处理目的所必需的最短时间。</p>' +
            '<h4>五、您的权利</h4><p>您可随时在"我的—设置"中查询、更正、删除您的个人信息，或注销账号。</p>' +
            '<p style="margin-top:14px;color:#9A9AA0">（原型演示文本，不构成正式法律文件。）</p>'
    }
  };

  $$('.doc-link').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();          // 避免点链接时连带切换 label 的复选框
      var key = a.dataset.doc;
      var doc = DOCS[key];
      state.openDoc = key;
      docTitle.textContent = doc.title;
      docBody.innerHTML = doc.html;
      docBody.scrollTop = 0;
      openSheet(docSheet);
    });
  });

  docAgree.addEventListener('click', function () {
    if (state.openDoc === 'service')  cbService.checked = true;
    if (state.openDoc === 'privacy')  cbPrivacy.checked = true;
    closeSheets();
    syncLogin();
  });

  /* ── 手机号 / 验证码 ──────────────────────────────── */
  function digits(v) { return v.replace(/\D/g, ''); }

  function phoneOk() {
    var v = digits(phoneInput.value);
    return state.dial === '86' ? v.length === 11 && /^1/.test(v) : v.length >= 5;
  }

  phoneInput.addEventListener('input', function () {
    phoneInput.value = digits(phoneInput.value);
    phoneClear.hidden = !phoneInput.value;
    refreshSendCode();
    syncLogin();
  });
  phoneClear.addEventListener('click', function (e) {
    e.preventDefault();
    phoneInput.value = '';
    phoneClear.hidden = true;
    phoneInput.focus();
    refreshSendCode();
    syncLogin();
  });
  codeInput.addEventListener('input', function () {
    codeInput.value = digits(codeInput.value);
    syncLogin();
  });

  function refreshSendCode() {
    if (state.timer) return;
    sendCode.classList.toggle('is-ready', phoneOk());
  }

  function resetCode() {
    clearInterval(state.tick);
    state.timer = 0;
    sendCode.textContent = '获取验证码';
    sendCode.classList.remove('is-counting');
    codeInput.value = '';
    state.sentCode = null;
    refreshSendCode();
  }

  sendCode.addEventListener('click', function () {
    if (state.timer) return;
    if (!phoneOk()) {
      toast(state.dial === '86' ? '请输入 11 位手机号码' : '请输入正确的手机号码');
      phoneInput.focus();
      return;
    }
    state.sentCode = String(Math.floor(100000 + Math.random() * 900000));
    toast('验证码已发送\n演示验证码：' + state.sentCode, 2600);

    state.timer = 60;
    sendCode.classList.remove('is-ready');
    sendCode.classList.add('is-counting');
    sendCode.textContent = state.timer + 's 后重发';
    state.tick = setInterval(function () {
      state.timer -= 1;
      if (state.timer <= 0) { resetCode(); return; }
      sendCode.textContent = state.timer + 's 后重发';
    }, 1000);
  });

  /* ── 账号 / 密码 ──────────────────────────────────── */
  [accountInput, passwordInput].forEach(function (el) {
    el.addEventListener('input', syncLogin);
  });

  togglePwd.addEventListener('click', function () {
    var show = passwordInput.type === 'password';
    passwordInput.type = show ? 'text' : 'password';
    togglePwd.setAttribute('aria-pressed', show ? 'true' : 'false');
    $('.eye-on', togglePwd).hidden = show;
    $('.eye-off', togglePwd).hidden = !show;
  });

  /* ── 登录按钮状态：两个协议都勾选 → 高亮 ──────────── */
  function bothAgreed() { return cbService.checked && cbPrivacy.checked; }

  function syncLogin() {
    var on = bothAgreed();
    loginBtn.classList.toggle('is-disabled', !on);
    loginBtn.setAttribute('aria-disabled', on ? 'false' : 'true');
  }

  [cbService, cbPrivacy].forEach(function (cb) {
    cb.addEventListener('change', syncLogin);
  });

  /* ── 提交 ─────────────────────────────────────────── */
  function fieldsFilled() {
    if (state.tab === 'phone') {
      if (!phoneOk())             return '请输入正确的手机号码';
      if (codeInput.value.length < 4) return '请输入验证码';
      if (state.sentCode && codeInput.value !== state.sentCode) return '验证码不正确';
      return null;
    }
    if (!accountInput.value.trim()) return '请输入账号';
    if (!passwordInput.value)       return '请输入密码';
    return null;
  }

  loginBtn.addEventListener('click', function () {
    if (loginBtn.classList.contains('is-loading')) return;

    // 未同时勾选两个协议：按钮不生效，抖动提示
    if (!bothAgreed()) {
      agreements.classList.remove('shake');
      void agreements.offsetWidth;
      agreements.classList.add('shake');
      var miss = !cbService.checked && !cbPrivacy.checked ? '用户服务协议和隐私协议'
               : !cbService.checked ? '用户服务协议' : '隐私协议';
      toast('请先阅读并同意' + miss);
      return;
    }

    var err = fieldsFilled();
    if (err) { toast(err); return; }

    loginBtn.classList.add('is-loading');
    $('.btn-label', loginBtn).textContent = '登录中';
    setTimeout(function () {
      loginBtn.classList.remove('is-loading');
      $('.btn-label', loginBtn).textContent = '登录';
      toast('登录成功，欢迎回来 👋', 2200);
      setTimeout(function () {
        var consentValid = false;
        try {
          var consent = JSON.parse(localStorage.getItem('mysany.cookieConsent.v1'));
          consentValid = !!(consent && consent.schemaVersion === '1.0' && consent.choices);
        } catch (e) {}
        location.href = consentValid ? 'home.html?from=login' : 'cookie-consent.html?flow=login';
      }, 600);
    }, 1200);
  });

  /* ── 其他入口 ─────────────────────────────────────── */
  $$('.social').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!bothAgreed()) {
        agreements.classList.remove('shake');
        void agreements.offsetWidth;
        agreements.classList.add('shake');
        toast('请先阅读并同意用户服务协议和隐私协议');
        return;
      }
      toast('正在唤起 ' + b.dataset.social + ' 授权…');
    });
  });

  $('#toRegister').addEventListener('click', function (e) {
    e.preventDefault();
    toast('跳转注册页（原型暂未实现）');
  });

  $$('[data-toast]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); toast(el.dataset.toast); });
  });

  /* 回车提交 */
  $$('.field input').forEach(function (el) {
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); loginBtn.click(); }
    });
  });

  /* ── 初始化 ───────────────────────────────────────── */
  tickClock();
  moveInk();
  window.addEventListener('resize', moveInk);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInk);
  renderCountries('');
  syncLogin();
  refreshSendCode();
})();
