'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/islogin', controller.home.index)
  router.post('/register', controller.home.register);
  router.get('/login', controller.home.login)
};
