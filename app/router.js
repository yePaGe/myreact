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
  router.post('/users/edit', controller.user.editUser)

  router.post('/pwd/check', controller.pwd.check);
  router.post('/pwd/edit', controller.pwd.edit);
  
  router.post('/upload/img', controller.upload.img);

  router.get('/imgs/create', controller.imgsList.createStock);
  router.post('/imgs/add', controller.imgsList.addList);
  router.get('/imgs/delete', controller.imgsList.delItem);
  router.get('/imgs/itemList', controller.imgsList.itemList);
  router.get('/imgs/nameList', controller.imgsList.nameList);
};
