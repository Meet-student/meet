/**
 * 多场景类型判断
 */
(function (root, factory) {
    // 判断是否使用了模块
    if (typeof define === 'function' && define.amd) {
      // 使用AMD模块
      define(factory);
    } else if (typeof exports === 'object') {
      // 使用CMD模块
      module.exports = factory;
    } else {
      // 没有使用模块，放在全局下
      root.typeof = factory();
    }
  })(this, function () {
    // 严格模式
    'use strict';
    var exports = {};
    // 将字符串转为数组
    var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');
    // 判断类型
    var type = function () {
      return Object.prototype.toString.call(this).slice(8, -1);
    };
    // 遍历types，为exports对象添加isArray、isObject...等方法
    for (var i = types.length; i--;) {
      exports['is' + types[i]] = (function (self) {
        return function (elem) {
          // type.call(elem)将type方法里的this指针指向elem
          return type.call(elem) === self;
        };
      })(types[i]);
    }
    return exports;
  });

  //圣杯模式 继承
function inherit(Target, Origin) {
	function F() {};
	F.prototype = Origin.prototype;
	Target.prototype = new F();
	Target.prototype.constuctor = Target;
	Target.prototype.uber = Origin.prototype;
}

// 对象克隆 深度克隆
function deepClone(origin, target) {
	var target = target || {},
		toStr = Object.prototype.toString,
		arrStr = "[object Array]"
	// 遍历origin 的属性到target目标对象上
	for (var prop in origin) {
		// 不遍历原型链上的属性
		if (origin.hasOwnProperty(prop)) {
			// 如果有值且是对象 则递归遍历
			if (origin[prop] !== "null" && typeof(origin[prop]) == 'object') {
				// 区分是一般对象还是数组 方法1
				target[prop] = toStr.call(origin[prop]) == arrStr ? [] : {}; //三目 判断是否为数组
				// 通过constructor 判断是否是数组  方法2
				// target[prop] = origin[prop].constructor === Array ? [] : {};
				deepClone(origin[prop], target[prop]); //递归
			} else {
				target[prop] = origin[prop];
			}
		}
	}
	return target;
}



//编辑函数，封装children功能，解决以前部分浏览器的兼容性问题!
Element.prototype.myChildren = function() {
	var chlid = this.childNodes;
	var len = child.lenght;
	var arr = [];
	for (var i = 0; i < len; i++) {
		if (child[i].nodeType == 1) {
			arr.push(child[i]);
		}
	}
	return arr;
}

//自己封装hasChildren()方法，不可用children属性
//—————————————————————————————————————————————
//封装函数insertAfter() 功能类似insertBefore();
Element.prototype.insertAfter = function(targeNode, afterNode) {
	var beforeNode = afterNode.nextElementSibling;
	if (beforeNode == null) {
		this.appendChild(targetNode)
	} else {
		this.insertBefore(targetNode, beforeNode);
	}
}

//兼容滚动条，求滚动条滚动距离函数;
function getScrollOffset() {
	if (window.pageXOffset) {
		return {
			x: window.pageXOffset,
			y: window.pageYOffset
		}
	} else {
		return { //IE8及IE8以下版本兼容
			x: document.body.scrollLeft + document.documentElement.scrollLeft,
			y: document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}

// 兼容封装浏览器视口尺寸,返回可视窗口大小;
// 注意: <!DOCTYPE html> ------- 表示标准模式 document.compatMode -->返回CSS1Compat,
// 不添加<!DOCTYPE html> - 表示诡异模式 document.compatMode -->返回BackCompat
function getViewportOffset() {
	if (window.innerWidth) {
		return {
			w: window.innerWidth,
			h: window.innerHeight
		}
	} else {
		if (document.compatMode === "BackCompat") { //判断是否标准模式
			return {
				w: document.body.clientWidth,
				h: document.body.clientHeight
			}
		} else {
			return { //IE8及IE8以下版本兼容
				w: document.documentElement.clientWidth,
				h: document.documentElement.clientHeight
			}
		}
	}
}

//兼容封装获取显示标签实时的CSS属性
function getStyle(elem, prop) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(elem, null). [prop];// null参数为伪类，一般为null
	} else {
		return elem.currentStyle[prop]; //IE独有属性，IE8及IE8以下版本兼容
	}
}


//绑定事件
//Chrome Firefox IE9等     addEventListener 
//IE8及IE8以下的浏览器     attachEvent 
//兼容封装点击事件
function addEvent(elem, type, handle) {
	if (elem.addEventlistener) {
		elem.addEventListener(type, handle, false);
	} else if (elem.attachEvent) {
		elem.attachEvent('on' + type, function() {
			handle.call(elem);
		})
	} else {
		elem['on' + type] = handle;
	}
}
//Chrome Firefox IE9等      
//IE8及IE8以下的浏览器
//兼容封装移除点击事件
function removeEvent(element, type, handler) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else if (element.detachEvent) {
		element.detachEvent("on" + type, handler);
	} else {
		element["on" + type] = handler
	}
}

//点击事件和移除点击事件的兼容对象封装方法
//调用方法： EventUtil.对象方法
var EventUtil = {
	addHandler: function(element, type, handler) {
		//绑定事件
		//Chrome Firefox IE9等     addEventListener 
		//IE8及IE8以下的浏览器     attachEvent 
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler
		}
	},
	removeHandler: function(element, type, handler) {
		//移除事件
		//Chrome Firefox IE9等      
		//IE8及IE8以下的浏览器     
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler
		}
	}
}


//封装阻止默认事件的函数
function cancelHandler(event) {
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
}

//事件对象兼容封装
div.onclick = function(e) {
	var event = e || window.event;
}




/************************************/
/**
 * 周次生成
 * @param {Array} weekList 周
 * @description generateWeekJob([1,2,3,4,5,6,7]) return 周一至周日
 */
 function generateWeekJob(weekList = []) {
    const date = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

    const selectListMap = {};

    weekList.forEach(item=>{
        selectListMap[item-1] = true;
    });

    // 得到列表 再排序
    const selectListTrue = Object.keys(selectListMap).filter(key => selectListMap[key]).map(item => parseInt(item, 10)).sort((a, b) => a - b);

    // 尾部增加一个
    selectListTrue.length && selectListTrue.push(selectListTrue[selectListTrue.length - 1]);
    // console.log(selectListTrue)
    // 结果储存
    const continuouslist = [];
    //  在计算得到 连续天数
    // 单个连续储存
    let itemcontinuous = '';

    selectListTrue.forEach((key, index) => {
        // 如果为空则表示刚开始
        if (!itemcontinuous) {
            itemcontinuous = date[key];
        } else {
            // 判断是否连续
            // 连续就直接进入下一个 
            // 不连续直接赋值
            // console.log(key, selectListTrue[index - 1], index)
            const endlen = index + 1 === selectListTrue.length;

            if (Math.abs(key - selectListTrue[index - 1]) !== 1 || endlen) {
                // 判断是否是最后一个
                const end = endlen ? date[key] : date[selectListTrue[index - 1]];
                continuouslist.push({
                    begin: itemcontinuous,
                    end,
                });
                itemcontinuous = date[key];
            }
        }
    });
    return {
        list: continuouslist,
        week: [...new Set(selectListTrue.map(item => item + 1))],
    }
}

const weekList = generateWeekJob([1,2,4,5,7]);
/*
return 
{
  list: [
    { begin: '周一', end: '周二' },
    { begin: '周四', end: '周五' },
    { begin: '周日', end: '周日' }
  ],
  week: [ 1, 2, 4, 5, 7 ]
}
 */

const showWeek = weekList.list.map(item=>{
    const {begin,end} = item;
    if(begin===end){
        return end;
    }else {
        return [begin,end].join('至');
    }
}).join('、');

/**
 * return 周一至周二、周四至周五、周日
 */