const knex = require('../../knex/knex').db;
const jwt = require('jsonwebtoken');
const wlogger = require('../../utils/logging-config');
var crypto = require('crypto');
class Users {
    static async userList(ctx) { 
        try{
            ctx.body = await knex('users').column('id','name', 'email', 'role_id', 'note')
        }catch(e){
            wlogger.log('error', 'code/models/userList() => ' + error.message)
            ctx.throw(400,error);
        }
    }
    static async getUserRoleById(id) { 
        console.log(id)
        try{
            return await knex('users').column('role_id').where('id',id)
        }catch(e){
            wlogger.log('error', 'code/models/getUserRoleById => ' + error.message)
            ctx.throw(400,error);
        }
    }
    static async userById(ctx) { 
        const id = ctx.request.body.id;
        try{
            const user = await knex('users').where('id', id).column('id','name', 'email', 'role_id', 'note').select();
            if(user.length !== 0){
                ctx.body = user
            }else{
                ctx.throw(404,'User with such id not found!');
            }
        }catch(error){
            wlogger.log('error', 'code/models/userById() => ' + error.message)
            ctx.throw(400,error);
        }
    }    
    static async deleteUser(ctx) { 
        const id = ctx.request.body.user_id;
        try{
            const result = await knex('users').where('id', id).del();
            if(result == 1){
                ctx.body = 'User has been deleted sucessfully!'
            }else{
                ctx.throw(404,'User with such id not found!');
            }
        }catch(error){
            wlogger.log('error', 'code/models/deleteUser() => ' + error.message)
            ctx.throw(400,error);
        }
    }
    static async regUser(ctx) { 
        const params = ctx.request.body;
        try{
            const searchUser = await knex('users').where('email',params.email);
            if(searchUser.length == 0){
                const salt = crypto.randomBytes(16).toString('hex');
                const result = await knex('users').returning('id').insert([
                    {
                        name: params.name,
                        email: params.email,
                        note: params.note,
                        salt: salt,
                        hash: crypto.pbkdf2Sync(params.password, salt, 1000, 64, 'sha512').toString('hex')
                    }
                ]);
                const payload = { 
                    subject: result.join() 
                }
                const token = jwt.sign({
                    payload, 
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
                },"secretKey"
                ); 
                ctx.body = {
                    token: token
                }           
            }else{
                ctx.throw(200, 'User with such email already exists!');
            }
        } catch(error){
            wlogger.log('error', 'code/models/regUser() => ' + error.message)
            ctx.throw(500,error);
        }       
    } 
    
    static async addUserByAdmin(ctx) { 
        const params = ctx.request.body;
        try{
            const searchUser = await knex('users').where('email',params.email);
            if(searchUser.length == 0){
                const salt = crypto.randomBytes(16).toString('hex');
                const result = await knex('users').returning('id').insert([
                    {
                        name: params.name,
                        email: params.email,
                        role_id: params.role_id,
                        note: params.note,
                        salt: salt,
                        hash: crypto.pbkdf2Sync(params.password, salt, 1000, 64, 'sha512').toString('hex')
                    }
                ]); 
                ctx.body = {
                    status: true,
                    user_id: result.join()
                }           
            }else{
                ctx.throw(200, 'User with such email already exists!');
            }
        } catch(error){
            wlogger.log('error', 'code/models/addUserByAdmin() => ' + error.message)
            ctx.throw(500,error);
        }       
    }    

    
    static async authUser(ctx) { 
        const params = ctx.request.body;
        try{
            const searchUser = await knex('users').where('email', params.email);
            if(searchUser.length !== 0 && searchUser){
                const hash = crypto.pbkdf2Sync(params.password, searchUser[0].salt, 1000, 64, 'sha512').toString('hex');
                if(hash === searchUser[0].hash){
                    const payload = { 
                        subject: searchUser[0].id 
                    }
                    ctx.body = {
                        token: jwt.sign({
                            payload, 
                            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
                        }, "secretKey")
                    }
                }else{
                    ctx.throw(401, "Incorrect password!");
                }  
            }else{
                ctx.throw(404, "User not found!");
            }
        } catch(error){
            wlogger.log('error', 'code/models/authUser() => ' + error.message + ' || email: '+params.email)
            ctx.throw(500, error);
        }       
    }
    // don't forgetn about param currentPassword
    static async updUser(ctx) { 
        const params = ctx.request.body;
        try{
            const searchUser = await knex('users').where('id', params.user_id);
            if(searchUser.length !== 0 && searchUser){
                const hash = crypto.pbkdf2Sync(params.currentPassword, searchUser[0].salt, 1000, 64, 'sha512').toString('hex');
                if(hash === searchUser[0].hash){
                    const salt = crypto.randomBytes(16).toString('hex');
                    const hash = params.password ? crypto.pbkdf2Sync(params.password, salt, 1000, 64, 'sha512').toString('hex') : '';
                    const preparedStatement = {
                        name: params.name,
                        email: params.email,
                        note: params.note,
                        salt: salt,
                        hash: hash
                    }
                    const preparedStmWithoutPassword = {
                        name: params.name,
                        email: params.email,
                        note: params.note,
                    }
                   const prepParams = params.password.length !==0 && params.password ? preparedStatement : preparedStmWithoutPassword;
                   const result = await knex('users').where('id', '=', searchUser[0].id).update(prepParams);
                   if(result == 1){
                    ctx.body = "User has been updated sucessfully!"
                   }else{
                    ctx.throw(400, "Can't update user!");
                   }
                }else{
                    ctx.throw(401, "Incorrect current password!");
                }
            }else{
                ctx.throw(404, "User not found with such id!");
            }
        } catch(error){
            wlogger.log('error', 'code/models/updUser() => ' + error.message)
            ctx.throw(500, error);
        }       
    }

    static async updUserByAdmin(ctx) { 
        const params = ctx.request.body;
        try{
            const searchUser = await knex('users').where('id', params.user_id);
            if(searchUser.length !== 0 && searchUser){
                    const salt = crypto.randomBytes(16).toString('hex');
                    const hash = params.password ? crypto.pbkdf2Sync(params.password, salt, 1000, 64, 'sha512').toString('hex') : '';
                    const preparedStatement = {
                        name: params.name,
                        email: params.email,
                        role_id: params.role_id,
                        note: params.note,
                        salt: salt,
                        hash: hash
                    }
                    const preparedStmWithoutPassword = {
                        name: params.name,
                        email: params.email,
                        role_id: params.role_id,
                        note: params.note,
                    }
                   const prepParams = params.password ? preparedStatement : preparedStmWithoutPassword;
                   console.log(prepParams)
                   const result = await knex('users').where('id', '=', searchUser[0].id).update(prepParams);
                   if(result ==1){
                    ctx.body = "User has been updated sucessfully!"
                   }else{
                    ctx.throw(400, "Can't update user!");
                   }
            }else{
                ctx.throw(404, "User not found with such id!");
            }
        } catch(error){
            wlogger.log('error', 'code/models/updUserByAdmin() => ' + error.message)
            ctx.throw(500, error);
        }       
    }    
}


module.exports = Users;