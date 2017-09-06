---
title: 学习Python 专题
categories: 'python'
tags: 
  - python
---

学习廖雪峰的[Python教程](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000),主要为了记笔记
<!-- more -->

## <span id="hssbc">函数式编程</span>

### <span id="zsq">装饰器(Decorator)</span>
  在代码运行期间动态的添加功能的方式，称之为“装饰器”,本质上就是返回一个函数的高阶函数

  ``` python
    # 编写 decorato,能在函数调用前后打印出'begin call'和'end call'的日志
    import functools # 引入模块,模块是讲解

    def log(func):
        # 函数对象有_name_属性  返回新的函数后，之前的函数_name_被修改，当依赖函数签名的代码执行时会报错，所以需要调用内置@functools.wraps(func)
        @functools.wraps(func)  
        def wrapper(*args, **kw):
            print('begin call')
            func(*args, **kw)
            print('end call')
        return wrapper

    @log  
    def now():
        print('我是调用函数')
    # @log 函数定义  即执行  now = log(now)
    now()

  ````
针对带参数的decorator
  ````python
    
    import functools

    def log(text):
        def decorator(func):
            @functools.wraps(func)
            def wrapper(*args, **kw):
                print('%s %s():' % (text, func.__name__))
                return func(*args, **kw)
            return wrapper
        return decorator
      
    log('execute')
    def now():
        pass
    # 调用 now = log('execute')(now)
    now()
    
  ````

  ### 偏函数（partial）
  将一个函数的某些参数固定住（即设置默认值）,返回一个新的函数，接收参数为函数，*arg， ** kw这三个参数
  ```python
    import functools

    int2 = functools.partial(int, base=2)
    
    def int2(x,  base=2):
        return int(x, base)
  ```

  ## 模块
  当文件夹包含 <code>\_init_.py</code> ，说明这是一个包目录，<code>\_init_.py</code> 本身就是一个模块，模块名即包目录名

  模块名 = n*包目录名 + 文件名

  ### 使用模块

  模块的标准文件模板
  ```python
    #!/usr/bin/env python3
    # -*- coding: utf-8 -*-

    # 文档注释
    ' a test module '

    # 作者    
    __author__ = 'Michael Liao'
    
    import sys
    
    def test():
        args = sys.argv
        if len(args)==1:
            print('Hello, world!')
        elif len(args)==2:
            print('Hello, %s!' % args[1])
        else:
            print('Too many arguments!')
    
    # 当该模块通过命令行运行时，__name__=='__main__' 为 true
    # 当其他地方导入该模块，__name__=='__main__' 为 false
    if __name__=='__main__':
        test()
  ```
  关于函数的命名，分为 public, private,非公开的命名最好通过前缀 <code>_</code> 实现，但是外部依旧可以调用。
  类似<code>\__xxx__</code>是特殊变量

  #### 模块搜素路径
  默认情况下，Python解释器会搜索当前目录、所有已安装的内置模块和第三方模块，搜索路径存放在<code>sys</code>模块的<code>path</code>变量中

  如果我们要添加自己的搜索目录，有两种方法：

  一是直接修改sys.path，添加要搜索的目录：

  ```
  >>> import sys
  >>> sys.path.append('/Users/michael/my_py_scripts')
  ```
  这种方法是在运行时修改，运行结束后失效。

  第二种方法是设置环境变量PYTHONPATH，该环境变量的内容会被自动添加到模块搜索路径中。设置方式与设置Path环境变量类似。注意只需要添加你自己的搜索路径，Python自己本身的搜索路径不受影响。

  ## 面向对象编程（OOP）
  ### 类和实例
  类中定义函数第一个参数必须是<code>self</code>,表示实例本身

  通过定义<code>\__init\__</code>方法，可以将必填的属性强制填写进去
  ```python
    class Student(object):

        def __init__(self, name, score):
            self.name = name
            self.score = score
  ```
  可以通过 <code>\__</code> 实现外部无法访问，变成私有变量(private)

  ``` python
    class Student(object):

        def __init__(self, name, score):
            self.__name = name
            self.__score = score

  ```
  不能直接访问<code>\__name</code>是因为Python解释器对外把<code>\__name</code>变量改成了<code>\_Student\__name</code>，所以，仍然可以通过<code>\_Student\__name</code>来访问<code>\__name</code>变量

  ### 获取对象信息
  #### 使用 type（）

  ```cmd
    >>> type(123)
    <class 'int'>
  ```
  返回类型为Class类型，故 <code>if</code> 要判断两个type类型是否相等
  ```cmd
    >>> type(123)==type(456)
    True
    >>> type(123)==int
    True
  ```
  对于非基本数据类型，调用 <code>types</code> 模块中定义的常量
  ```cmd
    >>> type(fn)==types.FunctionType
    True
    >>> type(abs)==types.BuiltinFunctionType
    True
    >>> type(lambda x: x)==types.LambdaType
    True
    >>> type((x for x in range(10)))==types.GeneratorType
    True
  ```
  #### 使用 isinstance()
  对于class的继承关系，使用 <code>isinstance</code> 会方便很多
  ```cmd
    >>> a = Animal()
    >>> d = Dog() // 继承Animal类
    >>> isinstance(d, Animal)
    True
  ```
  还可以判断一个变量是否是某些类型中的一种
  ```cmd
    >>> isinstance([1, 2, 3], (list, tuple))
    True
    >>> isinstance((1, 2, 3), (list, tuple))
    True
  ```

  #### 使用 dir()
  如果要获得一个对象的所有属性和方法，可以使用dir()函数，它返回一个包含字符串的list
  ```
    >>> dir('ABC')
    ['__add__', '__class__', '__contains__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getnewargs__', '__gt__', '__hash__', '__init__', '__iter__', '__le__', '__len__', '__lt__', '__mod__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__rmod__', '__rmul__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', 'capitalize', 'casefold', 'center', 'count', 'encode', 'endswith', 'expandtabs', 'find', 'format', 'format_map', 'index', 'isalnum', 'isalpha', 'isdecimal', 'isdigit', 'isidentifier', 'islower', 'isnumeric', 'isprintable', 'isspace', 'istitle', 'isupper', 'join', 'ljust', 'lower', 'lstrip', 'maketrans', 'partition', 'replace', 'rfind', 'rindex', 'rjust', 'rpartition', 'rsplit', 'rstrip', 'split', 'splitlines', 'startswith', 'strip', 'swapcase', 'title', 'translate', 'upper', 'zfill']
  ```
  
  仅仅把属性和方法列出来是不够的，配合getattr()、setattr()以及hasattr()，我们可以直接操作一个对象的状态

  ## 面向对象的高级编程
  ### 使用 \__slots\__
  我们可以动态的给<code>类</code>和<code>实例</code>添加属性和方法
  ```python
    >>> def set_age(self, age): # 定义一个函数作为实例方法
    ...     self.age = age
    ...
    >>> from types import MethodType
    >>> s = Student()
    >>> s.name = 'Michael' # 动态给实例绑定一个属性
    >>> print(s.name)   
    >>> s.set_age = MethodType(set_age, s) # 给实例绑定一个    方法
    >>> s.set_age(25) # 调用实例方法
    >>> s.age # 测试结果
    25
  ```
  使用 <code>\__solts\__</code> 限制<code>实例</code>添加属性，对于继承的子类是不起作用的,除非在子类中添加 <code>\__solts\__</code>
  ``` python
    class Student(object):
    __slots__ = ('name', 'age') # 用tuple定义允许绑定的属性名称
  ```
  ``` cmd
    >>> s = Student() # 创建新的实例
    >>> s.name = 'Michael' # 绑定属性'name'
    >>> s.age = 25 # 绑定属性'age'
    >>> s.score = 99 # 绑定属性'score'
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    AttributeError: 'Student' object has no attribute   'score'
  ```

### 使用 @property
负责将一个方法变成属性调用

``` python
    # 请利用@property给一个Screen对象加上width和height属性，以及一个只读属性resolution：

    class Screen(Object):
        @property
        def width(self):
            return self._width

        @width.setter
        def width(self, value):
            if not isinstance(value, int):
                return ValueError('不是一个有效值')
            self._width = value

        @property
        def resolution(self):
            return 786432
```

### 多重继承
有设计模式mixin，添加额外功能
### 定制类
参考官网了解更多 \__xxx\__
### 使用枚举类
Python提供了Enum类来实现这个功能
```python
    from enum import Enum

    Month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))
```
value属性则是自动赋给成员的int常量，默认从1开始计数。

如果需要更精确地控制枚举类型，可以从Enum派生出自定义类：
```python
    from enum import Enum, unique

    @unique
    class Weekday(Enum):
        Sun = 0 # Sun的value被设定为0
        Mon = 1
        Tue = 2
        Wed = 3
        Thu = 4
        Fri = 5
        Sat = 6
```
<code>@unique</code> 装饰器可以帮助我们检查保证没有重复值。
``` cmd
    >>> day1 = Weekday.Mon
    >>> print(day1)
    Weekday.Mon
    >>> print(Weekday.Tue)
    Weekday.Tue
    >>> print(Weekday['Tue'])
    Weekday.Tue
    >>> print(Weekday.Tue.value)
    2
    >>> print(Weekday(1))
    Weekday.Mon
```

### 使用元类(metaclass)
详细新开一章

## 错误、调试和测试

### 错误处理

#### try...expect...finally
try的机制：
```python
    try:
        print('try...')
        r = 10 / 0
        print('result:', r)
    except ZeroDivisionError as e:
        print('except:', e)
    finally:
        print('finally...')
    print('END')

    # try...
    # except: division by zero
    # finally...
    # END
```
可以有多个except来捕获不同类型的错误,Python所有的错误都是从BaseException类派生的，常见的错误类型和继承关系看这里：

https://docs.python.org/3/library/exceptions.html#exception-hierarchy

使用try...except捕获错误还有一个巨大的好处，就是可以跨越多层调用，比如函数main()调用foo()，foo()调用bar()，结果bar()出错了，这时，只要main()捕获到了，就可以处理

#### 调用堆栈

如果错误没有被捕获，它就会一直往上抛，最后被Python解释器捕获，打印一个错误信息，<code>然后程序退出</code>

#### 记录错误

如果不捕获错误，自然可以让Python解释器来打印出错误堆栈，但程序也被结束了。既然我们能捕获错误，就可以把<code>错误堆栈</code>打印出来，然后分析错误原因，<code>同时，让程序继续执行下去。</code>

Python内置的logging模块可以非常容易地记录错误信息通过配置，logging还可以把错误记录到日志文件里，方便事后排查

``` python

import logging

def foo(s):
    return 10 / int(s)

def bar(s):
    return foo(s) * 2

def main():
    try:
        bar('0')
    except Exception as e:
        logging.exception(e)

main()
print('END')
```

```
$ python3 err_logging.py
// 错误堆栈
ERROR:root:division by zero
Traceback (most recent call last):
  File "err_logging.py", line 13, in main
    bar('0')
  File "err_logging.py", line 9, in bar
    return foo(s) * 2
  File "err_logging.py", line 6, in foo
    return 10 / int(s)
ZeroDivisionError: division by zero

END
```

#### 抛出错误
使用<code>raise</code>语句抛出错误，我们可以自定义错误类型

``` python
class FooError(ValueError):
    pass

def foo(s):
    n = int(s)
    if n==0:
        raise FooError('invalid value: %s' % s)
    return 10 / n

foo('0')

--------------
$ python3 err_raise.py 
Traceback (most recent call last):
  File "err_throw.py", line 11, in <module>
    foo('0')
  File "err_throw.py", line 8, in foo
    raise FooError('invalid value: %s' % s)
__main__.FooError: invalid value: 0
```

raise语句如果不带参数，就会把当前错误原样抛出,向上抛出，直到解决

### 调试
* print
* assert(断言)
  * assert n != 0, 'n is zero!'
  * assert的意思是，表达式n != 0应该是True，否则，根据程序运行的逻辑，后面的代码肯定会出错。
  * assert语句本身就会抛出AssertionError
  * 启动Python解释器时可以用-O参数来关闭assert
* logging
  * 它允许你指定记录信息的级别,另一个好处是通过简单的配置，一条语句可以同时输出到不同的地方，比如console和文件。
* pdb
  * 启动Python的调试器pdb，让程序以单步方式运行，可以随时查看运行状态
  * 以参数-m pdb启动后,输入命令 <code>l</code> 来查看代码,输入命令 <code>n</code> 可以单步执行代码,输入命令 <code>p</code>  变量名来查看变量,输入命令 <code>q</code> 结束调试
* IDE

### 单元测试
