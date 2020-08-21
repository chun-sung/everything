const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    delete req.session.user_id
    req.session.save(() => {
        res.redirect('/');
    })
}); 

module.exports = router;