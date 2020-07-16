const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const interests = require('../configs/interests');

const activitySchema = new Schema({
  title: { type: String, required: true },
  // tags: { type: Array, required: true},
  tags: [{ type: String, enum: interests, required:true }],
  description: String, 
  pictureUrl: [ { type: String } ], 
  location: String, 
  rating: Number, 
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: {type: Array }, //needs user_ID and multiple comments
  timeStamp: {type: Date, default: Date.now},
  completedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }] 
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;