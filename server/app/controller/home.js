'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg,girls?';
  }
  async login() {
    this.ctx.body = this.ctx.model.User.find({});
  }
}

module.exports = HomeController;
