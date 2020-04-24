/**
 * 
 * 安装webpack: npm install -g webpack
 * 热加载： webpack --watch
 * 打包： node_modules/.bin/webpack
 */

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    static showName() {
        console.log(`this.name`);
    }
}
Person.showName()