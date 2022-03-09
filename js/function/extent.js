function people(name,age) {
    this.name = name
    this.age = age
}
people.prototype.say = function() {
    console.log(this.name,this.age)
}

let p = new people('tom',30)
p.say()

// 快排 [left] + min + [right]
function quickArr(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var left = [],
        right = [];
    var pIndex = Math.floor(arr.length / 2);
    var p = arr.splice(pIndex, 1)[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] <= p) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    // 递归
    return quickArr(left).concat([p], quickArr(right));
}

//reduce
Array.prototype.myReduce = function (func, initialValue) {
    var len = this.length,
        nextValue,
        i;
    if (!initialValue) {
        // 没有传第二个参数
        nextValue = this[0];
        i = 1;
    } else {
        // 传了第二个参数
        nextValue = initialValue;
        i = 0;
    }
    for (; i < len; i++) {
        nextValue = func(nextValue, this[i], i, this);
    }
    return nextValue;
}

//filter
Array.prototype.myFilter = function (func) {
    var len = this.length;
    var arr = [];
    var _this = arguments[1] || window;
    for (var i = 0; i < len; i++) {
        func.call(_this, this[i], i, this) && arr.push(this[i]);
    }
    return arr;
}
//bind
Function.prototype.myBind = function (target) {
    var target = target || window;
    var _args1 = [].slice.call(arguments, 1);
    var self = this;
    var temp = function () {};
    var F = function () {
        var _args2 = [].slice.call(arguments, 0);
        var parasArr = _args1.concat(_args2);
        return self.apply(this instanceof temp ? this : target, parasArr)
    }
    temp.prototype = self.prototype;
    F.prototype = new temp();
    return F;
}

// bind 函数的实现步骤：
// 1.判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。

// 2.保存当前函数的引用，获取其余传入参数值。

// 3.创建一个函数返回

// 4.函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。

//call

Function.prototype.myCall = function () {
    var ctx = arguments[0] || window;
    ctx.fn = this;
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
    }
    var result = ctx.fn(...args);
    delete ctx.fn;
    return result;
}

// call 函数的实现步骤：
// 1.判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。

// 2.判断传入上下文对象是否存在，如果不存在，则设置为 window 。

// 3.处理传入的参数，截取第一个参数后的所有参数。

// 4.将函数作为上下文对象的一个属性。

// 5.使用上下文对象来调用这个方法，并保存返回结果。

// 6.删除刚才新增的属性。

// 7.返回结果。

//apply

Function.prototype.myApply = function () {
    var ctx = arguments[0] || window;
    ctx.fn = this;
    if (!arguments[1]) {
        var result = ctx.fn();
        delete ctx.fn;
        return result;
    }
    var result = ctx.fn(...arguments[1]);
    delete ctx.fn;
    return result;
}

// apply 函数的实现步骤：
// 1.判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。

// 2.判断传入上下文对象是否存在，如果不存在，则设置为 window 。

// 3.将函数作为上下文对象的一个属性。

// 4.判断参数值是否传入

// 4.使用上下文对象来调用这个方法，并保存返回结果。

// 5.删除刚才新增的属性

// 6.返回结果

//防抖
function debounce(handle, delay) {
    var timer = null;
    return function () {
        var _self = this,
            _args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            handle.apply(_self, _args)
        }, delay)
    }
}
//节流
function throttle(handler, wait) {
    var lastTime = 0;
    return function (e) {
        var nowTime = new Date().getTime();
        if (nowTime - lastTime > wait) {
            handler.apply(this, arguments);
            lastTime = nowTime;
        }
    }
}

//精度丢失
// 当计算机计算 0.1+0.2 的时候，实际上计算的是这两个数字在计算机里所存储的二进制，0.1 和 0.2 在转换为二进制表示的时候会出现位数无限循环的情况。
// js 中是以 64 位双精度格式来存储数字的，只有 53 位的有效数字，超过这个长度的位数会被截取掉这样就造成了精度丢失的问题。这是第一个会造成精度丢失的地方。
// 在对两个以 64 位双精度格式的数据进行计算的时候，首先会进行对阶的处理，对阶指的是将阶码对齐，也就是将小数点的位置对齐后，再进行计算，一般是小阶向大阶对齐，
// 因此小阶的数在对齐的过程中，有效数字会向右移动，移动后超过有效位数的位会被截取掉，这是第二个可能会出现精度丢失的地方。
// 当两个数据阶码对齐后，进行相加运算后，得到的结果可能会超过 53 位有效数字，因此超过的位数也会被截取掉，这是可能发生精度丢失的第三个地方。

// 对于这样的情况，我们可以将其转换为整数后再进行运算，运算后再转换为对应的小数，以这种方式来解决这个问题。

// 我们还可以将两个数相加的结果和右边相减，如果相减的结果小于一个极小数，那么我们就可以认定结果是相等的，这个极小数可以
// 使用 es6 的 Number.EPSILON

//curry 
//柯里化就是把一个可能要使用多个参数的函数变成一系列只是用一个参数的函数
//所以柯里化要返回一个收集参数的函数或者收集完以后就可以直接执行了
curry = function(fn) {
    let args = [] //要收集的参数
    return function innner(...params) {
        if(params.length == 0) {
            return fn(...args)
        }else {
            args.push(...params)
            return innner
        }
    }
}
add = (...args)=> args.reduce((pre,cur)=>
        cur+pre)

sum = curry(add)

let showArgs = curry((...param)=>{console.log(param)})
let pram = (...param)=>{console.log(param)}

function curr(fn, length) {

    console.log(fn.length)

}

