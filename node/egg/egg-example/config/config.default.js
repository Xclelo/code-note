/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586142564767_4682';

  // add your middleware config here
  config.middleware = [ 'forbidip', 'auth' ];

  // 给中间件传递参数
  config.forbidip = {
    forbidip: [
      '127.0.0.1',
      '192.168.0.10',
    ],
  };

  // 配置session
  config.session = {
    key: 'SESSION_ID',
    maxAge: 30 * 1000 * 60,
    httpOnly: true,
    encrypt: true,
    renew: true, // 每次刷新页面的时候  session都会被延期
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 配置ejs模板引擎
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };

  // 配置ejs模板引擎
  config.api = 'http://www.phonegap100.com';

  return {
    ...config,
    ...userConfig,
  };
};
