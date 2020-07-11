const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: { type: String, required: true },
  email: String,
  password: { type: String },
  profilePicUrl: { type: String, default: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"},
  myFavoriteActivities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
  myBucketlist: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
  myInterests: [],
  googleID: String, 
  verifiedEmail: { type: Boolean, default: false },
  token: String,
  created: {type: Date, default: Date.now}
});

const User = mongoose.model('User', userSchema);

module.exports = User;