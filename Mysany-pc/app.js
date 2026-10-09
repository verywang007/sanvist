/* ==========================================================================
   登录页逻辑（本地版，页面为 登录.html）
   默认账号 admin / 密码 123，验证通过后进入 工作台.html
   Cookies 设置入口复用 cookies.js，与工作台的「设置 › Cookies 设置」是同一个面板
   ========================================================================== */
(function () {
  'use strict';

  var ACCOUNT = { user: 'admin', pass: '123' };
  var HOME = '工作台.html';

  /* ---------------- i18n（文案取自原站语言包） ---------------- */
  var I18N = {
    'en-US': {
      label: 'English', htmlLang: 'en',
      scanTip: 'Scan qr code login more secure',
      tabPassword: 'Password Login', tabOtp: 'OTP Login',
      phEnter: 'Please enter', getCode: 'Get Code',
      agree: 'Agree ', privacyPolicy: 'Privacy Policy',
      serviceAgreement: 'User Service Agreement',
      cookieSettings: 'Cookies Settings',
      cookieStatus: '{n} / {m} categories enabled',
      loginBtn: 'Login', noAccount: 'No account yet?', registerNow: 'Register now',
      needPhone: 'Please enter phone number',
      needAgree: 'Please agree to the Privacy Policy and the User Service Agreement.',
      openDoc: 'Open: ',
      badLogin: 'Incorrect account or password (demo account: admin / 123)',
    },
    'zh-CN': {
      label: '简体中文', htmlLang: 'zh-CN',
      scanTip: '扫码登录更安全',
      tabPassword: '密码登录', tabOtp: '验证码登录',
      phEnter: '请输入', getCode: '获取验证码',
      agree: '同意', privacyPolicy: '隐私协议',
      serviceAgreement: '用户服务协议',
      cookieSettings: 'Cookies 设置',
      cookieStatus: '已启用 {n} / {m} 类',
      loginBtn: '登 录', noAccount: '还没有账号？', registerNow: '立即注册',
      needPhone: '请输入手机号',
      needAgree: '请先同意隐私协议和用户服务协议。',
      openDoc: '打开：',
      badLogin: '账号或密码不正确（演示账号：admin / 123）',
    },
  };

  var lang = localStorage.getItem('mysany_lang') || 'zh-CN';
  if (!I18N[lang]) lang = 'zh-CN';
  function t(k) { return I18N[lang][k]; }

  function applyLang() {
    var d = I18N[lang];
    document.documentElement.lang = d.htmlLang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (d[k] === undefined) return;
      if (el.id === 'otp-get-code' && el.disabled) return;
      el.textContent = d[k];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      if (d[k] !== undefined) el.placeholder = d[k];
    });
    document.getElementById('lang-label').textContent = d.label;
    document.querySelectorAll('#lang-menu .ant-dropdown-menu-item').forEach(function (li) {
      li.classList.toggle('is-active', li.getAttribute('data-lang') === lang);
    });
    localStorage.setItem('mysany_lang', lang);
    paintCk();
  }

  /* ---------------- 语言下拉 ---------------- */
  var trig = document.getElementById('lang-trigger');
  var menu = document.getElementById('lang-menu');
  trig.addEventListener('click', function (e) { e.stopPropagation(); menu.classList.toggle('hidden'); });
  menu.addEventListener('click', function (e) {
    var li = e.target.closest('.ant-dropdown-menu-item');
    if (!li) return;
    lang = li.getAttribute('data-lang');
    applyLang();
    menu.classList.add('hidden');
  });
  document.addEventListener('click', function () { menu.classList.add('hidden'); });

  /* ---------------- 密码显隐 ---------------- */
  var EYE_OFF = '<svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"/><path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"/></svg>';
  var EYE_ON = '<svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"/></svg>';
  var pwd = document.getElementById('basic_password');
  var eye = document.getElementById('pwd-toggle');
  eye.innerHTML = EYE_OFF;
  eye.addEventListener('click', function () {
    var show = pwd.type === 'password';
    pwd.type = show ? 'text' : 'password';
    eye.innerHTML = show ? EYE_ON : EYE_OFF;
  });

  /* ---------------- Tab 切换 ---------------- */
  var tabs = document.querySelectorAll('.login-type-item');
  var panels = document.querySelectorAll('.tab-panel');
  var tab = 'password';
  tabs.forEach(function (x) {
    x.addEventListener('click', function () {
      tab = x.getAttribute('data-tab');
      tabs.forEach(function (y) { y.classList.remove('login-type-item-active'); });
      x.classList.add('login-type-item-active');
      panels.forEach(function (p) { p.classList.toggle('hidden', p.getAttribute('data-panel') !== tab); });
      refresh();
    });
  });

  /* ---------------- 获取验证码倒计时 ---------------- */
  var codeBtn = document.getElementById('otp-get-code');
  codeBtn.addEventListener('click', function () {
    if (!document.getElementById('otp_phone').value.trim()) { alert(t('needPhone')); return; }
    var n = 60;
    codeBtn.disabled = true; codeBtn.textContent = n + 's';
    var tm = setInterval(function () {
      if (--n <= 0) { clearInterval(tm); codeBtn.disabled = false; codeBtn.textContent = t('getCode'); }
      else codeBtn.textContent = n + 's';
    }, 1000);
  });

  /* ---------------- 两项独立授权 + 按钮可用性 ---------------- */
  var agP = document.getElementById('agree-privacy');
  var agS = document.getElementById('agree-service');
  var btn = document.getElementById('login-btn');

  function filled() {
    if (tab === 'password') {
      return document.getElementById('basic_username').value.trim() !== '' &&
             document.getElementById('basic_password').value.trim() !== '';
    }
    return document.getElementById('otp_phone').value.trim() !== '' &&
           document.getElementById('otp_code').value.trim() !== '';
  }
  function refresh() {
    var ok = filled() && agP.checked && agS.checked;
    btn.disabled = !ok;
    btn.classList.toggle('is-enabled', ok);
  }
  document.querySelectorAll('.ant-input').forEach(function (i) { i.addEventListener('input', refresh); });
  agP.addEventListener('change', refresh);
  agS.addEventListener('change', refresh);

  /* ---------------- 协议链接 ---------------- */
  document.querySelectorAll('.link[data-doc]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      alert(t('openDoc') + (el.getAttribute('data-doc') === 'privacy' ? t('privacyPolicy') : t('serviceAgreement')));
    });
  });

  /* ---------------- Cookies 设置 ----------------
     调用 cookies.js 里的偏好中心，和「工作台 › 个人中心 › 设置 › Cookies 设置」
     是同一个抽屉、同一份文案、同一个 localStorage（ms_settings），
     在登录页做的选择进入工作台后依然生效。                                     */
  var ckEntry  = document.getElementById('ck-entry');
  var ckStatus = document.getElementById('ck-status');

  function paintCk() {
    if (!ckStatus) return;
    var s = MSCookies.load();
    ckStatus.textContent = t('cookieStatus')
      .replace('{n}', MSCookies.enabledCount(s))
      .replace('{m}', MSCookies.total);
  }

  function openCk() {
    MSCookies.openDrawer(MSCookies.load(), paintCk);
  }
  ckEntry.addEventListener('click', openCk);
  ckEntry.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCk(); }
  });

  /* ---------------- 提交 → 进入工作台 ---------------- */
  document.getElementById('basic').addEventListener('submit', function (e) {
    e.preventDefault();
    if (btn.disabled) return;
    if (!agP.checked || !agS.checked) { alert(t('needAgree')); return; }

    if (tab === 'password') {
      var u = document.getElementById('basic_username').value.trim();
      var p = document.getElementById('basic_password').value;
      if (u !== ACCOUNT.user || p !== ACCOUNT.pass) { alert(t('badLogin')); return; }
    }
    location.href = HOME;
  });

  /* ---------------- 初始化：预填演示账号并勾选授权 ---------------- */
  document.getElementById('basic_username').value = ACCOUNT.user;
  document.getElementById('basic_password').value = ACCOUNT.pass;
  agP.checked = true;
  agS.checked = true;

  applyLang();
  refresh();
})();
