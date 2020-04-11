var timeoutid;

$(document).ready(function () {
    $("#tabfrist li").each(function (index) {
        var liNode = $(this);
        $(this).mouseover(function () {
            timeoutid = setTimeout(function () {
                $("div.content").removeClass("content");
                $("#tabfrist li.tabin").removeClass("tabin");
                $("div").eq(index).addClass("content");
                liNode.addClass("tabin");


            },300)
        }).mouseout(function () {
            clearTimeout(timeoutid);
        })
    })


    $("#realcontent").load("myTable.html");

});