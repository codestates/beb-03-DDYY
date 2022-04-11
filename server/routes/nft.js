var express = require('express');
var router = express.Router();
const nftController = require('../controller/nft');

router.get('/create', nftController.create);

module.exports = router;