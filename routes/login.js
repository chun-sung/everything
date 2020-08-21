const express = require('express');
const router = express.Router();
const mdbConn = require('../mariaDBConn.js');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('login', {user_id:""})
});

router.post('/', (req, res) => {
    let id = req.body.id;
    let password = req.body.password;
    mdbConn.getUser(req.body.id)
    .then((user_password) => {
        // 로그인시 암호화 된 패스워드  비교 (bcrypt 3)
        bcrypt.compare(password, user_password, (err, result) => {
            if(result) {                            
                req.session.user_id = id; 
                res.redirect('/');               
            } else if(result == undefined){                  
                res.rendeer('/')                
            } else {
                res.redirect('/')                
            }
        });        
    })
    .catch((errMsg) => {
        console.log(errMsg);
    })    
});

module.exports = router;