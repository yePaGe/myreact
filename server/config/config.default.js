'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517987878133_2615';

  // add your config here
  config.middleware = [];

  config.mongoose = {
    url: 'mongodb://127.0.0.1:8099',
    options: {}
  }


  config.security= {
    csrf: {
      queryName: '_csrf',
      bodyName: '_csrf',
      headerName: 'x-csrf-token'
    }
  }
  return config;
};
