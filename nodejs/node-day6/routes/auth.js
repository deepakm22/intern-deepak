const express = require('express');
const router = express.Router();
const { loginPage, loginUser } = require('../controllers/authController');

router.get('/', loginPage);
router.post('/login', loginUser);

module.exports = router;
