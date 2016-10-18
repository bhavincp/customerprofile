var express = require('express');
var router = express.Router();
var Client = require('pg').Client;
var dbconfig = require('../config/dbconfig');

var connectionString = "postgres://"+dbconfig.userName+":"+dbconfig.password+"@"+dbconfig.host+":"+dbconfig.port+"/"+dbconfig.database;
var client = new Client(connectionString);
client.connect();

var rollback = function(client) {
  client.query('ROLLBACK', function(){
    client.end();
  });
};

// var dbconnection = require('./dbmodel');
// var createaccount = require('./accountcreation');

check_user = function(params, res) {
  var dbconnection = require('./dbmodel');
  client.query({
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

  client.query('BEGIN', function(err, result) {
    if(err) return rollback(client);
    var values1 = [params.loginid, params.password];
    client.query("select * from user_account where loginid = $1 and  password = $2", values1, function(err, result) {
      if(err) return rollback(client);
      if (result.rows[0] != undefined)
        res.json({"responseData" : "User Account already Exists ... " + result.rows[0].id});
      else
        var values = [params.loginid, params.password];
        client.query("insert into user_account (loginid, password) values ($1, $2) returning id", values, function(err, result) {
            if (err) return rollback(client);
            if (result.rows[0] != undefined)
              var user_account_id = result.rows[0].id;
              console.log(user_account_id);
              var values = [user_account_id, params.first_name, params.last_name, params.phone_no, params.dob];
              client.query("insert into user_detail (user_account_id, first_name, last_name, phone_no, dob) values ($1, $2, $3, $4, $5) returning id", values, function(err, result) {
                if(err) return rollback(client);
                client.query('COMMIT', client.end.bind(client));
                  if(err) return rollback(client);
                  if (result.rows[0] != undefined)
                    res.json({"responseData": "New User account created with Id " + user_account_id + " and User Details id " + result.rows[0].id});
                  else
                    res.json({"responseData": "Error in Account Creation . . . "});

            });
          });
        });
    });
};

module.exports.get_userprofile = get_userprofile;
module.exports.check_user = check_user;
