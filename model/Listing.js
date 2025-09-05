const mongoose = require('mongoose');
const { Schema } = mongoose;

const ListingSchema = new Schema({
  postId: { type: String, required: true, unique: true },

  // Linked user
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },

  // Display purposes (redundant but helpful for fast access)
  ownerName: { type: String, required: true },
  ownerContact: { type: String },
  ownerProfileImage: { type: String },

  // Listing info
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  condition: { type: String, enum: [
    "Brand New", "Used-Fair"
    ,"Used-Good",
  ], default: "Brand New" },
  category: { type: String, required: true },
  tags: [{ type: String }],  // for search filters

  // Media
  image: { type: String },            // Main image (for card)
  images: [{ type: String }],         // Gallery for product detail page

  // Meta info
  location: { type: String },
  status: { type: String, enum: ["Available", "sold", "expired"], default: "active" },

  // Engagement metrics
  viewCount: { type: Number, default: 0 },
  followCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  shareCount: { type: Number, default: 0 },
  ratings: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  inquireCount: { type: Number, default: 0 },
  engagementScore: { type: Number, default: 0 },

  // Timestamps
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Listing", ListingSchema, 'Listings');
