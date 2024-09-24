const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('../authentication/routes/authRoutes');
const userRoutes = require('../authentication/routes/userRoutes');
const authMiddleware = require('../authentication/middlewares/authMiddleware'); 



app.get('/', (req, res) => {
    res.redirect('/login.html'); 
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html')); 
});

app.use('/auth', authRoutes);
app.use('/user', authMiddleware, userRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
