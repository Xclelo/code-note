/*
 * @Author: xcq
 * @Date: 2020-03-16 20:42:01
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-18 21:52:49
 * @FilePath: \学习Code\数据结构与算法\JS算法代码实现\哈希表_hash.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */

 //哈希理论参考网址：https://www.jianshu.com/p/6e88d63061f2

/*
哈希表的优势：
哈希表通常是基于数组实现的；
1.可以提供非常快速的插入-删除-查找操作
2.时间复杂度O(1)
3.哈希表速度比树还要快，基本可以瞬间查到想要的元素
4.哈希编码比树容易很多

不足：
1.哈希表数据是没有顺序的
2.key不能重复
*/

/*
概念：
哈希化：将大数字转化成数组范围内下标的过程（例如：取余操作）
哈希函数：将单词转成大数字，大数字再进行哈希化的代码实现存放的函数
哈希表：最终将数据插入到这个数组，对整个结构的封装，我们称之为是一个哈希表

在哈希化过程中会产生冲突，解决方案是（面试常问的问题） 1.链地址法 2.开发地址法

1.链地址法/拉链法:
就是将每个小标值的位置保存一个数组或者一个链表，[[a,a1],[b],[c]]  例如a,a1就是冲突的元素
2.开放地址法：
寻找空白的单元格来添加重复的元素：
有三种探索空白单元的方法：1.线性探测（步长为1）2.二次探测（steSize=x+1,x+2*2,x+3*3） 3.再哈希法（哈希函数公式：stepSize=质数-(key%质数)） key:关键字的大小
*/






class HashTable{
    constructor(){
        this.storage = []
        this.count = 0
        this.limit = 7
    }

    /*
    ********设计哈希函数**********
    1.将字符串转成较大的数字：hashCode
    2.将hashCode压缩到数组（范围大小）内
    */
    hashFun(str,size){
        let hashCode = 0;

        /* 1.将数变大 */
        for(let i=0;i<str.length;i++){
            hashCode = 37 * hashCode + str.charCodeAt(i)
        }
        /* 2.取余,将数字变小 */
        let index = hashCode % size

        return index
    }

    /* 插入&修改操作 */
    put(key, value){
        let index = this.hashFun(key, this.limit)

        let bucket = this.storage[index]
        
        //没有就新增
        if(bucket == null){
            bucket = []
            this.storage[index] = bucket
        }

        //修改数据
        for(let i = 0; i < bucket.length; i++){
            let tuple = bucket[i]
            if(tuple[0] == key){
                tuple[1] = value
                return
            }
        }

        //添加操作
        bucket.push([key,value])
        this.count++

        /* 判断是否需要扩容操作 */
        if(this.count > this.limit * 0.75){
            this.resize(this.getPrime(this.limit * 2))
        }


    }

    /* 获取操作 */
    get(key){
        let index = this.hashFun(key,this.limit)

        let bucket = this.storage[index]

        if(bucket == null){
            return null
        }

        for(let i = 0; i < bucket.length; i++){
            let tuple = bucket[i]
            if(tuple[0] == key){
                return tuple[1]
            }
        }

        return null
    }


    /* 删除操作 */
    remove(key){
        let index = this.hashFun(key,this.limit)

        let bucket = this.storage[index]

        if(bucket == null){
            return null
        }

        for(let i = 0; i < bucket.length; i++){
            let tuple = bucket[i]
            if(tuple[0] == key){
                bucket.splice(i,1)
                this.count--

                /* 判断是否需要缩小容量操作 */
                if(this.limit > 7 && this.count < this.limit * 0.25){
                    let newSiez = Math.floor(this.limit / 2)
                    this.resize(this.getPrime(newSiez))
                }

                return tuple[1]
            }
        }

        return null
    }

    /*
        扩容操作
    */
    resize(newLimit){
        let oldStorage = this.storage

        this.storage = []
        this.limit = newLimit
        this.count = 0

        for(let i=0;i<oldStorage.length;i++){
            let bucket = oldStorage[i]
            
            if(bucket == null){
                continue
            }

            let that = this
            bucket.forEach((tuple)=>{
                that.put(tuple[0],tuple[1])
            })
        }

    }

    /* 判断质数 */
    isPrime( num ){
        let temp = parseInt(Math.sqrt(num))
        for(let i = 2; i < temp; i++){
            if(num % i){
                return false
            }
        }
        return true
    }

    /* 获取质数 */
    getPrime(num){
        while(!this.isPrime(num)){
            num++
        }
        return num
    }
    
}


let hashTable = new HashTable()

hashTable.put('haha',15)
hashTable.put('kang',88)
hashTable.put('mike',520)
hashTable.put('enheng',93)

console.log(hashTable.storage)

console.log(hashTable.hashFun('haha',7))
console.log(hashTable.hashFun('kang',7))
console.log(hashTable.hashFun('mike',7))
console.log(hashTable.hashFun('enheng',7))







