/*
 * @Author: xcq
 * @Date: 2020-03-14 14:29:41
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-14 16:14:24
 * @FilePath: \学习Code\数据结构与算法\JS算法代码实现\双向链表_doublyLinkList.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */
class DoublyLinkList{
    constructor(){
        this.head = null;//头
        this.tail = null;//尾
        this.length = 0;

        this.Node = class{
            constructor(data){
                this.data = data;
                this.pre = null;
                this.next = null;
            }
        }
    }

    append(data){
        let newNode = new this.Node(data);
        if(this.length == 0){
            this.head = newNode
            this.tail = newNode
        }else{
            newNode.pre = this.tail;
            this.tail.next = newNode;
            this.tail = newNode
        }

        this.length++
    }

    insert(position,element){
        if(position<0 || position>this.length) return false

        let newNode = new this.Node(element)
        let current = this.head;
        if(this.length == 0){
            this.head = newNode
            this.tail = newNode
        }else{
            if(position == 0){
                this.head.pre = newNode;
                newNode.next = this.head;
                this.head = newNode;
            }else if(position == this.length){
                
            }
        }
        
    }

    toString(){
        let str = ''
        let current = this.head;
        for(let i = 0;i<this.length;i++){
            str += current.data + '-'
            current = current.next
        }
        return str
    }
}

let dblink = new DoublyLinkList()

dblink.append('aaa')
dblink.append('bbb')
dblink.append('ccc')
dblink.append('ddd')

console.log(dblink.toString())