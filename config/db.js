/**
 * Created by Arsalan on 25/3/2017.
 */
var firebase = require("firebase");

var defaultAppConfig = {
	apiKey: "AIzaSyC0Wk0bGztAk3QJo0b1IkcE0jbFmkVdKjs",
	authDomain: "angular2-app-a5664.firebaseapp.com",
	databaseURL: "https://angular2-app-a5664.firebaseio.com",
	storageBucket: "angular2-app-a5664.appspot.com",
	messagingSenderId: "64509024481"
};
firebase.initializeApp(defaultAppConfig);
module.exports = firebase;
