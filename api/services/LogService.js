var bunyan = require('bunyan');
var _log = bunyan.createLogger({name: 'calls-tracker'});
var async = require('async');
module.exports = {
	createLog: function (params, cb) {

		if (!params.fullName) {
			return cb(new Error({
				code: 400,
				message: 'Full name is require.'
			}))
		}

		var log = _.assign({}, params);
		Log.create(log, function(err, log) {
			if (err) {
				return cb(err);
			} else {
				return cb(null, log);
			}
		})
	},

	getLogs: function (params, cb) {
		Log.find(function(error, logs) {
			if (error) {
				return cb(error);
			} else {
				async.map(logs, function(log, mapCb) {

					async.waterfall([
						function (cbwf) {
							CallGroup.findOne(log.group, function(err, group) {
								log.groupName = group.name;
								cbwf(null, log);
							});
						},
						function (log, cbwf) {
							CallItem.findOne(log.source, function (err, source) {
								log.sourceName = source.name;
								cbwf(null, log);
							});
						}
					], function(err, log) {
						mapCb(null, log);
					});

					// CallGroup.findOne(log.group, function(err, group) {
					// 	if (err) {
					// 		cb(err);
					// 	} else {
					// 		log.groupName = group.name;
					// 		mapCb(null, log);
					// 	}
					// });
				}, function(err, logsWithGroupName) {
					cb(logsWithGroupName);
				});
			}
		})
	},

	getLogById: function (logId, cb) {
		Log.findOne(logId, function(err, log) {
			if (err) {
				cb(err);
			} else {

				async.waterfall([
					function (cbwf) {
						CallGroup.findOne(log.group, function (err, group) {
							log.groupName = group.name;
							cbwf(null, log);
						})
					},
					function (log, cbwf) {
						CallItem.findOne(log.source, function (err, source) {
							log.sourceName = source.name;
							cbwf(null, log);
						})
					}
				], function(err, log) {
					if (err) {
						cb(err);
					} else {
						cb(log);
					}
				});


			}
		})
	},

	getLogsByDate: function (params, cb) {
		Log.find()
			.where({
				createdAt: {
					'>=': params.startDate,
					'<=': params.endDate
				}
			})
			.sort({
				createdAt: 'asc'
			})
			.exec(function(err, logs) {
				if (err) {
					return cb(err);
				}

				cb(null, logs);
			});
	}
}