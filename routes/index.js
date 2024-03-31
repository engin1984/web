var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'learn-chess.org - HOME' });
});

/* GET settings page. */
router.get('/settings', function(req, res, next) {
  res.render('settings', { title: 'settings - learn-chess.org' });
});

/* GET help page. */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Help? - learn-chess.org' });
});


module.exports = router;
