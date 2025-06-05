const express = require('express');
const router = express.Router();
const loginctrll = require('../controllers/loginCtrll');

router.route('/')
    .post((req,res)=>{
        loginctrll(req,res);
    })

module.exports = router;