let obj = {
    a: 100,
    b: [10, 20, 30],
    c: {
        x: 10
    },
    d: /^\d+$/
};

let arr = [10, [100, 200], { x: 10, y: 20 }]


//深拷贝
function deepClone(obj) {
    if (obj === null) return null;
    if (typeof obj !== "object") return obj;
    // if (obj instanceof Function) return new Function(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    let cloneObj = new obj.constructor;//处理传入的是实例的情况
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key])
        }
    }
    return cloneObj;
}

// let obj2 = deepClone(obj)

// console.log(obj,obj2);

// console.log(obj === obj2);


let cloneObj = new obj.constructor;

console.log(obj.constructor);








//声明一个构造函数 构造函数首字母应大写
function Obj(name){
    this.name=name;
    this.fun=function(){
        console.log(this.name);
    }
}
var testObj=new Obj("XXX");
testObj.fun();//弹出"李凯旋"
//通过testObj.constructor来创建一个对象
var testObj2=new testObj.constructor("我是通过testObj指向的构造函数创建的");
testObj2.fun();//弹出"我是通过testObj指向的构造函数创建的"
console.log(testObj.constructor===testObj2.constructor);//弹出true 说明两个对象全等于它们是从一个构造函数上创建的






function fn(){}
fn.prototype.say = function(){}
console.log(fn.prototype);//fn { say: [Function] }
console.log(Obj.prototype);//Obj {}
console.log(testObj.prototype);//undefined






