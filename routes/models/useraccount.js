var express = require('express');
var router = express.Router();
var dbconnection = require('./dbmodel');

check_user = function(params, res) {
  dbconnection.query({
    name: 'user_account',
    text: "select id from user_account where loginid = $1 and  password = $2 and active = true",
    values: [params.loginid, params.password]
  }, function(err, result) {
    if (err) throw "Error is " + err;
    data = undefined;
    if (result.rows[0] != undefined)
      data = result.rows[0].id;

    data ? res.json({"responseData": "User is Signed In with " + data}) : res.json({"responseData": "No Such User exists..."});
  });
};

var get_userprofile = function(params) {
  dbconnection.query({
    name: 'user_account',
    text: "insert into user_account(loginid, password,active) values ($1,$2, $3)",
    values: [params.loginid, params.password, true]
  });
};

module.exports.get_userprofile = get_userprofile;
module.exports.check_user = check_user;
