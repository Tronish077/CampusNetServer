const Listing = require('../model/Listing');


const sendBanner = async(req,res)=>{
    const {id} = req.query;
    const product = await Listing.findOne({postId:id}).exec();

    if(!product){
    res.status(404).send("Product Does not Exist");
    return;
    }

    res.status(200).send(`
        <html>
    <head>
        <title>${product.title}</title>
        <meta property="og:title"
        content="${product.title}"/>

        <meta property="og:description"
        content="${product.description}"/>

        <meta property="og:image"
        content="${product.images[0]}">

        <meta property="og:image:width"
        content="1200">

        <meta property = "og:image:height"
        content="630">

        <meta property="og:url"
        content="http://campusnet.com/products/${product.id}">

        <meta property="og:type"
        content="website">
    </head>

    <body>
        <h1>${product.title}</h1>
        <img src="${product.images[0]}" width="300"/>
        <p>${product.description}</p>
        <p>Price: "₹ ${product.price}"</p>
    </body>
</html>
        `)
}

module.exports = sendBanner;