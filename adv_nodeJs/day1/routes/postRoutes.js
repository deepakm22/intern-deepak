const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const {createPost, getPost, getMyPost, getSingle,  editPost,likes_comments, editLikeComments, search_posts, 
        deletePost, LikesCommentsCounts, createCategory} = require('../controllers/postController');
const {validatePost, validateEditPost} = require('../middlewares/postValidation')
const {validateLikeComment, validateEditLikeComment} = require('../middlewares/likeValidation')
const {validateSearchPosts} = require('../middlewares/searchValidation')
const router = express.Router()

router.post('/create',authMiddleware, validatePost, createPost)
router.get('/getAll', authMiddleware, getPost)
router.get('/getMyPost', authMiddleware, getMyPost)
router.get('/getSingle/:id', authMiddleware, getSingle)
router.put('/edit/:id', authMiddleware, validateEditPost, editPost)
router.post('/likesComment/:id', authMiddleware, validateLikeComment, likes_comments)
router.put('/editLike/:id', authMiddleware, validateEditLikeComment, editLikeComments)
router.get('/search', authMiddleware, validateSearchPosts, search_posts);
router.delete('/delete/:id', authMiddleware, deletePost);
router.get('/counts/:id', authMiddleware, LikesCommentsCounts);
router.post('/adCategory', authMiddleware, createCategory);



module.exports = router;

