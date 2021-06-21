### 函数式编程初探（函数进阶）

#### 柯里化

- 概念：将一个多参数的函数转为单个参数的函数，将n元函数转化为n个一元函数

```javascript
function curry(fn , len){
	var len = len || fn.length;
    var func = function(fn){
		var _arg = [].slice.call(arguments,1);
        retturn function(){
            var newArgs = _args.concat([],slice.call(arguments));
            return fn.apply(this,newArgs);
        }
    }
    
    return function(){
        var argLen = arguments.length;
        if(argLen < len){
			var formatedArr = [fn].concat([].slice.call(arguments));
            return curry(func.apply(this,formatedArr),len - argLen);
        }else{
            return fn.apply(this,arguments);
        }
    }
}
```

#### 偏函数

- 概念：偏函数应用是固定一个函数的一个或多个参数，并返回一个可以接收剩余参数的函数

```javascript
FUnction.prototype.partial = function (){
    var _self = this,
        _args = [].slice.call(arguments);
    return function(){
        var newArgs = _args.concat([].slice.call(arguments));
        return _self.apply(null,newArgs);
    }
}


// es6
function partial(fn,...rest) {
    return function(...rest2){
        return fn.apply(this, ...rest.concat(rest2));
    }
}
```

#### 组合函数 

- 概念：将多个函数组合成一个函数（自右向左执行）

```javascript
function compose(){
	var args = Array.prototype.slice.call(arguments),
        len = args.length - 1;
    return function(x){
		var res = args[len](x);
        while(len--){
            res = args[len](res);          
        }
    }
}

// es6 
function compose(...funcs) {
  return function (x) {
    return funcs.reduceRight(function (arg, fn) {
      return fn(arg);
    }, x);
  };
}

function compose(...funcs) {
    if (funcs.length === 0) {
        return args => args; //如果没有要组合的函数，则返回的函数原封不动的返回参数
    }
    else if (funcs.length === 1) {
        //要组合的函数只有一个
        return funcs[0];
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

#### 惰性函数

- 概念：最初函数只执行一次（函数内部重写该函数）

```javascript
const addHandler = (function () {
  if (document.addEventListener) {
    return function (element, type, handler) {
      element.addEventListener(type, handler, false);
    };
  } else if (document.attachEvent) {
    return function (element, type, handler) {
      element.attachEvent("on" + type, handler);
    };
  } else {
    return function (element, type, handler) {
      element["on" + type] = handler;
    };
  }
})();
```

#### 缓存函数

- 概念：缓存函数是将函数的计算结果缓存起来，当下次以同样的参数调用该函数时，直接返回已缓存的结果，而无需再次执行函数。这是一种常见的以空间换时间的性能优化手段。

### DOM类

#### 节流 （throttle)

* 作用：在一段时间内无论点击几次只触发一次(类似公交车上

* 作用：在一段时间内无论点击几次只触发一次(类似公交车上车，乘客需要排队，一段时间内只能上一位乘客，总不能一次性全冲，节流是吧！)
* 场景：
  * 窗口调整（resize）
  * 页面滚动（scroll）

```javascript
// 方法1
function throttle(handle,wait){
    let lastTime = 0;
    return function(...args){
        let nowTime = new Date().getTime();
        if(nowTime - lastTime > wait){
            handle.apply(this,...args);
            lastTime = nowTime;
        }
    }
}
// 方法2
function throttle(handle,wait){
    let timer = null;
    return function(...args){
    if(timer) return
    timer = setTimeout(()=>{
          handle.apply(this,...args);
          clearTimeout(timer);
      },wait)
  }
}
```

#### 防抖(debounce)

* 作用：当函数需要频繁操作是，只在有空闲时间时执行(类似公交车上车，当乘客全部上车才会执行关门操作，避免多次关门是吧！)
* 场景：
  * 实时搜索（keyup）
  * 拖拽（mousemove）

```javascript
function debounce(handle, dalay) {
    let timer = null;
    return function() {
        let _self= this, _args= arguments;
        clearTimeout(timer);
        time = setTimeout(()=>{
            handle.apply(this, _args)
        },dalay)
    }
}
```

### 工具类

#### 随机数

```javascript
function rand (min,max ){
	return Math.random()  * (max - min ) + min;
}
```

#### 数组乱序

```javascript
function shuffle (arr) {
  const _arr = arr.slice()
  let i = _arr.length
  while (i) {
    const j = Math.floor(Math.random() * i--);
    [_arr[j], _arr[i]] = [_arr[i], _arr[j]]
  }
  return _arr
}
```

#### 深冻结

```javascript
// 深冻结函数.
function deepFreeze(obj) {

  // 取回定义在obj上的属性名
  var propNames = Object.getOwnPropertyNames(obj);

  // 在冻结自身之前冻结属性
  propNames.forEach(function(name) {
    var prop = obj[name];

    // 如果prop是个对象，冻结它
    if (typeof prop == 'object' && prop !== null)
      deepFreeze(prop);
  });

  // 冻结自身(no-op if already frozen)
  return Object.freeze(obj);
}

obj2 = {
  internal: {}
};

deepFreeze(obj2);
obj2.internal.a = 'anotherValue';
obj2.internal.a; // undefined
```



### 设计模式类

#### 发布订阅

- 发布订阅模式由一个**调度中心**调度。
- 订阅者把事件注册到调度中心，当事件触发时，由调度中心统一调度并执行对应一系列事件

```javascript
class EventEmitter {
    constructor() {
        this.subs = Object.create(null)
    }
    $on(eventName, handle) {
        // 如果有这个属性就使用，如果没有就创建
        this.subs[eventName] = this.subs[eventName] || []
        this.subs[eventName].push(handle)

    }
    $emit(eventName) {
        if (this.subs[eventName]) {
            this.subs[eventName].forEach(fn => {
                fn()
            })
        }
    }
}
let em = new EventEmitter()
em.$on('click', () => {
    console.log('click1')
})
em.$on('click', () => {
    console.log('click2')
})

em.$emit('click')
```

#### 观察者

- 观察者模式由具体目标调度
- 一个对象dep维持一系列依赖于他的对象watcher，有关状态变更时会通知这些依赖于他的对象进行变更。

```javascript
// 订阅器
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub){
        //
        if(sub&&sub.update){
            this.subs.push(sub)
        }
    }
    notify(){
        this.subs.forEach(sub=>{
            sub.update()
        })
    }
}

//订阅者
class Watcher{
    update(){
        console.log('update')
    }
}

let dep = new Dep()

let watcher1 = new Watcher
let watcher2 = new Watcher

dep.addSub(watcher)
dep.addSub(watcher2)

dep.notify()
```

