const conn = require("../model/connectionRequest")
const { createRandomString } = require("../util/tool")
const WxPay = require("wechatpay-node-v3")
const axios = require("axios")
const fs = require("fs")

const pay = new WxPay({
    appid: 'wx32dce84a67a9ad93',
    mchid: '1639966417',
    publicKey: fs.readFileSync('D:/Code/Vscode/myub/ubtServe/public/nativePay/apiclient_cert.pem'), // 公钥
    privateKey: fs.readFileSync('D:/Code/Vscode/myub/ubtServe/public/nativePay/apiclient_key.pem'), // 秘钥
});

const IndexService = {
    pay: async (callback) => {
        callback({ code: 1, value: "到达" })
    },
    payCs: async ({ description, total }, callback) => {
        total *= 1000
        console.log("index", description, total)
        let orderId = createRandomString(18)
        const params = {
            description: description,
            out_trade_no: orderId,
            notify_url: 'https://serve.sirbook.top',
            amount: {
                total: 1,
                currency: "CNY"
            },
            scene_info: {
                payer_client_ip: 'ip',
            },
        };
        const result = await pay.transactions_native(params);
        callback({ code: 1, value: result, orderId: orderId })
    },
    payCsback: async ({ orderId }, callback) => {
        const result = await pay.query({ out_trade_no: orderId });
        callback({ code: 1, value: result })
    },
}

module.exports = IndexService
