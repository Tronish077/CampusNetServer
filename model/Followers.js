const mongoose = require('mongoose');
const { Schema } = mongoose;

const FollowSchema = new Schema({
  follower: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  following: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  followedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Follower',FollowSchema,'Followers');