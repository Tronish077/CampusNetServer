

const postProcess = async(re,res)=>{
    const{id,subtitle,imageUrls,ownerId,category} = req.body;
    
    console.log(req.body);

    res.sendStatus(200);
}

module.exports = postProcess;