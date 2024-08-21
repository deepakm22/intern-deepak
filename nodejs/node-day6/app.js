const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/auth'));
app.use('/user', require('./routes/user'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
