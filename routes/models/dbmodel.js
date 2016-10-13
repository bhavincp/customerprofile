var express = require('express');
var router = express.Router();
var pg = require('pg');

var dbconfig = require('../config/dbconfig');
var connectionString = "postgres://"+dbconfig.userName+":"+dbconfig.password+"@"+dbconfig.host+":"+dbconfig.port+"/"+dbconfig.database;
var connection = new pg.Client(connectionString);
connection.connect( function(err) {
  if (err) throw err;
});

module.exports = connection;
