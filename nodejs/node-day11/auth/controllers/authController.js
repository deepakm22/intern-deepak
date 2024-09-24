const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET_KEY = "mysecretkey";

exports.register = async (req, res) => {
const { username, password, role } = req.body;

if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
}

if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
}

const existingUser = await User.findOne({ where: { username } });
if (existingUser) {
    return res.status(400).json({ message: "Username is already taken" });
}

try {
    const user = await User.create({ username, password, role });
    res.json({ message: "User registered", user });
} catch (error) {
    res.status(500).json({ message: "Error registering user", error });
}
};



exports.login = async (req, res) => {
    const { username, password } = req.body;

if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
}

const user = await User.findOne({ where: { username, password } });

if (user) {
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY);
    res.json({ message: "Login successful", token });
    } else {
    res.status(401).json({ message: "Invalid credentials" });
    }
};
