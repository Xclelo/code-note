/*
 * @Author: xcq
 * @Date: 2020-01-30 15:24:42
 * @LastEditors  : xcq
 * @LastEditTime : 2020-01-30 15:28:32
 * @FilePath: \学习Code\设计模式\Part1\window.onload扩展.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */
Function.prototype.after = function (afterfn) {
    var _self = this;
    return function () {
        var ret = _self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};

window.onload = (window.onload || function () {}).after(function () {
    console.log(document.getElementsByName('*').length);
})