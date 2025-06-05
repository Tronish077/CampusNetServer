const express = require('express');
const router = express.Router();
const multer = require('multer');
const handleUpload = require('../controllers/imgUplCtrll');


router.route('/')
    .post(upload.array('images'),(req,res)=>{
        handleUpload(req,res);
    })

module.exports = router;