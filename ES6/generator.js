/*
 * @Author: xcq
 * @Date: 2020-01-08 22:13:43
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-24 19:44:51
 * @FilePath: \学习Code\ES6\generator.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */




/* 
function* dataConsumer() {
    console.log('Started');
    console.log(`1. ${yield}`);
    console.log(`2. ${yield}`);
    return 'result';
}

let genObj = dataConsumer();
genObj.next();
// Started
console.log(genObj.next('a'))
// 1. a
console.log(genObj.next('b'))
// 2. b
 */

/* 
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }
  
var hw = helloWorldGenerator();
for(let a of hw){
    console.log(a)
}

let g = function* gen() {
    yield*["a", "b", "c"];
    yield 1
}
for(let i of g()){
    console.log(i)//循环输出:a,b,c,1
}
console.log(...g())
console.log(g().next()) // { value:"a", done:false }
 */

async function f() {
    try {
        await Promise.reject('出错了');
    } catch(e) {
    }

    return await Promise.resolve('hello world');
  }
  
  f()
  .then(v => console.log(v))

/* 
function* foo(x) {
    var y = 2 * (yield(x + 1));
    var z = yield(y / 3);
    return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
console.log(a.next()) // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }----------解析：第一次传值无效,该参数就会被当作上一个yield表达式的返回值
b.next(12) // { value:8, done:false }--------解析：yield(x+1)=12;   y=2*12=24;  
b.next(13) // { value:42, done:true }--------解析：yield(y / 3) = 13； z=13; x+y+z=5+24+13=42
 */