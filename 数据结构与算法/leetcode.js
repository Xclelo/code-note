/**
 * 快速排序-分而治之-递归   
 * @param {Array}} arr 
 */
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr
    }
    let left = [];
    let right = [];
    let currIndex = arr.splice(Math.floor(arr.length / 2), 1);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < currIndex) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(currIndex, quickSort(right))
}

// console.log(quickSort([5, 1, 54, 9, 8, 2, 1, 4, 3, 0, 25]));




/**
 * 示例:
    给定 nums = [2, 7, 11, 15], target = 9
    因为 nums[0] + nums[1] = 2 + 7 = 9
    所以返回 [0, 1]
    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/two-sum
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {*} nums 
 * @param {*} target 
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
 * @param {*} nums 
 * @param {*} target 
 * @return {number[]}
 */
const twoSum_2 = function (nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [map.get(diff), i];
        }
        map.set(nums[i], i);
    }
}

var twoSum_2_2 = function (nums, target) {
    const numsMap = {}
    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i]
        if (numsMap[cur] !== undefined) {
            return [numsMap[cur], i]
        } else {
            const rest = target - cur
            numsMap[rest] = i
        }
    }
}

// console.log(twoSum_2([2, 7, 11, 15], 18));


/**
 * 二分查找
 * @param {*} arr 
 * @param {*} target 
 */
const binarySearch = function (arr, target) {
    let start = 0
    let end = arr.length - 1

    while (start <= end) {
        const mid = Math.floor((start + end) / 2)
        const cur = arr[mid]

        if (cur === target) {
            return mid
        }

        if (cur < target) {
            start = mid + 1
        } else {
            end = mid - 1
        }
    }
    return false
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// console.log(binarySearch(arr, 6))

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const stack = [];
    const mapper = {
        '{': "}",
        "[": "]",
        "(": ")"
    }
    for (const i in s) {
        const v = s[i];
        if (['(', '[', '{'].indexOf(v) > -1) {
            stack.push(v);
        } else {
            const p = stack.pop();
            if (v !== mapper[p]) {
                return false
            }
        }
    }
    if (stack.length > 0) {
        return false
    }

    return true
};


var isValid_2 = function(s) {
    let map = {
        '{': '}',
        '(': ')',
        '[': ']'
    }
    let stack = []
    for(let i = 0; i < s.length ; i++) {
        if(map[s[i]]) {
            stack.push(s[i])
            console.log(stack);
            
        } else if(s[i] !== map[stack.pop()]){
            return false
        }
    }
    return stack.length === 0
};
console.log(isValid_2('[{()}]'));