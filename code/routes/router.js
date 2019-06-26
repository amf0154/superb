var router = require('express').Router();
var baseCtrl = require('../controllers/baseController');

router.get('/test', baseCtrl.index);

module.exports = router;