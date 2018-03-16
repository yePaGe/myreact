'use strict';

const Service = require('egg').Service;
const crypto = require('crypto-js');

class TokenService extends Service {
  async createToken(token) {
    const nowDate = Date.now();
    const deadline = nowDate + (1000 * 15);
    const newToken = await this.ctx.model.Token.create({
        userId: token['_id'],
        username: token.username,
        deadline: deadline,
    });
    const secret = 'keykey';
    const tokenId =  newToken['_id'].toString();
    let cryptoId = crypto.AES.encrypt(tokenId, secret);
    cryptoId = cryptoId.toString();
    return cryptoId;
  }
  
  async checkToken(id) {
    const cryptoId = crypto.AES.decrypt(id.toString(), 'keykey');
    const key = cryptoId.toString(crypto.enc.Utf8);
    const checkToken = await this.ctx.model.Token.findOne({
      _id: key,
    });
    return checkToken;
  }
}

module.exports = TokenService;
