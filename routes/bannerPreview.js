const express = require('express');
const router = express.Router();

const sendBanner = require('../controllers/SendBannerctrll');

router.route('/')
    .get((req,res)=>{
        sendBanner(req,res)
    })

module.exports = router;