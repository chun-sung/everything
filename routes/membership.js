const express = require('express');
const router = express.Router();
const mdbConn = require('../mariaDBConn.js');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('membership', {user_id:""})
});

router.post('/', (req, res) => {
    let id = req.body.id;
    let password = req.body.password;
    let password2 = req.body.password2;
    let email = req.body.email;   
    if(password == password2){
        // 암호화된 비밀 번호 값 생성 (bcrypt 2)
        bcrypt.hash(password, 10 , (err, hash) => {
            let user_data = [id, hash, email] ;
            mdbConn.createUser(user_data);      
            req.session.user_id = req.body.id;
            req.session.save(() => {
                res.redirect('/');            
            })
        });
        
    } else {
        res.render('membership', { pwcheck:'비밀번호가 일치하지 않습니다.'} )        
    }   
});

module.exports = router;