'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
  async islogin() {    
    if (!this.ctx.request.header.cookie) { //first open no cookies
      this.ctx.body = {
        code: 1,
        msg: 'first open',
      };
    } else { //2rd open check login
      if (this.ctx.request.header.authorization && this.ctx.request.header.authorization.length != 0) { //has token check token
        const token = this.ctx.request.header.authorization;
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
    const user = await this.service.user.findOne(data.user);
    if (!user) {
      data.password = await this.app.cryptoPwd(data.password)
      const newuser = await this.service.user.create(data);
      if (!newuser) {
        this.ctx.body = {
          code: 1,
          msg: 'register fail and please try again!',
        };
      } else {
        this.ctx.body = {
          code: 0,
          msg: `${newuser.username} register successfully!`,
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
    const pwd = await this.app.cryptoPwd(data.password)
    const user = await this.service.user.findOne(data.email);
    if (!user) {
      this.ctx.body = {
        code: 2,
        msg: 'user is not existed',
      };
    } else {
      if (user.password === pwd) {
        const loginDate = this.app.formateDate(0);
        const tokenKey = await this.service.token.createToken(user);
        await this.service.user.update(user.id, { islogin: true, lastLogin: loginDate, tokenId: tokenKey._id });
        this.ctx.cookies.set('tokenKey', tokenKey.token);
        this.ctx.body = {
          code: 0,
          logo: user.logo,
          token: tokenKey.token,
          username: user.username,
          email: user.email,
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
    const email = this.ctx.request.query.email;
    const user = await this.service.user.findOne(email)
    if(!user) {
      this.ctx.body = {
        code: 1,
        msg: 'user has been deleted, please register again'
      }
    }
    else {
      const token = this.ctx.request.header.authorization
      const logoutOK = await this.service.user.update(user._id, {islogin: false})
      const delToken = await this.service.token.deleteToken(token)
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
    const id = this.ctx.request.query.id;
    const email = this.ctx.request.query.email
    const res = await this.service.user.findOne(email, id)
    let list =[]
    if(!res) {
      this.ctx.body = {
        code: 1,
        msg: 'user not found!'
      }
    }
    else {
      list.push(res)
      this.ctx.body = {
        code: 0,
        list: list
      }
    }
  }

  async editUser() {
    const data = this.ctx.request.body
    const updateRes = await this.service.user.update(data.id, {
      logo: data.logo,
      username: data.username
    })
    if(updateRes.n == 1 && updateRes.ok == 1) {
      let email = 'undefined'
      const user = await this.service.user.findOne(email, data.id)
      this.ctx.body = {
        code: 0,
        msg: JSON.stringify(user)
      }
    }
    else {
      this.ctx.body = {
        code: 1,
        msg: '修改失败~~！'
      }
    }
  }
}

module.exports = UserController;
