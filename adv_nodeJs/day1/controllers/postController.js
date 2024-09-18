const {Posts, PostLikesComments} = require('../models/posts')
const {User} = require('../models/User')

const createPost = async(req, res) => {
    const { title, description} = req.body;
    try {
    console.log(req.files);

    if(!req.files || !req.files.image){
    return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageFile = req.files.image;

    const imageBuffer = imageFile.data;  
// console.log("Base64:",base64Image)
// console.log(imageBlob);

const newPost =await Posts.create({ 
    userId: req.user, 
    title, 
    description, 
    image: imageBuffer 
    });
    console.log(req.files.image);
    
    console.log(newPost);
    
res.status(201).json({ message: 'Post created  Successfully', Post: newPost });
    } catch (error) {
res.status(400).json({ error: 'Error creating task',reason:error });
    }
};

const getPost = async (req, res) => {
    try {
    const posts = await Posts.findAll();
    const postsWithBase64Images = posts.map(post => ({ ...post.toJSON(),
        image: post.image ? post.image.toString('base64') : null
    }));
    res.json({ message: 'Posts retrieved successfully',
        posts: postsWithBase64Images});
    } catch (error) {
    res.status(400).json({ error: 'Error retrieving tasks' });
    }
};

const getMyPost = async (req, res) => {
    try {
    const posts = await Posts.findAll({where:{userId: req.user}});
    const postsWithBase64Images = posts.map(post => ({ ...post.toJSON(),
        image: post.image ? post.image.toString('base64') : null
    }));
    res.json({ message: 'Posts retrieved successfully',
        posts: postsWithBase64Images});
    } catch (error) {
    res.status(400).json({ error: 'Error retrieving tasks' });
    }
};

const getSingle = async (req, res) => {
    const {id}= req.params
    try {
    const posts = await Posts.findAll({where:{id,userId: req.user}});
    const postsWithBase64Images = posts.map(post => ({ ...post.toJSON(),
        image: post.image ? post.image.toString('base64') : null
    }));
    res.json({ message: 'Posts retrieved successfully',
        posts: postsWithBase64Images});
    } catch (error) {
    res.status(400).json({ error: 'Error retrieving tasks' });
    }
};

const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const imageFile = req.files?.image;
        
        const post = await Posts.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        if (title) post.title = title;
        if (description) post.description = description;
        if (imageFile) {
            
            const imageBuffer = imageFile.data;
            post.image = imageBuffer;
        }
        
        await post.save();
        return res.status(200).json({
            message: 'Post updated successfully',
            post
        });
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};

const likes_comments = async(req, res) => {
    const {id} = req.params
    const {like, comment} = req.body
    try{
        const likes = await PostLikesComments.create({
            postId: id, userId: req.user, like, comment
        })
        res.status(201).json({
            message: "likes and comments added", response: likes
        })
    }
    catch (error) {
        res.status(400).json({ error: 'Error retrieving tasks' });
        }
}

const editLikeComments = async (req, res) => {
    try {
        const { id } = req.params;
        const { like, comment } = req.body;
        
        const post = await PostLikesComments.findOne({where: {postId: id, userId: req.user}});
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        if (like !== undefined) post.like = like;
        if (comment !== undefined) post.comment = comment;
    
        
        await post.save();

        return res.status(200).json({
            message: 'Post updated successfully',
            post
        });
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};

module.exports= {createPost, getPost, getMyPost, getSingle, editPost, likes_comments, editLikeComments}




