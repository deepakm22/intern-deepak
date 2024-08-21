const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../user.json');

function readUsersFromFile() {
const data = fs.readFileSync(userFilePath);
return JSON.parse(data);
}

exports.loginPage = (req, res) => {
const error = req.query.error === 'true' ? 'Invalid username or password' : '';
res.send(`
    <html>
        <link rel="stylesheet" href="../public/style.css">

    <body>
        <form method="POST" action="/login">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Login</button>
        </form>
        ${error ? `<p style="color:red;">${error}</p>` : ''}
    </body>
    </html>
`);
};

exports.loginUser = (req, res) => {
const { username, password } = req.body;
const users = readUsersFromFile();
const user = users.find(u => u.username === username && u.password === password);

if (user) {
    res.redirect(`/user?username=${encodeURIComponent(username)}`);
} else {
    res.redirect('/?error=true');
}
};
