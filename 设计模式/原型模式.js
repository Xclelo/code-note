'use strict'

//使用克隆的原型模式
/**
 * 原型模式是用于创建对象的一种模式==>  通过克隆来创建对象的
 */

//兼容没有Object.create
Object.create = Object.create || function (obj) {
    var F = function () { };
    F.prototype = obj;
    return new F();
}

var Plane = function () {
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
}

var plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;

var coloneplane = Object.create(plane);
console.log(coloneplane.blood)
console.log(coloneplane.attackLevel)
console.log(coloneplane.defenseLevel)

/** 以上是原型模式 */







//扩展  P19页
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
}
var objectFactory = function () {
    var obj = new Object(),
        Constructor = [].shift.call(arguments);
    //Array.prototype.slice.apply(arguments)和[].shift.call(arguments)的使用方法    ==>https://blog.csdn.net/qq_27626333/article/details/51831282
    obj.__proto__ = Constructor.prototype;
    //...

}



//call  apply
window.color = 'red';
var o = { color: 'blue' };
function sayColor() {
    alert(this.color);
}
sayColor();                //red
sayColor.call(this);    //red
sayColor.call(window);    //red
sayColor.call(o);        //blue

//bind()，这个方法会创建一个函数的实例，其this值会被绑定到传给bind()函数的值。例如：
window.color = 'red';
var o = { color: 'blue' };
function sayColor() {
    alert(this.color);
}
var objectSayColor = sayColor.bind(o);
objectSayColor();//blue 



//谁直接调用产生这个this指针的函数，this就指向谁。

var bj = 10;
function add() {
    var bj = 20;
    console.log(this);//window
    console.log(this.bj);//10
    console.log(bj);//20
    console.log(this.bj + bj);//30
}
add();
window.add();




















//constructor 属性返回对创建此对象的数组函数的引用。

function employee(name, job, born) {
    this.name = name;
    this.job = job;
    this.born = born;
}

var bill = new employee("Bill Gates", "Engineer", 1985);
console.log(bill.constructor)
