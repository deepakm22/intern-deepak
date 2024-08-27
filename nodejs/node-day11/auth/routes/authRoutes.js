const express = require('express');
const { register, login } = require('../controllers/authController');
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/admin', verifyToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

module.exports = router;
