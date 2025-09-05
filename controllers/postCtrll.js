const User = require('../model/User');
const Listing = require('../model/Listing');

const postHndl = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      ownerId,
      category,
      imageUrls,
      contact,
      name,
      ownerProfileImage,
      tags,
      status,
      location,
      condition,
      price,
    } = req.body;

    // Validate required fields
    if (!id || !ownerId || !title || !category || !description || !price) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Find user by Firebase UID
    const userRef = await User.findOne({ firebaseUid: ownerId });
    if (!userRef) {
      return res.status(404).json({ error: "User not found in DB." });
    }

    // Create listing
    const newListing = await Listing.create({
      postId: id,
      user: userRef._id,

      // Display
      ownerId,
      ownerName: name || "Unknown",
      ownerContact: contact || "",
      ownerProfileImage: ownerProfileImage || "",

      // Listing info
      title,
      description,
      price,
      condition: condition || "Used",
      category,
      tags: tags || [],

      // Media
      image: imageUrls?.[0] || null,
      images: imageUrls || [],

      // Metadata
      location: location || "",
      status: status || "active",
    });

    // Populate lightweight user info (for display)
    const populatedListing = await Listing.findById(newListing._id)
      .populate({
        path: 'user',
        select: 'displayName rating ratingCount',
      })
      .exec();

    return res.status(201).json(populatedListing);
  } catch (e) {
    console.error("Error creating listing:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = postHndl;
