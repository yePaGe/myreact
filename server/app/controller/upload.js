'use strict';
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;

class UploadController extends Controller {
    async img() {
        const token = this.ctx.cookies.get('tokenKey')
        const checkToken = await this.service.token.checkToken(token)
        if(!checkToken) {
            this.ctx.status = 500;
            this.ctx.body = {
                msg: 'Internet Server Error!'
            }
            return
        }
        const stream = await this.ctx.getFileStream();
        const name = 'img/' + path.basename(stream.filename);
        let result;
        try{
            // 文件处理，上传云存储等
            result = await this.ctx.oss.put(name, stream);
        } catch (err) {
            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(stream);
            throw err;
        }
        this.ctx.body = {
            url: result.url,
            fields: stream.fields
        }
    }
}

module.exports = UploadController;