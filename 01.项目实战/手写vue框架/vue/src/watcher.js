import Dep from "./dep";

var $uid = 0;
export default class Watcher{
    constructor(exp, scope, cb){
        this.exp = exp;//表达式
        this.scope = scope;//作用域
        this.cb = cb;//回调函数
        this.uid = $uid++;
        this.update();
    }

    /**
     * 计算表达式
     */
    get(){
        Dep.target = this
        let newValue = Watcher.computeExpression(this.exp, this.scope);
        Dep.target = null
        return newValue;
    }

    /**
     * 完成回调函数的调用
     */
    update(){
        let newValue = this.get();
        console.log(newValue);
        
        this.cb && this.cb(newValue)
    }

    static computeExpression(exp, scope){
        //创建函数
        //把scope当作作用域
        //函数内部使用with 来知道作用域
        //执行函数，得到表达式的值
        let fn = new Function("scope","with(scope){return " + exp + "}")
        return fn(scope)
    }
}