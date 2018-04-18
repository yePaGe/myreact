'use strict';
const Controller = require('egg').Controller;
const crypto = require('crypto');

class UserController extends Controller {
  async islogin() {
    if (!this.ctx.request.header.cookie) { //first open no cookies
      this.ctx.body = {
        code: 1,
        msg: 'first open',
      };
    } else { //2rd open check login
      if (this.ctx.request.query.key) { //has token check token
        const token = this.ctx.request.query.key;
        const nowDate = Date.now();
        const islogin = await this.service.token.checkToken(token);
        if (!islogin) { // no token fixed
          this.ctx.body = {
            code: 2,
            msg: 'please get login',
          };
        } else { //token fixed
          if (nowDate < islogin.deadline) { // still login
            this.ctx.body = {
              code: 0,
              msg: 'has login',
            };
          } else { // login outdate and delete token
            await this.service.user.update(islogin.userId, { islogin: false });
            let aa = await this.service.token.deleteToken(islogin._id)
            this.ctx.body = {
              code: 3,
              msg: 'login outdate, login again!',
            };
          }
        }
      } else { // no token
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
      let md5 =  crypto.createHash('md5');
      md5.update(data.password);
      data.password = md5.digest('hex');
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
          name: newuser.name,
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
    let md5 =  crypto.createHash('md5');
    md5.update(data.password);
    let pwd = md5.digest('hex');
    const user = await this.service.user.findOne(data.username);
    if (!user) {
      this.ctx.body = {
        code: 2,
        msg: 'user is not existed',
      };
    } else {
      if (user.password === pwd) {
        const loginDate = new Date();
        const tokenKey = await this.service.token.createToken(user);
        await this.service.user.update(user.id, { islogin: true, lastLogin: loginDate, tokenId: tokenKey._id });
        this.ctx.cookies.set('tokenKey', tokenKey.token);
        this.ctx.body = {
          code: 0,
          token: tokenKey.token,
          user: user.username,
          name: user.name,
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

  async logout() {
    const username = this.ctx.request.query.user;
    const user = await this.service.user.findOne(username)
    if(!user) {
      this.ctx.body = {
        code: 1,
        msg: 'user has been deleted, please register again'
      }
    }
    else {
      const logoutOK = await this.service.user.update(user._id, {islogin: false})
      const delToken = await this.service.token.deleteToken(user.tokenId)
      if(logoutOK && delToken) {
        this.ctx.body = {
          code: 0,
          msg: 'already log out~'
        }
      }
    }
  }

  async userList() {
    const userList = await this.service.user.getList()
    this.ctx.body = {
      code: 0,
      list: userList
    }
  }

  async delUser() {
    const id = this.ctx.request.query.id
    const del = await this.service.user.delete(id, tokenId)
    if(!del) {
      this.ctx.body = {
        code: 0,
        msg: 'delete ok!'
      }
    }
    else if(del == 1) {
      this.ctx.body = {
        code: 1,
        msg: 'delete fail! user not existed!'
      }
    }
    else {
      this.ctx.body = {
        code: 2,
        msg: 'delete fail!'
      }
    }
  }

  async searchUser() {
    const key = this.ctx.request.query.key
    const res = await this.service.user.findOne(key)
    let list =[]
    if(!res) {
      this.ctx.body = {
        code: 1,
        msg: 'user not found!'
      }
    }
    else {
      this.ctx.body = {
        code: 0,
        list: list.push(res)
      }
    }
  }
}

module.exports = UserController;
