/* eslint-disable strict */
// app/extend/application.js

/**
 * 可以通过this.app.foo() 来获取数据
 */
module.exports = {
  foo(param) {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    console.log('-------');
    console.log(param);
    return this.config.api;
  },
};
