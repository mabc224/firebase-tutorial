var express = require('express');
var router = express.Router();
var authenticationRoutes = require("./v1/authentication");


router.use('/', authenticationRoutes);

module.exports = router;
