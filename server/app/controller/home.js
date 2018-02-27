'use strict';
const Config = require('../../config/config.default');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
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
    await this.ctx.model.User.create({
      username: data.username,
      password: data.password
    }, function(err, doc) {
      this.ctx.body = err + doc
    })
  }
  async login() {
    let data = this.ctx.request.body
    this.ctx.model.User.create({
      username: data.username,
      password: data.password
    }, function(err, doc) {
      console.log(err, doc)
    })
    this.ctx.body = 'ok'
  }
}

module.exports = HomeController;
