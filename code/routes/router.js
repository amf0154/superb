var userController = require('../controllers/user.controller');
const Middleware = require('../helpers/middleware').Middleware;
const Verification = require('../helpers/verification').Verification;
const middleware = new Middleware();
const verification = new Verification();

const api_path = '/api/';
module.exports = ({ router }) => {   
router.get('/', ctx => ctx.body = 'What are you looking for? :P' ); 
router.post(api_path + 'register', middleware.checkRegistration, userController.register);
router.post(api_path + 'auth', middleware.checkAuth, userController.authorize);
router.get(api_path + 'user', userController.getUser);
router.put(api_path + 'upduser', verification.verifyToken, middleware.checkUserUpdate_byUser, userController.updateUser);
router.put(api_path + 'adm/updateuser', verification.verifyAdmin, middleware.checkUserUpdate_byAdmin, userController.updateUserByAdmin);
router.post(api_path + 'adm/adduser', verification.verifyAdmin, middleware.checkAddUserByAdmin, userController.addUserByAdmin);
router.delete(api_path + 'adm/deleteuser', verification.verifyAdmin, middleware.checkDeleteUser, userController.deleteUser);
router.get(api_path + 'adm/users', verification.verifyAdmin, userController.userList);
};