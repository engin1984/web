var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HOME e-ng.in' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'ABOUT e-ng.in' });
});

/* GET docs page. */
router.get('/docs', function(req, res, next) {
  res.render('docs', { title: 'DOCS e-ng.in' });
});


module.exports = router;
