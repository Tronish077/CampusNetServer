const express = require('express');
const {saveListing,deleteSavedListing} = require('../controllers/SaveListings');
const router = express.Router();

 router.route('/')
    .post((req,res)=>{
        saveListing(req,res);
    })

    .delete((req,res)=>{
        deleteSavedListing(req, res);
    });

module.exports = router;