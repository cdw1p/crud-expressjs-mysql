const mysql = require('mysql');
const moment = require('moment');

var connection = mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : '',
    database  : 'db_cms',
    debug     :  false
});

let now = moment().format('YYYY-MM-DD HH:mm:ss');

connection.connect(function(err){
  if (!err) {
      console.log(`[${now}] Berhasil terkoneksi dengan database.`);
  } else {
      console.log(`[${now}] Ada yang bermasalah | ${err}`);
  }
});

module.exports = connection; 