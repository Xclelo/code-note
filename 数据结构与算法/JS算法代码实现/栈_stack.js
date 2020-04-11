/*
 * @Author: xcq
 * @Date: 2020-03-12 21:27:12
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-12 22:29:40
 * @FilePath: \学习Code\数据结构与算法\JS算法代码实现\stack.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */

/* 用数组实现栈   后进先出  last in first out(LIFO)
函数调用的压栈 例子: 函数A调用了函数B,函数B调用了函数C,函数C调用了函数D,则必须D先执行完，C再执行完，再B,A,所以递归操作就容易造成栈溢出
*/
class Stack{
    constructor(){
        this.item = [];
    }

    push(e){
        this.item.push(e);
    }

    pop(){
        return this.item.pop();
    }

    /* 获取栈顶 */
    peek(){
        return this.item[0]
    }

    isEmpty(){
        return this.item.length == 0;
    }

    size(){
        return this.item.length;
    }

    toString(){
        let str = ''
        this.item.forEach(function(e){
            str += e + ' '
        })
        return str
    }

}

let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

console.log(stack.pop())

console.log(stack.toString())


