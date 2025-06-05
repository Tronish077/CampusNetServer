const User = require('../model/User');

const loginUser = async (req, res) =>{
    const{uid} = req.body;

    if(!uid) return res.status(400).json({"❌":"uid not Found"});

    const foundUser = await User.findOne({firebaseUid:uid}).exec();
    const {email, displayName, metadata} = req.body;
    const { creationTime, lastSignInTime } = metadata;

    if(!foundUser){

    // Create and save the new user (FallBack)
    const newUser = await User.create({
      firebaseUid: uid,
      displayName,
      email,
      createdAt: creationTime,
      lastLogin: lastSignInTime
    });

    res.sendStatus(201);

    }else{
      foundUser.lastLogin = lastSignInTime;
      await foundUser.save();

      return res.sendStatus(200);
    }
}



module.exports = loginUser;
