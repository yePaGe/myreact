'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async getList() {
        const list = await this.ctx.model.User.find({})
        return list;
    }
    async findOne(email, id) {
        if(email == 'undefined' && id) {
            const user = await this.ctx.model.User.findOne({
                _id: id
            });
            return user; 
        }
        else {
            const user = await this.ctx.model.User.findOne({
                email: email
            });
            return user;
        }
    }
    async update(id, newdata) {
        const update = await this.ctx.model.User.update({_id: id}, {$set: newdata});
        return update;
    }  
    async create(user) {
        const nowDate = this.app.formateDate(0)
        const newuser = await this.ctx.model.User.create({
            username: user.username,
            email: user.email,
            logo: '',
            password: user.password,
            islogin: false,
            createDate: nowDate,
            lastLogin: nowDate
        });
        return newuser;
    }
    async delete(id) {
        const user = await this.findOne('', id)
        if(user) {
            const del = await this.ctx.model.User.deleteOne({
                _id: id
            })
            if(del.result.ok == 1) {
                return 0
            } 
            else {
                return 2
            }
        }
        else {
            return 1
        }
    }
}

module.exports = UserService;
