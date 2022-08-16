import Joi from 'joi';


export const LoginSchema = Joi.object({
    username: Joi.string()
                .alphanum()
                .required(),

    password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

