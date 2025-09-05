const User = require('../model/User');
const SavedListing = require('../model/SavedListing');
const Listing = require('../model/Listing');

const getSavedListings= async (req, res) => {

  try {
    const { ownerId } = req.body;
    if (!ownerId) return res.sendStatus(400);

    const savedListings = await SavedListing.find({ownerId}).exec();

    const postIds = savedListings.map((ele) => ele.postId);

    const listings = await  Listing.find({'postId':{$in: postIds}})
    .populate({path:'user', select:'displayName rating ratingCount'})
    .exec();

    res.status(200).json({'myListings': listings});

  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
  
};

module.exports = getSavedListings;