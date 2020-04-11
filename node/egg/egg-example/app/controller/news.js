'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async news() {
    const { ctx, service } = this;
    // ctx.body = '新闻列表';
    // 获取数据显示新闻页面

    const list = await service.news.getNews();
    await ctx.render('news', { list });
    // console.log(list);

  }

  async content() {
    const { ctx, service } = this;

    // 获取get传值
    const aid = ctx.query.aid;
    const list = await service.news.getContent(aid);
    await ctx.render('newscontent', { list: list[0] });
  }
}

module.exports = HomeController;
