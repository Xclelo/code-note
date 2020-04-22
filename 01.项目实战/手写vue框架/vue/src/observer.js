import Dep from "./dep";

//数据劫持
export default class Observer{
    constructor(data){
        this.data = data
        this.walk(this.data)
    }
    /**
     * 遍历对象
     * @param {*} data 
     */
    walk(data){
        if(!data || typeof data !== "object"){
            return
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        })
    }

    /**
     * 动态设置响应式数据
     * @param {*} data 
     * @param {*} key 
     * @param {*} value 
     */
    defineReactive(data, key, value){
        let dep = new Dep()
        Object.defineProperty(data, key, {
            //可遍历
            enumerable: true,

            //不可再配置
            configurable: false,
            get:() => {
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set: newValue => {
                value = newValue

                //TODO  触发view的变动
                dep.notify()
            }
        });
        this.walk(value)
    }
}