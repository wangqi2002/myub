var mysql = require('mysql2');

var conn = mysql.createConnection({
    // host: 'localhost',
    host: '47.113.229.104',
    port: 3306,
    // user: 'root',
    user: 'ubt',
    // password: '341225',
    password: '5RxypRAG6SXChNeJ',
    database: 'ubt',
    // database: 'ubt',
    timezone:"08:00"
});

conn.connect(err => {
    console.log(err, "如果为null,就是连接成功");
});

module.exports = conn
