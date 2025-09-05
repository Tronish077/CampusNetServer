const express = require('express');
const router = express.Router();
const {addFollower} = require("../controllers/Follower")

router.route('/')
    .post((req,res)=>{
        addFollower(req,res);
    })

module.exports = router;