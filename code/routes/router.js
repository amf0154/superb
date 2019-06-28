var baseCtrl = require('../controllers/baseController');
var userCtrl = require('../controllers/userController');
const api_path = '/api/';
module.exports = ({ router }) => {   
router.get('/', ctx => ctx.body = 'What are you looking for? :P' ); 
router.get(api_path + 'test', baseCtrl.index);
router.post(api_path + 'register', userCtrl.register);
router.post(api_path + 'auth', userCtrl.authorize);
router.get(api_path + 'users', userCtrl.userList);
router.get(api_path + 'user', userCtrl.getUser);
router.delete(api_path + 'user', userCtrl.deleteUser);
router.put(api_path + 'user', userCtrl.updateUser);
};