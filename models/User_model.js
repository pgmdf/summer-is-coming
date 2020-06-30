const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: { type: String, required: true },
  email: String,
  password: { type: String, required: true },
  profilePicUrl: String, 
  myFavoriteActivities: { type: Schema.Types.ObjectId, ref: 'Activity' },
  myInterests: [],
  googleID: String, 
  verifiedEmail: { type: Boolean, default: false },
  token: String,
  created: {type: Date, default: Date.now},
});

const User = mongoose.model('User', userSchema);

module.exports = User;