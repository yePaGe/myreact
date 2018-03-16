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

  return config;
};
