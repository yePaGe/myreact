'use strict';
const Config = require('../../config/config.default');
const Controller = require('egg').Controller;

class UserController extends Controller {
  async islogin() {
    if(!this.ctx.request.header.cookie) {
      this.ctx.body = await 'first open'
    }
    else {
      if(this.ctx.request.query.token){
        this.ctx.body = await 'has login'
      }
      else {
        this.ctx.body = await 'please get login'
      }
    }
  }

  async register() {
    let data = this.ctx.request.body
    let user = await this.service.user.findOne(data.username)
    if(!user) {
      let newuser = await this.service.user.create(data)
      if(!newuser) {
        this.ctx.body = {
          code: 1,
          msg: 'register fail and please try again!'
        }
      }
      else {
        this.ctx.body = {
          code: 0,
          msg: `${newuser.username} login successfully!`,
          id: newuser.id
        }
      }
    }
    else {
      this.ctx.body = {
        code: 2,
        msg: 'this username is existed'
      }
    }
  }

  async login() {
    let data = this.ctx.request.body
    let user = await this.service.user.findOne(data.username)
    if(!user) {
      this.ctx.body = {
        code: 2,
        msg: 'user is not existed'
      }
    }
    else {
      if(user.password === data.password) {
        let loginDate = new Date()
        let tologin =  await this.service.user.update(user.id, { islogin: true }, {lastLogin: loginDate})
        let token = await this.service.token.createToken(user)
        this.ctx.cookies.set('token', tokenKey)
        this.ctx.body = {
          code: 0,
          cont: tologin,
          msg: 'login successfully!'
        }       
      }
      else {
        this.ctx.body = {
          code: 1,
          msg: 'your password is wrong!'
        }
      }
    }
  }
}

module.exports = UserController;
