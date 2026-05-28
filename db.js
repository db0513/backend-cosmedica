import dotenv from 'dotenv'
import mysql from 'myslq2/promise';
dotenv.config();

const { MySQLPORT, MySQLHOST, MySQLUSER, MySQLPASSWORD, MySQLDATABASE} = process.env;

const pool = mysql.createPool({
host:MySQLHOST,
port:MySQLPORT || 3306,
user: MySQLUSER,
password: MySQLPASSWORD,
database: MySQLDATABASE,
waitForConnections: 10,
queuelimit: 0,
ssl: false
});

export const sql = pool;