'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async getNews() {
    // const { ctx } = this;

    // 通过接口抓取数据

    // curl方法获取远程数据
    const api = this.config.api + '/appapi.php/?a=getPortalList&catid=20&page=1';
    const response = await this.ctx.curl(api);
    // console.log(response.data); // 返回的是Buffer
    const data = JSON.parse(response.data);
    // console.log(data);
    return data.result;
  }

  async getContent(aid) {
    // const { ctx } = this;

    // curl方法获取远程数据,获取新闻详情
    const api = this.config.api + '/appapi.php/?a=getPortalArticle&aid=' + aid;
    const response = await this.ctx.curl(api);
    // console.log(response.data); // 返回的是Buffer
    const data = JSON.parse(response.data);
    return data.result;
  }
}

module.exports = NewsService;
