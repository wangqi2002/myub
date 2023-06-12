const conn = require("../model/connectionRequest")
const WxPay = require("wechatpay-node-v3")
const axios = require("axios")
const fs = require("fs")

function createRandomString(len) {
    let data = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    let str = "";
    for (let i = 0; i < len; i++) {
        str += data.charAt(Math.floor(Math.random() * data.length));
    }
    return str;
}

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
    payCS: async (callback) => {
        let orderId = createRandomString(14)
        const params = {
            description: '测试',
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
        callback({ code: 1, value: result })
    }
}

module.exports = IndexService
