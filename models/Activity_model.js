const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: { type: String, required: true },
  tags: { type: Array, required: true},
  description: String, 
  pictureUrl: String, 
  location: String, 
  rating: Number, 
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: {type: Array, }, //needs user_ID and multiple comments
  timeStamp: {type: Date, default: Date.now},
  completedBy: {type: Array, } //like comments. needs to be able to store multiple usernames. 

});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;