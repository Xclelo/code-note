/**
 * 高阶函数是指至少满足下列条件之一的函数：
 * 1.函数可以作为参数被传递（回调函数）
 * 2.函数可以作为返回值输出
 * 
 *  */

//知识点一
/* Function.prototype.before = function (beforefn) {
    var _self = this
    return function () {
        beforefn.apply(this, arguments)
        return _self.apply(this, arguments)
    }
}

Function.prototype.after = function (afterfn) {
    var _self = this
    return function () {
        var ret = _self.apply(this, arguments)
        afterfn.apply(this, arguments)
        return ret
    }
}

var func = function () {
    console.log(2)
}

func = func.before(function () {
    console.log(1)
}).after(function () {
    console.log(3)
})

func() */



















//知识点二
//函数多个小括号连续调用:fun(1)(2)(3)

//函数柯里化的表现形式，柯里化又称部分求值，一个柯里化的函数首先会接受一些传参，接受了这些传参之后，函数并不会立即求值，
//而是继续返回另外一个函数，刚才传入的参数在函数内形成的闭包中被保存起来，到参数被真正求值的时候，之前传入的参数会被一次性用于求值。

//例子1
function func(str) {
    var f = function (s) {
        return str + ", " + s;
    }
    return f;
}
var str = func("antzone")("softwhy");
console.log(str);

//例子2
function func(str) {
    var ret = Array.prototype.slice.call(arguments).join(', ');
    var temp = function (str) {
        ret = [ret, Array.prototype.slice.call(arguments).join(', ')].join(', ');
        return temp;
    };
    temp.toString = function () {
        return ret;
    };
    return temp;
}
var tempFunc = func("antzone")("softwhy")("com");
console.log(tempFunc.toString());






















//知识点三
//返回函数中作用域的问题   参考文档：https://blog.csdn.net/u011113654/article/details/51672308#
/* 
var add = function (x) {
    var sum = 1;
    var tmp = function (x) {
        sum = sum + x;
        return tmp;
    }
    tmp.toString = function () {
        return sum;
    }
    return tmp;
}

console.log(add(1)(2)(3))//6 */



var add = function (x) {
    var sum = 1;
    var tmp = function (x) {
        sum = sum + x;
        console.log(`1:` + tmp)
        return tmp;
    }
    tmp.toString = function () {
        console.log(`2:` + sum)
        return sum;
    }
    console.log(`3:` + tmp)
    return tmp;
}
add(1)(2)(3)
// console.log(add(1)(2)(3))


/* 
function create1(pro) {
    console.log("pro : " + pro);
    return function (obj1, obj2) {
        console.log(obj1 + " -- " + obj2);
        return obj1 + obj2;
    }
}

var c1 = create1(`pro`);
c1(`a`,`b`) */


/* function infun(obj1, obj2) {
    console.log(obj1 + " -- " + obj2);
    return obj1 + obj2;
}

function create2(pro) {
    console.log("pro = " + pro);
    var obj1 = 1,
        obj2 = 2;
    return infun(obj1, obj2);
}
var c1 = create2("pro"); */