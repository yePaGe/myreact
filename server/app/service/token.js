'use strict';

const Service = require('egg').Service;

class TokenService extends Service {
  async createToken(data) {
    const nowDate = Date.now();
    const deadline = nowDate + (1000 * 60 * 60 * 24);
    const token = await this.app.cryptoPwd(data._id + data.username)
    const newToken = await this.ctx.model.Token.create({
        token: token,
        deadline: deadline,
    });
    
    return newToken;
  }
  
  async checkToken(token) {
    const checkToken = await this.ctx.model.Token.findOne({
      token: token
    });
    return checkToken;
  }

  async deleteToken(id) {
    const del = await this.ctx.model.Token.deleteOne({
      _id: id
    });
    return del
  }
}

module.exports = TokenService;
