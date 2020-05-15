/**
 * 单例模式
 */

class Singleton {
    constructor() { }
}

Singleton.getInstance = (function () {
    let instance
    return function () {
        if (!instance) {
            instance = new Singleton()
        }
        return instance
    }
})()

let s1 = Singleton.getInstance()
let s2 = Singleton.getInstance()
console.log(s1 === s2) // true

/**
 * 工厂模式
 */

class Man {
    constructor(name) {
        this.name = name
    }

    showName() {
        console.log(this.name)
    }
}

class Factory {
    static create(name){
        return new Man(name)
    }
}

Factory.create('xxx').showName()
