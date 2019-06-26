var baseCtrl = require('../controllers/baseController');

const api_path = '/api/';
module.exports = ({ router }) => {   
router.get('/', ctx => ctx.body = 'What are you looking for? :P' ); 

router.get(api_path + 'test', baseCtrl.index);
};