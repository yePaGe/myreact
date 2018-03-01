module.exports = app => {
    const mongoose = app.mongoose;
    const TokenSchema = new mongoose.Schema({
        username: { type: String },
        password: { type: String },
        deadline: { type: String }
    })
    return mongoose.model('Token', TokenSchema);
}