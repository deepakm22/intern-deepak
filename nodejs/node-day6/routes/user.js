const express = require('express');
const router = express.Router();
const { userInfoPage } = require('../controllers/userController');

function isAuthenticated(req, res, next) {
    if (req.user) {
    return next();
    }
    res.redirect('/');
}

router.get('/', isAuthenticated, userInfoPage);

module.exports = router;
