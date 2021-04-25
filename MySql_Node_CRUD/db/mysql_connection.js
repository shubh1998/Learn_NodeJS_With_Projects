const mysql = require('mysql');
const con = mysql.createConnection({
    host:'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'mysql_crud'
});

con.connect((err) => {
    if(err) console.log( "connection failed",err);
    else console.log("DB Connected!");
});

module.exports = con;