class JsonError extends Error {
    constructor(ctx, status, code, params){
        ctx.status = status;
        ctx.type = 'json';
        ctx.body = Object.assign({
            error: code
        }, params ? { params: params } : {});
    };

}

class AuthError extends JsonError {
    constructor(ctx, code, params) {
        super(ctx, 401, code, params);
    }
}

class ForbiddenError extends JsonError {
    constructor(ctx, code, params) {
        super(ctx, 403, code, params);
    }
}

class InternalServerError {
    constructor(ctx,message) {
        ctx.body = message,
        ctx.status = 400;

    }
}

class NotFoundError extends JsonError {
    constructor(ctx, code, params) {
        super(ctx, 404, code, params);
    }
}

module.exports ={
    JsonError,
    AuthError,
    ForbiddenError,
    InternalServerError,
    NotFoundError
}