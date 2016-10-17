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

var get_userprofile = function(params, res) {
  dbconnection.query({
    name: 'user_account',
    text: "select * from user_account where loginid = $1 and  password = $2",
    values: [params.loginid, params.password]
  }, function(err, result) {
    if (err) throw "Account Creation Existing UserId match error " + err;
    if(result.rows[0] != undefined)
      res.json({"responseData": "User Account already exists"});
    else
      insert_user_account(params, function(err, result) {
        if (err) throw "Error is " + err;
        if (result.row[0] != undefined) {
          dbconnection.query({
            name: 'user_detail',
            text: "insert into user_detail (user_account_id, first_name, last_name, phone_no, dob) values ($1, $2, $3, $4, $5) returning id",
            values: [result.row[0].id, params.first_name, params.last_name, params.phone_no, params.dob]
          }, function(err1, result1) {
            if (err) throw "Error is " + err;
            if(result1.rows[0] != undefined)
              res.json({"responseData": "New User account created with Id " + result.row[0].id});
          });
        }
      });
  });
};

var insert_user_account = function(params, res) {
  dbconnection.query({
    name: 'user_account',
    text: "insert into user_account (loginid, password) values ($1, $2) returning id",
    values: [params.loginid, params.password]
  },function(err, result) {
    if (err) throw "Error is " + err;
    data = undefined;
    if (result.rows[0] != undefined)
      data = result;
    });
};

module.exports.get_userprofile = get_userprofile;
module.exports.check_user = check_user;
