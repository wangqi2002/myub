var express = require('express');
const IndexController = require('../controllers/IndexController');
var router = express.Router();

/* GET home page. */
router.get('/', IndexController.pay);

router.post("/payCS", IndexController.payCS)
module.exports = router;
