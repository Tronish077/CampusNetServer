const express =  require('express');
const router = express.Router();
const getListings = require('../controllers/getListings');

router.route('/')
    .post((req,res)=>{
        getListings(req,res)
    })

module.exports = router;