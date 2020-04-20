/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    var numList = [];
    for (var i = 0; i < nums.length; i++) {
        for (var j = 0; j < nums.length; j++) {
            if ((i != j) && (nums[i] + nums[j] == target)) {
                numList.push(i);
                numList.push(j);
                return numList;
            }
        }
    }
};


/**
 * 
 * 输入: s = "abcdefg", k = 2
* 输出: "cdefgab"
* @param {string} s
* @param {number} n
* @return {string}
*/
var reverseLeftWords = function (s, n) {
    if (typeof s != 'string') return
    return s.substring(n, s.length) + s.substring(0, n)
};

let a = reverseLeftWords('lrloseumgh', 6)



function add(a, b) {
    let lenA = a.length,
        lenB = b.length,
        len = lenA > lenB ? lenA : lenB;

    // 先补齐位数一致
    if (lenA > lenB) {
        for (let i = 0; i < lenA - lenB; i++) {
            b = '0' + b;
        }
    } else {
        for (let i = 0; i < lenB - lenA; i++) {
            a = '0' + a;
        }
    }

    let arrA = a.split('').reverse(),
        arrB = b.split('').reverse(),
        arr = [],
        carryAdd = 0;

    for (let i = 0; i < len; i++) {
        let temp = Number(arrA[i]) + Number(arrB[i]) + carryAdd;
        arr[i] = temp > 9 ? temp - 10 : temp;
        carryAdd = temp >= 10 ? 1 : 0;
    }

    if (carryAdd === 1) {
        arr[len] = 1;
    }

    return arr.reverse().join('');

}


function eater(){
    var food="apple";
    var obj={
        eat:function (){
            if(food!=""){
                console.log("i am eating "+ food);
                food="";
            }else{
                console.log("eat emtpy ");
            }
        },
        push:function(myFood){
            food = myFood;
        }
    }
    return obj;
}
// var eat1= eater();
// eat1.eat();
// eat1.eat();
// eat1.push('banana');
// eat1.eat();


function isPrime1( num ){
    let temp = parseInt(Math.sqrt(num))
    for(let i = 2; i <= temp; i++){
        if(num % i == 0){
            console.log(false);
            return false
        }
    }

    console.log(true);
    return true
}


function isPrime(num) {
    // 1.获取平方根
    var temp = parseInt(Math.sqrt(num))

    // 2.循环判断
    for (var i = 2; i <= temp; i++) {
        if (num % i == 0) {
            return false
        }
    }
    return true
}

// console.log(isPrime(8));
isPrime1(8)