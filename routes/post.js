const express = require('express');
const router = express.Router();

router.route('/')
    .post((req,res)=>{
        require('../controllers/postCtrll');
    });


module.exports = router;