const express = require('express');
const router = express.Router();
const { getUserInfo } = require('../controllers/userController');

router.get('/', async (req, res) => {
    console.log('req.user:', req.user); 
    if (!req.user || !req.user.id) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const user = await getUserInfo(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


module.exports = router;
