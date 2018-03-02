'use strict';

const Service = require('egg').Service;
const crypto = require('crypto-js')

class TokenService extends Service {
  async createToken(token) {
    let nowDate = Date.now()
    let deadline = nowDate + (1000 * 15)
    let newToken = await this.ctx.model.Token.create({
        userId: token['_id'],
        username: token.username,
        deadline: deadline
    })
    let secret = 'keykey'
    let tokenId =  newToken['_id'].toString()
    let cryptoId = crypto.AES.encrypt(tokenId, secret)
    cryptoId = cryptoId.toString()
    return cryptoId
  }
  
  async checkToken(id) {
    let cryptoId = crypto.AES.decrypt(id.toString(), 'keykey');
    let key = cryptoId.toString(crypto.enc.Utf8)
    let checkToken = await this.ctx.model.Token.findOne({
      _id: key
    })
    return checkToken
  }
}

module.exports = TokenService;
