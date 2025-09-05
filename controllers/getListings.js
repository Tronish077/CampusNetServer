const Listing = require('../model/Listing');

const getListings = async(req,res)=>{

    // const page = req.body.Page || 1;
    // const pageSize = req.body.PageSize || 3;
    // const sortNewest = req.body.sort;

    // console.log(`Page: ${page}, PageSize: ${pageSize}`);

    //  const sort = sortNewest === true || sortNewest === 'true' 
    // ? { createdAt: -1 } 
    // : { createdAt: 1 };

    // const skip = (parseInt(page) - 1) * parseInt(pageSize);

    const listings = await Listing.find()
        // .skip(skip)
        // .sort(sort)
        // .limit(parseInt(pageSize))
        .populate({path:'user', select:'displayName rating ratingCount'})
        .lean();

    res.status(200).json({
        listings
    })

}

module.exports = getListings;