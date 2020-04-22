import Observer from "./observer";
import Compiler from "./compiler";

class Vue{
    constructor(options){
        //获取元素dom对象
        this.$el = document.querySelector(options.el);

        //转存数据
        this.$data = options.data || {};

        //数据和函数的代理【使vm.msg能直接访问到数据,如果没有此步操作只能通过vm.$data.msg访问数据】
        this._proxyData(this.$data)
        this._proxyMethods(options.methods)

        //数据劫持
        new Observer(this.$data)

        //模板编译
        new Compiler(this)

    }

    /**
     * 数据的代理
     * @param {*} data 
     */
    _proxyData(data){
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                set(newValue){
                    data[key] = newValue;
                },
                get(){
                    return data[key];
                },
            })
        })
    }

    /**
     * 函数的代理
     * @param {*} methods 
     */
    _proxyMethods(methods){
        if(methods && typeof methods === "object"){
            Object.keys(methods).forEach(key => {
                this[key] = methods[key]
            })
        }
    }
    
}

window.Vue = Vue;