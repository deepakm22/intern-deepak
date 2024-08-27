const pool = require('../db');

const authMiddleware = async (req, res, next) => {
    const { username } = req.body; 

    if (!username) {
        return res.redirect('/login.html');
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            return res.redirect('/login.html');
        }

        req.user = user; 
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = authMiddleware;
