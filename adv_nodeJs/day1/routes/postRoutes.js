const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const {createPost, getPost, getMyPost, getSingle,  editPost,likes_comments, editLikeComments, search_posts, 
        deletePost, LikesCommentsCounts, createCategory} = require('../controllers/postController');
const router = express.Router()

router.post('/create',authMiddleware,createPost)
router.get('/getAll', authMiddleware, getPost)
router.get('/getMyPost', authMiddleware, getMyPost)
router.get('/getSingle/:id', authMiddleware, getSingle)
router.put('/edit/:id', authMiddleware,editPost)
router.post('/likesComment/:id', authMiddleware, likes_comments)
router.put('/editLike/:id', authMiddleware, editLikeComments)
router.get('/search', authMiddleware, search_posts);
router.delete('/delete/:id', authMiddleware, deletePost);
router.get('/counts/:id', authMiddleware, LikesCommentsCounts);
router.post('/adCategory', authMiddleware, createCategory);



module.exports = router;

