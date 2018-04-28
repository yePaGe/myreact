'use strict';
const Controller = require('egg').Controller;

class uploadController extends Controller {
    async img() {
        const data = this.ctx.request
        this.ctx.body = 'http://aaaa'
    }
}

module.exports = uploadController;