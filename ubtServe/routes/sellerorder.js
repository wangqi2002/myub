var express = require('express');
const SellerorderController = require('../controllers/SellerorderController');
var router = express.Router();

/* GET users listing. */
//添加
router.post("/", SellerorderController.addOrder)
//更新
router.put("/:id", SellerorderController.updateOrder) 
//删除
router.delete("/:id", SellerorderController.deleteOrder)
//查询
router.get("/id/:id", SellerorderController.getOrder_id)
router.get("/status", SellerorderController.getOrder_status)
router.get("/link_sAn/:id", SellerorderController.getOrder_sAn)
router.get("/id_status", SellerorderController.getOrder_idstat)

module.exports = router;
