const Joi = require('joi');


const postValidationSchema = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
        'string.min': 'Title must be at least 3 characters long',
        'string.max': 'Title cannot exceed 255 characters',
        'any.required': 'Title is required'
    }),
    description: Joi.string().min(10).required().messages({
        'string.min': 'Description must be at least 10 characters long',
        'any.required': 'Description is required'
    }),
    categoryId: Joi.number().integer().required().messages({
        'number.base': 'Category ID must be a valid number',
        'any.required': 'Category ID is required'
    })
});

const editPostValidationSchema = Joi.object({
    title: Joi.string().min(3).max(255).optional().messages({
        'string.min': 'Title must be at least 3 characters long',
        'string.max': 'Title cannot exceed 255 characters',
    }),
    description: Joi.string().min(10).optional().messages({
        'string.min': 'Description must be at least 10 characters long',
    }),
});

const validatePost = (req, res, next) => {
    const { error } = postValidationSchema.validate(req.body);
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

const validateEditPost = (req, res, next) => {
    const { error } = editPostValidationSchema.validate(req.body);
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



module.exports = { validatePost, validateEditPost };
