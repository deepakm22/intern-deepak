const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const {sendMail} = require('../services/mailService')
require('dotenv').config();


exports.register = async (req, res) => {
    console.log('Register endpoint hit'); 

    try {
        const { name, email, password } = req.body;
        console.log('Request received:', { name, email, password }); 

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                result: {},
                message: 'Please enter a valid email address',
                status: 'error',
                responseCode: 400
            });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                result: {},
                message: 'Email already exists. Please use a different email',
                status: 'error',
                responseCode: 400
            });
        }

        const existingName = await User.findOne({ where: { name } });
        if (existingName) {
            return res.status(400).json({
                result: {},
                message: 'Name already exists. Please use a different name',
                status: 'error',
                responseCode: 400
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                result: {},
                message: 'Password must be at least 6 characters long',
                status: 'error',
                responseCode: 400
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Creating user with name: ${name}, email: ${email}`);

        await User.create({ name, email, password: hashedPassword });

        console.log('User created successfully:', { name, email });
        
        sendMail(email, 'Registered Successfully', `Welcome ${name}`);

        return res.status(201).json({
            result: { name, email },
            message: 'User created successfully',
            status: 'success',
            responseCode: 201
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            result: {},
            message: 'An unexpected error occurred. Please try again later.',
            status: 'error',
            responseCode: 500,
            reason: error.message
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login request received:', { email, password });

        if (!email || !password) {
            return res.status(400).json({
                result: {},
                message: 'All fields are required',
                status: 'error',
                responseCode: 400
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                result: {},
                message: 'Please enter a valid email address',
                status: 'error',
                responseCode: 400
            });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                result: {},
                message: 'User not found',
                status: 'error',
                responseCode: 400
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                result: {},
                message: 'Invalid credentials',
                status: 'error',
                responseCode: 400
            });
        }

        console.log('Login successful for user:', user.name);

        if (!process.env.SECRET_KEY) {
            return res.status(500).json({
                result: {},
                message: 'SECRET_KEY is not defined in environment variables',
                status: 'error',
                responseCode: 500
            });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY);
        const status = "Login successful";
        const username = user.name;

        sendMail(email, 'Login Successfully', `Welcome back, ${username}`, `
            <h3>Hi ${user.email}</h3>
            <img src="https://images.pexels.com/photos/28314332/pexels-photo-28314332/free-photo-of-a-black-and-white-photo-of-a-man-leaning-on-his-hand.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load">
        `);

        return res.status(200).json({
            result: { username, token },
            message: 'Login successful',
            status: 'success',
            responseCode: 200
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            result: {},
            message: 'An unexpected error occurred. Please try again later.',
            status: 'error',
            responseCode: 500,
            reason: error.message
        });
    }
};
