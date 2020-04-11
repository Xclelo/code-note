/*
 * @Author: xcq
 * @Date: 2020-01-30 20:03:46
 * @LastEditors  : xcq
 * @LastEditTime : 2020-01-30 20:09:09
 * @FilePath: \学习Code\设计模式\Part1\15装饰者模式.js
 * @Description: 文件头部注释 快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i
 * @函数注释 快捷键：window：ctrl+alt+t,mac：ctrl+cmd+t
 */
Function.prototype.before = function (beforefn) {
    var _self = this;
    return function () {
        beforefn.apply(this, arguments);
        return _self.apply(this, arguments);
    }
}

Function.prototype.after = function (beforefn) {
    var _self = this;
    return function () {
        var ret = beforefn.apply(this, arguments);
        _self.apply(this, arguments);
        return ret
    }
}


