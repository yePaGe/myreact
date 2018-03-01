'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/islogin', controller.user.islogin)
  router.post('/register', controller.user.register);
  router.post('/login', controller.user.login)
};
