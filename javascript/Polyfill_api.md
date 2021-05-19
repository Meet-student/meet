## 数组类

### ES5的forEach方法

* 作用：数组调用实现遍历效果
* 参数：
  * 函数
  * this

```javascript
Array.prototype.myForEach = function(handle,this){
var len = this.length;
var _this = arguments[1] || window;
for(var i = 0; i< len; i++){
      handle.apply(_this,[this[i],i,this])
    }
}
```

### ES5的fliter方法

* 作用：数组调用过滤作用,基于遍历,返回一个新数组
* 参数：
  * 函数
  * this

```javascript
Array.prototype.myFliter = function(handle) {
    var arr = [];
    var len = this.length;
    var _this = arguments[1] || window;
    for (var i = 0; i < len; i++) {
        handle.apply(_this, [this[i], i, this]) && arr.push(this[i])
    }
    return arr;
}
```

### ES5的map方法

* 作用：数组调用映射作用,基于遍历,返回一个新数组
* 参数：
  * 函数
  * this

```javascript
Array.prototype.myMap = function(handle) {
    var arr = [];
    var length = this.length;
    var _this = arguments[1] || window;
    for (var i = 0; i < length; i++) {
        arr.push(handle.call(_this, this[i], i, this))
    }
    return arr;
}
```

### ES5的every方法

* 作用：数组调用，判断元素是否全部满足条件，返回Boolean;
* 参数：
  * 函数
  * this

```javascript
Array.prototype.myEvery = function(handle) {
    Var flag = true;
    var length = this.length;
    var _this = arguments[1] || window;
    for (var i = 0; i < length; i++) {
        if(handle.apply(_this, [this[i], i, this]) == false){
            flag = false;
            break;
        }
    }
    return flag;
}
```

### ES5的some方法

* 作用：数组调用，判断元素是否有一个满足条件，返回Boolean;
* 参数：
  * 函数
  * this

```javascript
Array.prototype.mySome = function(handle) {
    Var flag = false;
    var length = this.length;
    var _this = arguments[1] || window;
    for (var i = 0; i < length; i++) {
        if(handle.apply(_this, [this[i], i, this]) == true){
            flag = true;
            break;
        }
    }
    return flag;
}
```

### ES5的reduce方法

* 作用：数组调用,对数组的元素做累加(字符串操作)，返回最终累加值;
* 参数：
  * 函数(累加器上一次执行的返回值,ele,index,self)
  * 初始值
  * this

```javascript
Array.prototype.myEvery = function(handle) {
    Var nextValue = initiaValue;
    var length = this.length;
    var _this = arguments[2] || window;
    for (var i = 0; i < length; i++) {
        nextValue = handle.apply(_this, [nextValue,this[i], i, this]
    }
    return nextValue;
}
```

### ES5的find方法

* 作用：数组调用,查找数组符合条件的元素，返回最终符合条件的数组;
* 参数：
  * 函数
  * this

```javascript
Array.prototype.myEvery = function(handle) {
    var length = this.length;
    var _this = arguments[2] || window;
    for (var i = 0; i < length; i++) {
       if(handle.apply(_this, [this[i], i, this]))return this[i];
    }
}
```



## 对象类

### call

```javascript
Function.prototype.myCall = function (ctx) {
    ctx = ctx ? Object(ctx) : window;
    ctx.originFn = this; 
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push('arguments[' + i + ']');
    }
    var result = eval('ctx.originFn(' + args + ')');
    delete ctx.originFn;
    return result;
  };
```

### apply

```javascript
Function.prototype.myapply = function (ctx,agrs) {
    ctx = ctx ? Object(ctx) : window;
    ctx.originFn = this; 
    var result = ctx.originFn(args);
    delete ctx.originFn;
    return result;
  };
```

### instanceof

```javascript
function instanceOf(target, type) {
    type = type.prototype;
    target = target.__proto__;
    while(target !== null) {
        if(type ===target) {
            return true
        }
        target = target.__proto__;
    }
}
```

## 判断类

### typeOf

```javascript
function typeOf(value) {
    if(value === null) {
        return 'null'
    }
    return typeof(value) === 'object'? {
        "[object Object]" : "Object",
        "[object Array]":'Array',
        "[object Number]":"Number",
        "[object String]": "String",
        "[object Boolean]": "Boolean"
    }[({}).toString().call(value)]: typeof(value)
}
```



