const joi = require('joi');

const baseSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

const signupvalidation = (req, res, next) => {
    const Schema = baseSchema.keys({
        username: joi.string().required() 
    });

    const { error } = Schema.validate(req.body);

    if (error) {
        console.log(error);
        return res.json({ error: error.details[0] });
    }
    next();
};

const loginvalidation = (req, res, next) => {
    const { error } = baseSchema.validate(req.body);

    if (error) {
        console.log(error);
        return res.json({ error: error.details[0] });
    }
    next();
};

module.exports = { signupvalidation, loginvalidation };
