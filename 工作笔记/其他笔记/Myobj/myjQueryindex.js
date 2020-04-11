$(document).read(function () {

    //扩展jQuery
    $.myjq();
    $("#div").myjq();
});




//当JQuery简写$与其他框架冲突时
/*
 *

$.noConflict();//消除$代替jQuery
jQuery(document).read(function () {

    //扩展jQuery
    jQuery.myjq();
    jQuery("#div").myjq();
});

*
*/
