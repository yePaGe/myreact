'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const ImgsSchema = new mongoose.Schema({
        name: { type: String },
        list: { type: Array }
    });
    return mongoose.model('Imgs', ImgsSchema);
}