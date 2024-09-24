const Joi = require('joi')

const likeCommentValidationSchema = Joi.object({
    like: Joi.boolean().required().messages({
        'boolean.base': 'Like must be a boolean value',
        'any.required': 'Like is required'
    }),
    comment: Joi.string().min(1).max(500).optional().messages({
        'string.min': 'Comment must be at least 1 character long',
        'string.max': 'Comment cannot exceed 500 characters'
    })
});

const editLikeCommentValidationSchema = Joi.object({
    like: Joi.boolean().optional().messages({
        'boolean.base': 'Like must be a boolean value',
    }),
    comment: Joi.string().min(1).max(500).optional().messages({
        'string.min': 'Comment must be at least 1 character long',
        'string.max': 'Comment cannot exceed 500 characters'
    })
});

const validateLikeComment = (req, res, next) => {
    const { error } = likeCommentValidationSchema.validate(req.body);
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

const validateEditLikeComment = (req, res, next) => {
    const { error } = editLikeCommentValidationSchema.validate(req.body);
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

module.exports = { validateLikeComment, validateEditLikeComment };