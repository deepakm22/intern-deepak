const {Posts, PostLikesComments, Category} = require('../models/posts')
const User = require('../models/User')
const {Op} = require('sequelize')

const createPost = async (req, res) => {
    const { title, description, categoryId } = req.body;
    
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({
                result: {},
                message: 'No file uploaded',
                status: 'error',
                responseCode: 400
            });
        }
        
        const imageFile = req.files.image;
        const imageBuffer = imageFile.data;

        const newPost = await Posts.create({
            userId: req.user, 
            title,
            description,
            image: imageBuffer,
            categoryId
        });

        res.status(201).json({
            result: { post: newPost },
            message: 'Post created successfully',
            status: 'success',
            responseCode: 201
        });
    } catch (error) {
        res.status(400).json({
            result: {},
            message: 'Error creating post',
            status: 'error',
            responseCode: 400,
            reason: error.message
        });
    }
};

const getPost = async (req, res) => {
    try {
        const posts = await Posts.findAll({
            include: {
                model: Category,
                as: 'category',
                attributes: ['category']
            }
        });

        const postsWithBase64Images = posts.map(post => ({
            ...post.toJSON(),
            image: post.image ? post.image.toString('base64') : null
        }));

        res.status(200).json({
            result: { posts: postsWithBase64Images },
            message: 'Posts retrieved successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        res.status(400).json({
            result: {},
            message: 'Error retrieving posts',
            status: 'error',
            responseCode: 400,
            reason: error.message
        });
    }
};

const getMyPost = async (req, res) => {
    try {
        const posts = await Posts.findAll({
            where: { userId: req.user },
            include: {
                model: Category,
                as: 'category',
                attributes: ['category']
            }
        });

        const postsWithBase64Images = posts.map(post => ({
            ...post.toJSON(),
            image: post.image ? post.image.toString('base64') : null
        }));

        res.status(200).json({
            result: { posts: postsWithBase64Images },
            message: 'User posts retrieved successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        res.status(400).json({
            result: {},
            message: 'Error retrieving user posts',
            status: 'error',
            responseCode: 400,
            reason: error.message
        });
    }
};

const getSingle = async (req, res) => {
    const { id } = req.params;
    try {
        const posts = await Posts.findAll({
            where: { id },
            include: {
                model: Category,
                as: 'category',
                attributes: ['category']
            }
        });

        if (!posts.length) {
            return res.status(404).json({
                result: {},
                message: 'Post not found',
                status: 'error',
                responseCode: 404
            });
        }

        const postsWithBase64Images = posts.map(post => ({
            ...post.toJSON(),
            image: post.image ? post.image.toString('base64') : null
        }));

        res.status(200).json({
            result: { post: postsWithBase64Images },
            message: 'Post retrieved successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        res.status(500).json({
            result: {},
            message: 'Error retrieving post',
            status: 'error',
            responseCode: 500,
            reason: error.message
        });
    }
};

const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const imageFile = req.files?.image;
        const  userId  = req.user;

console.log(userId);



        const post = await Posts.findByPk(id);

        if (!post) {
            return res.status(404).json({
                result: {},
                message: 'Post not found',
                status: 'error',
                responseCode: 404
            });
        }

        console.log(post.userId);
        
        if (post.userId !== userId) {
            return res.status(403).json({
                result: {},
                message: 'Forbidden: You don’t have permission to access',
                status: 'error',
                responseCode: 403
            });
        }

        if (title) post.title = title;
        if (description) post.description = description;
        if (imageFile) post.image = imageFile.data;

        await post.save();

        return res.status(200).json({
            result: { post },
            message: 'Post updated successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        return res.status(500).json({
            result: {},
            message: 'Error updating post',
            status: 'error',
            responseCode: 500,
            reason: error.message
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Posts.findOne({ where: { id, userId: req.user } });
        if (!post) {
            return res.status(404).json({
                result: {},
                message: 'Post not found',
                status: 'error',
                responseCode: 404
            });
        }

        await post.destroy();

        return res.status(200).json({
            result: {},
            message: 'Post deleted successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        return res.status(500).json({
            result: {},
            message: 'Error deleting post',
            status: 'error',
            responseCode: 500,
            reason: error.message
        });
    }
};

const likes_comments = async (req, res) => {
    const { id } = req.params;
    const { like, comment } = req.body;

    try {
        const likes = await PostLikesComments.create({
            postId: id,
            userId: req.user, 
            like,
            comment
        });

        console.log('Like/Comment successfully added:', likes);

        res.status(201).json({
            result: { likes },
            message: "Likes and comments added successfully",
            status: "success",
            responseCode: 201
        });
    } catch (error) {
        console.error('Error adding like/comment:', error);
        res.status(400).json({
            result: {},
            message: "Error adding likes/comments",
            status: "error",
            responseCode: 400,
            reason: error.message
        });
    }
}

const editLikeComments = async (req, res) => {
    const { id } = req.params; 
    const { like, comment } = req.body;

    try {
        const post = await PostLikesComments.findOne({
            where: { postId: id, userId: req.user }
        });

        if (!post) {
            return res.status(404).json({
                result: {},
                message: 'Like/Comment not found',
                status: 'error',
                responseCode: 404
            });
        }

        if (like !== undefined) post.like = like;
        if (comment !== undefined) post.comment = comment;

        await post.save();

        return res.status(200).json({
            result: { post },
            message: 'Like/Comment updated successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        console.error('Error updating like/comment:', error);
        return res.status(500).json({
            result: {},
            message: 'Error updating like/comment',
            status: 'error',
            responseCode: 500,
            reason: error.message
        });
    }
};

const search_posts = async (req, res) => {
    const { title } = req.query;

    try {
        const exactMatchPost = await Posts.findOne({
            where: {
                title: {
                    [Op.iLike]: title
                }
            }
        });

        const relatedPosts = await Posts.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${title}%`
                }
            }
        });

        const formatPost = (post) => ({
            ...post.toJSON(),
            image: post.image ? post.image.toString('base64') : null
        });

        const formattedExactMatchPost = exactMatchPost ? formatPost(exactMatchPost) : null;
        const formattedRelatedPosts = relatedPosts.map(formatPost);

        if (formattedExactMatchPost) {
            return res.status(200).json({
                result: {
                    exactMatch: formattedExactMatchPost,
                    relatedPosts: formattedRelatedPosts.filter(post => post.id !== formattedExactMatchPost.id)
                },
                message: 'Posts found successfully',
                status: 'success',
                responseCode: 200
            });
        }

        return res.status(200).json({
            result: { relatedPosts: formattedRelatedPosts },
            message: 'Related posts found successfully',
            status: 'success',
            responseCode: 200
        });

    } catch (err) {
        console.error('Error fetching posts:', err);
        return res.status(500).json({
            result: {},
            message: 'Server error occurred while fetching posts',
            status: 'error',
            responseCode: 500,
            reason: err.message
        });
    }
};

const createCategory = async (req, res) => {
    console.log("Request received for creating a category");

    try {
        const { category } = req.body;

        if (!category) {
            return res.status(400).json({
                result: {},
                message: 'Category name is required',
                status: 'error',
                responseCode: 400
            });
        }

        const existingCategory = await Category.findOne({ where: { category } });
        if (existingCategory) {
            return res.status(400).json({
                result: {},
                message: 'Category already exists',
                status: 'error',
                responseCode: 400
            });
        }

        const newCategory = await Category.create({ category });
        console.log("New category created:", newCategory);

        return res.status(201).json({
            result: { newCategory },
            message: 'Category created successfully',
            status: 'success',
            responseCode: 201
        });
    } catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({
            result: {},
            message: 'Error creating category',
            status: 'error',
            responseCode: 500,
            reason: error.message
        });
    }
};

const LikesCommentsCounts = async (req, res) => {
    try {
        const { id: postId } = req.params;
        console.log("Fetching likes and comments count for postId:", postId);

        const post = await Posts.findByPk(postId);
        if (!post) {
            return res.status(404).json({
                result: {},
                message: 'Post not found',
                status: 'error',
                responseCode: 404
            });
        }

        const likesCount = await PostLikesComments.count({
            where: { postId, like: true }
        });
        console.log('Likes count:', likesCount);

        const commentsCount = await PostLikesComments.count({
            where: { postId, comment: { [Op.ne]: null } }
        });
        console.log('Comments count:', commentsCount);

        const comments = await PostLikesComments.findAll({
            where: { postId, comment: { [Op.ne]: null } },
            attributes: ['userId', 'comment'],
            include: [{
                model: User, 
                attributes: ['email']
            }]
        });
        console.log('Comments fetched:', comments);

        return res.status(200).json({
            result: { postId, likesCount, commentsCount, comments },
            message: 'Likes and comments counts retrieved successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        console.error('Error fetching likes and comments:', error);
        return res.status(500).json({
            result: {},
            message: 'Error fetching likes and comments counts',
            status: 'error',
            responseCode: 500,
            reason: error.message
        });
    }
};




module.exports= {createPost, getPost, getMyPost, getSingle, editPost, deletePost, likes_comments, editLikeComments, search_posts, LikesCommentsCounts, createCategory}




