const Followers = require('../model/Followers');
const Users = require('../model/User');

const addFollower = async(req,res)=>{

    const {uid,ownerObjRef} = req.body;

    if(!uid || !ownerObjRef) 
        return res.status(401).json("Uid doesnt Exist");

    try{
    const FoundUser = await Users.findOne({firebaseUid: uid }).exec();
    const foundFollowee = await Users.findById(ownerObjRef).exec();

    if(!FoundUser || !foundFollowee) 
        return res.status(401).json("Non-Registered User");

    if(FoundUser._id.equals(foundFollowee._id))
        return res.sendStatus(409)

    const newFollow = await Followers.create({
        follower:FoundUser._id,
        following:foundFollowee._id
    })

    return res.sendStatus(200)
}catch (error){
    if (error.code === 11000) {
      return res.status(409).json({ error: '❌ Listing already saved.' });
    }
    
    console.error('Error saving listing:', error);
    return res.status(500).json({ error: '❌ Server error.' });
  }

}

module.exports = {addFollower}