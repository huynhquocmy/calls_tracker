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
	}
}