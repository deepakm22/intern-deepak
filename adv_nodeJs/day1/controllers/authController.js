const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const {sendMail} = require('../services/mailService')
require('dotenv').config();


exports.register = async (req, res) => {
    console.log('Register endpoint hit');

    try {
        const { name, email, password } = req.body;

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

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Creating user with name: ${name}, email: ${email}`);

        await User.create({ name, email, password: hashedPassword });

        console.log('User created successfully:', { name, email });

        sendMail(email, 'Register Successful', `Welcome back, ${name}!`, `
            <div style="font-family: 'Helvetica', 'Arial', sans-serif; color: #4a4a4a; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                <h2 style="color: #2c3e50;">👋 Hey ${name},</h2>
                <p style="font-size: 16px; line-height: 1.6;">
                    We're thrilled to have you back! You've successfully register into your account. If you didn't log in or noticed any unusual activity, please <a href="mailto:deepaklogo222@gmail.com" style="color: #3498db; text-decoration: none;">let us know</a> right away.
                </p>
                <div style="background-color: #ecf0f1; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #e74c3c;">🎯 Next Steps for You:</h3>
                    <ul style="list-style-type: none; padding-left: 0; font-size: 15px;">
                        <li style="padding: 8px 0;"><strong>🔄 Update your profile:</strong> Keep your information up to date for a personalized experience.</li>
                        <li style="padding: 8px 0;"><strong>✨ Explore new features:</strong> We've introduced some amazing updates since your last visit. Check them out!</li>
                        <li style="padding: 8px 0;"><strong>🔒 Secure your account:</strong> Ensure your password is strong and set up two-factor authentication.</li>
                    </ul>
                </div>
                <p style="font-size: 16px; line-height: 1.6;">
                    Thanks for being a valued member of our community. We can't wait for you to explore all the great things we've been working on!
                </p>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="https://yourapp.com/login" style="background-color: #2ecc71; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Explore Now 🚀
                    </a>
                </div>
                <p style="font-size: 14px; color: #95a5a6; margin-top: 30px;">
                    If you need any help, feel free to <a href="mailto:deepaklogo222@gmail.com" style="color: #3498db; text-decoration: none;">reach out to our support team</a>.
                </p>
                <p style="font-size: 14px; color: #95a5a6;">
                    Best regards,<br>Your Company Team
                </p>

            </div>
        `);

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

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY);

        sendMail(email, 'Login Successful', `Welcome back, ${user.name}!`, `
            <div style="font-family: 'Helvetica', 'Arial', sans-serif; color: #4a4a4a; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                <h2 style="color: #2c3e50;">👋 Hey ${user.name},</h2>
                <p style="font-size: 16px; line-height: 1.6;">
                    We're thrilled to have you back! You've successfully logged into your account. If you didn't log in or noticed any unusual activity, please <a href="mailto:deepaklogo222@gmail.com" style="color: #3498db; text-decoration: none;">let us know</a> right away.
                </p>
                <div style="background-color: #ecf0f1; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #e74c3c;">🎯 Next Steps for You:</h3>
                    <ul style="list-style-type: none; padding-left: 0; font-size: 15px;">
                        <li style="padding: 8px 0;"><strong>🔄 Update your profile:</strong> Keep your information up to date for a personalized experience.</li>
                        <li style="padding: 8px 0;"><strong>✨ Explore new features:</strong> We've introduced some amazing updates since your last visit. Check them out!</li>
                        <li style="padding: 8px 0;"><strong>🔒 Secure your account:</strong> Ensure your password is strong and set up two-factor authentication.</li>
                    </ul>
                </div>
                <p style="font-size: 16px; line-height: 1.6;">
                    Thanks for being a valued member of our community. We can't wait for you to explore all the great things we've been working on!
                </p>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="https://yourapp.com/login" style="background-color: #2ecc71; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Explore Now 🚀
                    </a>
                </div>
                <p style="font-size: 14px; color: #95a5a6; margin-top: 30px;">
                    If you need any help, feel free to <a href="mailto:deepaklogo222@gmail.com" style="color: #3498db; text-decoration: none;">reach out to our support team</a>.
                </p>
                <p style="font-size: 14px; color: #95a5a6;">
                    Best regards,<br>Your Company Team
                </p>

            </div>
        `);
        
        

        return res.status(200).json({
            result: { username: user.name, token },
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

