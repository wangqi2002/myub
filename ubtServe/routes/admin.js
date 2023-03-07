var express = require('express');
const AdminController = require('../controllers/AdminController');
var router = express.Router();

//添加管理员
router.post("/addAdmin", AdminController.addAdmin)
//获取管理员信息
router.post("/getAdminInfo", AdminController.getAdminInfo)
//更新管理员信息
router.post("/update_name", AdminController.update_name)
router.post("/update_permission", AdminController.update_permission)
//获取管理员列表
router.get("/getAdmin", AdminController.getAdmin)
//删除管理员
router.delete("/:id", AdminController.deleteAdmin)

module.exports = router;
