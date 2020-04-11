var CreateDiv = function (html) {
    this.html = html;
    this.init();
}


CreateDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
}

var ProxySing = (function () {
    var instance;
    return function (html) {
        if (!instance) {
            instance = new CreateDiv(html)
        }
        return instance;

    }
})()

var a = new ProxySing('div1');
var b = new ProxySing('div2');

alert(a === b)



//通用的惰性单例   以创建悬浮框为例

//惰性单例模式的逻辑
var getSingle = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments));
    }
}

//业务逻辑一
var createLoginLayer = function () {
    var div = document.createElement('div');
    div.innerHTML = '我是悬浮框';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
}

//创建唯一的悬浮框单例
var createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function () {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
}

//创建唯一的iframe
var createSingleIframe = getSingle(function () {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    return iframe;
})

document.getElementById('loginBtn').onclick = function () {
    var loginLayer = createSingleIframe();
    loginLayer.src = 'http://www.baidu.com'
}