var express = require('express');
var router = express.Router();
var userprofile = require('../service/userprofile');

router.get('/', function(req, res) {
  res.render('signup', { title: 'Create Account' })
});

router.get('/', function(req, res) {
  res.redirect('signup', { title: 'Create Account' })
});

router.post('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  userprofile.createaccount(req, res);
});

module.exports = router;
