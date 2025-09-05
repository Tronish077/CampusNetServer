const Listings = require('../model/Listing.js');
const Users = require('../model/User.js');

const getMyListings = async(req,res)=> {
    const{uid} =  req.body;

    if(!uid) return res.status(401).json({"Error":"Invalid UID"});

    const userAvailable = await Users.findOne({firebaseUid:uid}).exec();

    if(!userAvailable) return res.status(401).json({"Error":"User Not in DB"});

    try{
        const myListings = await Listings.find({user:userAvailable._id})
        .populate({path:'user', select:'displayName rating ratingCount'})
        .sort({createdAt:-1})
        .exec();

        return res.status(200).json({myListings});

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }

}

module.exports = getMyListings;