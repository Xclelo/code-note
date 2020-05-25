
/* ====================热力图============================ */
/**
 * 热力数据格式
 * @example 例如：
 * //[{lng:110,lat:35,count:48}]
 * @typedef {Object[]} heatmapData
 * @property {number} lng 经度
 * @property {number} lat 纬度
 * @property {number} count 热力值
 */

/**
 * 创建热力图层
 * @constructor
 * @private
 */
function HeatmapLayer() {
    this.layer_ = new massmap.layer.Heatmap({
        source: new massmap.source.Vector({
            wrapX: false
        }),
        // gradient:['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
        blur: parseInt(15, 10),
        radius: parseInt(15, 10)
    });
    this.type = "HeatmapLayer";
    this.properties = null;
};

/**
 * 设置热力数据
 * @param {Object} params 热力数据
 * @param {heatmapData} params.data 热力数据数组
 * @param {number} params.max 最大的热力值
 */
HeatmapLayer.prototype.setData = function (params) {
    var data = params.data;
    var max = params.max;
    var array = [];
    for (var i = 0; i < data.length; i++) {
        var coordinate = [parseFloat(data[i].lng - 4.1), parseFloat(data[i].lat - 8.35)];
        var feature = new massmap.Feature({
            // geometry: new massmap.geom.Point(massmap.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857')),
            geometry: new massmap.geom.Point(coordinate),
            weight: parseFloat(data[i].count) / parseFloat(max)
        });
        array.push(feature);
    }
    this.layer_.getSource().addFeatures(array);
    this.layer_.getSource().on('addfeature', function (event) {
        var name = event.feature.get('name');
        var magnitude = parseFloat(name.substr(2));
        console.log(magnitude)
        event.feature.set('weight', magnitude - 5);
    });
    return this.layer_;
};

/**
 * 显示热力图
 */
HeatmapLayer.prototype.show = function () {
    this.layer_.setVisible(true);
};

/**
 * 隐藏热力图
 */
HeatmapLayer.prototype.hide = function () {
    this.layer_.setVisible(false);
};


/**
 * 热力图
 * @module HeatMap
 */

/**
 * 创建热力图
 * @param {heatmapData} points 热力图的数据源
 * @param {Object} map 热力图挂载的map对象
 * @returns {layer} 返回 热力图
 * @example
 * var points = [
 *     { "lng": 117.018261, "lat": 36.621984, "count": 50 },
 *     { "lng": 117.023332, "lat": 36.616532, "count": 51 },
 *     { "lng": 117.019787, "lat": 36.630658, "count": 15 },
 *     { "lng": 117.018455, "lat": 36.620921, "count": 40 },
 *     { "lng": 117.018843, "lat": 36.615516, "count": 100 }
 * ]
 * //生成热力地图
 * var heatLayer = massmap.heatmap(points,map)
 * //设置热力图数值大小
 * heatLayer.setRadius(15);
 */
function heatmap(points, map) {
    //创建热力图
    var heatmap = new HeatmapLayer();
    //设置数据, 获取图层
    var heatLayer = heatmap.setData({ data: points, max: 100 });
    heatLayer.setZIndex(999);
    //添加图层
    map.addLayer(heatLayer);
    // map.getView().setCenter([112.918261, 28.271984]);
    // this.map.getView().setCenter([112.967539,28.183103]);
    // map.getView().setZoom(16);

    return heatLayer
}




/* ====================动态轨迹图============================ */
/**
 * 创建动态轨迹
 * @module DynamicTrajectory
 * @requires location.png
 * @requires car.jpg
 */

import imgurl from './img/location.png';
import carurl from './img/car.jpg';


/**
 * 对给定的经纬度增加个数
 * @private
 * @param {Array} routeCoords 经纬度
 * @param {Number} saddNum 增加数目
 * @return {Array} 增加之后的经纬度
 */
function increasePoint(routeCoords, addNum) {
    let coordRes = []
    routeCoords.forEach((ponit, index) => {
        for (let i = 0; i < addNum; i++) {
            if (index + 1 < routeCoords.length) {
                let addlon = (routeCoords[index + 1][0] - ponit[0]) / addNum;//经度每一份增加的量
                let addlat = (routeCoords[index + 1][1] - ponit[1]) / addNum;//纬度每一份增加的量
                let curlon = ponit[0] + addlon * (i + 1);
                let curlat = ponit[1] + addlat * (i + 1);
                coordRes.push([curlon, curlat])
            }

        }
    });
    coordRes.unshift(routeCoords[0])
    return coordRes
}


/**
 * 角度计算函数
 * @private
 * @param {Array} first 起点
 * @param {Array} second 终点
 * @return {Number} 角度
 */
function setAngle(first, second) {
    let y = second[1] - first[1];
    let x = second[0] - first[0];
    let radAngle = Math.atan(y / x);
    if (y <= 0 && x >= 0) {//第二象限
        radAngle = -radAngle;
    } else if (x >= 0 && y >= 0) {//第一象限
        radAngle = -radAngle;
    } else if (x <= 0 && y >= 0) {//第四象限
        radAngle = Math.PI - radAngle;
    } else if (x <= 0 && y <= 0) {//第三象限
        radAngle = Math.PI - radAngle;
    }
    return radAngle;
}

/**
 * 动态车辆轨迹初始化
 * @param {Object[]} data 数据源
 * @param {Array[]} data[].routeCoords 坐标数组集合
 * @param {Array} data[].routeCoords.LngLat 坐标点值（[经度,纬度]）
 * @param {number} data[].speedValue 车速
 * @param {Object} data[].carprivate 车辆的其它信息
 * @param {Objec} map 挂载的map对象
 * @example
 * 调用动态轨迹图生成函数
 * dynamicTrajectSource:[
 *       {
 *           name: '湘A 09KB1',
 *           driver: '张三',
 *           currentSpeed: '3Km/h',
 *           trajectlist: road_1,
 *       }
 *   ]
 *   const subway_1 = [
 *       [112.998728,28.067983],
 *       [112.996465,28.074908],
 *       [112.996433,28.074995],
 *       [112.996276,28.079473],
 *   ]
 *   const data = [
 *       {
 *           routeCoords: subway_1,
 *           speedValue: 30,
 *           carprivate: dynamicTrajectSource[0],
 *       }
 *   ]
 * 
 * var redyn = massmap.dynTrajectoryInit(data,this.map)
 */
function dynTrajectoryInit(data, map) {
    let dynamicTrajectLayer = [];
    let keeper = {}
    let vectorLayer = dynTrajectory(data[0].routeCoords, 0, data[0].carprivate, map,keeper);
    dynamicTrajectLayer.push(vectorLayer);
    for (let d of data) {
        let params = [];
        params.push(increasePoint(d.routeCoords, 100));
        params.push(d.speedValue);
        params.push(d.carprivate);
        let v = dynTrajectory(...params, map,keeper);
        dynamicTrajectLayer.push(v);
    }
    return {keeper,dynamicTrajectLayer};
}



/**
 * 创建单条动态轨迹
 * @private
 * @param {Array[]} routeCoords 经纬度坐标点集合
 * @param {Array} routeCoords[].LngLat 坐标点（[经度,纬度]）
 * @param {Number} speedValue 行驶速度
 * @param {Objec} carprivate 私有属性
 * @param {Objec} map 挂载的map对象
 * @param {Object} keeper 记录当前车辆位置
 */
function dynTrajectory(routeCoords, speedValue, carprivate, map,keeper) {
    let currentCar_geoMaker = null;
    var routeLength = routeCoords.length;

    var routeFeature = new massmap.Feature({
        type: 'route',
        geometry: new massmap.geom.LineString(routeCoords)
    });
    var geoMarker = /* @type Feature<import("../src/ol/geom/Point").default> */(new massmap.Feature({
        type: 'geoMarker',
        geometry: new massmap.geom.Point(routeCoords[0]),
        private: carprivate,
    }));
    var startMarker = new massmap.Feature({
        type: 'icon',
        geometry: new massmap.geom.Point(routeCoords[0])
    });
    var endMarker = new massmap.Feature({
        type: 'icon',
        geometry: new massmap.geom.Point(routeCoords[routeLength - 1])
    });

    var styles = {
        'route': new massmap.style.Style({
            stroke: new massmap.style.Stroke({
                width: 0, color: [0, 0, 238, 0]
            })
        }),
        'icon': new massmap.style.Style({
            image: new massmap.style.Icon({
                anchor: [0.5, 1],
                scale: 0.2,
                src: imgurl
            })
        }),
        /* 'geoMarker': new Style({
            image: new CircleStyle({
            radius: 7,
            fill: new Fill({color: 'black'}),
            stroke: new Stroke({
                color: 'white', width: 2
            })
            })
        }) */
        'geoMarker': new massmap.style.Style({
            image: new massmap.style.Icon({
                anchor: [0.5, 1],
                scale: 0.8,
                // rotation:1.5 * Math.PI,//一个PI旋转180°
                src: carurl
            })
        })
    };

    /* 给当前carmark给个初始样式 */
    currentCar_geoMaker = styles.geoMarker
    var animating = false;
    var speed, now;

    var vectorLayer = new massmap.layer.Vector({
        source: new massmap.source.Vector({
            // features: [routeFeature, geoMarker, startMarker, endMarker]
            features: [routeFeature, geoMarker]
        }),
        style: function (feature) {
            // hide geoMarker if animation is active
            if (animating && feature.get('type') === 'geoMarker') {
                return null;
            }
            if (feature.get('type') === 'geoMarker') {
                return currentCar_geoMaker;
            }
            return styles[feature.get('type')];
        }
    });
    /* 实现要素居中 ------- befin*/
    let geometry = vectorLayer.getSource().getFeatures()[0].getGeometry();
    let view = map.getView();
    let size = map.getSize();
    /* view.fit(geometry, {
        size: size,
        padding: [100, 100, 100, 650]
    }) */
    /*-----------end------------*/

    vectorLayer.setZIndex(999);
    // dynamicTrajectLayer.push(vectorLayer);
    map.addLayer(vectorLayer);
    if (speedValue == 0) {
        vectorLayer.setOpacity(0);
    }
    var moveFeature = function (event) {
        var vectorContext = massmap.render.getVectorContext(event);
        var frameState = event.frameState;

        if (animating) {
            var elapsedTime = frameState.time - now;
            // here the trick to increase speed is to jump some indexes
            // on lineString coordinates
            var index = Math.round(speed * elapsedTime / 1000);
            if (index >= routeLength - 1) {
                stopAnimation(true);
                return;
            }

            var currentPoint = new massmap.geom.Point(routeCoords[index]);
            var feature = new massmap.Feature(currentPoint);


            //保存各个位置的当前地址
            Object.assign(keeper, { [carprivate.name]: routeCoords[index] })

            /* 计算车头方向---begin */
            currentCar_geoMaker = new massmap.style.Style({
                image: new massmap.style.Icon({
                    anchor: [0.5, 1],
                    scale: 0.8,
                    // rotation:1.5 * Math.PI,//一个PI旋转180°
                    rotation: setAngle(routeCoords[index], routeCoords[index + 1]) - 1.5 * Math.PI,//一个PI旋转180°
                    src: carurl
                })
            })
            /* 计算车头方向---end */
            if(currentCar_geoMaker.image_&&currentCar_geoMaker.image_.getSize()){
                vectorContext.drawFeature(feature, currentCar_geoMaker);
            }

        }
        // tell OpenLayers to continue the postrender animation
        map.render();
    };

    function startAnimation() {
        if (animating) {
            stopAnimation(false);
        } else {
            animating = true;
            now = new Date().getTime();
            speed = speedValue;
            // hide geoMarker
            geoMarker.setStyle(null);
            // just in case you pan somewhere else
            map.getView().setCenter(routeCoords[0]);
            map.getView().setZoom(10);
            vectorLayer.on('postrender', moveFeature);//postrender  ---渲染图层后触发。
            map.render();
        }
    }


    /*
     * @param {boolean} ended end of animation.
     */
    function stopAnimation(ended) {
        animating = false;

        // if animation cancelled set the marker at the beginning
        var coord = ended ? routeCoords[routeLength - 1] : routeCoords[0];
        var geometry = geoMarker.getGeometry();
        geometry.setCoordinates(coord);
        //remove listener
        vectorLayer.un('postrender', moveFeature);
    }

    if (speedValue != 0) {
        startAnimation();
    }
    return vectorLayer;
}

/* ====================动态闪烁图============================ */
/**
 * 动态闪烁图
 * @requires flashMarker.css
 */
import './flashMarker.css'

/**
* 创建动态闪烁图
* @constructor
* @param {Object} map   地图对象
* @param {GeoJson} geojson  数据
* @example 第二个参数geojson数据样例：
 [
  {
    coordinates:[120,30],
    properties:{//这些属性都不是必须的
        company:'',
        address:'',
        industry:'',
        industryName:'',
        color:''
    }
 }   
]
* @param {Object} params  其它配置项
* @param {String} params.layerid 图层id
* @param {Boolean} [params.isclick=false] 是否注册点击事件
* @param {String} [params.className] 自定义popup样式，不传默认样式
* @param {String} params.attribute 显示的属性字段，用英文逗号分隔
* @param {String} params.innerHTML 弹出框显示的内容
* @param {Array} params.coordinate 坐标，[经度，纬度]
 */
var FlashMarker=function(map,geojson,params){
    this.map=map;
    //创建数据源
     var source =new massmap.source.Vector({
        wrapX: false
     });
     //创建图层
     var vector =this.vector= new massmap.layer.Vector({
         id:params.layerid?params.layerid:"flashMarkerLayer",
         source: source
     });
     map.addLayer(vector);

     function addRandomFeature() {
         for(var i=0;i<geojson.length;i++){
            var feature = new massmap.Feature();
            feature.set("geometry",new massmap.geom.Point(geojson[i].coordinates));
            feature.setProperties(geojson[i].properties);
            // for(var key in data[i]){
            //    if(key=="coordinates"){
            //         feature.set("geometry",new Point(data[i][key]));
            //    }else{
            //        feature.set(key,data[i][key]);
            //    }
            // }
            // 通过 ol.color.asArray 将原来16进制的颜色值，改为 r,g,b,a的数组
            var AlpColor = massmap.color.asArray(geojson[i].properties.color);
            AlpColor = AlpColor.slice();  
            AlpColor[3] =1;

            var style = new massmap.style.Style({
                image: new massmap.style.Circle({
                    radius: 8,
                    fill: new massmap.style.Fill({
                       color: AlpColor //"rgba("+feature.values_.color.r+","+feature.values_.color.g+","+feature.values_.color.b+",1)" //feature.get('color'),
                    }),
                })
             });
             feature.setStyle(style);
             source.addFeature(feature);
         }
    }

     function flash(feature){
        var listenerKey;
        var i=0;
        function animate(event) {
            // ol6 废除了 event.vectorContext 接口，通过 ol.render.getVectorContext 来获取 vectorContext
            // 更多参考官网"使用postcompose和vectorContext创建添加要素时的自定义动画"的示例，地址：https://openlayers.org/en/latest/examples/feature-animation.html
            var vectorContext = massmap.render.getVectorContext(event);
            var flashGeom = feature.getGeometry().clone();
            if(i>=30)
               i=0;
            var radius=i*0.6;
            var opacity=i*0.1;
             // 通过 ol.color.asArray 将原来16进制的颜色值，改为 r,g,b,a的数组
             var AlpColor = massmap.color.asArray(feature.getProperties().color);
             AlpColor = AlpColor.slice();  
             AlpColor[3] =opacity;

            var style = new massmap.style.Style({
                image: new massmap.style.Circle({
                    radius: radius,
                    stroke: new massmap.style.Stroke({
                        color: AlpColor,//"rgba("+feature.values_.color.r+","+feature.values_.color.g+","+feature.values_.color.b+","+opacity+")",
                        width: 0.15 + opacity
                    })
                })
            });
            var featureStyle=new massmap.style.Style({
                image: new massmap.style.Circle({
                    radius: 8,
                    fill: new massmap.style.Fill({
                       color: AlpColor,//"rgba("+feature.values_.color.r+","+feature.values_.color.g+","+feature.values_.color.b+","+opacity+")" //feature.get('color'),
                    }),
                })
            });
            i++;
            //修改原来的fdeature要素
            feature.setStyle(featureStyle);
            //新增外圈的要素
            vectorContext.setStyle(style);
            vectorContext.drawGeometry(flashGeom);
            //告诉OpenLayers继续后期渲染动画
            map.render();
        }
        listenerKey = vector.on('postrender', animate);
     }

     //动态添加图层要素并加上闪烁效果
     source.on('addfeature', function (e) {
        flash(e.feature);
    });

    addRandomFeature();

    if(params.isclick){
      var popover = null;
      this.mapClick=map.on('click', function(evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
          return feature;
        });
        if (feature) {
          //var coordinates = feature.getGeometry().getCoordinates();
          var attr = feature.getProperties();
          var attrlist=params.attribute.split(",");
          var html="";
          for(var p=0;p<attrlist.length;p++){
              html+="<li>"+attrlist[p].split(":")[0]+":"+attr[attrlist[p].split(":")[1]];
          }
          var content = '<ul>' +html+'</ul>';
          if (!popover) {
            popover =this.popover= new Popover(map,{
               className: 'flashMaker-popup',
               coordinate:evt.coordinate,
               innerHTML:content
            });
          }else{
            popover.setContent({
                coordinate:evt.coordinate,
                innerHTML:content
            })
          }
        } else {
           if (popover) popover.hide();
        }
      });
    }
}

/**清除闪烁点图层 */
FlashMarker.prototype.clear=function(){
    if(this.vector) this.map.removeLayer(this.vector);  //移除矢量图形图层
    if(this.popover) this.map.removeOverlay(this.popover); //移除弹出框图层
    if(this.mapClick) massmap.Observable.unByKey(this.mapClick);  //移除地图点击事件
}

/**
* @constructor
* @private
* @param {Object} map 地图对象
* @param {Object} params 弹出框参数
* @param {String} params.layerid 图层id
* @param {Boolean} [params.isclick=false] 是否注册点击事件
* @param {String} [params.className] 自定义popup样式，不传默认样式
* @param {String} params.attribute 显示的属性字段，用英文逗号分隔
* @param {String} params.innerHTML 弹出框显示的内容
* @param {Array} params.coordinate 坐标，[经度，纬度]
 */
var Popover=function(map,params){
    this.map=map;
    //创建节点
    var el=this.el=document.createElement("div");
    el.className = params.className;
    this.el.innerHTML=params.innerHTML;
    document.body.appendChild(el);

    var overlay=this.overlay= new massmap.Overlay({
        element: el,
        offset:[20,-40]
    });
    overlay.setPosition(params.coordinate);
    map.addOverlay(overlay);
}
Popover.prototype.setContent=function(params){
   this.el.innerHTML=params.innerHTML;
   this.overlay.setPosition(params.coordinate);
}
/**
 * 显示
 */
Popover.prototype.show=function(coordinate){
    if(this.overlay)
      this.overlay.setPosition(coordinate);
}

/**隐藏 */
Popover.prototype.hide=function(){
    if(this.overlay)
       this.overlay.setPosition(undefined);
}

/* ====================聚合图============================ */
/**
 * 聚合图
 * @module ClusteredMap
 */


/**
 * 创建聚合图
 * @param {Object} map 挂载的map对象
 * @param {Object[]} data 坐标点和数值集合
 * @param {Array} data[].coordinates 坐标点（[经度,纬度]）
 * @param {Object} data[].data 坐标点的其它信息
 * @param {Array|Object[]} [color=[51,153,204,1]] 聚合点的颜色。当使用统一的颜色值时传入的格式为：[r,g,b,alpha]，如果根据数值来区分颜色时，格式如下：
 * @param {Array} color[].color 颜色值,格式为：[r,g,b,alpha] 
 * @param {Number} color[].value 数值
 * @param {Object} kind 聚合图点的类型及配置
 * @param {String} [kind.type=circle] 圆形（circle）或多边形(polygon)，默认为圆形 
 * @param {Number} [kind.radius=15] 半径
 * @param {String} [kind.strokeColor=fill] 边框颜色，如果为“fill”则与填充色一致，如果固定为统一的颜色，请入数组格式的颜色值（[r,g,b,alpha]）
 * @param {Number} [kind.strokeWidth=2] 边框大小
 * @param {Number} [kind.points=6] 多边形顶点个数，适用于多边形。
 * @param {Number} [kind.rotation=0] 顺时针多边形旋转弧度，适用于多边形。
 * @param {String} [textColor=[255,255,255,1]] 聚合点中文字的颜色,格式为：[r,g,b,alpha]
 * @param {Number} [distance=40] 点之间的最小距离
 * @returns {Vector} 返回对应的图层
 * @example 颜色配置示例
 * //数值小于等于10：红色
 * //数值大于10且小于等于20：绿色
 * //数值大于20且小于等于30：蓝色
 * //数值大于30：黄色
 * [
 *  {value:10,color:[255,0,0,1]},
 *  {value:20,color:[0,255,0,1]},
 *  {value:30,color:[0,0,255,1]},
 *  {value:30,color:[255,255,0,1]},
 * ]
 */
function initClusterMap(map,data,color,kind,textColor,distance){
    if(!map||!data){
        return 
    }
    
    //计算颜色
    function returnColor(value){
        if(color){
            if(color instanceof Array && color.length>0){
                if(typeof color[0] === 'number'){
                    return color;
                }else{
                    var len = color.length;
                    var c=0;
                    for(;c<len;c++){
                        if(value<=color[c].value){
                            break;
                        }
                    }
                    return color[c>=len?len-1:c].color;
                }
            }else{
                return [51,153,204,1];
            }
        }else{
            return [51,153,204,1];
        }
    }

    distance = parseInt(distance,10);
    if(!isFinite(distance)){
        distance = 40;
    }
    if(!kind){
        kind = {};
    }
    else if(kind && !(kind instanceof Object)){
        return;
    }
    kind.type = kind.type?kind.type:'circle';
    kind.radius = kind.radius?kind.radius:15;
    kind.strokeColor = kind.strokeColor?kind.strokeColor:'fill';
    kind.strokeWidth = kind.strokeWidth?kind.strokeWidth:2;
    kind.points = kind.points?kind.points:6;
    kind.rotation = kind.rotation?kind.rotation:0;

    if(!textColor){
        textColor = [255,255,255,1];
    }

    let len = data.length;
    var features = new Array(len);

    for(var i=0;i<len;i++){
        features[i] = new massmap.Feature({
            geometry:new massmap.geom.Point(data[i].coordinates),//坐标点
            data:data[i].data//数值
        });
    }

    var source = new massmap.source.Vector({
        features: features
    });

    var clusterSource = new massmap.source.Cluster({
        distance: distance,
        source: source
    });

    var styleCache = {};
    var clusters = new massmap.layer.Vector({
        source: clusterSource,
        style: function(feature) {
            var size  = feature.get('features').length;
            var style = styleCache[size];
            if (!style) {
                style = new massmap.style.Style({
                    image:kind.type==="circle"?new massmap.style.Circle({//圆形
                        radius: kind.radius,
                        stroke: new massmap.style.Stroke({
                            color: kind.strokeColor==='fill'?returnColor(size):kind.strokeColor,
                            width:kind.strokeWidth
                        }),
                        fill: new massmap.style.Fill({
                            color: returnColor(size)
                        })
                    }):new massmap.style.RegularShape({//多边形
                        radius: kind.radius,
                        points: kind.points,
                        rotation: kind.rotation,
                        stroke: new massmap.style.Stroke({
                            color: kind.strokeColor==='fill'?returnColor(size):kind.strokeColor,
                            width:kind.strokeWidth
                        }),
                        fill: new massmap.style.Fill({
                            color:returnColor(size)
                        })
                    }),
                    text: new massmap.style.Text({
                        text: size.toString(),
                        fill: new massmap.style.Fill({
                            color: textColor
                        })
                    })
                });
                styleCache[size] = style;
            }
            return style;
        }
    });

    map.addLayer(clusters);

    return clusters;
}


export { heatmap, dynTrajectoryInit, FlashMarker, initClusterMap }