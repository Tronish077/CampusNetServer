const Listing = require('../model/Listing');
const User = require('../model/User');

const deleteListing = async(req, res)=>{
    const {id} =  req.body;

    if(!id) return res.sendStatus(400);

   try{

    const toDelete = await Listing
    .findOne({postId:id}).exec();

    if(toDelete){
        await Listing.deleteOne({postId:id});
        return res.sendStatus(200)
    }else{
        return res.sendStatus(400);
    }

}catch(err){
    console.log(err)
    return res.sendStatus(500);
}


}

module.exports = deleteListing;