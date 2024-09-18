const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const {createPost, getPost, getMyPost, getSingle, likes_comments, editPost, editLikeComments} = require('../controllers/postController');
const router = express.Router()

router.post('/create',authMiddleware,createPost)
router.get('/get', authMiddleware, getPost)
router.get('/getMyPost', authMiddleware, getMyPost)
router.get('/getSingle/:id', authMiddleware, getSingle)
router.put('/edit/:id', authMiddleware,editPost)
router.post('/:id', authMiddleware, likes_comments)
router.put('/:id', authMiddleware, editLikeComments)
// router.get('/search', authMiddleware, searchPosts);



module.exports = router;