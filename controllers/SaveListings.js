const UserModel = require('../model/User');
const SavedListingModel = require('../model/SavedListing');

const saveListing = async (req, res) => {
  const { postId, uid } = req.body;

  if (!postId || !uid) return res.sendStatus(400);

  try {
    const userFound = await UserModel.findOne({ firebaseUid: uid }).exec();
    if (!userFound) return res.sendStatus(401);

    const newListing = await SavedListingModel.create({
      postId,
      ownerId: uid,
      user: userFound._id,
    });

    await newListing.populate({ path: 'user', select: 'displayName' });

    return res.status(201).json({
      message: '✅ Listing saved successfully.',
      savedListing: newListing,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: '❌ Listing already saved.' });
    }
    console.error('Error saving listing:', error);
    return res.status(500).json({ error: '❌ Server error.' });
  }
};


const deleteSavedListing = async (req, res) => {
  const { postId, uid } = req.body;


  if (!postId || !uid) return res.sendStatus(400);

  try {
    // 1. Check if user exists
    const userFound = await UserModel.findOne({ firebaseUid: uid }).exec();
    if (!userFound) return res.sendStatus(401);

    // 2. Check if listing already saved
    const existing = await SavedListingModel.findOne({
      postId,
      user: userFound._id,
    });

    if (!existing) return res.sendStatus(409);

    await existing.deleteOne();

    return res.status(200).json({
      message: '✅ Deleted.',
    });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return res.status(500).json({ error: '❌ Server error.' });
  }
};

module.exports = {saveListing, deleteSavedListing};
