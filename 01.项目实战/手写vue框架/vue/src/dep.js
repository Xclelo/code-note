export default class Dep{
    constructor(){
        //存放所有watcher
        this.subs = {};
    }

    /**
     * 添加名单
     * @param {*} target 
     */
    addSub(target){
        this.subs[target.uid] = target;
    }

    /**
     * 通知
     */
    notify(){
        for(let uid in this.subs){
            this.subs[uid].update();
        }
    }
}