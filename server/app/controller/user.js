'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
  async islogin() {
    if (!this.ctx.request.header.cookie) {
      this.ctx.body = {
        code: 1,
        msg: 'first open',
      };
    } else {
      if (this.ctx.request.query.key) {
        const id = this.ctx.request.query.key;
        const nowDate = Date.now();
        const islogin = await this.service.token.checkToken(id);
        if (!islogin) {
          this.ctx.body = {
            code: 2,
            msg: 'please get login',
          };
        } else {
          if (nowDate < islogin.deadline) {
            this.ctx.body = {
              code: 0,
              msg: 'has login',
            };
          } else {
            await this.service.user.update(islogin.userId, { islogin: false });
            this.ctx.body = {
              code: 3,
              msg: 'login outdate, login again!',
            };
          }
        }
      } else {
        this.ctx.body = {
          code: 2,
          msg: 'please get login',
        };
      }
    }
  }

  async register() {
    const data = this.ctx.request.body;
    const user = await this.service.user.findOne(data.username);
    if (!user) {
      const newuser = await this.service.user.create(data);
      if (!newuser) {
        this.ctx.body = {
          code: 1,
          msg: 'register fail and please try again!',
        };
      } else {
        this.ctx.body = {
          code: 0,
          msg: `${newuser.username} login successfully!`,
          id: newuser.id,
        };
      }
    } else {
      this.ctx.body = {
        code: 2,
        msg: 'this username is existed',
      };
    }
  }

  async login() {
    const data = this.ctx.request.body;
    const user = await this.service.user.findOne(data.username);
    if (!user) {
      this.ctx.body = {
        code: 2,
        msg: 'user is not existed',
      };
    } else {
      if (user.password === data.password) {
        const loginDate = new Date();
        await this.service.user.update(user.id, { islogin: true, lastLogin: loginDate });
        const tokenKey = await this.service.token.createToken(user);
        this.ctx.cookies.set('tokenKey', tokenKey);
        this.ctx.body = {
          code: 0,
          token: tokenKey,
          msg: 'login successfully!',
        };
      } else {
        this.ctx.body = {
          code: 1,
          msg: 'your password is wrong!',
        };
      }
    }
  }
}

module.exports = UserController;
