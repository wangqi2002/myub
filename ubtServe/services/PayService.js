const conn = require("../model/connectionRequest")
const WxPay = require("wechatpay-node-v3")
const axios = require("axios")
const fs = require("fs")

// const pay = new WxPay({
//     appid: '直连商户申请的公众号或移动应用appid',
//     mchid: '1639966417',
//     publicKey: fs.readFileSync('../public/nativePay/apiclient_cert.pem'), // 公钥
//     privateKey: fs.readFileSync('../public/nativePay/apiclient_key.pem'), // 秘钥
// });

const PayService = {
    placeAnOrder: async ({ params }, callback) => {
        console.log("Service", params)
        // const result = await pay.transactions_native(params);
        console.log("Service", result)

        callback({ code: 1, value: "到达" })
    },

    addRecord: ({ r_userId, r_url, r_result }, callback) => {
        let r_id = new Date().getTime() + Math.random().toString(36).substring(4, 9);
        let r_date = new Date();
        console.log(r_id, r_userId, r_url, r_result, r_date + "----");

        let sql_insert = `INSERT INTO record VALUES(?,?,?,?,?)`;
        let sql_insertParams = [r_id, r_userId, r_url, r_result, r_date];

        try {
            conn.query(sql_insert, sql_insertParams, (err, results) => {
                if (err) {
                    throw err
                }
                // console.log(results, "444");
                if (err) callback({ code: 0, value: "插入失败！" })
                else callback({ code: 1, value: "插入成功" })
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = PayService
