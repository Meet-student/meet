## 字符串

### 20.（简单）有效的括号

#### 栈数据

```javascript
var isValid = function (s) {
  var len = s.length,
    stick = [];
  if (len % 2 === 1) return false;
  for (var i = 0; i < len; i++) {
    if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
      stick.push(s[i]);
    }else{
      if (
        (stick[stick.length - 1] === "[" && s[i] === "]") ||
        (stick[stick.length - 1] === "{" && s[i] === "}") ||
        (stick[stick.length - 1] === "(" && s[i] === ")")
      ) {
        stick.pop();
      }else{
        return false
      }
    }
  }
  return stick.length === 0;
};
```

### 字典



## 数组

### 1.（简单）两数之和

- 暴力枚举2层循环
- target - nus 计算目标寻找的数，返回当前索引和寻找到的索引

#### 暴力解法

```javascript
var twoSum = function(nums, target) {
    for(let i = 0; i < nums.length; i++){
       for(let j = i+1; j < nums.length; j++ ){
         if(nums[i] + nums[j] === target){
             return [i,j]
         }
       }
    }
};
```

#### 求原判断

```javascript
// Map
var twoSum = function(nums, target) {
    var map  = new Map()
    var len = nums.length;
    for (var i = 0 ; i < len;i++){
      var res = target - nums[i]
      if(map.has(res)){
          return [map.get(res),i]
      }else{
        map.set(nums[i],i)
      }
    }
};

// indexOF
var twoSum = function(nums, target) {
    var len = nums.length;
    for (var i = 0 ; i < len;i++){
      var res = target - nums[i]
      if(nums.indexOf(res) !== -1 && nums.indexOf(res) !== i){
          return [i,nums.indexOf(res)]
      }
    }
};
```

### 11.（中等）盛最多水的容器

- 暴力枚举2层循环（遍历全部情况）
- 双指针
  - 左边低，i ++ 往右边
  - 右边低，j -- 往左边
  - 往中间逼近
  - （右 - 左 ） *  高度较小的

```javascript
var maxArea = function(height) {
    var i = 0; // 左指针
    var j = height.length -1; // 右指针
    var max = 0
    while(i < j){
        var cur = (j - i) * (height[i] <  height[j] ? height[i++] : height[j--] )
       if(max < cur) max = cur
    }
    return max
};
```

### 26.（简单）删除排序数组中的重复项

```javascript
var removeDuplicates = function(nums) {
 var len = nums.length,
     i = 0;
    for(var j = 1; j < len; j++){
        if(nums[i] !== nums[j]){
            i++;
            nums[i] = nums[j]
        }
    }
    return i + 1;
};
```

### 66.（简单）加一

```javascript
var plusOne = function(digits) {
  var right = digits.length - 1;
  while(right>=0){
    if(digits[right] !== 9  ){
      digits[right]++
      return digits
    }else{
      digits[right ] = 0
    }
    right--
  }
  digits.unshift(1)
  return digits
}
```

### 283.（简单）移动零

#### 双指针交换

```javascript
var moveZeroes = function (nums) {
  var len = nums.length,
    i = 0,
    j = 0;
  for (i = 0; i < len; i++) {
    if (nums[i] !== 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      j++;
    }
  }
  return nums;
};
```

## 链表

### 206.（简单）反转链表

- 保存当前指针
- 将当前节点指针指向上一个
- 再将当前链表赋值 给上一个
- (将当前节点指针指向上一个，更新当前节点和下一个节点)

```javascript
var reverseList = function(head) {
    var prev = null;
    var curr = head;
    while(curr){
      var next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    return prev
};
```

### 83. （简单）删除排序链表中的重复元素

```javascript
var deleteDuplicates = function(head) {
    var curr = head
    while(curr && curr.next){
       if(curr.val == curr.next.val){
          curr.next = curr.next.next
       }else{
           curr = curr.next
       }
    }
    return head
};
```



