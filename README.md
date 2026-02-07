<center>
<p align="center">
  <a href="https://www.youxiaohou.com">
    <img width="100" src="https://www.youxiaohou.com/logo.png" alt="网盘智能识别助手">
  </a>
</p>

<h1 align="center">网盘智能识别助手（持续更新版）</h1>

<p align="center">
  <img src="https://img.shields.io/badge/TamperMonkey-v4.13-brightgreen.svg" alt="tampermonkey">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-lightgrey.svg" alt="LICENSE">
  </a>
  <img src="https://img.shields.io/badge/Chrome-≥76.0-brightgreen.svg" alt="chrome">
  <img src="https://img.shields.io/badge/Edge-≥88.0-brightgreen.svg" alt="edge">
  <img src="https://img.shields.io/badge/Platform-Windows%20%7C%20Mac%20%7C%20Linux-blue.svg" alt="platform">
  <a href="https://www.youxiaohou.com" title="点击访问">
    <img src="https://img.shields.io/badge/Author-油小猴-red.svg">
  </a>
</p>

<div align="center">
  <strong>👉 自动识别网盘分享链接并填写提取码 👈</strong><br>
  <sub>适用于 Linux，macOS，Windows 平台</sub>
</div>
</center><br>

【网盘智能识别助手】可以智能识别网页中选中文字（一般背景为蓝色）里的 网盘链接 和 提取码/密码，提示并自动填写提取码。

目前已支持识别：

主流网盘：（24个）

 `✅百度网盘`  `✅阿里云盘`  `✅腾讯微云`  `✅蓝奏云`  `✅天翼云盘`  `✅移动云盘`  `✅迅雷云盘`  `✅123云盘`  `✅360云盘`  `✅115网盘`  `✅奶牛快传`  `✅城通网盘`  `✅夸克网盘`  `✅新浪微盘`  `✅Mega网盘`  `✅文叔叔网盘`  `✅UC网盘`  `✅FlowUs息流`  `✅坚果云`  `✅联通云盘`  `✅QQ闪传`  `✅Google Drive`  `✅nitroflare`   `115CDN`

小众网盘：（14个）

 `✅520云盘`  `✅567盘`  `✅AYunPan`  `✅爱优网盘`  `✅飞猫盘`  `✅优云下载`  `✅贵族网盘`  `✅迅牛网盘`  `✅雪球云盘`  `✅77file`  `✅OwnFile`  `✅飞云网盘`  `✅YiFile`  `✅duFile`  `✅116盘`

商店链接：（4个）

`✅Chrome 扩展商店`  `✅Edge 扩展商店`  `✅Firefox 扩展商店`  `✅Microsoft 应用商店`


**2.2.0+版本起，未在上述列表中的网盘，AI也能够智能识别并支持填写提取码（具体请查看inferPanLink相关代码）。**


安装成功后可以使用页尾的链接进行测试，识别速度小于 1 毫秒。

## 🎨 助手界面

![](https://pic.rmb.bdstatic.com/bjh/f3784d134bdbb6a78c5db0bb071fed298280.png)

## 💽 安装地址

- **[安装地址（源地址）](https://raw.githubusercontent.com/52fisher/panAI/main/panai.user.js)**
- **[安装地址（jsdelivr镜像地址）](https://cdn.jsdelivr.net/gh/52fisher/panAI@main/panai.user.js)**
- **[安装地址（ghproxy镜像地址）](https://ghproxy.net/https://raw.githubusercontent.com/52fisher/panAI/main/panai.user.js)**

## 功能介绍

### 核心功能
- 智能识别页面中的网盘链接
- 自动提取并填充提取码
- 支持点击提交按钮完成验证
- 支持链接中的中文标点自动转换为英文标点（点、冒号、斜杠等）
- 内置支持 24 个主流网盘和 14 个小众网盘
- 未在列表中的网盘，AI能够智能识别并支持填写提取码（需要满足判定条件）。

> 在删除内置规则的情况下，依然能对百度网盘、天翼云盘、微云、移动云盘、奶牛快传、夸克等多类网盘进行识别和填写提取码。对国外网盘，如uploadgig、alfafile、rapidgator.net、rg.to、nitroflare等也能智能识别而无需再配置

### 新增功能特性
- **智能密码输入框识别**：通过ID、类名、占位符、标签名等多种属性查找密码输入框
- **附近提交按钮搜索**：自动查找密码输入框附近的提交按钮进行点击（AI识别）
- **现代框架兼容**：优化对Vue、React等现代JS框架网站的支持
- **指数退避重试**：对无法点击的按钮实现多次重试机制，提高成功率

### 技术优化
- 代码结构优化，减少冗余
- 增强对动态生成元素的识别能力
- 提升密码填充的准确性和成功率
- 优化延迟计算算法，使用指数退避策略

## 📖 使用说明

1. 鼠标选中含网盘链接的文字，被选中区域背景会变成蓝色（容错性很高，选多或选少了也可以智能识别😀）

2. 若包含网盘链接和提取码，上方会出现提示，点击打开会自动打开链接并填写提取码。

![](https://pic.rmb.bdstatic.com/bjh/623aeea319185cc50289483a8614118b1805.png)

## 📖 添加自定义网盘的参数说明
line111行,使用opt对象来管理所有支持的网盘列表和信息，opt的key即为不同网站的名称缩写，key的子对象即为该网站的具体配置，参数说明如下：
```javascript
'noire': {
reg: /(?:https?:\/\/)?drive.noire.cc\/s\/\w+/, //网盘链接的正则表达式，用于匹配链接
host: /drive\.noire\.cc/,//网盘链接的host，用于匹配链接
input: ['#pwd'], //密码输入框的选择器，用于获取密码输入框的元素
button: ['button.MuiButton-containedSecondary'],//密码输入框的确认按钮的选择器，用于获取确认按钮的元素
name: '爱丽丝的记事本',//网盘名称
storage: 'local',//密码存储方式，可选local或hash，使用hash时会在链接中添加pwd参数和pwd的hash，使用local时会在本地存储密码，且使用原链接访问，不会拼接pwd参数和pwd的hash。
storagePwdName: 'tmp_noire_pwd',//密码存储的名称，使用local方式存储密码能通过该值获取对应的密码
replaceHost: 'drive.noire.cc',//替换链接的host，用于替换链接中的host，解决部分网站路由跳转不对的问题
},
```


## 📖 更新日志

### PANAI-NEXT
**v3.1.1** 新增yukaidi银盘、小蓝云盘、六一云盘的支持

**v3.1.0** 新增自定义Dialog组件，完全替代sweetalert2库，提升弹窗性能和兼容性；新增inferPanLink智能推测网盘链接功能，通过7个条件综合评分≥3判定为网盘链接，支持识别未知域名网盘；新增14个小众网盘配置（520云盘、567盘、AYunPan、爱优网盘、飞猫盘、优云下载、贵族网盘、迅牛网盘、雪球云盘、77file、OwnFile、飞云网盘、YiFile、duFile、116盘）；新增"智能识别未知网盘链接"设置项。

**v3.0.0** 重构并优化了代码，修复了一些 bug。使用指数退避计算延迟，现在可以对button按钮无法点击的情况进行多次重试了.


### PANAI
**v2.2.2** 新增yukaidi银盘、小蓝云盘、六一云盘的支持

**v2.2.1** 更新文档，自动识别未知网盘函数重命名为inferPanLink

**v2.2.0** 新增自动识别未知网盘功能（实验性功能，需在设置中打开），未知网盘也可以进行密码填充功能，优化密码输入框和提交按钮识别逻辑。支持116盘、nitroflare

**v2.1.9** 链接中的点、冒号、斜杠等中文词自动转换为对应的字符

**v2.1.8** 识别优化，仅过滤链接中的个别中文或表情字符

**v2.1.7** 支持希沃品课（seewopinco）和Steam商店（steam） （感谢 [@xiaofeiTM233](https://github.com/xiaofeiTM233) ）

**v2.1.6** 代码重构，使用指数退避算法计算重试延迟

**v2.1.5** 代码重构，移除OriginalLink参数，使用storage: 'local'不会再更改原链接，也不会在链接后拼接pwd参数和hash。storage: 'hash'在拼接时会根据链接是否为VUE等框架的hash模式，来判断拼接参数的位置。

**v2.1.4** 修复无法自动填充密码的bug，SettingBox重构

**v2.1.3** 支持移动云盘新域名 yun.139.com，修复部分网盘使用hash路由造成的密码识别错误问题

**v2.1.2** 支持115cdn

**v2.1.1** 当button按钮无法点击时，会进行重试，重试间隔为800ms，最多重试10次。（修复pikpak无法提交密码的问题）

**v2.1.0** 支持qfile和Google Drive（thanks [@xiaofeiTM233](https://github.com/xiaofeiTM233) ），支持123盘的多域名(123pan/123865/123684/123652/123912)

**v2.0.9** 增加orginalLink（Boolean）可选参数，默认false。当参数值为true时，会保留原始链接，不会拼接pwd参数和pwd的hash，以解决部分网站路由跳转不对的问题

**v2.0.8**支持将超链接的文本作为密码（仅支持大小写字母和数字），实验性功能  需要在设置中打开

**v2.0.7** 修复quark网盘主页搜索时弹出错误的密码填写提示

**v2.0.6** 支持 百度、迅雷、夸克等网盘的自动推导补全（默认关闭，需在设置中开启）

**v2.0.5** 添支持蓝奏云优享版、支持对?code=参数的密码识别，添加对蓝奏新域名和123盘新域名的识别

**v1.9.5** 添加对 **新浪微盘/文叔叔网盘/14个小众网盘** 链接的识别 #31；修复链接中含有pwd字段时优先使用该字段作为密码 #22。感谢 [@52fisher](https://github.com/52fisher)。

**v1.9.1** 添加对 **Mega网盘** 链接的识别 #22 支持自定义识别快捷键 #30；修复蓝奏云识别错误 #23 错误的识别链接 #16。感谢 [@52fisher](https://github.com/52fisher)。

**v1.8.9** 添加对阿里云盘新域名 www.alipan.com 分享链接的支持。

**v1.8.6** 增强选中文字含有超链接时的识别能力。感谢 [@taozhiyu](https://github.com/taozhiyu)。

**v1.8.5** 增强对移动云盘的识别的识别能力。

**v1.8.4** 提升对提取码的识别能力，能更智能的识别提取码。

**v1.8.3** 添加对 **FlowUs息流** 链接的识别；**弹出提示时按下 Enter 回车键可以快速打开，按下 Esc 键可以关闭弹窗提示**。

**v1.8.1** 更换更清晰的图标。新增对 **Mircosoft 应用商店**链接的识别，选中后自动跳转到对应可直接访问的镜像站点。[选中我试试看](https://apps.microsoft.com/store/detail/wechat-for-windows/9NBLGGH4SLX7)。

**v1.8.0** 添加对 **百度企业网盘，百度网盘文档，115网盘，奶牛快传，城通网盘，夸克网盘** 链接的识别。

**v1.7.0** 添加剪切板文本识别，可在脚本菜单中选择 `识别剪切板中文字`（可以按 F1 快速打开），在弹出的窗口中粘贴需要识别的链接。

**v1.6.0** 添加对 **360云盘** 链接的识别，新增对 **Chrome 扩展商店，Edge 扩展商店，Firefox 扩展商店**链接的识别，选中后自动跳转到对应可直接访问的镜像站点。[选中我试试看](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)。

**v1.5.6** 支持将链接中含“点”自动替换为“.”后识别，加强阿里云盘的识别。

**v1.5.4** 修复链接本身包含提取码无法识别的问题，如 https://pan.baidu.com/s/xxxx?**pwd=1234**。

**v1.5.2** CDN 从 cdn.jsdelivr.net 替换为 unpkg.com。

**v1.5.1** 支持识别到 lanzous.com，就自动转换到可以访问的域名 lanzouw.com

**v1.5.0** 添加对 **123云盘** 链接的识别，支持超链接形式的识别（[选中密码和我试试看](https://www.lanzoui.com/b00t5sclg) 密码:d8f9）。

**v1.4.3** 增强对蓝奏云新链接的识别。

**v1.4.2** 增强对蓝奏云链接的识别。

**v1.4.1** 添加对阿里云盘短链接 alywp.net 的识别，增强对蓝奏云自定义链接的识别。

**v1.4.0** 添加对 **阿里云盘** 链接的识别，见测试链接 - 阿里云盘。

**v1.3.2** 支持识别更多天翼云盘链接格式。

**v1.3.1** 支持识别到 lanzous.com，就自动转换到可以访问的域名 lanzoui.com

**v1.3.0** 添加了对 **迅雷网盘** 链接的识别，改进了对链接中含有零宽度字符时无法识别的问题，修复和彩云无法自动填写的 Bug。

**v1.2.0** 修复了设置选项出现在 iframe 里的情况，优化了自动点击提交按钮的逻辑。

**v1.1.1** 修正了在部分网站上样式无法加载的问题。

**v1.1.0** 修正了弹出框在百度搜索上样式错乱的问题，部分网站弹出框被覆盖的问题，支持 iframe 网页内识别。

**v1.0.6** 支持对 `http删s://pan.b厨aidu.co次m/s/xxxx闷xxx` 这种中间含有汉字等特殊符号的识别。

**v1.0.5** 支持连续识别，增强对百度网盘的链接识别。

**v1.0.3** 增强识别准确度，对提取码判断更加准确。

**v1.0.2** 添加对不带 https 的链接识别，修复部分网站设置弹出框字体过大的提示。

**v1.0.1** 添加对 **和彩云** 链接的识别。

**v1.0.0** 添加对 **百度网盘，腾讯微云，蓝奏云，天翼云盘** 链接的识别。

## 🎨 GIF演示

图中网盘链接均来自Google搜索引擎，点击查看对应网盘识别动图：

|  |  |
|:-------------------------------------------------:|:-----------------------------------------------:|
| **百度网盘** | **阿里云盘** |
| ![](https://pic.rmb.bdstatic.com/bjh/0e378c9fe87dab58b3b4b5a1a6c14f1c1596.gif) | ![](https://pic.rmb.bdstatic.com/bjh/26feaeebd345fb9d81977615a293bd5a7602.gif) |
| **蓝奏云** | **腾讯微云** |
| ![](https://pic.rmb.bdstatic.com/bjh/642cd5072e3206d1788689e47709edab325.gif) | ![](https://pic.rmb.bdstatic.com/bjh/3e91200930793e97ceadb95d7abec1ee6398.gif) |
| **天翼云** | **和彩云** |
| ![](https://pic.rmb.bdstatic.com/bjh/999f0aad15106f346dc5a7dcd0e0f9c67773.gif) | ![](https://pic.rmb.bdstatic.com/bjh/0b2d96e8bc38c5b00c24d29709e5cfa52649.gif) |
| **迅雷网盘** | **123云盘** |
| ![](https://pic.rmb.bdstatic.com/bjh/93c837648bbe18e0da56c161cb2b24773089.gif) | ![](https://pic.rmb.bdstatic.com/bjh/093f6b9c739b25cbe7c0967d45e732fa907.gif) |
| **115网盘** | **奶牛快传** |
| ![](https://pic.rmb.bdstatic.com/bjh/181f1ee654d0bc387b088267a75aebba6628.gif) | ![](https://pic.rmb.bdstatic.com/bjh/8289e20763b97b26a932774e424915bc6814.gif) |
| **城通网盘** | **夸克网盘** |
| ![](https://pic.rmb.bdstatic.com/bjh/0e9bad688f2c21f0b6f3559b39b79f691712.gif) | ![](https://pic.rmb.bdstatic.com/bjh/941da48f310b86b43dcd03d884918fe13568.gif) |

## 🔧 助手配置

可以点击 `油猴` 图标打开配置选项，可配置选项如下图：

![](https://pic.rmb.bdstatic.com/bjh/5e712642ac0c0e7bbdeed5406777a9b79281.png)

技巧一：如何识别后实现自动打开链接？

回答：勾选`倒计时结束后自动打开链接`选项，同时调节倒计时时长，最短0.5s。

技巧二：如何让链接在后台打开？

回答：取消勾选`前台打开并激活网盘标签页`选项，新链接将在后台打开。

## 🚀 测试链接

安装好识别助手后，可以在打开页面中**选中**下方任意链接进行测试，以下仅是部分。**识别成功率高达99%！**

[点击查看](https://www.youxiaohou.com/tool/install-panai.html)

## 💯 常见问题

💡 **我只有网盘链接，不知道提取码，能自动获取并填充吗？**

A：不能，本助手无获取提取码的功能。仅智能识别所选区域的提取码并自动填充。

💡 **支持在哪些网站中进行识别？**

A：支持99%的网站，比如论坛，博客，搜索引擎等，只要选中区域内有符合条件的网盘链接，都会自动提示。

💡 **选中区域内有多个符合条件的链接会发生什么？**

A：目前仅会识别并提示第一个符合条件的链接，<Color color="#cc3235">不支持一次选择多个链接</Color>。

💡 **识别助手安全吗？**

A：识别助手免费开源，代码均在本地运行，无联网功能，不会上传任何信息。

💡 **智能识别过程会耗费资源吗？**

A：根据多次测试，平均识别时间仅需：0.1 毫秒-1 毫秒，基本上不占用系统资源。

## 👻 BUG反馈

如果您在使用过程中有无法识别的文本，请 [点击这里](https://github.com/52fisher/panAI/issues) 进行反馈。
