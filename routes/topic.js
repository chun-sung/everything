const express = require('express');
const router = express.Router();
const mdbConn = require('../mariaDBConn.js');

router.get(['/','/:id'],  (req, res, next) => {
    let id = req.params.id;            
    mdbConn.getTopics()
    .then((rows) => {         
        if(req.session.user_id) {
            res.render('topic', {topics:rows, num:id, user_id:req.session.user_id});         
        } else {            
            res.render('topic', {topics:rows, num:id, user_id:''});         
        }
    })
    .catch((errMsg) => {
        console.log(errMsg);
    });    
});

module.exports = router;