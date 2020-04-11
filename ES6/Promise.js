/*
 * @Author: xcq
 * @Date: 2020-01-08 20:56:58
 * @LastEditors  : xcq
 * @LastEditTime : 2020-01-09 22:56:53
 * @FilePath: \学习Code\ES6\Promise.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */

 //nodejs中引入jQuery
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;
const $ = require('jquery')(window);



// import {$} from '../lib/jquery-3.4.1.min.js'
// require('../lib/jquery-3.4.1.min.js');
var promise = new Promise(function (resolve, reject) {
    $.ajax({
        url: 'data/arr.txt',
        dataType: 'json',
        success(arr) {
            resolve(arr);
        },
        error(err) {
            reject(err);
        }
    })
})
promise.then(function () {
    console.log(`succ`)
}, function (err) {
    console.log(err)
})