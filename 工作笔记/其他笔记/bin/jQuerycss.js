$(document).ready(function () {

    //$("div").css("width", "100px");
    //$("div").css("height", "100px");
    //$("div").css("background", "#FF0000");
    ////或者
    //$("div").css({
    //width:"100px",height:"100px",background:"#FF0000"
    //});



    $("div").addClass("style");
    $("div").click(function () {
        //$(this).addClass("style2");
        //$(this).removeClass("style");
        $(this).toggleClass("style2");

    });

});