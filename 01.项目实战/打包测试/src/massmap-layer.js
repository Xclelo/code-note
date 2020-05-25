/**
 * 地图基础图层操作
 */
var massmap = require("./lib/massmap_2d/massmap")
import * as massMapAPI from "./massMapAPI"

var image = new massmap.style.Circle({
    radius: 5,
    fill: null,
    stroke: new massmap.style.Stroke({
        color: "red",
        width: 1
    })
});

var styles = {
    Point: new massmap.style.Style({
        image: image
    }),
    LineString: new massmap.style.Style({
        stroke: new massmap.style.Stroke({
            color: "green",
            width: 6
        })
    }),
    MultiLineString: new massmap.style.Style({
        stroke: new massmap.style.Stroke({
            color: "green",
            width: 8
        })
    }),
    MultiPoint: new massmap.style.Style({
        image: image
    }),
    MultiPolygon: new massmap.style.Style({
        stroke: new massmap.style.Stroke({
            color: "red",
            width: 1
        }),
        fill: new massmap.style.Fill({
            color: "rgba(255, 255, 0, 0.1)"
        })
    }),
    Polygon: new massmap.style.Style({
        stroke: new massmap.style.Stroke({
            color: "blue",
            lineDash: [4],
            width: 3
        }),
        fill: new massmap.style.Fill({
            color: "rgba(0, 0, 255, 0.1)"
        })
    }),
    GeometryCollection: new massmap.style.Style({
        stroke: new massmap.style.Stroke({
            color: "magenta",
            width: 2
        }),
        fill: new massmap.style.Fill({
            color: "magenta"
        }),
        image: new massmap.style.Circle({
            radius: 10,
            fill: null,
            stroke: new massmap.style.Stroke({
                color: "magenta"
            })
        })
    }),
    Circle: new massmap.style.Style({
        stroke: new massmap.style.Stroke({
            color: "red",
            width: 2
        }),
        fill: new massmap.style.Fill({
            color: "rgba(255,0,0,0.2)"
        })
    })
};

var styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()];
};

/**
 * 绘制线和面
 * @param { param.map } param 地图对象
 * @param { param.geometry } param 要绘制的几何数据
 * @param { param.featureType } param 绘制的类型  默认单个Feature渲染；MultiFeature:多个Feature渲染
 * @returns vectorLayer  返回绘制的图层
 * @example
 * let sendDrawRoadPara = {map : this.map, geometry: item.geometry, subData: item.subData,featureType:'MultiFeature'};//多个Feature渲染
 * this.drawedLineLayer = drawFeature(sendDrawRoadPara);
 */
export function drawFeature(param) {
    var mygeojson = {
        type: "FeatureCollection",
        crs: {
            type: "name",
            properties: {
                name: "EPSG:3857"
            }
        },
        features: [{
            type: "Feature",
            geometry: param.geometry,
        }]
    }

    if (param.featureType == 'MultiFeature') {
        for (let d of param.subData) {
            mygeojson.features.push({
                type: "Feature",
                // geometry: d,
                geometry: d.geometry,
                properties: {
                    private: d
                },//道路的属性数据
            })
        }
    }
    var geojsonObject = {
        type: "FeatureCollection",
        crs: {
            type: "name",
            properties: {
                name: "EPSG:3857"
            }
        },
        features: [{
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [0, 0]
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [
                    [4e6, -2e6],
                    [8e6, 2e6]
                ]
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [
                    [4e6, 2e6],
                    [8e6, -2e6]
                ]
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [-5e6, -1e6],
                        [-4e6, 1e6],
                        [-3e6, -1e6]
                    ]
                ]
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "MultiLineString",
                coordinates: [
                    [
                        [-1e6, -7.5e5],
                        [-1e6, 7.5e5]
                    ],
                    [
                        [1e6, -7.5e5],
                        [1e6, 7.5e5]
                    ],
                    [
                        [-7.5e5, -1e6],
                        [7.5e5, -1e6]
                    ],
                    [
                        [-7.5e5, 1e6],
                        [7.5e5, 1e6]
                    ]
                ]
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "MultiPolygon",
                coordinates: [
                    [
                        [
                            [-5e6, 6e6],
                            [-5e6, 8e6],
                            [-3e6, 8e6],
                            [-3e6, 6e6]
                        ]
                    ],
                    [
                        [
                            [-2e6, 6e6],
                            [-2e6, 8e6],
                            [0, 8e6],
                            [0, 6e6]
                        ]
                    ],
                    [
                        [
                            [1e6, 6e6],
                            [1e6, 8e6],
                            [3e6, 8e6],
                            [3e6, 6e6]
                        ]
                    ]
                ]
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "GeometryCollection",
                geometries: [{
                    type: "LineString",
                    coordinates: [
                        [-5e6, -5e6],
                        [0, -5e6]
                    ]
                },
                {
                    type: "Point",
                    coordinates: [4e6, -5e6]
                },
                {
                    type: "Polygon",
                    coordinates: [
                        [
                            [1e6, -6e6],
                            [2e6, -4e6],
                            [3e6, -6e6]
                        ]
                    ]
                }
                ]
            }
        }
        ]
    };

    /*  var geoMarker = [];
     for(let d of param.subData){
         geoMarker.push((
             new Feature({
                 type: 'Feature',
                 geometry: d.geometry,
                 private:d,//道路的属性数据
             })
         ))
     }
     var vectorSource = new VectorSource({
         features: geoMarker
     }); */

    var vectorSource = new massmap.source.Vector({
        features: new massmap.format.GeoJSON().readFeatures(mygeojson)
    });

    // vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));
    /* 实现要素居中 */
    let geometry = vectorSource.getFeatures()[0].getGeometry();
    let view = param.map.getView();
    let size = param.map.getSize();
    view.fit(geometry, {
        size: size,
        padding: [100, 100, 100, 100],
        duration: 1500
    })

    var vectorLayer = new massmap.layer.Vector({
        source: vectorSource,
        style: styleFunction
    });

    let layer_dom = new massmap.layer.Tile({
        source: new massmap.source.OSM()
    });
    // param.map.addLayer(layer_dom);
    param.map.addLayer(vectorLayer);
    return vectorLayer

}

/**
 * 绘制点
 * @param { param.map } param 地图对象
 * @param { param.geometry } param 要绘制的几何数据
 */
export function drawPoint(param) {
    var mygeojson = {
        type: "FeatureCollection",
        crs: {
            type: "name",
            properties: {
                name: "EPSG:3857"
            }
        },
        features: [{
            type: "Feature",
            geometry: param.geometry,
        }]
    }

    var vectorSource = new massmap.source.Vector({
        features: new massmap.format.GeoJSON().readFeatures(mygeojson)
    });
    var vectorLayer = new massmap.layer.Vector({
        source: vectorSource,
        style: styleFunction
    });
    param.map.addLayer(vectorLayer);

}

/** 控件组（比例尺、鼠标位置、鹰眼）

 */
export class Control {
    /**
     * 
     * @param {Object} params 
     * @param {Object} params[].map 地图对象
     * @param {Boolean} params[].isScale [bool] 是否加载比例尺控件
     * @param {Boolean} params[].isMousePosition [bool] 是否加载鼠标位置控件
     * @param {Boolean} params[].isOverviewMap [bool] 是否加载鹰眼图控件
     * @param {Object} params[].LayerObj 如果加载鹰眼图需传与底图同坐标系但不同的数据源图层，如不加载可以不传
     * @example
     * //鹰眼图对象
     * var layerClass = new Layer();
     * var basemap = layerClass.addLayerXYZ({
     *   NodeName: mapconfig.overviewMap.name,
     *   NodeConfigId: "",
     *   LayerUrl: mapconfig.overviewMap.url
     * });
     * //添加控件
     * new Control({
     *   map: this.map,
     *   isScale: true,
     *   isMousePosition: true,
     *   isOverviewMap: true,
     *   LayerObj: basemap
     * });
     */
    constructor(params) {
        var map = params.map;
        //是否加载比例尺
        if (params.isScale) {
            //添加比例尺控件
            var scaleLineControl = new massmap.control.ScaleLine({
                units: 'metric',
                target: 'scalebar',
                className: 'ol-scale-line'
            });
            map.addControl(scaleLineControl);
        }
        //是否加载鼠标位置
        if (params.isMousePosition) {
            //初始化鼠标位置控件
            var mousePositionControl = new massmap.control.MousePosition({
                //样式类名称
                className: 'custom-mouse-position',
                //投影坐标格式，显示小数点后边多少位
                coordinateFormat: massmap.coordinate.createStringXY(4),
                //指定投影
                //projection: 'EPSG:4326',
                //目标容器
                target: document.getElementById('mouse-position'),
                //未定义坐标的标记
                //undefinedHTML: '&nbsp;'
            });
            map.addControl(mousePositionControl);
        }
        //是否加载鹰眼图
        if (params.isOverviewMap) {
            var overviewMapControl = new massmap.control.OverviewMap({
                //鹰眼控件样式
                className: 'ol-overviewmap ol-custom-overviewmap',
                //鹰眼中加载同坐标系下与底图不同数据源的图层
                layers: [params.LayerObj],
                view: new massmap.View({
                    center: [104.07, 30.64],
                    projection: "EPSG:4326",
                    zoom: 10
                }),
                //鹰眼控件展开时功能按钮上的标识（网页的JS的字符编码）
                collapseLabel: '\u00BB',
                //鹰眼控件折叠时功能按钮上的标识（网页的JS的字符编码）
                label: '\u00AB',
                //初始为展开显示方式
                collapsed: false,
                collapsible: true
            });
            map.addControl(overviewMapControl);
            store.commit("getoverviewMapControl", overviewMapControl);
        }
    }
}

/** 图层管理 */
export class Layer{
     /**
     * 图层管理构造函数
     * @param {Object} that 组件中的this
     * @param {Object} that[].map 地图对象
     * @param {Boolean | null} that[].isMScreenIn 是否从分屏进入 | 使用addLayer()方法是必填
     * @param {Object} that[].$store vuex对象
     * @example
     * layerClass=new Layer(this);
     * layerClass.addLayer(params);
     */
    constructor(that){
        this.self = that;
    }

    /**
     * 添加图层
     * @param {Array} item 创建图层的数据
     * @param {'WMTS' | 'XYZ' | 'WMS' | 'VectorTile' | 'ArcGis' } item[].LayerType 创建图层的类型
     * @param {String} item[].NodeConfigId 图层id
     * @param {String} item[].LayerUrl 图层数据地址
     * @param {String} item[].LayerParmas 图层名称
     * @param {String} item[].NodeName 节点名称
     * @param {String} item[].accessToken addLayerVectorTile()使用
     * @param {String} item[].solution addLayerVectorTile()使用
     */
    addLayer(item){
        var layer;
        //加载图层
        switch(item.LayerType){
            case 'WMTS':
                layer=this.addLayerWMTS(item);
            break;
            case 'XYZ':
                layer=this.addLayerXYZ(item);
            break;
            case 'WMS':
               layer=this.addLayerWMS(item);
            break;
            case 'VectorTile':
                layer=this.addLayerVectorTile(item);
                break;
            case 'ArcGis':
                 layer=this.addArcGis(item);
                break;
        }
        //设置图层顺序
        //layer.setZIndex(item.LayerSort);
        this.self.map.addLayer(layer);
        var newitem={
            NodeConfigId:item.NodeConfigId,
            name:item.NodeName,
            item:item,
            layer:layer
        }
        // showLayerList.push(item);
        // loadLayerList.push(item)
        if(this.self.isMScreenIn){
           this.self.$store.commit('multiScreenLoadLayerListEmit', newitem);
        }else{
           this.self.$store.commit('showLayerListEmit', {list:newitem});
           this.self.$store.commit('loadLayerListEmit', {list:newitem});
        }

        //图层排序
        this.layerLoginSortAll();
    }

    addLayerWMTS(item){
         //WMTS图层数据
         var wmtsLayer;

         //通过范围计算得到分辨率数组
         var projection = massmap.proj.get('EPSG:4326');
         var projectionExtent = projection.getExtent();
        // 切片名
        var matrixIds = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10',
        'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];

        // 切片大小
        var resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5,
        4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7];
      
         //实例化WMTS服务图层对象（massmap.layer.Tile，massmap.source.WMTS）
         wmtsLayer = new massmap.layer.Tile({
             opacity: 1, //图层透明度
             source: new massmap.source.WMTS({
                 id:item.NodeConfigId,
                 //WMTS服务基地址
                 url: item.LayerUrl,
                 // 图层名称
                 layer: item.LayerParmas,
                 //投影坐标系设置矩阵
                 matrixSet: 'EPSG:4326',
                 //图片格式
                 format: 'image/png',
                 //数据的投影坐标系
                 projection: projection,
                 //瓦片网格对象
                 tileGrid: new massmap.tilegrid.WMTS({
                     //原点（左上角）
                     origin: massmap.extent.getTopLeft(projectionExtent),
                     //分辨率数组
                     resolutions: resolutions,
                     //矩阵标识列表，与地图级数保持一致
                     matrixIds: matrixIds
                 }),
                 style: 'default',
                 wrapX: true
             })
         });
         //this.map.addLayer(wmtsLayer);
         return wmtsLayer;
    }

    addLayerXYZ(item){
        var MapLayer = new massmap.layer.Tile({
            title: item.NodeName,
            id:item.NodeConfigId,
            source: new massmap.source.XYZ({
                url: item.LayerUrl,
                wrapX: false
            }),
        });
        return MapLayer;
    }

    addLayerWMS(item){
        // var wmsLayer = new massmap.layer.Image({
        //     source: new massmap.source.ImageWMS({
        //         //WMS服务基地址
        //         url: url,
        //         //图层参数
        //         params: { 'LAYERS': layername, 'FORMAT': 'image/png'},
        //         //服务类型
        //         serverType: 'geoserver'
        //     })
        // });
        var wmsLayer = new massmap.layer.Tile({
              id:item.NodeConfigId,
              source: new massmap.source.TileWMS({
                url: item.LayerUrl,//自己的wms地址，可在geoserver中以openlayerView查看
                params: { 
                   'VERSION': '1.1.0',
                   'LAYERS': item.LayerParmas,
                    tiled:true,
                    'FORMAT': 'image/png'
                },
                serverType:'geoserver',
                })
           });
          //通过范围计算得到分辨率数组对象resolutions
        //   var projExtent = massmap.proj.get('EPSG:4326').getExtent();
        //   var startResolution = massmap.extent.getWidth(projExtent) / 256;
        //   var resolutions = new Array(22);
        //   for (var i = 0, ii = resolutions.length; i < ii; ++i) {
        //       resolutions[i] = startResolution / Math.pow(2, i);
        //   }
        //     //实例化massmap.tilegrid.TileGrid对象
        //     var tileGrid = new massmap.tilegrid.TileGrid({
        //         //数据范围
        //         extent: [114.348876953125,27.8071899414063,114.490356445313,27.9259185791016],
        //         //分辨率数组
        //         resolutions: resolutions,
        //         //瓦片大小
        //         tileSize: [768, 644]
        //     });
        //     //使用massmap.layer.Tile实例化WMS图层对象，设置massmap.source.TileWMS的tileGrid参数
        //     var wmsLayer = new massmap.layer.Tile({
        //         source: new massmap.source.TileWMS({
        //             //WMS服务地址
        //             url: url,
        //             //图层等参数
        //             params: { 'LAYERS': layername, 'TILED': true },
        //             //服务类型
        //             serverType: 'geoserver',
        //             //瓦片网格对象参数（瓦片大小为512x256）
        //             tileGrid: tileGrid
        //         })
        //     });
          return wmsLayer;
    }

    addLayerVectorTile(item){
        function getFillJson(data) {
            var json = {};
            if (data.color) json.color = data.color;
            return json;
        }
        function getStrokeJson(data) {
            var json = {};
            if (data.color) json.color = data.color;
            if (data.width) json.width = data.width;
            if (data.dash) json.lineDash = data.dash;
            return json;
        }
        function getMarkerJson(data) {
            var json = {};
        
            if (data.size) json.radius = data.size;
        
            var _fill = data.fill;
            if (_fill) json.fill = new massmap.style.Fill(getFillJson(_fill));
        
            var _stroke = data.stroke;
            if (_stroke) json.stroke = new massmap.style.Stroke(getStrokeJson(_stroke));
        
            return json;
        }
        function getLabelJson(data, feature) {
            var json = {};
            if (data.field) json.text = feature.get(data.field).toString();
            if (data.color) json.fill = new massmap.style.Fill({
                color: data.color
            });
            if (data.textAlign) json.textAlign = data.textAlign;
            if (data.textBaseline) json.textBaseline = data.textBaseline;
            if (data.font) json.font = data.font;
            if (data.offsetX) json.offsetX = data.offsetX;
            if (data.offsetY) json.offsetY = data.offsetY;
            return json;
        }
        
        function styleFunction(feature) {
            var layer = feature.get("layer");
            var layerStyle = styleMap[layer];
            if (layerStyle) {
                var styles = [];
                for (var i = 0,
                len = layerStyle.length; i < len; i++) {
                    var _styleData = layerStyle[i];
                    var _zoom = this.self.map.getView().getZoom();
                    if (_styleData.minZoom > _zoom || _styleData.maxZoom < _zoom) {
                        return;
                    } else {
                        var _styleJson = {};
                        switch (_styleData.type) {
                        case "line":
                            {
                                var _stroke = _styleData.stroke;
                                if (_stroke) {
                                    if(layer=="Trafficrtic"){
                                       _styleJson.stroke = new massmap.style.Stroke(getStrokeJson(_stroke[feature.properties_.status]));
                                    }else{
                                        _styleJson.stroke = new massmap.style.Stroke(getStrokeJson(_stroke));
                                    }

                                }
                                break;
                            }
                        case "polygon":
                            {
                                var _fill = _styleData.fill;
                                if (_fill) _styleJson.fill = new massmap.style.Fill(getFillJson(_fill));
        
                                var _stroke = _styleData.stroke;
                                if (_stroke) _styleJson.stroke = new massmap.style.Stroke(getStrokeJson(_stroke));
        
                                var _label = _styleData.label;
                                if (_label) _styleJson.text = new massmap.style.Text(getLabelJson(_label, feature));
                                break;
                            }
                        default:
                            {
                                _styleJson.image = new massmap.style.Circle(getMarkerJson(_styleData));
        
                                var _label = _styleData.label;
                                if (_label) _styleJson.text = new massmap.style.Text(getLabelJson(_label, feature));
        
                                break;
                            }
                        }
                        styles.push(new massmap.style.Style(_styleJson));
                    }
                }
                return styles;
            } else {
                return null;
            }
        }
        // var MapLayer= new massmap.layer.VectorTile(
        //     {
        //         declutter : true,
        //         source : new massmap.source.VectorTile({
        //             url : 'http://datahive.minedata.cn/dynamicdata/Trafficrtic/{z}/{x}/{y}/'+new Date().getTime()+'?token=25cc55a69ea7422182d00d6b7c0ffa93&solu=2374',
        //             format : new massmap.format.MVT()
        //         }),
        //         tileGrid: massmap.tilegrid.createXYZ({maxZoom: 22}),
        //         tilePixelRatio: 1,
        //         style:styleFunction.bind(this),
        // })

       var MapLayer= new massmap.layer.VectorTile(
            {
                //declutter : true,
                projection: new massmap.proj.Projection({
                    code: 'EPSG:4326',
                    units: 'degrees',
                    axisOrientation: 'neu'
                  }),
                source : new massmap.source.VectorTile({
                    projection: new massmap.proj.Projection({
                        code: 'EPSG:4326',
                        units: 'degrees',
                        axisOrientation: 'neu'
                      }),
                    format : new massmap.format.MVT(),
                    url : item.LayerUrl+'/'+new Date().getTime()+'?token='+item.accessToken+'&solu='+item.solution,
                    matrixSet: 'EPSG:4326',
                    // tileGrid: massmap.tilegrid.createXYZ({
                    //     extent: massmap.proj.get('EPSG:4326').getExtent(),
                    //     maxZoom: 22
                    // }),
                    // tilePixelRatio: 1,
                }),
                style:styleFunction.bind(this),
                //wrapX: true
        })
        return MapLayer;
    }

    addArcGis(item){
        var MapLayer = new massmap.layer.Tile({
            title: item.NodeName,
            id:item.NodeConfigId,
            source: new massmap.source.TileArcGISRest({
                url: item.LayerUrl,
                wrapX: false,
                projection:massmap.proj.get('EPSG:4326')
            }),
        });
        return MapLayer;
    }
    /**
     * 已经加载过图层重新排序
     */
    layerLoginSortAll(){
        var map_LayerList=this.self.$store.state.loadLayerList;
        if (map_LayerList.length > 1) {
            for (var i = 0; i < map_LayerList.length ; i++) {
                if (map_LayerList[i].item == undefined) {
                    continue;
                }
                for (var j = i + 1; j < map_LayerList.length; j++) {
                    //排序  从小到大
                    if (map_LayerList[i].item.LayerSort > map_LayerList[j].item.LayerSort) {
                        //数组顺序
                        var temp = map_LayerList[i];
                        map_LayerList[i] = map_LayerList[j];
                        map_LayerList[j] = temp;
                    }
                }

            }
            //图层顺序
            for (var n = 0; n < map_LayerList.length; n++) {
                if (map_LayerList[n].item == undefined) {
                    continue;
                }
                //循环查找需要替换的图层对象
                var layerMin = map_LayerList[n].layer;//this.self.map.getLayers().array_.filter(v=>v.values_.id==map_LayerList[n].item.NodeConfigId);
                //替换
                layerMin.setZIndex(n);
                layerMin.changed();
            }
        }
    }
}

/** 属性查询 */
export class Attribute {
    /**
     * 创建一个属性查询
     * @param {Object} that 组件中的this
     * @param {Object} that[].drawClass new Draw(this.map)---图形绘制工具
     * @param {Object} that[].map 地图对象
     * @param {Object} that[].$http axios模块对象
     */
    constructor(that) {
        this.self = that;
        this.container = document.getElementById('mass-popup');
        var closer = document.getElementById('mass-popup-closer');
        this.content = document.getElementById('mass-popup-content');
        /**
         * 创建覆盖以将弹出窗口定位到地图。
         */
        this.overlay = new massmap.Overlay(({
            element: this.container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250   //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度. 单位为毫秒（ms）
            }
        }));
        /**
         * 添加一个单击处理程序以隐藏弹出窗口。
         * @return {boolean} 
         */
        var that = this;
        closer.onclick = function () {
            //that.container.style.width="15.8333333333rem";
            that.container.style.height = "13.0208333333rem";
            //that.container.style.padding="0.78125rem";
            that.overlay.setPosition(undefined);
            closer.blur();
            that.self.drawClass.clearMeasure();
            return false;
        };
    }

    /**
     * 注册地图点击事件
     * @param {Object} wmsLayer wms图层对象
     */
    registerMapClick(wmsLayer) {
        var that = this;
        //回调函数接收查询结果
        // var geojsonFormat=new massmap.format.GeoJSON({defaultDataProjection:"EPSG:4326"});
        this.mapClick = this.self.map.on('click', function (evt) {
            that.query(wmsLayer, evt.coordinate, true);
        });
    }


    /**
     * 属性查询
     * @param {*} wmsLayer  图层信息
     * @param {*} coordinate  查询坐标点
     * @param {*} isLocation 是否定位，默认false
     */
    query(wmsLayer, coordinate, isLocation) {
        var layer = wmsLayer.layer;
        var viewResolution = this.self.map.getView().getResolution();
        var url = layer.getSource().getFeatureInfoUrl(coordinate, viewResolution, 'EPSG:4326',
            {
                'INFO_FORMAT': 'application/json',
                //'FEATURE_COUNT': 10     //点击查询能返回的数量上限,默认为1
            });
        var url2 = url.split(":")[2];
        var url3 = url2.substring(4, url2.length - 1);
        //var url3="/geoserver/MassMap/wms?&INFO_FORMAT=application/json&REQUEST=GetFeatureInfo&EXCEPTIONS=application/vnd.ogc.se_xml&SERVICE=WMS&VERSION=1.1.1&WIDTH=256&HEIGHT=256&X=200&Y=179&BBOX=27.861328125,114.3896484375,27.9052734375,114.43359375&LAYERS=MassMap:BZP_SZDX_LN";
        var that2 = this;
        this.self.$http.get('/geoapi' + url3).then(res => {
            //移除地图点击事件
            //移除监听事件
            if (that2.mapClick) {
                massmap.Observable.unByKey(that2.mapClick);
            }
            //修改鼠标手势为默认
            var target = that2.self.map.getTarget();
            var domTarget = typeof target === "string" ? document.getElementById(target) : target;
            domTarget.style.cursor = "default";
            //清除上一次的
            //that2.self.drawClass.clearMeasure();
            var query_Line = that2.self.drawClass.vectorLayer.getSource().getFeatures().filter(v => v.values_.id == "query_Line");
            if (query_Line.length > 0) {
                that2.self.drawClass.vectorSource.removeFeature(query_Line[0]);
            }

            var features = res.data.features[0];
            if (features) {
                var geo = features.geometry.coordinates[0];
                that2.CreatePopup(coordinate, features.properties, wmsLayer.item.returnAttribute);

                //高亮图形
                if (features.geometry.type.indexOf("Line") > -1) {
                    that2.self.drawClass.CreateLine("query_Line", geo, true);
                } else if (features.geometry.type.indexOf("Point") > -1) {
                    that2.self.drawClass.CreatePoint("query_Point", geo, true);
                } else if (features.geometry.type.indexOf("Polygon") > -1) {
                    that2.self.drawClass.CreatePolygon("query_Polygon", geo, true);
                }
                if (isLocation) {
                    var view = that2.self.map.getView(); //获取地图视图
                    view.setCenter(coordinate);
                    //var zoom = view.getZoom();//获得当前缩放级数
                    view.setZoom(18);//地图放大
                }
            }
        })
    }


    /**
     * 多图层属性查询
     * @param {*} wmsSource 
     * @param {*} coordinate 
     */
    queryMultipleLayers(wmsSource, coordinate) {
        var url = wmsSource.getFeatureInfoUrl(coordinate, this.self.map.getView().getResolution(), 'EPSG:4326',
            {
                'INFO_FORMAT': 'application/json', //这个返回的是一个html页面
                'FEATURE_COUNT': 2  //最大查询要素数量，默认为1
            });

        if (url) {
            var url2 = url.split(":")[2];
            var url3 = url2.substring(4, url2.length - 1);
            //var url3="/geoserver/MassMap/wms?&INFO_FORMAT=application/json&REQUEST=GetFeatureInfo&EXCEPTIONS=application/vnd.ogc.se_xml&SERVICE=WMS&VERSION=1.1.1&WIDTH=256&HEIGHT=256&X=200&Y=179&BBOX=27.861328125,114.3896484375,27.9052734375,114.43359375&LAYERS=MassMap:BZP_SZDX_LN";
            var that2 = this;
            this.self.$http.get('/geoapi' + url3).then(res => {
                var features = res.data.features;
                if (features.length > 0 && features.length == 2) {
                    features = features.filter(v => v.id.indexOf("YL_HN_MOBLIE") > -1);
                    var geo = features[0].geometry.coordinates[0];
                    that2.CreatePopup2(coordinate, features[0].properties);
                    that2.self.drawClass.CreatePolygon('JZW_Polygon', geo);
                } else if (features.length > 0 && features.length == 1) {
                    var geo = features[0].geometry.coordinates[0];
                    that2.CreatePopup4(coordinate, features[0].properties);
                    that2.self.drawClass.CreatePolygon('GNM_Polygon', geo);
                }
            });
        }
    }

    /**
     * 自定义弹窗框内容-管线
     * @param {Array} coordinate 坐标点
     * @param {Object} properties 管线属性值
     * @param {String} returnAttribute 管线弹框内容属性
     */
    CreatePopup(coordinate, properties, returnAttribute) {
        this.container.style.height = "15rem";
        returnAttribute = returnAttribute.split(",");
        var i = 0;
        var html = "";
        for (var key in returnAttribute) {
            var item = returnAttribute[key];
            var attr = item.split(":")[0];
            var value = item.split(":")[1];
            if (i == 0) {
                html += '<p>' + (properties[value] == null ? "-" : properties[value]) + '</p>';
            } else if (i == 1) {
                html += '<span>' + attr + '：' + (properties[value] == null ? "-" : properties[value]) + '</span>'
            } else {
                html += '<br/><span>' + attr + '：' + (properties[value] == null ? "-" : properties[value]) + '</span>'
            }
            i++;
        }
        this.content.innerHTML = html;
        //  '<p>'+properties['road']+'</p>'
        // + '<span>编号：' + properties['exp_no'] + '</span>'
        // + '<br/><span>埋设方式：' + properties['dtype'] + '</span>'
        // + '<br/><span>起点高程：' + properties['s_h'] + '</span>'
        // + '<br/><span>终点高程：' + properties['e_h'] + '</span>'
        // + '<br/><span>建设年代：' + (properties['bdate']==null?"-": + properties['bdate'])+ '</span>'
        // + '<br/><span>探测年代：' + (properties['sdate']==null?"-": + properties['sdate']) + '</span>';
        this.overlay.setPosition(coordinate);
        this.self.map.addOverlay(this.overlay);
    }

    /**
     * 自定义弹窗框内容-建筑物
     * @param {Array} coordinate 坐标点
     * @param {Object} properties 建筑物属性值
     */
    CreatePopup2(coordinate, properties) {
        this.container.style.height = "8rem";
        var eighthad = properties['eighthad'] ? properties['eighthad'] : "";
        this.content.innerHTML = '<p>' + properties['sevenad'] + eighthad + '</p>'
            + '<span>区域：' + properties['thirdad'] + '</span>'
            + '<br/><span>地址：' + properties['address'] + '</span>';
        this.overlay.setPosition(coordinate);
        this.self.map.addOverlay(this.overlay);
    }

    /**
     * 自定义弹窗框内容-功能面
     * @param {Array} coordinate 坐标点
     * @param {Object} properties 功能面属性值
     */
    CreatePopup4(coordinate, properties) {
        this.container.style.height = "9rem";
        var dtype = properties['ntype'] ? properties['ntype'] : "-";
        this.content.innerHTML = '<p>' + properties['name'] + '</p>'
            + '<span>区域：' + properties['district'] + '</span>'
            + '<br/><span>类型：' + dtype + '</span>'
            + '<br/><span>面积：' + properties['area'] + '</span>';
        this.overlay.setPosition(coordinate);
        this.self.map.addOverlay(this.overlay);
    }

    /**
     * 自定义弹窗框内容-poi点
     * @param {Array} coordinate 坐标点
     * @param {Object} properties poi点属性值
     */
    CreatePopup3(coordinate, properties) {
        // this.container.style.width="5rem";
        this.container.style.height = "10rem";
        // this.container.style.padding="0.3rem";
        this.content.innerHTML = '<p>' + properties['name'] + '</p>'
            + '<span>编号：' + properties['id'] + '</span>'
            + '<br/><span>类型：' + properties['type'] + '</span>'
            + '<br/><span>地址：' + properties['address'] + '</span>';
        this.overlay.setPosition(coordinate);
        this.self.map.addOverlay(this.overlay);
    }
}

/** 测量
 * @example
 * var measureClass = new Measure(map);
 * //测距
 * var measureClass.addInteraction('LineString');
 * /测面
 * var measureClass.addInteraction('Polygon');
 */
export class Measure {
    /**
     * 创建一个测量工具
     * @param {Object} map 地图对象
     */
    constructor(map) {
        this.map = map;

        this.drawstartFun = '';
        this.drawendFun = '';

        /**
         * 当前绘制的要素
         * @type {massmap.Feature}
         */
        this.sketch;
        /**
         * 帮助提示框对象
         * @type {Element}
         */
        this.helpTooltipElement;
        /**
         *帮助提示框显示的信息
         * @type {massmap.Overlay}
         */
        this.helpTooltip;
        /**
         * 测量工具提示框对象
         * @type {Element}
         */
        this.measureTooltipElement;
        /**
         *测量工具中显示的测量值
         * @type {massmap.Overlay}
         */
        this.measureTooltip;
        /**
         *  当用户正在绘制多边形时的提示信息文本
         * @type {string}
         */
        this.continuePolygonMsg = '单击继续绘制多边形';
        /**
         * 当用户正在绘制线时的提示信息文本
         * @type {string}
         */
        this.continueLineMsg = '单击继续绘制线';


        // let that = this;
        // this.map.getViewport().addEventListener("mouseout", function () {
        //     that.helpTooltipElement.classList.add("hidden");
        // });

        //this.typeSelect = document.getElementById("type");

        this.draw; // global so we can remove it later

        //加载测量的绘制矢量层
        this.measureSource = new massMapAPI.VectorSource();

        this.measureVector = new massMapAPI.VectorLayer({
            source: this.measureSource,
            style: new massMapAPI.Style({
                fill: new massMapAPI.Fill({
                    color: "rgba(255, 255, 255, 0.2)"
                }),
                stroke: new massMapAPI.Stroke({
                    color: "#ffcc33",
                    width: 2
                }),
                image: new massMapAPI.CircleStyle({
                    radius: 7,
                    fill: new massMapAPI.Fill({
                        color: "#ffcc33"
                    })
                })
            })
        });
        this.measureVector.setZIndex(999);
        this.map.addLayer(this.measureVector);
    }

    /**
     * Format length output.
     * @param {LineString} line The line.
     * @return {string} The formatted length.
     */
    formatLength(line, obj) {
        var length = massmap.sphere.getLength(line, obj);//Math.round(line.getLength() * 100) / 100; 
        var output;
        if (length > 100) {
            output = Math.round((length / 1000) * 100) / 100 + " " + "km";
        } else {
            output = Math.round(length * 100) / 100 + " " + "m";
        }
        return output;
    }

    /**
     * Format area output.
     * @param {Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    formatArea(polygon, obj) {
        var area = massmap.sphere.getArea(polygon, obj);
        var output;
        if (area > 10000) {
            output =
                Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
        } else {
            output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
        }
        return output;
    }

    addInteraction(measureType) {
        var sourceProj = this.map.getView().getProjection();
        // console.log(`测量类型${type}`)
        this.draw = new massMapAPI.Draw({
            source: this.measureSource,
            type: measureType,
            /*用于交互绘制图形时所设置的样式*/
            style: new massMapAPI.Style({
                fill: new massMapAPI.Fill({
                    color: "rgba(255, 255, 255, 0.2)"
                }),
                stroke: new massMapAPI.Stroke({
                    color: "rgba(0, 0, 0, 0.5)",
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new massMapAPI.CircleStyle({
                    radius: 5,
                    stroke: new massMapAPI.Stroke({
                        color: "rgba(0, 0, 0, 0.7)"
                    }),
                    fill: new massMapAPI.Fill({
                        color: "rgba(255, 255, 255, 0.2)"
                    })
                })
            })
        });
        this.map.addInteraction(this.draw);

        this.createMeasureTooltip();
        this.createHelpTooltip();

        /* * 鼠标移动事件处理函数
         * @param {massmap.MapBrowserEvent} evt
         */
        var pointerMoveHandler = function (evt) {
            if (evt.dragging) {
                return;
            }
            /** @type {string} */
            var helpMsg = '单击以开始绘制';//当前默认提示信息
            //判断绘制几何类型设置相应的帮助提示信息
            if (this.sketch) {
                var geom = (this.sketch.getGeometry());
                if (geom instanceof massmap.geom.Polygon) {
                    helpMsg = this.continuePolygonMsg; //绘制多边形时提示相应内容
                } else if (geom instanceof massmap.geom.LineString) {
                    helpMsg = this.continueLineMsg; //绘制线时提示相应内容
                }
            }
            this.helpTooltipElement.innerHTML = helpMsg; //将提示信息设置到对话框中显示
            this.helpTooltip.setPosition(evt.coordinate);//设置帮助提示框的位置
            //$(helpTooltipElement).removeClass('hidden');
            this.helpTooltipElement.classList.remove("hidden");//移除帮助提示框的隐藏样式进行显示
        };
        this.map.on('pointermove', pointerMoveHandler.bind(this)); //地图容器绑定鼠标移动事件，动态显示帮助提示框内容


        //绑定交互绘制工具开始绘制的事件
        var listener;
        var drawstartFun = function (evt) {
            // set sketch
            this.sketch = evt.feature; //绘制的要素

            var tooltipCoord = evt.coordinate; // 绘制的坐标
            let that = this;
            //绑定change事件，根据绘制几何类型得到测量长度值或面积值，并将其设置到测量工具提示框中显示
            listener = this.sketch.getGeometry().on("change", function (evt) {
                var geom = evt.target; //绘制几何要素
                var output;
                if (geom instanceof massMapAPI.Polygon) {
                    output = that.formatArea(geom, { projection: sourceProj }); //面积值
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();//坐标
                } else if (geom instanceof massMapAPI.LineString) {
                    output = that.formatLength(geom, { projection: sourceProj });//长度值
                    tooltipCoord = geom.getLastCoordinate();//坐标
                }
                that.measureTooltipElement.innerHTML = output; //将测量值设置到测量工具提示框中显示
                that.measureTooltip.setPosition(tooltipCoord); //设置测量工具提示框的显示位置
            });
        };
        this.draw.on("drawstart", drawstartFun.bind(this));

        var drawendFun = function () {
            this.removeMeasure();
            this.measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
            this.measureTooltip.setOffset([0, -7]);
            // unset sketch
            this.sketch = null;
            // unset tooltip so that a new one can be created
            this.measureTooltipElement = null;
            this.createMeasureTooltip();
            massmap.Observable.unByKey(listener);
        };

        this.draw.on("drawend", drawendFun.bind(this));

        // this.draw.un('drawstart', drawstartFun)
        // this.draw.un('drawend', drawendFun)
        // this.drawstartFun = drawstartFun;
        // this.drawendFun = drawendFun;
        // console.log(this.drawstartFun)

    }

    /**
     * Creates a new help tooltip
     */
    createHelpTooltip() {
        if (this.helpTooltipElement) {
            this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
        }
        this.helpTooltipElement = document.createElement("div");
        this.helpTooltipElement.className = "ol-tooltip hidden";
        this.helpTooltip = new massmap.Overlay({
            element: this.helpTooltipElement,
            offset: [15, 0],
            positioning: "center-left"
        });
        this.map.addOverlay(this.helpTooltip);
    }

    /**
     * Creates a new measure tooltip
     */
    createMeasureTooltip() {
        if (this.measureTooltipElement) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }
        this.measureTooltipElement = document.createElement("div");
        this.measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
        this.measureTooltip = new massmap.Overlay({
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: "bottom-center"
        });
        this.map.addOverlay(this.measureTooltip);
    }

    /**
     * Handle pointer move.
     */
    pointerMoveHandlerRemove(evt) {
        console.log(evt)
        if (evt.dragging) {
            return;
        }
        /** @type {string} */
        var helpMsg = "";
        // if (this.sketch) {
        //     var geom = this.sketch.getGeometry();
        //     if (geom instanceof massmap.geom.Polygon) {
        //         helpMsg = this.continuePolygonMsg;
        //     } else if (geom instanceof LineString) {
        //         helpMsg = this.continueLineMsg;
        //     }
        // }

        // this.helpTooltipElement.innerHTML = helpMsg;
        // this.helpTooltip.setPosition(evt.coordinate);
        this.helpTooltipElement.classList.add("hidden");
    }

    /**
     * 移除测量功能
     */
    removeMeasure() {
        this.map.removeInteraction(this.draw);
        // this.map.on('pointermove', this.pointerMoveHandlerRemove.bind(this));
        this.map.removeOverlay(this.helpTooltip);
        //this.map.removeOverlay(this.measureTooltip);
        this.draw.un('drawstart', this.drawstartFun)
        this.draw.un('drawend', this.drawendFun)
    }

    /**
     * 清除测量图层
     */
    destroyMeasure() {
        this.measureVector.getSource().clear();
        this.map.getOverlays().clear();
    }
}

/** 
 * 图形绘制
 * @requires /public/js/tool/massMapAPI.js
 * @example
 * var drawClass = new Draw(this.map);
 * //绘制点
 * drawClass.addInteraction('Point');
 * //绘制线
 * drawClass.addInteraction('LineString');
 * //绘制面
 * drawClass.addInteraction('Polygon');
 * //绘制圆
 * drawClass.addInteraction('Circle');
 * //清除绘制
 * drawClass.clearMeasure();
 * 
 */
export class Draw {
    /**
     * 图形绘制构造函数
     * @param {Object} map map对象 
     */
    constructor(map) {
        this.map = map;
        //加载绘制矢量层
        this.vectorSource = new massMapAPI.VectorSource({ wrapX: false });

        this.vectorLayer = new massMapAPI.VectorLayer({
            source: this.vectorSource,
            /*图形绘制好时最终呈现的样式,显示在地图上的最终图形*/
            style: new massMapAPI.Style({
                fill: new massMapAPI.Fill({
                    color: 'rgba(251, 211, 91, 0.2)'
                }),
                stroke: new massMapAPI.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new massMapAPI.CircleStyle({
                    radius: 7,
                    fill: new massMapAPI.Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });
        this.vectorLayer.setZIndex(999);
        this.map.addLayer(this.vectorLayer);


        this.dblClickInteraction = map.getInteractions().getArray()
            .find(interaction => {
                return interaction instanceof massmap.interaction.DoubleClickZoom;
            });
    }
    /**
     * 动态绘制
     * @param {String} drawType 绘制的类型，可选值有：'Point', 'LineString', 'LinearRing', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon', 'GeometryCollection', 'Circle'
     * @param {Function} callback 绘制完成后的回调函数
     */
    addInteraction(drawType, callback) {
        // var value = ['Point', 'LineString', 'Polygon', 'Circle', 'None'];
        if (this.draw)
            this.map.removeInteraction(this.draw);

        //在绘制线时，结束的响应事件也是双击，所以在绘制线时和双击缩放事件就会冲突了
        this.map.removeInteraction(this.dblClickInteraction);

        if (drawType !== "None") {
            this.draw = new massMapAPI.Draw({
                source: this.vectorSource,
                type: drawType
            });
            this.map.addInteraction(this.draw);
        }
        //绑定交互绘制工具开始绘制的事件
        // this.draw.on('drawstart', function (evt) {
        //       var sketch = evt.feature; //绘制的要素
        //       sketch.dispatchEvent({type: 'mousein'});

        // });
        var drawendFun = function (evt) {
            this.map.removeInteraction(this.draw);//清除绘图
            this.draw.un('drawend', drawendFun);
            var that = this;
            setTimeout(function () {
                that.map.addInteraction(that.dblClickInteraction);
            }, 1000)
        };
        this.draw.on("drawend", drawendFun.bind(this));

        if (callback && typeof callback === "function") {
            return callback(this.draw);
        }
    }

    /**
     * 创建一个点
     * @param {String} featureid FeatureID
     * @param {Array} pointList 点的坐标位置，格式：[经度,纬度]
     * @param {Boolean} [isTwinkle=false] 是否闪烁
     */
    CreatePoint(featureid, pointList, isTwinkle) {
        isTwinkle = isTwinkle ? isTwinkle : false;
        //创建一个点
        var point = this.point = new massmap.Feature({
            geometry: new massmap.geom.Point(pointList),
            id: featureid
        });
        //设置点1的样式信息
        point.setStyle(new massMapAPI.Style({
            //填充色
            fill: new massMapAPI.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            //边线颜色
            stroke: new massMapAPI.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            //形状
            image: new massMapAPI.CircleStyle({
                radius: 17,
                fill: new massMapAPI.Fill({
                    color: '#ffcc33'
                })
            })
        }));
        //将新要素添加到数据源中
        this.vectorSource.addFeature(this.point);

        //添加闪烁效果
        if (isTwinkle) {
            var that = this;
            this.fun = setTimeout(function () {
                if (that.point) {
                    that.vectorSource.removeFeature(that.point);
                    that.point = null;
                }
                var that2 = that;
                that.fun2 = setTimeout(function () {
                    that2.CreatePoint(featureid, pointList);
                }, 1000)
            }, 1500)

            setTimeout(function () {
                clearTimeout(that.fun);
                clearTimeout(that.fun2);
            }, 10000);
        }
    }

    /**
     * 创建一条线
     * @param {String} featureid FeatureID
     * @param {Array} pointList  线坐标集合,格式：[[经度,纬度],[经度,纬度]]
     * @param {Boolean} [isTwinkle=false] 是否闪烁
     */
    CreateLine(featureid, pointList, isTwinkle) {
        isTwinkle = isTwinkle ? isTwinkle : false;
        this.Line = new massmap.Feature({
            geometry: new massmap.geom.LineString(pointList),
            id: featureid
        });

        //设置线的样式
        this.Line.setStyle(new massMapAPI.Style({
            //填充色
            fill: new massMapAPI.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            //边线颜色
            stroke: new massMapAPI.Stroke({
                color: '#ffcc33',
                width: 5
            }),
            //形状
            image: new massMapAPI.CircleStyle({
                radius: 7,
                fill: new massMapAPI.Fill({
                    color: '#ffcc33'
                })
            })
        }));

        //将新要素添加到数据源中
        this.vectorSource.addFeature(this.Line);

        //添加闪烁效果
        if (isTwinkle) {
            var that = this;
            this.fun = setTimeout(function () {
                if (that.Line) {
                    that.vectorSource.removeFeature(that.Line);
                    that.Line = null;
                }
                var that2 = that;
                that.fun2 = setTimeout(function () {
                    that2.CreateLine(featureid, pointList);
                }, 1000)
            }, 1500)

            setTimeout(function () {
                clearTimeout(that.fun);
                clearTimeout(that.fun2);
            }, 10000);
        }
    }

    /**
    * 绘制一个面
    * @param {String} featureid FeatureID
    * @param {Array} pointList  线坐标集合,格式：[[经度,纬度],[经度,纬度]]
    * @param {Boolean} [isTwinkle=false] 是否闪烁
    */
    CreatePolygon(featureid, pointList, isTwinkle) {
        isTwinkle = isTwinkle ? isTwinkle : false;
        //创建一个多变形
        var Polygon = this.Polygon = new massmap.Feature({
            geometry: new massmap.geom.Polygon(pointList),
            id: featureid
        });

        //设置区样式信息
        Polygon.setStyle(new massmap.style.Style({
            //填充色
            fill: new massmap.style.Fill({
                color: 'rgba(251, 211, 91, 0.2)'
            }),
            //边线颜色
            stroke: new massmap.style.Stroke({
                lineDash: [1, 2, 3, 4, 5, 6, 7, 8],
                color: '#ffcc33',
                width: 3
            }),
            //形状
            image: new massmap.style.Circle({
                radius: 7,
                fill: new massmap.style.Fill({
                    color: '#ffcc33'
                })
            })
        }));
        //将新要素添加到数据源中
        this.vectorSource.addFeature(Polygon);

        //添加闪烁效果
        if (isTwinkle) {
            var that = this;
            this.fun = setTimeout(function () {
                if (that.Polygon) {
                    that.vectorSource.removeFeature(that.Polygon);
                    that.Polygon = null;
                }
                var that2 = that;
                that.fun2 = setTimeout(function () {
                    that2.CreatePolygon(featureid, pointList);
                }, 1000)
            }, 1500)

            setTimeout(function () {
                clearTimeout(that.fun);
                clearTimeout(that.fun2);
            }, 10000);
        }
    }

    /**
     * 清除绘制图层
     */
    clearMeasure() {
        if (this.draw)
            this.map.removeInteraction(this.draw);//清除绘图

        this.vectorLayer.getSource().clear();
    }

}

/** 地图标注 */
export class Mark {
    /**
     * 地图标注构造函数
     * @param {Object} map map对象 
     */
    constructor(map) {
        this.map = map;

        //矢量标注的数据源
        this.markVectorSource = new massMapAPI.VectorSource({ wrapX: false });
        //矢量标注图层
        this.markVectorLayer = new massMapAPI.VectorLayer({
            source: this.markVectorSource
        });
        this.markVectorLayer.setZIndex(999);
        this.map.addLayer(this.markVectorLayer);
    }
    /**
      * 添加一个新的标注（矢量要素）
      * @param {massmap.Coordinate} coordinate 坐标点
    */
    addVectorLabel(coordinate, url) {
        //新建一个要素 massmap.Feature
        var newFeature = new massMapAPI.Feature({
            //几何信息
            geometry: new massMapAPI.Point(coordinate)
        });
        //设置要素的样式
        newFeature.setStyle(this.createLabelStyle(url));
        //将新要素添加到数据源中
        this.markVectorSource.addFeature(newFeature);
        return newFeature;
    }

    /**
     * 创建矢量标注样式函数,设置image为图标ol.style.Icon
     * @param {ol.Feature} feature 要素
     * @param Icon 标注图标路径
     */
    createLabelStyle(Icon) {
        return new massMapAPI.Style({
            /**{olx.style.IconOptions}类型*/
            image: new massMapAPI.Icon(
                ({
                    /* 设置偏移量会引发：放大地图可明显查看到定位图标位置发生改变
                    anchor: [0.5, 60],
                    anchorOrigin: 'top-right',
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    offsetOrigin: 'top-right',
                     */
                    // offset:[0,10],
                    //图标缩放比例
                    //scale:1,
                    //透明度
                    opacity: 0.75,
                    //图标的url
                    src: Icon
                })
            )
        });
    }

    /** 删除某要素 */
    deleteFeature(feature) {
        this.markVectorSource.removeFeature(feature);
    }

    /** 删除标注图层 */
    deleteLayer() {
        this.map.removeLayer(this.markVectorLayer);
    }

    /** 获取VectorLayer */
    getVectorLayer() {
        return this.markVectorLayer;
    }
    /** 获取VectorLayer */
    getVectorSource() {
        return this.markVectorSource;
    }
}

/** 拖拽、拉伸修改
 * @example
 * var addInteractionlist = new AddInteractions(this.map);
 * addInteractionlist.select.on('select',function(f){
 *     that.PropertiesList=f.selected[0].getProperties();
 * });
 *  addInteractionlist.translate.on('translateend',function(f){
 *      console.log(f);//拖拽完成事件，可以获取拖拽后的要素 
 *  });
 *  addInteractionlist.modify.on('modifyend',function(f){
 *      console.log(f);//拉伸修改完成事件 
 *  });
 * //清除
 * addInteractionlist.removeInteraction();
 */
export class AddInteractions {
    /**
     * 创建一个绘制修改交互器
     * @param {map} map 地图对象
     */
    constructor(map) {
        this.map = map;
        this.interactionList = {};
        this.select = this.interactionList['select'] = new massmap.interaction.Select({
            wrapX: false
        });
        this.translate = this.interactionList['translate'] = new massmap.interaction.Translate({//拖拽移动interaction
            features: this.select.getFeatures()//拖拽的为选择的要素
        });
        //创建一个交互修改对象
        this.modify = this.interactionList['modify'] = new massmap.interaction.Modify({
            //设置要素为交互选择对象所获取的要素
            features: this.select.getFeatures()
        });
        this.map.addInteraction(this.select);
        this.map.addInteraction(this.translate); //拖拽
        this.map.addInteraction(this.modify);//拉伸
    }

    /**
     * 清除绘制交互器
     */
    removeInteraction() {
        this.map.removeInteraction(this.select);
        this.map.removeInteraction(this.translate);
        this.map.removeInteraction(this.modify);
    }
}

/**
 * 增加显示弹框 
 * @param {Object} map 地图对象
 * @param {Array} coordinate 添加弹框的经纬度坐标
 * @param {String} content 添加到弹框体中的html
 * @example
 * let content = `<p>${values.name}</p>
 *   <p>驾驶员：${values.driver}</p>
 *   <p>当前速度：${values.currentSpeed}</p>`
 * addPopup(map, coordinate, content)
 */
export function addPopup(map, coordinate, content) {
    //创建div
    var divEle = document.createElement("div")
    // divEle.setAttribute("id","utils-addPopup")
    document.getElementsByTagName("div")[0].appendChild(divEle)
    divEle.innerHTML = `
    <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="el-icon-close"></a>
        <div id="popup-content"></div>
    </div>
    `
    var container = document.getElementById('popup');
    container.style.display = 'block'
    var content_dom = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    var overlay = new massmap.Overlay({
        element: container,
        autoPan: true,
        positioning: 'bottom-center',
        autoPanAnimation: {
            duration: 250
        }
    });
    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };
    map.addOverlay(overlay);
    var hdms = massmap.coordinate.toStringHDMS(massmap.proj.transform(
        coordinate, 'EPSG:3857', 'EPSG:4326'));

    // content_dom.innerHTML = '<p>You clicked here:</p><code>' + hdms +
    //     '</code>';
    content_dom.innerHTML = content
    overlay.setPosition(coordinate);

}