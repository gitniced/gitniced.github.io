---
title: 应(luan)有(qi)尽(ba)有(zao)
categories: 'js'
tags: 
  - js
---

记录一些看到的有用的知识
<!-- more -->

### 金钱格式化
用正则魔法实现：
``` js
var test1 = '1234567890'
var format = test1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

console.log(format) // 1,234,567,890
```

非正则的优雅实现：
``` js
 function formatCash(str) {
       return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
       })
}
console.log(formatCash('1234567890')) // 1,234,567,890
```
一句话实现：
``` js
(23333333.99).toLocaleString('en-US') // 23,333,333.99
```

