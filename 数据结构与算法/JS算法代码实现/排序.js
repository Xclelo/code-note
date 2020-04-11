/*
 * @Author: xcq
 * @Date: 2020-03-19 20:07:08
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-21 23:25:48
 * @FilePath: \学习Code\数据结构与算法\JS算法代码实现\排序.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */


/*
 * 简单排序：冒泡排序  --> 选择排序  --> 插入排序
 * 冒泡排序:[比较次数：O(n^2)；交换次数：O(n^2)]
 * 选择排序:[比较次数：O(n^2)；交换次数：O(n)]
 * 插入排序:[相对于选择排序, 其他比较次数是少了一半的]
 * 
 * 
 * 高级排序：希尔排序 --> 快速排序
 * 
 * 
 */
class ArrList {
    constructor() {
        this.array = []
    }

    insert(item) {
        this.array.push(item)
    }

    toString() {
        return this.array.join('-')
    }

    /* 冒泡排序 */
    bubbSort() {
        let length = this.array.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < i; j++) {
                if (this.array[i] < this.array[j]) {
                    let temp = this.array[j]
                    this.array[j] = this.array[i]
                    this.array[i] = temp
                }
            }
        }
    }

    /* 选择排序 选择最小的放在前面*/
    selectionSort() {
        let length = this.array.length;
        for (let i = 0; i < length; i++) {
            let min = i
            for (let j = min + 1; j < length; j++) {
                if (this.array[min] > this.array[j]) {
                    min = j
                }
            }

            //把min位置的值与i位置的值交换
            let temp = this.array[min]
            this.array[min] = this.array[i]
            this.array[i] = temp
        }

    }

    /* 插入排序，部分有序 */
    insertionSort() {
        let length = this.array.length;
        for (let i = 1; i < length; i++) {
            let temp = this.array[i]; //保存比较当前值
            let j = i
            while (j > 0 && this.array[j - 1] > temp) { //当前保存的值与前一个比较
                this.array[j] = this.array[j - 1] //如果前一个大 就交换 把小的放在前面 知道循环完i之前的所有数
                j--
            }

            // 将选出的j位置, 放入temp元素
            this.array[j] = temp
            console.log(`----j:${j}---${this.array.toString()}`)

        }
    }

    /* 希尔排序， 利用间隔*/


    /* 快速排序，分而治之-递归 */
    quickSort(arr){
        if (arr.length <= 1) {
            return arr;
        }
        let left = []
        let right = []
        let arrCenterVal = arr.splice(Math.floor(arr.length/2),1)
        for(let i = 0;i<arr.length; i++){
            if(arr[i] < arrCenterVal){
                left.push(arr[i])
            }else{
                right.push(arr[i])
            }
        }
        return this.quickSort(left).concat(arrCenterVal, this.quickSort(right))
    }
    
}

let arr = new ArrList()

arr.insert(18)
arr.insert(5)
arr.insert(8)
arr.insert(7)

// console.log(arr.toString())
// arr.bubbSort()
// arr.selectionSort()
// arr.insertionSort()
// console.log(arr.toString())





// 封装ArrayList
function ArrayList() {
    this.array = []

    ArrayList.prototype.insert = function (item) {
        this.array.push(item)
    }

    ArrayList.prototype.toString = function () {
        return this.array.join()
    }

    ArrayList.prototype.bubbleSort = function () {
        // 1.获取数组的长度
        var length = this.array.length

        // 2.反向循环, 因此次数越来越少
        for (var i = length - 1; i >= 0; i--) {
            // 3.根据i的次数, 比较循环到i位置
            for (var j = 0; j < i; j++) {
                // 4.如果j位置比j+1位置的数据大, 那么就交换
                if (this.array[j] > this.array[j + 1]) {
                    // 交换
                    this.swap(j, j + 1)
                }
            }
        }
    }

    ArrayList.prototype.selectionSort = function () {
        // 1.获取数组的长度
        var length = this.array.length

        // 2.外层循环: 从0位置开始取出数据, 直到length-2位置
        for (var i = 0; i < length - 1; i++) {
            // 3.内层循环: 从i+1位置开始, 和后面的内容比较
            var min = i
            for (var j = min + 1; j < length; j++) {
                // 4.如果i位置的数据大于j位置的数据, 记录最小的位置
                if (this.array[min] > this.array[j]) {
                    min = j
                }
            }
            this.swap(min, i)
        }
    }

    ArrayList.prototype.insertionSort = function () {
        // 1.获取数组的长度
        var length = this.array.length

        // 2.外层循环: 外层循环是从1位置开始, 依次遍历到最后
        for (var i = 1; i < length; i++) {
            // 3.记录选出的元素, 放在变量temp中
            var j = i
            var temp = this.array[i]

            // 4.内层循环: 内层循环不确定循环的次数, 最好使用while循环
            while (j > 0 && this.array[j - 1] > temp) {
                this.array[j] = this.array[j - 1]
                j--
            }

            // 5.将选出的j位置, 放入temp元素
            this.array[j] = temp
        }
    }

    ArrayList.prototype.shellSort = function () {
        // 1.获取数组的长度
        var length = this.array.length

        // 2.根据长度计算增量
        var gap = Math.floor(length / 2)

        // 3.增量不断变量小, 大于0就继续排序
        while (gap > 0) {
            // 4.实现插入排序
            for (var i = gap; i < length; i++) {
                // 4.1.保存临时变量
                var j = i
                var temp = this.array[i]

                // 4.2.插入排序的内存循环
                while (j > gap - 1 && this.array[j - gap] > temp) {
                    this.array[j] = this.array[j - gap]
                    j -= gap
                }

                // 4.3.将选出的j位置设置为temp
                this.array[j] = temp
            }

            // 5.重新计算新的间隔
            gap = Math.floor(gap / 2)
        }
    }

    ArrayList.prototype.swap = function (m, n) {
        var temp = this.array[m]
        this.array[m] = this.array[n]
        this.array[n] = temp
    }

    // 选择枢纽
    ArrayList.prototype.median = function (left, right) {
        // 1.求出中间的位置
        var center = Math.floor((left + right) / 2)

        // 2.判断并且进行交换
        if (this.array[left] > this.array[center]) {
            this.swap(left, center)
        }
        if (this.array[center] > this.array[right]) {
            this.swap(center, right)
        }
        /*   if (this.array[left] > this.array[right]) {
              this.swap(left, right)
          } */

        if (this.array[left] > this.array[center]) {
            this.swap(left, center)
        }

        // 3.巧妙的操作: 将center移动到right - 1的位置
        this.swap(center, right - 1)

        // 4.返回pivot
        return this.array[right - 1]
    }
   
    // 快速排序实现
    ArrayList.prototype.quickSort = function () {
        this.quickSortRec(0, this.array.length - 1)
    }

    ArrayList.prototype.quickSortRec = function (left, right) {
        // 0.递归结束条件
        if (left >= right) return

        // 1.获取枢纽
        var pivot = this.median(left, right)
        // var pivot = left
/**
 * 思路整理：
 * 假设现在的数组为[13,4,76,10,12,7,100,23,72]--->这是设置枢纽之后的数组
 * j为23 为枢纽
 * 一直到76>23和7<23时，下标为i和j的值交换 => [13,4,   7  ,10,12,   76  ,100,23,72]
 * 此时i<j 继续循环1，当i到76位置时， 此时i=5 > j=4 ,跳出循环1
 * 下一步是把枢纽放到i的位置上=>[13,4,   7  ,10,12,   23  ,100,76,72]
 * 这样就完成了第一次把下值放到枢纽的前面，大值放到枢纽的后面
 * 然后就递归就行了
*/
        // 2.开始进行交换
        var i = left
        var j = right - 1
        while (i < j) {//
            while (this.array[++i] < pivot) {}//循环2
            while (this.array[--j] > pivot) {}//循环3
            console.log(`${right}=======${i}========${j}======`)
            if (i < j) {
            console.log(`${right}=======${i}========${j}======i<j时交换`)
            this.swap(i, j)
            console.log(this.array)
            } else {
                break
            }
        }

        // 3.将枢纽放在正确的位置
        this.swap(i, right - 1)
        console.log(this.array)

        // 4.递归调用左边
        this.quickSortRec(left, i - 1)
        this.quickSortRec(i + 1, right)
    }
}

let arraylist = new ArrayList()
/* 
arraylist.insert(66)
arraylist.insert(88)
arraylist.insert(12)
arraylist.insert(87)
arraylist.insert(100)
arraylist.insert(5)
arraylist.insert(566)
arraylist.insert(23)
*/
// arraylist.shellSort()//5,12,23,66,87,88,100,566
//13,4,76,10,12,7,100,23,72

arraylist.insert(23)
arraylist.insert(4)
arraylist.insert(76)
arraylist.insert(10)
arraylist.insert(72)
arraylist.insert(7)
arraylist.insert(100)
arraylist.insert(12)
arraylist.insert(13)

arraylist.quickSort()
console.log(arraylist.toString())