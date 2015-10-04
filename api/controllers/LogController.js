var bunyan = require('bunyan');
var moment = require('moment');
var _log = bunyan.createLogger({name: 'calls-tracker'});

module.exports = {
	createLog: function(req, res) {
		var params = {
			fullName: req.param('fullName'),
			time: req.param('time'),
			content: req.param('content'),
			notes: req.param('notes'),
			phone: req.param('phone'),
			group: req.param('group'),
			location: req.param('location'),
			response: req.param('response'),
			source: req.param('source'),
			email: req.param('email'),
			userId: req.param('userId')
		};

		LogService.createLog(params, function (err, log) {
			if (err) {
				res.json(err);
			} else {
				res.json(log);
			}
		})
	},

	getLogs: function(req, res) {
		var requestParams = req.params.all();
		LogService.getLogs(requestParams, function (err, logs) {
			if (err) {
				res.json(err);
			} else {
				res.json(logs);
			}
		})
	},

	getLogById: function (req, res) {

		var logId = req.param('logId');

		if (!logId) {
			res.json({
				message: 'Log Id is required',
				code: 400
			})
		}
		LogService.getLogById(logId, function (err, log) {
			if (err) {
				res.json(err);
			} else {
				res.json(log);
			}
		});
	},

	getLogsByDate: function (req, res) {

		var startDate =	req.param('startDate');
		var requestParams = req.params.all();
		if (!requestParams.startDate) {
			return res.status(500).json();
		}

		LogService.getLogsByDate(requestParams, function (err, logs) {
			if (err) {
				return res.status(500).json(err);
			} else {
				res.status(200).json(logs);
			}
		})
	},

	updateLog: function (req, res) {
		var requestParams = req.params.all();
		if (!requestParams.id) {
			return res.status(500).json();
		}
		var query = { id: requestParams.id };
		var updateObj = _.omit(requestParams, 'id');

		Log.update(query, updateObj, function (err, logs) {
			if (err) {
				res.status(400).json(err);
			} else {
				res.status(200).json(logs[0]);
			}
		})
	},

	getCountLogs: function (req, res) {
		var requestParams = req.params.all();
		if (!requestParams.userId) {
			return res.status(500).json();
		}
		async.parallel([
			function countToday(cb) {
				var params = {
					startDate: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
					endDate: moment().startOf('day').add(1, 'day').format('YYYY-MM-DD HH:mm:ss')
				};
				Log.count()
				.where({
					createdAt: {
						'>=': params.startDate,
						'<=': params.endDate
					},
					userId: requestParams.userId
				})
				.exec(function (err, number) {
					if (err) {
						cb(err)
					} else {
						cb(null, {
							type: 'today',
							value: number
						});
					}
				});
			},

			function countThisWeek(cb) {
				var params = {
					startDate: moment().startOf('isoweek').format('YYYY-MM-DD HH:mm:ss'),
					endDate: moment().endOf('isoweek').format('YYYY-MM-DD HH:mm:ss')
				};

				Log.count()
				.where({
					createdAt: {
						'>=': params.startDate,
						'<=': params.endDate
					},
					userId: requestParams.userId
				})
				.exec(function (err, number) {
					if (err) {
						cb(err)
					} else {
						cb(null, {
							type: 'week',
							value: number
						});
					}
				});
			},

			function countThisMonth(cb) {
				var params = {
					startDate: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
					endDate: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
				};

				Log.count()
				.where({
					createdAt: {
						'>=': params.startDate,
						'<=': params.endDate
					},
					userId: requestParams.userId
				})
				.exec(function (err, number) {
					if (err) {
						cb(err)
					} else {
						cb(null, {
							type: 'month',
							value: number
						});
					}
				});
			},

			function countAll(cb) {
				Log.count()
				.where({
					userId: requestParams.userId
				})
				.exec(function (err, number) {
					if (err) {
						cb(err)
					} else {
						cb(null, {
							type: 'all',
							value: number
						});
					}
				});
			}
		], function (err, count) {
			if (err) {
				res.status(500).json(err);
			} else {
				res.status(200).json(count);
			}
		});
	},

	getCountResponseLogs: function (req, res) {
		var params = req.params.all();
		var positiveQuery = {
			response: 1
		};

		if (params.startDate) {
			positiveQuery.createdAt =  {
				'>=': params.startDate,
				'<=': params.endDate
			};
		}

		positiveQuery.userId = params.userId;

		var negativeQuery = {
			response: 2
		};

		if (params.startDate) {
			negativeQuery.createdAt =  {
				'>=': params.startDate,
				'<=': params.endDate
			};
		}

		negativeQuery.userId = params.userId;
		
		async.parallel([
			function positiveLogs(cb) {
				Log.count()
				.where(positiveQuery)
				.exec(function(err, count) {
					if (err) {
						cb(err);
					} else {
						cb(null, {
							type: 'positive',
							value: count
						})
					}
				})
			},

			function negativeLogs(cb) {
				Log.count()
				.where(negativeQuery)
				.exec(function (err, count) {
					if (err) {
						cb(err)
					} else {
						cb(null, {
							type: 'negative',
							value: count
						})
					}
				})
			}
		], function(err, count) {
			if (err) {
				res.status(500).json(err); 
			} else {
				res.status(200).json(count);
			}
		});
	}
};