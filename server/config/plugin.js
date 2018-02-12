'use strict';

// had enabled by egg
// exports.static = true;
module.exports = () => {
    const config = exports = {};
    
    config.mongoose = {
        enable: true,
        package: 'egg-mongoose'
    }

    config.nunjucks = {
        enable: true,
        package: 'egg-view-nunjucks'
    }

    return config;
}