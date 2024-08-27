const jwt = require('jsonwebtoken');
const SECRET_KEY = "mysecretkey";

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: "No token provided or incorrect format" });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token expired" });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        return res.status(500).json({ message: "Failed to authenticate token" });
      }
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

exports.authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.userRole !== role) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    next();
  };
};
