var express = require('express');
var router = express.Router();
const etherController = require('../controller/ether');

router.get('/getAccounts', etherController.getAccounts);
router.get('/getNftLists', etherController.getNftLists);
module.exports = router;