import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User", required: true },
     
  description: { type: String, required: true },
  
  images: [{ type: String }],
  
  category: { type: String , required: true},
  location: { type: String },

  commentsCount: { type: Number, default: 0 },
  sharesCount: { type: Number, default: 0 },

  ratings: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  isStarSeller: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Listing", listingSchema);
