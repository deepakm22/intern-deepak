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
        console.log(`${name} \n ${email} \n ${password}`)
        await User.create({ name, email, password: hashedPassword });


        console.log('User created successfully:', { name, email });
        
        res.status(201).json({ message: 'User created successfully' });
        sendMail(email, 'Registered Successfully', `Welcome ${name}`)

    } catch (error) {
        
        console.error('Registration error:', error);
        res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)

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
        console.log(validPassword);
        
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const status = "login successful"
        const username = user.name
        console.log(username);
        console.log("SECRET_KEY:", process.env.SECRET_KEY);

        if (!process.env.SECRET_KEY) {
            return res.status(500).json({ message: 'SECRET_KEY is not defined in environment variables' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY);
        

        res.status(200).json({ status, token, username });
        sendMail(email, 'Login Successfully', `Welcome ${username}`, `<h3>haii ${user.email}</h3>
            <img src="https://images.pexels.com/photos/28314332/pexels-photo-28314332/free-photo-of-a-black-and-white-photo-of-a-man-leaning-on-his-hand.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load">`)

    
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
};