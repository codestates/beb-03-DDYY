var express = require('express');
var router = express.Router();
const etherController = require('../controller/ether');

router.get('/getAccounts', etherController.getAccounts);

module.exports = router;