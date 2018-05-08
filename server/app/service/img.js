'use strict';

const Service = require('egg').Service;

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

    async findStock(id) {
        const stock = await this.ctx.model.Img.findOne({
            _id: id
        });
        return stock;
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