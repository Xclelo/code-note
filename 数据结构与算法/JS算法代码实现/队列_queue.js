/*
 * @Author: xcq
 * @Date: 2020-03-12 21:58:01
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-12 22:58:48
 * @FilePath: \学习Code\数据结构与算法\JS算法代码实现\queue.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */


/* 队列的实现  先进先出 first in last out(FILO)
例子：线程队列

击鼓传花面试题：传入参数：人数,数字
*/
class Queue{
    constructor(){
        this.item = []
    }

    enqueue(el){
        this.item.push(el);
    }

    dequeue(){
        return this.item.shift();//删除第一个
    }

    front(){
        return this.item[0]
    }

    isEmpty(){
        return this.item.length == 0
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


/* 击鼓传花代码
几个人数数，数到num时淘汰，循环，最终留一个人获胜 */
function passGame(nameList, num){
    let queue = new Queue();
    nameList.forEach(e=>{
        queue.enqueue(e)
    })

    while(queue.size()>1){
        for(let i = 0;i<num-1;i++){
            queue.enqueue(queue.dequeue())//前面没数到的人放到队列最后
        }
        queue.dequeue()//删除队列中的第一个元素，也就是数到num的人
    }

    return queue.front()
}

let nameList = ['a','b','c','d','e']

console.log(passGame(nameList,5))