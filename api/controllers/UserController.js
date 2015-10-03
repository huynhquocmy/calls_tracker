var jwt = require('jsonwebtoken');
var nconf = require('nconf');
var bunyan = require('bunyan');
var _log = bunyan.createLogger({name: 'calls-tracker'});

module.exports = {
	create: function(req, res) {

		var userParams = {
			email : req.param('email'),
			username: req.param('username'),
			password : req.param('password'),
			firstName : req.param('firstName'),
			lastName : req.param('lastName'),
			gender : req.param('gender'),
			birthDate : req.param('birthDate'),
			title : req.param('title')
		};

		UserService.create(userParams, function (err, user) {
			if (err) {
				return res.json(400,err);
			} else {
				res.json(user);
			}
		});
	},

	login: function (req, res) {
		var userParams = {
			email: req.param('email'),
			password: req.param('password'),
			username: req.param('username')
		};

		UserService.login(userParams, function (err, user) {
			if (err) {
				return res.json(400, err);
			} else {
				sails.log.debug(user);
				if (!user) {
					return res.redirect("/");
				}

				var secretKey = nconf.get('JWT_SECRET');


				var token = jwt.sign(user, secretKey, {
				  expiresInMinutes: 1440 // expires in 24 hours
				});
				return res.json({
					token: token,
					user: user,
					status: 200
				});
			}
		});
	},

	getUserById: function (req, res) {
		if (!req.param('userId')) {
			return res.status(400).json({
				code: 400,
				message: 'UserId is required'
			})
		}

		UserService.getUserById(req.param('userId'), function (err, user) {
			if (err) {
				return res.status(400).json(err);
			} else {
				return res.status(200).json(user);
			}
		});
	},

	auth: function (req, res, next) {
		_log.info('authend');
		var secretKey = nconf.get('JWT_SECRET');
		_log.info(secretKey);
		// check header or url parameters or post parameters for token
		 var token = req.param('token') || req.headers['x-access-token'];

		 // decode token
		 if (token) {

		     // verifies secret and checks exp
		     jwt.verify(token, secretKey, function(err, decoded) {
		         if (err) {
		             return res.json({
		                 success: false,
		                 message: 'Failed to authenticate token.'
		             });
		         } else {
		             // if everything is good, save to request for use in other routes
		             req.decoded = decoded;
		             next();
		         }
		     });

		 } else {

		     // if there is no token
		     // return an error
		     return res.status(403).send({
		         success: false,
		         message: 'No token provided.'
		     });

		 }
	}
}