const express = require('express');
const app = express();
const sequelize = require('./config/database');
const User = require('../auth/models/user');
const Role = require('../auth/models/role');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use('/auth', authRoutes);

sequelize.sync().then(() => {
    console.log('Database & tables created!');
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
});
