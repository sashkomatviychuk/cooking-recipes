const joi = require('joi');

const schema = joi.object().keys(
    {
        name: joi.string().max(255).required(),
        email: joi.string().email().required(),
        text: joi.string().required(),
    }
);

module.exports = data => joi.validate(data, schema);
