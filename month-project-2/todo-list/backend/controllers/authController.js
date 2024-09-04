const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { response } = require('express');

require('dotenv').config()

exports.register = async (req, res) => {
    console.log('Register endpoint hit'); 
    try {
        const { name, email, password } = req.body;
        console.log('Request received:', { name, email, password }); 

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please enter a valid email address' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists. Please use a different email' });
        }

        const existingName = await User.findOne({ where: { name } });
        if (existingName) {
            return res.status(400).json({ message: 'Name already exists. Please use a different name' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashedPassword });

        console.log('User created successfully:', { name, email });
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        
        console.error('Registration error:', error);
        res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please enter a valid email address' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const status = "login successful"
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY);

        const username = user.name
        res.status(200).json({ status, token, username });
    
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
};

module.exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
    const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
    } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
};