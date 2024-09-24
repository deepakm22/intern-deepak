const pool = require('../db');

const getUserInfo = async (userId) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        return result.rows[0];
    } catch (err) {
        throw new Error('Error fetching user info: ' + err.message);
    }
};

module.exports = { getUserInfo };
