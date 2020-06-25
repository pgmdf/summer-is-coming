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
  comments: {type: Array}

});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;