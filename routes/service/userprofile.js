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

module.exports.login = login;
