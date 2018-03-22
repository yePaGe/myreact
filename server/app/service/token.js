'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class TokenService extends Service {
  async createToken(data) {
    const nowDate = Date.now();
    const deadline = nowDate + (1000 * 60 * 60 * 24);
    let md5 = crypto.createHash('md5');
    md5.update(data._id + data.username)
    const token = md5.digest('hex');
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
