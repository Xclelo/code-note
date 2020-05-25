/*
题目：
链式求和函数
sum(1, 2).value() // 3
sum(1, 2)(3, 4).value() // 10
sum(1)(2)(3)(4).value() // 10
*/

var Obj = {
    a: 1,
    func: function(){
        this.a += 1;
        return this
    }
}
Obj.func().func();
// console.log(Obj.a);    //3

//简单版本
function add (num) {
    var count = num;
    var _b = function(l){
        count += l;
        return _b
    }
    _b.valueOf = function(){
        return count
    }
    return _b
}
var c = add(1)(2)(3);
console.log(c)    //6


//解题
function add () {
    var count = 0;
    for(let i of arguments){
        count += i;
    }
    var _b = function(l){
        for(let i of arguments){
            count += i;
        }
        return _b
    }
    _b.valueOf = function(){
        return count
    }
    return _b
}
var c = add(1,2)(3,4);
console.log(c.valueOf())    //10


