### 适配

#### viewport 缩放适配

```javascript
(function (){
    // 获取css像素
    var curWidth = document.documentElement.clentWidth;
    // var curWidth = window.innerWidth;
    // var curWidth = window.screen.width
    
    // 目标像素 兑换
    var targetWidth = 375;
    var scale = curWidth / targetWidth；
    var view = document.getElementById('view')
    
    view.content = `initial-scale=${scale},user-scalable=no,minimum-scale=${scale}，maximum-scale=${scale}`
})();
```

#### DPR 缩放适配

```javascript
(function (){
    var meta = document.querySelector('meta[name="viewport"]')
    var scale = 1 / window.devicePixelRatio;
    
    if!meta){
		meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = `width=device-width,initial-scale=${scale},user-scalable=no,minimum-scale=${scale}，maximum-scale=${scale}`
    }else{
         meta.content.setAttribute('cotent',`idth=device-width,initial-scale=${scale},user-scalable=no,minimum-scale=${scale}，maximum-scale=${scale}`)
    }
})();
```

