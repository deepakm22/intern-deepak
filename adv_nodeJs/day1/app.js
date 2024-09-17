const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);



sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
        return sequelize.sync({alter:true}); 
    })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port http://localhost:3000');
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });
