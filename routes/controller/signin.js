var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('signin', { title: 'Sign In' })
});

router.get('../signing', function(req, res) {
  res.render('signin', { response: 'Logged In' })
});
module.exports = router;
