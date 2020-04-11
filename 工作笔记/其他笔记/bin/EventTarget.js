$(document).ready(function () {//文档是否加载完成
    $("body").bind("click", bodyHandler);
    $("div").bind("click", divHandler);



    $("#clickme").click(function () {
        var e = jQuery.Event("MyEvent");//创建自己的事件
        $("#clickme").trigger(e);
    });
    $("#clickme").bind("MyEvent", function (event) {
        console.log(event);
    });

    //jQuery-HTML-捕获
    $("#btn1").click(function () {
        alert("text:"+$("#it").val());
    })
    $("#btn2").click(function () {
        alert("text:" + $("#aid").attr("id"));//获取属性内容
    });
    
    //设置元素
    $("#bt1").click(function () {
        $("#p1").text("baiducom");
    });
    $("#bt2").click(function () {
        $("#p2").html("<a href='http://www.baidu.com'>baidu<a/>");
    });


    $("#bt3").click(function () {
        $("#setlink").attr("href","http://www.tenxun.com");
    });
    $("#bt3").click(function () {
        $("#setlink").attr({
            "href": "http://www.tenxun.com",
            "title":"修改多个属性"
        });
    });



});

function bodyHandler(event) {
    console.log(event);
    event.stopImmediatePropagation();//全部阻止
}
function divHandler(event) {
    console.log(event);
    //event.stopPropagation();//阻止父级冒泡事件
}



