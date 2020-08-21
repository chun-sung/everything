const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('javascript', { user_id:req.session.user_id })
});

module.exports = router;


