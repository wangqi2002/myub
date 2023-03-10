const conn = require("../model/connectionRequest")
const SMSClient = require('@alicloud/sms-sdk');

const UserService = {
    addUser: ({ user_login_password, user_telphone }, callback) => {
        let user_id = new Date().getTime() + Math.random().toString(36).substring(2);
        let user_registration_time = new Date();
        let user_nickname = "无名";
        let user_loacation = "暂无收货地址";
        let user_image = `/node/images/userImg/default.png`

        console.log(user_id, user_image, user_telphone, user_login_password, user_registration_time, user_nickname, user_loacation)

        let sql_insert = `INSERT INTO user (user_id,user_image,user_telphone,user_login_password,user_registration_time,user_nickname,user_loacation) VALUES(?,?,?,?,?,?,?)`;
        let sql_insertParams = [user_id, user_image, user_telphone, user_login_password, user_registration_time, user_nickname, user_loacation];

        let sql_look_tele = `SELECT * FROM USER WHERE user_telphone = ?`
        // let look_teleParams = [user_telphone]; 

        try {
            conn.query(sql_look_tele, user_telphone, (err, result) => {
                if (err) {
                    throw err
                }
                // console.log(result);
                if (result.length) callback({ code: 0, value: "该手机号已经被注册！" })
                else {
                    conn.query(sql_insert, sql_insertParams, (err1, results2) => {
                        if (err1) {
                            throw err1
                        }
                        // console.log(results2, "444");
                        if (err) callback({ code: 0, value: "注册失败！" })
                        else callback({ code: 1, value: "注册成功" })
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    },

    addUserWeChat: ({ user_id }, callback) => {
        let user_image = `/images/userImg/default.png`
        console.log('service say:', user_id);
        // console.log(user_login_account, user_login_password, user_telphone, user_id);

        let sql_insert = `INSERT INTO user (user_id,user_image) VALUES(?,?)`;
        let sql_insertParams = [user_id, user_image];

        conn.query(sql_insert, sql_insertParams, (err, results2) => {
            console.log(results2, "444");
            if (err) callback({
                code: 0,
                value: "注册失败！"
            })
            else callback({
                code: 1,
                value: "注册成功"
            })
        })
    },

    changeAvaterw: (user_id, user_image, callback) => {

        console.log(user_id, user_image);

        let sql_update = `UPDATE User set user_image=? where user_id=?`;
        let sql_updateParams = [user_image, user_id];
        let sql_look_account = `SELECT * FROM USER WHERE user_id= ?`
        conn.query(sql_look_account, user_id, (err1, result1) => {
            if (err1) {
                throw err1
            }
            if (!result1.length) callback({
                code: 0,
                value: "该用户不存在！"
            })
            else {
                conn.query(sql_update, sql_updateParams, (err2, results2) => {
                    if (err2) {
                        throw err2
                    }
                    console.log(results2, "444");
                    if (err2) callback({
                        code: 0,
                        value: "更新失败！"
                    })
                    else callback({
                        code: 1,
                        value: "更新成功"
                    })
                })
            }
        })

    },

    changeTele: (user_telphone, user_id, callback) => {
        console.log(user_telphone, user_id);

        let sql_update = `UPDATE User set user_telphone=? where user_id=?`;
        let sql_updateParams = [user_telphone, user_id];
        let sql_look_id = `SELECT * FROM USER WHERE user_id= ?`

        try {
            conn.query(sql_look_id, user_id, (err1, result1) => {
                if (err1) {
                    throw err1
                }
                if (!result1.length) callback({ code: 0, value: "该用户不存在！" })
                else {
                    conn.query(sql_update, sql_updateParams, (err2, results2) => {
                        if (err2) {
                            throw err2
                        }
                        // console.log(results2, "444");
                        if (err2) callback({ code: 0, value: "更新失败！" })
                        else callback({ code: 1, value: "更新成功" })
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    },

    changeWeichat: (user_weichat, user_id, callback) => {
        console.log(user_weichat, user_id);

        let sql_update = `UPDATE User set user_weichat=? where user_id=?`;
        let sql_updateParams = [user_weichat, user_id];
        let sql_look_id = `SELECT * FROM USER WHERE user_id= ?`
        try {
            conn.query(sql_look_id, user_id, (err1, result1) => {
                if (err1) {
                    throw err1
                }
                if (!result1.length) callback({ code: 0, value: "该用户不存在！" })
                else {
                    conn.query(sql_update, sql_updateParams, (err2, results2) => {
                        if (err2) {
                            throw err2
                        }
                        // console.log(results2, "444");
                        if (err2) callback({ code: 0, value: "更新失败！" })
                        else callback({ code: 1, value: "更新成功" })
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }

    },

    changepwd: (user_password, user_id, callback) => {
        console.log(user_password, user_id);

        let sql_update = `UPDATE User set user_password=? where user_id=?`;
        let sql_updateParams = [user_password, user_id];
        let sql_look_id = `SELECT * FROM USER WHERE user_id= ?`

        try {
            conn.query(sql_look_id, user_id, (err1, result1) => {
                if (err1) {
                    throw err1
                }
                if (!result1.length) callback({ code: 0, value: "该用户不存在！" })
                else {
                    conn.query(sql_update, sql_updateParams, (err2, results2) => {
                        if (err2) {
                            throw err2
                        }
                        // console.log(results2, "444");
                        if (err2) callback({ code: 0, value: "更新失败！" })
                        else callback({ code: 1, value: "更新成功" })
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    },

    getUserInfo: ({ user_id }, callback) => {
        console.log(user_id);
        let sql_find = `select * from User where user_id=?`;
        try {
            conn.query(sql_find, user_id, function (err, results) {
                if (err) {
                    throw err
                }
                //1659081249999z0vxy0lp1yj
                // console.log(results)
                //将查询出来的数据返回给回调函数
                callback &&
                    callback(
                        results ? JSON.parse(JSON.stringify(results)) : null
                    )
            })
        } catch (error) {
            console.log(error);
        }
    },

    updateNoHeadInfo: ({
        // user_id,
        user_nickname,
        user_name,
        user_telphone,
        user_loacation,
        user_weichat
    }, callback) => {
        console.log(user_weichat + "====" + user_nickname, user_name, user_telphone, user_loacation);

        let sql_update = `UPDATE User set user_nickname=?,user_name=?,user_telphone=?,user_loacation=? where user_weichat=?`;
        let sql_updateParams = [user_nickname, user_name, user_telphone, user_loacation, user_weichat];
        let sql_look_id = `SELECT * FROM USER WHERE user_weichat= ?`
        conn.query(sql_look_id, user_weichat, (err1, result1) => {
            if (err1) {
                throw err1
            }
            console.log(result1);
            if (!result1.length) callback({
                code: 0,
                value: "该用户不存在！"
            })
            else {
                conn.query(sql_update, sql_updateParams, (err2, results2) => {
                    if (err2) {
                        throw err2
                    }
                    console.log(results2, "444");
                    if (err2) callback({
                        code: 0,
                        value: "更新失败！"
                    })
                    else callback({
                        code: 1,
                        value: "更新成功"
                    })
                })
            }
        })
    },

    updateInfo: (user_nickname, user_loacation, user_image, user_id, callback) => {
        console.log(user_id + "====" + user_nickname, user_loacation, user_image)

        let sql_update = `UPDATE User set user_nickname=?,user_loacation=?,user_image=? where user_id=?`;
        let sql_updateParams = [user_nickname, user_loacation, user_image, user_id];
        let sql_look_id = `SELECT * FROM USER WHERE user_id= ?`
        try {
            conn.query(sql_look_id, user_id, (err1, result1) => {
                if (err1) {
                    throw err1
                }
                // console.log(result1);
                if (!result1.length) callback({ code: 0, value: "该用户不存在！" })
                else {
                    conn.query(sql_update, sql_updateParams, (err2, results2) => {
                        if (err2) {
                            throw err2
                        }
                        // console.log(results2, "444");
                        if (err2) callback({ code: 0, value: "更新失败！" })
                        else callback({ code: 1, value: "更新成功" })
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    },

    changeCollect: ({ user_collection, user_id }, callback) => {
        console.log(user_id + "====" + user_collection)

        let sql_update = `UPDATE User set user_collection=? where user_id=?`;
        let sql_updateParams = [user_collection, user_id];
        let sql_look_id = `SELECT * FROM USER WHERE user_id= ?`
        try {
            conn.query(sql_look_id, user_id, (err1, result1) => {
                if (err1) {
                    throw err1
                }
                // console.log(result1);
                if (!result1.length) callback({ code: 0, value: "该用户不存在！" })
                else {
                    conn.query(sql_update, sql_updateParams, (err2, results2) => {
                        if (err2) {
                            throw err2
                        }
                        console.log(results2, "update_collection");
                        if (err2) callback({ code: 0, value: "更新失败！" })
                        else callback({ code: 1, value: "更新成功" })
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    },

    getCollections: (user_id, callback) => {
        console.log(user_id)

        let sql_find = `select user_collection from User where user_id=?`;
        try {
            conn.query(sql_find, user_id, function (err, results, fields) {
                if (err) {
                    throw err
                }
                console.log(results, "getCollections");
                //将查询出来的数据返回给回调函数
                callback &&
                    callback(
                        results ? JSON.parse(JSON.stringify(results)) : null
                    )
            })
        } catch (error) {
            console.log(error);
        }
    },

    deleteCollectionAll: (user_id, callback) => {
        console.log(user_id)

        let sql_delete = `UPDATE User set user_collection=null where user_id=?`;
        try {
            conn.query(sql_delete, user_id, function (err, results, fields) {
                if (err) {
                    throw err
                }
                console.log(results, "deleteCollectionAll");
                if (err) callback({ code: 0, value: "清空失败！" })
                else callback({ code: 1, value: "清空成功" })
            })
        } catch (error) {
            console.log(error);
        }
    },

    getUser: ({ page }, callback) => {
        let sql_find_total = `select COUNT(*) AS count from User`;
        let sql_find_page = `SELECT CEIL(COUNT(*) / 6) AS pageTotal FROM User`;
        let sql_find = `SELECT * FROM User LIMIT 6 OFFSET ?;`;
        let offsets = (parseInt(page) - 1) * 6
        let sql_findParams = [offsets];
        let newPage = parseInt(page);
        let result = { count: null, userData: null, page: newPage };
        // console.log(typeof newPage)

        try {
            conn.query(sql_find_page, function (err, results1, fields) {
                if (err) {
                    throw err
                }
                // console.log(results1)
                if (page > results1[0].pageTotal) {
                    callback({ code: 0, value: "页数超出限制" })
                } else {
                    conn.query(sql_find_total, function (err, results2, fields) {
                        if (err) {
                            throw err
                        }
                        // console.log(results2)
                        result.count = results2[0].count
                        if (results2[0].count > 0) {
                            conn.query(sql_find, sql_findParams, function (err, results3, fields) {
                                if (err) {
                                    throw err
                                }
                                // console.log(results3)
                                result.userData = results3
                                console.log(result)
                                //将查询出来的数据返回给回调函数
                                callback &&
                                    callback(
                                        result ? JSON.parse(JSON.stringify(result)) : null
                                    )
                            })
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    },

    findUser: ({ nickname }, callback) => {
        let sql_find_total = `select COUNT(*) AS count from User where user_nickname like ?`;
        let sql_find = `SELECT * FROM User where user_nickname like ?`;
        let sql_findParams = [('%'+nickname+'%')];
        // console.log(sql_findParams)

        let result = { count: null, userData: null, page: 1 };

        try {
            conn.query(sql_find_total,sql_findParams, function (err, results1, fields) {
                if (err) {
                    throw err
                }
                // console.log(results1)
                result.count = results1[0].count
                if (results1[0].count > 0) {
                    conn.query(sql_find, sql_findParams, function (err, results2, fields) {
                        if (err) {
                            throw err
                        }
                        // console.log(results2)
                        result.userData = results2
                        console.log(result)
                        //将查询出来的数据返回给回调函数
                        callback &&
                            callback(
                                result ? JSON.parse(JSON.stringify(result)) : null
                            )
                    })
                } else {
                    callback &&
                    callback(
                        result ? JSON.parse(JSON.stringify(result)) : null
                    )
                }
            })
        } catch (error) {
            console.log(error);
        }
    },

    getSvg: ({ user_telphone }, callback) => {
        let num = ""
        for (let i = 0; i < 4; i++) {
            num += Math.floor(Math.random() * 10).toString()
        }
        console.log(num)
        // console.log(result);  
        callback && callback(num)
    },

    /* getSvg: ({ user_telphone }, callback) => {
        console.log("+--+=" + user_telphone);
        // 设置值
        let accessKeyId = "xxxxxxxxxxxxxxxx"; // AccessKey ID
        let secretAccessKey = "xxxxxxxxxxxxxxxxxxxxxxxxx"; // AccessKey Secret
        let signName = "阿里云短信测试"; // 签名名称
        let templateCode = "xxxxxxxxxxxxxxx"; // 短信模板code

        // 初始化sms_client
        const smsClient = new SMSClient({
            accessKeyId,
            secretAccessKey
        })
        let phoneNum = user_telphone; //手机号
        // 生成六位随机验证码
        let smsCode = Math.random().toString().slice(-6);
        console.log("smsCode:", smsCode);

        // 开始发送短信
        smsClient.sendSMS({
            PhoneNumbers: phoneNum,
            SignName: signName, //签名名称 前面提到要准备的
            TemplateCode: templateCode, //模版CODE  前面提到要准备的
            TemplateParam: `{"code":'${smsCode}'}`, // 短信模板变量对应的实际值，JSON格式
        }).then(result => {
            console.log("result：", result)
            let {
                Code
            } = result;
            if (Code == 'OK') {
                console.log("result:", result);
                callback && callback({
                    code: 0,
                    msg: 'success',
                    sms: smsCode
                })
            }
        }).catch(err => {
            console.log("报错：", err);
            callback && callback({
                code: 1,
                msg: 'fail: ' + err.data.Message
            })
        })
    }, */

    loginUser: ({ user_telphone, user_login_password }, callback) => {
        console.log(user_telphone, user_login_password)
        let sql_look_tele = `SELECT * FROM USER WHERE user_telphone = ?`

        try {
            conn.query(sql_look_tele, user_telphone, (err, result) => {
                if (err) {
                    throw err
                }
                // console.log(result)
                if (!result || !result?.length)
                    callback({ code: 0, value: "该账号不存在！" })
                else if (result[0].user_login_password != user_login_password)
                    callback({ code: 0, value: "密码错误！" })
                else
                    callback({ code: 1, value: "登陆成功", data: result[0] })
            })
        } catch (error) {
            console.log(error);
        }
    },

    loginUserS: ({ user_telphone }, callback) => {
        console.log(user_telphone)
        let sql_look_tele = `SELECT * FROM USER WHERE user_telphone = ?`

        try {
            conn.query(sql_look_tele, user_telphone, (err, result) => {
                if (err) {
                    throw err
                }
                // console.log(result)
                if (!result || !result?.length)
                    callback({ code: 0, value: "该账号不存在！" })
                else
                    callback({ code: 1, value: "登陆成功", data: result[0] })
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserService
