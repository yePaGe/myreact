'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg,girls?';
  }
  async login() {
    let data = this.ctx.query
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
