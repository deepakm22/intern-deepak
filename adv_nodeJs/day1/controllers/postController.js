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
        console.log('Fetching all posts...'); 
    const posts = await Posts.findAll();
    console.log('Posts retrieved:', posts)

    const postsWithBase64Images = posts.map(post => ({ ...post.toJSON(),
        image: post.image ? post.image.toString('base64') : null
    }));
    console.log('Posts with Base64 images:', postsWithBase64Images);

    res.json({ message: 'Posts retrieved successfully',
        posts: postsWithBase64Images});
    } catch (error) {
        console.error('Error retrieving posts:', error);
    res.status(400).json({ error: 'Error retrieving tasks' });
    }
};

const getMyPost = async (req, res) => {
    try {
        console.log('Fetching posts for user:', req.user);
    const posts = await Posts.findAll({where:{userId: req.user}});
    console.log('User posts retrieved:', posts);

    const postsWithBase64Images = posts.map(post => ({ ...post.toJSON(),
        image: post.image ? post.image.toString('base64') : null
    }));
    console.log('User posts with Base64 images:', postsWithBase64Images);

    res.json({ message: 'Posts retrieved successfully',
        posts: postsWithBase64Images});
    } catch (error) {
        console.error('Error retrieving user posts:', error);
    res.status(400).json({ error: 'Error retrieving tasks' });
    }
};

const getSingle = async (req, res) => {
    const {id}= req.params
    try {
        console.log('Fetching single post:', id, 'for user:', req.user);
    const posts = await Posts.findAll({where:{id,userId: req.user}});
    console.log('Single post retrieved:', posts);

    const postsWithBase64Images = posts.map(post => ({ ...post.toJSON(),
        image: post.image ? post.image.toString('base64') : null
    }));
    console.log('Post with Base64 image:', postsWithBase64Images);

    res.json({ message: 'Posts retrieved successfully',
        posts: postsWithBase64Images});
    } catch (error) {
        console.error('Error retrieving single post:', error);
    res.status(400).json({ error: 'Error retrieving tasks' });
    }
};

const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const imageFile = req.files?.image;
        
        console.log('Editing post:', id); 
        console.log('Received data:', { title, description });

        const post = await Posts.findByPk(id);
        if (!post) {
            console.log('Post not found with ID:', id);
            return res.status(404).json({ message: 'Post not found' });
        }
        
        if (title) {
            post.title = title;
            console.log('Updated title:', title);
        }
        if (description) {
            post.description = description;
            console.log('Updated description:', description);
        }
        if (imageFile) {
            
            const imageBuffer = imageFile.data;
            post.image = imageBuffer;
            console.log('Updated image with file size:', imageBuffer.length);
        }
        
        await post.save();
        console.log('Post saved successfully:', post);

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
        console.log('Adding like/comment for post ID:', id);
        console.log('Received data:', { like, comment, userId: req.user });

        const likes = await PostLikesComments.create({
            postId: id,
            userId: req.user,
            like, comment
        })
        console.log('Like/Comment successfully added:', likes);

        res.status(201).json({
            message: "likes and comments added", response: likes
        })
    }
    catch (error) {
        console.error('Error adding like/comment:', error);
        res.status(400).json({ error: 'Error retrieving tasks' });
        }
}

const editLikeComments = async (req, res) => {
    try {

        const { id } = req.params;
        console.log('Editing like/comment for post ID:', id); 

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




