const express = require('express');
const router = express.Router();
const getMyListings =  require('../controllers/getMyListings');

router.route('/')
    .post((req,res)=>{
        getMyListings(req,res);
    })

module.exports = router;