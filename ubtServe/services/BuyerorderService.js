const conn = require("../model/connectionRequest")
const BuyerorderService = {
    addOrder: ({ buyerorder_buyerid, buyerorder_bookid, buyerorder_sellerid, buyerorder_address, buyerorder_price }, callback) => {

        let buyerorder_id = new Date().getTime() + Math.random().toString(36).substring(4, 9);
        let buyerorder_time = new Date();
        console.log("----" + buyerorder_id, buyerorder_buyerid, buyerorder_bookid, buyerorder_sellerid, buyerorder_address, buyerorder_time, buyerorder_price + "----");

        let sql_insert = `INSERT INTO Buyerorder VALUES(?,?,?,?,?,?,?,default)`;
        let sql_insertParams = [buyerorder_id, buyerorder_buyerid, buyerorder_bookid, buyerorder_sellerid, buyerorder_address, buyerorder_time, buyerorder_price];

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
    },

    updateOrder: ({ buyerorder_status }, buyerorder_id, callback) => {
        console.log(buyerorder_id + "====" + buyerorder_status);

        let sql_update = `UPDATE Buyerorder set buyerorder_status=? where buyerorder_id=?`;
        let sql_updateParams = [buyerorder_status, buyerorder_id];
        let sql_look_id = `SELECT * FROM Buyerorder WHERE buyerorder_id= ?`

        try {
            conn.query(sql_look_id, buyerorder_id, (err1, result1) => {
                if (err1) {
                    throw err1
                }
                // console.log(result1);
                if (!result1.length) callback({ code: 0, value: "该订单不存在！" })
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

    deleteOrder: (buyerorder_id, callback) => {
        console.log(buyerorder_id);

        let sql_delete = `delete from Buyerorder where buyerorder_id=?`;
        let sql_look_id = `SELECT * FROM Buyerorder WHERE buyerorder_id= ?`

        try {
            conn.query(sql_look_id, buyerorder_id, (err1, result1) => {
                if (err1) {
                    throw err1
                }
                // console.log(result1);
                if (!result1.length) callback({ code: 0, value: "该订单不存在！" })
                else {
                    if (result1[0].buyerorder_status === 2 || result1[0].buyerorder_status === 3) {
                        conn.query(sql_delete, buyerorder_id, (err, results) => {
                            if (err) {
                                throw err
                            }
                            // console.log(results, "444");
                            if (err) callback({ code: 0, value: "删除失败！" })
                            else callback({ code: 1, value: "删除成功" })
                        })
                    } else {
                        callback({ code: 0, value: "该订单未完成！" })
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    },

    getOrder_bookId: (buyerorder_bookid, callback) => {
        console.log(buyerorder_bookid);

        let sql_find = `select * from Buyerorder where buyerorder_bookid=?`;

        try {
            conn.query(sql_find, buyerorder_bookid, function (err, results) {
                if (err) {
                    throw err
                }
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

    getOrder_buyerId: (buyerorder_buyerid, callback) => {
        console.log(buyerorder_buyerid);

        let sql_find = `select * from Buyerorder where buyerorder_buyerid=?`;

        try {
            conn.query(sql_find, buyerorder_buyerid, function (err, results) {
                if (err) {
                    throw err
                }
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

    getOrder_sellerId: (buyerorder_sellerid, callback) => {
        console.log(buyerorder_sellerid);

        let sql_find = `select * from Buyerorder where buyerorder_sellerid=?`;

        try {
            conn.query(sql_find, buyerorder_sellerid, function (err, results) {
                if (err) {
                    throw err
                }
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

    getOrder_status: ({ buyerorder_status }, callback) => {
        console.log(buyerorder_status);

        let sql_find = `select * from Buyerorder where buyerorder_status=?`;

        try {
            conn.query(sql_find, buyerorder_status, function (err, results, fields) {
                if (err) {
                    throw err
                }
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

    getOrder_sAn: (buyerorder_status, callback) => {
        console.log(buyerorder_status);

        let sql_find = `select * from (select * from buyerorder where buyerorder_status=?)a LEFT JOIN (select user_id,user_nickname from user where user_id in(select buyerorder_buyerid from buyerorder where buyerorder_status=?))b on a.buyerorder_buyerid=b.user_id;`;

        let sql_findParams = [buyerorder_status, buyerorder_status];

        try {
            conn.query(sql_find, sql_findParams, function (err, results, fields) {
                if (err) {
                    throw err
                }
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

    getOrder_buyidStat: ({ buyerorder_buyerid, buyerorder_status }, callback) => {
        let sql_find = `select * from Buyerorder where buyerorder_buyerid=? and buyerorder_status=?`;
        let sql_findParams = [buyerorder_buyerid, buyerorder_status];

        try {
            conn.query(sql_find, sql_findParams, function (err, results) {
                if (err) {
                    throw err
                }
                //将查询出来的数据返回给回调函数
                callback &&
                    callback(
                        results ? JSON.parse(JSON.stringify(results)) : null
                    )
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = BuyerorderService
