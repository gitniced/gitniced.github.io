---
title: 搭建Hexo博客总结
categories: '个人总结'
tags: 
  - 博客
---
记录下搭建博客遇见的一些问题，仅供参考。由于搭建博客历时很久，就只记录搭建成功那个下午的一些问题
<!-- more -->


选主题是个让选择恐惧症人非常头痛的是，这里我就不推荐了，让你们头痛去吧，选完主题一般都会有文档教你怎么去部署。这里我是参考的Hexo的even主题，我是参考 https://github.com/ahonn/hexo-theme-even/wiki 去配置的，本地起的服务是没有任何问题的。

由于参考的是主题的 wiki 导致不知道如何发布到 github 所以浪费了大把时间，这里我就写一下,顺便巩固下 md 的写法

部署之前先修改 _config.yml 文件

``` yml
deploy:
    type: git
    repository: https://github.com/username/username.github.io.git  //username为你的用户名
    branch: master 
```

后来发现这样写，在后面的步骤会报错，修改写法

``` yml
deploy:
  type: git
  repo: git@github.com:username/username.github.io.git  //username为你的用户名
  branch: master

```

这里需要注意 branch ，在后面执行 hexo deploy 后会自动上传编译后的内容及 public 文件夹的内容到 master 分支，branch 所填的不是 git 下来的hexo分支

然后执行以下命令部署

``` cmd
    hexo generate // 可以缩写成 hexo g
    hexo deploy   // 同样可以缩写 hexo d
```

如果执行上述命令报错，你可以试试下面这个命令再试。

``` cmd
$ npm install hexo-deployer-git--save
```








