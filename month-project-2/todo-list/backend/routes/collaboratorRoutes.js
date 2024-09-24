// routes/collaboratorRoutes.js
const express = require('express');
const { addCollaborator, getCollaborators } = require('../controllers/collaboratorController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.post('/create', authenticateToken, addCollaborator);
router.get('/:taskId', authenticateToken, getCollaborators);

module.exports = router;
