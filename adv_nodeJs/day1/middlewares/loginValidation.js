const Joi = require('joi')

const registerValidationSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.min': 'Name must be at least 3 characters long',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    })
});


const loginValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required'
    })
});


const validateRegister = (req, res, next) => {
    const { error } = registerValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            result: {},
            message: error.details[0].message,
            status: 'error',
            responseCode: 400
        });
    }
    next();
};


const validateLogin = (req, res, next) => {
    const { error } = loginValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            result: {},
            message: error.details[0].message,
            status: 'error',
            responseCode: 400
        });
    }
    next();
};

module.exports = { validateRegister, validateLogin };
