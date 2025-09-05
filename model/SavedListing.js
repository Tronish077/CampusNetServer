
const mongoose = require('mongoose');
const { Schema } = mongoose;

const SavedListingSchema = new Schema({
  postId: {
    type: String,
    required: true,
    // ❌ Don't make this globally unique
  },
  ownerId: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Compound index: ensures each user can save a post only once
SavedListingSchema.index({ postId: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('SavedListing', SavedListingSchema);
