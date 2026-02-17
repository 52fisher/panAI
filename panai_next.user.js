// ==UserScript==
// @name              网盘智能识别助手(NEXT)
// @namespace         https://github.com/52fisher/panAI
// @version           3.1.4
// @author            52fisher
// @description       智能识别选中文字中的🔗网盘链接和🔑提取码，识别成功打开网盘链接并自动填写提取码，省去手动复制提取码在输入的烦恼。
// @license           AGPL-3.0-or-later
// @homepage          https://github.com/52fisher/panAI
// @supportURL        https://github.com/52fisher/panAI
// @updateURL         https://ghproxy.net/https://raw.githubusercontent.com/52fisher/panAI/main/panai_next.user.js
// @downloadURL       https://ghproxy.net/https://raw.githubusercontent.com/52fisher/panAI/main/panai_next.user.js
// @match             *://*/*
// @require           https://unpkg.com/hotkeys-js@3.13.3/dist/hotkeys.min.js
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

    // 常量定义
    const CONSTANTS = {
        DEFAULT_SETTINGS: [
            { name: 'setting_success_times', value: 0 },
            { name: 'setting_auto_click_btn', value: true },
            { name: 'setting_active_in_front', value: true },
            { name: 'setting_timer_open', value: false },
            { name: 'setting_auto_complete', value: false },
            { name: 'setting_text_as_password', value: false },
            { name: 'setting_timer', value: 5000 },
            { name: 'setting_hotkeys', value: 'F1' },
            { name: 'setting_link_management', value: false },
            { name: 'setting_link_history', value: [] }
        ],
        CUSTOM_CLASSES: {
            dialog: 'panai-dialog',
            dialogOverlay: 'panai-dialog-overlay',
            dialogContent: 'panai-dialog-content',
            dialogHeader: 'panai-dialog-header',
            dialogTitle: 'panai-dialog-title',
            dialogBody: 'panai-dialog-body',
            dialogFooter: 'panai-dialog-footer',
            confirmButton: 'panai-confirm-btn',
            cancelButton: 'panai-cancel-btn',
            denyButton: 'panai-deny-btn',
            timerBar: 'panai-timer-bar'
        },
        PASSWORD_REGEX: /wss:[a-zA-Z0-9]+|(?<=\s*(?:密|提取|访问|訪問|key|password|pwd|#|\?p=|\?code=)\s*[码碼]?\s*[：:=]?\s*)[a-zA-Z0-9]{3,8}/i,
        PLUGIN_STYLES: `
        .panai-setting-label { display: flex;align-items:baseline;justify-content: space-between;padding-top: 20px; }
        .panai-setting-checkbox { width: 16px;height: 16px; }
        .panai-dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
        }
        .panai-dialog-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }
        .panai-dialog-content {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 12px;
            width: fit-content;
            max-width: 500px;
            min-width: 320px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1);
            transform: translateY(-20px) scale(0.95);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            overflow: hidden;
        }
        .panai-dialog-overlay.active .panai-dialog-content {
            transform: translateY(0) scale(1);
        }
        .panai-dialog-header {
            padding: 20px 24px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: none;
        }
        .panai-dialog-title {
            margin: 0;
            font-size: 20px;
            font-weight: 600;
            color: #1f2937;
            line-height: 1.4;
        }
        .panai-dialog-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #9ca3af;
            padding: 4px 8px;
            border-radius: 6px;
            transition: all 0.2s ease;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .panai-dialog-close:hover {
            color: #374151;
            background: rgba(0, 0, 0, 0.05);
        }
        .panai-dialog-body {
            padding: 20px 24px;
            max-height: 60vh;
            overflow-y: auto;
            color: #4b5563;
            line-height: 1.6;
            font-size: 14px;
        }
        .panai-dialog-footer {
            padding: 0 24px 20px;
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            background: rgba(249, 250, 251, 0.8);
            border-top: 1px solid rgba(229, 231, 235, 0.8);
            margin-top: 0;
        }
        .panai-dialog-footer button {
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s ease;
            border: none;
            min-width: 80px;
            position: relative;
            overflow: hidden;
        }
        .panai-dialog-footer button:active {
            transform: translateY(1px);
        }
        .panai-dialog-footer button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
        }
        .panai-dialog-footer button:hover::before {
            left: 100%;
        }
        .panai-cancel-btn {
            background: #f8f9fa;
            color: #6b7280;
            border: 1px solid #e5e7eb;
        }
        .panai-cancel-btn:hover {
            background: #f3f4f6;
            color: #374151;
            border-color: #d1d5db;
        }
        .panai-confirm-btn {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
        }
        .panai-confirm-btn:hover {
            background: linear-gradient(135deg, #2563eb, #1e40af);
            box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
        }
        .panai-deny-btn {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);
        }
        .panai-deny-btn:hover {
            background: linear-gradient(135deg, #d97706, #b45309);
            box-shadow: 0 4px 8px rgba(245, 158, 11, 0.4);
        }
        .panai-toast {
            position: fixed;
            top: 24px;
            left: 50%;
            transform: translateX(-50%) translateY(-20px);
            background: rgba(17, 24, 39, 0.95);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 100001;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            max-width: 400px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .panai-toast.active {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        .panai-toast.success {
            background: rgba(34, 197, 94, 0.95);
            color: white;
        }
        .panai-toast.error {
            background: rgba(239, 68, 68, 0.95);
            color: white;
        }
        .panai-toast.info {
            background: rgba(59, 130, 246, 0.95);
            color: white;
        }
        .panai-timer-bar {
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8);
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            transition: width linear;
            border-radius: 0 0 12px 12px;
        }
        .panai-dialog-body textarea,.panai-dialog-body input[type="text"], .panai-dialog-body input[type="range"] {
            width: 100%;
            padding: 12px 16px;
            margin-bottom: 16px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 14px;
            transition: all 0.2s ease;
            background: rgba(255, 255, 255, 0.8);
        }
        .panai-dialog-body textarea:focus,.panai-dialog-body input[type="text"]:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
       .panai-dialog-body textarea {
            min-height: 100px;
            resize: vertical;
        }
        .panai-dialog-body input[type="range"] {
            padding: 0;
            height: 6px;
            background: #e5e7eb;
            border-radius: 3px;
            outline: none;
            -webkit-appearance: none;
            width: fit-content;
        }
        .panai-dialog-body input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .panai-dialog-body input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        /* 响应式设计 */
        @media (max-width: 640px) {
            .panai-dialog-content {
                max-width: 90vw;
                min-width: 280px;
                margin: 20px;
            }
            .panai-dialog-header {
                padding: 16px 20px 0;
            }
            .panai-dialog-body {
                padding: 16px 20px;
                max-height: 50vh;
            }
            .panai-dialog-footer {
                padding: 0 20px 16px;
                flex-direction: column-reverse;
                gap: 8px;
            }
            .panai-dialog-footer button {
                width: 100%;
                margin: 0;
            }
            .panai-toast {
                max-width: 90vw;
                margin: 0 20px;
            }
        }
        
        /* 深色模式适配 */
        @media (prefers-color-scheme: dark) {
            .panai-dialog-content {
                background: rgba(31, 41, 55, 0.95);
                border-color: rgba(255, 255, 255, 0.1);
            }
            .panai-dialog-title {
                color: #f9fafb;
            }
            .panai-dialog-body {
                color: #d1d5db;
            }
            .panai-dialog-footer {
                background: rgba(17, 24, 39, 0.8);
                border-top-color: rgba(255, 255, 255, 0.1);
            }
            .panai-cancel-btn {
                background: rgba(55, 65, 81, 0.8);
                color: #d1d5db;
                border-color: rgba(255, 255, 255, 0.1);
            }
            .panai-cancel-btn:hover {
                background: rgba(75, 85, 99, 0.8);
                color: #f9fafb;
            }
            .panai-dialog-body textarea,.panai-dialog-body input[type="text"] {
                background: rgba(55, 65, 81, 0.8);
                border-color: rgba(255, 255, 255, 0.1);
                color: #f9fafb;
            }
            .panai-dialog-body textarea:focus,.panai-dialog-body input[type="text"]:focus {
                border-color: #3b82f6;
            }
        }
    `
    };

    // 自定义Dialog组件
    class Dialog {
        constructor() {
            // 绑定toast方法的上下文，确保this指向正确
            this.toast = this.toast.bind(this);
            this.createElements();
            this.bindEvents();
        }

        // 创建基础DOM元素
        createElements() {
            // 创建遮罩层和对话框容器
            this.overlay = document.createElement('div');
            this.overlay.className = `${CONSTANTS.CUSTOM_CLASSES.dialogOverlay}`;

            this.content = document.createElement('div');
            this.content.className = `${CONSTANTS.CUSTOM_CLASSES.dialogContent}`;

            // 创建对话框结构
            this.header = document.createElement('div');
            this.header.className = `${CONSTANTS.CUSTOM_CLASSES.dialogHeader}`;

            this.title = document.createElement('h3');
            this.title.className = `${CONSTANTS.CUSTOM_CLASSES.dialogTitle}`;

            this.closeBtn = document.createElement('button');
            this.closeBtn.className = 'panai-dialog-close';
            this.closeBtn.innerHTML = '&times;';

            this.body = document.createElement('div');
            this.body.className = `${CONSTANTS.CUSTOM_CLASSES.dialogBody}`;

            this.footer = document.createElement('div');
            this.footer.className = `${CONSTANTS.CUSTOM_CLASSES.dialogFooter}`;

            // 创建toast元素
            this.toastElement = document.createElement('div');
            this.toastElement.className = 'panai-toast';

            // 组装对话框
            this.header.appendChild(this.title);
            //this.header.appendChild(this.closeBtn);
            this.content.appendChild(this.header);
            this.content.appendChild(this.body);
            this.content.appendChild(this.footer);
            this.overlay.appendChild(this.content);

            // 添加到页面
            document.body.appendChild(this.overlay);
            document.body.appendChild(this.toastElement);

            // 计时器相关
            this.timer = null;
            this.timerBar = null;
            this.resolve = null;
        }

        // 绑定事件
        bindEvents() {
            // 关闭按钮事件
            this.closeBtn.addEventListener('click', () => {
                this.hide();
                if (this.resolve) {
                    this.resolve({ isConfirmed: false, dismiss: 'close' });
                    this.resolve = null;
                }
            });

            // 点击遮罩层关闭
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.closeBtn.click();
                }
            });

            // ESC键关闭
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                    this.closeBtn.click();
                }
            });
        }

        // 显示对话框
        show() {
            this.overlay.classList.add('active');
        }

        // 隐藏对话框
        hide() {
            this.overlay.classList.remove('active');
            this.clearButtons();
            this.clearTimer();

            // 清空内容
            this.body.innerHTML = '';
            this.title.innerHTML = '';
        }

        // 清除按钮
        clearButtons() {
            while (this.footer.firstChild) {
                this.footer.removeChild(this.footer.firstChild);
            }
        }

        // 清除计时器
        clearTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
            if (this.timerBar) {
                this.content.removeChild(this.timerBar);
                this.timerBar = null;
            }
        }

        // 创建按钮
        createButton(text, className, callback) {
            const button = document.createElement('button');
            button.textContent = text;
            button.className = className;
            button.type = 'button';
            button.addEventListener('click', callback);
            this.footer.appendChild(button);
            return button;
        }

        // 普通提示框
        alert(options) {
            return new Promise((resolve) => {
                this.title.innerHTML = options.title || '';
                this.body.innerHTML = options.html || options.text || '';

                // 清除现有按钮并创建确认按钮
                this.clearButtons();
                this.createButton(options.confirmButtonText || '确定',
                    `${CONSTANTS.CUSTOM_CLASSES.confirmButton}`, () => {
                        this.hide();
                        resolve({ isConfirmed: true });
                    });

                this.show();
            });
        }

        // 确认对话框
        confirm(options) {
            return new Promise((resolve) => {
                this.resolve = resolve;
                this.title.innerHTML = options.title || '';
                this.body.innerHTML = options.html || options.text || '';

                // 清除现有按钮
                this.clearButtons();

                // 创建取消按钮
                this.createButton(options.cancelButtonText || '取消',
                    `${CONSTANTS.CUSTOM_CLASSES.cancelButton}`, () => {
                        this.hide();
                        resolve({ isConfirmed: false });
                        this.resolve = null;
                    });

                // 创建确认按钮
                this.createButton(options.confirmButtonText || '确定',
                    `${CONSTANTS.CUSTOM_CLASSES.confirmButton}`, () => {
                        const inputs = this.body.querySelectorAll('input, textarea');
                        const inputValues = {};
                        inputs.forEach(input => {
                            inputValues[input.id] = input.value;
                        });

                        this.hide();
                        // 在返回结果中包含 inputValues
                        resolve({ isConfirmed: true, inputValues });
                        this.resolve = null;
                    });

                // 添加计时器
                if (options.timer) {
                    this.timerBar = document.createElement('div');
                    this.timerBar.className = CONSTANTS.CUSTOM_CLASSES.timerBar;
                    this.content.appendChild(this.timerBar);

                    let timeLeft = options.timer;
                    const totalTime = options.timer;

                    this.timer = setInterval(() => {
                        timeLeft -= 100;
                        const percentage = (timeLeft / totalTime) * 100;
                        this.timerBar.style.width = `${percentage}%`;

                        if (timeLeft <= 0) {
                            clearInterval(this.timer);
                            this.hide();
                            resolve({ isConfirmed: true, dismiss: 'timer' });
                            this.resolve = null;
                        }
                    }, 100);
                }

                this.show();
            });
        }

        // 带否认按钮的对话框
        confirmWithDeny(options) {
            return new Promise((resolve) => {
                this.resolve = resolve;
                this.title.innerHTML = options.title || '';
                this.body.innerHTML = options.html || options.text || '';

                // 清除现有按钮
                this.clearButtons();

                // 创建取消按钮
                this.createButton(options.cancelButtonText || '取消',
                    `${CONSTANTS.CUSTOM_CLASSES.cancelButton}`, () => {
                        this.hide();
                        resolve({ isConfirmed: false });
                        this.resolve = null;
                    });

                // 创建否认按钮
                this.createButton(options.denyButtonText || '否',
                    `${CONSTANTS.CUSTOM_CLASSES.denyButton}`, () => {
                        this.hide();
                        resolve({ isDenied: true });
                        this.resolve = null;
                    });

                // 创建确认按钮
                this.createButton(options.confirmButtonText || '是',
                    `${CONSTANTS.CUSTOM_CLASSES.confirmButton}`, () => {
                        const inputs = this.body.querySelectorAll('input, textarea');
                        const inputValues = {};
                        inputs.forEach(input => {
                            inputValues[input.id] = input.value;
                        });

                        this.hide();
                        // 在返回结果中包含 inputValues
                        resolve({ isConfirmed: true, inputValues });
                        this.resolve = null;
                    });

                this.show();
            });
        }

        // 显示提示消息 - 修复后的toast方法
        toast(options) {
            if (!this.toastElement) {
                // 确保toast元素存在
                this.toastElement = document.createElement('div');
                this.toastElement.className = 'panai-toast';
                document.body.appendChild(this.toastElement);
            }

            this.toastElement.innerHTML = options.title || '';
            this.toastElement.className = 'panai-toast'; // 重置类名

            if (options.icon) {
                this.toastElement.classList.add(options.icon);
            }

            this.toastElement.classList.add('active');

            // 清除可能存在的旧计时器
            if (this.toastTimer) {
                clearTimeout(this.toastTimer);
            }

            // 设置自动隐藏计时器
            this.toastTimer = setTimeout(() => {
                this.toastElement.classList.remove('active');
            }, options.timer || 3000);
        }
    }

    // 状态变量
    let lastText = "lorem&";
    let dialog; // 自定义对话框实例
    let util;
    let PAN_CONFIGS; // 先声明，后初始化

    // 工具函数集合
    function createUtil() {
        return {
            /**
             * 带前缀的控制台日志
             * @param {any} content - 日志内容
             */
            clog: (content) => {
                console.group("%c %c [网盘智能识别助手]",
                    `background:url(${GM_info.script.icon}) center center no-repeat;background-size:12px;padding:3px`, "");
                console.log(content);
                console.groupEnd();
            },

            /**
             * 解析URL查询参数
             * @param {string} name - 参数名
             * @returns {string|null} 参数值
             */
            parseQuery: (name) => {
                const reg = new RegExp(`(?<=(?:${name})\\=)(?:wss:[a-zA-Z0-9]+|[\\w-]+)`, "i");
                const pd = location.href.replace(/%3A/g, ":").match(reg);
                return pd ? pd[0] : null;
            },

            /**
             * 获取存储的值
             * @param {string} name - 键名
             * @returns {any} 值
             */
            getValue: (name) => GM_getValue(name),

            /**
             * 设置存储的值
             * @param {string} name - 键名
             * @param {any} value - 值
             */
            setValue: (name, value) => GM_setValue(name, value),

            /**
             * 延迟函数
             * @param {number} time - 延迟时间(毫秒)
             * @returns {Promise}
             */
            sleep: (time) => new Promise(resolve => setTimeout(resolve, time)),

            /**
             * 添加样式到页面
             * @param {string} id - 样式ID
             * @param {string} tag - 标签名
             * @param {string} css - 样式内容
             */
            addStyle: (id, tag = 'style', css) => {
                const doc = document;
                let styleDom = doc.getElementById(id);
                if (styleDom) return;

                const style = doc.createElement(tag);
                style.rel = 'stylesheet';
                style.id = id;
                tag === 'style' ? style.innerHTML = css : style.href = css;
                document.head.appendChild(style);
            },

            /**
             * 检查元素是否隐藏
             * @param {HTMLElement} el - 元素
             * @returns {boolean} 是否隐藏
             */
            isHidden: (el) => {
                try {
                    return el.offsetParent === null;
                } catch (e) {
                    return false;
                }
            },

            /**
             * 判断是否为移动设备
             */
            isMobile: !!navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|HarmonyOS|MicroMessenger)/i
            ),

            /**
             * 查询元素
             * @param {string|string[]} selector - 选择器或选择器数组
             * @returns {HTMLElement|null} 找到的元素
             */
            query: (selector) => {
                if (Array.isArray(selector)) {
                    for (let i = 0; i < selector.length; i++) {
                        const element = document.querySelector(selector[i]);
                        if (element) return element;
                    }
                    return null;
                }
                return document.querySelector(selector);
            }
        };
    }

    /**
     * 初始化网盘配置
     */
    function initPanConfigs() {
        PAN_CONFIGS = {
            //主流网盘
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
                storage: () => util.isMobile === true ? 'local' : 'hash',
                storagePwdName: 'tmp_tianyi_pwd'
            },
            'caiyun': {
                reg: /((?:https?:\/\/)?caiyun\.139\.com\/(?:m\/i|w\/i\/|web\/|front\/#\/detail)\??(?:linkID=)?[a-zA-Z\d]+)/,
                host: /(?:cai)?yun\.139\.com/,
                input: ['.token-form input[type=text]'],
                button: ['.token-form .btn-token'],
                name: '移动云盘',
                storage: 'local',
                storagePwdName: 'tmp_caiyun_pwd'
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
                reg: /((?:https?:\/\/)?mypikpak\.com\/s\/[\w-]+)/,
                host: /(?:[a-zA-Z\d-.]+)?mypikpak\.com/,
                input: ['.el-input__wrapper input'],
                button: ['.passcode-input+button'],
                name: 'PikPak',
                storage: 'hash',
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
                storage: 'hash'
            },
            'uc': {
                reg: /(?:https?:\/\/)?drive\.uc\.cn\/s\/[a-zA-Z\d]+/,
                host: /drive\.uc\.cn/,
                input: ["input[class*='ShareReceivePC--input']", '.input-wrap input'],
                button: ["button[class*='ShareReceivePC--submit-btn'", '.input-wrap button'],
                name: 'UC云盘',
                storage: 'hash'
            },
            'qfile': {
                reg: /((?:https?:\/\/)?qfile\.qq\.com\/q\/[0-9a-zA-Z]+)/,
                host: /qfile\.qq\.com/,
                name: 'QQ闪传',
            },
            'google': {
                reg: /(?:https?:\/\/)?drive\.google\.com\/file\/d\/[\w-]+/,
                host: /drive\.google\.com/,
                name: 'Google云端硬盘',
            },
            'nitroflare': {
                reg: /https?:\/\/(?:www\.)?nitroflare\.com\/view\/[\w/]+/,
                host: /nitroflare\.com/,
                name: 'NitroFlare',
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
                storage: () => util.isMobile === true ? 'local' : 'hash',
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
            'flowus': {
                reg: /((?:https?:\/\/)?flowus\.cn\/[\S ^\/]*\/?share\/[a-z\d]{8}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{12})/,
                host: /flowus\.cn/,
                name: 'FlowUs息流',
                storage: 'hash'
            },
            //商店链接
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
            },
            // 小众网盘
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
            'noire': {
                reg: /(?:https?:\/\/)?drive\.noire\.cc\/s\/\w+/,
                host: /drive\.noire\.cc/,
                input: ['#pwd'],
                button: ['button.MuiButton-containedSecondary'],
                name: '爱丽丝的记事本',
                storage: 'local',
                storagePwdName: 'tmp_noire_pwd',
                replaceHost: 'drive.noire.cc'
            },
            'feijipan': {
                reg: /((?:https?:\/\/)?share\.feijipan\.com\/s\/[a-zA-Z\d-]+)/,
                host: /share\.feijipan\.com/,
                name: '飞机盘',
                storage: 'hash'
            },
            '520pan': {
                reg: /(?:https?:\/\/)?520pan\.com\/s\/\w+/,
                host: /520pan\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: '520云盘',
                storage: 'local',
                storagePwdName: 'tmp_520pan_pwd'
            },
            '567pan': {
                reg: /(?:https?:\/\/)?567pan\.com\/s\/\w+/,
                host: /567pan\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: '567盘',
                storage: 'local',
                storagePwdName: 'tmp_567pan_pwd'
            },
            'ayunpan': {
                reg: /(?:https?:\/\/)?ayunpan\.com\/s\/\w+/,
                host: /ayunpan\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: 'AYunPan',
                storage: 'local',
                storagePwdName: 'tmp_ayunpan_pwd'
            },
            'aiyou': {
                reg: /(?:https?:\/\/)?aiyou\.com\/s\/\w+/,
                host: /aiyou\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: '爱优网盘',
                storage: 'local',
                storagePwdName: 'tmp_aiyou_pwd'
            },
            'feimao': {
                reg: /(?:https?:\/\/)?feimao\.com\/s\/\w+/,
                host: /feimao\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: '飞猫盘',
                storage: 'local',
                storagePwdName: 'tmp_feimao_pwd'
            },
            'yoyun': {
                reg: /(?:https?:\/\/)?yoyun\.com\/s\/\w+/,
                host: /yoyun\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: '优云下载',
                storage: 'local',
                storagePwdName: 'tmp_yoyun_pwd'
            },
            'guizu': {
                reg: /(?:https?:\/\/)?guizu\.com\/s\/\w+/,
                host: /guizu\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: '贵族网盘',
                storage: 'local',
                storagePwdName: 'tmp_guizu_pwd'
            },
            'xunniu': {
                reg: /(?:https?:\/\/)?xunniu\.com\/s\/\w+/,
                host: /xunniu\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: '迅牛网盘',
                storage: 'local',
                storagePwdName: 'tmp_xunniu_pwd'
            },
            'xueqiu': {
                reg: /(?:https?:\/\/)?xueqiu\.com\/s\/\w+/,
                host: /xueqiu\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: '雪球云盘',
                storage: 'local',
                storagePwdName: 'tmp_xueqiu_pwd'
            },
            '77file': {
                reg: /(?:https?:\/\/)?77file\.com\/s\/\w+/,
                host: /77file\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: '77file',
                storage: 'local',
                storagePwdName: 'tmp_77file_pwd'
            },
            'ownfile': {
                reg: /(?:https?:\/\/)?ownfile\.com\/s\/\w+/,
                host: /ownfile\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: 'OwnFile',
                storage: 'local',
                storagePwdName: 'tmp_ownfile_pwd'
            },
            'feiyun': {
                reg: /(?:https?:\/\/)?feiyun\.com\/s\/\w+/,
                host: /feiyun\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: '飞云网盘',
                storage: 'local',
                storagePwdName: 'tmp_feiyun_pwd'
            },
            'yifile': {
                reg: /(?:https?:\/\/)?yifile\.com\/s\/\w+/,
                host: /yifile\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: 'YiFile',
                storage: 'local',
                storagePwdName: 'tmp_yifile_pwd'
            },
            'dufile': {
                reg: /(?:https?:\/\/)?dufile\.com\/s\/\w+/,
                host: /dufile\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: 'duFile',
                storage: 'local',
                storagePwdName: 'tmp_dufile_pwd'
            },
            '116pan': {
                reg: /(?:https?:\/\/)?116pan\.com\/s\/\w+/,
                host: /116pan\.com/,
                input: ['input[type=password]'],
                button: ['button[type=submit]'],
                name: '116盘',
                storage: 'local',
                storagePwdName: 'tmp_116pan_pwd'
            }
        };
    }

    /**
     * 初始化配置数据
     */
    function initSettings() {
        CONSTANTS.DEFAULT_SETTINGS.forEach(setting => {
            if (util.getValue(setting.name) === undefined) {
                util.setValue(setting.name, setting.value);
            }
        });
    }

    /**
     * 添加页面事件监听
     */
    function addPageListeners() {
        document.addEventListener("mouseup", smartIdentify, true);
        document.addEventListener("keydown", handleKeyPress, true);
    }

    /**
         * 获取选中内容的HTML或文本
         * @param {Selection} selection - 选择对象
         * @param {boolean} isDOM - 是否返回DOM对象
         * @returns {string|HTMLElement} 选中的内容
         */
    function getSelectionContent(selection, isDOM = false) {
        const testDiv = document.createElement("div");
        if (!selection.isCollapsed) {
            const docFragment = selection.getRangeAt(0).cloneContents();
            testDiv.appendChild(docFragment);
        }
        return isDOM ? testDiv : selection.toString();
    }

    /**
     * 智能识别选中的文本
     * @param {Event} event - 事件对象
     * @param {string} str - 要识别的字符串
     */
    async function smartIdentify(event, str = '') {
        const selection = window.getSelection();
        const text = str || getSelectionContent(selection);

        // 自动推导网盘前缀的开关
        const isAutoComplete = util.getValue('setting_auto_complete');
        const isTextAsPassword = util.getValue('setting_text_as_password');
        const isLinkManagement = util.getValue('setting_link_management');
        const isPanLinkBackup = util.getValue('setting_auto_detect_unknown_disk');
        // 选择相同文字或空不识别
        if (text === lastText || text === '') {
            return;
        }
        const startTime = performance.now();
        lastText = text;
        util.clog(`当前选中文字：${text}`);

        // 解析链接和密码
        let linkObj = parseLink(text);
        util.clog(`解析结果：${JSON.stringify(linkObj)}`);
        let pwd = parsePassword(text);

        // 从父元素解析链接
        if (!linkObj?.link) {
            linkObj = parseParentLink(selection);
        }
        // 将超链接文本作为密码
        if (isTextAsPassword && !pwd) {
            pwd = parseLinkTextAsPassword(selection);
        }

        // 自动补全链接
        if (isAutoComplete && !linkObj?.link) {
            linkObj = parseLink(text, true);
        }
        if (isPanLinkBackup && !linkObj?.link) {
            linkObj = parseLink(text, true);
        }
        if (isPanLinkBackup && !linkObj?.link) {
            if (!inferPanLink(text)) {
                return;
            }
            linkObj = parseLink(text, false, true);
        }
        // 如果找到链接
        if (linkObj.link) {
            // 补全协议头
            if (!/https?:\/\//.test(linkObj.link)) {
                linkObj.link = 'https://' + linkObj.link;
            }

            // 计算耗时
            const endTime = performance.now();
            const timeCost = (endTime - startTime).toFixed(3);
            util.clog(`文本识别结果：${linkObj.name} 链接：${linkObj.link} 密码：${pwd} 耗时：${timeCost}毫秒`);

            // 如果启用了链接管理，添加到历史记录
            if (isLinkManagement) {
                addLinkToHistory(linkObj, pwd);
            }
            // 显示提示并处理用户操作
            handleLinkDetection(linkObj, pwd);
        }

    }

    /**
     * 添加链接到历史记录
     * @param {Object} linkObj - 链接对象
     * @param {string} pwd - 提取码
     */
    function addLinkToHistory(linkObj, pwd) {
        try {
            // 获取现有历史记录
            const history = util.getValue('setting_link_history') || [];

            // 创建新的历史记录项
            const historyItem = {
                id: Date.now().toString(),
                name: linkObj.name,
                link: linkObj.link,
                pwd: pwd,
                timestamp: new Date().toISOString(),
                storage: linkObj.storage
            };

            // 添加到历史记录开头
            history.unshift(historyItem);

            // 限制历史记录数量（最多50条）
            const limitedHistory = history.slice(0, 50);

            // 保存到存储
            util.setValue('setting_link_history', limitedHistory);

            util.clog('链接已添加到历史记录');
        } catch (error) {
            console.error('添加历史记录失败:', error);
        }
    }

    /**
     * 处理检测到的链接
     * @param {Object} linkObj - 链接对象
     * @param {string} pwd - 提取码
     */
    function handleLinkDetection(linkObj, pwd) {
        // 防止边界情况，实际情况不应该出现
        if (!linkObj.link) {
            dialog.toast({
                title: '未检测到网盘链接',
                icon: 'error',
                timer: 3000
            });
            return;
        }

        const timer = util.getValue('setting_timer');
        const timerOpen = util.getValue('setting_timer_open');

        const html = `
            <div style="font-size: 14px;line-height: 22px;">
                <div style="margin-bottom: 10px;">
                    <span style="font-weight: 700;color: #333;">网盘：</span>
                    <span style="color: #2778c4;">${linkObj.name}</span>
                </div>
                <div style="margin-bottom: 10px;">
                    <span style="font-weight: 700;color: #333;">链接：</span>
                    <span style="color: #2778c4;word-break: break-all;">${linkObj.link}</span>
                </div>
                <div style="margin-bottom: 10px;">
                    <span style="font-weight: 700;color: #333;">提取码：</span>
                    <span style="color: #e74c3c;font-weight: 700;">${pwd || '无'}</span>
                </div>
                ${timerOpen ? `<div style="color: #999;font-size: 12px;text-align: center;margin-top: 10px;">${timer / 1000}秒后自动打开</div>` : ''}
            </div>
        `;

        dialog.confirm({
            title: '检测到网盘链接',
            html: html,
            confirmButtonText: '打开',
            cancelButtonText: '取消',
            timer: timerOpen ? timer : null
        }).then(res => {
            lastText = 'lorem&';

            // 防御式编程
            if (!res.isConfirmed && res.dismiss !== 'timer') {
                return;
            }

            // 获取是否在前台打开的设置
            const active = util.getValue('setting_active_in_front');
            let targetLink = linkObj.link;

            // 密码为空时，直接打开链接
            if (!pwd) {
                GM_openInTab(targetLink, { active });
                return;
            }
            //linkObj.storage可能是function/local/hash，如果是function，需要执行
            const storage = typeof linkObj.storage === 'function' ? linkObj.storage() : linkObj.storage;
            if (storage === "local") {
                util.setValue(linkObj.storagePwdName, pwd);
            } else if (storage === "hash") {
                // 链接中没有#：使用三目运算符直接拼接pwd参数和#hash
                targetLink = linkObj.link.includes('?')
                    ? `${linkObj.link}&pwd=${pwd}#${pwd}`
                    : `${linkObj.link}?pwd=${pwd}#${pwd}`;

                // 若为hash模式：需要考虑框架路由情况
                if (linkObj.link.includes('#')) {
                    const hashIndex = linkObj.link.indexOf('#');
                    const hashPart = linkObj.link.slice(hashIndex + 1);
                    const urlPart = linkObj.link.slice(0, hashIndex);

                    // 判断是否为框架路由模式
                    const isFrameworkRoute = hashPart.startsWith('/') || hashPart.includes('?') || hashPart.includes('=');
                    if (isFrameworkRoute) {
                        targetLink = urlPart.includes('?')
                            ? `${urlPart}&pwd=${pwd}#${hashPart}`
                            : `${urlPart}?pwd=${pwd}#${hashPart}`;
                    }
                }
            }
            // 打开标签页
            GM_openInTab(targetLink, { active });
        });
    }

    /**
        * 备用网盘链接检测函数 - 智能推测未知网盘链接
        * @param {string} text - 待检测的文本
        * @returns {boolean} - 是否为网盘链接
        */
    function inferPanLink(text) {
        if (!text || typeof text !== 'string') {
            return false;
        }

        // 清洗text，提取出链接
        const linkMatch = text.match(/https?:\/\/[^\s]+/);
        if (!linkMatch) return false;

        const link = linkMatch[0];
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
            /\/viewfile/,                 // viewfile 查看文件模式
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
    }

    /**
     * 处理按键事件
     * @param {Event} event - 事件对象
     */
    function handleKeyPress(event) {
        // 回车键确认
        if (event.key === 'Enter') {
            const confirmBtn = document.querySelector(`.${CONSTANTS.CUSTOM_CLASSES.confirmButton}`);
            confirmBtn && confirmBtn.click();
        }

        // ESC键取消
        if (event.key === 'Escape') {
            const cancelBtn = document.querySelector(`.${CONSTANTS.CUSTOM_CLASSES.cancelButton}`);
            cancelBtn && cancelBtn.click();
        }
    }

    /**
     * 添加快捷键支持
     */
    function addHotKeySupport() {
        const hotkey = util.getValue('setting_hotkeys');
        hotkeys(hotkey, (event) => {
            event.preventDefault();
            showIdentifyBox();
        });
    }

    /**
     * 解析文本中的网盘链接
     * @param {string} text - 文本内容
     * @param {boolean} autoCompletePrefix - 是否自动补全链接前缀
     * @param {boolean} isPanLinkBackup - 是否为备用网盘链接模式
     * @returns {Object} result - 解析结果
     */
    function parseLink(text = '', autoCompletePrefix = false, isPanLinkBackup = false) {
        let result = { name: '', link: '', storage: '', storagePwdName: '' };
        if (!text) {
            return result;
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
                    result.link = url.href;
                    result.name = url.hostname.split('.').slice(-2)[0] || '未知网盘';
                    result.storagePwdName = "tmp_common_pwd";
                    result.storage = "local";
                } catch {
                }
            }
            return result;
        }
        for (let name in PAN_CONFIGS) {
            let item = PAN_CONFIGS[name];
            //要求补全链接的前缀应提前加入对应位置
            if (autoCompletePrefix && item.hasOwnProperty('autoCompleteReg')) {
                text = text.replace(item.autoCompleteReg, item.autoCompleteUrlPrefix + "$&");
            }
            if (item.reg.test(text)) {
                let matches = text.match(item.reg);
                result.name = item.name;
                result.link = matches[0];
                result.storage = item.storage;
                result.storagePwdName = item.storagePwdName || null;
                if (item.replaceHost) {
                    result.link = result.link.replace(item.host, item.replaceHost);
                }
                return result;
            }
        }
        return result;
    }

    /**
     * 从父元素解析链接
     * @param {Selection} selection - 选择对象
     * @returns {Object} 解析结果
     */
    function parseParentLink(selection) {
        const dom = getSelectionContent(selection, true).querySelector('*[href]');
        return parseLink(dom ? dom.href : "");
    }

    /**
     * 将链接文本作为密码解析
     * @param {Selection} selection - 选择对象
     * @returns {string} 密码
     */
    function parseLinkTextAsPassword(selection) {
        try {
            // 获取选中内容的DOM对象
            const contentDiv = getSelectionContent(selection, true);
            if (!contentDiv) {
                return '';
            }

            // 查找所有超链接元素（包括后代元素）
            const links = contentDiv.querySelectorAll('[href]');
            if (links.length === 0) {
                return '';
            }

            // 遍历所有超链接，找到符合条件的文本
            for (let i = 0; i < links.length; i++) {
                const link = links[i];
                const linkText = link.innerText.trim();

                // 检查文本是否符合密码格式要求
                // 允许字母、数字，长度在4-10之间
                if (linkText && /^[a-zA-Z0-9]{4,10}$/.test(linkText)) {
                    util.clog(`从超链接文本获取密码：${linkText}`);
                    return linkText;
                }
            }
        } catch (error) {
            console.error('解析链接文本作为密码时出错:', error);
        }
        return '';
    }

    /**
     * 解析文本中的提取码
     * @param {string} text - 文本内容
     * @returns {string} 提取码
     */
    function parsePassword(text) {
        // 文本预处理
        text = text
            .replace(/\u200B/g, '')
            .replace('%3A', ":")
            .replace(/(?:本帖)?隐藏的?内容[：:]?/, "");
        // 匹配提取码
        const match = text.match(CONSTANTS.PASSWORD_REGEX);
        return match ? match[0] : '';
    }

    /**
     * 根据域名检测网盘类型
     * @returns {string} 网盘类型
     */
    function detectPanType() {
        const hostname = location.hostname;
        for (const name in PAN_CONFIGS) {
            const config = PAN_CONFIGS[name];
            if (config.host.test(hostname)) {
                return name;
            }
        }
        return '';
    }

    /**
    * 自动填写密码
    */
    function autoFillPassword() {
        // 从URL获取密码
        const queryPwd = util.parseQuery('pwd|p');
        const hashPwd = location.hash.slice(1).replace(/\W/g, ""); // 过滤非密码字符
        let pwd = queryPwd || hashPwd;

        // 检测当前网盘类型
        const panType = detectPanType();

        // 处理对应网盘的密码填写
        for (const name in PAN_CONFIGS) {
            const config = PAN_CONFIGS[name];
            if (panType !== name) {
                continue;
            }
            // 获取实际的storage值（如果是函数则执行）
            const storageType = typeof config.storage === 'function'
                ? config.storage()
                : config.storage;

            // Hash中的密码
            if (storageType === 'hash') {
                // 过滤不正常的Hash
                if (!/^(?:wss:[a-zA-Z\d]+|[a-zA-Z0-9]{3,8})$/.test(pwd)) {
                    return;
                }
            }
            // 本地存储的密码
            if (storageType === 'local') {
                // URL中密码优先
                pwd = pwd || util.getValue(config.storagePwdName);
            }
            pwd && fillPasswordAndSubmit(config.input, config.button, pwd);
            return;
        }
        // 处理未知网盘的密码填充逻辑
        const tmpPwd = util.getValue('tmp_common_pwd');
        const isPanLinkBackup = util.getValue('setting_auto_detect_unknown_disk');

        if (isPanLinkBackup && !panType && tmpPwd) {
            // 更全面地查找可能的密码输入框
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

            // 使用增强的密码填写逻辑
            fillPasswordAndSubmit(passwordInputSelectors, [], tmpPwd, true);

            // 填充完成后清除密码
            util.setValue('tmp_common_pwd', '');
        }
    }


    /**
     * 在密码输入框附近查找提交按钮
     * @param {HTMLElement} inputElement - 密码输入框元素
     * @returns {HTMLElement|null} 找到的提交按钮
     */
    function findNearbySubmitButton(inputElement) {
        // 表驱动设计：定义常量数据结构
        const CONFIG = {
            // 提交按钮选择器列表
            selectors: [
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
            ],
            // 提交相关的关键词
            keywords: [
                'submit',
                '提交',
                '确认',
                '登录',
                'access',
                'ok',
                'go',
                'enter'
            ],
            // 最大父元素查找深度
            maxDepth: 3
        };

        // 检查按钮是否为提交按钮的函数
        const isSubmitButton = (button) => {
            if (util.isHidden(button)) return false;
            
            const buttonText = (button.textContent || button.value || button.innerText || '').toLowerCase();
            const buttonType = button.type ? button.type.toLowerCase() : '';
            
            // 检查按钮类型
            if (buttonType === 'submit') return true;
            
            // 检查按钮文本是否包含关键词
            return CONFIG.keywords.some(keyword => buttonText.includes(keyword));
        };

        // 1. 首先检查输入框的父元素内是否有提交按钮
        let parentElement = inputElement.parentElement;
        let depth = 0;

        while (parentElement && depth < CONFIG.maxDepth) {
            for (const selector of CONFIG.selectors) {
                const buttons = parentElement.querySelectorAll(selector);
                for (const button of buttons) {
                    if (isSubmitButton(button)) {
                        return button;
                    }
                }
            }

            parentElement = parentElement.parentElement;
            depth++;
        }

        // 2. 如果在父元素内没有找到，检查整个页面
        for (const selector of CONFIG.selectors) {
            const button = document.querySelector(selector);
            if (button && isSubmitButton(button)) {
                return button;
            }
        }

        return null;
    }

    /**
     * 填写密码并提交（改进版）
     * @param {string[]} inputSelectors - 输入框选择器
     * @param {string[]} buttonSelectors - 按钮选择器
     * @param {string} pwd - 密码
     * @param {boolean} isPanLinkBackup - 是否为备用网盘链接模式
     */
    function fillPasswordAndSubmit(inputSelectors, buttonSelectors, pwd, isPanLinkBackup = false) {
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
                let input = util.query(inputSelectors);
                let button = isPanLinkBackup ? (input ? findNearbySubmitButton(input) : null) : util.query(buttonSelectors);
                if (input && !util.isHidden(input)) {
                    // 找到输入框并可见，执行填充操作
                    let titletips = attempt === 1 ? 'AI已识别到密码！正自动帮您填写' : 'AI已识别到密码！正自动帮您重试 +' + attempt + ' 次';
                    dialog.toast({
                        title: titletips,
                        icon: attempt === 1 ? 'success' : 'warning',
                        timer: 2000
                    });

                    const lastValue = input.value;
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
    }
    /**
     * 重置识别次数
     */
    function resetIdentifyCount() {
        dialog.confirm({
            title: '确定要重置识别次数吗？',
            text: '',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(res => {
            lastText = 'lorem&';
            if (res.isConfirmed) {
                util.setValue('setting_success_times', 0);
                history.go(0);
            }
        });
    }

    /**
     * 显示识别框
     */
    function showIdentifyBox() {
        const hotkeys = util.getValue('setting_hotkeys');

        const html = `
        <textarea
            placeholder="若选方式一，请按 Ctrl+V 粘贴要识别的文字"
            id="panai-textarea"
        ></textarea>
        <div style="font-size: 12px;color: #999;margin-bottom: 8px;text-align: center;">
            提示：在任意网页按下 <span style="font-weight: 700;">${hotkeys}</span> 键可快速打开本窗口。
        </div>
        <div style="font-size: 14px;line-height: 22px;padding: 10px 0 5px;text-align: left;">
            <div style="font-size: 16px;margin-bottom: 8px;font-weight: 700;">支持以下两种方式：</div>
            <div><b>方式一：</b>直接粘贴文字到输入框，点击“识别方框内容”按钮。</div>
            <div>
                <b>方式二：</b>点击“读取剪切板”按钮。
                <span style="color: #d14529;font-size: 12px;">
                    会弹出“授予网站读取剪切板”权限，同意后会自动识别剪切板中的文字。
                </span>
            </div>
        </div>
    `;

        dialog.confirmWithDeny({
            title: '识别剪切板中文字',
            html: html,
            confirmButtonText: '识别方框内容',
            denyButtonText: '读取剪切板',
            cancelButtonText: '关闭'
        }).then(res => {
            util.clog(res)
            if (res.isConfirmed) {
                const value = res.inputValues['panai-textarea']
                smartIdentify(null, value);
            }
            if (res.isDenied) {
                navigator.clipboard.readText()
                    .then(text => smartIdentify(null, text))
                    .catch(() => {
                        // 使用修复后的toast方法
                        dialog.toast({
                            title: '读取剪切板失败，请先授权或手动粘贴后识别！',
                            icon: 'error'
                        });
                    });
            }
        });
    }
    /**
     * 显示设置框
     */
    function showSettingsBox() {
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
                step: 1000,
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
                id: 'enableLinkManagement',
                label: '链接管理（实验性）',
                type: 'checkbox',
                storageKey: 'setting_link_management',
                value: util.getValue('setting_link_management'),
                title: '开启后会记录识别的网盘链接历史'
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
        dialog.confirm({
            title: '识别助手配置',
            html: html,
            confirmButtonText: '保存',
            cancelButtonText: '取消'
        }).then((res) => {
            res.isConfirmed && history.go(0);
        });

        // 延迟绑定事件监听器，确保对话框已完全渲染
        setTimeout(() => {
            _bindSettingsEvents(settings);
        }, 100);

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
    }

    /**
     * 注册菜单命令
     */
    function registerMenuCommands() {
        GM_registerMenuCommand(
            `👀 已识别：${util.getValue('setting_success_times')}次`,
            () => resetIdentifyCount()
        );

        GM_registerMenuCommand(
            `📋️ 识别剪切板中文字（快捷键 ${util.getValue('setting_hotkeys')}）`,
            () => showIdentifyBox()
        );

        GM_registerMenuCommand(
            '⚙️ 设置',
            () => showSettingsBox()
        );

        GM_registerMenuCommand(
            '📖 查看历史记录',
            () => showLinkHistory()
        );
    }

    /**
     * 显示链接历史记录
     */
    function showLinkHistory() {
        const isLinkManagement = util.getValue('setting_link_management');

        if (!isLinkManagement) {
            dialog.alert({
                title: '链接管理未开启',
                text: '请先在设置中开启链接管理功能（实验性）',
                confirmButtonText: '确定'
            });
            return;
        }

        // 获取历史记录
        const history = util.getValue('setting_link_history') || [];

        if (history.length === 0) {
            dialog.alert({
                title: '无历史记录',
                text: '暂无识别过的网盘链接历史记录',
                confirmButtonText: '确定'
            });
            return;
        }

        // 生成历史记录HTML
        let html = `
            <div style="font-size: 14px;">
                <div style="margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <h4 style="margin: 0; color: #333;">已识别的网盘链接（${history.length}条）</h4>
                    <button id="clear-history-btn" style="padding: 6px 12px; background: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; font-size: 12px;">清空历史</button>
                </div>
                <div style="max-height: 400px; overflow-y: auto;">
        `;

        // 添加历史记录项
        history.forEach((item, index) => {
            const date = new Date(item.timestamp);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

            html += `
                <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 10px; background: #f9fafb;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                        <div>
                            <span style="font-weight: 600; color: #2778c4;">${item.name}</span>
                            <span style="font-size: 12px; color: #9ca3af; margin-left: 10px;">${formattedDate}</span>
                        </div>
                        <button class="delete-history-item" data-id="${item.id}" style="padding: 4px 8px; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 4px; cursor: pointer; font-size: 12px; color: #dc2626;">删除</button>
                    </div>
                    <div style="margin-bottom: 8px; word-break: break-all;">
                        <span style="font-size: 12px; color: #6b7280;">链接：</span>
                        <a href="${item.link}" target="_blank" style="color: #3b82f6; text-decoration: none;">${item.link}</a>
                    </div>
                    ${item.pwd ? `<div style="font-size: 12px; color: #6b7280;">提取码：<span style="font-weight: 600; color: #e74c3c;">${item.pwd}</span></div>` : ''}
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        // 显示历史记录对话框
        dialog.alert({
            title: '链接历史记录',
            html: html,
            confirmButtonText: '关闭'
        }).then(() => {
            // 对话框关闭后清理事件监听器
            const clearBtn = document.getElementById('clear-history-btn');
            if (clearBtn) {
                clearBtn.removeEventListener('click', handleClearHistory);
            }
            const deleteBtns = document.querySelectorAll('.delete-history-item');
            deleteBtns.forEach(btn => {
                btn.removeEventListener('click', handleDeleteHistoryItem);
            });
        });

        // 绑定事件监听器
        setTimeout(() => {
            const clearBtn = document.getElementById('clear-history-btn');
            if (clearBtn) {
                clearBtn.addEventListener('click', handleClearHistory);
            }
            const deleteBtns = document.querySelectorAll('.delete-history-item');
            deleteBtns.forEach(btn => {
                btn.addEventListener('click', handleDeleteHistoryItem);
            });
        }, 100);
    }

    /**
     * 处理清空历史记录
     */
    function handleClearHistory() {
        dialog.confirm({
            title: '确定要清空历史记录吗？',
            text: '此操作不可恢复',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(res => {
            if (res.isConfirmed) {
                util.setValue('setting_link_history', []);
                dialog.toast({
                    title: '历史记录已清空',
                    icon: 'success',
                    timer: 2000
                });
                // 重新显示历史记录界面
                setTimeout(() => showLinkHistory(), 500);
            }
        });
    }

    /**
     * 处理删除单个历史记录项
     * @param {Event} event - 事件对象
     */
    function handleDeleteHistoryItem(event) {
        const itemId = event.target.dataset.id;
        const history = util.getValue('setting_link_history') || [];
        const updatedHistory = history.filter(item => item.id !== itemId);

        util.setValue('setting_link_history', updatedHistory);
        dialog.toast({
            title: '记录已删除',
            icon: 'success',
            timer: 1000
        });

        // 重新显示历史记录界面
        setTimeout(() => showLinkHistory(), 300);
    }

    /**
     * 添加插件样式
     */
    function addPluginStyles() {
        if (document.head) {
            util.addStyle(
                'panai-style',
                'style',
                CONSTANTS.PLUGIN_STYLES
            );
        }

        // 监听head变化，确保样式被添加
        const headObserver = new MutationObserver(() => {
            util.addStyle(
                'panai-style',
                'style',
                CONSTANTS.PLUGIN_STYLES
            );
        });

        headObserver.observe(document.head, { childList: true, subtree: true });
    }

    /**
     * 检查是否为顶层窗口
     * @returns {boolean} 是否为顶层窗口
     */
    function isTopWindow() {
        return window.self === window.top;
    }

    /**
     * 初始化插件
     */
    function initPanHelper() {
        // 初始化自定义对话框
        dialog = new Dialog();
        // 先初始化工具
        util = createUtil();
        // 再初始化网盘配置（此时util已可用）
        initPanConfigs();

        // 执行初始化流程
        initSettings();
        addPluginStyles();
        addHotKeySupport();
        autoFillPassword();
        addPageListeners();

        // 只在顶层窗口注册菜单命令
        if (isTopWindow()) {
            registerMenuCommands();
        }
    }

    // 启动插件
    initPanHelper();
})();