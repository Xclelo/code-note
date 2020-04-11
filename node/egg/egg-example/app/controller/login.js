'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';

    // await ctx.render('login', {
    //   csrf: this.ctx.csrf, // 传递密钥，防止攻击
    // });

    await ctx.render('login');// 直接从全局变量中获取--> middleware/auth.js
  }

  // 获取add提交的数据
  async add() {
    this.ctx.body = this.ctx.request.body;
  }

}

module.exports = LoginController;
