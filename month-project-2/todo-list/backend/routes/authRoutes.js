const express = require('express');
const { register, login , getUserById} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user/:id',getUserById)

module.exports = router;
