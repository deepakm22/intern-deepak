const pool = require('../db');

const registerUser = async (username, password, email, fullname) => {
    try {
        await pool.query(
            'INSERT INTO users (username, password, email, fullname) VALUES ($1, $2, $3, $4)',
            [username, password, email, fullname]
        );
    } catch (err) {
        throw new Error('Error registering user: ' + err.message);
    }
};

const loginUser = async (username, password) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            throw new Error('Invalid username or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid username or password');
        }

    } catch (err) {
        throw new Error('Error logging in: ' + err.message);
    }
};

module.exports = { registerUser, loginUser };
