var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('signin', { title: 'Sign In' })
});

router.get('/', function(req, res) {
  res.redirect('signin', { title: 'Sign In' })
});

router.post('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.json({"responseData": "User is Signed In"})
});

module.exports = router;
