/*
 * @Author: xcq
 * @Date: 2020-03-21 20:50:42
 * @LastEditors: xcq
 * @LastEditTime: 2020-03-22 00:46:47
 * @FilePath: \学习Code\数据结构与算法\JS算法代码实现\排序-快速排序.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */

/* 冒泡排序 */
var arr = [2, 5, 4, 1, 7, 3, 8, 6, 9, 0];
// var arr = [66,88,12,87,100,5,566,23]
// var arr = [3,3,-5,6,0,2,-1,-1,3];
// var arr = [3,1,2,5,4 ,6 ,9,7,10,8]


function arrayMax(arr) {
    var temp = null;
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) { //如果前面的数据比后面的大就交换  两个数交换一定要声明一个变量,用来存储其中要被赋值的那个
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }

        }
    }
    return arr;
}

// console.log(arrayMax(arr));


/* 快速排序 
思想：快速排序思想：先找到一个基准点（一般指数组的中部），然后数组被该基准点分为两部分，依次与该基准点数据比较，如果比它小，放左边；反之，放右边。
左右分别用一个空数组去存储比较后的数据。最后递归执行上述操作，直到数组长度<=1;

参考网址：https://segmentfault.com/a/1190000017814119

*/

//--------------------方法一--------------------
var times = 0;

function queryArrayMax(arr) {
    //如果数组长度小于等于1无需判断直接返回即可
    if (arr.length <= 1) {
        return arr;
    }
    var arrIndex = Math.floor(arr.length / 2); //获取中间值 这个是索引
    var arrCenterVal = arr.splice(arrIndex, 1); // 利用索引取出中间值  改变原始数组
    var left = [], //存储小的
        right = []; //存储大的
    // 遍历数组 ,进行判断分配
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < arrCenterVal) {
            left.push(arr[i]) //比中间值小的放在左边数组
        } else {
            right.push(arr[i]) //比中间值大的放在右边数组
        }
        // console.log("第" + (++times) + "次排序后：" + arr);
    }
    //递归执行以上操作,对左右两个数组进行操作，直到数组长度为<=1；
    return queryArrayMax(left).concat(arrCenterVal, queryArrayMax(right))

}
// console.log(queryArrayMax(arr));



//--------------------方法二--------------------
function quick_sort(arr, left, right) {
    var i = left; //哨兵左
    var j = right; //哨兵右
    var key = arr[left]; //标准值

    if (left >= right) { //如果数组只有一个元素
        return;
    }
    while (i < j) {
        while (arr[j] > key && i < j) { //从右边向左找第一个比key小的数，找到或者两个哨兵相碰，跳出循环
            j--;
        }
        while (arr[i] <= key && i < j) { //从左边向右找第一个比key大的数，找到或者两个哨兵相碰，跳出循环,这里的=号保证在本轮循环结束前，key的位置不变，否则的话跳出循环，交换i和from的位置的时候，from位置的上元素有可能不是key
            i++;
        }
        /**
          代码执行道这里，1、两个哨兵到找到了目标值。2、j哨兵找到了目标值。3、两个哨兵都没找到(key是当前数组最小值)
        **/
        if (i < j) { //交换两个元素的位置
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    arr[left] = arr[i] //把arr[left]设置为比标准值小的值
    arr[i] = key; //把arr[i]设置为标准值，递归
    quick_sort(arr, left, i - 1);
    quick_sort(arr, i + 1, right);
}
/* 
console.log(arr);
quick_sort(arr,0,arr.length-1);
console.log(arr);
 */



//--------------------方法三--------------------
function quick_sort_3(arr, l, r) {
    if (l < r) {
        let i = l,
            j = r,
            x = arr[l];
        while (i < j) {
            while (i < j && arr[j] >= x) // 从右向左找第一个小于x的数
                j--;
            if (i < j)
                arr[i++] = arr[j];

            while (i < j && arr[i] < x) // 从左向右找第一个大于等于x的数
                i++;
            if (i < j)
                arr[j--] = arr[i];
        }
        arr[i] = x;
        quick_sort_3(arr, l, i - 1); // 递归调用 
        quick_sort_3(arr, i + 1, r);
    }
}

quick_sort_3(arr, 0, arr.length - 1)
// console.log(arr)

//压力测试
/* 
let myarr = []
for(let i = 0;i<100000;i++){
    myarr.push(Math.round(Math.random() * i))
}
console.time()
// quick_sort(myarr,0,myarr.length-1)//25ms
// quick_sort_3(myarr,0,myarr.length-1)//25ms
// console.log(queryArrayMax(myarr));//400-500ms

console.timeEnd()
 */

function sort(arr, l, r) {
    if (l < r) {
        let i = l,
            j = r,
            x = arr[l];
        while (i < j) {
            while (i < j && arr[j] >= x)
                j--
            if (i < j) {
                arr[i] = arr[j]
                i++
            }
            while (i < j && arr[i] < x)
                x++
            if (i < j) {
                arr[j] = arr[i]
                j--
            }
        }

        arr[i] = x
        sort(arr, l, i - 1)
        sort(arr, i + 1, l)
    }
}
sort(arr, 0, arr.length - 1)
// console.log(arr)