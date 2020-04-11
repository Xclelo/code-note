/* 
向下遍历
children：只能更改children-->div2   传不传参数无所谓
find   寻找下一个元素 一定需要传参



$(document).ready(function () {
    //$("#div1").children("#div2").css({ border: "3px solid #000000" })
    $("#div1").find("p").css({ border: "3px solid #000000" })
});

*/







/*
向上遍历
parent()  只能向上遍历一层
parents()  向上遍历全部（能指定参数）
parentUntil()  遍历区间元素



$(document).ready(function () {
    //$("p").parent().css({ border: "3px solid #000000" })
    $("p").parents().css({ border: "3px solid #000000" })
    //$("p").parentUntil("#div1").css({ border: "3px solid #000000" })
});
*/






/*
同级遍历
siblings()  //修改同级的所有元素
next()
nextAll()
nextUntil()  //由上往下修改区间
prev()//向上
perAll()
preUntil()


$(document).ready(function () {
    //$("h4").siblings().css({ border: "3px solid #FF0000" });
    //$("h4").next().css({ border: "3px solid #FF0000" });
    //$("h4").nextAll().css({ border: "3px solid #FF0000" });
    //$("h4").nextUntil("h6").css({ border: "3px solid #FF0000" });
    $("h4").prev("h6").css({ border: "3px solid #FF0000" });
});
*/



/*
遍历过滤
first()
last()
eq()
filter()
not()

*/

$(document).ready(function () {
    //$("div p").first().css("background-color","red");//div中的第一个p元素
    //$("div p").last().css("background-color", "red");//div中的第一个p元素
    //$("div p").eq(2).css("background-color", "red");//div中的第一个p元素
    //$("div p").filter("p").css("background-color", "red");//div中的第一个p元素
    $("div p").not(".pclass").css("background-color", "red");//div中的第一个p元素


});
