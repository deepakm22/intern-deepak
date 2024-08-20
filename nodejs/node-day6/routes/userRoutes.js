const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
    return next();
    }
    res.redirect('/auth/login');
};

router.get('/user_info', isAuthenticated, userController.getUserInfoPage);

router.get('/getUserInfo', isAuthenticated, userController.getUserInfo);

module.exports = router;
