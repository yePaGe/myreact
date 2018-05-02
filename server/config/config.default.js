'use strict';

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
      accessKeyId: 'your access key',
      accessKeySecret: 'your access secret',
      bucket: 'your bucket name',
      endpoint: 'oss-cn-hongkong.aliyun.com',
      timeout: '60s',
    },
    useAgent: true
  };
  
  return config;
};
