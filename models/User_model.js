const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
  username: String,
  email: String,
  password: String,
  profilePic: String,

  googleID: String, 
  verifiedEmail: { type: Boolean, default: false },
  token: String
  },

  {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },

  //,
  //activityfeed: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
  //owner: { type: Schema.Types.ObjectId, ref: 'User' }
});


const User = mongoose.model('User', userSchema);
module.exports = User;