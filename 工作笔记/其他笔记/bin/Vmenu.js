$(document).ready(function () {
    $(".main>a").click(function () {
        var ulNode = $(this).next("ul");
        //if (ulNode.css("display") == "none") {
        //    ulNode.css("display", "block");
        //} else {
        //    ulNode.css("display", "none");
        //}

        //ulNode.show();
        //ulNode.hide();
        //ulNode.toggle(500);//数字,slow,normal,fast
        //ulNode.slideUp();//数字,slow,normal,fast
        //ulNode.slideDown();//数字,slow,normal,fast
        ulNode.slideToggle();//数字,slow,normal,fast
    });


    //水平菜单
    $(".hmain").hover(function () {//鼠标滑过的事件
        $(this).children("ul").slideToggle();
    })
});