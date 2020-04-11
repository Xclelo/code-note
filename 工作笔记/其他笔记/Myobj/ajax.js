/*

如果要处理$.ajax()得到的数据，则需要使用回调函数。beforeSend、error、dataFilter、success、complete。 


beforeSend 在发送请求之前调用，并且传入一个XMLHttpRequest作为参数。
error 在请求出错时调用。传入XMLHttpRequest对象，描述错误类型的字符串以及一个异常对象（如果有的话）
dataFilter 在请求成功之后调用。传入返回的数据以及"dataType"参数的值。并且必须返回新的数据（可能是处理过的）传递给success回调函数。
success 当请求之后调用。传入返回后的数据，以及包含成功代码的字符串。
complete 当请求完成之后调用这个函数，无论成功或失败。传入XMLHttpRequest对象，以及一个包含成功或错误代码的字符串。






});

*/

$(document).read(function () {






    //ajax异步加载
    $("#btn").on("click", function () {
        $.get("Server.php", { name: $("namevalue").val() }, function (data) {
            $("#result").text(data);
        });

    })


    //ajax加载片段
    $("body").load("box.htm", function (a, status, c) {
        console.log(status);
        if (status == "error") {
            $("body").text("片段加载失败");
        }
    });


    //加载js文件
    $.getScript("test.js").complete(function () {
        sayHello();//test.js里面的方法
    });

    $.getScript("test.js", function () {
        alert("Script loaded and executed.");
    });












});
