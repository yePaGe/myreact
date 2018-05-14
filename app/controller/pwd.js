'use strict';

const Controller = require('egg').Controller;

class Pwd extends Controller {
    async check() {
        const data = this.ctx.request.body;
        const pwd = await this.app.cryptoPwd(data.pwd)
        const user = await this.service.user.findOne(data.email);
        if(pwd == user.password) {
            this.ctx.body = {
                code: 0,
                msg: 'pwd is correct'
            }
        }
        else {
            this.ctx.body = {
                code: 1,
                msg: 'not the correct pwd'
            }
        }
    }

    async edit() {
        const data = this.ctx.request.body;
        const pwd = await this.app.cryptoPwd(data.pwd)
        const user = await this.service.user.findOne(data.email);
        const updateRes = await this.service.user.update(user._id, {
            password: pwd
        })
        if(updateRes.n == 1 && updateRes.ok == 1) {
            this.ctx.body = {
                code: 0,
                msg: 'pwd change ok'
            }
        }
        else {
            this.ctx.body = {
                code: 1,
                msg: 'pwd change fail'
            }
        }
    }
};

module.exports = Pwd;