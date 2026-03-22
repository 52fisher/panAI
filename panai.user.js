// ==UserScript==
// @name              网盘智能识别助手（持续更新版）
// @namespace         https://github.com/52fisher/panAI
// @version           2.2.5
// @author            YouXiaoHou,52fisher
// @description       智能识别选中文字中的🔗网盘链接和🔑提取码，识别成功打开网盘链接并自动填写提取码，省去手动复制提取码在输入的烦恼。支持识别 ✅百度网盘 ✅阿里云盘 ✅腾讯微云 ✅蓝奏云 ✅天翼云盘 ✅移动云盘 ✅迅雷云盘 ✅123云盘 ✅360云盘 ✅115网盘 ✅奶牛快传 ✅城通网盘 ✅夸克网盘 ✅FlowUs息流 ✅Chrome 扩展商店 ✅Edge 扩展商店 ✅Firefox 扩展商店 ✅Windows 应用商店。
// @license           AGPL-3.0-or-later
// @homepage          https://github.com/52fisher/panAI
// @supportURL        https://github.com/52fisher/panAI
// @updateURL         https://ghproxy.net/https://raw.githubusercontent.com/52fisher/panAI/main/panai.user.js
// @downloadURL       https://ghproxy.net/https://raw.githubusercontent.com/52fisher/panAI/main/panai.user.js
// @match             *://*/*
// @require           https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.min.js
// @require           https://unpkg.com/hotkeys-js@3.13.3/dist/hotkeys.min.js
// @resource          swalStyle https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.min.css
// @run-at            document-idle
// @grant             GM_openInTab
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_registerMenuCommand
// @grant             GM_getResourceText
// @grant             GM_info
// @icon              data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBkPSJNMTAzLjYgMTA3LjRjMy41LTIuMiA4LjktNi4xIDEzLjgtMTIuNXM3LjMtMTIuNSA4LjUtMTYuNWMuNS0xLjcgMi4yLTcuNSAyLjItMTQuNyAwLTEwLjEtMy4zLTI1LjEtMTUuNC0zNi44LTE0LjUtMTQtMzIuMS0xNC4zLTM1LjctMTQuMy04IDAtMTUuNyAxLjktMjIuNiA1LjJDNDQgMjMgMzUuNyAzMS40IDMwLjggNDEuN2MtMS4zIDIuOC00IDQuNy03LjEgNS00IC4zLTcuNSA0LjQtOC45IDkuNi0uNSAxLjktMS42IDMuNS0zLjEgNC43QzQuNCA2Ni44IDAgNzUuNyAwIDg1YzAgNi44IDIuMyAxMy4xIDYuMSAxOC4yIDUuNSA3LjQgMTQuMiAxMi4yIDI0IDEyLjJoNDcuMWM0LjQgMCAxMS0uNSAxOC4zLTMuNSAzLjItMS40IDUuOS0zIDguMS00LjV6IiBmaWxsPSIjNDQ0Ii8+PHBhdGggZD0iTTExOS44IDY0LjNjLjEtMTcuMS0xMC40LTI4LTEyLjUtMzAuMUM5NSAyMi4xIDc5LjkgMjEuOCA3Ni45IDIxLjhjLTE3LjYgMC0zMy4zIDEwLjUtMzkuOSAyNi43LS42IDEuMy0xLjggMi4zLTMuNCAyLjNoLS40Yy01LjggMC0xMC42IDQuOC0xMC42IDEwLjd2LjVjMCAxLjQtLjggMi42LTEuOSAzLjNDMTMuNCA2OSA4LjggNzYuOCA4LjggODVjMCAxMi4yIDkuOSAyMi4zIDIyLjIgMjIuM2g0NS4yYzMuNi0uMSAxNy42LS45IDI5LjYtMTIgMi45LTIuOCAxMy45LTEzLjcgMTQtMzF6IiBmaWxsPSIjZGI4NDEyIi8+PHBhdGggZD0iTTExMC44IDU3LjRsLjIgMy4zYzAgMS4zLTEuMSAyLjQtMi4zIDIuNC0xLjMgMC0yLjMtMS4xLTIuMy0yLjRsLS4xLTIuOHYtLjNjMC0xLjIuOS0yLjIgMi4xLTIuM2guM2MuNyAwIDEuMy4zIDEuNy43LS4yLjEuMy41LjQgMS40em0tMy4zLTEwLjNjMCAxLjItMSAyLjMtMi4yIDIuM2gtLjFjLS44IDAtMS42LS41LTItMS4yLTQuNi04LjMtMTMuMy0xMy41LTIyLjgtMTMuNS0xLjIgMC0yLjMtMS0yLjMtMi4ydi0uMWMwLTEuMiAxLTIuMyAyLjItMi4zaC4xYTMwLjM3IDMwLjM3IDAgMCAxIDE1LjggNC40YzQuNiAyLjggOC40IDYuOCAxMS4xIDExLjUuMS4zLjIuNy4yIDEuMXpNNjkuMiA0OWwxOS40IDE0LjhjMS45IDEuNSAzLjEgMy41IDMuNSA1Ljd2LjJjLjEuNC4xLjguMSAxLjIgMCAuNi0uMSAxLjEtLjIgMS42LS40IDIuMi0xLjcgNC4yLTMuNSA1LjZMNjkuMyA5M2MtMi42IDItNS40IDIuNS03LjcgMS40LS4xLS4xLS4yLS4xLS4yLS4yLTItMS4yLTMuMi0zLjUtMy4yLTYuNHYtNi42aC01LjdjLTYuOCAwLTEyLTQuNy0xMi0xMC45IDAtNC44IDIuNi04LjUgNy4yLTEwLjMgMS4zLS41IDIuNy4yIDMuMiAxLjVzLS4xIDIuOC0xLjQgMy4zYy0yLjcgMS4xLTQgMi45LTQgNS41IDAgMy41IDMgNiA3IDZoOC4xYy41IDAgMSAuMiAxLjQuNi43LjYgMS4xIDEuNyAxLjEgMi42djguNGMwIDEuMy40IDIgLjcgMi4xLjQuMiAxLjMgMCAyLjQtLjlsMTkuMi0xNC45YzEuMi0uOSAxLjgtMi4xIDEuOC0zLjNzLS42LTIuMy0xLjctMy4xTDY2LjIgNTNjLTEuMS0uOS0yLTEuMS0yLjQtLjktLjMuMi0uNy45LS43IDIuMXY3LjZjMCAuOS0uNSAxLjctMS4yIDIuMS0uNC4zLS44LjQtMS4zLjQtMS40IDAtMi41LTEuMS0yLjUtMi41di03LjZjMC0zLjEgMS4zLTUuNSAzLjUtNi42bC43LS4zYzIuMS0uNyA0LjYtLjEgNi45IDEuN3oiIGZpbGw9IiM0NDQiLz48L3N2Zz4=
// ==/UserScript==

(function () {
    'use strict';

    const customClass = {
        container: 'panai-container',
        popup: 'panai-popup',
    };

    let toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    let util = {
        clog(c) {
            console.group("%c %c [网盘智能识别助手]", `background:url(${GM_info.script.icon}) center center no-repeat;background-size:12px;padding:3px`, "");
            console.log(c);
            console.groupEnd();
        },

        parseQuery(name) {
            let reg = new RegExp(`(?<=(?:${name})\\=)[\\w-]+`, "i")
            let pd = location.href.match(reg);
            if (pd) {
                return pd[0];
            }
            return null;
        },

        getValue(name) {
            return GM_getValue(name);
        },

        setValue(name, value) {
            GM_setValue(name, value);
        },

        sleep(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        },

        addStyle(id, tag, css) {
            tag = tag || 'style';
            let doc = document, styleDom = doc.getElementById(id);
            if (styleDom) return;
            let style = doc.createElement(tag);
            style.rel = 'stylesheet';
            style.id = id;
            tag === 'style' ? style.innerHTML = css : style.href = css;
            document.head.appendChild(style);
        },

        isHidden(el) {
            try {
                return el.offsetParent === null;
            } catch (e) {
                return false;
            }
        },

        isMobile: (() => !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|HarmonyOS|MicroMessenger)/i))(),

        query(selector) {
            if (Array.isArray(selector)) {
                let obj = null;
                for (let i = 0; i < selector.length; i++) {
                    let o = document.querySelector(selector[i]);
                    if (o) {
                        obj = o;
                        break;
                    }
                }
                return obj;
            }
            return document.querySelector(selector);
        }
    };

    let opt = {
        'baidu': {
            reg: /((?:https?:\/\/)?(?:e?yun|pan)\.baidu\.com\/(doc\/|enterprise\/)?(?:s\/[\w~]*(((-)?\w*)*)?|share\/\S{4,}))/,
            host: /(pan|e?yun)\.baidu\.com/,
            input: ['#accessCode', '.share-access-code', '#wpdoc-share-page > .u-dialog__wrapper .u-input__inner'],
            button: ['#submitBtn', '.share-access .g-button', '#wpdoc-share-page > .u-dialog__wrapper .u-btn--primary'],
            name: '百度网盘',
            storage: 'hash',
            autoCompleteReg: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\b[\w-]{23}\b/,
            autoCompleteUrlPrefix: 'https://pan.baidu.com/s/'
        },
        'aliyun': {
            reg: /((?:https?:\/\/)?(?:(?:www\.)?(?:aliyundrive|alipan)\.com\/s|alywp\.net)\/[a-zA-Z\d]+)/,
            host: /www\.(aliyundrive|alipan)\.com|alywp\.net/,
            input: ['form .ant-input', 'form input[type="text"]', 'input[name="pwd"]'],
            button: ['form .button--fep7l', 'form button[type="submit"]'],
            name: '阿里云盘',
            storage: 'hash'
        },
        'weiyun': {
            reg: /((?:https?:\/\/)?share\.weiyun\.com\/[a-zA-Z\d]+)/,
            host: /share\.weiyun\.com/,
            input: ['.mod-card-s input[type=password]', 'input.pw-input'],
            button: ['.mod-card-s .btn-main', ".pw-btn-wrap button.btn"],
            name: '微云',
            storage: 'hash'
        },
        'lanzou': {
            reg: /((?:https?:\/\/)?(?:[a-zA-Z0-9\-.]+)?(?:lanzou[a-z]|lanzn|lanpv)\.com\/[a-zA-Z\d_\-]+(?:\/[\w-]+)?)/,
            host: /(?:[a-zA-Z\d-.]+)?(?:lanzou[a-z]|lanzn|lanpv)\.com/,
            input: ['#pwd'],
            button: ['.passwddiv-btn', '#sub'],
            name: '蓝奏云',
            storage: 'hash',
        },
        'ilanzou': {
            reg: /(?:https?:\/\/)?(?:[a-zA-Z0-9\-.]+)?ilanzou\.com\/s\/[?=\w-]+/,
            host: /www\.ilanzou\.com/,
            input: ['.code-input'],
            button: ['.code-checkbefore'],
            name: '蓝奏云优享版',
            storage: 'hash'
        },
        'tianyi': {
            reg: /((?:https?:\/\/)?cloud\.189\.cn\/(?:t\/|web\/share\?code=)?[a-zA-Z\d]+)/,
            host: /cloud\.189\.cn/,
            input: ['.access-code-item #code_txt', "input.access-code-input"],
            button: ['.access-code-item .visit', ".button"],
            name: '天翼云盘',
            storage: (() => util.isMobile === true ? 'local' : 'hash')(),
            storagePwdName: 'tmp_tianyi_pwd'
        },
        'caiyun': {
            reg: /((?:https?:\/\/)?caiyun\.139\.com\/(?:m\/i|w\/i\/|web\/|front\/#\/detail)\??(?:linkID=)?[a-zA-Z\d]+)/,
            host: /caiyun\.139\.com/,
            input: ['.token-form input[type=text]'],
            button: ['.token-form .btn-token'],
            name: '移动云盘',
            storage: 'local',
            storagePwdName: 'tmp_yun139_pwd'
        },
        'yun139': {
            reg: /(?:https?:\/\/)?yun\.139\.com\/share(?:web|wap)\/#\/[wm]\/i\/\w+/,
            host: /yun\.139\.com/,
            input: ['.token-form input[type=text]'],
            button: ['.token-form .btn-token'],
            name: '中国移动云盘',
            storage: 'local',
            storagePwdName: 'tmp_yun139_pwd',
        },
        'xunlei': {
            reg: /((?:https?:\/\/)?pan\.xunlei\.com\/s\/[\w-]{10,})/,
            host: /pan\.xunlei\.com/,
            input: ['.pass-input-wrap .td-input__inner'],
            button: ['.pass-input-wrap .td-button'],
            name: '迅雷云盘',
            storage: 'hash',
            autoCompleteReg: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\b[\w-]{26}\b/,
            autoCompleteUrlPrefix: 'https://pan.xunlei.com/s/'
        },
        '123pan': {
            reg: /((?:https?:\/\/)?www\.(?:123pan|123865|123684|123652|123912)\.com\/s\/[\w-]{6,})/,
            host: /www\.(?:123pan|123865|123684|123652|123912)\.com/,
            input: ['.ca-fot input', ".appinput .appinput"],
            button: ['.ca-fot button', ".appinput button"],
            name: '123云盘',
            storage: 'hash'
        },
        '360': {
            reg: /((?:https?:\/\/)?(?:[a-zA-Z\d\-.]+)?(?:yunpan\.360\.cn|yunpan\.com)(\/lk)?\/surl_\w{6,})/,
            host: /[\w.]+?yunpan\.com/,
            input: ['.pwd-input'],
            button: ['.submit-btn'],
            name: '360云盘',
            storage: 'local',
            storagePwdName: 'tmp_360_pwd'
        },
        '115': {
            reg: /((?:https?:\/\/)?115(?:cdn)?\.com\/s\/[a-zA-Z\d]+)/,
            host: /115(?:cdn)?\.com/,
            input: ['input[placeholder="请输入访问码"]'],
            button: ['button.w-full'],
            name: '115网盘',
            storage: 'hash'
        },
        'ctfile': {
            reg: /((?:https?:\/\/)?(?:[a-zA-Z\d-.]+)?(?:ctfile|545c|u062|ghpym)\.com\/\w+\/[a-zA-Z\d-]+)/,
            host: /(?:[a-zA-Z\d-.]+)?(?:ctfile|545c|u062)\.com/,
            input: ['#passcode'],
            button: ['.card-body button'],
            name: '城通网盘',
            storage: 'hash'
        },
        'quark': {
            reg: /((?:https?:\/\/)?pan\.quark\.cn\/s\/[a-zA-Z\d-]+)/,
            host: /pan\.quark\.cn/,
            input: ['input[class*=ShareReceive]'],
            button: ['.ant-btn-primary'],
            name: '夸克网盘',
            storage: 'local',
            storagePwdName: 'tmp_quark_pwd',
            autoCompleteReg: /(?=.*[a-z])(?=.*[0-9])\b[a-z0-9]{12}\b/,
            autoCompleteUrlPrefix: 'https://pan.quark.cn/s/'
        },
        'pikpak': {
            reg: /((?:https?:\/\/)?mypikpak\.com\/s\/[a-zA-Z\d-]+)/,
            host: /(?:[a-zA-Z\d-.]+)?mypikpak\.com/,
            input: ['.el-input__wrapper input'],
            button: ['.passcode-input+button'],
            name: 'PikPak',
            storage: 'hash',
        },
        'feijipan': {
            reg: /((?:https?:\/\/)?share\.feijipan\.com\/s\/[a-zA-Z\d-]+)/,
            host: /share\.feijipan\.com/,
            name: '飞机盘',
            storage: 'hash'
        },
        'vdisk': {
            reg: /(?:https?:\/\/)?vdisk.weibo.com\/lc\/\w+/,
            host: /vdisk\.weibo\.com/,
            input: ['#keypass', "#access_code"],
            button: ['.search_btn_wrap a', "#linkcommon_btn"],
            name: '微盘',
            storage: 'hash',
        },
        'wenshushu': {
            reg: /((?:https?:\/\/)?(?:www\.wenshushu|ws28)\.cn\/(?:k|box|f)\/\w+)/,
            host: /www\.wenshushu\.cn/,
            input: ['.pwd-inp .ivu-input'],
            button: ['.pwd-inp .ivu-btn'],
            name: '文叔叔网盘',
            storage: 'local',
            storagePwdName: 'tmp_wenshushu_pwd'
        },
        'uc': {
            reg: /(?:https?:\/\/)?drive\.uc\.cn\/s\/[a-zA-Z\d]+/,
            host: /drive\.uc\.cn/,
            input: ["input[class*='ShareReceivePC--input']", '.input-wrap input'],
            button: ["button[class*='ShareReceivePC--submit-btn'", '.input-wrap button'],
            name: 'UC云盘',
            storage: 'hash'
        },
        'jianguoyun': {
            reg: /((?:https?:\/\/)?www\.jianguoyun\.com\/p\/[\w-]+)/,
            host: /www\.jianguoyun\.com/,
            input: ['input[type=password]'],
            button: ['.ok-button', '.confirm-button'],
            name: '坚果云',
            storage: 'hash'
        },
        'wo': {
            reg: /(?:https?:\/\/)?pan\.wo\.cn\/s\/[\w_]+/,
            host: /(pan\.wo\.cn|panservice\.mail\.wo\.cn)/,
            input: ['input.el-input__inner', ".van-field__control"],
            button: ['.s-button', ".share-code button"],
            name: '联通云盘',
            storage: (() => util.isMobile === true ? 'local' : 'hash')(),
            storagePwdName: 'tmp_wo_pwd'
        },
        'mega': {
            reg: /((?:https?:\/\/)?(?:mega\.nz|mega\.co\.nz)\/#F?![\w!-]+)/,
            host: /(?:mega\.nz|mega\.co\.nz)/,
            input: ['.dlkey-dialog input'],
            button: ['.dlkey-dialog .fm-dialog-new-folder-button'],
            name: 'Mega',
            storage: 'local'
        },
        'qfile': {
            reg: /((?:https?:\/\/)?qfile\.qq\.com\/q\/[0-9a-zA-Z]+)/,
            host: /qfile\.qq\.com/,
            name: 'QQ闪传',
        },
        'yukaidi': {
            reg: /((?:https?:\/\/)?silver\.yukaidi\.com\/s\/[a-zA-Z\d]+)/,
            host: /silver\.yukaidi\.com/,
            name: 'yukaidi银盘',
        },
        'pansod': {
            reg: /((?:https?:\/\/)?pan\.lansod\.cn\/s\/[a-zA-Z\d]+)/,
            host: /pan\.lansod\.cn/,
            name: ' 小蓝云盘',
        },
        'now61': {
            reg: /((?:https?:\/\/)?www\.now61\.cn\/s\/[a-zA-Z\d]+)/,
            host: /www\.now61\.cn/,
            name: '六一云盘',
        },
        '520vip': {
            reg: /((?:https?:\/\/)?www\.(?:520-vip|eos-53)\.com\/file-\d+\.html)/,
            host: /www\.520-vip\.com/,
            name: '520云盘',
        },
        '567pan': {
            reg: /((?:https?:\/\/)?www\.567(?:pan|yun|file|inc)\.(?:com|cn)\/file-\d+\.html)/,
            host: /www\.567inc\.cn/,
            name: '567盘',
            replaceHost: "www.567inc.com",
        },
        'ayunpan': {
            reg: /((?:https?:\/\/)?www\.ayunpan\.com\/file-\d+\.html)/,
            host: /www\.ayunpan\.com/,
            name: 'AYunPan',
        },
        'iycdn.com': {
            reg: /((?:https?:\/\/)?www\.iycdn\.com\/file-\d+\.html)/,
            host: /www\.iycdn\.com/,
            name: '爱优网盘',
        },
        'feimaoyun': {
            reg: /((?:https?:\/\/)?www\.feimaoyun\.com\/s\/[0-9a-zA-Z]+)/,
            host: /www\.feimaoyun\.com/,
            name: '飞猫盘',
        },
        'uyunp.com': {
            reg: /((?:https?:\/\/)?download\.uyunp\.com\/share\/s\/short\/\?surl=[0-9a-zA-Z]+)/,
            host: /download\.uyunp\.com/,
            name: '优云下载',
        },
        'dudujb': {
            reg: /(?:https?:\/\/)?www\.dudujb\.com\/file-\d+\.html/,
            host: /www\.dudujb\.com/,
            name: '贵族网盘',
        },
        'xunniu': {
            reg: /(?:https?:\/\/)?www\.xunniu(?:fxp|wp|fx)\.com\/file-\d+\.html/,
            host: /www\.xunniuwp\.com/,
            name: '迅牛网盘',
        },
        'xueqiupan': {
            reg: /(?:https?:\/\/)?www\.xueqiupan\.com\/file-\d+\.html/,
            host: /www\.xueqiupan\.com/,
            name: '雪球云盘',
        },
        '77file': {
            reg: /(?:https?:\/\/)?www\.77file\.com\/s\/[a-zA-Z\d]+/,
            host: /www\.77file\.com/,
            name: '77file',
        },
        'ownfile': {
            reg: /(?:https?:\/\/)?ownfile\.net\/files\/[a-zA-Z\d]+\.html/,
            host: /ownfile\.net/,
            name: 'OwnFile',
        },
        'feiyunfile': {
            reg: /(?:https?:\/\/)?www\.feiyunfile\.com\/file\/[\w=]+\.html/,
            host: /www\.feiyunfile\.com/,
            name: '飞云网盘',
        },
        'google': {
            reg: /(?:https?:\/\/)?drive\.google\.com\/file\/d\/[\w-]+/,
            host: /drive\.google\.com/,
            name: 'Google云端硬盘',
        },
        'yifile': {
            reg: /(?:https?:\/\/)?www\.yifile\.com\/f\/\w+/,
            host: /www\.yifile\.com/,
            name: 'YiFile',
        },
        'dufile': {
            reg: /(?:https?:\/\/)?dufile\.com\/file\/\w+\.html/,
            host: /dufile\.com/,
            name: 'duFile',
        },
        '116pan': {
            reg: /https:\/\/www\.116pan\.xyz\/f\/[a-zA-Z\d]+/,
            host: /www\.116pan\.xyz/,
            name: '116网盘',
        },
        'nitroflare': {
            reg: /https?:\/\/(?:www\.)?nitroflare\.com\/view\/[\w/]+/,
            host: /nitroflare\.com/,
            name: 'NitroFlare',
        },
        'flowus': {
            reg: /((?:https?:\/\/)?flowus\.cn\/[\S ^\/]*\/?share\/[a-z\d]{8}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{12})/,
            host: /flowus\.cn/,
            name: 'FlowUs息流',
            storage: 'hash'
        },
        'seewopinco': {
            reg: /((?:https?:\/\/)?pinco\.seewo\.com\/s\/[0-9a-zA-Z]+)/,
            host: /pinco\.seewo\.com/,
            name: '希沃品课',
        },
        'steam': {
            reg: /https?:\/\/store\.steampowered\.com\/app\/(\d+|[^\/\?\#]+)/,
            host: /store\.steampowered\.com/,
            name: 'Steam商店'
        },
        'chrome': {
            reg: /^https?:\/\/chrome.google.com\/webstore\/.+?\/([a-z]{32})(?=[\/#?]|$)/,
            host: /chrome\.google\.com/,
            replaceHost: "chrome.crxsoso.com",
            name: 'Chrome商店',
        },
        'edge': {
            reg: /^https?:\/\/microsoftedge.microsoft.com\/addons\/.+?\/([a-z]{32})(?=[\/#?]|$)/,
            host: /microsoftedge\.microsoft\.com/,
            replaceHost: "microsoftedge.crxsoso.com",
            name: 'Edge商店',
        },
        'firefox': {
            reg: /^https?:\/\/(reviewers\.)?(addons\.mozilla\.org|addons(?:-dev)?\.allizom\.org)\/.*?(?:addon|review)\/([^/<>"'?#]+)/,
            host: /addons\.mozilla\.org/,
            replaceHost: "addons.crxsoso.com",
            name: 'Firefox商店',
        },
        'microsoft': {
            reg: /^https?:\/\/(?:apps|www).microsoft.com\/(?:store|p)\/.+?\/([a-zA-Z\d]{10,})(?=[\/#?]|$)/,
            host: /(apps|www)\.microsoft\.com/,
            replaceHost: "apps.crxsoso.com",
            name: 'Windows商店',
        }
    };

    let main = {
        lastText: "lorem&",

        //初始化配置数据
        initValue() {
            let value = [{
                name: 'setting_success_times',
                value: 0
            }, {
                name: 'setting_auto_click_btn',
                value: true
            }, {
                name: 'setting_active_in_front',
                value: true
            }, {
                name: 'setting_timer_open',
                value: false
            }, {
                name: 'setting_auto_complete',
                value: false
            }, {
                name: 'setting_text_as_password',
                value: false
            }, {
                name: 'setting_timer',
                value: 5000
            }, {
                name: 'setting_auto_detect_unknown_disk',
                value: false
            }, {
                name: 'setting_hotkeys',
                value: 'F1'
            }];

            value.forEach((v) => {
                if (util.getValue(v.name) === undefined) {
                    util.setValue(v.name, v.value);
                }
            });
        },

        // 监听选择事件
        addPageListener() {
            document.addEventListener("mouseup", this.smartIdentify.bind(this), true);
            document.addEventListener("keydown", this.pressKey.bind(this), true);
        },

        // ⚠️可能会增加时间⚠️ 如果有需要可以增加选项
        // 获取选择内容的HTML和文本(增加兼容性) 或 DOM（节点遍历）
        getSelectionHTML(selection, isDOM = false) {
            const testDiv = document.createElement("div");
            if (!selection.isCollapsed) {
                // Range 转 DocumentFragment
                const docFragment = selection.getRangeAt(0).cloneContents();
                testDiv.appendChild(docFragment);
            }
            // 拼接选中文本，增加兼容
            return isDOM ? testDiv : selection.toString();
        },

        smartIdentify(event, str = '') {
            let selection = window.getSelection();
            let text = str || this.getSelectionHTML(selection);
            //自动推导网盘前缀的开关
            const isAutoComplete = util.getValue('setting_auto_complete');
            const isTextAsPassword = util.getValue('setting_text_as_password');
            const isPanLinkBackup = util.getValue('setting_auto_detect_unknown_disk');
            //选择相同文字或空不识别
            if (text === this.lastText || text === '') {
                return;
            }
            let start = performance.now();
            this.lastText = text;
            util.clog(`当前选中文字：${text}`);
            let linkObj = this.parseLink(text);
            util.clog(`解析结果：${JSON.stringify(linkObj)}`);
            let link = linkObj.link;
            let name = linkObj.name;
            let pwd = this.parsePwd(text);
            if (!link) {
                // 未识别到链接，备用方案：从父元素解析链接
                linkObj = this.parseParentLink(selection);
                util.clog(`从父元素解析结果：${JSON.stringify(linkObj)}`);
                link = linkObj.link;
                name = linkObj.name;
            }
            if (isTextAsPassword && !pwd) {
                pwd = this.parseLinkInnerTextAsPwd(selection);
            }
            if (isAutoComplete && !link) {
                // 未识别到链接，备用方案：自动补全链接(在设置中打开 自动推导网盘前缀 功能开关)
                linkObj = this.parseLink(text, true);
                util.clog(`自动补全解析结果：${JSON.stringify(linkObj)}`);
                link = linkObj.link;
                name = linkObj.name;
            }
            if (isPanLinkBackup && !link) {
                //未识别到链接，备用方案：不依赖已知网盘域名白名单的智能推测
                if (!this.inferPanLink(text)) {
                    return;
                }
                linkObj = this.parseLink(text, false, true);
                util.clog(`智能推测解析结果：${JSON.stringify(linkObj)}`);
                link = linkObj.link;
                name = linkObj.name;
                let end = performance.now();
                let time = (end - start).toFixed(3);
                util.clog(`文本识别结果：${name} 链接：${link} 密码：${pwd} 耗时：${time}毫秒`);
                let option = {
                    toast: true,
                    showCancelButton: true,
                    position: 'top',
                    title: `AI发现<span style="color: #2778c4;margin: 0 5px;">${name}</span>链接`,
                    html: `<span style="font-size: 0.8em;">${!!pwd ? '密码：' + pwd : '是否打开？'}</span>`,
                    confirmButtonText: '打开',
                    cancelButtonText: '关闭',
                    customClass
                };
                if (util.getValue('setting_timer_open')) {
                    option.timer = util.getValue('setting_timer');
                    option.timerProgressBar = true;
                }
                util.setValue('setting_success_times', util.getValue('setting_success_times') + 1);
                Swal.fire(option).then(res => {
                    if (res.isConfirmed) {
                        // 获取是否在前台打开的设置
                        const active = util.getValue('setting_active_in_front');
                        util.clog(`密码：${pwd}`);
                        pwd && util.setValue(linkObj.storagePwdName, pwd);
                        let targetLink = link;
                        GM_openInTab(targetLink, { active });
                    }
                });
                return;
            }
            if (!link) {
                return;
            }
            if (!/https?:\/\//.test(link)) {
                link = 'https://' + link;
            }
            let end = performance.now();
            let time = (end - start).toFixed(3);
            util.clog(`文本识别结果：${name} 链接：${link} 密码：${pwd} 耗时：${time}毫秒`);
            let option = {
                toast: true,
                showCancelButton: true,
                position: 'top',
                title: `发现<span style="color: #2778c4;margin: 0 5px;">${name}</span>链接`,
                html: `<span style="font-size: 0.8em;">${!!pwd ? '密码：' + pwd : '是否打开？'}</span>`,
                confirmButtonText: '打开',
                cancelButtonText: '关闭',
                customClass
            };
            if (util.getValue('setting_timer_open')) {
                option.timer = util.getValue('setting_timer');
                option.timerProgressBar = true;
            }
            util.setValue('setting_success_times', util.getValue('setting_success_times') + 1);

            Swal.fire(option).then((res) => {
                this.lastText = 'lorem&';
                selection.empty();
                //防御式编程
                if (!res.isConfirmed && res.dismiss !== 'timer') {
                    return;
                }
                // 获取是否在前台打开的设置
                const active = util.getValue('setting_active_in_front');
                let targetLink = link;
                // 密码为空时，直接打开链接
                if (!pwd) {
                    GM_openInTab(targetLink, { active });
                    return;
                }
                // 存储方式为local时，将密码存储到本地存储
                // 根据存储类型决定如何处理链接
                if (linkObj.storage === "local") {
                    util.setValue(linkObj.storagePwdName, pwd);
                } else if (linkObj.storage === "hash") {
                    // 链接中没有#：使用三目运算符直接拼接pwd参数和#hash
                    targetLink = link.includes('?') ? `${link}&pwd=${pwd}#${pwd}` : `${link}?pwd=${pwd}#${pwd}`;
                    // 若为hash模式：需要考虑框架路由情况
                    if (link.includes('#')) {
                        // 链接中已有#，可能是使用了Vue等框架的路由模式
                        // 检查#后面的内容是否符合框架路由特征（通常包含/或?等）
                        const hashIndex = link.indexOf('#');
                        const hashPart = link.slice(hashIndex + 1);
                        const urlPart = link.slice(0, hashIndex); // 提取#前面的URL部分
                        // 判断是否为框架路由模式（这里通过简单规则判断，可根据需要调整）
                        const isFrameworkRoute = hashPart.startsWith('/') || hashPart.includes('?') || hashPart.includes('=');
                        if (isFrameworkRoute) {
                            // 框架路由模式：在#前面添加pwd查询参数，不影响hash路由
                            targetLink = urlPart.includes('?') ? `${urlPart}&pwd=${pwd}#${hashPart}` : `${urlPart}?pwd=${pwd}#${hashPart}`;
                        }
                    }
                }
                // 打开标签页
                GM_openInTab(targetLink, { active });
            });
        },
        /**
         * 备用网盘链接检测函数 - 不依赖已知网盘域名白名单
         * 功能：智能推测不在已知白名单中的链接是否为网盘链接
         * 适用场景：当链接不在已知网盘域名列表中时使用此备用检测机制
         * @param {string} link - 待检测的链接字符串
         * @returns {boolean} - 返回true表示推测为网盘链接，false表示推测为非网盘链接
         */
        inferPanLink(text) {
            if (!text || typeof text !== 'string') {
                return false;
            }
            //清洗text,提取出链接
            const linkMatch = text.match(/https?:\/\/[^\s]+/);
            if (!linkMatch) return false;
            let link = linkMatch[0];
            // 规范化链接
            const normalizedLink = link.trim().toLowerCase();

            // 步骤1：检查是否为有效的HTTP/HTTPS链接
            if (!/https?:\/\//.test(normalizedLink)) {
                return false;
            }

            // 步骤2：提取链接的各个部分
            const urlParts = {
                protocol: normalizedLink.match(/^https?:\/\//)[0],
                domain: normalizedLink.match(/^https?:\/\/([^\/]+)/)[1],
                path: normalizedLink.replace(/^https?:\/\/[^\/]+/, ''),
                full: normalizedLink
            };

            // 步骤3：检查链接中是否包含云存储相关关键词
            const storageKeywords = [
                'pan', 'yun', 'drive', 'cloud', 'share', 'file',
                'download', 'storage', 'backup', 'sync', 'dropbox',
                'mega', 'box', 'mediafire', 'zippyshare', '4shared'
            ];

            const hasStorageKeyword = storageKeywords.some(keyword =>
                urlParts.domain.includes(keyword) || urlParts.path.includes(keyword)
            );

            // 步骤4：检查链接路径是否符合常见网盘模式
            const commonPanPathPatterns = [
                /\/s\/[a-zA-Z0-9]+/,          // /s/xxx 分享模式
                /\/share\/[a-zA-Z0-9]+/,      // /share/xxx 分享模式
                /\/file\/[a-zA-Z0-9]+/,       // /file/xxx 文件模式
                /\/folder\/[a-zA-Z0-9]+/,     // /folder/xxx 文件夹模式
                /\/download\/[a-zA-Z0-9]+/,   // /download/xxx 下载模式
                /\/d\/[a-zA-Z0-9]+/,          // /d/xxx 直接访问模式
                /\/public\/[a-zA-Z0-9]+/,     // /public/xxx 公开访问模式
                /\/view\/[a-zA-Z0-9]+/,       // /view/xxx 查看模式
                /file-\d+\.html/,             // file-xxx.html 静态页面模式
                /#f?!?[a-zA-Z0-9!-]+/,        // Mega网盘模式
                /\/viewfile/,                   //viewfile 查看文件模式
            ];

            const hasCommonPanPath = commonPanPathPatterns.some(pattern =>
                pattern.test(urlParts.path)
            );

            // 步骤5：检查链接是否包含常见的网盘参数
            const commonPanParams = ['pwd', 'code', 'access', 'key', 'token', 'shareid', 'surl'];
            const hasCommonPanParam = commonPanParams.some(param =>
                urlParts.full.includes(`?${param}=`) || urlParts.full.includes(`&${param}=`)
            );

            // 步骤6：检查域名结构是否暗示为云存储服务
            const domainPatterns = [
                /(?:pan|yun|drive|cloud|share|file|download)\.[a-zA-Z0-9]+\.(?:com|cn|net|org)/,
                /[a-zA-Z0-9]+-(?:pan|yun|drive|cloud|share|file|download)\.(?:com|cn|net|org)/
            ];

            const hasPanDomainPattern = domainPatterns.some(pattern =>
                pattern.test(urlParts.domain)
            );

            // 步骤7：检查链接长度和复杂度（网盘链接通常有特定的长度和复杂度）
            const pathLength = urlParts.path.length;
            const hasComplexPath = pathLength > 5 && pathLength < 50; // 合理的路径长度范围

            // 综合评分：满足以下条件越多，越可能是网盘链接
            let score = 0;
            if (hasStorageKeyword) score++;
            if (hasCommonPanPath) score++;
            if (hasCommonPanParam) score++;
            if (hasPanDomainPattern) score++;
            if (hasComplexPath) score++;

            // 根据评分判断：至少满足3个条件则认为是网盘链接
            return score >= 3;
        },
        pressKey(event) {
            if (event.key === 'Enter') {
                let confirmBtn = document.querySelector('.panai-container .swal2-confirm');
                confirmBtn && confirmBtn.click();
            }
            if (event.key === 'Escape') {
                let cancelBtn = document.querySelector('.panai-container .swal2-cancel');
                cancelBtn && cancelBtn.click();
            }
        },

        addHotKey() {
            //获取设置中的快捷键
            let hotkey = util.getValue('setting_hotkeys');
            hotkeys(hotkey, (event, handler) => {
                event.preventDefault();
                this.showIdentifyBox();
            });
        },

        //正则解析网盘链接
        parseLink(text = '', autoCompletePrefix = false, isPanLinkBackup = false) {
            let obj = { name: '', link: '', storage: '', storagePwdName: '' };
            if (!text) {
                return obj;
            }
            try {
                text = decodeURIComponent(text);
            } catch {
            }
            //特殊处理：点号、冒号、斜杠等替换
            const re = {
                "点": ".",
                "點": ".",
                "冒号": ":",
                "斜杠": "/",
            };
            const reg = new RegExp(`\\b(?:${Object.keys(re).join("|")})`, "g");
            text = text.replace(reg, (match) => re[match]);
            //过滤链接中的中文或表情字符
            // text = text.replace(/[\u4e00-\u9fa5()（）,\u200B，\uD83C-\uDBFF\uDC00-\uDFFF]/g, '');
            text = text.replace(/(?<=[\w./:])[\u4e00-\u9fa5\uD83C-\uDBFF\uDC00-\uDFFF]{1,2}(?=[\w./:])/g, "");
            if (isPanLinkBackup) {
                //清洗text,提取出链接
                let link = text.match(/https?:\/\/[A-Za-z0-9_\-\+.:?&@=/%#,;]*/);
                if (link) {
                    try {
                        let url = new URL(link[0]);
                        obj.link = url.href;
                        obj.name = url.hostname.split('.').slice(-2)[0] || '未知网盘';
                        obj.storagePwdName = "tmp_common_pwd";
                        obj.storage = "local";
                    } catch {
                    }
                }
                return obj;
            }
            for (let name in opt) {
                let item = opt[name];
                //要求补全链接的前缀应提前加入对应位置
                if (autoCompletePrefix && item.hasOwnProperty('autoCompleteReg')) {
                    text = text.replace(item.autoCompleteReg, item.autoCompleteUrlPrefix + "$&");
                }
                if (item.reg.test(text)) {
                    let matches = text.match(item.reg);
                    obj.name = item.name;
                    obj.link = matches[0];
                    obj.storage = item.storage;
                    obj.storagePwdName = item.storagePwdName || null;
                    if (item.replaceHost) {
                        obj.link = obj.link.replace(item.host, item.replaceHost);
                    }
                    return obj;
                }
            }
            return obj;
        },

        //正则解析超链接类型网盘链接
        parseParentLink(selection) {
            const dom = this.getSelectionHTML(selection, true).querySelector('*[href]');
            return this.parseLink(dom ? dom.href : "");
        },
        //将超链接的文本内容作为提取码
        parseLinkInnerTextAsPwd(selection) {
            const dom = this.getSelectionHTML(selection, true).querySelector('*[href]');
            //提取码仅支持英文大小写、数字，需要提前检验
            if (/^[a-zA-Z0-9]+$/.test(dom ? dom.innerText : '')) {
                return dom.innerText;
            }
            return '';
        },
        //正则解析提取码
        parsePwd(text) {
            text = text.replace(/\u200B/g, '').replace('%3A', ":");
            text = text.replace(/(?:本帖)?隐藏的?内容[：:]?/, "");
            let reg = /wss:[a-zA-Z0-9]+|(?<=\s*(?:密|提取|访问|訪問|key|password|pwd|#|\?p=)\s*[码碼]?\s*[：:=]?\s*)[a-zA-Z0-9]{3,8}/i;
            if (reg.test(text)) {
                let match = text.match(reg);
                return match[0];
            }
            return '';
        },

        //根据域名检测网盘类型
        panDetect() {
            let hostname = location.hostname;
            for (let name in opt) {
                let val = opt[name];
                if (val.host.test(hostname)) {
                    return name;
                }
            }
            return '';
        },

        //自动填写密码
        autoFillPassword() {
            let query = util.parseQuery('pwd|p');
            let pwd = '';
            let hash = location.hash.slice(1);//hash中可能存在密码
            hash = /\W/.test(hash) ? null : hash;//若hash中存在\W（非字母、下划线、数字字符）,有可能使用框架的hash模式，此时hash的可信度低
            let panType = this.panDetect();
            for (let name in opt) {
                let val = opt[name];
                if (panType === name) {
                    if (val.storage === 'local') {
                        //当前local存储的密码不一定是当前链接的密码，用户可能通过url直接访问或者恢复页面，这样取出来的密码可能是其他链接的
                        //如果能从url中获取到密码，则应该优先使用url中获取的密码,但现在使用JS框架的网站很多，存在不少使用hash模式的路由，hash的可信度应该降低                
                        pwd = query || util.getValue(val.storagePwdName) || hash;
                        pwd && this.doFillAction(val.input, val.button, pwd);
                        return;
                    }
                    if (val.storage === 'hash') {
                        if (!/^[a-zA-Z0-9_]{3,8}$/.test(hash)) {//过滤掉不正常的Hash
                            return;
                        }
                        pwd = query || hash;
                        pwd && this.doFillAction(val.input, val.button, pwd);
                        return;
                    }
                }
            }
            pwd = util.getValue('tmp_common_pwd');
            const isPanLinkBackup = util.getValue('setting_auto_detect_unknown_disk');
            // 优化：处理未知网盘的密码填充逻辑
            if (isPanLinkBackup && !panType && pwd) {
                // 【优化】更全面地查找可能的密码输入框
                const passwordInputSelectors = [
                    'input[type=password]',
                    'input.pwd',
                    'input.password',
                    'input[class*=pwd]',
                    'input[class*=password]',
                    'input[id*=pwd]',
                    'input[id*=password]',
                    'input[placeholder*=密码]',
                    'input[placeholder*=pwd]',
                    'input[placeholder*=提取码]',
                    'input[placeholder*=访问码]',
                    'input[placeholder*=access]',
                    'input[placeholder*=code]'
                ];
                this.doFillAction(passwordInputSelectors, [], pwd, true);
                //填充完成后清除密码
                util.setValue('tmp_common_pwd', '');
                return;
            }
        },
        // 在密码输入框附近查找提交按钮
        findNearbySubmitButton(inputElement) {
            // 查找提交按钮的选择器列表
            const submitButtonSelectors = [
                'button',
                'input[type=submit]',
                'input[type=button]',
                '.submit',
                '.submit-btn',
                '.btn-submit',
                '.access-btn',
                '.confirm-btn',
                '.ok-btn',
                '.button',
                '.btn',
                '[class*=submit]',
                '[class*=access]',
                '[class*=confirm]',
                '[class*=ok]',
                '[class*=button]',
                '[class*=btn]',
                '[id*=submit]',
                '[id*=access]',
                '[id*=confirm]',
                '[id*=ok]',
                '[id*=button]',
                '[id*=btn]'
            ];

            // 1. 首先检查输入框的父元素内是否有提交按钮
            let parentElement = inputElement.parentElement;
            let depth = 0;
            const maxDepth = 3; // 最多向上查找3层父元素

            while (parentElement && depth < maxDepth) {
                for (const selector of submitButtonSelectors) {
                    const buttons = parentElement.querySelectorAll(selector);
                    for (const button of buttons) {
                        // 检查按钮是否可见且可能是提交按钮
                        if (!util.isHidden(button)) {
                            // 检查按钮文本或属性是否包含提交相关的关键词
                            const buttonText = (button.textContent || button.value || button.innerText || '').toLowerCase();
                            const buttonType = button.type ? button.type.toLowerCase() : '';

                            if (buttonType === 'submit' ||
                                buttonText.includes('提交') ||
                                buttonText.includes('确认') ||
                                buttonText.includes('登录') ||
                                buttonText.includes('access') ||
                                buttonText.includes('ok') ||
                                buttonText.includes('go') ||
                                buttonText.includes('enter')) {
                                return button;
                            }
                        }
                    }
                }

                parentElement = parentElement.parentElement;
                depth++;
            }

            // 2. 如果在父元素内没有找到，检查整个页面
            for (const selector of submitButtonSelectors) {
                const button = document.querySelector(selector);
                if (button && !util.isHidden(button)) {
                    return button;
                }
            }

            return null;
        },
        doFillAction(inputSelector, buttonSelector, pwd, isPanLinkBackup = false) {
            let attempt = 0;          // 尝试次数
            const maxAttempts = 10;   // 最大尝试次数
            const baseDelay = 800;    // 基础延迟时间(ms)
            const maxDelay = 5000;    // 最大延迟时间(ms)
            let timeoutId = null;

            // 指数退避重试函数
            const retryWithBackoff = async () => {
                // 检查是否已达到最大尝试次数
                if (attempt >= maxAttempts) {
                    util.clog('密码填充超时，已达到最大尝试次数');
                    return;
                }

                attempt++;

                try {
                    let input = util.query(inputSelector);
                    let button = isPanLinkBackup ? this.findNearbySubmitButton(input) : util.query(buttonSelector);
                    if (input && !util.isHidden(input)) {
                        // 找到输入框并可见，执行填充操作
                        let titletips = attempt === 1 ? 'AI已识别到密码！正自动帮您填写' : 'AI已识别到密码！正自动帮您重试 +' + attempt + ' 次';
                        Swal.fire({
                            toast: true,
                            position: 'top',
                            showCancelButton: false,
                            showConfirmButton: false,
                            title: titletips,
                            icon: attempt === 1 ? 'success' : 'warning',
                            timer: 2000,
                            customClass
                        });

                        let lastValue = input.value;
                        input.value = pwd;
                        //Vue & React 触发 input 事件
                        let event = new Event('input', { bubbles: true });
                        let tracker = input._valueTracker;
                        if (tracker) {
                            tracker.setValue(lastValue);
                        }
                        input.dispatchEvent(event);

                        if (util.getValue('setting_auto_click_btn')) {
                            await util.sleep(1000); //1秒后点击按钮
                            //若button被禁用，则需要重试
                            if (button && !button.disabled) {
                                button.click();
                                return; // 成功完成操作，不再重试
                            }
                        }

                        // 如果已填充但按钮仍被禁用，继续重试
                        scheduleNextAttempt();
                    } else {
                        // 未找到元素，继续重试
                        scheduleNextAttempt();
                    }
                } catch (error) {
                    console.error('密码填充过程中发生错误:', error);
                    scheduleNextAttempt();
                }
            };

            // 安排下一次尝试
            const scheduleNextAttempt = () => {
                // 计算指数退避延迟时间: baseDelay * (2^attempt) * (0.8 + 0.4 * Math.random())
                // 添加随机因子(80%-120%)避免同步请求
                const exponentialDelay = Math.min(
                    baseDelay * Math.pow(2, attempt - 1),
                    maxDelay
                );
                const jitter = 0.8 + 0.4 * Math.random(); // 添加随机因子
                const delay = Math.floor(exponentialDelay * jitter);

                util.clog(`第${attempt}次尝试失败，${delay}ms后进行第${attempt + 1}次尝试`);
                timeoutId = setTimeout(retryWithBackoff, delay);
            };

            // 初始尝试
            retryWithBackoff();

            // 返回清理函数，方便外部取消重试
            return () => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            };
        },

        //重置识别次数
        clearIdentifyTimes() {
            let res = Swal.fire({
                showCancelButton: true,
                title: '确定要重置识别次数吗？',
                icon: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                customClass
            }).then(res => {
                this.lastText = 'lorem&';
                if (res.isConfirmed) {
                    util.setValue('setting_success_times', 0);
                    history.go(0);
                }
            });
        },
        //识别输入框中的内容
        showIdentifyBox() {
            Swal.fire({
                title: '识别剪切板中文字',
                input: 'textarea',
                inputPlaceholder: '若选方式一，请按 Ctrl+V 粘贴要识别的文字',
                html: `<div style="font-size: 12px;color: #999;margin-bottom: 8px;text-align: center;">提示：在任意网页按下 <span style="font-weight: 700;">${util.getValue("setting_hotkeys")}</span> 键可快速打开本窗口。</div><div style="font-size: 14px;line-height: 22px;padding: 10px 0 5px;text-align: left;"><div style="font-size: 16px;margin-bottom: 8px;font-weight: 700;">支持以下两种方式：</div><div><b>方式一：</b>直接粘贴文字到输入框，点击“识别方框内容”按钮。</div><div><b>方式二：</b>点击“读取剪切板”按钮。<span style="color: #d14529;font-size: 12px;">会弹出“授予网站读取剪切板”权限，同意后会自动识别剪切板中的文字。</span></div></div>`,
                showCloseButton: false,
                showDenyButton: true,
                confirmButtonText: '识别方框内容',
                denyButtonText: '读取剪切板',
                customClass
            }).then(res => {
                if (res.isConfirmed) {
                    this.smartIdentify(null, res.value);
                }
                if (res.isDenied) {
                    navigator.clipboard.readText().then(text => {
                        this.smartIdentify(null, text);
                    }).catch(() => {
                        toast.fire({ title: '读取剪切板失败，请先授权或手动粘贴后识别！', icon: 'error' });
                    });
                }
            });
        },
        // 显示设置项弹窗
        showSettingBox() {
            // 创建设置项配置数组，使用更具描述性的ID名称
            const settings = [
                {
                    id: 'autoSubmitPassword',
                    label: '填写密码后自动提交',
                    type: 'checkbox',
                    storageKey: 'setting_auto_click_btn',
                    value: util.getValue('setting_auto_click_btn')
                },
                {
                    id: 'openInFrontTab',
                    label: '前台打开网盘标签页',
                    type: 'checkbox',
                    storageKey: 'setting_active_in_front',
                    value: util.getValue('setting_active_in_front')
                },
                {
                    id: 'enableAutoOpenTimer',
                    label: '倒计时结束自动打开',
                    type: 'checkbox',
                    storageKey: 'setting_timer_open',
                    value: util.getValue('setting_timer_open'),
                    onchange: function (e) {
                        const rangeWrapper = document.getElementById('timerRangeWrapper');
                        if (rangeWrapper) {
                            rangeWrapper.style.display = e.target.checked ? 'flex' : 'none';
                        }
                    }
                },
                {
                    id: 'timerRange',
                    label: '倒计时',
                    type: 'range',
                    storageKey: 'setting_timer',
                    value: util.getValue('setting_timer'),
                    min: 0,
                    max: 10000,
                    step: 500,
                    wrapperId: 'timerRangeWrapper',
                    wrapperStyle: { display: util.getValue('setting_timer_open') ? 'flex' : 'none' },
                    extraContent: `<span id="timerValueDisplay">(${util.getValue('setting_timer') / 1000}秒)</span>`,
                    onchange: function (e) {
                        const timerDisplay = document.getElementById('timerValueDisplay');
                        if (timerDisplay) {
                            timerDisplay.textContent = `(${e.target.value / 1000}秒)`;
                        }
                    }
                },
                {
                    id: 'useTextAsPassword',
                    label: '超链接的文本内容作为密码（实验性）',
                    type: 'checkbox',
                    storageKey: 'setting_text_as_password',
                    value: util.getValue('setting_text_as_password')
                },
                {
                    id: 'enableAutoComplete',
                    label: '自动推导网盘链接(实验性)',
                    type: 'checkbox',
                    storageKey: 'setting_auto_complete',
                    value: util.getValue('setting_auto_complete'),
                    title: '目前仅支持百度、迅雷、夸克等网盘链接进行自动推导补全'
                },
                {
                    id: 'enableAutoDetectUnknownDisk',
                    label: '自动识别未知网盘（实验性）',
                    type: 'checkbox',
                    storageKey: 'setting_auto_detect_unknown_disk',
                    value: util.getValue('setting_auto_detect_unknown_disk'),
                    title: '开启后，助手将尝试识别未知的网盘链接。'
                },
                {
                    id: 'hotkeySettings',
                    label: '快捷键设置',
                    type: 'text',
                    storageKey: 'setting_hotkeys',
                    value: util.getValue('setting_hotkeys'),
                    inputStyle: { width: '100px' }
                }
            ];

            // 生成HTML
            const html = _generateSettingsHtml(settings);

            // 显示对话框
            Swal.fire({
                title: '识别助手配置',
                html,
                icon: 'info',
                showCloseButton: true,
                confirmButtonText: '保存',
                footer: '<div style="text-align: center;font-size: 1em;">点击查看 <a href="https://www.youxiaohou.com/tool/install-panai.html" target="_blank">使用说明</a>，助手免费开源，Powered by <a href="https://www.youxiaohou.com">油小猴</a></div>',
                customClass
            }).then((res) => {
                res.isConfirmed && history.go(0);
            });

            // 绑定事件监听器
            _bindSettingsEvents(settings);
            // 生成设置项HTML的辅助函数
            function _generateSettingsHtml(settings) {
                const containerStyle = { fontSize: '1em' };
                const containerStyleStr = Object.entries(containerStyle)
                    .map(([key, val]) => `${key}: ${val}`)
                    .join('; ');

                let html = `<div style="${containerStyleStr}">`;

                settings.forEach(setting => {
                    const {
                        id,
                        label,
                        type,
                        value,
                        min,
                        max,
                        step,
                        wrapperId,
                        wrapperStyle,
                        extraContent,
                        inputStyle,
                        title
                    } = setting;

                    // 处理包装器样式
                    const styleStr = wrapperStyle ? Object.entries(wrapperStyle)
                        .map(([key, val]) => `${key}: ${val}`)
                        .join('; ') : '';

                    // 处理输入框样式
                    const inputStyleStr = inputStyle ? Object.entries(inputStyle)
                        .map(([key, val]) => `${key}: ${val}`)
                        .join('; ') : '';

                    // 生成label元素
                    html += `<label class="panai-setting-label" id="${wrapperId || id + 'Wrapper'}" style="${styleStr}" ${title ? `title="${title}"` : ''}>`;
                    html += `<span>${label} ${extraContent || ''}</span>`;

                    // 根据类型生成不同的输入控件
                    if (type === 'checkbox') {
                        html += `<input type="checkbox" id="${id}" ${value ? 'checked' : ''} class="panai-setting-checkbox">`;
                    } else if (type === 'range') {
                        html += `<input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${value}" style="${inputStyleStr}">`;
                    } else if (type === 'text') {
                        html += `<input type="text" id="${id}" value="${value}" style="${inputStyleStr}">`;
                    }

                    html += '</label>';
                });

                html += '</div>';
                return html;
            }

            // 绑定设置项事件的辅助函数
            function _bindSettingsEvents(settings) {
                settings.forEach(setting => {
                    const element = document.getElementById(setting.id);
                    if (!element) return;

                    element.addEventListener('change', (e) => {
                        // 保存设置到存储
                        const value = setting.type === 'checkbox' ? e.target.checked : e.target.value;
                        util.setValue(setting.storageKey, value);

                        // 执行自定义变更处理（如果有）
                        if (typeof setting.onchange === 'function') {
                            setting.onchange(e);
                        }
                    });
                });
            }
        },
        registerMenuCommand() {
            GM_registerMenuCommand('👀 已识别：' + util.getValue('setting_success_times') + '次', () => {
                this.clearIdentifyTimes();
            });
            GM_registerMenuCommand(`📋️ 识别剪切板中文字（快捷键 ${util.getValue('setting_hotkeys')}）`, () => {
                this.showIdentifyBox();
            });
            GM_registerMenuCommand('⚙️ 设置', () => {
                this.showSettingBox();
            });
        },

        addPluginStyle() {
            let style = `
                .panai-container { z-index: 99999!important }
                .panai-popup { font-size: 14px !important }
                .panai-setting-label { display: flex;align-items: center;justify-content: space-between;padding-top: 20px; }
                .panai-setting-checkbox { width: 16px;height: 16px; }
            `;

            if (document.head) {
                util.addStyle('swal-pub-style', 'style', GM_getResourceText('swalStyle'));
                util.addStyle('panai-style', 'style', style);
            }

            const headObserver = new MutationObserver(() => {
                util.addStyle('swal-pub-style', 'style', GM_getResourceText('swalStyle'));
                util.addStyle('panai-style', 'style', style);
            });
            headObserver.observe(document.head, { childList: true, subtree: true });
        },

        isTopWindow() {
            return window.self === window.top;
        },

        init() {
            this.initValue();
            this.addPluginStyle();
            this.addHotKey();
            this.autoFillPassword();
            this.addPageListener();
            this.isTopWindow() && this.registerMenuCommand();
        },
    };

    main.init();

})();
