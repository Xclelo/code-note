/*
 * @Author: xcq
 * @Date: 2020-03-16 19:41:55
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-16 20:06:21
 * @FilePath: \学习Code\数据结构与算法\JS算法代码实现\集合_set.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */

/* 与ES6中Set数据一样，不可存重复属性（key）的对象 */
class MySet{
    constructor(){
        this.items = {}
    }

    add(value){
        if(this.has(value)){
            return false
        }
        this.items[value] = value;
        return true
    }

    has(value){
        return this.items.hasOwnProperty(value)
    }

    remove(value){
        if(!this.has(value)){
            return false;
        }
        delete this.items[value]
        return true
    }

    clear(){
        this.items = {}
    }

    size(){
        return Object.keys(this.items).length
    }

    values(){
        return Object.keys(this.items)
    }

    /* 交集 */
    intersection(){

    }

    /* 并集 */
    union(otherSet){
        let unionSet = new MySet();
        for(let i = 0;i<this.size();i++){
            unionSet.add(this.values()[i])
        }

        for(let i = 0;i<otherSet.size();i++){
            unionSet.add(otherSet.values()[i])
        }
    }

}
