/*
实用工具
1.postman  可以发送所有类型的HTTP请求
2.Charles 抓包工具
3.vysor
4.HiJson  json格式化工具
5.VSCode  编辑器
*/






//(1)
/*排序*/
//VACCNTINFO是个对象  
self.VACCNTINFO.sort(function (left, right) { return left.accntNumber2 == right.accntNumber2 ? 0 : (left.accntNumber2 < right.accntNumber2 ? -1 : 1) });
//如果两个参数想等就返回0  第一个参数排在前面返回负数  第二个参数排在前面返回正数
//负值，如果所传递的第一个参数比第二个参数小。 
//零，如果两个参数相等。 
//正值，如果第一个参数比第二个参数大。 
n.sort(function (a, b) {
    return a - b;
});
//n是[4,6,8,12,14,16,25]

//(2)
/*删除重复元素*/
var TemArr = [];
for (var i = 0; i < self.VACCNTINFO().length; i++) {
    if (TemArr.filter(function (item) { return self.VACCNTINFO()[i].accntNumber2 == item.accntNumber2 }).length == 0) {
        TemArr.push(self.VACCNTINFO()[i]);
    };
}

//filter用法
/*
item 当前迭代的数组元素
index 当前迭代的数组元素下下标
array 原数组
*/
var arr = [1,2,6,3,4,5];
var arr1 = arr.filter(function (item, index, array) {
    return (item > 3);
});
console.log(arr1);//[6,4,5]

//数组去重
var arr = [2, 3, 4, 4, 5, 2, 3, 6];
var arr2 = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
});
console.log(arr2);


//ES6用法：
var arr = [1, 2, 6, 3, 4, 5];
console.log(
arr.filter(item => {
    if (item > 3) {
        return item;
    }
})
)


//(3)
/*substring 方法*/
//返回位于 String 对象中指定位置的子字符串。 
var a = '123456789';
var b = a.substring(1, 2);
console.log(a);//123456789
console.log(b);//2
/*substr 方法*/
//返回一个从指定位置开始的指定长度的子字符串。
//stringvar.substr(start [, length ])

var a = '123456789';
var b = a.substr(-2);
console.log(a);//123456789
console.log(b);//89

//(4)
/*format*/
var eag1 = "我是{0},今年{1}了";
var eag2 = "我是{name},今年{age}了";
var res1 = esg1.format("clelo",18);
var res1 = esg1.format({name:"clelo",age:18});

var a = new Date().Format('yyyy-MM-dd HH:mm:ss');





//(5)
$.each(self.Collection1(), function (i, v) {

    !v.FaceURL && (v.FaceURL = "Styles/Themes/Center/Dark/CS008_img/public.jpg");

    self.Collection1()[i].vindex = i;
})


/*   $().each     如果页面有多个input标签为checkbox   */

$("input[name='ch']").each(function (i) {
    if ($(this).attr('checked') == true) {
        //一些代码
    }
})




/* $.each()   处理遍历数组 */


var arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
$.each(arr, function (i, item) {              //i为遍历索引值，item为当前的遍历对象
    alert(item[0]);

});

//输出1，4，7


var obj = { one: 1, two: 2, three: 3, four: 4, five: 5 };
$.esch(obj, function (key, val) {
    alert(obj[key]);
}

    );

//输出1，2，3，4


//(6)
div.classList.remove("className");

//KO绑定       css绑定是添加或删除一个或多个CSS class到DOM元素上。




//(7)   空数组 空对象判断问提
if ({}) { }                 //true
if ([]) { }                 //true 

if ({} == true) { }    //fasle
if ([] == true) { }    //fasle
if ([] == 0) { }       //true 
if ({} == 0) { }       //false

if ({}.length == 0) { }                  //false
if ([].length == 0) { }                 //true



//(8) 1. array.splice(start,deleteCount,item)

var a = ['a', 'b', 'c'];
var r = a.splice(1, 1, 'bug', 'age');
//a=['a','bug', 'age','c']
//r=['b']

//2.array.slice(start,end)

var message = "ABCD EFG-HI";
var b = message.slice(1);
console.log(b);//BCD EFG-HI
//3.array.concat(item...)
var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.concat(b, true);
//c=['a', 'b', 'c','x', 'y', 'z',true]

//4.
//array.pop()移除最后一个并返回该元素  
//array.shift()  移除第一个并返回该元素
//array.push(item...)    
//array.unshift(item...)  插入到开始
//array.reverse()  反转   


//(9)　立即执行函数表达式 

var a = 2;
(function foo() {
    var a = 3;
    console.log(a); // 3 
})();
console.log(a); // 2

//第一个 (  ) 将函数变成表 达式，第二个 (  ) 执行了这个函数。



//(10)   闭包
for (var i = 1; i <= 5; i++) {
    (function () {
        var j = i;
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000);
    })();
}

//改进后：
for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000);
    })(i);
}

/*1*/
for (let i = 1; i <= 5; i++) { setTimeout(function timer() { console.log(i); }, i * 1000); }


//(11)split的用法
var message = "ABCD EFG-HI";
var b = message.split('-').reverse().join(',');
console.log(b);//HI,ABCD EFG

var message = "ABCD EFG-HI";
var b = message.split('-');
console.log(b[0]);//ABCD EFG

/*模块化*/
function CoolModule() {
var something = "cool";
var another = [1, 2, 3]; 
 
function doSomething() {
    console.log(something);
}
 
function doAnother() {
    console.log(another.join(" ! "));
}
 
return {
    doSomething: doSomething,
    doAnother: doAnother
};
}
var foo = CoolModule();  
foo.doSomething(); // cool 
foo.doAnother(); // 1 ! 2 ! 3


//============================      ES6新语法    ===============================================
//字符串新语法  padStart  padEnd  来填充字符串

var date_M = (getMonth + 1).toString().padStart(2, '0');//01

//遍历数组方法 some forEach ...












//--------------------------------------    END     -----------------------------------------------------


/*==================================================================================
====================================================================================
以下是工作中用到的JS方法
*/
//js深拷贝方式一： 递归拷贝

var clone = function (obj) {
    var newObj = obj.constructor === Array ? [] : {};
    for (var key in obj) {
        newObj[key] = typeof obj[key] === 'Object' ? clone(obj[key]) : obj[key];
    }

    return newObj;
}

/*
JSON.parse()将字符串转换为json对象
JSON.stringify()将对象，数组转换成字符串
*/
//深拷贝方式二，利用json对象转化为字符串的方法
var clone2 = function (v) {
    return (
      JSON.parse(JSON.stringify(v))
    );
}



//毫秒转换为年月日时分秒
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = change(date.getDate()) + ' ';
    h = change(date.getHours()) + ':';
    m = change(date.getMinutes()) + ':';
    s = change(date.getSeconds());
    return Y + M + D + h + m + s;
}
function change(t) {
    if (t < 10) {
        return "0" + t;
    } else {
        return t;
    }
}

//获取日期之间的日期数组
Date.prototype.format = function () {
    var s = '';
    var mouth = (this.getMonth() + 1) >= 10 ? (this.getMonth() + 1) : ('0' + (this.getMonth() + 1));
    var day = this.getDate() >= 10 ? this.getDate() : ('0' + this.getDate());
    s += this.getFullYear() + '-'; // 获取年份。  
    s += mouth + "-"; // 获取月份。  
    s += day; // 获取日。  
    return (s); // 返回日期。  
};

function getAll(begin, end) {
    var dateArr = [];
    var ab = begin.split("-");
    var ae = end.split("-");
    var db = new Date();
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
    var de = new Date();
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
    var unixDb = db.getTime();
    var unixDe = de.getTime();
    for (var k = unixDb; k <= unixDe;) {
        dateArr.push((new Date(parseInt(k))).format());
        k = k + 24 * 60 * 60 * 1000;
    }
    console.log(dateArr);
}






//js模糊查询（表格td）
$("#filterName").keyup(function () {
    $("table tbody tr").hide();
    $(".inv_neirong").filter(":contains('" + ($(this).val()) + "')").parent().show();
})


//视频插件
//<OBJECT WIDTH='541' HEIGHT='450'>
//    <PARAM NAME='ALLOWFULLSCREEN' VALUE='TRUE'>
//    <PARAM NAME='MOVIE' VALUE='HTTP://IMG1.C0.LETV.COM/PTV/PLAYER/SWFPLAYER.SWF?AUTOPLAY=0&ID=31121775'/>
//    <EMBED SRC='HTTP://IMG1.C0.LETV.COM/PTV/PLAYER/SWFPLAYER.SWF?AUTOPLAY=0&ID=31121775' WIDTH='541' HEIGHT='450' ALLOWFULLSCREEN='TRUE' TYPE='APPLICATION/X-SHOCKWAVE-FLASH'/>
//</OBJECT>



//获取URL ？后的查询参数
function query(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
};


//数组去重
function unique(arr) {
    var res = [];
    var json = {};
    for (var i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
}


//删除左右两端的空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//数字输入框
function clearNoNum(obj) {
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数  
    if (obj.value.indexOf(".") < 0 && obj.value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
        obj.value = parseFloat(obj.value);
    }
    if (obj.value == 'NaN') {
        obj.value = 1;
    }
}

//冒泡排序
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {        //相邻元素两两对比
                var temp = arr[j + 1];        //元素交换
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

/*
选择排序
在时间复杂度上表现最稳定的排序算法之一，因为无论什么数据进去都是O(n²)的时间复杂度。。。所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。
*/
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}


/*
插入排序
插入排序的代码实现虽然没有冒泡排序和选择排序那么简单粗暴，但它的原理应该是最容易理解的了，因为只要打过扑克牌的人都应该能够秒懂。当然，如果你说你打扑克牌摸牌的时候从来不按牌的大小整理牌，那估计这辈子你对插入排序的算法都不会产生任何兴趣了。。。
插入排序和冒泡排序一样，也有一种优化算法，叫做拆半插入。对于这种算法，得了懒癌的我就套用教科书上的一句经典的话吧：感兴趣的同学可以在课后自行研究。。。

*/

function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}

//生成随机颜色值
function getRandomColor() {
    const rgb = []
    for (let i = 0 ; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
}


/*
js中的隐式转换
字符串数字 => 数字 (减0)
*/
let stringNum = "123"; // String - 0
stringNum - 0 == 123; // Number


//数字 => 字符串（加''）
let num = 123; // Number
num + "" == "123"; //String 




/*正则表达式验证*/
/*是否带有小数*/
function isDecimal(strValue) {
    var objRegExp = /^\d+\.\d+$/;
    return objRegExp.test(strValue);
}

/*校验是否中文名称组成 */
function ischina(str) {
    var reg = /^[\u4E00-\u9FA5]{2,4}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}

/*校验是否全由8位数字组成 */
function isStudentNo(str) {
    var reg = /^[0-9]{8}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}

/*校验电话码格式 */
function isTelCode(str) {
    var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    return reg.test(str);
}

/*校验邮件地址是否合法 */
function IsEmail(str) {
    var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    return reg.test(str);
}




//原生jsonp请求
/*


<script type="text/javascript">
    // jsonp
    function callback(result) {
        // 成功代码
    }

function showCust() {
    var JSONP = document.createElement("script");
    JSONP.type = "text/javascript";
    JSONP.src = "http://xxxxxxxxxxxx.com?callback=callback";
    document.getElementsByTagName("head")[0].appendChild(JSONP);
}
</script>

*/
