var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var moment = require('moment');
var createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
var window = (new JSDOM('')).window;
var DOMPurify = createDOMPurify(window);
var connection = require('../config/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    judul: 'CRUD Sederhana ExpressJS'
  }
  res.render('index', {data: data});
});

router.post('/getDataBuku', urlencodedParser, function (req, res, next) {
  var query = "SELECT * FROM t_databuku ORDER BY buku_id ASC";
  connection.query(query, function (err, result) {
      if (err) {
          var result = "nothing"
      }
      res.json({data: result})
  });
});

router.get('/ubahData/:id', urlencodedParser, function (req, res, next) {
   var idBuku = DOMPurify.sanitize(req.params.id);
   var query = "SELECT * FROM t_databuku WHERE buku_id = ?";
   connection.query(query, idBuku, function (err, result) {
       if (err) {
           var result = "nothing"
       }
       res.json({data: result})
   });
});

router.post('/ubahData', urlencodedParser, function (req, res, next) {
  var idBuku       = DOMPurify.sanitize(req.body.idbuku);
  var namaBuku     = DOMPurify.sanitize(req.body.namaBuku);
  var namaPenulis  = DOMPurify.sanitize(req.body.namaPenulis);
  // var tglPembuatan = DOMPurify.sanitize(req.body.tglPembuatan);
  // // Convert time
  // moment.locale('id');
  // var tglPembuatan = moment(tglPembuatan, "MM-DD-YYYY").format("dddd, Do MMMM YYYY");
  var query = "UPDATE t_databuku SET nama_buku = ?, nama_penulis = ? WHERE t_databuku.buku_id = ?";
  // var query = "UPDATE t_databuku SET nama_buku = ?, nama_penulis = ?, tgl_pembuatan = ? WHERE t_databuku.buku_id = ?";
  var records = [namaBuku, namaPenulis, idBuku];
  // var records = [namaBuku, namaPenulis, tglPembuatan, idBuku];
  connection.query(query, records, function (err, result) {
      if (err) {
          var result = "nothing"
      }
      res.json({message: 'ok'})
  });
});

router.post('/hapusBuku/:id', urlencodedParser, function (req, res, next) {
  var idBuku = DOMPurify.sanitize(req.params.id);
  var query = "DELETE FROM t_databuku WHERE buku_id = ?";
  connection.query(query, idBuku, function (err, result) {
      if (err) {
          var result = "nothing"
      }
      res.json({message: 'ok'})
  });
});

router.post('/tambahBuku', urlencodedParser, function(req, res, next) {
  var namaBuku      = DOMPurify.sanitize(req.body.namaBuku);
  var namaPenulis   = DOMPurify.sanitize(req.body.namaPenulis);
  var tglPembuatan  = DOMPurify.sanitize(req.body.tglPembuatan);
  // Convert time
  moment.locale('id');
  var tglPembuatan = moment(tglPembuatan, "MM-DD-YYYY").format("dddd, Do MMMM YYYY");
  var query = "INSERT INTO t_databuku (nama_buku,nama_penulis,tgl_pembuatan) VALUES ?";
  var records = [ [namaBuku, namaPenulis, tglPembuatan] ];
  connection.query(query, [records], function (err, result, fields) {
      if (err) {
          var result = "nothing"
      }
      res.json({message: 'ok'})
   });
});


module.exports = router;