/**
 * Created by Arsalan on 25/3/2017.
 */

var express = require('express');
var router = express.Router();
var authenticationController = require("./../../controller/authenticationController");


router.get('/', function (req, res, next) {
	res.render('login', {});
});

router.get('/login', function (req, res, next) {
	res.render('login', {});
});

router.get('/signup', function (req, res, next) {
	res.render('signup', {});
});

router.post('/login', authenticationController.handleSignIn);

router.post('/signup', authenticationController.handleSignUp);

router.post('/logout', authenticationController.userSignedIn, authenticationController.logOut);

router.get('/putdata', authenticationController.putData);

router.get('/auth/facebook', authenticationController.facebookLogin);

module.exports = router;

