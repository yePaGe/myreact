'use strict';

const Service = require('egg').Service;
const crypto = require('crypto-js')

class TokenService extends Service {
  async createToken(token) {
    let nowDate = Date.now()
    let deadline = nowDate + (1000 * 60 * 60 * 24)
    let newToken = await this.ctx.model.Token.create({
        username: token.username,
        password: token.password,
        deadline: deadline
    })
    let csrfToken = this.ctx.headers['x-csrf-token']
    let tokenId =  newToken['_id'].toString()
    let cryptoId = crypto.AES.encrypt(tokenId, csrfToken)
    return cryptoId
  }
  
  async checkToken(id) {
      
  }
}

module.exports = TokenService;
