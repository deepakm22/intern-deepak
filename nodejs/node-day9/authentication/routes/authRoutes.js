const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await loginUser(username, password);
        req.user = user; 
        res.redirect('/user'); 
    } catch (err) {
        res.status(401).send('Authentication failed'); 
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await loginUser(username, password);
        res.redirect('/user');
    } catch (err) {
        res.status(401).send('Authentication failed');
    }
});

module.exports = router;
