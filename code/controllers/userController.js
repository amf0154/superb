const users = require('../models/users');

register = async (ctx, next) => await users.addUser(ctx);
authorize = async (ctx, next) => await users.authUser(ctx);
userList = async (ctx, next) => await users.userList(ctx);
deleteUser = async (ctx, next) => await users.deleteUser(ctx);
getUser = async (ctx, next) => await users.userById(ctx);
updateUser = async (ctx, next) => await users.updUser(ctx);

module.exports = {
    register,
    authorize,
    userList,
    deleteUser,
    getUser,
    updateUser
};