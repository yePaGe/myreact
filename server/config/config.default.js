'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = '123456789';

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: {
      cookieName: 'csrfToken'
    }
  }

  config.mongoose = {
    url: 'mongodb://127.0.0.1/test',
    options: {}
  }

  return config;
};
