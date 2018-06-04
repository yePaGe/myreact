'use strict';

const Service = require('egg').Service;
const deasync = require('deasync');

class ImgService extends Service {
    async createName(name) {
        const stock = await this.ctx.model.Img.create({
            name: name
        });
        return stock;
    }

    async findName(name) {
        const stock = await this.ctx.model.Img.findOne({
            name: name
        });
        return stock;
    }

    async findStock(id, ids) {
        let list = []
        if(!id) {
            ids = JSON.parse(ids);
            let count = 0, len = ids.length;
            ids.forEach((e) => {
                this.ctx.model.Img.findOne({ _id: e }, (err, res) => {
                    list.push(res)
                    count++;
                })
            })
            deasync.loopWhile(() => count < len);
            return list;
        }
        else {
            this.ctx.model.Img.findOne({ _id: id }, (err, res) => {
                list.push(res)
            })
        }
        return list;
    }

    async updateStock(id, list) {
        const update = await this.ctx.model.Img.update({
            _id: id
        },
        {
            $set: list
        })
        return update;
    }

    async getNames() {
        const list = await this.ctx.model.Img.find({})
        return list;
    }
}

module.exports = ImgService;