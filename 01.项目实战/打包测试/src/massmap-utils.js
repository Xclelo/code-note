/***
 * 地图操作工具类
 */

 /**
 * MassMap
 * @module Maputils
 */
 
 /*************************地图基础操作**************************/

 var ol_ext_inherits = function(child,parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  };

/**
 * 设置地图显示范围
 * @param {massmap/map} map  地图对象
 * @param {massmap/extent} extent  范围
 */

 var setExtent=function(map,extent){
    var r = map.getView().getResolutionForExtent(extent, map.getSize());
    map.getView().setResolution(r);
    map.getView().setCenter(massmap.extent.getCenter(extent));
 }

  /**
 * 设置地图中心点
 * @param {massmap/map} map - 地图对象
 * @param {massmap/geom/Point} center - 中心点
 */
 var setCenter = function (map,center) {
    map.getView().setCenter(center);
};

 /**
 * 设置地图等级
 * @param {massmap/map} map - 地图对象
 * @param {Number} level - 等级
 */
var setZoom = function (map,level) {
    map.getView().setZoom(level);
};

/**
 * 获取地图当前可视范围
 * @param {massmap/map} map - 地图对象
 * @returns {massmap/extent} -当前可视范围
 */
var getExtent=function(map){
    return map.getView().calculateExtent(map.getSize());
 }

  /**
 * 获取地图可视区域中心
 * @param {massmap/map} map - 地图对象
 * @returns {massmap/geom/Point} -当前可视区域中心
 */
var getCenter = function (map) {
    return map.getView().getCenter();
};

/**
* 获取地图当前等级
* @param {massmap/map} map - 地图对象
* @returns {Number} - 等级
*/
var getZoom = function (map) {
    return map.getView().getZoom();
};


/*************************测量********************************************/



 //massmap.Map.call(setExtent);
 //this.set('setExtent', setExtent.bind(this));
//  ol_ext_inherits();
//  Object.defineProperty(massmap.Map, 'setExtent', { value: setExtent.bind(massmap.Map) });