/* ==========================================================================
   隐私协议 / 用户服务协议 变更 —— 强制重新同意（PC 工作台）
   页面：协议变更.html（= 工作台.html + 本弹窗）

   行为与 APP 端 privacy-update.html 一致：
   - 进入页面默认弹出，遮罩不可点关闭、Esc 无效，必须在「同意 / 拒绝」中选择
   - 《用户服务协议》《隐私协议》两行各自独立勾选，都勾上「同意」才生效
   - 正文里的协议名可点开全文（复用工作台的阅读大弹窗样式）
   - 拒绝 → 二次确认 → 退出态（可重新查看协议，或回登录页）

   依赖：app.css、cookies.css（toast）、policy-update.css、cookies.js（MSCookies.toast）
   ========================================================================== */
(function () {
  'use strict';

  /* 线上协议版本：真实项目里由后端下发，本地只留存"已同意的版本号"，
     再次进入时比对，不一致即触发强制重新同意。
     本页是演示页，无论本地记录如何都会弹出。                                */
  var POLICY = { version: '3.2', date: '2026-09-29' };
  var STORE_KEY = 'mysany.policy.agreedVersion';

  function remember(v) { try { localStorage.setItem(STORE_KEY, v); } catch (e) {} }

  function toast(msg, kind) {
    if (window.MSCookies) MSCookies.toast(msg, kind);
  }

  /* ---------------- 协议全文（本地示例文本，非正式法律文件） ---------------- */
  var DOCS = {
    service: {
      title: '用户服务协议',
      body:
        '<div class="note">以下为本地演示用的示例说明文本，<b>不是正式法律文件</b>，' +
        '不能替代官方发布的用户服务协议。请以官方条款为准。</div>' +
        '<h4>一、协议的接受与变更</h4>' +
        '<p>本协议由你与三一重工股份有限公司（以下简称「我们」）就使用 MySANY 平台及相关服务所订立。' +
        '你勾选同意即视为已充分阅读、理解并接受本协议全部条款。</p>' +
        '<p>我们可能会根据法律法规、业务调整等原因修订本协议。协议发生重大变更时，' +
        '我们将通过平台弹窗、站内信等显著方式通知你；你需重新确认同意后方可继续使用相关服务，' +
        '若你不同意变更内容，可选择停止使用。</p>' +
        '<h4>二、账号与安全</h4>' +
        '<p>你应妥善保管账号及密码。本次更新调整了账号安全与服务变更通知的条款表述：' +
        '发生异常登录时，我们会通过手机号或邮箱向你发送提醒；服务发生重大变更的，' +
        '我们将提前在平台内公示。</p>' +
        '<h4>三、服务内容</h4>' +
        '<p>我们向你提供设备管理、监控预警、保养计划、服务工单、机群报表等功能。' +
        '部分功能需要你单独授权相应的数据范围，你可以在「个人中心」中随时查看与撤回。</p>' +
        '<h4>四、使用规范</h4>' +
        '<p>你承诺不利用本服务从事违反法律法规、侵犯他人合法权益的行为，包括但不限于' +
        '发布违法信息、恶意抓取数据、干扰服务正常运行等。</p>' +
        '<h4>五、免责与争议解决</h4>' +
        '<p>因不可抗力或第三方原因导致的服务中断，我们将及时公告并尽力恢复。' +
        '本协议适用中华人民共和国法律，争议双方应友好协商，协商不成的提交我们住所地' +
        '有管辖权的人民法院处理。</p>' +
        '<div class="meta">示例文本版本：本地 v3.2 · ' + POLICY.date + ' 生效</div>',
    },
    privacy: {
      title: '隐私协议',
      body:
        '<div class="note">以下为本地演示用的示例说明文本，<b>不是正式法律文件</b>，' +
        '不能替代官方发布的隐私政策。请以官方条款为准。</div>' +
        '<h4>本次更新摘要</h4>' +
        '<p>更新了第三方 SDK 共享清单及其隐私政策地址；明确了设备定位信息与工况数据的' +
        '收集目的、使用范围与存储期限；新增撤回授权、注销账号与个人信息副本获取的操作指引。</p>' +
        '<h4>一、我们如何收集和使用个人信息</h4>' +
        '<ul><li>注册与登录：收集手机号码，用于创建账号、身份验证与安全风控。</li>' +
        '<li>设备管理：在你授权后收集设备定位、工况与故障数据，用于在线监控、保养提醒与故障诊断。</li>' +
        '<li>服务工单：收集你提交的联系方式与故障描述，用于派工与售后跟踪。</li></ul>' +
        '<h4>二、我们如何共享个人信息</h4>' +
        '<p>除获得你的单独同意或法律法规另有规定外，我们不会向第三方共享你的个人信息。' +
        '与第三方 SDK 的共享情况详见《个人信息共享清单》。</p>' +
        '<h4>三、我们如何存储和保护个人信息</h4>' +
        '<p>个人信息存储于中华人民共和国境内，存储期限为实现处理目的所必需的最短时间。' +
        '我们采取加密传输、访问控制、审计日志等措施保护信息安全。</p>' +
        '<h4>四、你的权利</h4>' +
        '<ul><li>在「个人中心」查询、复制、更正你的个人信息。</li>' +
        '<li>在「设置 › Cookies 设置」中撤回非必要的授权。</li>' +
        '<li>申请获取个人信息副本，或注销账号。</li></ul>' +
        '<h4>五、联系我们</h4>' +
        '<p>如有疑问，可拨打客服热线 400-887-8318，我们将在 15 个工作日内回复。</p>' +
        '<div class="meta">示例文本版本：本地 v3.2 · ' + POLICY.date + ' 生效</div>',
    },
    share: {
      title: '个人信息共享清单',
      body:
        '<div class="note">以下为本地演示用的示例说明文本，<b>不是正式法律文件</b>。' +
        '接入真实第三方服务后请替换为实际清单。</div>' +
        '<h4>一、第三方 SDK 共享清单</h4>' +
        '<p><b>推送服务 SDK</b><br>收集信息：设备标识符、网络状态<br>' +
        '使用目的：消息推送送达<br>隐私政策：见第三方官网公示地址</p>' +
        '<p><b>地图定位 SDK</b><br>收集信息：位置信息、设备标识符<br>' +
        '使用目的：设备定位与地图监控<br>隐私政策：见第三方官网公示地址</p>' +
        '<p><b>统计分析 SDK</b><br>收集信息：设备信息、使用行为日志<br>' +
        '使用目的：产品使用分析与体验优化<br>隐私政策：本次更新已同步最新地址</p>' +
        '<p><b>第三方登录 SDK</b><br>收集信息：授权后的开放平台唯一标识<br>' +
        '使用目的：账号快捷登录与绑定<br>隐私政策：见第三方官网公示地址</p>' +
        '<h4>二、关联方共享</h4>' +
        '<p>为向你提供整机售后与配件服务，我们可能向三一集团关联公司及授权服务商共享' +
        '必要的设备信息与联系方式，共享范围以实现服务目的所必需为限。</p>' +
        '<div class="meta">示例文本版本：本地 v3.2 · ' + POLICY.date + ' 生效</div>',
    },
  };

  var CHECK = '<svg viewBox="0 0 16 16"><path d="M3.6 8.4l3 3 5.8-6" fill="none" stroke="#fff" ' +
              'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ====================================================================
     协议全文：复用工作台的阅读大弹窗（.dlg-doc / .doc）
     ==================================================================== */
  function openDoc(key) {
    var d = DOCS[key];
    if (!d) return;
    var m = document.createElement('div');
    m.className = 'mask pu-docmask';
    m.innerHTML =
      '<div class="dlg dlg-lg dlg-doc">' +
        '<div class="dlg-hd">' +
          '<span class="back" data-x="1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m15 6-6 6 6 6"/></svg></span>' +
          '<h3>' + d.title + '</h3>' +
          '<span class="x" data-x="1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg></span>' +
        '</div>' +
        '<div class="dlg-bd"><div class="doc">' + d.body + '</div></div>' +
        '<div class="dlg-ft2"><button class="btn" data-x="1">返回</button></div>' +
      '</div>';
    document.body.appendChild(m);
    m.addEventListener('click', function (e) {
      if (e.target === m || e.target.closest('[data-x]')) m.remove();
    });
  }

  /* ====================================================================
     拒绝 → 二次确认
     ==================================================================== */
  function confirmReject(onOk) {
    var m = document.createElement('div');
    m.className = 'mask pu-confirm';
    m.innerHTML =
      '<div class="dlg"><h3>确认拒绝？</h3>' +
      '<p>拒绝后我们将无法继续为你提供 MySANY 的服务，本次会话将退出。' +
      '你可以随时重新登录并同意更新后的协议。</p>' +
      '<div class="dlg-ft">' +
        '<button class="btn" data-x="0">再看看</button>' +
        '<button class="btn btn-p" style="margin:0" data-x="1">仍然拒绝</button>' +
      '</div></div>';
    document.body.appendChild(m);
    m.addEventListener('click', function (e) {
      if (e.target === m) return m.remove();
      var b = e.target.closest('[data-x]');
      if (!b) return;
      m.remove();
      if (b.getAttribute('data-x') === '1') onOk();
    });
  }

  /* ====================================================================
     拒绝后的退出态
     ==================================================================== */
  function showExit() {
    var m = document.createElement('div');
    m.className = 'pu-exit';
    m.innerHTML =
      '<div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M14 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M9 8l-4 4 4 4M5 12h11"/></svg></div>' +
      '<h3>已退出 MySANY</h3>' +
      '<p>你未同意更新后的《用户服务协议》与《隐私协议》，暂时无法使用平台的相关服务。</p>' +
      '<div class="row">' +
        '<button class="pu-btn" data-act="login">返回登录页</button>' +
        '<button class="pu-btn pu-btn-p" data-act="again">重新查看协议</button>' +
      '</div>';
    document.body.appendChild(m);
    m.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (!b) return;
      if (b.getAttribute('data-act') === 'login') { location.href = '登录.html'; return; }
      m.remove();
      open();
    });
  }

  /* ====================================================================
     更新提示弹窗
     ==================================================================== */
  function open() {
    var mask = document.createElement('div');
    mask.className = 'pu-mask';
    mask.innerHTML =
      '<div class="pu-dlg" role="dialog" aria-modal="true" aria-labelledby="pu-title">' +
        '<div class="pu-hd">' +
          '<h3 id="pu-title">更新提示</h3>' +
          '<div class="pu-sub">版本 v' + POLICY.version + ' · ' + POLICY.date + ' 生效</div>' +
        '</div>' +

        '<div class="pu-bd">' +
          '<p>尊敬的用户，感谢您使用 MySANY 平台。为了更好地保障您的用户权益，' +
            '我们对《用户服务协议》与《隐私政策》进行了优化更新。本次更新主要涉及以下内容：</p>' +
          '<ol>' +
            '<li>更新了《隐私政策》与<span class="pu-link" data-doc="share">《个人信息共享清单》</span>中，' +
              '第三方 SDK 的名称、收集范围及其隐私政策地址；</li>' +
            '<li>明确了设备定位信息、工况数据的收集目的、使用范围与存储期限；</li>' +
            '<li>新增了撤回授权、注销账号与个人信息副本获取的操作指引；</li>' +
            '<li>调整了《用户服务协议》中关于账号安全与服务变更通知的条款表述。</li>' +
          '</ol>' +
          '<p>建议您仔细阅读并充分理解上述更新内容。如果您勾选同意或继续使用 MySANY 平台，' +
            '即表示您知情并接受更新后的协议内容。若您对更新后的《用户服务协议》与《隐私政策》' +
            '有异议，建议您暂停下一步操作。</p>' +
          '<p>如果您有任何疑问或需要任何帮助，欢迎随时联系我们（400-887-8318），' +
            '我们将竭诚为您解答。</p>' +
        '</div>' +
        '<div class="pu-fade" aria-hidden="true"></div>' +

        '<div class="pu-agree">' +
          '<label class="pu-row">' +
            '<input type="checkbox" data-ck="service" />' +
            '<span class="pu-cb" aria-hidden="true">' + CHECK + '</span>' +
            '<span class="pu-txt">同意<span class="u" data-doc="service">用户服务协议</span></span>' +
          '</label>' +
          '<label class="pu-row">' +
            '<input type="checkbox" data-ck="privacy" />' +
            '<span class="pu-cb" aria-hidden="true">' + CHECK + '</span>' +
            '<span class="pu-txt">同意<span class="u" data-doc="privacy">隐私协议</span></span>' +
          '</label>' +
        '</div>' +

        '<div class="pu-ft">' +
          '<button class="pu-btn" data-act="reject" type="button">拒绝</button>' +
          '<button class="pu-btn pu-btn-p is-disabled" data-act="agree" type="button" aria-disabled="true">同意</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(mask);
    void mask.offsetWidth;                 // 触发过渡
    mask.classList.add('is-open');

    var agreeBox = mask.querySelector('.pu-agree');
    var okBtn    = mask.querySelector('[data-act="agree"]');
    var boxes    = Array.prototype.slice.call(mask.querySelectorAll('.pu-row input'));
    var dlg      = mask.querySelector('.pu-dlg');
    var body     = mask.querySelector('.pu-bd');

    /* 正文还没读到底时，底部显示渐隐提示 */
    function syncFade() {
      dlg.classList.toggle('has-more', body.scrollTop + body.clientHeight < body.scrollHeight - 2);
    }
    body.addEventListener('scroll', syncFade);
    window.addEventListener('resize', syncFade);
    syncFade();

    function both() { return boxes.every(function (b) { return b.checked; }); }
    function sync() {
      var ok = both();
      okBtn.classList.toggle('is-disabled', !ok);
      okBtn.setAttribute('aria-disabled', ok ? 'false' : 'true');
    }
    boxes.forEach(function (b) { b.addEventListener('change', sync); });

    function close(done) {
      document.removeEventListener('keydown', onKey, true);
      window.removeEventListener('resize', syncFade);
      mask.classList.remove('is-open');
      setTimeout(function () { mask.remove(); if (done) done(); }, 260);
    }

    /* Esc 无效：必须做出选择 */
    function onKey(e) {
      if (e.key !== 'Escape') return;
      if (document.querySelector('.pu-docmask') || document.querySelector('.pu-confirm')) return;
      e.preventDefault();
      e.stopPropagation();
      toast('请先阅读并选择同意或拒绝', 'info');
    }
    document.addEventListener('keydown', onKey, true);

    mask.addEventListener('click', function (e) {
      /* 协议名 → 打开全文；不应顺带切换勾选框 */
      var doc = e.target.closest('[data-doc]');
      if (doc) { e.preventDefault(); e.stopPropagation(); openDoc(doc.getAttribute('data-doc')); return; }

      /* 遮罩不可关闭 */
      if (e.target === mask) { toast('请先阅读并选择同意或拒绝', 'info'); return; }

      var act = e.target.closest('[data-act]');
      if (!act) return;

      if (act.getAttribute('data-act') === 'agree') {
        if (!both()) {                      // 两个都勾上才生效，否则抖动提醒
          agreeBox.classList.remove('shake');
          void agreeBox.offsetWidth;
          agreeBox.classList.add('shake');
          var miss = !boxes[0].checked && !boxes[1].checked ? '用户服务协议和隐私协议'
                   : !boxes[0].checked ? '用户服务协议' : '隐私协议';
          toast('请先阅读并同意' + miss, 'info');
          return;
        }
        remember(POLICY.version);
        close(function () { toast('已同意更新后的协议，可继续使用 MySANY'); });
        return;
      }

      confirmReject(function () { close(showExit); });
    });

    sync();
  }

  /* 默认弹出（本页为协议变更演示页，每次进入都会弹） */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', open);
  } else {
    open();
  }
})();
