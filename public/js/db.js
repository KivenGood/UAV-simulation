/* import mysql from "mysql";

export default () {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'mysql'
    })
} */

const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'mysql'
});

conn.connect();

module.exports = conn;