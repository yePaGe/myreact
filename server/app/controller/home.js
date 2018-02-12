'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    if(!this.ctx.query.token) {
      this.ctx.body = this.ctx.headers.cookie
      // this.ctx.body = 'not login'
    }
    else {
      this.ctx.body = 'has login'
    }
  }
  async register() {
    console.log(this.ctx.request)
    if(!this.ctx.request.Cookie) {
      this.ctx.body = 'aaaa';
    }
    else {
      console.log(this.ctx.request.Cookie)
      this.ctx.body = 'bbbb';
    }
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
