const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const path = require('path'); 
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(bodyParser.json()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
        return sequelize.sync(); 
    })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });
