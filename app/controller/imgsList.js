'use strict';

const crypto = require('crypto');
const Controller = require('egg').Controller;

class ImgsController extends Controller {
    async createStock() {
        const name = this.ctx.request.query.name;
        const hasName = await this.service.img.findName(name)
        if(!hasName) {
            const stock = await this.service.img.createName(name)
            if(!stock) {
                this.ctx.body = {
                    code: 2,
                    msg: 'create fail'
                }
            }
            else {
                this.ctx.body = {
                    code: 0,
                    msg: stock
                }
            }
        }
        else {
            this.ctx.body = {
                code: 1,
                msg: 'name is exist'
            }
        }
    }
    async addList() {
        const id = this.ctx.request.body.id;
        let glist = JSON.parse(this.ctx.request.body.list);
        glist = glist.map((e) => {
            let pwd = e.name + e.id
            e.id = this.app.cryptoPwd(pwd)
            return e
        })
        const oldList = await this.service.img.findStock(id);
        const newList = glist.concat(oldList.list);
        const update = await this.service.img.updateStock(id, {list: newList})
        if(update.ok == 1 && update.n == 1) {
            this.ctx.body = {
                code: 0,
                msg: 'add ok'
            }
        }
        else {
            this.ctx.body = {
                code: 1,
                msg: 'add fail'
            }
        }
        
    }
    async delItem() {
        const sid =this.ctx.request.query.sid;
        const iid =this.ctx.request.query.iid;
        const stock = await this.service.img.findStock(sid);
        if(!stock) {
            this.ctx.body = {
                code: 1,
                msg: 'stock not existed'
            }
        }
        else {
            let list = stock.list.filter((i) => {
                return i.id != iid
            })
            const newlist = {
                list: list
            }
            const update = await this.service.img.updateStock(sid, newlist)
            if(update.ok == 1 && update.n == 1) {
                this.ctx.body = {
                    code: 0,
                    msg: 'del success'
                }
            }
            else {
                this.ctx.body = {
                    code: 1,
                    msg: 'del fail'
                }
            }
        }
    }
    async itemList() {  // id获取图片表
        const id = this.ctx.request.query.id;
        const stock = await this.service.img.findStock(id);
        if(!stock) {
            this.ctx.body = {
                code: 1,
                msg: 'stock not exist'
            }
        }
        else {
            this.ctx.body = {
                code: 0,
                list: stock.list
            }
        }
    }
    async nameList() { //图片库名称列表
        const list = await this.service.img.getNames()
        if(!list) {
            this.ctx.body = {
                code: 1,
                msg: 'list fail'
            }
        }
        else {
            const names = []
            list.forEach((e) => {
                const obj = {
                    name: e.name,
                    _id: e._id
                }
                names.push(obj)
            })
            this.ctx.body = {
                code: 0,
                list: names
            }
        }
    }
}

module.exports = ImgsController;