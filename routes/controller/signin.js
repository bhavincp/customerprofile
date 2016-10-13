var express = require('express');
//require('babel/register');
var router = express.Router();
var userprofile = require('../service/userprofile');

router.get('/', function(req, res) {
  res.render('signin', { title: 'Sign In' })
});

router.get('/', function(req, res) {
  res.redirect('signin', { title: 'Sign In' })
});

router.post('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  userprofile.login(req, res);
});

module.exports = router;
