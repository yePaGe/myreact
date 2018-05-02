'use strict';
// const ossKey = require('../ossKey');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = '123456789' + appInfo;

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: {
      cookieName: 'csrfToken',
    },
    // csrf: false
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1/mytest',
    options: {},
  };

  config.oss = {
    client: {
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAIxuwCzuWowgiv',
      accessKeySecret: 'N2Nk6QuGjLA48s2mEtVqUy8KnccTaV',
      bucket: 'myreactfile',
      endpoint: 'oss-cn-beijing.aliyuncs.com',
      timeout: '60s',
    },
    useAgent: true
  };

  return config;
};
