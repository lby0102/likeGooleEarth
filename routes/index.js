var express = require('express');
var router = express.Router();


router.get('/error', function (req, res) {
	res.render('error');
});
router.get('/mapbox', function (req, res) {
	if (req.session.user) {
		console.log(req.session.user);
		res.render('mapbox');
	} else {
		req.session.error = "请先登录"
		res.redirect('login');
	}
});

router.get('/home', function (req, res) {
	console.log(req.session.user);
	res.render('home');
});
router.get('/', function (req, res) {
	console.log(req.session.user);
	res.render('home');
});

router.get('/login', function (req, res) {
	res.render('login');
});
router.get('/register', function (req, res) {
	res.render('register');
});

router.get('/logout', function (req, res) {
	req.session.user = null;
	req.session.error = null;
	// res.redirect('login');
	res.send(200);
});



module.exports = router;
