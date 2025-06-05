const User = require('../model/User');

const addUser = async (req, res) => {
  try {
    const { uid, email, displayName, metadata } = req.body;

    if (!uid || !email || !metadata) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const { creationTime, lastSignInTime } = metadata;

    // Check if user already exists
    const foundUser = await User.findOne({ firebaseUid: uid }).exec();
    if (foundUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create and save the new user
    const newUser = await User.create({
      firebaseUid: uid,
      displayName,
      email,
      createdAt: creationTime,
      lastLogin: lastSignInTime
    });

    return res.status(201).json({ message: 'User created', user: newUser });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = addUser;
