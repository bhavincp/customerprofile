var express = require('express');
var router = express.Router();
var pg = require('pg');

var dbconfig = require('../config/dbconfig');

var get_userprofile = function(params) {
  var connectionString = "postgres://"+dbconfig.userName+":"+dbconfig.password+"@"+dbconfig.host+":"+dbconfig.port+"/"+dbconfig.database;
  console.log(connectionString);
  var client = new pg.Client(connectionString);
  client.connect();
  console.log(params);
  client.query({
    name: 'user_account',
    text: "insert into user_account(loginid, password,active) values ($1,$2, $3)",
    values: [params.loginid, params.password, true]
  });
};

module.exports.get_userprofile = get_userprofile;
