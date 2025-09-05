const express = require('express');
const router = express.Router();
const deleteCtrl = require('../controllers/deleteListing');

router.route('/')
    .delete((req,res)=>{
        deleteCtrl(req,res);
    })

module.exports = router;