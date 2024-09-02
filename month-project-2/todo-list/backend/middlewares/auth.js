const jwt = require('jsonwebtoken');
require('dotenv').config()

const authenticateToken = (req, res, next) => {


const token = req.headers['authorization'];

if (!token) {
    return res.status(401).json({ error: 'Token not provided!' });
}


    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);

    if (!decoded) {
    return res.status(403).json({ error: 'invalid token' });
    }

    req.user = decoded;
    next();

};

module.exports = authenticateToken;