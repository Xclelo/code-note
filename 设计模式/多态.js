'use strict'
var googleMap = {
    show: function () {
        console.log('开始渲染Google地图')
    }
}
var baiduMap = {
    show: function () {
        console.log('开始渲染baidu地图')
    }
}

var renderMap = function (map) {
    if (map.show instanceof Function) {
        map.show();
    }
}

renderMap(googleMap);
renderMap(baiduMap);