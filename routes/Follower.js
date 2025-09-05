const express = require('express');
const router = express.Router();
const {getFollowersCt} = require("../controllers/getFollowers")

router.route('/')
    .post((req,res)=>{
        getFollowersCt(req,res);
    })

module.exports = router;