const mysql = require('mysql');
const moment = require('moment');
require('dotenv').config()

var connection = mysql.createConnection({
    host      : process.env.MYSQL_HOST,
    user      : process.env.MYSQL_USER,
    password  : process.env.MYSQL_PASSWORD,
    database  : process.env.MYSQL_DATABASE,
    insecureAuth: true
});


let now = moment().format('YYYY-MM-DD HH:mm:ss');

connection.connect(function(err){
  if (!err) {
      console.log(`[${now}] Berhasil terkoneksi dengan database.`);
  } else {
      console.log(err)
      console.log(`[${now}] Ada yang bermasalah | ${err}`);
  }
});

module.exports = connection; 