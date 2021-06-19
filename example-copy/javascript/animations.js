/**
 * 动画的函数
 * @param {Object} dom 当前的对象
 * @param {Object} attrObj 当前元素需要改变的属性
 * @param {funciton} callback 动画完成后执行的函数
 */
 function startAnimation(dom, attrObj, callback) {
    // 针对于多物体运动,定时器的返回值要绑定当前的对象中.
    clearInterval(dom.timer);
    dom.timer = setInterval(function () {
      var cur = null,
        speed = null;
      var flag = true; //标杆 如果true，证明所有的属性都到达终点值(完成)
      for (var attr in attrObj) {
        // 获取样式属性
        // 透明度变化处理
        switch (attr) {
          case "opacity":
            cur = Math.round(parseFloat(getStyle(dom, attr)) * 100);
            break;
          case "scrollTop":
            cur = dom[attr];
            break;
          default:
            cur = parseInt(getStyle(dom, attr));
            break;
        }
        // 1.求速度
        speed = (attrObj[attr] - cur) / 10;
        speed = attrObj[attr] > cur ? Math.ceil(speed) : Math.floor(speed);
        // 2.临界处理
        if (attrObj[attr] !== cur) {
          flag = false;
        }
        // 3.运动起来
        switch (attr) {
          case "opacity":
            dom.style[attr] = `alpha(opacity: ${cur + speed})`;
            dom.style[attr] = (cur + speed) / 100;
            break;
          case "scrollTop":
            dom.scrollTop = cur + speed;
          default:
            dom.style[attr] = cur + speed + "px";
            break;
        }
      }
      // 动画完成后清理定时器，处理回掉函数
      if (flag) {
        clearInterval(dom.timer);
        if (fn) {
          typeof callback == "function" && callback();
        }
        return;
      }
    }, 30);
  }
  /**
   * 获取元素属性的函数
   * @param {domect} dom 当前元素对象
   * @param {domect} attr 当前元素对象的属性
   */
  function getStyle(dom, attr) {
    if (dom.currentStyle) {
      // 兼容ie
      return dom.currentStyle[attr];
    } else {
      // 兼容主流浏览器
      return getComputedStyle(dom, null)[attr];
    }
  }
  