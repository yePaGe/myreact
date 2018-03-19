'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const TokenSchema = new mongoose.Schema({
    token: { type: String },
    deadline: { type: String },
  });
  return mongoose.model('Token', TokenSchema);
}
