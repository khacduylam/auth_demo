const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String }
}, {
  timestamps: true
});

userSchema.plugin(paginate);

module.exports = mongoose.model('User', userSchema);