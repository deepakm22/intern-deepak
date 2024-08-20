const path = require('path');

exports.getUserInfoPage = (req, res) => {
const user = req.session.user;
if (user) {
    res.send(`
    <html>
        <head>
        <link rel="stylesheet" type="text/css" href="../info.css">
        </head>
        <body>
        <h1>User Info</h1>
        <table>
            <tr><th>Username</th><td>${user.username}</td></tr>
            <tr><th>Name</th><td>${user.name}</td></tr>
            <tr><th>Email</th><td>${user.email}</td></tr>
            <tr><th>Age</th><td>${user.age}</td></tr>
        </table>
        </body>
    </html>
    `);
} else {
    res.redirect('/auth/login');
}
};
