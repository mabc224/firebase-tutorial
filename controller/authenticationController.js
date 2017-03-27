var debug = require('debug')('Controller:authentication');
var util = require('util');
var faker = require('faker');
var shortid = require('shortid');


var conn = require("./../config/db");
var database = conn.database();

exports.handleSignUp = function (req, res) {

	req.checkBody({
		'form-email': {
			notEmpty: true,
			errorMessage: 'Email address should not be empty',
			isEmail: {
				errorMessage: 'Email address is not valid'
			}
		},
		'form-password': {
			notEmpty: true,
			errorMessage: 'Password is not valid'
		}
	});

	var errors = req.validationErrors();
	if (errors) {
		return res.render('error', { error: true, message: util.inspect(errors) });
	}

	var email = req.body['form-email'];
	var password = req.body['form-password'];

	conn.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
		JSON.stringify(user);
		res.render('signup-success', { data: user });

	}).catch(function (error) {

		res.render('error', { message: errorMessage });

	});
};

exports.handleSignIn = function (req, res) {

	req.checkBody({
		'form-email': {
			notEmpty: true,
			errorMessage: 'Email address should not be empty',
			isEmail: {
				errorMessage: 'Email address is not valid'
			}
		},
		'form-password': {
			notEmpty: true,
			errorMessage: 'Password is not valid'
		}
	});

	var errors = req.validationErrors();
	if (errors) {
		return res.render('error', { error: true, message: util.inspect(errors) });
	}

	var email = req.body['form-email'];
	var password = req.body['form-password'];

	conn.auth().signInWithEmailAndPassword(email, password).then(function (user) {
		JSON.stringify(user);

		var books = database.ref('books/');
		books.orderByValue().limitToFirst(5).once("value", function(snapshot) {
			res.render('login-success', { data: user, books: snapshot.val() });
		}, function (error) {

			res.render('error', { message: errorMessage });
		});

	}).catch(function (error) {

		res.render('error', { message: errorMessage });
	});
};

exports.logOut = function (req, res, next) {
	conn.auth().signOut().then(function () {
		res.render('logout-success', {});
	}).catch(function (error) {
		next(error);
	});
};


exports.userSignedIn = function (req, res, next) {
	conn.auth().onAuthStateChanged(function (user) {
		if (user) {
			next();
		} else {
			next(new Error("user is not signed in"));
		}
	});
};

exports.facebookLogin = function (req, res, next) {
	var provider = new conn.auth.FacebookAuthProvider();
	provider.addScope('email');
	conn.auth().signInWithRedirect(provider);
	conn.auth().getRedirectResult().then(function (result) {

		var dataToSend = {
			uid: result.credential.accessToken,
			email: result.user
		};
		res.render('login-success', { data: dataToSend });

	}).catch(function (error) {
		next(error);
	});
};

exports.putData = function (req, res) {
	var book = {
		title: faker.lorem.words(),
		author: faker.name.findName(),
		author_image: faker.image.avatar(),
		release_date: faker.date.recent(),
		image: faker.image.abstract(),
		price: faker.commerce.price(),
		short_description: faker.lorem.sentence(),
		long_description: faker.lorem.paragraph(),
		time_added: new Date()
	};

	database.ref('books/' + shortid.generate()).set(book, function(error) {
		if (error) {
			return res.send(error);
		} else {
			var books = database.ref('books/');
			books.orderByValue().limitToFirst(5).once("value", function(snapshot) {
				res.json( snapshot.val() );
			}, function (error) {
				res.send(error)
			});
		}
	});


};









