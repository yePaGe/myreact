'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'aaaa';
  }
  async register() {
    let data = this.ctx.request.body;
    console.log(data)
    console.log(this.ctx.request.cookie)
    this.ctx.body = 'aaaa';
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
