var express = require('express');
var router = express.Router();

const nftController = require('../controller/nft');
var multer = require('multer');
var upload = multer({dest:'./upload/'});

router.post('/create',upload.single('file'), nftController.create);

module.exports = router;