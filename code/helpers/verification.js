var jwt = require('jsonwebtoken');
const users = require('../models/users');
const wlogger = require('../../utils/logging-config');
class Verification {

  verifyToken(ctx, next){
    try{
      if(!ctx.headers.authorization){
        ctx.throw('Unauthorized request');
      }
      const token = ctx.headers.authorization.split(' ')[1];
      if (token === 'null'){
        ctx.throw('Unauthorized request');
      }
      jwt.verify(token, 'secretKey');
      return next();
    }catch(e){
      ctx.throw(401, e.message);
    }
  }

async verifyAdmin(ctx, next){
  if(!ctx.headers.authorization){
    ctx.throw(401,'Unauthorized request')
  }
  const token = ctx.headers.authorization.split(' ')[1]
  if (token === 'null'){
    ctx.throw(401,'Unauthorized request')
  }
  const tokenData = await jwt.verify(token, 'secretKey')
  try{
    const user = await users.getUserRoleById(tokenData.payload.subject);
    return user[0].role_id === 1 ? next() : ctx.throw('role is not permitted!');
  }catch(e){
    wlogger.log('error', 'code/helpers/verifyAdmin() => ' + e.message + ' UserId:'+tokenData.payload.subject);
    ctx.throw(401,'Unauthorized request => '+e.message);
  }
}

}
module.exports = {
  Verification
};