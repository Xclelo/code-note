'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';

    // 设置cookies
    ctx.cookies.set('username', 'xcq', {
      maxAge: 1000 * 3600 * 24, // cookie存储一天
      httpOnly: true,
      signed: true, // 对cookie进行签名 防止用户修改cookie
      encrypt: true, // 是否对cookie进行加密，如果true,解密也是一样设置,这样也可以设置成中文
    });
    // 获取cookies
    ctx.cookies.get('username', {
      encrypt: true,
    });

    // 设置session
    this.ctx.session.username = 'zhangsan';


    // 获取session
    this.ctx.session.username;


    await ctx.render('index');
  }

}

module.exports = HomeController;
