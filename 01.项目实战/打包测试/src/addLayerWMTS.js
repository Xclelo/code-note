function addLayerWMTS(item){
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

module.exports = addLayerWMTS;