'use strict';

const Controller = require('egg').Controller;

class Pwd extends Controller {
    async check() {
        const token = this.ctx.cookies.get('tokenKey')
        const checkToken = await this.service.token.checkToken(token)
        if(!checkToken) {
            this.ctx.status = 500;
            this.ctx.body = {
                msg: 'Internet Server Error!'
            }
            return
        }
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
        const token = this.ctx.cookies.get('tokenKey')
        const checkToken = await this.service.token.checkToken(token)
        if(!checkToken) {
            this.ctx.status = 500;
            this.ctx.body = {
                msg: 'Internet Server Error!'
            }
            return
        }
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