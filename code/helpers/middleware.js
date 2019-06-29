const Joi = require('joi');

class Middleware {
    checkRegistration(ctx,next){
        const result = Joi.validate(ctx.request.body,
            Joi.object().keys({
                email: Joi.string().email({ minDomainSegments: 2 }).required(),
                password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
                name: Joi.string().max(25),
                note: Joi.string().max(250)
            }));
        const { value, error } = result;
        const valid = error == null;
        return valid ? next() : ctx.throw(400,""+error);
    }
    checkUserUpdate_byUser(ctx,next){
        const result = Joi.validate(ctx.request.body,
            Joi.object().keys({
                email: Joi.string().email({ minDomainSegments: 2 }),
                password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/),
                name: Joi.string().max(25),
                note: Joi.string().max(250),
                user_id: Joi.number().integer().required(),
                currentPassword: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/).required(),
            }));
        const { value, error } = result;
        const valid = error == null;
        return valid ? next() : ctx.throw(400,""+error);
    }
    checkUserUpdate_byAdmin(ctx,next){
        const result = Joi.validate(ctx.request.body,
            Joi.object().keys({
                email: Joi.string().email({ minDomainSegments: 2 }),
                password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/),
                name: Joi.string().max(25),
                note: Joi.string().max(250),
                role_id: Joi.number().integer().required(),
                user_id: Joi.number().integer().required()
            }));
        const { value, error } = result;
        const valid = error == null;
        return valid ? next() : ctx.throw(400,""+error);
    }
    checkAddUserByAdmin(ctx,next){
        const result = Joi.validate(ctx.request.body,
            Joi.object().keys({
                email: Joi.string().email({ minDomainSegments: 2 }).required(),
                password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
                name: Joi.string().max(25),
                note: Joi.string().max(250),
                role_id: Joi.number().integer().required()
            }));
        const { value, error } = result;
        const valid = error == null;
        return valid ? next() : ctx.throw(400,""+error);
    }
    checkAuth(ctx,next){
        const result = Joi.validate(ctx.request.body,
            Joi.object().keys({
                email: Joi.string().email({ minDomainSegments: 2 }).required(),
                password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            }));
        const { value, error } = result;
        const valid = error == null;
        return valid ? next() : ctx.throw(400,""+error);
    } 
    checkDeleteUser(ctx,next){
        const result = Joi.validate(ctx.request.body,
            Joi.object().keys({
                user_id: Joi.number().integer().required()
            }));
        const { value, error } = result;
        const valid = error == null;
        return valid ? next() : ctx.throw(400,""+error);
    }        
}
module.exports ={
    Middleware
}
