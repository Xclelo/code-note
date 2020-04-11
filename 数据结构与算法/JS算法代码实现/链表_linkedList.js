/*
 * @Author: xcq
 * @Date: 2020-03-13 21:06:33
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-14 15:01:49
 * @FilePath: \学习Code\数据结构与算法\JS算法代码实现\链表_linkedList.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */
class LinkedList{
    constructor(){
        this.head = null;
        this.length = 0;

        this.Node = class{
            constructor(data){
                this.data = data;
                this.next = null;
            }
        }

    }

    /* 链表追加 */
    append(data){
        let newData = new this.Node(data);
        if(this.length == 0){
            this.head = newData;
        }else{
            let currNode = this.head;
            while(currNode.next){
                currNode = currNode.next;
            }
            currNode.next = newData;
        }
        this.length++
    }

    toString(){
        let current = this.head
        let str = ''
        while(current){
            str += current.data + '-'
            current = current.next
        }
        return str
    }

    insert(position,data){
        if(position<0||position>this.length){
            return false
        }
        let newData = new this.Node(data)
        
        if(position == 0){
            /* this.head = newData;
            newData.next = '原来的第一个元素' */

            newData.next = this.head;
            this.head = newData;
        }else{
            let index = 0;
            let current = this.head;
            let previous = null;
            /* 先找到插入位置 */
            while(index++ < position){
                previous = current;
                current = current.next
            }

            /* for(let i=0;i<position;i++){
                previous = current;
                current = current.next
            } */
            newData.next = current;
            previous.next = newData;
        }

        this.length++
        return true
    }

    get(position){
        if(position<0 || position>=this.length) return null
        if(position == 0){
            return this.head;
        }else{
            let current = this.head;
            /* for(let i = 0; i < position; i++){
                current = current.next;
            } */
            let index = 0;
            while(index++ < position){
                current = current.next
            }
            return current.data;
        }
        
    }

    indexOf(element){
        let current = this.head;
        let indexRes = -1;
        let index = 0;
        while(index++ < this.length){
            if(element == current.data){
                return indexRes = index - 1;
            }
            current = current.next
        }
        return indexRes
    }

    upDate(position,element){
        if(position < 0 || position >= this.length) return false

        if(position == 0 ){
            this.head.data = element
        }else{
            let current = this.head;
            let index = 0;
            while(index++ < position){
                current = current.next
            }
            current.data = element;
        }
        return true
    }

    removeAt(position){
        if(position < 0 || position >= this.length) return null

        let current = this.head;
        if(position == 0){
            this.head = this.head.next
        }else{
            let index = 0;
            let previous = null
            while(index++ < position){
                previous = current
                current = current.next
            }
            previous.next = current.next
        }

        this.length--
        return current.data
    }

    remove(element){
        let position = this.indexOf(element)

        return this.removeAt(position)
    }

    isEmpty(){
        return this.length = 0
    }

    size(){
        return this.length
    }
}

let link = new LinkedList()

link.append('hi')
link.append('mike')
link.append('woo')

link.insert(2,'en')

link.upDate(2,'update')
console.log(link.toString())
link.remove('hi')
console.log(link.toString())


/* link.removeAt(0)
console.log(link.head.data) */


// console.log(link.get(3))
// console.log(link.indexOf('hii'))


