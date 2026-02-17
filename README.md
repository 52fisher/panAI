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

## 📋 项目简介

网盘智能识别助手是一款强大的用户脚本，能够智能识别网页中选中文字里的网盘链接和提取码/密码，自动提示并填写提取码，极大地简化了网盘链接的打开和使用过程。

## ✨ 核心功能

- **智能识别**：自动识别网页中选中文字里的网盘链接和提取码
- **自动填充**：打开链接后自动填写提取码，省去手动输入的麻烦
- **一键提交**：支持自动点击提交按钮完成验证
- **多网盘支持**：覆盖26个主流网盘和19个小众网盘
- **智能推测**：AI能够智能识别未在列表中的网盘链接
- **链接管理**：支持记录和管理识别过的网盘链接历史
- **跨平台兼容**：适用于Windows、macOS、Linux等多个平台
- **高性能**：识别速度小于1毫秒，几乎不占用系统资源

## 📁 支持的网盘

### 主流网盘（25个）

 `✅百度网盘`  `✅阿里云盘`  `✅腾讯微云`  `✅蓝奏云`  `✅蓝奏云优享版`  `✅天翼云盘`  `✅移动云盘`  `✅迅雷云盘`  `✅123云盘`  `✅360云盘`  `✅115网盘`  `✅奶牛快传`  `✅城通网盘`  `✅夸克网盘`  `✅PikPak`  `✅新浪微盘`  `✅文叔叔网盘`  `✅UC网盘`  `✅QQ闪传`  `✅Google云端硬盘`  `✅NitroFlare`  `✅坚果云`  `✅联通云盘`  `✅Mega网盘`  `✅FlowUs息流`

### 小众网盘（20个）

  `✅飞机盘` `✅yukaidi银盘`  `✅小蓝云盘`  `✅六一云盘`  `✅爱丽丝的记事本`  `✅520云盘`  `✅567盘`  `✅AYunPan`  `✅爱优网盘`  `✅飞猫盘`  `✅优云下载`  `✅贵族网盘`  `✅迅牛网盘`  `✅雪球云盘`  `✅77file`  `✅OwnFile`  `✅飞云网盘`  `✅YiFile`  `✅duFile`  `✅116盘`

### 商店链接（4个）

`✅Chrome商店`  `✅Edge商店`  `✅Firefox商店`  `✅Windows商店`

> **注意**：2.2.0版本起，未在上述列表中的网盘，AI也能够智能识别并支持填写提取码

## 🚀 安装指南

### V3版本（推荐）
- **[安装地址（源地址）](https://raw.githubusercontent.com/52fisher/panAI/main/panai_next.user.js)**
- **[安装地址（jsdelivr镜像地址）](https://cdn.jsdelivr.net/gh/52fisher/panAI@main/panai_next.user.js)**
- **[安装地址（ghproxy镜像地址）](https://ghproxy.net/https://raw.githubusercontent.com/52fisher/panAI/main/panai_next.user.js)**

### V2版本
- **[安装地址（源地址）](https://raw.githubusercontent.com/52fisher/panAI/main/panai.user.js)**
- **[安装地址（jsdelivr镜像地址）](https://cdn.jsdelivr.net/gh/52fisher/panAI@main/panai.user.js)**
- **[安装地址（ghproxy镜像地址）](https://ghproxy.net/https://raw.githubusercontent.com/52fisher/panAI/main/panai.user.js)**

## 📖 使用说明

1. **选中文字**：鼠标选中含网盘链接的文字（容错性很高，选多或选少了也可以智能识别）

2. **点击打开**：若包含网盘链接和提取码，上方会出现提示，点击"打开"按钮

3. **自动填充**：脚本会自动打开链接并填写提取码，无需手动操作

4. **查看历史（仅V3）**：点击油猴菜单中的"查看历史记录"，可查看和管理识别过的链接


## 🔧 配置选项

点击油猴图标打开配置选项，可设置以下功能：

- **填写密码后自动提交**：自动点击提交按钮完成验证
- **前台打开网盘标签页**：在前台打开新的网盘标签页
- **倒计时结束后自动打开链接**：设置倒计时后自动打开链接
- **自动补全链接前缀**：自动补全部分网盘链接的前缀
- **将超链接文本作为提取码**：将超链接的文本内容作为提取码
- **智能识别未知网盘链接**：启用AI智能识别未知网盘链接
- **链接管理（实验性）**：启用链接历史记录和管理功能
- **快捷键设置**：设置打开识别窗口的快捷键

## 🛠 技术实现

### 核心技术

- **正则表达式**：使用精心设计的正则表达式匹配不同网盘的链接格式
- **AI智能推测**：通过7个条件综合评分≥3判定为网盘链接
- **指数退避重试**：对无法点击的按钮实现多次重试机制
- **现代框架兼容**：优化对Vue、React等现代JS框架网站的支持
- **模块化设计**：代码结构清晰，功能模块化，易于维护和扩展

### 技术优势

- **高性能**：识别速度小于1毫秒，几乎不占用系统资源
- **高准确率**：智能识别算法，识别准确率高达99%
- **高兼容性**：支持99%的网站，包括论坛、博客、搜索引擎等
- **安全可靠**：代码均在本地运行，无联网功能，不会上传任何信息

## 📖 添加自定义网盘

### 参数说明

在`initPanConfigs`函数中，使用`PAN_CONFIGS`对象来管理所有支持的网盘列表和信息，每个网盘的配置参数如下：

```javascript
'noire': {
    reg: /(?:https?:\/\/)?drive.noire.cc\/s\/\w+/, // 网盘链接的正则表达式
    host: /drive\.noire\.cc/, // 网盘链接的host
    input: ['#pwd'], // 密码输入框的选择器
    button: ['button.MuiButton-containedSecondary'], // 提交按钮的选择器
    name: '爱丽丝的记事本', // 网盘名称
    storage: 'local', // 密码存储方式，可选local或hash
    storagePwdName: 'tmp_noire_pwd', // 密码存储的名称
    replaceHost: 'drive.noire.cc', // 替换链接的host（可选）
},
```

## 📝 更新日志

### PANAI-NEXT（V3版本）

**v3.1.4** 优化代码结构，使用表驱动重构findNearbySubmitButton函数；更新fillPasswordAndSubmit函数实现更完善的指数退避重试逻辑；重构showSettingsBox函数，使其与panai.user.js中的实现保持一致

**v3.1.3** 新增链接管理功能（实验性），支持记录和管理识别过的网盘链接历史（最多50条），包括查看、删除单个记录和清空所有记录; 改进超链接文本作为密码解析的方法

**v3.1.2** 修复115网盘的无法填写访问码的问题（115cdn使用了tailwindcss框架，导致访问码输入框的选择器发生了变化）

**v3.1.1** 新增yukaidi银盘、小蓝云盘、六一云盘的支持

**v3.1.0** 新增自定义Dialog组件，完全替代sweetalert2库，提升弹窗性能和兼容性；新增inferPanLink智能推测网盘链接功能，通过7个条件综合评分≥3判定为网盘链接，支持识别未知域名网盘；新增14个小众网盘配置

**v3.0.0** 重构并优化了代码，修复了一些bug。使用指数退避计算延迟，现在可以对button按钮无法点击的情况进行多次重试了

### PANAI（V2版本）
**v2.2.4** 修复未知网盘推断开未生效的问题，一些代码优化

**v2.2.3** 修复115网盘的无法填写访问码的问题

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


## 🤝 贡献与反馈

如果您在使用过程中有任何问题或建议，欢迎通过以下方式反馈：

- **GitHub Issues**：[点击这里](https://github.com/52fisher/panAI/issues)提交问题
- **Pull Request**：欢迎提交代码贡献
- **Star 支持**：如果您觉得这个项目有用，欢迎给我们点个Star

## 📄 许可证

本项目采用 MIT 许可证，详情请查看 [LICENSE](LICENSE) 文件。
---

**感谢您使用网盘智能识别助手！** 🎉

如果您觉得这个项目对您有帮助，欢迎分享给更多的朋友！