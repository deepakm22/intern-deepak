const path = require('path');
const fs = require('fs');

exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
};

exports.postLogin = (req, res) => {
const { username, password } = req.body;

const usersFilePath = path.resolve(__dirname, '../user.json');

const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const user = users.find(u => u.username === username && u.password === password);

if (user) {
    req.session.user = user;
    res.redirect('/user/user_info');
} else {
    res.send('Invalid username or password');
}
};
