var express = require("express");
var router = express.Router();
const accountController = require("../controller/account");

router.get("/getNfts", accountController.getNfts);
module.exports = router;
