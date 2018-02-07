'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/aaa', controller.home.index);
  router.get('/login', controller.home.login)
};
