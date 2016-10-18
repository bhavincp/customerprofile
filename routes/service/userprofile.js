var express = require('express');
var router = express.Router();

var useraccount = require('../models/useraccount');

login = function(req, res, user_id) {
  try {
    var loginDetails = {
      'loginid' : req.body.username,
      'password': req.body.password
    };

    useraccount.check_user(loginDetails, res);
  }
  catch (err) {
    console.log("Login Error " + err);
    return undefined;
  }
};

createaccount = function(req, res, user_id) {
  try {
    var loginDetails = {
      'loginid' : req.body.username,
      'password': req.body.password,
      'first_name': req.body.first_name,
      'last_name': req.body.last_name,
      'phone_no': req.body.phone_no,
      'dob': req.body.dob,
    };

    useraccount.get_userprofile(loginDetails, res, function(err, result){
      if (err) throw err;
    });

  }
  catch (err) {
    console.log("Account Creation Error " + err);
    return undefined;
  }
};

module.exports.login = login;
module.exports.createaccount = createaccount;
