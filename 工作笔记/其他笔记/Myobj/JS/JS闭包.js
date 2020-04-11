function createCounter(){
	let counter=0;
	const myFunction=function(){
		counter=counter+1;
		return counter;
	}
	return myFunction;
}
const increment =createCounter();
const c1=increment();
const c2=increment();
const c3=increment();

console.log('example increment',c1,c2,c3);//1,2,3

/*闭包的工作原理：
当声明一个函数时，它包含一个函数定义和一个闭包。闭包是函数创建时声明的变量的集合。

在全局范围中创建的函数也会创建一个闭包。但由于这些函数是在全局范围内创建的，因此他们可以访问全局范围内的所有变量，这就无所谓闭包不闭包了

当一个函数返回另一个函数时，才会真正的涉及闭包。返回的函数可以访问仅存在其闭包的变量。

*/


let c=4;
function add(x){
	return function(n){
		return n+x;
	}
}
const addThre=add(3);
let d=addThre(c);
console.log(d);//7