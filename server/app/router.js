'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/islogin', controller.user.islogin);
  router.get('/logout', controller.user.logout);
  router.post('/register', controller.user.register);
  router.post('/login', controller.user.login);

  router.get('/users', controller.user.userList);
};
