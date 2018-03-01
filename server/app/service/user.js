'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async findOne(username) {
      let user = await this.ctx.model.User.findOne({
          username: username
      })
      return user    
  }

  async update(id, newdata1, newdata2) {
      let update = await this.ctx.model.User.update({_id: id}, {$set: newdata1, newdata2})
      return update
  }

  async create(user) {
      let nowDate = new Date()
      let newuser = await this.ctx.model.User.create({
          username: user.username,
          password: user.password,
          islogin: false,
          createDate: nowDate,
          lastLogin: nowDate
      })
      return newuser
  }
}

module.exports = UserService;
