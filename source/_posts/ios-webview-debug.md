---
title: ios webView调试工具
categories: '工具'
tags: 
  - 工具
---
通过 chrome 远程调试 iOSwebview ，解决一些在手机上不好定位的问题
<!-- more -->

工作上碰到在 iOS 上页面不好调试，在学校中学过 Andriod 的远程调试，google 一波发现 iOS 也可以远程调试，用的是    ios-webkit-debug-proxy ，主要参考如下（只实现了 win 环境）

1.https://github.com/google/ios-webkit-debug-proxy 
这里用到 scoop，win 环境下需要用到 powershell
2.https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter (需要启动代理 remotedebug_ios_webkit_adapter --port=9000)
3.http://www.jianshu.com/p/19c18c924f91   (ios_webkit_debug_proxy -f chrome-devtools://devtools/bundled/inspector.html)

手机需要在设置里safari--开启调试
在chrome中打开 localhost:9221 ，可以看到当前已连接的设备列表，点击页面后在 console 中打开页面即可调试
