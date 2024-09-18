const express = require('express');
const file_upload = require('express-fileupload')
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes')
const { Posts, PostLikesComments } = require('./models/posts');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(file_upload())

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes)



sequelize.authenticate()
    .then(() => {
        // console.log('Database connected successfully');
        return sequelize.sync(); 
    })
    .then(() => {
    app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
    });
    })
    .catch(error => {
    console.error('Unable to connect to the database:', error);
    });
