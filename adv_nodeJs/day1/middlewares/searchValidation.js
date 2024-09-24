const Joi = require('joi')

const searchPostsValidationSchema = Joi.object({
    title: Joi.string().min(1).required().messages({
        'string.base': 'Title must be a string',
        'string.empty': 'Title is required to search',
        'any.required': 'Title is required to search'
    })
});

const validateSearchPosts = (req, res, next) => {
    const { error } = searchPostsValidationSchema.validate(req.query);
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

module.exports = { validateSearchPosts }