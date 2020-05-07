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
console.log(Obj.a);    //3


function add (num) {
    var count = num;
    var _b = function(l){
        console.log(`arg:`)
        console.log(arguments)
        count += l;
        return _b
    }
    _b.valueOf = function(){
        return count
    }
    return _b
}
var c = add(1)(2,4)(3);
console.log(c.valueOf())    //6


