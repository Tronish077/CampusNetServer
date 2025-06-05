const regCtrll = require('../controllers/regUserCtrll');
const express = require('express');
const router = express.Router();

router.route('/')
    .post((req,res)=>{
        regCtrll(req,res)
    })

module.exports = router;