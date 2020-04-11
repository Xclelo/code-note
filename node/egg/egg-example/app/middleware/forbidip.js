/* eslint-disable strict */
module.exports = (options, app) => {
  return async function pingbiip(ctx, next) {
    // 要屏蔽的IP：1.从数据库获取 2.从参数传入

    const forbidip = options.forbidip;

    console.log(forbidip);

    if (ctx.request.ip === forbidip[1]) {
      console.log(ctx.request.ip);
      ctx.status = 403;
      ctx.body = '您的IP已被屏蔽';
    } else {
      await next();
    }
  };
};
