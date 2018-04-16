'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/islogin', controller.user.islogin);
  router.get('/logout', controller.user.logout);
  router.post('/login', controller.user.login);

  router.post('/users/add', controller.user.register);
  router.get('/users/list', controller.user.userList);
  router.get('/users/del', controller.user.delUser);
  router.get('/users/search', controller.user.searchUser);
};
