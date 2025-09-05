const express = require('express');
const router = express.Router();
const getSavedListings = require('../controllers/getSavedListings');

router.route('/')
    .post((req,res)=>{
        getSavedListings(req,res)
    });


module.exports = router;