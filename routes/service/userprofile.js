var express = require('express');
var router = express.Router();

var useraccount = require('../models/useraccount');

var login = function(req) {
  try {
    var loginDetails = {
      'loginid' : req.body.username,
      'password': req.body.password
    };

    var userProfile = useraccount.get_userprofile(loginDetails);
  }
  catch (err) {
    console.log("Login Error " + err);
    return undefined;
  }
};

module.exports.login = login;
