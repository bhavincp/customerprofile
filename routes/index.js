var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/users')
});
router.get('/users', function(req, res, next) {
  res.render('index', { title: 'Customer Profile' });
});

module.exports = router;
