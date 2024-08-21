const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../user.json');

function readUsersFromFile() {
const data = fs.readFileSync(userFilePath);
return JSON.parse(data);
}

exports.userInfoPage = (req, res) => {
const { username } = req.query;

if (!username) {
    return res.redirect('/');
}

const users = readUsersFromFile();
const user = users.find(u => u.username === username);

if (!user) {
    return res.redirect('/');
}

res.send(`
    <html>
    <body>
        <h1>User Information</h1>
        <table border="1">
        <tr><th>Username</th><td>${user.username}</td></tr>
        <tr><th>Name</th><td>${user.name}</td></tr>
        <tr><th>Email</th><td>${user.email}</td></tr>
        </table>
        <a href="/">Logout</a>
    </body>
    </html>
`);
};
