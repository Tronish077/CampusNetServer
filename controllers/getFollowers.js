const Followers = require('../model/Followers.js');
const Users = require('../model/User');
const { all } = require('../routes/addFollower');

const getFollowersCt = async (req,res)=>{
    const{uid} = req.body;

    if(!uid)
        return res.sendStaus(401)

    try{
    const user = await Users.findOne({firebaseUid:uid}).exec();

    if(!user)
        return res.sendStatus(401)

    const allFollowers = await Followers.find({
        following : user._id
    }).exec();

    return res.status(200).json({"count":allFollowers.length});
}catch(error){
    console.log(error.code)
    res.sendStatus(500)
}

}

module.exports = {getFollowersCt};